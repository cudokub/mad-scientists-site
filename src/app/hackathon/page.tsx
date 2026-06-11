import Image from "next/image";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

// Real hubs — resources, submissions, and updates live in Cosmos docs / Discord / X for now.
const DISCORD = "https://discord.gg/q7zgmdKtKW";
const TWITTER = "https://twitter.com/madscientists_x";
const RESOURCES_URL = "https://docs.cosmos.network/hub/latest";

const eventLinks = {
  resources: RESOURCES_URL,
  updates: TWITTER,
};

// TODO: swap to the team's specific Discord submissions / ticket channel link
const SUBMIT_URL = DISCORD;

const prizes = [
  {
    place: "1st",
    reward: "$1,000 in ATOM",
    bonus: "5 Odin Scan credits",
  },
  {
    place: "2nd",
    reward: "$300 in ATOM",
    bonus: "3 Odin Scan credits",
  },
  {
    place: "3rd",
    reward: "$200 in ATOM",
    bonus: "1 Odin Scan credit",
  },
  {
    place: "4th",
    reward: "MS NFT",
    bonus: "Mad Scientists collection prize",
  },
  {
    place: "5th",
    reward: "MS NFT",
    bonus: "Mad Scientists collection prize",
  },
];

const timeline = [
  {
    shortDate: "Jun 11",
    time: "17:00 UTC",
    phase: "Register",
    title: "Pre-Hackathon",
    body: "Resources drop.",
  },
  {
    shortDate: "Jun 15",
    time: "16:00 UTC",
    phase: "Kickoff",
    title: "Kickoff X Spaces",
    body: "The lab opens live on X Spaces.",
  },
  {
    shortDate: "Jun 15-22",
    time: "1 week to ship",
    phase: "Build",
    title: "Build Phase",
    body: "Ship a playable or inspectable build.",
  },
  {
    shortDate: "Jun 22",
    time: "17:00 UTC",
    phase: "Submit",
    title: "Submission Close",
    body: "Final entries close in Discord.",
  },
  {
    shortDate: "Jun 22-29",
    time: "1 week+",
    phase: "Review",
    title: "Judging & Showcase",
    body: "Review, highlights, and public features.",
  },
];

const submissionGuide = [
  { label: "Project Name", body: "What are you calling it?" },
  { label: "One-Line Description", body: "What it does, in a single sentence." },
  {
    label: "GitHub Repo",
    body: "Public link to your code, with a README and setup instructions.",
  },
  {
    label: "Live Demo or Website",
    body: "A working link — or a short demo video if it isn't deployable.",
  },
  { label: "Cosmos Hub Connection", body: "A sentence or two on how it ties to the Hub." },
  { label: "Team", body: "Names and handles (Discord, X, or GitHub) of everyone who built it." },
];

const judgingCriteria = [
  "Working prototype",
  "Creative mechanic",
  "AI usage",
  "Cosmos relevance",
  "Incentive clarity",
];

const judges = [
  {
    name: "Robo",
    handle: "@RoboMcGobo",
    role: "Ecosystem Lead | Cosmos Labs",
    image: "/images/hackathon/judge-robo-pfp.png",
  },
  {
    name: "Nico",
    handle: "@qxnico",
    role: "CMO | Cosmos Labs",
    image: "/images/hackathon/judge-nico-pfp.png",
  },
];

const partners = [
  {
    name: "Cosmos Lab",
    type: "Sponsor",
    image: "/images/hackathon/cosmos-lab-logo.png",
    width: 400,
    height: 400,
  },
  {
    name: "Odin Scan",
    type: "Sponsor",
    image: "/images/hackathon/odin-scan-logo.png",
    width: 400,
    height: 400,
  },
  {
    name: "Mad Scientists",
    type: "Host",
    image: "/images/hackathon/mad-scientists-logo.png",
    width: 603,
    height: 400,
  },
];

function HackathonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isExternal = href?.startsWith("http") ?? false;
  const classes =
    variant === "primary"
      ? "border-hackathon bg-hackathon text-white hover:bg-white hover:text-hackathon"
      : "border-hackathon bg-black/60 text-hackathon-cyan hover:bg-hackathon/20 hover:text-white";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`flex min-h-[44px] items-center justify-center border px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon md:text-base ${classes}`}
    >
      {children}
    </a>
  );
}

function EventTicker() {
  const items = [
    "REGISTER · JUN 11",
    "KICKOFF · JUN 15",
    "BUILD · JUN 15-22",
    "SUBMIT · JUN 22",
    "SHOWCASE · JUN 22-29",
  ];

  return (
    <div
      className="mx-auto max-w-[1440px] border-x border-b border-hackathon bg-black"
      aria-label="Mad Easy on Cosmos schedule ticker"
    >
      <div
        className="overflow-hidden py-3"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="ticker-animate flex w-max items-center whitespace-nowrap">
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-8 shrink-0 font-display text-lg font-bold uppercase tracking-wider text-hackathon md:text-2xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Background elevation system (keep consistent across sections):
 * - bg-black ............... headers/media: section title panels, hero art, ticker, logo chips
 * - bg-hackathon-bg-light .. content surface: content panels + primary cards (timeline/checklist/follow/prize)
 * - bg-hackathon-bg ........ base + inset: page background and gap-separated recessed chips (review rows, hero stat tiles)
 * Every section reads as: black title panel -> #04101d content.
 */
export default function HackathonPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-hackathon-bg text-hackathon-text">
      <NavBar theme="hackathon" />

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-hero">
        <div className="border border-hackathon bg-black">
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <Image
              src="/images/hackathon/announcement-clean.png"
              alt="Mad Easy on Cosmos hackathon announcement art"
              fill
              priority
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 border-t border-hackathon md:grid-cols-2">
            <div className="border-b border-hackathon p-6 md:border-b-0 md:border-r md:p-8">
              <p className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan md:text-base">
                Builder sprint on Cosmos Hub
              </p>
              <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wider text-white md:text-5xl lg:text-6xl">
                Mad Easy on Cosmos
              </h1>
              <p className="mt-4 max-w-3xl font-mono text-base leading-relaxed text-hackathon-text-muted md:text-lg">
                A one-week lab for AI-assisted onchain experiments around risk, rewards,
                coordination, and play.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 bg-hackathon-bg-light p-6 md:p-8">
              <div className="grid grid-cols-2 border border-hackathon">
                <div className="border-r border-hackathon bg-hackathon-bg p-4 text-center">
                  <p className="font-display text-sm uppercase tracking-wider text-hackathon-cyan">
                    Build
                  </p>
                  <p className="mt-1 font-mono text-xl font-bold text-white">June 15-22</p>
                </div>
                <div className="bg-hackathon-bg p-4 text-center">
                  <p className="font-display text-sm uppercase tracking-wider text-hackathon-cyan">
                    Showcase
                  </p>
                  <p className="mt-1 font-mono text-xl font-bold text-white">June 22-29</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <HackathonLink href={eventLinks.resources}>Resources</HackathonLink>
                <HackathonLink href={eventLinks.updates} variant="secondary">
                  Follow On X
                </HackathonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EventTicker />

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-mission">
        <div className="border-x border-b border-hackathon bg-hackathon-bg-light p-6 md:p-8">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
            The Mission
          </h2>
          <p className="mt-5 max-w-4xl font-mono text-lg leading-relaxed text-hackathon-text md:text-xl">
            Build gacha-inspired games, loot mechanics, bonding-curve experiments, reflexive
            incentive games, social coordination games, risk/reward simulations, and other mad
            science that explores how people interact with incentives on the Cosmos Hub.
          </p>
          <p className="mt-4 max-w-4xl font-mono text-base leading-relaxed text-hackathon-text-muted md:text-lg">
            Use AI as a co-builder, agent, mechanic, narrator, analyzer, or simulation layer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-prizes">
        <div className="border-x border-b border-hackathon bg-black">
          <div className="grid grid-cols-1 border-b border-hackathon md:grid-cols-2">
            <div className="border-b border-hackathon p-6 md:border-b-0 md:border-r md:p-8">
              <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
                Prizes
              </h2>
              <p className="mt-3 font-mono text-sm leading-relaxed text-hackathon-text-muted md:text-base">
                ATOM, Odin Scan credits, and Mad Scientists NFTs for the top five experiments.
              </p>
              <div className="mt-6 border border-hackathon/40 p-4">
                <p className="font-mono text-sm leading-relaxed text-hackathon-text-muted">
                  <span className="font-bold text-white">$1,500 in ATOM</span> · 9 Odin Scan credits
                  · 2 Mad Scientists NFTs · top 5 slots
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 bg-hackathon-bg-light xl:grid-cols-2">
              <article className="border-b border-hackathon p-6 md:p-8 xl:border-b-0 xl:border-r">
                <p className="font-display text-6xl font-bold uppercase tracking-wider text-hackathon md:text-7xl">
                  {prizes[0].place}
                </p>
                <h3 className="mt-4 font-mono text-2xl font-bold text-white md:text-3xl">
                  {prizes[0].reward}
                </h3>
                <p className="mt-3 font-mono text-base font-bold text-hackathon-cyan">
                  {prizes[0].bonus}
                </p>
              </article>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {prizes.slice(1).map((prize, index) => (
                  <article
                    key={prize.place}
                    className={`border-hackathon p-5 md:p-6 ${
                      index < 2 ? "border-b" : ""
                    } ${index % 2 === 0 ? "sm:border-r" : ""}`}
                  >
                    <p className="font-display text-4xl font-bold uppercase tracking-wider text-hackathon">
                      {prize.place}
                    </p>
                    <h3 className="mt-4 font-mono text-lg font-bold text-white">{prize.reward}</h3>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-hackathon-text-muted">
                      {prize.bonus}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-timeline">
        <div className="border-x border-b border-hackathon bg-hackathon-bg-light">
          <div className="border-b border-hackathon bg-black p-6 md:p-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-hackathon-text-muted md:text-base">
              Use this as the date map. Deliverable details live in the checklist below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5">
            {timeline.map((item, index) => (
              <article
                key={item.title}
                className="relative border-b border-hackathon bg-hackathon-bg-light p-5 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <p className="font-display text-2xl font-bold text-hackathon">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="border border-hackathon px-2 py-1 font-display text-xs font-bold uppercase tracking-wider text-hackathon-cyan">
                    {item.phase}
                  </p>
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  {item.title}
                </h3>
                <div className="mt-4 border-l border-hackathon pl-3">
                  <p className="font-mono text-sm font-bold text-hackathon-cyan">{item.shortDate}</p>
                  <p className="mt-1 font-mono text-xs text-hackathon-text">{item.time}</p>
                </div>
                <p className="mt-4 font-mono text-sm leading-relaxed text-hackathon-text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-submission">
        <div className="grid grid-cols-1 border-x border-b border-hackathon bg-black md:grid-cols-2">
          <div className="border-b border-hackathon p-6 md:border-b-0 md:border-r md:p-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
              Submission &amp; Scoring
            </h2>
            <p className="mt-3 font-mono text-sm leading-relaxed text-hackathon-text-muted md:text-base">
              Build it, then submit through Discord. Here&apos;s everything we&apos;ll ask for — and
              the five signals we score on.
            </p>
            <div className="mt-6 max-w-xs">
              <HackathonLink href={SUBMIT_URL}>Submit In Discord</HackathonLink>
            </div>
          </div>

          <div className="flex flex-col bg-hackathon-bg-light">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {submissionGuide.map((item, index) => (
                <article
                  key={item.label}
                  className={`flex gap-4 border-b border-hackathon p-5 ${
                    index % 2 === 0 ? "sm:border-r" : ""
                  }`}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-hackathon font-display text-sm font-bold text-hackathon-cyan"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                      {item.label}
                    </h3>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-hackathon-text-muted">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="p-6 md:p-8">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
                Scored on
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {judgingCriteria.map((criterion) => (
                  <span
                    key={criterion}
                    className="border border-hackathon/40 bg-hackathon-bg px-3 py-2 font-mono text-xs font-bold text-hackathon-text md:text-sm"
                  >
                    {criterion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-people">
        <div className="border-x border-b border-hackathon bg-hackathon-bg-light">
          <div className="border-b border-hackathon bg-black p-6 md:p-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
              Judges &amp; Sponsors
            </h2>
            <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-hackathon-text-muted md:text-base">
              Two Cosmos Lab judges reviewing entries, backed by the sponsors supporting the sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-b border-hackathon p-6 md:p-8 lg:border-b-0 lg:border-r">
              <h3 className="font-display text-xl font-bold uppercase tracking-wider text-hackathon-cyan">
                Judges
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                {judges.map((judge) => (
                  <div
                    key={judge.name}
                    className="flex items-center gap-4 border border-hackathon/40 bg-hackathon-bg p-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-hackathon/40">
                      <Image
                        src={judge.image}
                        alt={`${judge.name} judge portrait`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold uppercase tracking-wider text-white">
                        {judge.name}
                      </p>
                      <p className="truncate font-mono text-xs text-hackathon-text-muted">
                        {judge.handle} · {judge.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="font-display text-xl font-bold uppercase tracking-wider text-hackathon-cyan">
                Sponsors &amp; Host
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center gap-4 border border-hackathon/40 bg-hackathon-bg p-3"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-hackathon/40 bg-black">
                      <Image
                        src={partner.image}
                        alt={`${partner.name} logo`}
                        width={partner.width}
                        height={partner.height}
                        sizes="48px"
                        className="h-auto w-auto object-contain"
                        style={{ maxWidth: 44, maxHeight: 36 }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-base font-bold uppercase tracking-wider text-white">
                        {partner.name}
                      </p>
                      <p className="font-mono text-xs text-hackathon-cyan">{partner.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-register">
        <div className="border-x border-b border-hackathon bg-black p-8 text-center md:p-12">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
            Join the Lab
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-mono text-sm leading-relaxed text-hackathon-text-muted md:text-base">
            Get your resources and Follow on X for kickoff and recap Spaces.
          </p>
          <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            <HackathonLink href={RESOURCES_URL}>Resources</HackathonLink>
            <HackathonLink href={TWITTER} variant="secondary">
              Follow On X
            </HackathonLink>
          </div>
        </div>
      </section>

      <Footer theme="hackathon" />
    </main>
  );
}
