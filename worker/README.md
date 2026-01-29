# Portfolio Chat API - Cloudflare Worker

A Cloudflare Worker that provides the AI chat API for Emil's portfolio website. Uses OpenRouter to access various LLM models.

## Features

- **Fast & Serverless**: Runs on Cloudflare's edge network
- **Secure**: API key stored as a secret, never exposed to clients
- **CORS Enabled**: Works with GitHub Pages frontend
- **Multiple Models**: Supports any model available on OpenRouter

## Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)
- [OpenRouter API key](https://openrouter.ai/keys)
- Node.js 18+

## Setup

1. Install dependencies:
   ```bash
   cd worker
   npm install
   ```

2. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```

3. Set your OpenRouter API key as a secret:
   ```bash
   npx wrangler secret put OPENROUTER_API_KEY
   # Paste your API key when prompted
   ```

4. (Optional) Set a custom model:
   ```bash
   npx wrangler secret put OPENROUTER_MODEL
   # Enter model name like: anthropic/claude-3.5-sonnet
   ```

## Updating Resume Content

When you update your `resume.pdf`, run the extraction script to update the worker's context:

1. Make sure the PDF is at `app/public/resume.pdf`

2. Run the extraction script:
   ```bash
   npm run update-resume
   ```

3. Review the generated `src/resume-context.ts`

4. Deploy the updated worker:
   ```bash
   npm run deploy
   ```

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

Your worker will be available at:
```
https://portfolio-chat-api.YOUR_SUBDOMAIN.workers.dev
```

The chat endpoint is:
```
POST https://portfolio-chat-api.YOUR_SUBDOMAIN.workers.dev/api/chat
```

## Development

Run locally for testing:

```bash
npm run dev
```

This starts a local server at `http://localhost:8787`

## API Reference

### POST /api/chat

Send a chat message and receive an AI response.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What is Emil's current role?" }
  ]
}
```

**Response:**
```json
{
  "content": "Emil is currently working as a Data Analyst at BMW Group..."
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Environment Variables / Secrets

| Name | Description | Required |
|------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key | Yes |
| `OPENROUTER_MODEL` | Model to use (default: `anthropic/claude-3.5-sonnet`) | No |

### Available Models

Some popular models on OpenRouter:

- `anthropic/claude-3.5-sonnet` (default, recommended)
- `anthropic/claude-3-opus`
- `openai/gpt-4-turbo`
- `openai/gpt-4o`
- `google/gemini-pro`
- `meta-llama/llama-3.1-70b-instruct`

See [OpenRouter Models](https://openrouter.ai/models) for the full list.

## Project Structure

```
worker/
├── src/
│   ├── index.ts           # Main worker code
│   └── resume-context.ts  # Resume text and system prompt (auto-generated)
├── scripts/
│   └── extract-resume.js  # Script to extract text from PDF
├── wrangler.toml          # Cloudflare Worker configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Troubleshooting

### "API key not configured"
Make sure you've set the secret:
```bash
npx wrangler secret put OPENROUTER_API_KEY
```

### CORS errors
The worker is configured to allow all origins. If you need to restrict it, modify the `corsHeaders` in `src/index.ts`.

### Resume not updating
1. Make sure the PDF exists at `app/public/resume.pdf`
2. Run `npm run update-resume`
3. Check the generated `src/resume-context.ts`
4. Redeploy with `npm run deploy`

## Related

- [Frontend README](../app/README.md) - Next.js frontend documentation
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
