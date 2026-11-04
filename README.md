# ཟིན་ཐོ། Zintho: Tibetan AI Notebook

A NotebookLM-style study notebook for Tibetan, powered by Monlam AI.

## Run it

You need **Node.js 18 or newer** (https://nodejs.org). There's nothing else to install, because the app has no npm dependencies.

```bash
cd ~/Desktop/Zintho-Tibetan-AI-Notebook
cp .env.example .env      # then paste your key after MONLAM_API_KEY=
npm start                 # open http://localhost:4747
```

On a Mac you can also double-click **start.command**. The first time, right-click it and choose **Open**. If macOS says it isn't executable, run `chmod +x start.command` once.

If `.env` has no key, the app runs in **demo mode**: the whole UI works, but answers are samples.

## Features

| Panel | What it does | Monlam model |
|---|---|---|
| **Sources** | Paste text; upload .txt/.md; PDFs (text layer, and scanned pages are OCR'd automatically); images | Monlam OCR |
| | Upload or record audio of teachings or lectures | Monlam STT |
| | "From a topic": Melong writes a study document (labelled AI-generated) | Melong |
| **Chat** | Answers only from the selected sources, with clickable source citations. Includes a notebook overview, suggested questions, voice questions, save-to-note and read-aloud | Melong, STT, TTS |
| **Studio** | Audio overview (two-host script read aloud with a synced transcript), Summary, Study guide, Briefing doc, FAQ, Timeline, Glossary, an interactive Quiz with score, Flashcards (flip/shuffle) and a Mind map (click a node to ask about it) | Melong, TTS |

A Tibetan / English switch in the top bar sets the language of AI answers. There's also light and dark mode, and a mobile layout.

Notebooks are saved as JSON files in `data/notebooks/`.

## Connecting the Monlam API

Zintho uses the Monlam Studio API (full reference: https://api-v1.monlamai.studio/docs). Create a key under **API keys** in Monlam Studio, then paste it into `.env` after `MONLAM_API_KEY=`.

| Feature | Request |
|---|---|
| Auth | header `X-API-Key: <your key>` |
| Chat | `POST /api/v1/ai/chat` with `{model_name, messages, max_tokens, temperature}` |
| Text-to-speech | `POST /api/v1/text-to-speech/stream` with `{text, voice_name, model_name}` → audio/wav |
| Speech-to-text | `POST /api/v1/speech-to-text/` (multipart `file`, `language=bo`, `task=transcribe`) |
| OCR | `POST /api/v1/ocr/single-page` (multipart `file`, `lang_hint=bo`) |

- Voices: `lhasa_female`, `lhasa_male`, `amdo_female`, `amdo_male`, `kham_female`, `kham_male`. `MONLAM_TTS_VOICE` sets the read-aloud voice and host 1 of the audio overview; `MONLAM_TTS_VOICE_B` sets host 2.
- `MONLAM_CHAT_MODEL` is `melong-2.5` (130,000-token context); `melong-2.8` also works.
- TTS speaks Tibetan, so set the language switch to བོད་ཡིག before generating an audio overview.
- `MAX_CONTEXT_CHARS` limits how much source text is sent per request.
- To tune the prompts, edit `server/prompts.js`. All API code is in `server/monlam.js`.

## Project layout

```
server.js            web server + API routes
server/monlam.js     Monlam API adapter (the only file that talks to Monlam)
server/prompts.js    prompts for chat and each Studio tool
server/demo.js       sample answers for demo mode
public/              the web app (index.html, styles.css, app.js)
data/notebooks/      your saved notebooks
```

## Notes

- Your API key stays on the server and is never sent to the browser. Don't commit `.env`; it's already in `.gitignore`.
- The PDF reader (pdf.js) and fonts load from a CDN, so the browser needs an internet connection.
- Browser recordings are saved as `.webm` (Chrome) or `.m4a` (Safari). If Monlam STT rejects one format, try uploading a `.wav` or `.mp3` file instead.
