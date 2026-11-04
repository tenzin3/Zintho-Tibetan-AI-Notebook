// Zintho visuals: infographic + slide deck.
// Melong writes the content (JSON); this file draws it with fixed designs
// and exports it (PNG, PowerPoint, PDF). No image model is involved.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const FONT = `Inter, 'Noto Sans Tibetan', Kailasa, 'Microsoft Himalaya', system-ui, sans-serif`;
const C = { maroon: '#a8361a', saffron: '#c9781b', cream: '#fbf6f0', soft: '#f6e3da', ink: '#1f1f1f', muted: '#5f6368', line: '#eadfd6' };

/* ---------------- icons ---------------- */
const P = (d) => `<path d="${d}"/>`;
const ICON = {
  book: P('M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'),
  scroll: P('M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4M19 17V5a2 2 0 0 0-2-2H4'),
  person: '<circle cx="12" cy="8" r="4"/>' + P('M4 21v-1a8 8 0 0 1 16 0v1'),
  people: '<circle cx="9" cy="8" r="3.5"/>' + P('M2 21v-1a7 7 0 0 1 14 0v1M16 3.5a3.5 3.5 0 0 1 0 7M22 21v-1a7 7 0 0 0-4-6.3'),
  mountain: P('m8 3 4 8 5-5 5 15H2L8 3z'),
  temple: P('M3 21h18M5 21V10M19 21V10M9 21v-6h6v6M2 10h20L12 3 2 10z'),
  lightbulb: P('M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z'),
  star: P('M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'),
  globe: '<circle cx="12" cy="12" r="10"/>' + P('M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'),
  clock: '<circle cx="12" cy="12" r="10"/>' + P('M12 6v6l4 2'),
  chat: P('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'),
  heart: P('M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z'),
  pen: P('M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'),
  language: P('M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6'),
  flag: P('M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7'),
  leaf: P('M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10ZM2 21c0-3 1.9-5.4 5.1-6'),
};
const icon = (n, size, color) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[n] || ICON.star}</svg>`;

/* ---------------- infographic ---------------- */
export const INFO_W = 1080;
export function infoLayouts(d) {
  return (d.timeline || []).length >= 2 ? ['overview', 'timeline'] : ['overview'];
}

function header(d) {
  return `<div style="background:linear-gradient(135deg,${C.maroon},${C.saffron});color:#fff;padding:56px 64px 52px;">
    <div style="font-size:18px;font-weight:600;opacity:.9;letter-spacing:.02em;margin-bottom:22px;">ཟིན་ཐོ། ZINTHO</div>
    <div style="font-size:54px;font-weight:700;line-height:1.25;letter-spacing:-.02em;">${esc(d.title)}</div>
    ${d.subtitle ? `<div style="font-size:23px;line-height:1.6;opacity:.95;margin-top:14px;max-width:900px;">${esc(d.subtitle)}</div>` : ''}
  </div>`;
}
function stats(d) {
  if (!d.stats?.length) return '';
  return `<div style="display:flex;gap:20px;padding:40px 64px 8px;">${d.stats.map((s) => `
    <div style="flex:1;background:${C.cream};border:1px solid ${C.line};border-radius:22px;padding:24px 26px;">
      <div style="font-size:60px;font-weight:700;color:${C.maroon};line-height:1.15;letter-spacing:-.02em;">${esc(s.value)}</div>
      <div style="font-size:21px;color:${C.muted};line-height:1.5;margin-top:4px;">${esc(s.label)}</div>
    </div>`).join('')}</div>`;
}
function sectionTitle(t) {
  return `<div style="font-size:16px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${C.saffron};margin:0 0 18px;">${esc(t)}</div>`;
}
function points(d, compact) {
  if (!d.points?.length) return '';
  const cards = d.points.map((p) => `
    <div style="display:flex;gap:18px;align-items:flex-start;background:#fff;border:1px solid ${C.line};border-radius:22px;padding:${compact ? '18px 20px' : '24px'};${compact ? '' : 'width:calc(50% - 10px);'}box-sizing:border-box;">
      <div style="flex:none;width:${compact ? 48 : 58}px;height:${compact ? 48 : 58}px;border-radius:50%;background:${C.soft};display:flex;align-items:center;justify-content:center;">${icon(p.icon, compact ? 24 : 28, C.maroon)}</div>
      <div style="min-width:0;">
        ${p.heading ? `<div style="font-size:${compact ? 22 : 25}px;font-weight:700;line-height:1.4;color:${C.ink};">${esc(p.heading)}</div>` : ''}
        ${p.text ? `<div style="font-size:${compact ? 19 : 20}px;line-height:1.65;color:${C.muted};margin-top:4px;">${esc(p.text)}</div>` : ''}
      </div>
    </div>`).join('');
  return `<div style="padding:40px 64px 8px;">${sectionTitle(compact ? 'Key points' : 'What to know')}
    <div style="display:flex;flex-wrap:wrap;gap:20px;${compact ? 'flex-direction:column;' : ''}">${cards}</div></div>`;
}
function timeline(d, big) {
  if (!d.timeline?.length) return '';
  const rows = d.timeline.map((t, i) => `
    <div style="display:flex;gap:22px;">
      <div style="flex:none;width:${big ? 26 : 20}px;display:flex;flex-direction:column;align-items:center;">
        <div style="width:${big ? 26 : 20}px;height:${big ? 26 : 20}px;border-radius:50%;background:${i % 2 ? C.saffron : C.maroon};box-shadow:0 0 0 6px ${C.soft};margin-top:6px;"></div>
        ${i < d.timeline.length - 1 ? `<div style="flex:1;width:3px;background:${C.line};margin:6px 0;"></div>` : ''}
      </div>
      <div style="padding-bottom:${big ? 30 : 20}px;">
        <div style="font-size:${big ? 24 : 20}px;font-weight:700;color:${C.maroon};line-height:1.45;">${esc(t.when)}</div>
        <div style="font-size:${big ? 22 : 19}px;line-height:1.65;color:${C.ink};">${esc(t.what)}</div>
      </div>
    </div>`).join('');
  return `<div style="padding:40px 64px 8px;">${sectionTitle('Timeline')}<div>${rows}</div></div>`;
}
function quote(d) {
  if (!d.quote?.text) return '';
  return `<div style="margin:40px 64px 8px;padding:28px 34px;border-left:6px solid ${C.saffron};background:${C.cream};border-radius:0 22px 22px 0;">
    <div style="font-size:26px;line-height:1.7;font-style:italic;color:${C.ink};">“${esc(d.quote.text)}”</div>
    ${d.quote.source ? `<div style="font-size:18px;color:${C.muted};margin-top:10px;">— ${esc(d.quote.source)}</div>` : ''}
  </div>`;
}
function takeaway(d) {
  return `${d.takeaway ? `<div style="margin:44px 64px 0;background:${C.ink};color:#fff;border-radius:22px;padding:28px 32px;display:flex;gap:18px;align-items:center;">
      <div style="flex:none;">${icon('star', 32, C.saffron)}</div>
      <div style="font-size:24px;line-height:1.6;font-weight:600;">${esc(d.takeaway)}</div></div>` : ''}
    <div style="padding:34px 64px 44px;font-size:16px;color:${C.muted};display:flex;justify-content:space-between;">
      <span>Made with Zintho · ཟིན་ཐོ།</span><span>Powered by Monlam AI</span></div>`;
}

export function infographicHTML(d, layout = 'overview') {
  const body = layout === 'timeline'
    ? header(d) + stats(d) + timeline(d, true) + points(d, true) + quote(d) + takeaway(d)
    : header(d) + stats(d) + points(d, false) + timeline(d, false) + quote(d) + takeaway(d);
  return `<div style="width:${INFO_W}px;background:#fff;font-family:${FONT};color:${C.ink};box-sizing:border-box;overflow:hidden;-webkit-font-smoothing:antialiased;">${body}</div>`;
}

/* ---------------- PNG export (SVG foreignObject + embedded fonts) ---------------- */
let fontCSS = null;
async function embeddedFontCSS() {
  if (fontCSS !== null) return fontCSS;
  fontCSS = '';
  try {
    const link = document.querySelector('link[href*="fonts.googleapis.com/css"]');
    if (!link) return fontCSS;
    const css = await (await fetch(link.href)).text();
    const blocks = css.match(/@font-face\s*{[^}]*}/g) || [];
    // keep Latin, Latin-ext and Tibetan subsets only
    const keep = blocks.filter((b) => /U\+0000-00FF|U\+0100-02|U\+0F00/i.test(b));
    const out = await Promise.all(keep.map(async (b) => {
      const url = b.match(/url\((['"]?)([^)'"]+)\1\)/)?.[2];
      if (!url) return '';
      try {
        const blob = await (await fetch(url)).blob();
        const data = await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
        return b.replace(url, data);
      } catch { return ''; }
    }));
    fontCSS = out.join('\n');
  } catch { fontCSS = ''; }
  return fontCSS;
}

export async function htmlToPNG(html, width, filename, scale = 2) {
  const holder = document.createElement('div');
  holder.style.cssText = `position:fixed;left:-99999px;top:0;width:${width}px;`;
  holder.innerHTML = html;
  document.body.append(holder);
  await document.fonts.ready;
  const height = Math.ceil(holder.firstElementChild.getBoundingClientRect().height);
  const xhtml = new XMLSerializer().serializeToString(holder.firstElementChild);
  holder.remove();
  const css = await embeddedFontCSS();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${css}</style>${xhtml}</div></foreignObject></svg>`;
  const img = new Image();
  img.decoding = 'sync';
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = () => reject(new Error('Could not draw the image in this browser.'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const canvas = document.createElement('canvas');
  canvas.width = width * scale; canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  // Browsers can fire onload before fonts embedded in the SVG are ready, and skip
  // text that is still waiting for its font. Draw once to start loading, wait, draw again.
  ctx.drawImage(img, 0, 0, width, height);
  await new Promise((r) => setTimeout(r, css ? 600 : 150));
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  const blob = await new Promise((resolve, reject) => {
    try { canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Export failed'))), 'image/png'); }
    catch { reject(new Error('This browser blocked the export. Try Chrome, or take a screenshot.')); }
  });
  download(blob, filename);
}

export function download(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = filename;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
export const safeName = (s) => (String(s || 'zintho').replace(/[\\/:*?"<>|]+/g, ' ').trim().slice(0, 60) || 'zintho');

/* ---------------- slides ---------------- */
export const SLIDE_W = 1280, SLIDE_H = 720;

// Title slide is added in front of the model's slides.
export function deckSlides(deck) {
  return [{ type: 'title', title: deck.title, subtitle: deck.subtitle, notes: deck.subtitle || '' }, ...(deck.slides || [])];
}

function slideFrame(inner, { bg = '#fff', num, total, dark = false } = {}) {
  return `<div style="width:${SLIDE_W}px;height:${SLIDE_H}px;position:relative;overflow:hidden;background:${bg};font-family:${FONT};color:${dark ? '#fff' : C.ink};box-sizing:border-box;-webkit-font-smoothing:antialiased;">
    ${inner}
    ${num ? `<div style="position:absolute;left:72px;right:72px;bottom:30px;display:flex;justify-content:space-between;font-size:16px;color:${dark ? 'rgba(255,255,255,.75)' : C.muted};">
      <span>ཟིན་ཐོ། Zintho</span><span>${num} / ${total}</span></div>` : ''}
  </div>`;
}
const slideTitle = (t) => `<div style="position:absolute;left:72px;top:62px;right:72px;">
  <div style="width:56px;height:6px;border-radius:3px;background:${C.saffron};margin-bottom:22px;"></div>
  <div style="font-size:44px;font-weight:700;line-height:1.3;letter-spacing:-.015em;">${esc(t)}</div></div>`;

export function slideHTML(s, i, total) {
  const num = i + 1;
  if (s.type === 'title') {
    return slideFrame(`<div style="position:absolute;inset:0;background:linear-gradient(135deg,${C.maroon},${C.saffron});"></div>
      <div style="position:absolute;left:96px;right:96px;top:50%;transform:translateY(-50%);">
        <div style="font-size:22px;font-weight:600;letter-spacing:.08em;opacity:.9;margin-bottom:26px;">ཟིན་ཐོ། ZINTHO</div>
        <div style="font-size:64px;font-weight:700;line-height:1.25;letter-spacing:-.02em;">${esc(s.title)}</div>
        ${s.subtitle ? `<div style="font-size:28px;line-height:1.55;opacity:.95;margin-top:20px;">${esc(s.subtitle)}</div>` : ''}
      </div>`, { dark: true });
  }
  if (s.type === 'quote') {
    return slideFrame(`<div style="position:absolute;left:120px;right:120px;top:50%;transform:translateY(-50%);">
        <div style="font-size:120px;line-height:.6;color:${C.saffron};font-family:Georgia,serif;">“</div>
        <div style="font-size:40px;line-height:1.6;font-style:italic;font-weight:500;margin-top:10px;">${esc(s.quote || s.title)}</div>
        ${s.source ? `<div style="font-size:24px;color:${C.muted};margin-top:24px;">— ${esc(s.source)}</div>` : ''}
      </div>`, { bg: C.cream, num, total });
  }
  if (s.type === 'terms') {
    const rows = (s.terms || []).map((t) => `<div style="display:flex;gap:28px;padding:16px 0;border-bottom:1px solid ${C.line};">
        <div style="flex:0 0 330px;font-size:28px;font-weight:700;color:${C.maroon};line-height:1.5;">${esc(t.term)}</div>
        <div style="flex:1;font-size:25px;line-height:1.55;">${esc(t.meaning)}</div></div>`).join('');
    return slideFrame(slideTitle(s.title) + `<div style="position:absolute;left:72px;right:72px;top:200px;">${rows}</div>`, { num, total });
  }
  const summary = s.type === 'summary';
  const items = (s.bullets || []).map((b, k) => `<div style="display:flex;gap:22px;align-items:flex-start;margin-bottom:22px;">
      ${summary
        ? `<div style="flex:none;width:44px;height:44px;border-radius:50%;background:${C.maroon};color:#fff;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:2px;">${k + 1}</div>`
        : `<div style="flex:none;width:12px;height:12px;border-radius:50%;background:${C.maroon};margin-top:17px;"></div>`}
      <div style="font-size:${(s.bullets || []).length > 4 ? 27 : 30}px;line-height:1.55;">${esc(b)}</div></div>`).join('');
  return slideFrame(slideTitle(s.title) + `<div style="position:absolute;left:72px;right:90px;top:205px;">${items}</div>`,
    { bg: summary ? C.cream : '#fff', num, total });
}

/* ---------------- PowerPoint export (PptxGenJS, bundled in /vendor) ---------------- */
function loadPptx() {
  if (window.PptxGenJS) return Promise.resolve(window.PptxGenJS);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/vendor/pptxgen.bundle.js';
    s.onload = () => (window.PptxGenJS ? resolve(window.PptxGenJS) : reject(new Error('PowerPoint export failed to load')));
    s.onerror = () => reject(new Error('PowerPoint export failed to load'));
    document.head.append(s);
  });
}

export async function exportPPTX(deck, filename) {
  const PptxGenJS = await loadPptx();
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
  pptx.title = deck.title;
  const hex = (c) => c.replace('#', '').toUpperCase();
  const F = 'Arial';
  const slides = deckSlides(deck);
  const total = slides.length;
  slides.forEach((s, i) => {
    const sl = pptx.addSlide();
    if (s.notes) sl.addNotes(s.notes);
    const footer = (dark) => {
      sl.addText('ཟིན་ཐོ། Zintho', { x: 0.75, y: 6.95, w: 4, h: 0.3, fontFace: F, fontSize: 11, color: dark ? 'FFFFFF' : hex(C.muted) });
      sl.addText(`${i + 1} / ${total}`, { x: 9.6, y: 6.95, w: 3, h: 0.3, fontFace: F, fontSize: 11, align: 'right', color: dark ? 'FFFFFF' : hex(C.muted) });
    };
    const title = (t) => {
      sl.addShape(pptx.ShapeType.roundRect, { x: 0.75, y: 0.62, w: 0.6, h: 0.07, fill: { color: hex(C.saffron) }, line: { color: hex(C.saffron) }, rectRadius: 0.03 });
      sl.addText(t, { x: 0.75, y: 0.8, w: 11.8, h: 1.0, fontFace: F, fontSize: 32, bold: true, color: hex(C.ink), valign: 'top' });
    };
    if (s.type === 'title') {
      sl.background = { color: hex(C.maroon) };
      sl.addText('ཟིན་ཐོ། ZINTHO', { x: 1, y: 2.0, w: 11.3, h: 0.5, fontFace: F, fontSize: 16, bold: true, color: 'FFFFFF', charSpacing: 2 });
      sl.addText(s.title || '', { x: 1, y: 2.55, w: 11.3, h: 1.6, fontFace: F, fontSize: 44, bold: true, color: 'FFFFFF', valign: 'top' });
      if (s.subtitle) sl.addText(s.subtitle, { x: 1, y: 4.2, w: 11.3, h: 1, fontFace: F, fontSize: 22, color: 'FFFFFF', valign: 'top' });
      return;
    }
    if (s.type === 'quote') {
      sl.background = { color: hex(C.cream) };
      sl.addText(`“${s.quote || s.title}”`, { x: 1.2, y: 1.7, w: 10.9, h: 3.2, fontFace: 'Georgia', fontSize: 30, italic: true, color: hex(C.ink), valign: 'middle' });
      if (s.source) sl.addText(`— ${s.source}`, { x: 1.2, y: 5.0, w: 10.9, h: 0.6, fontFace: F, fontSize: 18, color: hex(C.muted) });
      footer(); return;
    }
    if (s.type === 'terms') {
      title(s.title);
      const rows = (s.terms || []).map((t) => [
        { text: t.term, options: { bold: true, color: hex(C.maroon), fontSize: 20, fontFace: F } },
        { text: t.meaning, options: { color: hex(C.ink), fontSize: 18, fontFace: F } },
      ]);
      if (rows.length) sl.addTable(rows, { x: 0.75, y: 2.05, w: 11.8, colW: [3.6, 8.2], border: { type: 'solid', pt: 0.75, color: hex(C.line) }, margin: 0.12 });
      footer(); return;
    }
    if (s.type === 'summary') sl.background = { color: hex(C.cream) };
    title(s.title);
    const bullets = (s.bullets || []).map((b, k) => ({
      text: b,
      options: { bullet: s.type === 'summary' ? { type: 'number' } : { code: '25CF' }, fontFace: F, fontSize: 22, color: hex(C.ink), paraSpaceAfter: 12, breakLine: k < s.bullets.length - 1 },
    }));
    if (bullets.length) sl.addText(bullets, { x: 0.85, y: 2.05, w: 11.6, h: 4.6, valign: 'top' });
    footer();
  });
  const blob = await pptx.write({ outputType: 'blob' });
  download(blob, filename);
}

/* ---------------- PDF export (print the slides, one per page) ---------------- */
export function exportPDF(deck) {
  const slides = deckSlides(deck);
  const box = document.createElement('div');
  box.id = 'print-slides';
  box.innerHTML = slides.map((s, i) => `<div class="print-page">${slideHTML(s, i, slides.length)}</div>`).join('');
  const style = document.createElement('style');
  style.id = 'print-style';
  style.textContent = `
    #print-slides { display: none; }
    @media print {
      @page { size: ${SLIDE_W}px ${SLIDE_H}px; margin: 0; }
      html, body { background: #fff !important; }
      body > *:not(#print-slides) { display: none !important; }
      #print-slides { display: block; }
      .print-page { width: ${SLIDE_W}px; height: ${SLIDE_H}px; overflow: hidden; page-break-after: always; break-after: page; }
      .print-page:last-child { page-break-after: auto; break-after: auto; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }`;
  document.head.append(style); document.body.append(box);
  const cleanup = () => { box.remove(); style.remove(); window.removeEventListener('afterprint', cleanup); };
  window.addEventListener('afterprint', cleanup);
  setTimeout(() => window.print(), 300);
}
