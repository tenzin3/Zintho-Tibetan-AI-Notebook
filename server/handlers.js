// The app's AI routes, shared by the local server (server.js) and Vercel (api/[route].js).
// Each handler returns { status, json } or { status, buffer, contentType }.

import * as monlam from './monlam.js';
import * as prompts from './prompts.js';
import * as demo from './demo.js';

const MAX_CONTEXT_CHARS = () => Number(process.env.MAX_CONTEXT_CHARS || 200000);
export const MAX_UPLOAD_MB = () => (process.env.VERCEL ? 3 : 40);

const ok = (json) => ({ status: 200, json });
const bad = (status, error) => ({ status, json: { error } });

// Accept a user's key only if it looks like a key (no spaces/newlines, sane length).
export function cleanKey(k) {
  const v = String(k || '').trim();
  return /^[\x21-\x7e]{8,256}$/.test(v) ? v : '';
}

function titleFor(kind, data, topic) {
  if (data && typeof data === 'object' && data.title) return data.title;
  if (kind === 'topic' && typeof data === 'string') {
    const h = data.match(/^#\s+(.+)$/m);
    if (h) return h[1].trim();
  }
  if (kind === 'topic') return topic;
  return prompts.KINDS[kind]?.label || kind;
}

export async function handle(route, body = {}, rawKey) {
  const key = cleanKey(rawKey);

  if (route === 'status') {
    return ok({ ...monlam.publicConfig(), userKey: !!key, maxUploadMB: MAX_UPLOAD_MB(), hosted: !!process.env.VERCEL });
  }

  if (route === 'test') {
    if (monlam.isDemo(key)) return bad(400, 'No API key to test. Paste your Monlam key first.');
    const reply = await monlam.chat([{ role: 'user', content: 'Reply with the single word OK.' }], { maxTokens: 8, temperature: 0 }, key);
    return ok({ ok: true, reply: reply.slice(0, 80) });
  }

  if (route === 'chat') {
    const { question, history = [], sources = [], lang = 'bo' } = body;
    if (!question) return bad(400, 'Missing question');
    if (monlam.isDemo(key)) return ok({ answer: demo.chat(question, sources, lang), demo: true });
    const messages = prompts.chatMessages({ question, history, sources, lang, maxChars: MAX_CONTEXT_CHARS() });
    return ok({ answer: await monlam.chat(messages, { maxTokens: 2048 }, key) });
  }

  if (route === 'generate') {
    const { kind, sources = [], lang = 'bo', topic } = body;
    const spec = prompts.KINDS[kind];
    if (!spec) return bad(400, `Unknown kind: ${kind}`);
    if (kind !== 'topic' && !sources.length) return bad(400, 'Select at least one source');
    if (kind === 'topic' && !topic) return bad(400, 'Missing topic');

    if (monlam.isDemo(key)) {
      const data = demo.generate(kind, { topic, sources, lang });
      return ok({ kind, title: titleFor(kind, data, topic), data, demo: true });
    }
    const messages = prompts.generateMessages(kind, { sources, lang, topic, maxChars: MAX_CONTEXT_CHARS() });
    let text = await monlam.chat(messages, { maxTokens: 4096, temperature: spec.json ? 0.3 : 0.5 }, key);
    let data = text;
    if (spec.json) {
      try { data = prompts.extractJSON(text); }
      catch {
        messages.push({ role: 'assistant', content: text });
        messages.push({ role: 'user', content: 'That was not valid JSON. Reply again with ONLY the JSON object, nothing else.' });
        text = await monlam.chat(messages, { maxTokens: 4096, temperature: 0.1 }, key);
        try { data = prompts.extractJSON(text); }
        catch { return bad(502, 'The model did not return valid JSON. Please try again.'); }
      }
      data = prompts.normalize(kind, data);
    }
    return ok({ kind, title: titleFor(kind, data, topic), data });
  }

  if (route === 'ocr' || route === 'stt') {
    const { data, mime = 'application/octet-stream', filename = 'upload' } = body;
    if (!data) return bad(400, 'Missing file data');
    const buf = Buffer.from(data, 'base64');
    if (buf.length > MAX_UPLOAD_MB() * 1024 * 1024) return bad(413, `File is over ${MAX_UPLOAD_MB()} MB.`);
    if (monlam.isDemo(key)) return ok({ text: route === 'ocr' ? demo.ocr(filename) : demo.stt(filename), demo: true });
    const text = route === 'ocr' ? await monlam.ocr(buf, mime, filename, key) : await monlam.stt(buf, mime, filename, key);
    return ok({ text });
  }

  if (route === 'tts') {
    const { text, voice } = body;
    if (!text) return bad(400, 'Missing text');
    if (monlam.isDemo(key)) return bad(503, 'Read-aloud needs a Monlam API key. Add yours in Settings.');
    const { buffer, contentType } = await monlam.tts(String(text).slice(0, 2000), voice, key);
    return { status: 200, buffer, contentType };
  }

  return bad(404, 'Not found');
}

export const ROUTES = { status: 'GET', test: 'POST', chat: 'POST', generate: 'POST', ocr: 'POST', stt: 'POST', tts: 'POST' };
