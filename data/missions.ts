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
    description: "Test your cloud mission knowledge.",
    question: "What is a key objective when auditing user access in cloud environments?",
    choices: [
      "Increase login speed",
      "Confirm goals, risks, and responsibilities",
      "Ensure users have appropriate access privileges",
      "Allow shared accounts",
    ],
    correctAnswer: "Ensure users have appropriate access privileges",
  },
  {
    title: "Systems Check",
    description: "Validate the mission systems.",
    question: "Which control reduces the risk of unauthorized access?",
    choices: [
      "Longer session timeouts",
      "Frequent password resets",
      "MFA",
      "Single sign-on only",
    ],
    correctAnswer: "MFA",
  },
  {
    title: "Stage One Complete",
    description: "Prove the team completed a key milestone.",
    question: "Which of the following is a common cloud security misconfiguration?",
    choices: [
      "Strong password policies",
      "Encrypted data storage",
      "Publicly accessible storage",
      "Frequent backups",
    ],
    correctAnswer: "Publicly accessible storage",
  },
  {
    title: "Orbital Transfer",
    description: "Move from progress to bigger impact.",
    question: "Which scenario represents a key cybersecurity risk auditors should flag?",
    choices: [
      "Regular patching process in place",
      "Centralized logging enabled",
      "Users with excessive or admin-level access without justification",
      "Use of secure protocols",
    ],
    correctAnswer: "Users with excessive or admin-level access without justification",
  },
  {
    title: "Lunar Touchdown",
    description: "Complete the final mission.",
    question: "Why is continuous monitoring important in cloud and cybersecurity auditing?",
    choices: [
      "Replaces the need for audits",
      "Eliminates all risk",
      "Reduces reporting requirements",
      "Provides ongoing visibility into control effectiveness and emerging risks",
    ],
    correctAnswer: "Provides ongoing visibility into control effectiveness and emerging risks",
  },
];