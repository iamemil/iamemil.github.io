# Emil Ismayilzada Portfolio

A minimalist portfolio website with an AI-powered personal assistant chatbot. Built with Next.js, shadcn/ui, and LangChain.

## Features

- **Animated Title**: Displays "emilismayilzada" and "emlsm.tech" with a typing animation using Typed.js
- **AI Chatbot**: ChatGPT-like interface that acts as a personal assistant for recruiters
- **Resume Context**: The chatbot has full context of the resume and can answer questions about experience, skills, projects, and education
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark Mode**: Sleek dark theme by default
- **Responsive**: Works on all device sizes

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Typed.js
- **AI**: LangChain with OpenRouter API
- **Styling**: Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai/keys))

### Installation

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

## Project Structure

```
app/
├── src/
│   ├── app/
│   │   ├── api/chat/       # Chat API endpoint
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Chat.tsx        # Chatbot interface
│   │   └── TypedTitle.tsx  # Animated title
│   └── lib/
│       ├── resume-context.ts # Resume data and system prompt
│       └── utils.ts        # Utility functions
├── public/
│   └── resume.pdf          # Downloadable resume
└── .env.example            # Environment variables template
```

## Customization

### Updating Resume Context

Edit `src/lib/resume-context.ts` to update the resume information and system prompt for the chatbot.

### Changing the AI Model

You can use any model available on OpenRouter by setting the `OPENROUTER_MODEL` environment variable. Some options:

- `anthropic/claude-3.5-sonnet` (default)
- `openai/gpt-4-turbo`
- `google/gemini-pro`
- `meta-llama/llama-3.1-70b-instruct`

### Styling

The project uses Tailwind CSS with shadcn/ui's theming system. Modify `globals.css` to customize colors and styles.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the root directory to `app`
4. Add your environment variables
5. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## License

MIT
