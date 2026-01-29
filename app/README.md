# Emil Ismayilzada Portfolio - Frontend

A minimalist portfolio website with an AI-powered personal assistant chatbot. Built with Next.js and deployed as a static site on GitHub Pages.

## Features

- **Animated Title**: Displays "emilismayilzada" and "emlsm.tech" with a typing animation using Typed.js
- **AI Chatbot**: ChatGPT-like interface that acts as a personal assistant for recruiters
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark Mode**: Sleek dark theme by default
- **Responsive**: Works on all device sizes
- **Static Export**: Deployable to GitHub Pages

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Typed.js
- **Styling**: Tailwind CSS v4

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

## Local Development

1. Install dependencies:
   ```bash
   cd app
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` with your Cloudflare Worker URL:
   ```
   NEXT_PUBLIC_CHAT_API_URL=https://portfolio-chat-api.YOUR_SUBDOMAIN.workers.dev/api/chat
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment to GitHub Pages

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: app/package-lock.json
      
      - name: Install dependencies
        working-directory: ./app
        run: npm ci
      
      - name: Build
        working-directory: ./app
        env:
          NEXT_PUBLIC_CHAT_API_URL: ${{ secrets.CHAT_API_URL }}
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./app/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then add the secret `CHAT_API_URL` in your repository settings.

### Option 2: Manual Deployment

1. Build the static site:
   ```bash
   NEXT_PUBLIC_CHAT_API_URL=https://your-worker.workers.dev/api/chat npm run build
   ```

2. The `out/` directory contains the static files. Deploy these to GitHub Pages.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CHAT_API_URL` | URL to your Cloudflare Worker chat API |

## Project Structure

```
app/
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Main page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Chat.tsx        # ChatGPT-like chatbot interface
│   │   └── TypedTitle.tsx  # Animated title with Typed.js
│   └── lib/
│       └── utils.ts        # Utility functions
├── public/
│   └── resume.pdf          # Your resume (for download link)
├── out/                    # Static export output (after build)
└── .env.example            # Environment variables template
```

## Related

- [Worker README](../worker/README.md) - Cloudflare Worker API documentation
