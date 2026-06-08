const teamMembers = [
  {
    name: "Bob",
    role: "Analyst",
    department: "Internal Audit Engineering",
    image: "YD",
    specialty: "Cloud, Coding, Data, Analysis/Excel, AWS CCP",
    quote: "Building smarter systems, one launch at a time.",
    stats: [
      { label: "Projects", value: "02" },
      { label: "Impact", value: "High" },
    ],
  },
  {
    name: "Ann",
    role: "Associate",
    department: "Internal Audit Engineering",
    image: "JE",
    specialty: "Cloud, Engineering, AWS CCP",
    quote: "Precision matters before every launch.",
    stats: [
      { label: "Projects", value: "07" },
      { label: "Impact", value: "High" },
    ],
  },
  {
    name: "Sam",
    role: "Associate",
    department: "Internal Audit Engineering",
    image: "SG",
    specialty: "Cloud, Coding, Data, Analysis/Excel, AWS CCP",
    quote: "Data turns mission noise into signal.",
    stats: [
      { label: "Projects", value: "04" },
      { label: "Impact", value: "High" },
    ],
  },
  {
    name: "Sharon",
    role: "Senior Analyst",
    department: "Internal Audit Engineering",
    image: "LW",
    specialty: "Cloud, Coding, Data, Analysis/Excel, AWS CCP",
    quote: "Every strong mission starts with clean execution.",
    stats: [
      { label: "Projects", value: "20" },
      { label: "Impact", value: "High" },
    ],
  },
  {
    name: "Jackson",
    role: "Senior Analyst",
    department: "Internal Audit Engineering",
    image: "JM",
    specialty: "Cloud, Coding, Data, Analysis/Excel, AWS CCP",
    quote: "Every strong mission starts with clean execution.",
    stats: [
      { label: "Projects", value: "2" },
      { label: "Impact", value: "High" },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.09),transparent_24%),linear-gradient(#020617,#000)]" />

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 6 === 0 ? "2px" : "1px",
              height: i % 6 === 0 ? "2px" : "1px",
              opacity: i % 4 === 0 ? 0.8 : 0.35,
              left: `${(i * 43) % 100}%`,
              top: `${(i * 67) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gold orbit lines */}
      <div className="absolute right-[-180px] top-[-120px] h-[520px] w-[520px] rounded-full border border-yellow-500/20" />
      <div className="absolute right-[-230px] top-[-170px] h-[700px] w-[700px] rounded-full border border-yellow-500/10" />
      <div className="absolute left-[-260px] bottom-[-260px] h-[620px] w-[620px] rounded-full border border-white/10" />

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-8">
        {/* Top Menu */}
        <nav className="mb-14 flex items-center justify-between rounded-full border border-white/10 bg-black/50 px-6 py-4 backdrop-blur-xl">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/10 text-sm font-black text-yellow-300">
              IA
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em]">
                Audit Mission Control
              </p>
              <p className="text-xs text-gray-500">
                Team Crew Manifest
              </p>
            </div>
          </a>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-300"
          >
            Meet the Team
          </a>

          <a
            href="/mission"
            className="rounded-full border border-white/15 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:bg-gray-200"
          >
            Mission to the Moon Audit
          </a>

          <a
            href="/future-of-ia"
            className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
          >
            Future of IA
          </a>
      </div>
        </nav>

        {/* Hero */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.45em] text-yellow-300">
              Goldman Sachs × Space Mission
            </p>

            <h1 className="mt-5 max-w-4xl text-6xl font-black leading-none tracking-tight md:text-7xl">
              Meet the crew behind the mission.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              A modern mission roster showcasing the people driving risk insight,
              engineering excellence, operational precision, and measurable team
              impact.
            </p>
          </div>

          <div className="rounded-[2rem] border border-yellow-500/25 bg-black/55 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-gray-400">
              Mission Status
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-3xl font-black text-yellow-300">06</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">
                  Crew
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-3xl font-black text-yellow-300">26</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">
                  Wins
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-3xl font-black text-yellow-300">100%</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">
                  Launch
                </p>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full rounded-full bg-yellow-300" />
            </div>

            <a
              href="/mission"
              className="mt-5 block rounded-2xl bg-yellow-300 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-black transition hover:bg-yellow-200"
            >
              Start Moon Audit
            </a>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <article
              key={member.name}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/50 hover:bg-white/[0.09]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-50" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-yellow-300/30 to-white/5 text-2xl font-black text-yellow-200 shadow-[0_0_35px_rgba(250,204,21,0.16)]">
                  {member.image}
                </div>

                <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-black uppercase tracking-widest text-gray-400">
                  0{index + 1}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-black tracking-tight">
                  {member.name}
                </h2>

                <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">
                  {member.role}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {member.department}
                </p>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-gray-300">
                {member.specialty}
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
                <p className="text-sm italic leading-relaxed text-gray-300">
                  “{member.quote}”
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {member.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <p className="text-lg font-black text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Operating Model Section */}
        <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-yellow-300">
                Operating Model
              </p>

              <h2 className="mt-4 text-4xl font-black">
                Built like a launch team.
              </h2>

              <p className="mt-4 leading-relaxed text-gray-300">
                Each person owns a mission-critical lane. Together, the team
                turns complex work into structured execution, clear reporting,
                and measurable impact.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <p className="text-3xl">🛰️</p>
                <h3 className="mt-4 font-black">Observe</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Identify risk signals, gaps, and opportunities.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <p className="text-3xl">🚀</p>
                <h3 className="mt-4 font-black">Execute</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Deliver projects, controls, automation, and reviews.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <p className="text-3xl">🌕</p>
                <h3 className="mt-4 font-black">Land</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Convert effort into outcomes the business can see.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}