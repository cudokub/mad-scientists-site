"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Silkscreen } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

interface Scientist {
  id: number;
  name: string;
  src: string;
  tagline: string;
  lore: string;
}

const scientists: Scientist[] = [
  {
    id: 1,
    name: "The Architect",
    src: "/images/cosmic-1.png",
    tagline: "Built the machine. Became the machine.",
    lore: "The Architect doesn\u2019t explore the cosmos. He engineers it. Every wire, every circuit, every system traces back to his blueprint. While others look up at the stars, he\u2019s already building what comes next.",
  },
  {
    id: 2,
    name: "The Warlord",
    src: "/images/cosmic-2.png",
    tagline: "Didn\u2019t come to explore. Came to conquer.",
    lore: "The Warlord was never interested in discovery. Where others saw the unknown, he saw unclaimed territory. The crimson crystal isn\u2019t decoration. It\u2019s the last thing you see before the cosmos becomes his.",
  },
  {
    id: 3,
    name: "The Oracle",
    src: "/images/cosmic-3.png",
    tagline: "Sees everything. Says nothing.",
    lore: "The Oracle\u2019s mind broke through the dome a long time ago. Now it floats, exposed, receiving signals from places that don\u2019t have names yet. He doesn\u2019t speak because language is too slow for what he knows.",
  },
  {
    id: 4,
    name: "The Antiquarian",
    src: "/images/cosmic-4.png",
    tagline: "Carried the old world into the new one.",
    lore: "While everyone else raced toward the future, The Antiquarian packed the past. Ancient tools, forgotten maps, knowledge that predates the lab itself. Turns out the cosmos has been explored before. You just need to know where to look.",
  },
  {
    id: 5,
    name: "The Dreamer",
    src: "/images/cosmic-5.png",
    tagline: "Closed eyes. Open universe.",
    lore: "The Dreamer never built a ship or drew a weapon. She just closed her eyes and was already there. The rainbow trail isn\u2019t exhaust. It\u2019s the residue of imagination meeting reality. She\u2019s the only one who went willingly, and the only one who might not come back.",
  },
];

const auctionSteps = [
  {
    step: "01",
    title: "Choose Your Scientist",
    desc: "Pick the COSMIC 1/1 you want to claim before the bidding window closes.",
  },
  {
    step: "02",
    title: "Bid With 10k NFTs",
    desc: "Submit Mad Scientists from the 10k set as your bid amount. No minimum bid size.",
  },
  {
    step: "03",
    title: "Highest Bid Takes It",
    desc: "Each scientist has an isolated auction. The top bid wins that exact 1/1 piece.",
  },
  {
    step: "04",
    title: "Non-Winners Refunded",
    desc: "If you do not win, your submitted Mad Scientists are returned automatically.",
  },
];

const parallelAuctionStatus = [
  {
    id: 1,
    lane: "Lane Alpha",
    phase: "Signal Calibration",
    opensIn: "Opens in 02h 14m",
    leadingBid: "14 Mad Scientists",
    activity: 72,
  },
  {
    id: 2,
    lane: "Lane Beta",
    phase: "Bid Intake",
    opensIn: "Opens in 03h 05m",
    leadingBid: "9 Mad Scientists",
    activity: 58,
  },
  {
    id: 3,
    lane: "Lane Gamma",
    phase: "Watcher Queue",
    opensIn: "Opens in 01h 42m",
    leadingBid: "18 Mad Scientists",
    activity: 83,
  },
  {
    id: 4,
    lane: "Lane Delta",
    phase: "Wallet Sync",
    opensIn: "Opens in 04h 28m",
    leadingBid: "7 Mad Scientists",
    activity: 41,
  },
  {
    id: 5,
    lane: "Lane Omega",
    phase: "Final Diagnostics",
    opensIn: "Opens in 00h 56m",
    leadingBid: "22 Mad Scientists",
    activity: 91,
  },
];

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400"],
});

const HERO_IMAGE_SRC = "/images/cosmic-hero-lineup.png";
const HERO_IMAGE_ALT = "Mad Scientists cosmic lab lineup";

function ScientistModal({
  scientist,
  onClose,
}: {
  scientist: Scientist;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="presentation"
    >
      <div className="absolute inset-0 bg-[#02040b]/90 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-5xl overflow-hidden border border-cosmic/40 bg-[#080612]/95 shadow-[0_0_80px_rgba(126,211,255,0.15),0_0_30px_rgba(155,89,240,0.4)] animate-[modalEnter_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${scientist.name} details`}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center border border-cosmic/40 bg-[#09081a]/70 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="grid max-h-[90vh] md:grid-cols-[minmax(0,1fr)_360px]">
          <div className="relative border-b border-cosmic/30 md:border-b-0 md:border-r">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(126,211,255,0.2),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(255,122,217,0.18),transparent_45%)]" />
            <Image
              src={scientist.src}
              alt={scientist.name}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 border border-cosmic/40 bg-[#08051a]/80 px-3 py-2">
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-cosmic/70">
                Cosmic 1/1 Artifact
              </p>
            </div>
          </div>

          <div className="flex max-h-[90vh] flex-col gap-6 overflow-y-auto p-6 md:p-8">
            <div>
              <p className="mb-2 font-display text-[10px] uppercase tracking-[0.2em] text-[#7ed3ff]">
                Edition 1 of 1
              </p>
              <h3 className="font-display text-3xl uppercase tracking-wide text-[#f4ecff]">
                {scientist.name}
              </h3>
            </div>

            <div className="border-y border-cosmic/25 py-4">
              <p className="font-mono text-base italic leading-relaxed text-[#d8d4e2]">
                &ldquo;{scientist.tagline}&rdquo;
              </p>
            </div>

            <p className="font-mono text-sm leading-relaxed text-[#b4afc0]">
              {scientist.lore}
            </p>

            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-cosmic/25 pt-4">
              <div className="border border-cosmic/25 bg-[#0b0a1f] p-3">
                <p className="font-display text-[10px] uppercase tracking-[0.15em] text-cosmic/60">
                  Collection
                </p>
                <p className="mt-1 font-display text-sm uppercase tracking-wide text-[#f4ecff]">
                  COSMIC
                </p>
              </div>
              <div className="border border-cosmic/25 bg-[#0b0a1f] p-3">
                <p className="font-display text-[10px] uppercase tracking-[0.15em] text-cosmic/60">
                  Access
                </p>
                <p className="mt-1 font-display text-sm uppercase tracking-wide text-[#7ed3ff]">
                  Auction Only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({
  scientist,
  onClick,
}: {
  scientist: Scientist;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden border border-cosmic/45 bg-[#090b17] text-left transition duration-300 hover:-translate-y-1 hover:border-[#7ed3ff]/70 hover:shadow-[0_14px_30px_rgba(35,158,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed3ff]"
    >
      <Image
        src={scientist.src}
        alt={scientist.name}
        width={500}
        height={500}
        className="relative z-0 h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-cosmic/30 bg-[rgba(6,9,20,0.88)] px-3 py-3 transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0">
        <p className="font-display text-sm uppercase tracking-wider text-[#f3edff]">
          {scientist.name}
        </p>
        <p className="mt-1 font-mono text-xs leading-relaxed text-[#beb9ce]">
          {scientist.tagline}
        </p>
      </div>
      <span className="absolute left-3 top-3 z-20 border border-cosmic/40 bg-[#070819]/80 px-2 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-cosmic/75">
        1/1
      </span>
    </button>
  );
}

function ClearFive({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${silkscreen.className} inline-block font-normal tracking-normal ${className}`}
    >
      5
    </span>
  );
}

export default function CosmicPage() {
  const [selected, setSelected] = useState<Scientist | null>(null);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#04070f] text-[#e7e4ef]">
      <style>{`
        @keyframes modalEnter {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <NavBar theme="cosmic" />

      <section className="relative mx-auto max-w-[1440px] border-x border-cosmic/25">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-160px] top-[-140px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(126,211,255,0.22)_0%,rgba(126,211,255,0)_72%)]" />
          <div className="absolute bottom-[-180px] right-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,122,217,0.2)_0%,rgba(255,122,217,0)_72%)]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.22) 0 1px, transparent 1px), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.15) 0 1px, transparent 1px)",
              backgroundSize: "190px 190px, 160px 160px",
            }}
          />
        </div>

        <section className="relative border-b border-cosmic/25 px-4 py-8 md:px-12 md:py-12">
          <div className="overflow-hidden border border-cosmic/40 bg-[#050a16] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[16/9]">
              <Image
                src={HERO_IMAGE_SRC}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,24,0.12)_10%,rgba(4,8,24,0.45)_45%,rgba(4,8,24,0.95)_100%)]" />

              <div className="absolute left-3 top-3 border border-[#7ed3ff]/50 bg-[rgba(3,8,20,0.8)] px-3 py-2 md:left-5 md:top-5">
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-[#7ed3ff]">
                  COSMIC Hero
                </p>
              </div>

              <div className="absolute right-3 top-3 hidden w-[130px] border border-cosmic/40 bg-[rgba(8,8,28,0.65)] p-2 md:right-5 md:top-5 md:block md:w-[170px]">
                <Image
                  src="/images/cosmic-logo.png"
                  alt="COSMIC logo"
                  width={360}
                  height={120}
                  className="h-auto w-full"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 lg:p-10">
                <div className="max-w-3xl">
                  <p className="font-display text-[11px] uppercase tracking-[0.22em] text-[#7ed3ff] md:text-xs">
                    Mad Scientists Signal // COSMIC Division
                  </p>
                  <h1 className="mt-2 font-display text-3xl uppercase leading-[0.9] tracking-wide text-[#f3ecff] md:text-5xl lg:text-6xl">
                    <ClearFive className="text-[#7ed3ff]" /> Scientists.
                    <br />
                    Infinite Universe.
                  </h1>
                  <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-[#c9c5d8] md:text-sm lg:text-base">
                    COSMIC is a five-piece 1/1 set that pushes Mad Scientists
                    beyond standard profile-picture drops. Each artifact is
                    hand built and auctioned separately using your Mad
                    Scientists 10k NFTs as bids.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      href="#collection"
                      variant="cosmic-primary"
                      size="lg"
                      theme="cosmic"
                    >
                      Inspect Collection
                    </Button>
                    <Button
                      href="#auction"
                      variant="ghost"
                      size="lg"
                      theme="cosmic"
                    >
                      Auction Mechanics
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-4">
            {[
              { label: "Artifacts", value: "5 x 1/1" },
              { label: "Mint Type", value: "Hand-Crafted" },
              { label: "Acquisition", value: "Auction" },
              { label: "Bid Asset", value: "Mad 10k NFTs" },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-cosmic/25 bg-[#0a0c1d] p-3 md:p-4"
              >
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-cosmic/65">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-sm uppercase tracking-wide text-[#f6f1ff] md:text-base">
                  {item.label === "Artifacts" ? (
                    <>
                      <ClearFive className="text-[#f6f1ff]" /> x 1/1
                    </>
                  ) : (
                    item.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative border-b border-cosmic/25 bg-[linear-gradient(90deg,rgba(126,211,255,0.08),rgba(155,89,240,0.07),rgba(255,115,199,0.08))] px-6 py-4 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-display text-[11px] uppercase tracking-[0.18em] text-[#d8d2ec] md:text-xs">
            <span>
              <ClearFive className="text-[#d8d2ec]" /> one-of-one artifacts
            </span>
            <span>pixel-crafted by hand</span>
            <span>auctioned with Mad Scientists 10k</span>
            <span>no random minting</span>
            <span>no duplicate editions</span>
          </div>
        </section>

        <section
          id="collection"
          className="relative border-b border-cosmic/25 px-6 py-12 md:px-12 md:py-16"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-cosmic/70">
              Collection Grid
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-[#f3ecff] md:text-4xl">
              The Cosmic Five
            </h2>
            <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-[#bdb8cc] md:text-base">
              Click any scientist to open their identity panel. Every artwork
              is a standalone 1/1 with its own lore, tone, and threat level to
              the known universe.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-5">
              {scientists.map((scientist) => (
                <GalleryCard
                  key={scientist.id}
                  scientist={scientist}
                  onClick={() => setSelected(scientist)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="auction" className="relative px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-[#7ed3ff]">
              Auction System
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-[#f3ecff] md:text-4xl">
              Bid Scientists to Win Scientists
            </h2>
            <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-[#bdb8cc] md:text-base">
              COSMIC is not sold with cash. You compete by bidding Mad
              Scientists from the 10k collection. Each 1/1 has a separate
              leaderboard and a separate winner.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {auctionSteps.map((item) => (
                <article
                  key={item.step}
                  className="border border-cosmic/30 bg-[linear-gradient(145deg,rgba(13,10,30,0.92),rgba(5,9,22,0.9))] p-5"
                >
                  <p className="font-display text-4xl leading-none text-cosmic/25">
                    {item.step}
                  </p>
                  <h3 className="mt-3 font-display text-sm uppercase tracking-[0.08em] text-[#f0e8ff] md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-[#aaa4bf] md:text-sm">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-display text-xl uppercase tracking-wide text-[#f1eaff] md:text-2xl">
                <ClearFive className="text-[#f1eaff]" /> Parallel Auctions
              </h3>
              <p className="mt-2 font-mono text-xs text-[#a8a3bd] md:text-sm">
                Live lane view: each 1/1 runs on its own timer and bid stack.
              </p>
              <div className="mt-4 space-y-3">
                {parallelAuctionStatus.map((auction) => {
                  const scientist = scientists.find((item) => item.id === auction.id);
                  if (!scientist) return null;

                  return (
                    <article
                      key={auction.id}
                      className="relative overflow-hidden border border-cosmic/30 bg-[linear-gradient(135deg,rgba(10,12,30,0.95),rgba(7,9,24,0.95))]"
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,#7ed3ff,#9b59f0,#ff73c7)]" />
                      <div className="grid items-center gap-4 p-3 sm:grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[72px_minmax(0,1fr)_220px] md:p-4">
                        <div className="relative h-[72px] w-[72px] overflow-hidden border border-cosmic/35">
                          <Image
                            src={scientist.src}
                            alt={scientist.name}
                            width={200}
                            height={200}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute left-1 top-1 border border-cosmic/45 bg-[#070819]/80 px-1.5 py-0.5 font-display text-[9px] uppercase tracking-[0.18em] text-cosmic/80">
                            1/1
                          </span>
                        </div>

                        <div>
                          <p className="flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.22em] text-[#7ed3ff]">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] bg-[#7ed3ff] opacity-75"></span>
                              <span className="relative inline-flex h-2 w-2 bg-[#7ed3ff]"></span>
                            </span>
                            {auction.lane}
                          </p>
                          <h4 className="mt-1 font-display text-sm uppercase tracking-[0.08em] text-[#f2ebff] md:text-base">
                            {scientist.name}
                          </h4>
                          <p className="mt-1 font-mono text-[11px] text-[#b0aac2] md:text-xs">
                            {auction.phase}
                          </p>
                          <div className="mt-2 h-1.5 w-full overflow-hidden bg-[#131931]">
                            <div
                              className="h-full bg-[linear-gradient(90deg,#7ed3ff,#9b59f0)]"
                              style={{ width: `${auction.activity}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-t border-cosmic/20 pt-3 text-left sm:col-span-2 md:col-span-1 md:border-t-0 md:pt-0 md:text-right">
                          <div className="md:text-left">
                            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-cosmic/65">
                              Leading Bid
                            </p>
                            <p className="mt-1 font-display text-xs uppercase tracking-[0.08em] text-[#f0eaff] md:text-sm">
                              {auction.leadingBid}
                            </p>
                          </div>
                          <div>
                            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-cosmic/65">
                              Countdown
                            </p>
                            <p className="mt-1 font-mono text-[11px] text-[#7ed3ff] md:text-xs">
                              {auction.opensIn}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="flex min-h-[220px] items-center justify-center border border-cosmic/30 bg-[radial-gradient(circle_at_20%_20%,rgba(126,211,255,0.18),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(255,122,217,0.2),transparent_42%),#080c1b] p-6 text-center">
                <p className="font-display text-lg uppercase tracking-[0.15em] text-cosmic/60">
                  Auction GIF Coming Soon
                </p>
              </div>
              <div className="flex flex-col justify-center gap-4 border border-cosmic/30 bg-[#090c1a] p-6 md:p-8">
                <p className="font-mono text-sm leading-relaxed text-[#c4bfd3] md:text-base">
                  Your current Mad Scientists become your leverage. The stronger
                  your bid, the stronger your claim on the 1/1 you target.
                </p>
                <Button
                  href="#"
                  variant="cosmic-primary"
                  size="lg"
                  theme="cosmic"
                  className="w-full md:w-fit"
                >
                  Enter The Auction
                </Button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Footer theme="cosmic" />

      {selected && (
        <ScientistModal
          scientist={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}
