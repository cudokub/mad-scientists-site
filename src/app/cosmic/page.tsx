"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Silkscreen } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import type { Scientist } from "@/components/cosmic/ScientistModal";
import AuctionProcessSvg from "@/components/cosmic/AuctionProcessSvg";

const ScientistModal = dynamic(
  () => import("@/components/cosmic/ScientistModal"),
  { ssr: false },
);

const scientists: Scientist[] = [
  {
    id: 1,
    name: "The Architect",
    src: "/images/cosmic-1-halfbody-v2.png",
    fullSrc: "/images/cosmic-1-fullbody.png",
    tagline: "Built the machine. Became the machine.",
    lore: "The Architect doesn\u2019t explore the cosmos. He engineers it. Every wire, every circuit, every system traces back to his blueprint. While others look up at the stars, he\u2019s already building what comes next.",
  },
  {
    id: 2,
    name: "The Warlord",
    src: "/images/cosmic-2-halfbody-v2.png",
    fullSrc: "/images/cosmic-2-fullbody.png",
    tagline: "Didn\u2019t come to explore. Came to conquer.",
    lore: "The Warlord was never interested in discovery. Where others saw the unknown, he saw unclaimed territory. The crimson crystal isn\u2019t decoration. It\u2019s the last thing you see before the cosmos becomes his.",
  },
  {
    id: 3,
    name: "The Oracle",
    src: "/images/cosmic-3-halfbody-v2.png",
    fullSrc: "/images/cosmic-3-fullbody.png",
    tagline: "Sees everything. Says nothing.",
    lore: "The Oracle\u2019s mind broke through the dome a long time ago. Now it floats, exposed, receiving signals from places that don\u2019t have names yet. He doesn\u2019t speak because language is too slow for what he knows.",
  },
  {
    id: 4,
    name: "The Antiquarian",
    src: "/images/cosmic-4-halfbody-v2.png",
    fullSrc: "/images/cosmic-4-fullbody.png",
    tagline: "Carried the old world into the new one.",
    lore: "While everyone else raced toward the future, The Antiquarian packed the past. Ancient tools, forgotten maps, knowledge that predates the lab itself. Turns out the cosmos has been explored before. You just need to know where to look.",
  },
  {
    id: 5,
    name: "The Dreamer",
    src: "/images/cosmic-5-halfbody-v2.png",
    fullSrc: "/images/cosmic-5-fullbody.png",
    tagline: "Closed eyes. Open universe.",
    lore: "The Dreamer never built a ship or drew a weapon. She just closed her eyes and was already there. The rainbow trail isn\u2019t exhaust. It\u2019s the residue of imagination meeting reality. She\u2019s the only one who went willingly, and the only one who might not come back.",
  },
];

const auctionSteps = [
  {
    step: "01",
    title: "Pick Your Target",
    desc: "Each COSMIC 1/1 has its own auction.",
  },
  {
    step: "02",
    title: "Stack Your Bid",
    desc: "Stack Mad Scientists from the 10k. No minimum.",
  },
  {
    step: "03",
    title: "Top Bid Wins",
    desc: "Highest stack wins. One winner per scientist.",
  },
  {
    step: "04",
    title: "Losers Get Refunded",
    desc: "Didn\u2019t win? Your Scientists come back.",
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

const HERO_IMAGE_SRC = "/images/cosmic-hero-2026.png";
const HERO_IMAGE_ALT = "Mad Scientists cosmic lab lineup";

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
      className="group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed3ff]"
    >
      <div className="relative overflow-hidden border border-cosmic/45 bg-[#090b17] transition duration-300 group-hover:border-[#7ed3ff]/70 group-hover:shadow-[0_10px_30px_rgba(35,158,255,0.2)]">
        <Image
          src={scientist.src}
          alt={scientist.name}
          width={500}
          height={500}
          sizes="(max-width: 639px) 84vw, (max-width: 767px) 62vw, (max-width: 1023px) 46vw, (max-width: 1279px) 36vw, 20vw"
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 z-10 border border-cosmic/40 bg-[#070819]/80 px-2 py-1 font-display text-xs uppercase tracking-[0.14em] text-cosmic/75 md:text-[10px] md:tracking-[0.2em]">
          1/1
        </span>
      </div>
      <p className="mt-2 font-display text-sm uppercase tracking-wider text-[#f3edff]">
        {scientist.name}
      </p>
      <p className="mt-0.5 font-mono text-xs leading-relaxed text-[#9e99b0]">
        {scientist.tagline}
      </p>
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
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="main-content" className="min-h-screen scroll-smooth overflow-x-clip bg-[#04070f] text-[#e7e4ef]">
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
          <div className="mb-3 flex justify-center md:hidden">
            <div className="inline-flex border border-cosmic/35 bg-[#0a1021]/80 px-3 py-2">
              <Image
                src="/images/cosmic-logo.png"
                alt="COSMIC logo"
                width={260}
                height={86}
                className="h-auto w-[122px]"
              />
            </div>
          </div>

          <div className="overflow-hidden border border-cosmic/40 bg-[#050a16] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[16/9]">
              <Image
                src={HERO_IMAGE_SRC}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1400px"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 hidden border border-cosmic/40 bg-[rgba(8,8,28,0.72)] p-2.5 md:block lg:left-6 lg:top-6">
                <Image
                  src="/images/cosmic-logo.png"
                  alt="COSMIC logo"
                  width={360}
                  height={120}
                  className="h-auto w-[160px] lg:w-[190px]"
                />
              </div>

              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 border border-cosmic/40 bg-[rgba(6,10,26,0.78)] px-3 py-1.5 md:bottom-4">
                <p className="font-display text-[10px] uppercase tracking-[0.18em] text-[#9fe5ff]">
                  Scroll Down
                </p>
                <p className="text-center font-display text-xs text-[#f3ecff] animate-[scrollPulse_1.2s_ease-in-out_infinite]">
                  v
                </p>
              </div>
            </div>

            <div className="border-t border-cosmic/25 p-4 md:hidden">
              <p className="font-display text-xs uppercase tracking-[0.14em] text-[#7ed3ff]">
                Transmission Incoming // COSMIC Division
              </p>
              <h1 className="mt-2 font-display text-3xl uppercase leading-[0.9] tracking-wide text-[#f3ecff]">
                <ClearFive className="text-[#7ed3ff]" /> Freaks.
                <br />
                One Universe.
              </h1>
              <p className="mt-3 font-mono text-[13px] leading-relaxed text-[#c9c5d8]">
                5 hand-built 1/1s. Bid your Mad Scientists to claim one.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  href="#collection"
                  variant="cosmic-primary"
                  size="lg"
                  theme="cosmic"
                  className="w-full"
                >
                  See the Five
                </Button>
                <Button
                  href="#auction"
                  variant="ghost"
                  size="lg"
                  theme="cosmic"
                  className="w-full"
                >
                  How Bidding Works
                </Button>
              </div>
            </div>

            <div className="hidden border-t border-cosmic/25 p-6 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-6 lg:p-8">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-[#7ed3ff]">
                  Transmission Incoming // COSMIC Division
                </p>
                <h1 className="mt-2 font-display text-5xl uppercase leading-[0.9] tracking-wide text-[#f3ecff] lg:text-6xl">
                  <ClearFive className="text-[#7ed3ff]" /> Freaks.
                  <br />
                  One Universe.
                </h1>
                <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-[#c9c5d8] lg:text-base">
                  5 hand-built 1/1s. Bid your Mad Scientists to claim one.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    href="#collection"
                    variant="cosmic-primary"
                    size="lg"
                    theme="cosmic"
                  >
                    See the Five
                  </Button>
                  <Button
                    href="#auction"
                    variant="ghost"
                    size="lg"
                    theme="cosmic"
                  >
                    How Bidding Works
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 self-start">
                {[
                  { label: "Artifacts", value: "5 x 1/1" },
                  { label: "Mint Type", value: "Hand-Crafted" },
                  { label: "Acquisition", value: "Auction" },
                  { label: "Bid Asset", value: "Mad 10k NFTs" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-cosmic/25 bg-[#0a0c1d] p-4"
                  >
                    <p className="font-display text-[10px] uppercase tracking-[0.2em] text-cosmic/65">
                      {item.label}
                    </p>
                    <p className="mt-1 font-display text-base uppercase tracking-wide text-[#f6f1ff]">
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
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
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
                <p className="font-display text-xs uppercase tracking-[0.14em] text-cosmic/65 md:text-[10px] md:tracking-[0.2em]">
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

        <section className="relative border-b border-cosmic/25 bg-[linear-gradient(90deg,rgba(126,211,255,0.08),rgba(155,89,240,0.07),rgba(255,115,199,0.08))] px-4 py-4 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-xs uppercase tracking-[0.12em] text-[#d8d2ec] md:gap-x-6 md:text-xs md:tracking-[0.18em]">
            <span>
              <ClearFive className="text-[#d8d2ec]" /> subjects escaped the
              lab
            </span>
            <span>each one is irreplaceable</span>
            <span>bid your 10k to claim them</span>
            <span>no duplicates exist</span>
            <span>retrieval is not optional</span>
          </div>
        </section>

        <section
          id="collection"
          className="relative border-b border-cosmic/25 px-6 py-12 md:px-12 md:py-16"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-cosmic/70">
              The Subjects
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-[#f3ecff] md:text-4xl">
              Meet the Cosmic Five
            </h2>
            <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-[#bdb8cc] md:text-base">
              Each one is a standalone 1/1. Tap to learn more.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
              {scientists.map((scientist, i) => (
                <div
                  key={scientist.id}
                  className={
                    i === 4
                      ? "col-span-2 mx-auto w-[calc(50%-6px)] md:col-span-1 md:w-full"
                      : ""
                  }
                >
                  <GalleryCard
                    scientist={scientist}
                    onClick={() => setSelected(scientist)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="auction" className="relative px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-[#7ed3ff]">
              The Experiment
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-[#f3ecff] md:text-4xl">
              Bid Scientists. Win Cosmic.
            </h2>
            <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-[#bdb8cc] md:text-base">
              Bid Mad Scientists from the 10k collection. Highest stack
              wins. Losers get refunded.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 max-[359px]:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
              {auctionSteps.map((item) => (
                <article
                  key={item.step}
                  className="border border-cosmic/30 bg-[linear-gradient(145deg,rgba(13,10,30,0.92),rgba(5,9,22,0.9))] p-4 md:p-5"
                >
                  <p className="font-display text-3xl leading-none text-cosmic/25 md:text-4xl">
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
                All 5 run at once. Pick your lane. Watch the bids stack up.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
                {parallelAuctionStatus.map((auction, i) => {
                  const scientist = scientists.find(
                    (item) => item.id === auction.id,
                  );
                  if (!scientist) return null;

                  return (
                    <article
                      key={auction.id}
                      className={`relative overflow-hidden border border-cosmic/30 bg-[linear-gradient(145deg,rgba(13,10,30,0.92),rgba(5,9,22,0.9))] p-3 md:p-4${
                        i === 4
                          ? " col-span-2 mx-auto w-[calc(50%-6px)] md:col-span-1 md:w-full"
                          : ""
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,#7ed3ff,#9b59f0,#ff73c7)]" />

                      <div className="flex items-center gap-2.5">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden border border-cosmic/35">
                          <Image
                            src={scientist.src}
                            alt={scientist.name}
                            width={72}
                            height={72}
                            sizes="36px"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.16em] text-[#7ed3ff]">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] bg-[#7ed3ff] opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 bg-[#7ed3ff]" />
                            </span>
                            {auction.lane}
                          </p>
                          <h4 className="mt-0.5 truncate font-display text-xs uppercase tracking-[0.06em] text-[#f2ebff] md:text-sm">
                            {scientist.name}
                          </h4>
                        </div>
                      </div>

                      <div className="mt-3 h-1 w-full overflow-hidden bg-[#131931]">
                        <div
                          className="h-full bg-[linear-gradient(90deg,#7ed3ff,#9b59f0)]"
                          style={{ width: `${auction.activity}%` }}
                        />
                      </div>

                      <div className="mt-3 flex items-baseline justify-between gap-2">
                        <span className="font-display text-[10px] uppercase tracking-[0.08em] text-[#f0eaff] md:text-xs">
                          {auction.leadingBid}
                        </span>
                      </div>

                      <p className="mt-1 font-mono text-[10px] text-[#7ed3ff] md:text-[11px]">
                        {auction.opensIn}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="border border-cosmic/30 bg-[#080c1b] p-4 md:p-6" role="img" aria-label="Auction process: Pick your lane, stack your bid, highest stack wins, losers get refunded">
                <AuctionProcessSvg />
              </div>
              <div className="flex flex-col justify-center gap-4 border border-cosmic/30 bg-[#090c1a] p-6 md:p-8">
                <p className="font-mono text-sm leading-relaxed text-[#c4bfd3] md:text-base">
                  Bid your 10k Scientists. Claim a COSMIC 1/1.
                </p>
                <Button
                  href="#"
                  variant="cosmic-primary"
                  size="lg"
                  theme="cosmic"
                  className="w-full md:w-fit"
                >
                  Place Your Bid
                </Button>
              </div>
            </div>
          </div>
        </section>
      </section>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center border border-cosmic/40 bg-[#09081a]/90 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic backdrop-blur-sm"
          aria-label="Back to top"
        >
          &uarr;
        </button>
      )}

      <Footer theme="cosmic" />

      {selected && (
        <ScientistModal
          scientist={selected}
          onClose={() => setSelected(null)}
          onPrev={() => {
            const idx = scientists.findIndex((s) => s.id === selected.id);
            setSelected(scientists[(idx - 1 + scientists.length) % scientists.length]);
          }}
          onNext={() => {
            const idx = scientists.findIndex((s) => s.id === selected.id);
            setSelected(scientists[(idx + 1) % scientists.length]);
          }}
        />
      )}
    </main>
  );
}
