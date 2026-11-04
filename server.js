// Zintho (ཟིན་ཐོ།) — Tibetan AI Notebook
// Zero-dependency Node server (Node 18+). Serves the web app and keeps your
// Monlam API key on the server, never in the browser.

import http from 'node:http';
import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(ROOT, '.env'));

const monlam = await import('./server/monlam.js');
const prompts = await import('./server/prompts.js');
const demo = await import('./server/demo.js');

const PORT = Number(process.env.PORT || 4747);
const PUBLIC = path.join(ROOT, 'public');
const DATA = path.join(ROOT, 'data', 'notebooks');
const MAX_CONTEXT_CHARS = Number(process.env.MAX_CONTEXT_CHARS || 200000);
await mkdir(DATA, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.ico': 'image/x-icon', '.json': 'application/json',
};

// ---------- helpers ----------
function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}
const json = (res, code, obj) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
};
async function readBody(req, limit = 60 * 1024 * 1024) {
  const chunks = []; let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > limit) throw Object.assign(new Error('Upload too large'), { status: 413 });
    chunks.push(c);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}
const validId = (id) => /^[a-z0-9-]{6,64}$/.test(id);
const nbFile = (id) => path.join(DATA, `${id}.json`);
const now = () => new Date().toISOString();

async function listNotebooks() {
  const files = (await readdir(DATA)).filter((f) => f.endsWith('.json'));
  const out = [];
  for (const f of files) {
    try {
      const nb = JSON.parse(await readFile(path.join(DATA, f), 'utf8'));
      out.push({ id: nb.id, title: nb.title, emoji: nb.emoji, updatedAt: nb.updatedAt, sourceCount: (nb.sources || []).length });
    } catch { /* skip broken file */ }
  }
  return out.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
}

// ---------- API ----------
async function handleApi(req, res, url) {
  const p = url.pathname;
  const m = req.method;

  if (p === '/api/status' && m === 'GET') {
    return json(res, 200, monlam.publicConfig());
  }

  if (p === '/api/notebooks' && m === 'GET') return json(res, 200, await listNotebooks());
  if (p === '/api/notebooks' && m === 'POST') {
    const body = await readBody(req);
    const emojis = ['📘', '📜', '🏔️', '🪷', '☸️', '🦁', '📿', '🌄', '🕯️', '🍵'];
    const nb = {
      id: crypto.randomUUID(), title: body.title || 'Untitled notebook',
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      createdAt: now(), updatedAt: now(), sources: [], chat: [], notes: [], guide: null, audio: null,
    };
    await writeFile(nbFile(nb.id), JSON.stringify(nb, null, 2));
    return json(res, 201, nb);
  }

  const nbMatch = p.match(/^\/api\/notebooks\/([^/]+)$/);
  if (nbMatch) {
    const id = nbMatch[1];
    if (!validId(id)) return json(res, 400, { error: 'Bad notebook id' });
    if (m === 'GET') {
      if (!existsSync(nbFile(id))) return json(res, 404, { error: 'Notebook not found' });
      return json(res, 200, JSON.parse(await readFile(nbFile(id), 'utf8')));
    }
    if (m === 'PUT') {
      const body = await readBody(req);
      body.id = id; body.updatedAt = now();
      await writeFile(nbFile(id), JSON.stringify(body, null, 2));
      return json(res, 200, { ok: true, updatedAt: body.updatedAt });
    }
    if (m === 'DELETE') {
      if (existsSync(nbFile(id))) await unlink(nbFile(id));
      return json(res, 200, { ok: true });
    }
  }

  if (p === '/api/chat' && m === 'POST') {
    const { question, history = [], sources = [], lang = 'bo' } = await readBody(req);
    if (!question) return json(res, 400, { error: 'Missing question' });
    if (monlam.isDemo()) return json(res, 200, { answer: demo.chat(question, sources, lang), demo: true });
    const messages = prompts.chatMessages({ question, history, sources, lang, maxChars: MAX_CONTEXT_CHARS });
    const answer = await monlam.chat(messages, { maxTokens: 2048 });
    return json(res, 200, { answer });
  }

  if (p === '/api/generate' && m === 'POST') {
    const { kind, sources = [], lang = 'bo', topic } = await readBody(req);
    const spec = prompts.KINDS[kind];
    if (!spec) return json(res, 400, { error: `Unknown kind: ${kind}` });
    if (kind !== 'topic' && !sources.length) return json(res, 400, { error: 'Select at least one source' });
    if (kind === 'topic' && !topic) return json(res, 400, { error: 'Missing topic' });

    if (monlam.isDemo()) {
      const data = demo.generate(kind, { topic, sources, lang });
      return json(res, 200, { kind, title: titleFor(kind, data, topic), data, demo: true });
    }
    const messages = prompts.generateMessages(kind, { sources, lang, topic, maxChars: MAX_CONTEXT_CHARS });
    let text = await monlam.chat(messages, { maxTokens: 4096, temperature: spec.json ? 0.3 : 0.5 });
    let data = text;
    if (spec.json) {
      try { data = prompts.extractJSON(text); }
      catch {
        // one retry asking for strict JSON
        messages.push({ role: 'assistant', content: text });
        messages.push({ role: 'user', content: 'That was not valid JSON. Reply again with ONLY the JSON object, nothing else.' });
        text = await monlam.chat(messages, { maxTokens: 4096, temperature: 0.1 });
        try { data = prompts.extractJSON(text); }
        catch { return json(res, 502, { error: 'The model did not return valid JSON. Try again, or switch the chat model in .env.' }); }
      }
      data = prompts.normalize(kind, data);
    }
    return json(res, 200, { kind, title: titleFor(kind, data, topic), data });
  }

  if ((p === '/api/ocr' || p === '/api/stt') && m === 'POST') {
    const { data, mime = 'application/octet-stream', filename = 'upload' } = await readBody(req);
    if (!data) return json(res, 400, { error: 'Missing file data' });
    const buf = Buffer.from(data, 'base64');
    if (monlam.isDemo()) return json(res, 200, { text: p === '/api/ocr' ? demo.ocr(filename) : demo.stt(filename), demo: true });
    const text = p === '/api/ocr' ? await monlam.ocr(buf, mime, filename) : await monlam.stt(buf, mime, filename);
    return json(res, 200, { text });
  }

  if (p === '/api/tts' && m === 'POST') {
    const { text, voice } = await readBody(req);
    if (!text) return json(res, 400, { error: 'Missing text' });
    if (monlam.isDemo()) return json(res, 503, { error: 'Read-aloud needs your Monlam API key (demo mode). Add it to .env and restart.' });
    const { buffer, contentType } = await monlam.tts(text.slice(0, 2000), voice);
    res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': buffer.length });
    return res.end(buffer);
  }

  return json(res, 404, { error: 'Not found' });
}

function titleFor(kind, data, topic) {
  if (data && typeof data === 'object' && data.title) return data.title;
  if (typeof data === 'string') {
    const h = data.match(/^#\s+(.+)$/m);
    if (h && (kind === 'topic' || kind === 'briefing')) return h[1].trim();
  }
  if (kind === 'topic') return topic;
  return prompts.KINDS[kind]?.label || kind;
}

// ---------- static ----------
async function serveStatic(req, res, url) {
  let rel = decodeURIComponent(url.pathname);
  if (rel === '/') rel = '/index.html';
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
  try {
    const buf = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(buf);
  } catch {
    const buf = await readFile(path.join(PUBLIC, 'index.html'));
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(buf);
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) await handleApi(req, res, url);
    else await serveStatic(req, res, url);
  } catch (err) {
    console.error('[error]', err.message);
    if (!res.headersSent) json(res, err.status || 500, { error: err.message || 'Server error' });
    else res.end();
  }
});

server.listen(PORT, process.env.HOST || '127.0.0.1', () => {
  const cfg = monlam.publicConfig();
  console.log(`\n  ཟིན་ཐོ།  Zintho — Tibetan AI Notebook`);
  console.log(`  ➜  Open http://localhost:${PORT}`);
  console.log(cfg.demo
    ? '  ⚠  Demo mode: no MONLAM_API_KEY found in .env (sample answers only)\n'
    : `  ✓  Monlam API: ${cfg.baseUrl}  ·  chat model: ${cfg.chatModel}\n`);
});
