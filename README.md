# Emil Ismayilzada - Portfolio

A minimalist portfolio website with an AI-powered personal assistant chatbot.

**Live Site**: [https://iamemil.github.io](https://iamemil.github.io) (or [https://emlsm.tech](https://emlsm.tech))

## Overview

This portfolio features a clean, simple design with:
- Animated title using Typed.js ("emilismayilzada" / "emlsm.tech")
- ChatGPT-like AI assistant that answers questions about my background
- Dark mode by default
- Fully responsive design

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages                             │
│                  (Static Frontend)                           │
│                 iamemil.github.io                            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS API calls
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Cloudflare Workers                          │
│                    (Chat API)                                │
│          portfolio-chat-api.workers.dev                      │
│                         │                                    │
│                         ▼                                    │
│                   OpenRouter API                             │
│              (Claude, GPT-4, etc.)                          │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
.
├── app/                    # Next.js frontend (static export)
│   ├── src/
│   │   ├── components/     # React components
│   │   └── app/            # Next.js app router
│   ├── public/
│   │   └── resume.pdf      # Resume file
│   └── out/                # Static build output
│
├── worker/                 # Cloudflare Worker (chat API)
│   ├── src/
│   │   ├── index.ts        # Worker code
│   │   └── resume-context.ts # Resume context (auto-generated)
│   └── scripts/
│       └── extract-resume.js # PDF text extraction
│
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages deployment
```

## Quick Start

### 1. Deploy the Cloudflare Worker (Chat API)

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put OPENROUTER_API_KEY  # Enter your key
npm run deploy
```

Note your worker URL: `https://portfolio-chat-api.YOUR_SUBDOMAIN.workers.dev`

### 2. Configure GitHub Secrets

Go to your repository **Settings** → **Secrets and variables** → **Actions** and add:

| Secret | Value |
|--------|-------|
| `CHAT_API_URL` | `https://portfolio-chat-api.YOUR_SUBDOMAIN.workers.dev/api/chat` |

### 3. Enable GitHub Pages

Go to **Settings** → **Pages** and set:
- Source: **GitHub Actions**

### 4. Push to Deploy

Push to `main` branch and GitHub Actions will automatically build and deploy.

## Updating Your Resume

1. Replace `app/public/resume.pdf` with your updated resume
2. Update the worker's context:
   ```bash
   cd worker
   npm run update-resume
   npm run deploy
   ```
3. Push changes to trigger frontend redeploy

## Local Development

### Frontend
```bash
cd app
npm install
cp .env.example .env.local
# Edit .env.local with your worker URL
npm run dev
```

### Worker
```bash
cd worker
npm install
npm run dev
```

## Tech Stack

**Frontend:**
- Next.js 16 (static export)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Typed.js

**Backend (Cloudflare Worker):**
- Cloudflare Workers
- OpenRouter API
- TypeScript

## Documentation

- [Frontend Documentation](./app/README.md)
- [Worker Documentation](./worker/README.md)

## License

MIT
