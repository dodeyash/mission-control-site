import Rocket from "./Rocket";

type FlightStage = {
  left: string;
  top: string;
  rotate: string;
  scale: number;
  label: string;
};

type SpaceSceneProps = {
  step: number;
  progress: number;
  landed: boolean;
  currentStage: FlightStage;
};

export default function SpaceScene({
  step,
  progress,
  landed,
  currentStage,
}: SpaceSceneProps) {
  return (
    <section className="absolute inset-0 overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_25%),linear-gradient(#020617,#000)]" />

      {/* Moving stars */}
      <div className="absolute inset-0 star-drift">
        {[...Array(210)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 7 === 0 ? "2px" : "1px",
              height: i % 7 === 0 ? "2px" : "1px",
              opacity: i % 4 === 0 ? 0.95 : 0.35,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 71) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Earth */}
      <div className="absolute -left-52 bottom-[-280px] h-[620px] w-[620px] rounded-full bg-blue-600 shadow-[0_0_150px_rgba(37,99,235,0.85)]">
        <div className="absolute left-[190px] top-[150px] h-24 w-48 rotate-12 rounded-full bg-emerald-500 blur-sm" />
        <div className="absolute left-[300px] top-[285px] h-24 w-60 -rotate-12 rounded-full bg-green-400 blur-sm" />
        <div className="absolute left-[250px] top-[100px] h-12 w-32 rounded-full bg-white/50 blur-md" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/25" />
      </div>

      {/* Flight arc */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        <path
          d="M 110 520 C 250 230, 530 95, 810 315"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="3"
          strokeDasharray="8 14"
        />

        <path
          d="M 110 520 C 250 230, 530 95, 810 315"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="4"
          strokeDasharray={`${progress * 8} 1000`}
          strokeLinecap="round"
        />
      </svg>

      {/* Moon */}
      <div className="absolute right-8 top-[22%] h-[390px] w-[390px]">
        <div className="absolute inset-0 rounded-full bg-neutral-300 shadow-[0_0_110px_rgba(255,255,255,0.45)]">
          <div className="absolute left-20 top-20 h-12 w-12 rounded-full bg-neutral-400/80" />
          <div className="absolute right-24 top-28 h-16 w-16 rounded-full bg-neutral-500/60" />
          <div className="absolute left-36 bottom-24 h-10 w-10 rounded-full bg-neutral-500/60" />
          <div className="absolute left-16 bottom-32 h-7 w-7 rounded-full bg-neutral-400/70" />
          <div className="absolute right-16 bottom-20 h-9 w-9 rounded-full bg-neutral-500/50" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-black/35" />
        </div>

        {/* Landing zone */}
        <div className="absolute left-[132px] top-[268px] h-5 w-36 rounded-full bg-neutral-500/70 shadow-[0_0_28px_rgba(255,255,255,0.45)]" />

        {/* Landing dust */}
        {landed && (
        <>
            <div className="landing-dust absolute left-[118px] top-[260px] h-16 w-44 rounded-full bg-neutral-200/25 blur-xl" />
            <div className="landing-dust-delay absolute left-[98px] top-[272px] h-12 w-56 rounded-full bg-neutral-300/20 blur-2xl" />
        </>
        )}

        {landed && (
        <div className="absolute left-[72px] top-[315px] rounded-full border border-white/30 bg-black/70 px-5 py-2 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur touchdown-flash">
        Touchdown confirmed
        </div>
        )}
      </div>

      {/* Exhaust smoke at launch */}
      {step === 1 && (
        <div className="absolute left-[5%] top-[76%] z-10">
          <div className="h-28 w-28 rounded-full bg-white/20 blur-xl smoke-one" />
          <div className="absolute left-16 top-6 h-24 w-24 rounded-full bg-gray-300/20 blur-xl smoke-two" />
          <div className="absolute left-32 top-4 h-32 w-32 rounded-full bg-gray-400/20 blur-2xl smoke-three" />
        </div>
      )}

      <Rocket landed={landed} step={step} stage={currentStage} />
    </section>
  );
}