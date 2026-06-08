export type Mission = {
  title: string;
  description: string;
  question: string;
  choices: string[];
  correctAnswer: string;
};

export const missions: Mission[] = [
  {
    title: "Launch Readiness",
    description: "Test your mission prep knowledge.",
    question: "What is the first step before launching a mission?",
    choices: [
      "Skip planning and launch immediately",
      "Confirm goals, risks, and responsibilities",
      "Wait until the rocket is already in orbit",
      "Only check the weather",
    ],
    correctAnswer: "Confirm goals, risks, and responsibilities",
  },
  {
    title: "Systems Check",
    description: "Validate the mission systems.",
    question: "Why do teams perform control checks?",
    choices: [
      "To make the process slower",
      "To confirm things are working as expected",
      "To avoid documenting work",
      "To remove all teamwork",
    ],
    correctAnswer: "To confirm things are working as expected",
  },
  {
    title: "Stage One Complete",
    description: "Prove the team completed a key milestone.",
    question: "What makes an accomplishment stronger?",
    choices: [
      "A vague statement",
      "No measurable result",
      "A clear impact or outcome",
      "Only saying it was difficult",
    ],
    correctAnswer: "A clear impact or outcome",
  },
  {
    title: "Orbital Transfer",
    description: "Move from progress to bigger impact.",
    question: "What helps a project create cross-team value?",
    choices: [
      "Clear communication with stakeholders",
      "Keeping updates hidden",
      "Ignoring dependencies",
      "Working with no timeline",
    ],
    correctAnswer: "Clear communication with stakeholders",
  },
  {
    title: "Lunar Touchdown",
    description: "Complete the final mission.",
    question: "What does mission success mean here?",
    choices: [
      "The team’s impact has been fully unlocked",
      "Nothing was completed",
      "The rocket stayed on Earth",
      "The mission was canceled",
    ],
    correctAnswer: "The team’s impact has been fully unlocked",
  },
];