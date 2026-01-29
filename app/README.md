# Emil Ismayilzada Portfolio

A minimalist portfolio website with an AI-powered personal assistant chatbot. Built with Next.js, shadcn/ui, and LangChain.

## Features

- **Animated Title**: Displays "emilismayilzada" and "emlsm.tech" with a typing animation using Typed.js
- **AI Chatbot**: ChatGPT-like interface that acts as a personal assistant for recruiters
- **Dynamic Resume Parsing**: Automatically parses `resume.pdf` at runtime - just update the PDF and the chatbot context updates automatically
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark Mode**: Sleek dark theme by default
- **Responsive**: Works on all device sizes

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Typed.js
- **AI**: LangChain with OpenRouter API
- **PDF Parsing**: pdfjs-dist (for dynamic resume extraction)
- **Styling**: Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai/keys))

### Local Development

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key (required) | - |
| `OPENROUTER_MODEL` | The AI model to use | `anthropic/claude-3.5-sonnet` |
| `SITE_URL` | Your website URL for OpenRouter referrer | `https://emlsm.tech` |

## Using GitHub Secrets for Deployment

To keep your API key secure, store it in GitHub repository secrets and configure your deployment platform to use it.

### Step 1: Add Secret to GitHub Repository

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add a secret named `OPENROUTER_API_KEY` with your API key value

### Step 2: Configure Your Deployment Platform

#### Vercel

1. Go to your Vercel project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add `OPENROUTER_API_KEY` and either:
   - Paste your API key directly, OR
   - Use Vercel's GitHub integration to sync secrets

Alternatively, use the Vercel CLI:
```bash
vercel env add OPENROUTER_API_KEY
```

#### Netlify

1. Go to your Netlify site settings
2. Navigate to **Site settings** → **Environment variables**
3. Add `OPENROUTER_API_KEY` with your API key

#### GitHub Actions (for custom deployments)

In your workflow file, reference the secret:
```yaml
env:
  OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
```

## Updating Your Resume

The chatbot automatically reads and parses `public/resume.pdf` at runtime. To update the chatbot's knowledge:

1. Replace `public/resume.pdf` with your updated resume
2. Redeploy the application (or restart the dev server locally)

The PDF is parsed using `pdfjs-dist`, extracting all text content which is then used as context for the AI assistant.

## Project Structure

```
app/
├── src/
│   ├── app/
│   │   ├── api/chat/       # Chat API endpoint with LangChain
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Main page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Chat.tsx        # ChatGPT-like chatbot interface
│   │   └── TypedTitle.tsx  # Animated title with Typed.js
│   └── lib/
│       ├── resume-context.ts # PDF parsing and system prompt
│       └── utils.ts        # Utility functions
├── public/
│   └── resume.pdf          # Your resume (parsed automatically)
└── .env.example            # Environment variables template
```

## Customization

### Changing the AI Model

You can use any model available on OpenRouter by setting the `OPENROUTER_MODEL` environment variable:

- `anthropic/claude-3.5-sonnet` (default - recommended)
- `anthropic/claude-3-opus`
- `openai/gpt-4-turbo`
- `openai/gpt-4o`
- `google/gemini-pro`
- `meta-llama/llama-3.1-70b-instruct`

See [OpenRouter models](https://openrouter.ai/models) for the full list.

### Customizing the AI Behavior

Edit `src/lib/resume-context.ts` to modify the system prompt that guides the AI's behavior and personality.

### Styling

The project uses Tailwind CSS with shadcn/ui's theming system. Modify `globals.css` to customize colors and styles.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the root directory to `app`
4. Add your environment variables (use GitHub secrets integration)
5. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## License

MIT
