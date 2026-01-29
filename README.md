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

### 1. Initial Cloudflare Worker Setup (One-time)

First, deploy the worker manually to get your worker URL:

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
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |
| `CLOUDFLARE_API_TOKEN` | API Token with "Edit Workers" permission |
| `OPENROUTER_API_KEY` | Your OpenRouter API key |

**Getting Cloudflare credentials:**
- **Account ID**: Found in Cloudflare Dashboard sidebar or URL
- **API Token**: Create at [API Tokens](https://dash.cloudflare.com/profile/api-tokens) using "Edit Cloudflare Workers" template

### 3. Enable GitHub Pages

Go to **Settings** → **Pages** and set:
- Source: **GitHub Actions**

### 4. Push to Deploy

- **Frontend only**: Just push to `main` - GitHub Pages auto-deploys
- **Frontend + Worker**: Include `deploy:worker` in your commit message

```bash
# Deploy only frontend
git commit -m "Update styles"

# Deploy frontend AND worker (e.g., after updating resume)
git commit -m "Update resume deploy:worker"
```

You can also manually trigger worker deployment from **Actions** → **Deploy** → **Run workflow** → Check "Deploy Cloudflare Worker"

## Updating Your Resume

Simply replace `app/public/resume.pdf` and push with the `deploy:worker` keyword:

```bash
# Replace the PDF file
cp ~/new-resume.pdf app/public/resume.pdf

# Commit with deploy:worker to trigger worker update
git add app/public/resume.pdf
git commit -m "Update resume deploy:worker"
git push
```

GitHub Actions will automatically:
1. Deploy the updated frontend (with new PDF download)
2. Extract text from the new PDF
3. Deploy the updated worker with new resume context

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
