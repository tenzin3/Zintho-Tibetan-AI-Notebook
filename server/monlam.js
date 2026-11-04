// All Monlam AI API calls live in this one file.
// Matches the Monlam Studio API (https://api-v1.monlamai.studio/docs):
//   auth  → header  X-API-Key: <key>
//   chat  → POST {BASE}/ai/chat                 JSON {model_name, messages, max_tokens, temperature}
//   tts   → POST {BASE}/text-to-speech/stream   JSON {text, voice_name, model_name} → audio/wav
//   stt   → POST {BASE}/speech-to-text/         multipart: file, language, task, model_name
//   ocr   → POST {BASE}/ocr/single-page         multipart: file, lang_hint, model_name
// Every value can be overridden in .env.

const env = (k, d = '') => (process.env[k] ?? d).trim();

export const VOICES = ['lhasa_female', 'lhasa_male', 'amdo_female', 'amdo_male', 'kham_female', 'kham_male'];

export function config() {
  return {
    key: env('MONLAM_API_KEY'),
    baseUrl: env('MONLAM_BASE_URL', 'https://api-v1.monlamai.studio/api/v1').replace(/\/+$/, ''),
    authHeader: env('MONLAM_AUTH_HEADER', 'X-API-Key'),
    authPrefix: process.env.MONLAM_AUTH_PREFIX ?? '',
    chatModel: env('MONLAM_CHAT_MODEL', 'melong-2.5'),
    chatPath: env('MONLAM_CHAT_PATH', '/ai/chat'),
    ttsModel: env('MONLAM_TTS_MODEL', 'monlamai-tts'),
    ttsPath: env('MONLAM_TTS_PATH', '/text-to-speech/stream'),
    ttsVoice: env('MONLAM_TTS_VOICE', 'lhasa_female'),     // read-aloud + audio overview host 1
    ttsVoiceB: env('MONLAM_TTS_VOICE_B', 'lhasa_male'),    // audio overview host 2
    sttModel: env('MONLAM_STT_MODEL', 'monlamai-stt'),
    sttPath: env('MONLAM_STT_PATH', '/speech-to-text/'),
    sttLanguage: env('MONLAM_STT_LANGUAGE', 'bo'),
    ocrModel: env('MONLAM_OCR_MODEL', 'monlam-ocr'),
    ocrPath: env('MONLAM_OCR_PATH', '/ocr/single-page'),
    ocrLang: env('MONLAM_OCR_LANG', 'bo'),
  };
}

// key = a user's own key (from the app's Settings); falls back to MONLAM_API_KEY
export const isDemo = (key) => !(key || config().key) || env('MONLAM_DEMO') === '1';

export function publicConfig() {
  const c = config();
  return {
    demo: isDemo(), hasServerKey: !!c.key, baseUrl: c.baseUrl, chatModel: c.chatModel,
    ttsModel: c.ttsModel, sttModel: c.sttModel, ocrModel: c.ocrModel,
    voices: { A: c.ttsVoice, B: c.ttsVoiceB },
  };
}

function authHeaders(key, extra = {}) {
  const c = config();
  return { [c.authHeader]: `${c.authPrefix}${key || c.key}`, ...extra };
}

async function call(pathname, init) {
  const c = config();
  const url = c.baseUrl + pathname;
  let res;
  try {
    res = await fetch(url, { method: 'POST', ...init });
  } catch (e) {
    throw new Error(`Could not reach Monlam API at ${url} (${e.cause?.code || e.message}). Check your internet connection and MONLAM_BASE_URL in .env.`);
  }
  if (!res.ok) {
    const body = (await res.text()).slice(0, 400);
    if (res.status === 429 && /per day/i.test(body)) {
      throw Object.assign(new Error('Monlam daily request limit reached (1,000 per day for your organization). Try again tomorrow, or check Usage and Rate limits in Monlam Studio.'), { status: 429 });
    }
    const hint = res.status === 401 || res.status === 403 ? ' — check your Monlam API key (Settings in the app, or MONLAM_API_KEY)'
      : res.status === 402 ? ' — out of credits? Check Usage in Monlam Studio'
      : res.status === 404 ? ' — check the endpoint path in .env'
      : res.status === 429 ? ' — rate limit reached, wait a moment and try again' : '';
    throw Object.assign(new Error(`Monlam ${pathname} returned ${res.status}${hint}: ${body}`), { status: 502 });
  }
  return res;
}

// The API returns "provider output + billing metadata" without a fixed schema,
// so look for the text in the common places.
const META = new Set(['cost', 'latency_ms', 'service_request_id', 'status', 'usage', 'id', 'model', 'model_name', 'created', 'object', 'role', 'finish_reason', 'language', 'type']);
function pickText(j) {
  if (j == null) return '';
  if (typeof j === 'string') return j;
  if (Array.isArray(j)) return j.map(pickText).filter(Boolean).join('\n');
  if (typeof j !== 'object') return String(j);
  const oa = j.choices?.[0]?.message?.content ?? j.choices?.[0]?.text;
  if (typeof oa === 'string') return oa;
  for (const k of ['text', 'transcript', 'transcription', 'response', 'output', 'output_text', 'content', 'answer', 'result', 'message', 'prediction', 'data', 'lines', 'pages', 'results']) {
    if (j[k] != null && k in j) {
      const t = pickText(j[k]);
      if (t) return t;
    }
  }
  for (const [k, v] of Object.entries(j)) {
    if (META.has(k)) continue;
    const t = pickText(v);
    if (t) return t;
  }
  return '';
}

export async function chat(messages, { temperature = 0.4, maxTokens = 2048 } = {}, key) {
  const c = config();
  const res = await call(c.chatPath, {
    headers: authHeaders(key, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ model_name: c.chatModel, messages, temperature, max_tokens: maxTokens }),
  });
  const j = await res.json();
  const text = pickText(j).trim();
  if (!text) throw new Error(`Chat returned no text: ${JSON.stringify(j).slice(0, 300)}`);
  return text;
}

// voice: 'A' / 'B' (audio overview hosts) or a Monlam voice name
export async function tts(text, voice, key) {
  const c = config();
  const voice_name = voice === 'B' ? c.ttsVoiceB : VOICES.includes(voice) ? voice : c.ttsVoice;
  const res = await call(c.ttsPath, {
    headers: authHeaders(key, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ text, voice_name, model_name: c.ttsModel }),
  });
  const type = res.headers.get('content-type') || '';
  if (!type.includes('json')) {
    return { buffer: Buffer.from(await res.arrayBuffer()), contentType: type.startsWith('audio') ? type : 'audio/wav' };
  }
  // JSON response: find a base64 audio string or an audio URL anywhere in it
  const j = await res.json();
  const strings = [];
  (function walk(v, key = '') {
    if (typeof v === 'string') strings.push([key, v]);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, k);
  })(j);
  const url = strings.find(([, s]) => /^https?:\/\//.test(s))?.[1];
  const b64 = strings.find(([k, s]) => s.length > 200 && (/^data:audio/.test(s) || /^[A-Za-z0-9+/=\s]+$/.test(s.slice(0, 200))))?.[1];
  if (b64) {
    const mime = b64.match(/^data:([^;]+);/)?.[1] || 'audio/wav';
    return { buffer: Buffer.from(b64.replace(/^data:[^;]+;base64,/, ''), 'base64'), contentType: mime };
  }
  if (url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Could not download TTS audio (${r.status})`);
    return { buffer: Buffer.from(await r.arrayBuffer()), contentType: r.headers.get('content-type') || 'audio/wav' };
  }
  throw new Error(`TTS response had no audio: ${JSON.stringify(j).slice(0, 300)}`);
}

export async function stt(buffer, mime, filename, key) {
  const c = config();
  const form = new FormData();
  form.append('file', new Blob([buffer], { type: mime }), filename);
  form.append('language', c.sttLanguage);
  form.append('task', 'transcribe');
  form.append('model_name', c.sttModel);
  const res = await call(c.sttPath, { headers: authHeaders(key), body: form });
  const type = res.headers.get('content-type') || '';
  return (type.includes('json') ? pickText(await res.json()) : await res.text()).trim();
}

export async function ocr(buffer, mime, filename, key) {
  const c = config();
  const form = new FormData();
  form.append('file', new Blob([buffer], { type: mime }), filename);
  form.append('lang_hint', c.ocrLang);
  form.append('model_name', c.ocrModel);
  const res = await call(c.ocrPath, { headers: authHeaders(key), body: form });
  const type = res.headers.get('content-type') || '';
  return (type.includes('json') ? pickText(await res.json()) : await res.text()).trim();
}
