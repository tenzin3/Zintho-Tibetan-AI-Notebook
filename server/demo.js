// Sample responses used when no MONLAM_API_KEY is set, so the whole UI can be
// explored before connecting the real API. Nothing here calls Monlam.

const NOTE = '_(Demo mode — add your Monlam API key in Settings (⚙ top right) to get real answers.)_';

export function chat(question, sources, lang) {
  const names = sources.map((s, i) => `[S${i + 1}] ${s.title}`).join(', ') || 'none';
  return lang === 'en'
    ? `This is a sample answer to: **“${question}”**\n\nIn the real app, Melong reads your selected sources (${names}) and answers only from them, citing the passage it used [S1].\n\n${NOTE}`
    : `འདི་ནི་དཔེ་མཚོན་གྱི་ལན་ཞིག་ཡིན། **“${question}”**\n\nདངོས་གནས་ཀྱི་ཉེར་སྤྱོད་ནང་ མེ་ལོང་གིས་ཁྱེད་ཀྱི་ཁུངས་ (${names}) ཀློག་ནས་ལན་འདེབས་ཀྱི་ཡོད། [S1]\n\n${NOTE}`;
}

export function generate(kind, { topic, sources }) {
  const first = sources[0]?.title || 'your sources';
  switch (kind) {
    case 'guide':
      return {
        summary: `This notebook contains ${sources.length} source(s), starting with “${first}”. In demo mode this overview is a placeholder; with your Monlam key, Melong writes a real summary of everything you've added.`,
        questions: ['What are the main ideas in these sources?', 'Which people or places are mentioned?', 'Explain the most important term simply.'],
      };
    case 'quiz':
      return {
        title: 'Sample quiz',
        questions: [
          { question: 'What does ཟིན་ཐོ། (zintho) mean?', options: ['Notes or memo', 'Mountain', 'Tea', 'Prayer flag'], answer: 0, explanation: 'ཟིན་ཐོ། means notes or a memo, which is why the app is named Zintho.' },
          { question: 'Which Monlam model reads scanned pages?', options: ['Monlam TTS', 'Monlam OCR', 'Monlam STT', 'Melong 2.8'], answer: 1, explanation: 'OCR (optical character recognition) turns images of text into text.' },
          { question: 'How many vowel signs does Tibetan script have?', options: ['Two', 'Three', 'Four', 'Five'], answer: 2, explanation: 'Tibetan has four vowel signs: gigu, zhabkyu, drengbu and naro.' },
        ],
      };
    case 'mindmap':
      return {
        title: first,
        children: [
          { title: 'Main ideas', children: [{ title: 'Idea one', children: [] }, { title: 'Idea two', children: [] }] },
          { title: 'People & places', children: [{ title: 'Key person', children: [] }, { title: 'Key place', children: [] }] },
          { title: 'Important terms', children: [{ title: 'Term A', children: [] }, { title: 'Term B', children: [] }] },
          { title: 'Questions to explore', children: [] },
        ],
      };
    case 'infographic':
      return {
        title: 'Sample infographic', subtitle: `A one-page overview of “${first}”. With your Monlam key, Melong fills this from your sources.`,
        stats: [{ value: '30', label: 'consonants' }, { value: '4', label: 'vowel signs' }, { value: '7th', label: 'century' }],
        points: [
          { icon: 'person', heading: 'Who', text: 'The key people mentioned in your sources appear here.' },
          { icon: 'lightbulb', heading: 'Main idea', text: 'The central idea of the text, in one short sentence.' },
          { icon: 'book', heading: 'Key terms', text: 'Important Tibetan words such as ཚེག and ཤད།.' },
          { icon: 'globe', heading: 'Why it matters', text: 'The wider meaning or influence of the topic.' },
        ],
        timeline: [{ when: 'Step 1', what: 'First event' }, { when: 'Step 2', what: 'Second event' }, { when: 'Step 3', what: 'Third event' }],
        quote: null, takeaway: 'Demo mode: add your Monlam API key in Settings to generate a real infographic.',
      };
    case 'slides':
      return {
        title: `Slides: ${first}`, subtitle: 'Sample deck (demo mode)',
        slides: [
          { type: 'bullets', title: 'Overview', bullets: ['What the sources are about', 'The main ideas', 'Why it matters'], notes: 'In demo mode these slides are placeholders. With your key, Melong writes real slides from your sources.' },
          { type: 'terms', title: 'Key terms', terms: [{ term: 'ཚེག', meaning: 'tsheg, the dot between syllables' }, { term: 'ཤད།', meaning: 'shad, the stroke that ends a clause' }], notes: 'Key terms with their meanings.' },
          { type: 'summary', title: 'Summary', bullets: ['Point one', 'Point two', 'Point three'], notes: 'A short recap.' },
        ],
      };
    case 'audio':
      return {
        title: 'Sample audio overview',
        lines: [
          { speaker: 'A', text: 'Welcome to the Zintho audio overview! Today we are looking at the sources in this notebook.' },
          { speaker: 'B', text: 'Right. In demo mode this is a sample script, but with your Monlam key, Melong writes a real conversation about your texts.' },
          { speaker: 'A', text: 'And Monlam text-to-speech reads it aloud in Tibetan, line by line.' },
          { speaker: 'B', text: 'So you can listen to your study material while walking or running. Let us get started!' },
        ],
      };
    case 'topic':
      return `# ${topic}\n\nThis is a sample document about **${topic}**. With your Monlam API key, Melong writes a full study document on any topic you enter, which then becomes a source you can chat with and quiz yourself on.\n\n## Overview\n\nPlaceholder text.\n\n${NOTE}`;
    case 'glossary':
      return `| Term | Meaning | Source |\n|---|---|---|\n| ཤེས་རབ། | wisdom | S1 |\n| སྙིང་རྗེ། | compassion | S1 |\n| དཔེ་ཆ། | traditional book | S1 |\n\n${NOTE}`;
    default: {
      const label = { summary: 'Summary', study_guide: 'Study guide' }[kind] || kind;
      return `## ${label}\n\nThis is a sample **${label.toLowerCase()}** for “${first}” [S1].\n\n- First key point from the sources [S1]\n- Second key point\n- Third key point\n\n${NOTE}`;
    }
  }
}

export const ocr = (name) => `(Demo OCR text for “${name}”.)\n\nབོད་ཀྱི་ཡི་གེ་ནི་ལོ་རྒྱུས་རིང་པོ་ཅན་ཞིག་ཡིན། With your Monlam API key, Monlam OCR extracts the real text from this image.`;
export const stt = (name) => `(Demo transcript for “${name}”.)\n\nWith your Monlam API key, Monlam speech-to-text transcribes the real audio here.`;
