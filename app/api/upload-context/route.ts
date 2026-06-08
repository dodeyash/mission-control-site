import { NextResponse } from "next/server";
import { createRequire } from "module";

export const runtime = "nodejs";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse/lib/pdf-parse.js");

type UploadedFile = {
  name: string;
  type: string;
  dataBase64: string;
};

export async function GET() {
  return NextResponse.json({
    status: "Upload context API is working",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const files: UploadedFile[] = body.files || [];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files uploaded." },
        { status: 400 }
      );
    }

    const parsedFiles = [];

    for (const file of files) {
      const buffer = Buffer.from(file.dataBase64, "base64");

      let content = "";

      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      if (isPdf) {
        const parsedPdf = await pdfParse(buffer);
        content = parsedPdf.text || "";
      } else {
        content = buffer.toString("utf-8");
      }

      parsedFiles.push({
        name: file.name,
        type: file.type || "unknown",
        content: content.slice(0, 20000),
      });
    }

    return NextResponse.json({
      files: parsedFiles,
    });
  } catch (error) {
    console.error("Upload context API error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown upload error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}