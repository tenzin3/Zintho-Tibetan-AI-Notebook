// Vercel serverless function: handles /api/status, /api/chat, /api/generate,
// /api/ocr, /api/stt, /api/tts and /api/test with the same code as the local server.

import { handle, ROUTES } from '../server/handlers.js';

export default async function handler(req, res) {
  const route = String(req.query.route || '');
  if (!ROUTES[route]) return res.status(404).json({ error: 'Not found' });
  if (req.method !== ROUTES[route]) return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const out = await handle(route, body, req.headers['x-monlam-key']);
    if (out.buffer) {
      res.setHeader('Content-Type', out.contentType);
      return res.status(out.status).send(out.buffer);
    }
    return res.status(out.status).json(out.json);
  } catch (err) {
    console.error('[error]', err.message);
    return res.status(err.status || 500).json({ error: err.message || 'Server error' });
  }
}
