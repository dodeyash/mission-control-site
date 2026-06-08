"use client";

import { useState } from "react";
import { missions } from "@/data/missions";
import MissionHUD from "@/components/MissionHUD";
import SpaceScene from "@/components/SpaceScene";

const flightStages = [
  {
    left: "12%",
    top: "68%",
    rotate: "-8deg",
    scale: 0.72,
    label: "On Pad",
  },
  {
    left: "24%",
    top: "49%",
    rotate: "38deg",
    scale: 0.82,
    label: "Liftoff",
  },
  {
    left: "41%",
    top: "31%",
    rotate: "58deg",
    scale: 0.86,
    label: "Stage One Ascent",
  },
  {
    left: "60%",
    top: "24%",
    rotate: "76deg",
    scale: 0.78,
    label: "Trans Lunar Injection",
  },
  {
    left: "78%",
    top: "33%",
    rotate: "18deg",
    scale: 0.66,
    label: "Landing Burn",
  },
  {
    left: "84.9%",
    top: "43.5%",
    rotate: "0deg",
    scale: 0.55,
    label: "Lunar Touchdown",
  },
];

export default function Home() {
  const [step, setStep] = useState(0);

  const landed = step === missions.length;
  const progress = Math.round((step / missions.length) * 100);
  const currentStage = flightStages[step];

  function handleCorrectAnswer() {
    if (!landed) {
      setStep((current) => current + 1);
    }
  }

  function resetMission() {
    setStep(0);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceScene
        step={step}
        progress={progress}
        landed={landed}
        currentStage={currentStage}
      />

      <MissionHUD
        missions={missions}
        step={step}
        progress={progress}
        landed={landed}
        currentLabel={currentStage.label}
        onCorrect={handleCorrectAnswer}
        onReset={resetMission}
      />
    </main>
  );
}