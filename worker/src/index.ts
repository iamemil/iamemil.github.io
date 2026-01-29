import { SYSTEM_PROMPT } from './resume-context';

interface Env {
  OPENROUTER_API_KEY: string;
  OPENROUTER_MODEL?: string;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
}

// CORS headers for GitHub Pages
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests to /api/chat
    const url = new URL(request.url);
    
    if (request.method !== 'POST' || !url.pathname.endsWith('/chat')) {
      return new Response(
        JSON.stringify({ error: 'Not found. Use POST /api/chat' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    try {
      // Check for API key
      if (!env.OPENROUTER_API_KEY) {
        return new Response(
          JSON.stringify({ error: 'API key not configured' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Parse request body
      const body: ChatRequest = await request.json();

      if (!body.messages || !Array.isArray(body.messages)) {
        return new Response(
          JSON.stringify({ error: 'Invalid request: messages array required' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Prepare messages with system prompt
      const messages: Message[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...body.messages,
      ];

      // Call OpenRouter API
      const model = env.OPENROUTER_MODEL || 'google/gemini-2.5-flash-lite';
      
      const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://emlsm.tech',
          'X-Title': 'Emil Ismayilzada Portfolio',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      const data: OpenRouterResponse = await openRouterResponse.json();

      if (data.error) {
        console.error('OpenRouter error:', data.error);
        return new Response(
          JSON.stringify({ error: 'Failed to get response from AI' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      const content = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

      return new Response(
        JSON.stringify({ content }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  },
};
