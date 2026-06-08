import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const documentText = body.documentText || "";
    const userPrompt = body.userPrompt || "";
    const contextFiles = body.contextFiles || [];

    if (!userPrompt.trim()) {
      return NextResponse.json(
        { error: "Missing user prompt." },
        { status: 400 }
      );
    }

    const contextText = contextFiles
      .map(
        (file: { name: string; content: string }) =>
          `Source: ${file.name}\n${file.content}`
      )
      .join("\n\n---\n\n");

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "system",
          content:
            "You are an Internal Audit document editing assistant. Help improve audit documents using a professional, concise, executive-ready tone. Use uploaded context when relevant. Do not invent facts. If context is missing, say what information would help.",
        },
        {
          role: "user",
          content: `
User request:
${userPrompt}

Current document:
${documentText}

Available uploaded context:
${contextText || "No uploaded context provided yet."}

Return a helpful edit, suggestion, rewrite, or explanation. If rewriting, provide a polished version and briefly explain what changed.
          `,
        },
      ],
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("Edit document API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while calling the AI assistant." },
      { status: 500 }
    );
  }
}