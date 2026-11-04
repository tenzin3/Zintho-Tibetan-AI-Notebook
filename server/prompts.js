// Prompts for every Zintho feature. Edit freely to tune the results.

export const langLine = (lang) => lang === 'en'
  ? 'Write your answer in English. Keep Tibetan names and terms in Tibetan script, with a short translation where helpful.'
  : 'Write your answer in Tibetan (བོད་ཡིག) using Tibetan script.';

const BASE = `You are Zintho (ཟིན་ཐོ།), a careful study assistant for Tibetan texts and topics.
Use only the information in the SOURCES. Never invent facts, quotes, names or dates that are not in the sources.
When you use information from a source, cite it right after the sentence like [S1] or [S2].`;

export function sourcesBlock(sources, maxChars = 200000) {
  let budget = maxChars;
  const parts = [];
  sources.forEach((s, i) => {
    if (budget <= 0) return;
    const text = String(s.content || '').slice(0, budget);
    budget -= text.length;
    parts.push(`[S${i + 1}] ${s.title || 'Untitled'}\n${text}`);
  });
  return parts.join('\n\n---\n\n');
}

export function chatMessages({ question, history, sources, lang, maxChars }) {
  const system = `${BASE}
If the answer is not in the sources, say clearly that the sources do not cover it.
${langLine(lang)}

SOURCES:
${sourcesBlock(sources, maxChars)}`;
  const turns = history.slice(-10)
    .filter((t) => t && (t.role === 'user' || t.role === 'assistant') && t.content)
    .map((t) => ({ role: t.role, content: String(t.content).slice(0, 4000) }));
  return [{ role: 'system', content: system }, ...turns, { role: 'user', content: question }];
}

const JSON_RULE = 'Return ONLY valid JSON with no extra text before or after it, in exactly this shape:';

export const KINDS = {
  summary: {
    label: 'Summary', json: false,
    prompt: 'Write a clear summary of the sources. Start with a 2–3 sentence overview, then list the key points as bullets. Use Markdown. Cite sources like [S1].',
  },
  study_guide: {
    label: 'Study guide', json: false,
    prompt: `Create a study guide in Markdown with these sections:
## Key concepts — bullets, each with a one-line explanation
## Important terms
## Short-answer questions — 5 questions
## Essay questions — 3 questions
## Answer key — short answers to the short-answer questions`,
  },
  glossary: {
    label: 'Glossary', json: false,
    prompt: 'Build a glossary of 10–20 important or difficult terms from the sources as a Markdown table with the columns | Term | Meaning | Source |. Keep Tibetan terms in Tibetan script. In the Source column write S1, S2, etc.',
  },
  quiz: {
    label: 'Quiz', json: true,
    prompt: `Create a multiple-choice quiz with 10 questions that test real understanding of the sources. ${JSON_RULE}
{"title": "...", "questions": [{"question": "...", "options": ["...", "...", "...", "..."], "answer": 0, "explanation": "..."}]}
"answer" is the 0-based index of the correct option. Wrong options must be plausible. The explanation says why the answer is right, citing the source like [S1].`,
  },
  mindmap: {
    label: 'Mind map', json: true,
    prompt: `Create a mind map of the sources: one central topic, 4–7 main branches, up to 3 levels deep. Labels must be short (at most 6 words). ${JSON_RULE}
{"title": "central topic", "children": [{"title": "main branch", "children": [{"title": "detail", "children": []}]}]}`,
  },
  audio: {
    label: 'Audio overview', json: true,
    prompt: `Write the script for an engaging 3–5 minute audio overview of the sources: a warm, natural conversation between two hosts, A and B, who explain the main ideas to a listener. A introduces and asks good questions; B explains with examples from the sources. Use 16–24 short turns, with no stage directions and no citations. ${JSON_RULE}
{"title": "...", "lines": [{"speaker": "A", "text": "..."}, {"speaker": "B", "text": "..."}]}`,
  },
  guide: {
    label: 'Notebook guide', json: true,
    prompt: `Give an overview of the sources for the notebook guide. ${JSON_RULE}
{"summary": "a 3–4 sentence overview of all the sources together", "questions": ["question 1", "question 2", "question 3"]}
The questions are interesting things a reader could ask about the sources.`,
  },
  topic: {
    label: 'Topic', json: false, noSources: true,
    prompt: '', // built in generateMessages
  },
};

export function generateMessages(kind, { sources, lang, topic, maxChars }) {
  const spec = KINDS[kind];
  if (kind === 'topic') {
    return [
      { role: 'system', content: `You are Zintho (ཟིན་ཐོ།), a knowledgeable and careful teacher of Tibetan culture, history, language and Buddhist philosophy. ${langLine(lang)}` },
      { role: 'user', content: `Write an informative study document about this topic: "${topic}".
Use Markdown: a title line starting with "# ", an introduction, 4–6 sections with "## " headings, and a short conclusion.
Be factual. If you are unsure about a detail such as a date or a name, leave it out rather than guess.` },
    ];
  }
  const system = `${BASE}
${langLine(lang)}${spec.json ? '\nAll text values inside the JSON must follow that language rule.' : ''}

SOURCES:
${sourcesBlock(sources, maxChars)}`;
  return [{ role: 'system', content: system }, { role: 'user', content: spec.prompt }];
}

export function extractJSON(text) {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const s = fence ? fence[1] : text;
  const start = s.search(/[[{]/);
  const end = Math.max(s.lastIndexOf('}'), s.lastIndexOf(']'));
  if (start < 0 || end < start) throw new Error('No JSON found');
  return JSON.parse(s.slice(start, end + 1));
}

// Make model output safe for the UI even if it's slightly off-shape.
export function normalize(kind, d) {
  if (kind === 'quiz') {
    const qs = (Array.isArray(d) ? d : d.questions || []).map((q) => {
      const options = (q.options || q.choices || []).map(String);
      let answer = q.answer ?? q.correct ?? q.answer_index ?? 0;
      if (typeof answer === 'string') {
        const byText = options.findIndex((o) => o.trim() === answer.trim());
        answer = byText >= 0 ? byText : Math.max(0, 'ABCD'.indexOf(answer.trim().toUpperCase()[0]));
      }
      return { question: String(q.question || q.q || ''), options, answer: Number(answer) || 0, explanation: String(q.explanation || '') };
    }).filter((q) => q.question && q.options.length >= 2);
    return { title: d.title || KINDS.quiz.label, questions: qs };
  }
  if (kind === 'mindmap') {
    const fix = (n) => ({ title: String(n.title ?? n.label ?? n.name ?? ''), children: (n.children || []).map(fix) });
    return fix(d);
  }
  if (kind === 'audio') {
    const lines = (Array.isArray(d) ? d : d.lines || []).map((l, i) => ({ speaker: (l.speaker || (i % 2 ? 'B' : 'A')).toString().toUpperCase().startsWith('B') ? 'B' : 'A', text: String(l.text || l.line || '') })).filter((l) => l.text);
    return { title: d.title || KINDS.audio.label, lines };
  }
  if (kind === 'guide') {
    return { summary: String(d.summary || ''), questions: (d.questions || []).map(String).slice(0, 3) };
  }
  return d;
}
