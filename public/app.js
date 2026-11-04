// Zintho (ཟིན་ཐོ།) — Tibetan AI Notebook · frontend
// Plain JavaScript, no build step.

/* ================= icons ================= */
const P = (d) => `<path d="${d}"/>`;
const ICONS = {
  plus: P('M12 5v14M5 12h14'),
  send: P('M5 12h14M13 6l6 6-6 6'),
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/>' + P('M19 10v2a7 7 0 0 1-14 0v-2M12 19v3'),
  upload: P('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12'),
  text: P('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8'),
  pdf: P('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6') + P('M8 15h1.5a1.5 1.5 0 0 0 0-3H8v5M13 12v5h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z'),
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/>' + P('m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21'),
  audio: P('M2 10v3M6 6v11M10 3v18M14 8v7M18 5v13M22 10v3'),
  sparkle: P('M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 3v4M21 5h-4'),
  bulb: P('M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z'),
  help: '<circle cx="12" cy="12" r="10"/>' + P('M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01'),
  cards: '<rect x="2" y="6" width="14" height="16" rx="2"/>' + P('M6 2h12a2 2 0 0 1 2 2v14'),
  map: '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/>' + P('M12 8v4M12 12l-5.5 4.5M12 12l5.5 4.5'),
  book: P('M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'),
  clock: '<circle cx="12" cy="12" r="10"/>' + P('M12 6v6l4 2'),
  list: P('M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01'),
  brief: '<rect x="2" y="7" width="20" height="14" rx="2"/>' + P('M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'),
  glossary: P('M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z') + P('M9 7h7M9 11h5'),
  summary: P('M4 6h16M4 10h16M4 14h10M4 18h7'),
  play: P('M7 4l13 8-13 8z'),
  pause: P('M7 4h3v16H7zM14 4h3v16h-3z'),
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  volume: P('M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14'),
  trash: P('M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'),
  back: P('M19 12H5M12 19l-7-7 7-7'),
  close: P('M18 6 6 18M6 6l12 12'),
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/>' + P('M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'),
  note: P('M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'),
  pin: P('M12 17v5M9 10.8V4h6v6.8l3 3.2H6z'),
  settings: P('M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6'),
  sun: '<circle cx="12" cy="12" r="4"/>' + P('M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4'),
  moon: P('M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z'),
  refresh: P('M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5'),
  next: P('m9 18 6-6-6-6'), prev: P('m15 18-6-6 6-6'),
  shuffle: P('M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5'),
};
const icon = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ================= utils ================= */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const load = (k, d) => { try { const v = localStorage.getItem('zintho.' + k); return v ? JSON.parse(v) : d; } catch { return d; } };
const store = (k, v) => { try { localStorage.setItem('zintho.' + k, JSON.stringify(v)); } catch {} };
const isTibetan = (s) => /[ༀ-࿿]/.test(s || '');
const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
const ago = (t) => { const s = (Date.now() - t) / 1000; if (s < 60) return 'just now'; if (s < 3600) return `${Math.floor(s / 60)} min ago`; if (s < 86400) return `${Math.floor(s / 3600)} h ago`; return fmtDate(t); };

/* ---------- user's own API key (saved only in this browser) ---------- */
const KEY_STORE = 'zintho.apiKey';
const getKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch { return ''; } };
const setKey = (k) => { try { k ? localStorage.setItem(KEY_STORE, k) : localStorage.removeItem(KEY_STORE); } catch {} };
const hasKey = () => !!getKey() || !!S.status.hasServerKey;
const maskKey = (k) => (k.length > 10 ? `${k.slice(0, 4)}••••••••${k.slice(-4)}` : '••••••••');

async function api(url, opts = {}) {
  const headers = opts.body ? { 'Content-Type': 'application/json' } : {};
  const k = getKey();
  if (k && url.startsWith('/api/')) headers['X-Monlam-Key'] = k;
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    let msg = res.statusText;
    try { msg = (await res.json()).error || msg; } catch {}
    throw new Error(msg);
  }
  return opts.blob ? res.blob() : res.json();
}
const post = (url, body, extra = {}) => api(url, { method: 'POST', body: JSON.stringify(body), ...extra });

function toast(msg, type = '') {
  const el = document.createElement('div');
  el.className = `toast ${type}`; el.textContent = msg;
  $('#toasts').append(el);
  setTimeout(() => el.remove(), type === 'error' ? 7000 : 3500);
}

const fileToBase64 = (blob) => new Promise((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(String(r.result).split(',')[1] || '');
  r.onerror = () => reject(r.error);
  r.readAsDataURL(blob);
});

/* ================= markdown ================= */
function inline(s, cite) {
  let h = esc(s);
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|\W)_([^_\n]+)_(?=\W|$)/g, '$1<em>$2</em>');
  // citations: [S1], [S1, S2], [S1][S3]
  h = h.replace(/\[((?:S\d+\s*,?\s*)+)\]/g, (_, list) => list.match(/\d+/g).map((n) => {
    const id = cite?.[Number(n) - 1];
    return `<button class="cite" data-act="cite" data-id="${esc(id || '')}" title="Source ${n}">${n}</button>`;
  }).join(''));
  return h;
}
function md(src, cite) {
  const lines = String(src ?? '').replace(/\r/g, '').split('\n');
  let out = '', i = 0;
  const isTable = (l) => /^\s*\|.*\|\s*$/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    if (/^```/.test(l)) {
      const buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++; out += `<pre><code>${esc(buf.join('\n'))}</code></pre>`; continue;
    }
    const h = l.match(/^(#{1,4})\s+(.*)$/);
    if (h) { const n = Math.min(h[1].length, 3); out += `<h${n}>${inline(h[2], cite)}</h${n}>`; i++; continue; }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(l)) { out += '<hr>'; i++; continue; }
    if (isTable(l) && isTable(lines[i + 1] || '') && /^[\s|:-]+$/.test(lines[i + 1])) {
      const row = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = row(l); i += 2; const body = [];
      while (i < lines.length && isTable(lines[i])) body.push(row(lines[i++]));
      out += `<table><thead><tr>${head.map((c) => `<th>${inline(c, cite)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c, cite)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      continue;
    }
    if (/^\s*([-*•])\s+/.test(l)) {
      out += '<ul>';
      while (i < lines.length && /^\s*([-*•])\s+/.test(lines[i])) out += `<li>${inline(lines[i++].replace(/^\s*[-*•]\s+/, ''), cite)}</li>`;
      out += '</ul>'; continue;
    }
    if (/^\s*\d+[.)]\s+/.test(l)) {
      out += '<ol>';
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) out += `<li>${inline(lines[i++].replace(/^\s*\d+[.)]\s+/, ''), cite)}</li>`;
      out += '</ol>'; continue;
    }
    if (/^>\s?/.test(l)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      out += `<blockquote>${inline(buf.join(' '), cite)}</blockquote>`; continue;
    }
    if (!l.trim()) { i++; continue; }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*[-*•]\s|\s*\d+[.)]\s|>)/.test(lines[i]) && !isTable(lines[i])) buf.push(lines[i++]);
    if (!buf.length) buf.push(lines[i++]);
    out += `<p>${buf.map((b) => inline(b, cite)).join('<br>')}</p>`;
  }
  return `<div class="md">${out}</div>`;
}
const plain = (s) => String(s || '').replace(/\[(?:S\d+\s*,?\s*)+\]/g, '').replace(/[#*_`>|]/g, ' ').replace(/[ \t]+/g, ' ').trim();

/* ================= state ================= */
const S = {
  status: { demo: true },
  notebooks: [],
  nb: null,
  lang: load('lang', 'bo'),
  theme: load('theme', null),
  left: { view: 'list' },
  studio: { view: 'home' },
  tab: 'chat',
  chatBusy: false,
  gen: {},
  guideBusy: false,
};

const TOOLS = [
  { kind: 'summary', label: 'Summary', bo: 'སྙིང་བསྡུས།', icon: 'summary' },
  { kind: 'study_guide', label: 'Study guide', bo: 'སློབ་སྦྱོང་ལམ་སྟོན།', icon: 'book' },
  { kind: 'glossary', label: 'Glossary', bo: 'ཚིག་མཛོད།', icon: 'glossary' },
  { kind: 'quiz', label: 'Quiz', bo: 'འདྲི་རྩད།', icon: 'help' },
  { kind: 'mindmap', label: 'Mind map', bo: 'བསམ་བློའི་ས་ཁྲ།', icon: 'map' },
];
const TOOL = Object.fromEntries(TOOLS.map((t) => [t.kind, t]));
TOOL.saved = { kind: 'saved', label: 'Saved response', icon: 'pin' };
TOOL.note = { kind: 'note', label: 'Note', icon: 'note' };

const enabledSources = () => (S.nb?.sources || []).filter((s) => s.enabled && !s.status);
const payload = (srcs) => srcs.map((s) => ({ title: s.title, content: s.content }));

/* ================= persistence (IndexedDB in this browser) ================= */
const idb = (() => {
  let dbp;
  const open = () => (dbp ||= new Promise((resolve, reject) => {
    const r = indexedDB.open('zintho', 1);
    r.onupgradeneeded = () => {
      r.result.createObjectStore('notebooks', { keyPath: 'id' });
      r.result.createObjectStore('tts');
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  }));
  const tx = async (store, mode, fn) => {
    const db = await open();
    return new Promise((resolve, reject) => {
      const t = db.transaction(store, mode);
      const req = fn(t.objectStore(store));
      t.oncomplete = () => resolve(req?.result);
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error || new Error('Storage is full'));
    });
  };
  return {
    get: (st, k) => tx(st, 'readonly', (s) => s.get(k)),
    all: (st) => tx(st, 'readonly', (s) => s.getAll()),
    put: (st, v, k) => tx(st, 'readwrite', (s) => (k === undefined ? s.put(v) : s.put(v, k))),
    del: (st, k) => tx(st, 'readwrite', (s) => s.delete(k)),
  };
})();

const EMOJIS = ['📘', '📜', '🏔️', '🪷', '☸️', '🦁', '📿', '🌄', '🕯️', '🍵'];
const newId = () => (crypto.randomUUID ? crypto.randomUUID() : uid() + uid());
async function listNotebooks() {
  const all = await idb.all('notebooks');
  return all.map((nb) => ({ id: nb.id, title: nb.title, emoji: nb.emoji, updatedAt: nb.updatedAt, sourceCount: (nb.sources || []).length }))
    .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
}
// One-time import of notebooks saved as files by the earlier local version
async function importLegacy() {
  if (load('imported', false)) return;
  try {
    const res = await fetch('/api/notebooks');
    if (res.ok) for (const nb of await res.json()) if (nb?.id && !(await idb.get('notebooks', nb.id))) await idb.put('notebooks', nb);
  } catch {}
  store('imported', true);
}

let saveTimer;
function save(now = false) {
  if (!S.nb) return;
  clearTimeout(saveTimer);
  const nb = S.nb;
  const doSave = () => {
    nb.updatedAt = new Date().toISOString();
    const copy = JSON.parse(JSON.stringify({ ...nb, sources: nb.sources.filter((s) => !s.status) }));
    return idb.put('notebooks', copy).catch((e) => toast('Could not save: ' + (e?.message || e), 'error'));
  };
  if (now) return doSave();
  saveTimer = setTimeout(doSave, 400);
}

/* ================= routing ================= */
async function route() {
  player.stop();
  const m = location.hash.match(/^#\/nb\/([\w-]+)/);
  if (m) {
    try {
      S.nb = await idb.get('notebooks', m[1]);
      if (!S.nb) throw new Error('Notebook not found');
      S.nb.sources ||= []; S.nb.chat ||= []; S.nb.notes ||= [];
      S.left = { view: 'list' }; S.studio = { view: 'home' }; S.tab = S.nb.sources.length ? 'chat' : 'sources';
      renderNotebook();
    } catch (e) { toast(e.message, 'error'); location.hash = '#/'; }
  } else {
    S.nb = null;
    S.notebooks = await listNotebooks().catch(() => []);
    renderHome();
  }
}

/* ================= top bar ================= */
function renderTopbar() {
  const dark = document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  $('#topbar').innerHTML = `
    <button class="brand" data-act="home" title="All notebooks">
      <span class="logo">ཟ</span>
      ${S.nb ? '' : '<span class="brand-name">Zintho <small>ཟིན་ཐོ། · Tibetan AI Notebook</small></span>'}
    </button>
    ${S.nb ? `<input class="nb-title" id="nbTitle" value="${esc(S.nb.title)}" aria-label="Notebook title">` : ''}
    <div class="spacer"></div>
    ${hasKey() ? '' : '<button class="demo-pill" data-act="settings" title="Demo mode: add your Monlam API key">Add API key</button>'}
    <div class="seg" role="group" aria-label="Output language" title="Language for AI answers">
      <button class="${S.lang === 'bo' ? 'on' : ''}" data-act="lang" data-v="bo">བོད་ཡིག</button>
      <button class="${S.lang === 'en' ? 'on' : ''}" data-act="lang" data-v="en">English</button>
    </div>
    <button class="icon-btn" data-act="theme" title="Toggle theme">${icon(dark ? 'sun' : 'moon')}</button>
    <button class="icon-btn" data-act="settings" title="API settings">${icon('settings')}</button>`;
  const t = $('#nbTitle');
  if (t) {
    t.addEventListener('change', () => { S.nb.title = t.value.trim() || 'Untitled notebook'; save(); renderChat(); });
    t.addEventListener('keydown', (e) => { if (e.key === 'Enter') t.blur(); });
  }
}

/* ================= home ================= */
function renderHome() {
  renderTopbar();
  const cards = S.notebooks.map((n) => `
    <div class="nb-card" role="button" tabindex="0" data-act="open" data-id="${n.id}">
      <div class="emoji">${esc(n.emoji || '📘')}</div>
      <h3 class="${isTibetan(n.title) ? 'bo' : ''}">${esc(n.title)}</h3>
      <div class="meta">${fmtDate(n.updatedAt)} · ${n.sourceCount} source${n.sourceCount === 1 ? '' : 's'}</div>
      <button class="icon-btn sm del" data-act="delnb" data-id="${n.id}" title="Delete notebook">${icon('trash', 'sm')}</button>
    </div>`).join('');
  $('#app').innerHTML = `
    <div class="home"><div class="home-inner">
      <section class="hero">
        <h1>Welcome to <span class="bo">ཟིན་ཐོ།</span> Zintho</h1>
        <p>Your AI study notebook for Tibetan. Add texts, scanned pechas or recorded teachings, then chat with them and turn them into summaries, study guides, quizzes, mind maps and audio.</p>
      </section>
      ${hasKey() ? '' : `<div class="callout" style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-bottom:24px">
        <span><b>Add your Monlam API key</b> to use Zintho with real AI. Until then it runs in demo mode with sample answers.</span>
        <button class="btn accent" data-act="settings">${icon('settings', 'sm')} Add API key</button></div>`}
      <div class="home-bar">
        <h2>My notebooks</h2>
        <button class="btn primary" data-act="newnb">${icon('plus')} Create new</button>
      </div>
      <div class="nb-grid">
        <button class="nb-card new" data-act="newnb"><span class="plus">${icon('plus')}</span><span>Create new notebook</span></button>
        ${cards}
      </div>
      <div class="features">
        <div class="feature">${icon('image')}<h4>Scanned pages → text</h4><p>Upload photos or PDFs of pechas. Monlam OCR reads the Tibetan.</p></div>
        <div class="feature">${icon('mic')}<h4>Teachings → transcript</h4><p>Record or upload audio. Monlam speech-to-text writes it down.</p></div>
        <div class="feature">${icon('sparkle')}<h4>Ask your sources</h4><p>Melong answers only from your texts and shows where each answer came from.</p></div>
        <div class="feature">${icon('volume')}<h4>Listen in Tibetan</h4><p>Audio overviews and read-aloud with Monlam text-to-speech.</p></div>
      </div>
    </div></div>`;
}

async function createNotebook() {
  const now = new Date().toISOString();
  const nb = { id: newId(), title: 'Untitled notebook', emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], createdAt: now, updatedAt: now, sources: [], chat: [], notes: [], guide: null, audio: null };
  await idb.put('notebooks', nb);
  location.hash = `#/nb/${nb.id}`;
  setTimeout(() => openAddSource(), 250);
}

/* ================= notebook ================= */
function renderNotebook() {
  renderTopbar();
  $('#app').innerHTML = `
    <div class="nb" data-tab="${S.tab}">
      <div class="mobile-tabs">
        ${['sources', 'chat', 'studio'].map((t) => `<button class="${S.tab === t ? 'on' : ''}" data-act="tab" data-v="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}
      </div>
      <section class="panel sources" id="pSources"></section>
      <section class="panel chat" id="pChat"></section>
      <section class="panel studio" id="pStudio"></section>
    </div>`;
  renderSources(); renderChat(); renderStudio();
}

const SRC_ICON = { pdf: 'pdf', image: 'image', audio: 'audio', ai: 'sparkle', text: 'text' };
const SRC_LABEL = { pdf: 'PDF', image: 'Image · OCR', audio: 'Audio · transcript', ai: 'AI-generated', text: 'Text' };

function renderSources() {
  const el = $('#pSources'); if (!el) return;
  const nb = S.nb;
  if (S.left.view === 'source') {
    const s = nb.sources.find((x) => x.id === S.left.id);
    if (!s) { S.left = { view: 'list' }; return renderSources(); }
    el.innerHTML = `
      <div class="panel-head">
        <button class="icon-btn sm" data-act="srcback" title="Back">${icon('back', 'sm')}</button>
        <h2 title="${esc(s.title)}">${esc(s.title)}</h2>
        <button class="icon-btn sm" data-act="speak" data-src="${s.id}" title="Read aloud">${icon('volume', 'sm')}</button>
      </div>
      <div class="panel-body">
        <div class="viewer-meta"><span class="tag ${s.type === 'ai' ? 'ai' : ''}">${SRC_LABEL[s.type] || s.type}</span><span>${s.content.length.toLocaleString()} characters</span><span>Added ${fmtDate(s.createdAt)}</span></div>
        ${s.type === 'ai' ? '<p class="viewer-meta">Written by the AI, not from an original document. Check facts before relying on them.</p>' : ''}
        <div class="viewer-text">${esc(s.content)}</div>
      </div>`;
    return;
  }
  const all = nb.sources.length && nb.sources.every((s) => s.enabled);
  el.innerHTML = `
    <div class="panel-head"><h2>Sources</h2></div>
    <div class="panel-body">
      <button class="btn block" data-act="addsrc">${icon('plus')} Add source</button>
      ${nb.sources.length ? `
        <label class="select-all"><span>Select all sources</span><input type="checkbox" class="check" data-act="selall" ${all ? 'checked' : ''}></label>
        ${nb.sources.map((s) => `
          <div class="src">
            <span class="ico ${s.type}">${s.status ? '<span class="spin"></span>' : icon(SRC_ICON[s.type] || 'text', 'sm')}</span>
            <button class="name" data-act="viewsrc" data-id="${s.id}" ${s.status ? 'disabled' : ''}>
              <b class="${isTibetan(s.title) ? 'bo' : ''}">${esc(s.title)}</b>
              <span>${s.status ? esc(s.progress || 'Processing…') : SRC_LABEL[s.type] || ''}</span>
            </button>
            ${s.status ? '' : `<button class="icon-btn sm del" data-act="delsrc" data-id="${s.id}" title="Remove">${icon('trash', 'sm')}</button>
            <input type="checkbox" class="check" data-act="togsrc" data-id="${s.id}" ${s.enabled ? 'checked' : ''} title="Use this source">`}
          </div>`).join('')}`
    : `<div class="empty"><div class="big">${icon('text')}</div>Saved sources will appear here.<br>Add a text, PDF, image, audio recording or topic.</div>`}
    </div>`;
}

/* ---------- chat ---------- */
function renderChat() {
  const el = $('#pChat'); if (!el) return;
  const nb = S.nb;
  const n = enabledSources().length;
  const hasSources = nb.sources.some((s) => !s.status);
  const guide = nb.guide;
  const msgs = nb.chat.map((m, idx) => m.role === 'user'
    ? `<div class="msg user"><div class="bubble">${esc(m.content)}</div></div>`
    : `<div class="msg ai ${m.error ? 'error' : ''}">
        <div class="body ${isTibetan(m.content) ? 'bo' : ''}">${md(m.content, m.cite)}</div>
        ${m.error ? '' : `<div class="msg-actions">
          <button class="icon-btn sm" data-act="savenote" data-i="${idx}" title="Save to note">${icon('pin', 'sm')}</button>
          <button class="icon-btn sm" data-act="copy" data-i="${idx}" title="Copy">${icon('copy', 'sm')}</button>
          <button class="icon-btn sm" data-act="speak" data-i="${idx}" title="Read aloud">${icon('volume', 'sm')}</button>
        </div>`}
      </div>`).join('');

  const questions = (guide?.questions || []).filter(Boolean);
  el.innerHTML = `
    <div class="panel-head"><h2>Chat</h2>
      ${nb.chat.length ? `<button class="btn ghost" data-act="clearchat" title="Clear conversation">${icon('refresh', 'sm')}<span class="hide-sm">Clear</span></button>` : ''}
    </div>
    <div class="chat-scroll" id="chatScroll"><div class="chat-inner">
      ${hasSources ? `
        <div class="guide">
          <div class="emoji">${esc(nb.emoji || '📘')}</div>
          <h1 class="${isTibetan(nb.title) ? 'bo' : ''}">${esc(nb.title)}</h1>
          <div class="count">${nb.sources.length} source${nb.sources.length === 1 ? '' : 's'}</div>
          ${S.guideBusy ? '<div class="thinking"><span class="spin"></span>Reading your sources…</div>'
            : guide?.summary ? `<div class="summary ${isTibetan(guide.summary) ? 'bo' : ''}">${md(guide.summary)}</div>
              <div class="guide-actions">
                <button class="btn" data-act="savenote" data-guide="1">${icon('pin', 'sm')} Save to note</button>
                <button class="btn" data-act="speak" data-guide="1">${icon('volume', 'sm')} Listen</button>
                <button class="btn ghost" data-act="guide">${icon('refresh', 'sm')} Refresh</button>
              </div>`
            : `<button class="btn" data-act="guide">${icon('sparkle', 'sm')} Generate notebook overview</button>`}
        </div>` : `
        <div class="empty" style="padding-top:12vh">
          <div class="big">${icon('upload')}</div>
          <h3 style="margin:0 0 6px;color:var(--text)">Add a source to get started</h3>
          <p style="margin:0 0 16px">Tibetan or English text, PDFs, scanned pages, audio, or just a topic.</p>
          <button class="btn accent" data-act="addsrc">${icon('upload')} Upload a source</button>
        </div>`}
      ${msgs}
      ${S.chatBusy ? '<div class="thinking"><span class="dots"><span></span><span></span><span></span></span> Melong is thinking…</div>' : ''}
    </div></div>
    ${hasSources && !nb.chat.length && questions.length ? `<div class="suggest">${questions.map((q) => `<button class="chip" data-act="ask" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>` : ''}
    <div class="composer-wrap">
      <div class="composer">
        <textarea id="chatInput" rows="1" placeholder="${hasSources ? (S.lang === 'bo' ? 'དྲི་བ་འདིར་འབྲི།  Ask about your sources…' : 'Ask about your sources…') : 'Upload a source to get started'}" ${hasSources ? '' : 'disabled'}></textarea>
        <span class="count">${n} source${n === 1 ? '' : 's'}</span>
        <button class="icon-btn" id="micBtn" data-act="mic" title="Ask by voice" ${hasSources ? '' : 'disabled'}>${icon('mic')}</button>
        <button class="send" id="sendBtn" data-act="send" title="Send" disabled>${icon('send')}</button>
      </div>
    </div>`;
  const ta = $('#chatInput');
  const grow = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'; $('#sendBtn').disabled = !ta.value.trim() || S.chatBusy; };
  ta.addEventListener('input', grow);
  ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); sendChat(ta.value); } });
  const sc = $('#chatScroll'); sc.scrollTop = sc.scrollHeight;
}

async function sendChat(q) {
  q = (q || '').trim();
  if (!q || S.chatBusy) return;
  const srcs = enabledSources();
  if (!srcs.length) return toast('Select at least one source first');
  const nb = S.nb;
  const history = nb.chat.filter((m) => !m.error).map(({ role, content }) => ({ role, content }));
  nb.chat.push({ role: 'user', content: q });
  S.chatBusy = true; S.tab = 'chat'; renderChat();
  try {
    const { answer } = await post('/api/chat', { question: q, history, sources: payload(srcs), lang: S.lang });
    nb.chat.push({ role: 'assistant', content: answer, cite: srcs.map((s) => s.id) });
  } catch (e) {
    nb.chat.push({ role: 'assistant', content: '⚠️ ' + e.message, error: true });
  }
  S.chatBusy = false; save(); renderChat();
}

let guideTimer;
function scheduleGuide() { clearTimeout(guideTimer); guideTimer = setTimeout(generateGuide, 600); }
async function generateGuide() {
  const srcs = enabledSources();
  if (!srcs.length || S.guideBusy) return;
  S.guideBusy = true; renderChat();
  try {
    const { data } = await post('/api/generate', { kind: 'guide', sources: payload(srcs), lang: S.lang });
    S.nb.guide = data; save();
  } catch (e) { toast(e.message, 'error'); }
  S.guideBusy = false; renderChat();
}

/* ---------- studio ---------- */
function renderStudio() {
  const el = $('#pStudio'); if (!el) return;
  const nb = S.nb;
  if (S.studio.view === 'note') {
    const note = nb.notes.find((x) => x.id === S.studio.id);
    if (!note) { S.studio = { view: 'home' }; return renderStudio(); }
    const textual = typeof note.data === 'string';
    el.innerHTML = `
      <div class="panel-head">
        <button class="icon-btn sm" data-act="studioback" title="Back to Studio">${icon('back', 'sm')}</button>
        <h2 title="${esc(note.title)}">${esc(note.title)}</h2>
        ${textual ? `<button class="icon-btn sm" data-act="speak" data-note="${note.id}" title="Read aloud">${icon('volume', 'sm')}</button>
        <button class="icon-btn sm" data-act="copynote" data-id="${note.id}" title="Copy">${icon('copy', 'sm')}</button>` : ''}
        <button class="icon-btn sm" data-act="delnote" data-id="${note.id}" title="Delete">${icon('trash', 'sm')}</button>
      </div>
      <div class="panel-body" id="noteBody">${renderNoteBody(note)}</div>`;
    return;
  }
  const a = nb.audio;
  const busy = (k) => !!S.gen[k];
  el.innerHTML = `
    <div class="panel-head"><h2>Studio</h2></div>
    <div class="panel-body">
      <div class="audio-card">
        <h3>${icon('audio', 'sm')} Audio overview</h3>
        <p>${a ? esc(a.title) + ` · ${a.lines.length} lines` : 'A two-host conversation about your sources, read aloud with Monlam text-to-speech.'}</p>
        <div class="audio-row">
          ${busy('audio') ? '<button class="btn" disabled><span class="spin"></span> Writing script…</button>'
            : a ? `<button class="btn accent" data-act="playaudio">${icon(player.isAudioOverview() && !player.paused ? 'pause' : 'play', 'sm')} ${player.isAudioOverview() && !player.paused ? 'Pause' : 'Play'}</button>
                   <button class="btn ghost" data-act="toggletranscript">${S.showTranscript ? 'Hide' : 'Transcript'}</button>
                   <button class="icon-btn sm" data-act="gen" data-kind="audio" title="Regenerate">${icon('refresh', 'sm')}</button>`
            : `<button class="btn accent" data-act="gen" data-kind="audio">${icon('sparkle', 'sm')} Generate</button>`}
        </div>
        ${a && S.showTranscript ? `<div class="transcript" id="transcript">${a.lines.map((l, i) => `<div class="line ${l.speaker}" data-act="playline" data-i="${i}" id="line-${i}"><b>${l.speaker === 'A' ? 'Host 1' : 'Host 2'}</b>${esc(l.text)}</div>`).join('')}</div>` : ''}
      </div>
      <div class="studio-label">Create</div>
      <div class="tools">
        ${TOOLS.map((t) => `<button class="tool" data-act="gen" data-kind="${t.kind}" ${busy(t.kind) ? 'disabled' : ''} title="${esc(t.bo)}">
          ${busy(t.kind) ? '<span class="spin"></span>' : icon(t.icon)} <span>${t.label}</span></button>`).join('')}
      </div>
      <div class="studio-label"><span>Notes</span><button class="btn ghost" data-act="addnote" style="padding:4px 10px;font-size:13px">${icon('plus', 'sm')} Add note</button></div>
      ${nb.notes.length ? nb.notes.map((n) => `
        <button class="note-item" data-act="opennote" data-id="${n.id}">
          <span class="ico">${icon(TOOL[n.kind]?.icon || 'note', 'sm')}</span>
          <div><b class="${isTibetan(n.title) ? 'bo' : ''}">${esc(n.title)}</b><span>${TOOL[n.kind]?.label || 'Note'} · ${ago(n.createdAt)}</span></div>
        </button>`).join('')
      : `<div class="empty" style="padding:20px 8px"><div class="big">${icon('note')}</div>Generated study materials and saved answers appear here.</div>`}
    </div>`;
}

function renderNoteBody(note) {
  const d = note.data;
  if (note.kind === 'note') {
    return `<textarea class="textarea" id="noteEdit" placeholder="Write your note…">${esc(d)}</textarea>`;
  }
  if (note.kind === 'quiz') {
    const qs = d.questions || [];
    note.answers ||= {};
    const answered = Object.keys(note.answers).length;
    const correct = qs.filter((q, i) => note.answers[i] === q.answer).length;
    return qs.map((q, i) => {
      const picked = note.answers[i];
      const done = picked !== undefined;
      return `<div class="q"><h4><small>${i + 1}.</small>${esc(q.question)}</h4>
        ${q.options.map((o, j) => `<button class="opt ${done && j === q.answer ? 'right' : ''} ${done && j === picked && j !== q.answer ? 'wrong' : ''}" data-act="answer" data-q="${i}" data-o="${j}" ${done ? 'disabled' : ''}>${'ABCDEF'[j]}. ${esc(o)}</button>`).join('')}
        ${done && q.explanation ? `<div class="explain">${md(q.explanation, note.cite)}</div>` : ''}
      </div>`;
    }).join('') + `<div class="score"><span>Score: ${correct} / ${qs.length}${answered < qs.length ? ` <span style="color:var(--faint);font-weight:400">(${qs.length - answered} left)</span>` : ''}</span>
      <button class="btn" data-act="retryquiz" data-id="${note.id}">${icon('refresh', 'sm')} Retry</button></div>`;
  }
  if (note.kind === 'mindmap') {
    const tree = (n, depth) => `<li>
        <button class="node ${depth === 0 ? 'root' : depth === 1 ? 'l1' : ''}" data-act="mmnode" data-t="${esc(n.title)}">
          ${n.children?.length && depth > 0 ? '<span class="tog" data-act="mmtog">▾</span>' : ''}${esc(n.title)}</button>
        ${n.children?.length ? `<ul>${n.children.map((c) => tree(c, depth + 1)).join('')}</ul>` : ''}
      </li>`;
    return `<div class="mm-hint">Click a topic to ask about it in chat. Click ▾ to fold a branch.</div><div class="mm"><ul>${tree(d, 0)}</ul></div>`;
  }
  if (typeof d !== 'string') return '<div class="empty">This note type is no longer supported.</div>';
  return `<div class="${isTibetan(d) ? 'bo' : ''}">${md(d, note.cite)}</div>`;
}

async function generate(kind) {
  if (S.gen[kind]) return;
  const srcs = enabledSources();
  if (!srcs.length) return toast('Select at least one source first');
  S.gen[kind] = true; renderStudio();
  try {
    const res = await post('/api/generate', { kind, sources: payload(srcs), lang: S.lang });
    if (kind === 'audio') {
      if (!res.data?.lines?.length) throw new Error('The audio script came back empty. Try again.');
      S.nb.audio = { ...res.data, createdAt: Date.now() };
      S.showTranscript = true;
    } else {
      const note = { id: uid(), kind, title: res.title || TOOL[kind].label, data: res.data, createdAt: Date.now(), cite: srcs.map((s) => s.id) };
      S.nb.notes.unshift(note);
      S.studio = { view: 'note', id: note.id };
    }
    save();
  } catch (e) { toast(e.message, 'error'); }
  delete S.gen[kind];
  renderStudio();
}

/* ================= TTS player ================= */
function chunkText(text, max = 500) {
  const parts = plain(text).split(/(?<=[།༎\.\!\?\n])\s*/).filter((p) => p.trim());
  const out = []; let cur = '';
  for (const p of parts) {
    if ((cur + ' ' + p).length > max && cur) { out.push(cur.trim()); cur = p; }
    else cur = cur ? cur + ' ' + p : p;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.flatMap((c) => c.length > max * 1.6 ? c.match(new RegExp(`[\\s\\S]{1,${max}}`, 'g')) : [c]);
}

const player = {
  audio: new Audio(), queue: [], i: 0, label: '', kind: '', paused: true, cache: new Map(), token: 0,
  isAudioOverview() { return this.kind === 'overview' && this.queue.length > 0; },
  async fetchUrl(idx, token) {
    if (this.cache.has(idx)) return this.cache.get(idx);
    const text = this.queue[idx], voice = this.voices[idx] || 'A';
    const cacheKey = `${voice}|${text}`;
    const p = (async () => {
      // audio already heard is kept in this browser, so replays don't use API requests
      let blob = await idb.get('tts', cacheKey).catch(() => null);
      if (!blob) {
        blob = await api('/api/tts', { method: 'POST', body: JSON.stringify({ text, voice }), blob: true });
        idb.put('tts', blob, cacheKey).catch(() => {});
      }
      return URL.createObjectURL(blob);
    })();
    this.cache.set(idx, p);
    p.catch(() => { if (token === this.token) this.cache.delete(idx); });
    return p;
  },
  voices: [],
  start(chunks, { label, kind = 'read', from = 0, voices = [] } = {}) {
    this.stop(false);
    if (!chunks.length) return;
    this.queue = chunks; this.voices = voices; this.label = label; this.kind = kind; this.i = from; this.token++;
    this.playIndex(from);
  },
  async playIndex(idx) {
    const token = this.token;
    if (idx >= this.queue.length) return this.stop();
    this.i = idx; this.paused = false; this.render(true);
    try {
      const url = await this.fetchUrl(idx, token);
      if (token !== this.token) return;
      this.audio.src = url;
      await this.audio.play();
      if (idx + 1 < this.queue.length) this.fetchUrl(idx + 1, token).catch(() => {});
      this.render();
    } catch (e) {
      if (token !== this.token) return;
      toast(e.message, 'error'); this.stop();
    }
  },
  toggle() {
    if (!this.queue.length) return;
    if (this.paused) { this.paused = false; this.audio.play().catch(() => this.playIndex(this.i)); }
    else { this.paused = true; this.audio.pause(); }
    this.render();
  },
  stop(rerender = true) {
    this.token++; this.audio.pause(); this.audio.removeAttribute('src');
    for (const p of this.cache.values()) p.then((u) => URL.revokeObjectURL(u)).catch(() => {});
    this.cache.clear(); this.queue = []; this.paused = true; this.kind = '';
    $('#player').hidden = true;
    document.querySelectorAll('.line.now').forEach((x) => x.classList.remove('now'));
    if (rerender && S.nb && S.studio.view === 'home') renderStudio();
  },
  render(loading = false) {
    const el = $('#player');
    el.hidden = false;
    el.innerHTML = `
      ${loading ? '<span class="spin"></span>' : icon('volume', 'sm')}
      <span class="label">${esc(this.label)}</span>
      <span class="prog">${this.i + 1} / ${this.queue.length}</span>
      <button class="icon-btn sm" data-act="pprev" title="Previous">${icon('prev', 'sm')}</button>
      <button class="icon-btn sm" data-act="ptoggle" title="Play/pause">${icon(this.paused ? 'play' : 'pause', 'sm')}</button>
      <button class="icon-btn sm" data-act="pnext" title="Next">${icon('next', 'sm')}</button>
      <button class="icon-btn sm" data-act="pstop" title="Stop">${icon('close', 'sm')}</button>`;
    if (this.kind === 'overview') {
      document.querySelectorAll('.line.now').forEach((x) => x.classList.remove('now'));
      const line = document.getElementById(`line-${this.i}`);
      if (line) { line.classList.add('now'); line.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      const btn = document.querySelector('[data-act="playaudio"]');
      if (btn) btn.innerHTML = `${icon(this.paused ? 'play' : 'pause', 'sm')} ${this.paused ? 'Play' : 'Pause'}`;
    }
  },
};
player.audio.addEventListener('ended', () => player.playIndex(player.i + 1));

function speak(text, label) {
  const chunks = chunkText(text);
  if (!chunks.length) return toast('Nothing to read');
  player.start(chunks, { label: label || 'Reading aloud' });
}

/* ================= recording ================= */
const recorder = {
  rec: null, chunks: [], stream: null,
  async start() {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('This browser cannot record audio.');
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find((t) => window.MediaRecorder?.isTypeSupported?.(t)) || '';
    this.rec = new MediaRecorder(this.stream, type ? { mimeType: type } : undefined);
    this.chunks = [];
    this.rec.ondataavailable = (e) => e.data.size && this.chunks.push(e.data);
    this.rec.start();
  },
  stop() {
    return new Promise((resolve) => {
      if (!this.rec) return resolve(null);
      this.rec.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.rec.mimeType || 'audio/webm' });
        this.stream.getTracks().forEach((t) => t.stop());
        this.rec = null; resolve(blob);
      };
      this.rec.stop();
    });
  },
  get on() { return !!this.rec; },
};
const extFor = (mime) => mime.includes('mp4') ? 'm4a' : mime.includes('ogg') ? 'ogg' : mime.includes('wav') ? 'wav' : 'webm';

function checkSize(blob) {
  const max = S.status.maxUploadMB || 40;
  if (blob.size > max * 1024 * 1024) {
    throw new Error(`File is ${(blob.size / 1048576).toFixed(1)} MB; the limit here is ${max} MB.${S.status.hosted ? ' Split it into smaller parts, or run Zintho on your computer for bigger files.' : ''}`);
  }
}
async function transcribe(blob, filename) {
  checkSize(blob);
  const { text } = await post('/api/stt', { data: await fileToBase64(blob), mime: blob.type || 'audio/webm', filename });
  return text;
}
async function ocrBlob(blob, filename) {
  checkSize(blob);
  const { text } = await post('/api/ocr', { data: await fileToBase64(blob), mime: blob.type || 'image/png', filename });
  return text;
}

/* ================= sources: add ================= */
function addPending(title, type) {
  const s = { id: uid(), title, type, content: '', enabled: true, status: 'processing', progress: 'Processing…', createdAt: Date.now() };
  S.nb.sources.push(s); S.tab = 'sources';
  renderSources(); renderChat();
  return s;
}
function finishSource(s, content) {
  delete s.status; delete s.progress;
  s.content = (content || '').trim();
  if (!s.content) { removeSource(s.id); return toast(`No text found in “${s.title}”`, 'error'); }
  save(); renderSources(); renderChat(); scheduleGuide();
}
function failSource(s, e) { removeSource(s.id); toast(`${s.title}: ${e.message}`, 'error'); }
function removeSource(id) {
  S.nb.sources = S.nb.sources.filter((x) => x.id !== id);
  if (S.left.id === id) S.left = { view: 'list' };
  save(); renderSources(); renderChat();
}
const progress = (s, msg) => { s.progress = msg; renderSources(); };

async function processFile(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const t = file.type || '';
  const isImg = t.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'tif', 'tiff', 'bmp', 'heic'].includes(ext);
  const isAudio = t.startsWith('audio/') || t.startsWith('video/') || ['mp3', 'wav', 'm4a', 'ogg', 'webm', 'flac', 'aac', 'mp4', 'mov'].includes(ext);
  const isText = t.startsWith('text/') || ['txt', 'md', 'csv', 'json', 'html', 'srt', 'vtt'].includes(ext);
  const type = ext === 'pdf' ? 'pdf' : isImg ? 'image' : isAudio ? 'audio' : isText ? 'text' : null;
  if (!type) return toast(`“${file.name}” isn’t supported. Use PDF, images, audio or text files.`, 'error');
  const s = addPending(file.name.replace(/\.[^.]+$/, ''), type);
  try {
    if (type === 'text') finishSource(s, await file.text());
    else if (type === 'image') { progress(s, 'Reading text with Monlam OCR…'); finishSource(s, await ocrBlob(file, file.name)); }
    else if (type === 'audio') {
      progress(s, 'Transcribing with Monlam STT…'); finishSource(s, await transcribe(file, file.name));
    } else if (type === 'pdf') finishSource(s, await pdfToText(file, (m) => progress(s, m)));
  } catch (e) { failSource(s, e); }
}

async function pdfToText(file, onProgress) {
  const lib = window.pdfjsLib;
  if (!lib) throw new Error('The PDF reader did not load (it needs an internet connection).');
  lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const doc = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    onProgress(`Page ${p} of ${doc.numPages}…`);
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    let text = tc.items.map((it) => it.str + (it.hasEOL ? '\n' : '')).join('');
    if (text.replace(/\s/g, '').length < 20) {
      // scanned page: render it and send to OCR
      onProgress(`OCR page ${p} of ${doc.numPages}…`);
      const vp = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
      const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
      text = await ocrBlob(blob, `${file.name}-page${p}.jpg`);
    }
    pages.push(text.trim());
  }
  return pages.filter(Boolean).join('\n\n');
}

/* ---------- add-source modal ---------- */
let modalTab = 'upload';
function openModal(title, bodyHtml, onMount) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="backdrop" data-act="closemodal-bg"><div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="modal-head"><h2>${esc(title)}</h2><button class="icon-btn" data-act="closemodal" title="Close">${icon('close')}</button></div>
      <div class="modal-body">${bodyHtml}</div></div></div>`;
  onMount?.(root);
}
function closeModal() {
  if (recorder.on) recorder.stop();
  clearInterval(recTimer);
  $('#modal-root').innerHTML = '';
}

function openAddSource(tab = modalTab) {
  modalTab = tab;
  const tabs = [['upload', 'upload', 'Upload'], ['paste', 'text', 'Paste text'], ['record', 'mic', 'Record'], ['topic', 'bulb', 'From a topic']];
  const body = {
    upload: `<label class="drop" id="drop">
        <input type="file" id="fileIn" multiple hidden accept=".pdf,.txt,.md,.csv,.srt,.vtt,image/*,audio/*,video/*">
        <div class="big">${icon('upload')}</div>
        <h3>Upload sources</h3>
        <p>Drag & drop files here, or click to browse</p>
        <span class="btn">${icon('upload', 'sm')} Choose files</span>
        <div class="types">
          <span>${icon('pdf', 'sm')} PDF</span><span>${icon('image', 'sm')} Images → OCR</span>
          <span>${icon('audio', 'sm')} Audio → transcript</span><span>${icon('text', 'sm')} .txt / .md</span>
        </div>
      </label>`,
    paste: `<label class="field"><span>Title</span><input class="input" id="pTitle" placeholder="e.g. བོད་ཀྱི་ལོ་རྒྱུས། — Chapter 1"></label>
      <label class="field"><span>Text (Tibetan or English)</span><textarea class="textarea" id="pText" placeholder="Paste your text here…"></textarea></label>
      <div class="row-end"><button class="btn accent" data-act="addpaste">${icon('plus', 'sm')} Add source</button></div>`,
    record: `<div class="rec-box">
        <button class="rec-btn ${recorder.on ? 'on' : ''}" data-act="recsrc" title="Start / stop recording">${icon(recorder.on ? 'stop' : 'mic')}</button>
        <div class="timer" id="recTime">${recorder.on ? '' : '0:00'}</div>
        <p class="modal-sub" style="margin-top:8px">Record a teaching, lecture or your own notes. Monlam speech-to-text will turn it into a source.</p>
      </div>`,
    topic: `<p class="modal-sub">No document? Enter a topic and Melong will write a study document about it. It's marked “AI-generated” so you know it isn't an original source.</p>
      <label class="field"><span>Topic</span><input class="input" id="tTopic" placeholder="e.g. The life of Thonmi Sambhota"></label>
      <div class="examples">${['The life of Thonmi Sambhota', 'ལོ་གསར་གྱི་སྲོལ་རྒྱུན།', 'The Four Noble Truths', 'Tibetan grammar: the case particles'].map((x) => `<button class="chip" data-act="topicex" data-q="${esc(x)}">${esc(x)}</button>`).join('')}</div>
      <div class="row-end"><button class="btn accent" data-act="addtopic">${icon('sparkle', 'sm')} Generate source</button></div>`,
  };
  openModal('Add sources', `
    <p class="modal-sub">Sources let Zintho base its answers on the information that matters most to you.</p>
    <div class="tabs">${tabs.map(([k, ic, l]) => `<button class="${k === tab ? 'on' : ''}" data-act="mtab" data-v="${k}">${icon(ic, 'sm')} ${l}</button>`).join('')}</div>
    ${body[tab]}`, (root) => {
    const drop = $('#drop', root);
    if (drop) {
      const inp = $('#fileIn', root);
      inp.addEventListener('change', () => { const files = [...inp.files]; closeModal(); files.forEach(processFile); });
      ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
      ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
      drop.addEventListener('drop', (e) => { const files = [...e.dataTransfer.files]; closeModal(); files.forEach(processFile); });
    }
    $('#pTitle', root)?.focus(); $('#tTopic', root)?.focus();
    $('#tTopic', root)?.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTopic(); });
  });
}

let recTimer;
async function toggleRecordSource() {
  if (!recorder.on) {
    try { await recorder.start(); } catch (e) { return toast(e.message, 'error'); }
    const t0 = Date.now();
    openAddSource('record');
    recTimer = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); const el = $('#recTime'); if (el) el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 250);
  } else {
    clearInterval(recTimer);
    const blob = await recorder.stop();
    closeModal();
    if (!blob || blob.size < 1000) return toast('Recording was too short');
    const s = addPending(`Recording · ${new Date().toLocaleString()}`, 'audio');
    progress(s, 'Transcribing with Monlam STT…');
    try { finishSource(s, await transcribe(blob, `recording.${extFor(blob.type)}`)); } catch (e) { failSource(s, e); }
  }
}

function addPaste() {
  const text = $('#pText').value.trim();
  if (!text) return toast('Paste some text first');
  const title = $('#pTitle').value.trim() || text.split('\n')[0].slice(0, 60);
  closeModal();
  const s = addPending(title, 'text');
  finishSource(s, text);
}

async function addTopic() {
  const topic = $('#tTopic')?.value.trim();
  if (!topic) return toast('Enter a topic first');
  closeModal();
  const s = addPending(topic, 'ai');
  progress(s, 'Melong is writing…');
  try {
    const res = await post('/api/generate', { kind: 'topic', topic, lang: S.lang });
    s.title = res.title || topic;
    finishSource(s, res.data);
  } catch (e) { failSource(s, e); }
}

/* ---------- voice question ---------- */
async function toggleMic() {
  const btn = $('#micBtn');
  if (!recorder.on) {
    try { await recorder.start(); } catch (e) { return toast(e.message, 'error'); }
    btn.classList.add('rec-on'); btn.title = 'Stop and transcribe';
    toast('Listening… click the mic again when you finish');
  } else {
    const blob = await recorder.stop();
    btn.classList.remove('rec-on'); btn.disabled = true;
    try {
      const text = await transcribe(blob, `question.${extFor(blob.type)}`);
      const ta = $('#chatInput'); ta.value = (ta.value + ' ' + text).trim(); ta.dispatchEvent(new Event('input')); ta.focus();
    } catch (e) { toast(e.message, 'error'); }
    btn.disabled = false;
  }
}

/* ---------- settings ---------- */
function openSettings() {
  const st = S.status;
  const k = getKey();
  const state = k ? '<span style="color:var(--ok);font-weight:600">✓ Using your API key</span>'
    : st.hasServerKey ? '<span style="color:var(--ok);font-weight:600">✓ Using the key set on the server</span>'
    : '<span style="color:var(--accent-2);font-weight:600">No key yet: demo mode (sample answers)</span>';
  openModal('Settings', `
    <h3 style="margin:0 0 4px;font-size:16px">Monlam API key</h3>
    <p class="modal-sub" style="margin-bottom:10px">${state}</p>
    <label class="field"><span>Paste your key from Monlam Studio → API keys</span>
      <div style="display:flex;gap:8px">
        <input class="input" id="keyIn" type="password" autocomplete="off" spellcheck="false" placeholder="${k ? esc(maskKey(k)) : 'Your Monlam API key'}" style="font-family:ui-monospace,Menlo,monospace">
        <button class="btn" data-act="keyshow" title="Show / hide" type="button">Show</button>
      </div>
    </label>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px">
      <button class="btn accent" data-act="keysave">${icon('check', 'sm')} Save key</button>
      ${k || st.hasServerKey ? `<button class="btn" data-act="keytest">Test connection</button>` : ''}
      ${k ? `<button class="btn ghost" data-act="keyremove">${icon('trash', 'sm')} Remove my key</button>` : ''}
    </div>
    <p class="modal-sub" id="keyMsg" style="min-height:22px;margin:6px 0 10px"></p>
    <div class="callout">Your key is saved <b>only in this browser</b> on this device. It's sent with your requests to Monlam and never stored on the server. Remove it here if you use a shared computer.</div>
    <dl class="kv" style="margin-top:18px">
      <dt>Chat model</dt><dd>${esc(st.chatModel)}</dd>
      <dt>Text-to-speech</dt><dd>${esc(st.ttsModel)}</dd>
      <dt>Speech-to-text</dt><dd>${esc(st.sttModel)}</dd>
      <dt>OCR</dt><dd>${esc(st.ocrModel)}</dd>
      <dt>Upload limit</dt><dd>${esc(st.maxUploadMB)} MB per file</dd>
    </dl>`, (root) => {
    $('#keyIn', root).addEventListener('keydown', (e) => { if (e.key === 'Enter') saveKey(); });
    if (!k) $('#keyIn', root).focus();
  });
}

function saveKey() {
  const v = $('#keyIn').value.trim();
  if (!v) { $('#keyMsg').textContent = 'Paste a key first.'; return; }
  if (!/^[\x21-\x7e]{8,256}$/.test(v)) { $('#keyMsg').textContent = "That doesn't look like an API key (no spaces, at least 8 characters)."; return; }
  setKey(v);
  toast('API key saved in this browser');
  renderTopbar(); if (!S.nb) renderHome();
  openSettings(); testKey();
}

async function testKey() {
  const msg = $('#keyMsg'); if (!msg) return;
  msg.innerHTML = '<span class="spin" style="display:inline-block;vertical-align:-4px;margin-right:6px"></span>Testing (uses 1 request)…';
  try {
    await post('/api/test', {});
    msg.innerHTML = '<span style="color:var(--ok);font-weight:600">✓ Connected to Monlam: the key works.</span>';
  } catch (e) {
    msg.innerHTML = `<span style="color:var(--bad)">✗ ${esc(e.message)}</span>`;
  }
}

/* ================= events ================= */
document.addEventListener('click', async (e) => {
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const act = t.dataset.act;
  const nb = S.nb;
  switch (act) {
    case 'home': location.hash = '#/'; break;
    case 'lang': S.lang = t.dataset.v; store('lang', S.lang); renderTopbar(); break;
    case 'theme': {
      const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
      const next = dark ? 'light' : 'dark';
      document.documentElement.dataset.theme = next; store('theme', next); renderTopbar(); break;
    }
    case 'settings': openSettings(); break;
    case 'keysave': saveKey(); break;
    case 'keytest': testKey(); break;
    case 'keyremove': setKey(''); toast('Your key was removed from this browser'); renderTopbar(); if (!S.nb) renderHome(); openSettings(); break;
    case 'keyshow': { const i = $('#keyIn'); i.type = i.type === 'password' ? 'text' : 'password'; t.textContent = i.type === 'password' ? 'Show' : 'Hide'; break; }
    case 'newnb': createNotebook().catch((er) => toast(er.message, 'error')); break;
    case 'open': location.hash = `#/nb/${t.dataset.id}`; break;
    case 'delnb':
      e.stopPropagation();
      if (confirm('Delete this notebook and all its sources and notes?')) {
        await idb.del('notebooks', t.dataset.id);
        S.notebooks = S.notebooks.filter((n) => n.id !== t.dataset.id); renderHome();
      }
      break;
    case 'tab': S.tab = t.dataset.v; $('.nb').dataset.tab = S.tab; document.querySelectorAll('.mobile-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.v === S.tab)); break;

    // sources
    case 'addsrc': openAddSource(); break;
    case 'mtab': openAddSource(t.dataset.v); break;
    case 'closemodal': closeModal(); break;
    case 'closemodal-bg': if (e.target === t && !recorder.on) closeModal(); break;
    case 'addpaste': addPaste(); break;
    case 'addtopic': addTopic(); break;
    case 'topicex': $('#tTopic').value = t.dataset.q; break;
    case 'recsrc': toggleRecordSource(); break;
    case 'viewsrc': S.left = { view: 'source', id: t.dataset.id }; S.tab = 'sources'; renderSources(); break;
    case 'srcback': S.left = { view: 'list' }; renderSources(); break;
    case 'delsrc': {
      const s = nb.sources.find((x) => x.id === t.dataset.id);
      if (s && confirm(`Remove “${s.title}”?`)) removeSource(s.id);
      break;
    }
    case 'cite': {
      const s = nb?.sources.find((x) => x.id === t.dataset.id);
      if (!s) { toast('That source was removed'); break; }
      S.left = { view: 'source', id: s.id }; S.tab = 'sources'; renderSources();
      $('.nb').dataset.tab = 'sources';
      break;
    }

    // chat
    case 'send': sendChat($('#chatInput').value); break;
    case 'ask': sendChat(t.dataset.q); break;
    case 'mic': toggleMic(); break;
    case 'guide': generateGuide(); break;
    case 'clearchat': if (confirm('Clear the conversation?')) { nb.chat = []; save(); renderChat(); } break;
    case 'copy': navigator.clipboard.writeText(plain(nb.chat[t.dataset.i].content)).then(() => toast('Copied')); break;
    case 'savenote': {
      const content = t.dataset.guide ? nb.guide.summary : nb.chat[t.dataset.i].content;
      const title = t.dataset.guide ? 'Notebook overview' : (nb.chat[t.dataset.i - 1]?.content || 'Saved response').slice(0, 60);
      nb.notes.unshift({ id: uid(), kind: 'saved', title, data: content, createdAt: Date.now(), cite: nb.chat[t.dataset.i]?.cite || enabledSources().map((s) => s.id) });
      save(); S.studio = { view: 'home' }; renderStudio(); toast('Saved to notes');
      break;
    }
    case 'speak': {
      if (t.dataset.src) { const s = nb.sources.find((x) => x.id === t.dataset.src); speak(s.content, s.title); }
      else if (t.dataset.note) { const n = nb.notes.find((x) => x.id === t.dataset.note); speak(n.data, n.title); }
      else if (t.dataset.guide) speak(nb.guide.summary, 'Notebook overview');
      else speak(nb.chat[t.dataset.i].content, 'Chat answer');
      break;
    }

    // studio
    case 'gen': generate(t.dataset.kind); break;
    case 'opennote': S.studio = { view: 'note', id: t.dataset.id }; renderStudio(); break;
    case 'studioback': S.studio = { view: 'home' }; renderStudio(); break;
    case 'delnote': if (confirm('Delete this note?')) { nb.notes = nb.notes.filter((n) => n.id !== t.dataset.id); S.studio = { view: 'home' }; save(); renderStudio(); } break;
    case 'copynote': navigator.clipboard.writeText(plain(nb.notes.find((n) => n.id === t.dataset.id).data)).then(() => toast('Copied')); break;
    case 'addnote': {
      const note = { id: uid(), kind: 'note', title: 'New note', data: '', createdAt: Date.now() };
      nb.notes.unshift(note); S.studio = { view: 'note', id: note.id }; save(); renderStudio();
      $('#noteEdit')?.focus();
      break;
    }
    case 'answer': {
      const note = nb.notes.find((n) => n.id === S.studio.id);
      note.answers[t.dataset.q] = Number(t.dataset.o); save();
      const scroll = $('#noteBody').scrollTop; renderStudio(); $('#noteBody').scrollTop = scroll;
      break;
    }
    case 'retryquiz': { const note = nb.notes.find((n) => n.id === t.dataset.id); note.answers = {}; save(); renderStudio(); break; }
    case 'mmtog': e.stopPropagation(); t.closest('li').classList.toggle('closed'); t.textContent = t.closest('li').classList.contains('closed') ? '▸' : '▾'; break;
    case 'mmnode':
      if (e.target.closest('[data-act="mmtog"]')) break;
      sendChat(S.lang === 'bo' ? `“${t.dataset.t}” སྐོར་ཁུངས་ལ་གཞིགས་ནས་འགྲེལ་བཤད་གནང་རོགས།` : `Explain “${t.dataset.t}” based on the sources.`);
      break;
    case 'playaudio':
      if (player.isAudioOverview()) player.toggle();
      else player.start(nb.audio.lines.map((l) => l.text), { label: nb.audio.title, kind: 'overview', voices: nb.audio.lines.map((l) => l.speaker) });
      break;
    case 'playline': player.start(nb.audio.lines.map((l) => l.text), { label: nb.audio.title, kind: 'overview', from: Number(t.dataset.i), voices: nb.audio.lines.map((l) => l.speaker) }); break;
    case 'toggletranscript': S.showTranscript = !S.showTranscript; renderStudio(); if (player.isAudioOverview()) player.render(); break;

    // player
    case 'ptoggle': player.toggle(); break;
    case 'pstop': player.stop(); break;
    case 'pnext': if (player.i + 1 < player.queue.length) player.playIndex(player.i + 1); break;
    case 'pprev': player.playIndex(Math.max(0, player.i - 1)); break;
  }
});

document.addEventListener('change', (e) => {
  const t = e.target.closest('[data-act]');
  if (!t || !S.nb) return;
  if (t.dataset.act === 'togsrc') {
    const s = S.nb.sources.find((x) => x.id === t.dataset.id); s.enabled = t.checked;
    save(); renderSources(); renderChat();
  }
  if (t.dataset.act === 'selall') {
    S.nb.sources.forEach((s) => { s.enabled = t.checked; }); save(); renderSources(); renderChat();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('#modal-root').innerHTML && !recorder.on) closeModal();
  if (e.key === 'Enter' && e.target.matches('.nb-card[data-act="open"]')) location.hash = `#/nb/${e.target.dataset.id}`;
});

// open the editor for existing manual notes
new MutationObserver(() => {
  const ta = $('#noteEdit');
  if (ta && !ta.dataset.bound) {
    ta.dataset.bound = '1';
    const note = S.nb?.notes.find((n) => n.id === S.studio.id);
    if (note) ta.addEventListener('input', () => { note.data = ta.value; note.title = ta.value.split('\n')[0].slice(0, 60) || 'New note'; save(); });
  }
}).observe(document.body, { childList: true, subtree: true });

/* ================= boot ================= */
window.addEventListener('hashchange', route);
(async () => {
  S.status = await api('/api/status').catch(() => ({ demo: true }));
  await importLegacy();
  await route();
})();
