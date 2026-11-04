// Zintho (ཟིན་ཐོ།) — Tibetan AI Notebook · local server
// Zero-dependency Node server (Node 18+). On Vercel, api/[route].js is used instead.
// The API key comes from the app's Settings (sent per request) or MONLAM_API_KEY in .env.

import http from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(ROOT, '.env'));

const { handle, ROUTES } = await import('./server/handlers.js');
const monlam = await import('./server/monlam.js');

const PORT = Number(process.env.PORT || 4747);
const PUBLIC = path.join(ROOT, 'public');
const LEGACY = path.join(ROOT, 'data', 'notebooks'); // notebooks saved by older versions

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.ico': 'image/x-icon', '.json': 'application/json',
};

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
const sendJson = (res, code, obj) => {
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

async function handleApi(req, res, url) {
  const route = url.pathname.replace(/^\/api\//, '').replace(/\/$/, '');

  // Read-only access to notebooks saved by older versions, so the app can import them once.
  if (route === 'notebooks' && req.method === 'GET') {
    if (!existsSync(LEGACY)) return sendJson(res, 200, []);
    const out = [];
    for (const f of (await readdir(LEGACY)).filter((x) => x.endsWith('.json'))) {
      try { out.push(JSON.parse(await readFile(path.join(LEGACY, f), 'utf8'))); } catch {}
    }
    return sendJson(res, 200, out);
  }

  if (!ROUTES[route]) return sendJson(res, 404, { error: 'Not found' });
  if (req.method !== ROUTES[route]) return sendJson(res, 405, { error: 'Method not allowed' });
  const body = req.method === 'POST' ? await readBody(req) : {};
  const out = await handle(route, body, req.headers['x-monlam-key']);
  if (out.buffer) {
    res.writeHead(out.status, { 'Content-Type': out.contentType, 'Content-Length': out.buffer.length });
    return res.end(out.buffer);
  }
  return sendJson(res, out.status, out.json);
}

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
    if (!res.headersSent) sendJson(res, err.status || 500, { error: err.message || 'Server error' });
    else res.end();
  }
});

server.listen(PORT, process.env.HOST || '127.0.0.1', () => {
  const cfg = monlam.publicConfig();
  console.log(`\n  ཟིན་ཐོ།  Zintho — Tibetan AI Notebook`);
  console.log(`  ➜  Open http://localhost:${PORT}`);
  console.log(cfg.hasServerKey
    ? `  ✓  Monlam API: ${cfg.baseUrl}  ·  chat model: ${cfg.chatModel}  ·  key from .env\n`
    : `  ℹ  No key in .env — paste your Monlam key in the app's Settings (or it runs in demo mode)\n`);
});
