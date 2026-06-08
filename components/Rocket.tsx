type RocketProps = {
  landed: boolean;
  step: number;
  stage: {
    left: string;
    top: string;
    rotate: string;
    scale: number;
  };
};

export default function Rocket({ landed, step, stage }: RocketProps) {
  const isFlying = step > 0 && !landed;

  return (
    <div
      className={`absolute z-20 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        landed ? "duration-[2200ms]" : "duration-[1300ms]"
      }`}
      style={{
        left: stage.left,
        top: stage.top,
        transform: `translate(-50%, -50%) rotate(${stage.rotate}) scale(${stage.scale})`,
      }}
    >
      <div
        className={`relative h-[360px] w-[92px] ${
          isFlying ? "rocket-vibration" : ""
        } ${landed ? "touchdown-settle" : ""}`}
      >
        {/* Nose cone */}
        <div className="absolute left-[28px] top-0 h-[70px] w-[36px] rounded-t-full bg-white shadow-xl" />

        {/* Main body */}
        <div className="absolute left-[22px] top-[62px] h-[235px] w-[48px] rounded-sm border border-white/70 bg-white shadow-2xl" />

        {/* Black panels */}
        <div className="absolute left-[22px] top-[125px] h-[18px] w-[48px] bg-black" />
        <div className="absolute left-[22px] top-[230px] h-[22px] w-[48px] bg-black" />

        {/* Center line */}
        <div className="absolute left-[45px] top-[72px] h-[215px] w-[1px] bg-gray-300" />

        {/* Rocket text */}
        <div className="absolute left-[26px] top-[155px] rotate-90 text-[13px] font-black tracking-[0.25em] text-black">
          SPACEX
        </div>

        {/* Engine section */}
        <div className="absolute left-[18px] top-[295px] h-[42px] w-[56px] rounded-b bg-gray-200" />

        <div className="absolute left-[28px] top-[334px] h-[12px] w-[8px] rounded-b bg-gray-700" />
        <div className="absolute left-[42px] top-[334px] h-[12px] w-[8px] rounded-b bg-gray-700" />
        <div className="absolute left-[56px] top-[334px] h-[12px] w-[8px] rounded-b bg-gray-700" />

        {/* Grid fins */}
        <div className="absolute left-[10px] top-[255px] h-[30px] w-[14px] border border-white/80 bg-gray-400/40" />
        <div className="absolute right-[10px] top-[255px] h-[30px] w-[14px] border border-white/80 bg-gray-400/40" />

        {/* Landing legs deploy only at touchdown */}
        {landed && (
          <>
            <div className="landing-leg-left absolute left-[18px] top-[332px] h-[58px] w-[3px] bg-white" />
            <div className="landing-leg-right absolute right-[18px] top-[332px] h-[58px] w-[3px] bg-white" />
            <div className="absolute left-[-8px] top-[384px] h-[5px] w-[36px] rounded bg-white" />
            <div className="absolute right-[-8px] top-[384px] h-[5px] w-[36px] rounded bg-white" />
          </>
        )}

        {/* Main flame during flight */}
        {isFlying && (
          <div className="absolute left-[31px] top-[346px] h-[95px] w-[30px] flame rounded-b-full bg-orange-500 blur-[1px] shadow-[0_0_70px_rgba(249,115,22,1)]">
            <div className="absolute left-[7px] top-[5px] h-[65px] w-[16px] rounded-b-full bg-yellow-300" />
            <div className="absolute left-[11px] top-[12px] h-[36px] w-[8px] rounded-b-full bg-white/90" />
          </div>
        )}

        {/* Small final landing burn */}
        {landed && (
          <div className="absolute left-[36px] top-[346px] h-[34px] w-[20px] landing-burn rounded-b-full bg-orange-400 blur-[1px] shadow-[0_0_35px_rgba(251,146,60,0.9)]">
            <div className="absolute left-[5px] top-[4px] h-[20px] w-[10px] rounded-b-full bg-yellow-200" />
          </div>
        )}
      </div>
    </div>
  );
}