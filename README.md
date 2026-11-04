# ཟིན་ཐོ། Zintho: Tibetan AI Notebook

A NotebookLM-style study notebook for Tibetan, powered by Monlam AI.

**🌐 Try it live: [zintho.vercel.app](https://zintho.vercel.app/)**

Add texts, scanned pechas or recorded teachings, then chat with them and turn them into summaries, study guides, glossaries, quizzes, mind maps and Tibetan audio overviews.

### You need a Monlam API key

Zintho runs on the Monlam AI models, available through [Monlam AI Studio](https://monlamai.studio/). Each user brings their own key:

1. Sign in to [Monlam AI Studio](https://monlamai.studio/) and open **API keys** to create a key.
2. Open [zintho.vercel.app](https://zintho.vercel.app/), click **⚙ Settings** and paste the key.
3. Click **Save key**. Zintho tests the connection for you.

Your key is saved **only in your browser** and sent with your own requests to Monlam. It is never stored on the server. Without a key, Zintho runs in demo mode with sample answers.

| Feature | Monlam model |
|---|---|
| Chat, summaries, study guides, glossary, quiz, mind map | Melong (`melong-2.5`) |
| Scanned pages and images → text | Monlam OCR (`monlam-ocr`) |
| Audio and recordings → text | Monlam speech-to-text (`monlamai-stt`) |
| Read-aloud and audio overviews (Lhasa, Amdo and Kham voices) | Monlam text-to-speech (`monlamai-tts`) |

Monlam API reference: [api-v1.monlamai.studio/docs](https://api-v1.monlamai.studio/docs). Usage counts toward your own Monlam account's limits (for example, 1,000 requests per day).

## Run it on your computer

You need **Node.js 18 or newer** (https://nodejs.org). There's nothing else to install, because the app has no npm dependencies.

```bash
cd ~/Desktop/Zintho-Tibetan-AI-Notebook
npm start                 # open http://localhost:4747
```

On a Mac you can also double-click **start.command**.

**API key:** click **⚙ Settings** in the app and paste your Monlam key. It's saved only in your browser. Alternatively, put it in `.env` as `MONLAM_API_KEY=...` and it will be used whenever no key is set in the browser. With no key at all, the app runs in **demo mode** with sample answers.

## Deploy to Vercel

The repo is ready for Vercel: `public/` is served as the website and `api/[route].js` runs the AI routes.

1. Push this folder to GitHub (`git add . && git commit -m "Zintho" && git push`).
2. Go to https://vercel.com/new and import the `Zintho-Tibetan-AI-Notebook` repo.
3. Leave the settings as they are (Framework preset: **Other**; `vercel.json` handles the rest) and click **Deploy**.
4. Open the site, click **⚙ Settings** and paste your Monlam key.

**Don't add `MONLAM_API_KEY` in Vercel's Environment Variables** unless you want everyone who visits the site to use your key and your 1,000 daily requests. Without it, each visitor uses their own key from Settings.

On the hosted version:
- Notebooks are saved in each visitor's browser (IndexedDB), not on a server. Clearing browser data deletes them.
- Uploads are limited to **3 MB per file** (a Vercel limit). PDFs are sent page by page, so long PDFs are fine. Long audio recordings must be split. Run Zintho locally for bigger files.

## Features

| Panel | What it does | Monlam model |
|---|---|---|
| **Sources** | Paste text; upload .txt/.md; PDFs (text layer, and scanned pages are OCR'd automatically); images | Monlam OCR |
| | Upload or record audio of teachings or lectures | Monlam STT |
| | "From a topic": Melong writes a study document (labelled AI-generated) | Melong |
| **Chat** | Answers only from the selected sources, with clickable source citations. Includes a notebook overview, suggested questions, voice questions, save-to-note and read-aloud | Melong, STT, TTS |
| **Studio** | Audio overview (two-host script read aloud with a synced transcript), Summary, Study guide, Glossary, an interactive Quiz with score, and a Mind map (click a node to ask about it) | Melong, TTS |

A Tibetan / English switch in the top bar sets the language of AI answers. There's also light and dark mode, and a mobile layout.

Notebooks and audio you've already played are saved in your browser (IndexedDB), so replays don't use API requests.

## Connecting the Monlam API

Zintho uses the Monlam Studio API (full reference: https://api-v1.monlamai.studio/docs). Create a key under **API keys** in [Monlam AI Studio](https://monlamai.studio/), then paste it into **⚙ Settings** in the app.

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
server.js            local web server (npm start)
api/[route].js       the same AI routes as a Vercel serverless function
server/handlers.js   AI routes shared by both (chat, generate, ocr, stt, tts, test)
server/monlam.js     Monlam API adapter (the only file that talks to Monlam)
server/prompts.js    prompts for chat and each Studio tool
server/demo.js       sample answers for demo mode
public/              the web app (index.html, styles.css, app.js)
vercel.json          Vercel config
```

## Notes

- A key pasted in Settings is stored only in that browser's local storage and sent with each request. A key in `.env` stays on the server. Don't commit `.env`; it's already in `.gitignore`.
- The PDF reader (pdf.js) and fonts load from a CDN, so the browser needs an internet connection.
- Browser recordings are saved as `.webm` (Chrome) or `.m4a` (Safari). If Monlam STT rejects one format, try uploading a `.wav` or `.mp3` file instead.
