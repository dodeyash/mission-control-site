import { useState } from "react";
import { Mission } from "@/data/missions";
import MissionCard from "./MissionCard";

type MissionHUDProps = {
  missions: Mission[];
  step: number;
  progress: number;
  landed: boolean;
  currentLabel: string;
  onCorrect: () => void;
  onReset: () => void;
};

export default function MissionHUD({
  missions,
  step,
  progress,
  landed,
  currentLabel,
  onCorrect,
  onReset,
}: MissionHUDProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "">("");

  const currentMission = missions[step];

  function handleAnswer(choice: string) {
    if (!currentMission || landed) return;

    setSelectedAnswer(choice);

    if (choice === currentMission.correctAnswer) {
      setFeedback("correct");

      setTimeout(() => {
        setSelectedAnswer("");
        setFeedback("");
        onCorrect();
      }, 900);
    } else {
      setFeedback("wrong");
    }
  }

  return (
    <section className="absolute left-8 top-8 z-30 w-[440px] rounded-[2rem] border border-white/15 bg-black/65 p-6 shadow-2xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.45em] text-gray-400">
        Mission Control
      </p>

      <h1 className="mt-3 text-5xl font-black tracking-tight">MOONSHOT</h1>

      <p className="mt-3 text-sm text-gray-400">
        Current phase:{" "}
        <span className="font-bold text-white">{currentLabel}</span>
      </p>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-gray-400">
          <span>Trajectory</span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!landed && currentMission && (
        <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Question {step + 1}
          </p>

          <h2 className="mt-3 text-xl font-black">
            {currentMission.question}
          </h2>

          <div className="mt-5 space-y-3">
            {currentMission.choices.map((choice) => {
              const isSelected = selectedAnswer === choice;
              const isCorrect = choice === currentMission.correctAnswer;

              let buttonStyle =
                "border-white/15 bg-black/40 hover:bg-white/15";

              if (feedback === "correct" && isSelected && isCorrect) {
                buttonStyle = "border-green-400 bg-green-400/20";
              }

              if (feedback === "wrong" && isSelected && !isCorrect) {
                buttonStyle = "border-red-400 bg-red-400/20";
              }

              return (
                <button
                  key={choice}
                  onClick={() => handleAnswer(choice)}
                  disabled={feedback === "correct"}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${buttonStyle}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {feedback === "correct" && (
            <p className="mt-4 rounded-xl border border-green-400/40 bg-green-400/15 px-4 py-3 text-sm font-bold text-green-300">
              Correct. Rocket advancing.
            </p>
          )}

          {feedback === "wrong" && (
            <p className="mt-4 rounded-xl border border-red-400/40 bg-red-400/15 px-4 py-3 text-sm font-bold text-red-300">
              Not quite. Try again.
            </p>
          )}
        </div>
      )}

      {landed && (
        <div className="mt-6 rounded-2xl border border-green-400/40 bg-green-400/15 p-5 text-center">
          <p className="text-2xl font-black text-green-300">
            MISSION COMPLETE
          </p>
          <p className="mt-2 text-sm text-gray-300">
            All answers were correct. Lunar touchdown confirmed.
          </p>

          <button
            onClick={onReset}
            className="mt-5 w-full rounded-2xl border border-white/20 bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black hover:bg-gray-200"
          >
            Restart Mission
          </button>
        </div>
      )}

      <div className="mt-5 space-y-3">
        {missions.map((mission, i) => {
          const status =
            i < step ? "complete" : i === step ? "active" : "locked";

          return (
            <MissionCard
              key={mission.title}
              number={i + 1}
              title={mission.title}
              description={mission.description}
              status={status}
            />
          );
        })}
      </div>
    </section>
  );
}