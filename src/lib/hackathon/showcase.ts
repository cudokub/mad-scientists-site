export type HackathonAward = "1st" | "2nd" | "3rd" | "4th" | "5th" | "finalist" | "honorable";

export type HackathonShowcaseLink = {
  label: string;
  href: string;
};

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
  extraLinks?: HackathonShowcaseLink[];
  projectType: string;
  cosmosArea: string;
  aiUse: string;
  tags: string[];
  award?: HackathonAward;
  curatorNote?: string;
};

export const showcaseEntries: HackathonShowcaseEntry[] = [
  {
    id: "mad-stake-fun",
    catalogNumber: "MEOC-001",
    projectName: "Mad Stake Fun",
    teamName: "videz",
    summary:
      "An onboarding and leaderboard experiment that makes staking ATOM feel social and rewarding.",
    description:
      "Mad Stake Fun lowers the jump from EVM habits into Cosmos Hub staking with a leaderboard around staking ATOM. The submission proposes a first-period MS NFT reward for the top staker and a path toward recurring community-backed staking incentives.",
    thumbnail: "/images/hackathon/showcase/mad-stake-fun.png",
    mediaAlt: "Screenshot of the Mad Stake Fun staking leaderboard interface",
    demoUrl: "https://www.madstake.fun/",
    repoUrl: "https://github.com/videz001/madstakefun",
    projectType: "Staking App",
    cosmosArea: "Staking",
    aiUse: "Not specified",
    tags: ["ATOM", "Staking", "Leaderboard", "Onboarding"],
  },
  {
    id: "mad-votes",
    catalogNumber: "MEOC-002",
    projectName: "Mad Votes",
    teamName: "Kaku (temporalkaku)",
    summary:
      "A Cosmos Hub governance prediction market designed to track real proposal outcomes.",
    description:
      "Mad Votes turns Cosmos Hub governance proposals into prediction markets. The builder designed it to track Hub vote outcomes from contract data with no admin backend where possible, reward earlier predictions with higher multipliers, and burn 5% of incoming ATOM to benefit the Hub.",
    thumbnail: "/images/hackathon/showcase/mad-votes.png",
    mediaAlt: "Screenshot of the Mad Votes governance prediction market interface",
    demoUrl: "https://kakucodes.github.io/madvotes/",
    extraLinks: [
      {
        label: "Docs",
        href: "https://kakucodes.github.io/madvotes/#/docs",
      },
    ],
    projectType: "Prediction Market",
    cosmosArea: "Governance",
    aiUse: "Not specified",
    tags: ["Governance", "Prediction Market", "ATOM Burn", "GitHub Pages"],
    award: "1st",
  },
  {
    id: "carl",
    catalogNumber: "MEOC-003",
    projectName: "C.A.R.L - Cosmos Animal Racing League",
    teamName: "fyveonit",
    summary:
      "A Cosmos racing league with PFP racers, ATOM entries, side bets, and commit-reveal randomness.",
    description:
      "C.A.R.L runs race rounds every 8 hours with a 6-hour entry window, PFP-backed racers, ATOM entry fees, side bets, and commit-reveal randomness. The economics split the pot between winners, development, and crank incentives that help progress races.",
    thumbnail: "/images/hackathon/showcase/carl.png",
    mediaAlt: "Screenshot of the C.A.R.L racing arena interface",
    demoUrl: "https://cosmos-racing-league.vercel.app/",
    repoUrl: "https://github.com/CEWT-CULT/carl-fe",
    extraLinks: [
      {
        label: "Contract Repo",
        href: "https://github.com/CEWT-CULT/c.a.r.l",
      },
    ],
    projectType: "Game",
    cosmosArea: "ATOM Incentives",
    aiUse: "Not specified",
    tags: ["Racing", "PFPs", "Betting", "Commit Reveal"],
    award: "5th",
  },
  {
    id: "mad-lab",
    catalogNumber: "MEOC-004",
    projectName: "MAD LAB",
    teamName: "OoJae (oojae_)",
    summary:
      "An AI mad-scientist gacha where ATOM experiments mint Hub-native on-chain loot.",
    description:
      "MAD LAB is an AI mad-scientist gacha on Cosmos Hub mainnet. Players spend ATOM to run experiments; drand-verified randomness determines loot tier, while generated SVG NFTs and shard mechanics live through Hub-native contracts.",
    thumbnail: "/images/hackathon/showcase/mad-lab.png",
    mediaAlt: "Screenshot of the MAD LAB experiment dashboard",
    demoUrl: "https://mad-lab-cosmos.vercel.app/",
    repoUrl: "https://github.com/OoJae/mad-lab",
    videoUrl: "https://youtu.be/JxxmdYFfZ1E",
    projectType: "Game",
    cosmosArea: "CosmWasm",
    aiUse: "Generative Art",
    tags: ["Gacha", "Cosmos Hub Mainnet", "drand", "cw721"],
    award: "4th",
  },
  {
    id: "mind-the-mind",
    catalogNumber: "MEOC-005",
    projectName: "Mind the Mind",
    teamName: "ALISAA (alisaaonchain)",
    summary:
      "A 60-second bonding-curve game against an AI trader with a hidden objective.",
    description:
      "Mind the Mind is a 60-second bonding-curve game against an AI trader with a hidden objective. Each round is seeded from live Cosmos Hub block state, then reveals what the AI told you versus what it was optimizing for.",
    thumbnail: "/images/hackathon/showcase/mind-the-mind.png",
    mediaAlt: "Screenshot of the Mind the Mind AI trading game interface",
    demoUrl: "https://mind-the-mind.vercel.app/play",
    repoUrl: "https://github.com/alisaaonchain/mind-the-mind",
    extraLinks: [
      {
        label: "Submission Post",
        href: "https://x.com/Alisaaonchain/status/2069177900150951967",
      },
    ],
    projectType: "Game",
    cosmosArea: "Hub Data",
    aiUse: "AI Opponent",
    tags: ["Bonding Curve", "AI Trader", "Block Seed", "Cosmos EVM"],
  },
  {
    id: "mutagen",
    catalogNumber: "MEOC-006",
    projectName: "MUTAGEN",
    teamName: "pramadani (albatrozxprama)",
    summary:
      "A bonding-curve gacha where Cosmos Hub signals reshape loot odds and payout fairness.",
    description:
      "MUTAGEN pairs bonding-curve gacha with deterministic AI controls. Cosmos Hub staking, governance, and IBC signals feed a regime classifier that reshapes loot odds, while a Gini auditor checks payout fairness every 10 pulls.",
    thumbnail: "/images/hackathon/showcase/mutagen.png",
    mediaAlt: "Screenshot of the MUTAGEN incubator interface",
    demoUrl: "https://mutagen-chi.vercel.app/",
    repoUrl: "https://github.com/pramadanif/mutagen",
    extraLinks: [
      {
        label: "Health Check",
        href: "https://mutagen.pramadani.site/health",
      },
      {
        label: "Submission Post",
        href: "https://x.com/bagus_firza/status/2069132265746297121?s=20",
      },
    ],
    projectType: "Game",
    cosmosArea: "Hub Signals",
    aiUse: "Deterministic AI",
    tags: ["Gacha", "Regime Classifier", "Gini Auditor", "Provider Testnet"],
  },
  {
    id: "jailbreak",
    catalogNumber: "MEOC-007",
    projectName: "Jailbreak",
    teamName: "SAVAGE (savage27z)",
    summary:
      "A validator-risk card game powered by live Cosmos Hub validator and slashing data.",
    description:
      "Jailbreak pulls real Cosmos Hub validator and slashing data into a card game. Players read AI-scored slashing risk, wager play points on whether validators stay clean, and learn the staking incentives behind the result.",
    thumbnail: "/images/hackathon/showcase/jailbreak.png",
    mediaAlt: "Screenshot of the Jailbreak validator card game interface",
    demoUrl: "https://jailbreak-beta.vercel.app/",
    repoUrl: "https://github.com/Savage27z/Jailbreak",
    projectType: "Game",
    cosmosArea: "Validators",
    aiUse: "Risk Scoring",
    tags: ["Validators", "Slashing", "Staking Education", "Cards"],
  },
  {
    id: "the-governor",
    catalogNumber: "MEOC-008",
    projectName: "The Governor",
    teamName: "dr4ken.soul",
    summary:
      "A gamified Cosmos Hub governance simulator with ATOM staking and AI-generated proposals.",
    description:
      "The Governor is a gamified Cosmos Hub governance simulator. Players connect Keplr, stake ATOM in-game, vote on AI-generated governance-style proposals, and earn rewards when they back the winning majority.",
    thumbnail: "/images/hackathon/showcase/the-governor.png",
    mediaAlt: "Screenshot of The Governor governance simulator landing page",
    demoUrl: "https://governor-hub.vercel.app/",
    repoUrl: "https://github.com/dr4ken-soul/The-Governor.git",
    projectType: "Game",
    cosmosArea: "Governance",
    aiUse: "Proposal Generation",
    tags: ["Governance", "Keplr", "ATOM", "Simulator"],
  },
  {
    id: "ibc-02-packet-get-over-here",
    catalogNumber: "MEOC-009",
    projectName: 'IBC-02 "PACKET, GET OVER HERE!"',
    teamName: "subzero0057",
    teamMembers: ["cosmosrescue", "subzero0057"],
    summary:
      "A retro IBC relayer arcade game with sponsor-funded daily ATOM prizes on Cosmos Hub.",
    description:
      "A retro arcade game where players act as IBC relayers catching data packets before clients expire. The prize pool tracks a live Cosmos Hub escrow balance and settles daily ATOM payouts to top players through the Telegram game flow.",
    thumbnail: "/images/hackathon/showcase/ibc-02-packet-get-over-here.png",
    mediaAlt: "Screenshot of the IBC packet catching arcade game interface",
    demoUrl: "https://t.me/ibc_cosmobot/game",
    extraLinks: [
      {
        label: "Game Site",
        href: "https://game.cosmosrescue.com/",
      },
    ],
    projectType: "Game",
    cosmosArea: "IBC",
    aiUse: "Build Assistance",
    tags: ["IBC", "Arcade", "Telegram", "Daily Prizes"],
    award: "2nd",
  },
  {
    id: "relic-reactor",
    catalogNumber: "MEOC-010",
    projectName: "Relic Reactor",
    teamName: "Luka (luka___29)",
    summary:
      "A crafting game and behavioral-economics experiment around a shared reactor core.",
    description:
      "Relic Reactor is a crafting and behavioral-economics game around a shared Fragmented Hub Core. Players forage, brew, craft, and decide whether to extract value now or protect long-term reactor stability, with an AI lab intelligence profiling play style at the end.",
    thumbnail: "/images/hackathon/showcase/relic-reactor.png",
    mediaAlt: "Screenshot of the Relic Reactor crafting interface",
    repoUrl: "https://github.com/lu2v98/relic-reactor/tree/main",
    projectType: "Game",
    cosmosArea: "Game Economy",
    aiUse: "AI Intelligence",
    tags: ["Crafting", "Behavioral Economics", "Shared Resource", "Mad Scientists Art"],
  },
  {
    id: "cosmos-arcade",
    catalogNumber: "MEOC-011",
    projectName: "Cosmos Arcade",
    teamName: "tonyler",
    summary:
      "Arcade games on Cosmos Hub where friends bet ATOM and the smart contract pays the winner.",
    description:
      "Cosmos Arcade hosts competitive arcade matches where two players lock ATOM into a Cosmos Hub CosmWasm escrow and the contract pays the winner automatically after the game ends.",
    thumbnail: "/images/hackathon/showcase/cosmos-arcade.png",
    mediaAlt: "Screenshot of the Cosmos Arcade game selection interface",
    demoUrl: "https://tonyler.is-not-a.dev/hackathon/",
    repoUrl: "https://github.com/tonyler/cosmos-arcade",
    projectType: "Game",
    cosmosArea: "Escrow",
    aiUse: "Not specified",
    tags: ["Arcade", "CosmWasm", "Escrow", "ATOM Bets"],
    award: "3rd",
  },
  {
    id: "petri",
    catalogNumber: "MEOC-012",
    projectName: "Petri",
    teamName: "solution_o17",
    summary:
      "A vote-gated parimutuel prediction market for Cosmos Hub governance outcomes.",
    description:
      "Petri is a vote-gated parimutuel prediction market for Cosmos Hub governance. Users bet on proposal outcomes, but the claim flow verifies that an address actually voted without revealing how it voted.",
    thumbnail: "/images/hackathon/showcase/petri.png",
    mediaAlt: "Screenshot of the Petri prediction market landing page",
    demoUrl: "https://predictpetri.vercel.app/",
    repoUrl: "https://github.com/solutionkanu12/petri",
    projectType: "Prediction Market",
    cosmosArea: "Governance",
    aiUse: "Not specified",
    tags: ["Parimutuel", "Vote Gate", "x/gov", "Osmosis Testnet"],
  },
  {
    id: "the-lying-oracle",
    catalogNumber: "MEOC-013",
    projectName: "The Lying Oracle",
    teamName: "klisiu8489 & Flarnrules",
    summary:
      "An on-chain knowledge game where players pay ATOM to interrogate a lying AI oracle.",
    description:
      "The Lying Oracle is an on-chain knowledge game where players pay ATOM to question an AI oracle guarding a hidden secret. The oracle lies according to contest rules, so players triangulate the truth through paid questions, shared answers, and on-chain prize incentives.",
    thumbnail: "/images/hackathon/showcase/the-lying-oracle.png",
    mediaAlt: "Screenshot of The Lying Oracle contest interface",
    demoUrl: "https://pkrc9lgfepeg37o2or317jnffk.ingress.rtgroup.com/",
    extraLinks: [
      {
        label: "Docs",
        href: "https://pkrc9lgfepeg37o2or317jnffk.ingress.rtgroup.com/docs",
      },
    ],
    projectType: "Game",
    cosmosArea: "On-chain Game",
    aiUse: "AI Oracle",
    tags: ["Oracle", "ATOM", "Information Game", "Osmosis Testnet"],
  },
  {
    id: "mad-run",
    catalogNumber: "MEOC-014",
    projectName: "MAD RUN",
    teamName: "sirthanos",
    summary:
      "A Cosmos Hub survival runner with ATOM collection, lab hazards, and AI-scored bosses.",
    description:
      "MAD RUN turns Cosmos ecosystem hazards into a survival runner. Players connect Keplr on cosmoshub-4, collect ATOM, dodge RUG pulls and FUD, and fight AI-scored bosses while leaderboard and bonding curve mechanics track the run.",
    thumbnail: "/images/hackathon/showcase/mad-run.png",
    mediaAlt: "Screenshot of the MAD RUN survival runner game",
    demoUrl: "https://sirthan0s.github.io/Mad-Run/mad_run_final.html",
    repoUrl: "https://github.com/Sirthan0s/Mad-Run",
    projectType: "Game",
    cosmosArea: "Keplr / ATOM",
    aiUse: "Boss Scoring",
    tags: ["Runner", "Keplr", "Leaderboard", "Bonding Curve"],
  },
  {
    id: "allotropy",
    catalogNumber: "MEOC-015",
    projectName: "Allotropy",
    teamName: "kromsten",
    summary:
      "A smart-contract-first platform for continuous tokens backed by liquid-staking bonding curves.",
    description:
      "Allotropy is a smart-contract-first platform for launching continuous tokens backed by capital-efficient liquid-staking bonding curves. The submission focuses on SDK staking and x/liquid mechanics that let bonded funds surface as liquid staking token shares.",
    thumbnail: "/images/hackathon/showcase/allotropy-blueprint.svg",
    mediaAlt:
      "Blueprint-style Allotropy protocol diagram showing ATOM, bonding curves, liquid staking, and continuous tokens",
    repoUrl: "https://github.com/kromsten/Allotropy",
    projectType: "DeFi Protocol",
    cosmosArea: "Liquid Staking",
    aiUse: "Not specified",
    tags: ["Continuous Tokens", "Bonding Curves", "x/liquid", "LST"],
  },
];
