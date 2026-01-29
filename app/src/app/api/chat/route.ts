import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { SYSTEM_PROMPT } from "@/lib/resume-context";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Initialize ChatOpenAI with OpenRouter configuration
    const model = new ChatOpenAI({
      modelName: process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-sonnet",
      openAIApiKey: apiKey,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": process.env.SITE_URL || "https://emlsm.tech",
          "X-Title": "Emil Ismayilzada Portfolio",
        },
      },
      temperature: 0.7,
      maxTokens: 1024,
    });

    // Convert messages to LangChain format
    const langchainMessages = [
      new SystemMessage(SYSTEM_PROMPT),
      ...messages.map((msg: { role: string; content: string }) => {
        if (msg.role === "user") {
          return new HumanMessage(msg.content);
        } else {
          return new AIMessage(msg.content);
        }
      }),
    ];

    // Get response from the model
    const response = await model.invoke(langchainMessages);

    return NextResponse.json({
      content: response.content,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
