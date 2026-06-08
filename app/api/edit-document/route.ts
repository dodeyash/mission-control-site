import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing. Check your .env.local file." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const documentText = body.documentText || "";
    const selectedText = body.selectedText || "";
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
      input: `
You are an Internal Audit document editing assistant.

Your job:
- Help improve audit documents.
- Use a concise, professional, executive-ready tone.
- Use uploaded context when relevant.
- Do not invent facts.
- If a selected section is provided, edit ONLY that section unless the user asks otherwise.
- If no selected section is provided, give guidance or rewrite the broader document based on the user's request.

User request:
${userPrompt}

Selected section to edit:
${selectedText || "No specific section selected."}

Full document:
${documentText}

Uploaded context:
${contextText || "No uploaded context provided."}

Return the best response. If editing selected text, provide the revised section only, then briefly explain what changed.
      `,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("Edit document API error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}