export type HackathonAward = "1st" | "2nd" | "3rd" | "finalist" | "honorable";

export type HackathonShowcaseEntry = {
  id: string;
  catalogNumber: string;
  projectName: string;
  teamName: string;
  teamMembers?: string[];
  summary: string;
  description: string;
  thumbnail: string;
  mediaAlt: string;
  demoUrl?: string;
  repoUrl?: string;
  videoUrl?: string;
  projectType: string;
  cosmosArea: string;
  aiUse: string;
  tags: string[];
  award?: HackathonAward;
  curatorNote?: string;
};

export const showcaseEntries: HackathonShowcaseEntry[] = [
  {
    id: "slot-001",
    catalogNumber: "MEOC-001",
    projectName: "Submission Slot 001",
    teamName: "Awaiting Team",
    summary: "Reserved archive record for a playable incentive or rewards experiment.",
    description:
      "This record is ready for the first accepted Mad Easy on Cosmos submission. Replace this placeholder with the project's pitch, demo links, repository, Cosmos Hub connection, and AI usage notes once the team submits.",
    thumbnail: "/images/hackathon/showcase/archive-slot-001.svg",
    mediaAlt: "Blue archive placeholder image for submission slot 001",
    projectType: "Game",
    cosmosArea: "Rewards",
    aiUse: "Co-builder",
    tags: ["Intake Pending", "Gacha", "Rewards"],
    curatorNote: "Entries will be cataloged here after the June 22 submission close.",
  },
  {
    id: "slot-002",
    catalogNumber: "MEOC-002",
    projectName: "Submission Slot 002",
    teamName: "Awaiting Team",
    summary: "Reserved archive record for an AI-assisted onchain coordination prototype.",
    description:
      "This record is ready for a submitted coordination, governance, or social experiment. Swap in the builder's copy, screenshots, demo, and GitHub link when the submission packet is finalized.",
    thumbnail: "/images/hackathon/showcase/archive-slot-002.svg",
    mediaAlt: "Blue archive placeholder image for submission slot 002",
    projectType: "Coordination",
    cosmosArea: "Governance",
    aiUse: "Agent",
    tags: ["Intake Pending", "Social", "Governance"],
    curatorNote: "Use this note for judge context, highlights, or showcase copy.",
  },
  {
    id: "slot-003",
    catalogNumber: "MEOC-003",
    projectName: "Submission Slot 003",
    teamName: "Awaiting Team",
    summary: "Reserved archive record for a risk, staking, or rewards simulation.",
    description:
      "This record is ready for a technical prototype that models risk, stake, liquidity, rewards, or reflexive behavior. Add the final build media and links when the team is ready to publish.",
    thumbnail: "/images/hackathon/showcase/archive-slot-003.svg",
    mediaAlt: "Blue archive placeholder image for submission slot 003",
    projectType: "Simulation",
    cosmosArea: "Staking",
    aiUse: "Analyzer",
    tags: ["Intake Pending", "Risk", "Simulation"],
    curatorNote: "Award badges can be added later without moving entries out of the archive.",
  },
  {
    id: "slot-004",
    catalogNumber: "MEOC-004",
    projectName: "Submission Slot 004",
    teamName: "Awaiting Team",
    summary: "Reserved archive record for a tool, dashboard, or data product.",
    description:
      "This record is ready for a builder tool or inspectable data interface. Replace this placeholder with the actual submission details, a screenshot, and links to the live product and source code.",
    thumbnail: "/images/hackathon/showcase/archive-slot-004.svg",
    mediaAlt: "Blue archive placeholder image for submission slot 004",
    projectType: "Tool",
    cosmosArea: "Data",
    aiUse: "Assistant",
    tags: ["Intake Pending", "Dashboard", "Tooling"],
    curatorNote: "Keep the summary short so the archive wall stays easy to scan.",
  },
  {
    id: "slot-005",
    catalogNumber: "MEOC-005",
    projectName: "Submission Slot 005",
    teamName: "Awaiting Team",
    summary: "Reserved archive record for a loot mechanic or game economy prototype.",
    description:
      "This record is ready for a gacha-inspired or loot-driven build. Add the real project media, one-line pitch, and notes on how the experiment connects back to Cosmos Hub incentives.",
    thumbnail: "/images/hackathon/showcase/archive-slot-005.svg",
    mediaAlt: "Blue archive placeholder image for submission slot 005",
    projectType: "Economy",
    cosmosArea: "Incentives",
    aiUse: "Narrator",
    tags: ["Intake Pending", "Loot", "Economy"],
    curatorNote: "Use local images under public/images/hackathon/showcase for stable archive media.",
  },
  {
    id: "slot-006",
    catalogNumber: "MEOC-006",
    projectName: "Submission Slot 006",
    teamName: "Awaiting Team",
    summary: "Reserved archive record for an experimental app that does not fit a neat box.",
    description:
      "This record is ready for the weird, ambitious, or hard-to-classify submissions. Keep the archive honest: add what the team built, what works, and where judges can inspect it.",
    thumbnail: "/images/hackathon/showcase/archive-slot-006.svg",
    mediaAlt: "Blue archive placeholder image for submission slot 006",
    projectType: "Experiment",
    cosmosArea: "Cosmos Hub",
    aiUse: "Mechanic",
    tags: ["Intake Pending", "Prototype", "Mad Science"],
    curatorNote: "The gallery is built to hold every entry, not just winners.",
  },
];
