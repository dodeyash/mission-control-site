"use client";

import { useState } from "react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

type ContextFile = {
  name: string;
  content: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Could not read file."));
        return;
      }

      const base64 = result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("File reading failed."));
    };

    reader.readAsDataURL(file);
  });
}

export default function FutureOfIAPage() {
  const [documentText, setDocumentText] = useState(
    `The review identified opportunities to improve documentation consistency, strengthen ownership clarity, and enhance the traceability of key control activities across the process.

Based on the uploaded background materials, the IA Copilot can refine this document by aligning language to internal reporting standards, preserving audit intent, and surfacing relevant context from prior workpapers and methodology documents.

The future-state workflow allows users to upload background information, ask the assistant for targeted edits, and receive responses grounded in the relevant source materials.`
  );

  const [contextFiles, setContextFiles] = useState<ContextFile[]>([
    {
      name: "Audit methodology.pdf",
      content:
        "Audit reports should be concise, risk-focused, and written for executive stakeholders. Findings should clearly identify condition, risk, root cause, and recommendation.",
    },
    {
      name: "Prior year report.docx",
      content:
        "Prior year reporting emphasized ownership clarity, control traceability, timely remediation, and consistent evidence standards.",
    },
    {
      name: "Control standards.xlsx",
      content:
        "Control documentation should include control objective, control owner, frequency, evidence source, testing approach, and exception criteria.",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "I can help rewrite, summarize, improve tone, or pull relevant context from your uploaded background files. Highlight a section in the document if you want me to edit only that part.",
    },
  ]);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);

  function handleTextSelection(event: React.SyntheticEvent<HTMLTextAreaElement>) {
    const target = event.currentTarget;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    if (start !== end) {
      setSelectedText(target.value.substring(start, end));
      setSelectionStart(start);
      setSelectionEnd(end);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    setUploading(true);

    try {
      const encodedFiles = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          dataBase64: await fileToBase64(file),
        }))
      );

      const response = await fetch("/api/upload-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: encodedFiles,
        }),
      });

      const rawText = await response.text();

      let data;

      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(
          `Upload route did not return JSON. Server said: ${rawText.slice(
            0,
            300
          )}`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "File upload failed.");
      }

      const uploadedFiles: ContextFile[] = data.files.map(
        (file: { name: string; content: string }) => ({
          name: file.name,
          content: file.content,
        })
      );

      setContextFiles((current) => [...current, ...uploadedFiles]);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: `${uploadedFiles.length} file(s) uploaded and added to context memory.`,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            error instanceof Error
              ? `Upload error: ${error.message}`
              : "Unknown upload error.",
        },
      ]);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function sendMessage(userPrompt?: string) {
    const finalPrompt = userPrompt || prompt;

    if (!finalPrompt.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      text: selectedText
        ? `${finalPrompt}\n\nSelected section:\n${selectedText}`
        : finalPrompt,
    };

    setMessages((current) => [...current, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch("/api/edit-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentText,
          selectedText,
          userPrompt: finalPrompt,
          contextFiles,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed.");
      }

      const assistantMessage: Message = {
        role: "assistant",
        text: data.reply,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            error instanceof Error
              ? `API error: ${error.message}`
              : "Unknown API error.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function getLastAssistantMessage() {
    return [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
  }

  function applyLastAssistantMessageToDocument() {
    const lastAssistantMessage = getLastAssistantMessage();

    if (!lastAssistantMessage) return;

    setDocumentText(lastAssistantMessage.text);
    setSelectedText("");
    setSelectionStart(null);
    setSelectionEnd(null);
  }

  function applyLastAssistantMessageToSelectedSection() {
    const lastAssistantMessage = getLastAssistantMessage();

    if (
      !lastAssistantMessage ||
      selectionStart === null ||
      selectionEnd === null ||
      selectionStart === selectionEnd
    ) {
      return;
    }

    const before = documentText.slice(0, selectionStart);
    const after = documentText.slice(selectionEnd);

    setDocumentText(`${before}${lastAssistantMessage.text}${after}`);
    setSelectedText("");
    setSelectionStart(null);
    setSelectionEnd(null);
  }

  function removeContextFile(fileName: string) {
    setContextFiles((current) =>
      current.filter((file) => file.name !== fileName)
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-slate-950">
      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0033a0] text-sm font-black text-white">
              IA
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-900">
                Future of IA
              </p>
              <p className="text-xs text-slate-500">RAG Document Workspace</p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-700 transition hover:border-[#0033a0] hover:text-[#0033a0]"
            >
              Meet the Team
            </a>

            <a
              href="/mission"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-700 transition hover:border-[#0033a0] hover:text-[#0033a0]"
            >
              Moon Audit
            </a>

            <a
              href="/future-of-ia"
              className="rounded-full bg-[#0033a0] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#002678]"
            >
              Future of IA
            </a>
          </div>
        </div>
      </nav>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-10">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-[#0033a0]">
            The Future of IA
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-none tracking-tight md:text-6xl">
                AI-powered audit document editing with context memory.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                Upload context files, highlight part of the document, and ask
                AI to rewrite, summarize, improve tone, or edit only the
                selected section.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Context Files
              </p>
              <p className="mt-1 text-2xl font-black text-[#0033a0]">
                {contextFiles.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-8 py-8">
        <div className="grid min-h-[760px] gap-6 lg:grid-cols-[300px_1fr_410px]">
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                  Context
                </p>
                <h2 className="mt-1 text-xl font-black">Source Library</h2>
              </div>

              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <label className="mt-6 block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-[#0033a0] hover:bg-blue-50">
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.md,.csv,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-3xl">📄</p>
              <p className="mt-3 text-sm font-black text-slate-800">
                {uploading ? "Uploading..." : "Upload context files"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                PDF, TXT, MD, CSV, JSON
              </p>
            </label>

            <div className="mt-6 space-y-3">
              {contextFiles.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="break-words text-sm font-bold text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.content.length.toLocaleString()} chars
                      </p>
                    </div>

                    <button
                      onClick={() => removeContextFile(item.name)}
                      className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#0033a0] p-4 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-blue-100">
                Memory Status
              </p>
              <p className="mt-2 text-sm leading-relaxed text-blue-50">
                Uploaded text is passed to the API as context for each chat
                request.
              </p>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                  Active Document
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  Audit Executive Summary
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {selectedText && (
                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#0033a0]">
                    Section Selected
                  </span>
                )}

                <button
                  onClick={() => setDocumentText("")}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:border-red-400 hover:text-red-500"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="bg-slate-100 p-8">
              <div className="mx-auto min-h-[620px] max-w-3xl rounded-sm bg-white px-12 py-10 shadow-xl">
                <div className="border-b border-slate-200 pb-5">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0033a0]">
                    Internal Audit
                  </p>
                  <h1 className="mt-3 text-3xl font-black">
                    Control Design Assessment
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Highlight text to edit a specific section
                  </p>
                </div>

                <textarea
                  value={documentText}
                  onChange={(event) => setDocumentText(event.target.value)}
                  onSelect={handleTextSelection}
                  onMouseUp={handleTextSelection}
                  onKeyUp={handleTextSelection}
                  className="mt-8 min-h-[470px] w-full resize-none border-none bg-transparent text-[15px] leading-8 text-slate-700 outline-none"
                  placeholder="Paste or write your audit document here..."
                />

                {selectedText && (
                  <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-[#0033a0]">
                      Selected Section
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-700">
                      {selectedText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="flex flex-col rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                AI Assistant
              </p>
              <h2 className="mt-1 text-xl font-black">Document Chat</h2>

              <div className="mt-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-xs font-bold text-green-700">
                  Using uploaded context
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[92%] rounded-2xl p-4 shadow-sm ${
                    message.role === "user"
                      ? "ml-auto bg-[#0033a0] text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  <p
                    className={`text-xs font-black uppercase tracking-widest ${
                      message.role === "user"
                        ? "text-blue-100"
                        : "text-slate-400"
                    }`}
                  >
                    {message.role === "user" ? "User" : "Assistant"}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </p>
                </div>
              ))}

              {loading && (
                <div className="max-w-[92%] rounded-2xl bg-white p-4 text-sm text-slate-500 shadow-sm">
                  Thinking...
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 p-5">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    sendMessage(
                      selectedText
                        ? "Rewrite the selected section to be more concise and executive-ready."
                        : "Rewrite the document to be more concise and executive-ready."
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]"
                >
                  Executive-ready
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      selectedText
                        ? "Summarize the selected section in three bullets."
                        : "Summarize the document in three bullets."
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]"
                >
                  Summarize
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      selectedText
                        ? "Improve the audit tone of the selected section."
                        : "Improve the audit tone and make the writing more professional."
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]"
                >
                  Improve tone
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      selectedText
                        ? "Use uploaded context to improve the selected section."
                        : "Use the uploaded context to recommend improvements to this draft."
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]"
                >
                  Add context
                </button>
              </div>

              <div className="mb-3 grid grid-cols-1 gap-2">
                <button
                  onClick={applyLastAssistantMessageToSelectedSection}
                  disabled={!selectedText}
                  className="rounded-xl border border-[#0033a0]/20 bg-blue-50 px-3 py-2 text-xs font-black uppercase tracking-widest text-[#0033a0] hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Apply response to selected section
                </button>

                <button
                  onClick={applyLastAssistantMessageToDocument}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]"
                >
                  Replace whole document with response
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2">
                <input
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
                  placeholder={
                    selectedText
                      ? "Ask AI to edit selected section..."
                      : "Ask AI to edit the document..."
                  }
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading}
                  className="rounded-xl bg-[#0033a0] px-4 py-3 text-sm font-black text-white disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}