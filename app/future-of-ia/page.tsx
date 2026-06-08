export default function FutureOfIAPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-slate-950">
      {/* Top Navigation */}
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
              <p className="text-xs text-slate-500">
                RAG Document Workspace
              </p>
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

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-[#0033a0]">
            The Future of IA
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-none tracking-tight md:text-6xl">
                GPT-powered audit document editing with context memory.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                Upload background materials, edit a document in the center, and
                use a side chat assistant to rewrite, summarize, improve tone,
                and pull context from source files.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Product Concept
              </p>
              <p className="mt-1 text-2xl font-black text-[#0033a0]">
                IA Copilot
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <section className="mx-auto max-w-[1500px] px-8 py-8">
        <div className="grid min-h-[760px] gap-6 lg:grid-cols-[280px_1fr_360px]">
          {/* Left: Context Library */}
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                  Context
                </p>
                <h2 className="mt-1 text-xl font-black">
                  Source Library
                </h2>
              </div>

              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-3xl">📄</p>
              <p className="mt-3 text-sm font-black text-slate-800">
                Upload files
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                PDF, DOCX, TXT, XLSX
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  file: "Audit methodology.pdf",
                  type: "Policy",
                  status: "Indexed",
                },
                {
                  file: "Prior year report.docx",
                  type: "Report",
                  status: "Indexed",
                },
                {
                  file: "Control standards.xlsx",
                  type: "Standards",
                  status: "Indexed",
                },
                {
                  file: "Stakeholder notes.txt",
                  type: "Notes",
                  status: "Indexed",
                },
              ].map((item) => (
                <div
                  key={item.file}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {item.file}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.type}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#0033a0]">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#0033a0] p-4 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-blue-100">
                Memory Status
              </p>
              <p className="mt-2 text-sm leading-relaxed text-blue-50">
                Uploaded materials are used as retrieval context when the chat
                edits the document.
              </p>
            </div>
          </aside>

          {/* Middle: Document Editor */}
          <section className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            {/* Document Toolbar */}
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
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600">
                  Save Draft
                </button>
                <button className="rounded-full bg-[#0033a0] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                  Export
                </button>
              </div>
            </div>

            {/* Document Page */}
            <div className="bg-slate-100 p-8">
              <div className="mx-auto min-h-[620px] max-w-3xl rounded-sm bg-white px-12 py-10 shadow-xl">
                <div className="border-b border-slate-200 pb-5">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0033a0]">
                    Internal Audit
                  </p>
                  <h1 className="mt-3 text-3xl font-black">
                    Executive Summary
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Draft v1.2 • Context enabled • Last edited today
                  </p>
                </div>

                <div className="mt-8 space-y-6 text-[15px] leading-8 text-slate-700">
                  <p>
                    The review identified opportunities to improve documentation
                    consistency, strengthen ownership clarity, and enhance the
                    traceability of key control activities across the process.
                  </p>

                  <p>
                    Based on the uploaded background materials, the IA Copilot
                    can refine this document by aligning language to internal
                    reporting standards, preserving audit intent, and surfacing
                    relevant context from prior workpapers and methodology
                    documents.
                  </p>

                  <div className="rounded-2xl border-l-4 border-[#0033a0] bg-blue-50 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#0033a0]">
                      Suggested Edit
                    </p>
                    <p className="mt-2">
                      Consider tightening this section by emphasizing business
                      impact, control relevance, and recommended next steps for
                      management.
                    </p>
                  </div>

                  <p>
                    The future-state workflow allows users to upload background
                    information, ask the assistant for targeted edits, and
                    receive responses grounded in the relevant source materials.
                  </p>

                  <p>
                    This approach can reduce drafting friction, improve
                    consistency, and help teams move from raw notes to polished
                    stakeholder-ready documents faster.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Chat Assistant */}
          <aside className="flex flex-col rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                GPT Assistant
              </p>
              <h2 className="mt-1 text-xl font-black">
                Document Chat
              </h2>

              <div className="mt-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-xs font-bold text-green-700">
                  Using uploaded context
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
              <div className="max-w-[90%] rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Assistant
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  I can help rewrite, summarize, improve tone, or pull relevant
                  context from your uploaded background files.
                </p>
              </div>

              <div className="ml-auto max-w-[90%] rounded-2xl bg-[#0033a0] p-4 text-white shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-blue-100">
                  User
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  Make the executive summary more concise and professional.
                </p>
              </div>

              <div className="max-w-[90%] rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Assistant
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  I would recommend reducing the first paragraph, moving the
                  control impact earlier, and using terminology from the audit
                  methodology document.
                </p>

                <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs leading-relaxed text-slate-600">
                  Source context used: Audit methodology.pdf, Prior year
                  report.docx
                </div>
              </div>
            </div>

            {/* Prompt Box */}
            <div className="border-t border-slate-200 p-5">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]">
                  Improve tone
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]">
                  Summarize
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]">
                  Add context
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-[#0033a0] hover:text-[#0033a0]">
                  Rewrite
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2">
                <input
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
                  placeholder="Ask GPT to edit the document..."
                />
                <button className="rounded-xl bg-[#0033a0] px-4 py-3 text-sm font-black text-white">
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