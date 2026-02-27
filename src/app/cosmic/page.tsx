"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { silkscreen } from "@/lib/fonts";
import NavBar from "@/components/NavBar";
import Ticker from "@/components/Ticker";
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
    src: "/images/cosmic-1-halfbody-v3.png",
    fullSrc: "/images/cosmic-1-fullbody-v2.png",
    tagline: "Built the machine. Became the machine.",
    lore: "When the signal came, The Architect didn\u2019t hesitate. A broken system is just a blueprint waiting to be rewritten. Every wire, every circuit, every solution traces back to him. He walked through the portal because no one else could rebuild what was falling apart.",
  },
  {
    id: 2,
    name: "The Warlord",
    src: "/images/cosmic-2-halfbody-v2.png",
    fullSrc: "/images/cosmic-2-fullbody.png",
    tagline: "Didn\u2019t come to explore. Came to conquer.",
    lore: "The Warlord doesn\u2019t answer calls. He answers threats. When the signal hit, he saw what the others wouldn\u2019t admit. The Cosmos doesn\u2019t need a rescue team. It needs a weapon. The crimson crystal isn\u2019t decoration. It\u2019s the reason he was chosen.",
  },
  {
    id: 3,
    name: "The Oracle",
    src: "/images/cosmic-3-halfbody-v2.png",
    fullSrc: "/images/cosmic-3-fullbody.png",
    tagline: "Sees everything. Says nothing.",
    lore: "The Oracle saw the signal before it arrived. His mind broke through the dome a long time ago. Floating, exposed, receiving transmissions from places that don\u2019t have names yet. He walked through the portal in silence. He already knows how this ends.",
  },
  {
    id: 4,
    name: "The Antiquarian",
    src: "/images/cosmic-4-halfbody-v2.png",
    fullSrc: "/images/cosmic-4-fullbody.png",
    tagline: "Carried the old world into the new one.",
    lore: "While the others prepared for what\u2019s ahead, The Antiquarian packed what came before. Ancient tools, forgotten maps, knowledge that predates the lab itself. He walked through the portal because this isn\u2019t the first time the Cosmos has called. He knows how it went last time.",
  },
  {
    id: 5,
    name: "The Dreamer",
    src: "/images/cosmic-5-halfbody-v2.png",
    fullSrc: "/images/cosmic-5-fullbody-v2.png",
    tagline: "Closed eyes. Open universe.",
    lore: "The Dreamer never built a ship or drew a weapon. She just closed her eyes and was already there. The rainbow trail isn\u2019t exhaust. It\u2019s the residue of imagination meeting reality. She\u2019s the only one who didn\u2019t need the portal. She walked through it anyway. For them.",
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
    title: "Non-Winners Refunded",
    desc: "Didn\u2019t win? Your Scientists come back.",
  },
];

const parallelAuctionStatus = [
  { id: 1, lane: "Lane Alpha" },
  { id: 2, lane: "Lane Beta" },
  { id: 3, lane: "Lane Gamma" },
  { id: 4, lane: "Lane Delta" },
  { id: 5, lane: "Lane Omega" },
];



const HERO_IMAGE_SRC = "/images/cosmic-hero-2026-v4.png";
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
      data-layer="collection-card"
      onClick={onClick}
      className="group cursor-pointer text-center md:text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
    >
      <div data-layer="collection-card-image" className="relative overflow-hidden border border-cosmic bg-[#090b17] transition duration-300 group-hover:border-cosmic/70 group-hover:shadow-[0_10px_30px_rgba(155,89,240,0.2)]">
        <Image
          src={scientist.src}
          alt={scientist.name}
          width={500}
          height={500}
          sizes="(max-width: 639px) 84vw, (max-width: 767px) 62vw, (max-width: 1023px) 46vw, (max-width: 1279px) 36vw, 20vw"
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span data-layer="collection-card-badge" className="absolute left-3 top-3 z-10 border border-cosmic bg-[#070819]/80 px-2 py-1 font-display text-xs uppercase tracking-[0.14em] text-cosmic/75 md:text-xs md:tracking-[0.2em]" aria-label="One of one edition">
          1/1
        </span>
      </div>
      <p data-layer="collection-card-name" className="mt-2 font-display text-sm uppercase tracking-wider text-cosmic-text">
        {scientist.name}
      </p>
      <p data-layer="collection-card-tagline" className="mt-0.5 font-mono text-xs leading-relaxed text-cosmic-text-muted">
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

  // Preload adjacent fullbody images when a scientist is selected
  useEffect(() => {
    if (!selected) return;
    const idx = scientists.findIndex((s) => s.id === selected.id);
    const toPreload = [
      scientists[idx],
      scientists[(idx - 1 + scientists.length) % scientists.length],
      scientists[(idx + 1) % scientists.length],
    ];
    const imgs = toPreload.map((s) => {
      const img = new window.Image();
      img.src = s.fullSrc;
      return img;
    });
    return () => {
      imgs.forEach((img) => { img.src = ""; });
    };
  }, [selected]);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="main-content" className="min-h-screen scroll-smooth overflow-x-clip bg-[#04070f] text-cosmic-text">
      <NavBar theme="cosmic" />

      <section data-layer="page-wrapper" className="relative mx-auto max-w-[1440px] border-x border-cosmic">
        <div data-layer="bg-blobs" className="pointer-events-none absolute inset-0 hidden md:block">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.22) 0 1px, transparent 1px), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.15) 0 1px, transparent 1px)",
              backgroundSize: "190px 190px, 160px 160px",
            }}
          />
        </div>

        <Ticker variant="cosmic-top" />

        <section data-layer="hero" className="relative border-b border-cosmic">
          <div data-layer="hero-mobile-logo" className="flex justify-center border-b border-l border-r border-cosmic px-6 py-3 md:hidden">
            <Image
              src="/images/cosmic-logo.png"
              alt="COSMIC logo"
              width={480}
              height={160}
              className="h-[80px] w-auto"
            />
          </div>

          {/* Mobile: Stacked hero */}
          <div data-layer="hero-container" className="overflow-hidden border border-cosmic bg-[#050a16] shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:hidden">
            <div data-layer="hero-image" className="relative aspect-[16/9]">
              <Image
                src={HERO_IMAGE_SRC}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div data-layer="hero-mobile-content" className="border-t border-cosmic p-8 text-center">
              <h1 data-layer="hero-mobile-heading" className="font-display text-3xl uppercase leading-[0.9] tracking-wide text-cosmic-text">
                <ClearFive className="text-cosmic-cyan" /> Legends.
                <br />
                One Universe.
              </h1>
              <p data-layer="hero-mobile-body" className="mt-3 font-mono text-[13px] leading-relaxed text-cosmic-text-muted">
                The Cosmos sent a signal. Five answered.
                <br />
                Each 1/1 hand-crafted.
              </p>
              <div data-layer="hero-mobile-buttons" className="mt-4 flex flex-col items-center gap-3">
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
                  Enter the Auction
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop: Two-panel hero */}
          <div data-layer="hero-desktop" className="hidden md:flex md:flex-row-reverse">
            <div data-layer="hero-desktop-left" className="flex-1 border border-cosmic flex flex-col">
              <div className="flex flex-col gap-4 p-8 lg:p-10 flex-1 justify-center">
                <div className="border border-cosmic bg-[rgba(8,8,28,0.72)] p-2.5 w-fit">
                  <Image
                    src="/images/cosmic-logo.png"
                    alt="COSMIC logo"
                    width={360}
                    height={120}
                    className="h-auto w-[160px] lg:w-[190px]"
                  />
                </div>
                <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-wide text-cosmic-text lg:text-6xl">
                  <ClearFive className="text-cosmic-cyan" /> Legends.
                  <br />
                  One Universe.
                </h1>
                <p className="max-w-2xl font-mono text-sm leading-relaxed text-cosmic-text-muted lg:text-base">
                  The Cosmos sent a signal. Five answered.
                  <br />
                  Each 1/1 hand-crafted.
                </p>
                <div className="flex flex-col gap-3 mt-2 w-full">
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
                    Enter the Auction
                  </Button>
                </div>
              </div>
            </div>

            <div data-layer="hero-desktop-right" className="flex-[2] border border-cosmic overflow-hidden">
              <Image
                src={HERO_IMAGE_SRC}
                alt={HERO_IMAGE_ALT}
                width={1376}
                height={768}
                priority
                sizes="(max-width: 1440px) 66vw, 960px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </section>

        <Ticker variant="cosmic-bottom" />

        <section
          data-layer="collection"
          id="collection"
          className="relative border-b border-cosmic px-6 py-12 md:px-12 md:py-16"
        >
          <div className="mx-auto max-w-6xl">
            <p data-layer="collection-label" className="text-center font-display text-xs uppercase tracking-[0.22em] text-cosmic/70 md:text-left">
              The Five
            </p>
            <h2 data-layer="collection-heading" className="mt-3 text-center font-display text-3xl uppercase tracking-wide text-cosmic-text md:text-left md:text-4xl">
              Who Answered the Call
            </h2>
            <p data-layer="collection-body" className="mt-4 max-w-3xl text-center font-mono text-sm leading-relaxed text-cosmic-text-muted md:text-left md:text-base">
              Each one walked through the portal for their unique truth.
            </p>

            <div data-layer="collection-grid" className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
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

        <section data-layer="auction" id="auction" className="relative px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p data-layer="auction-label" className="text-center font-display text-xs uppercase tracking-[0.22em] text-cosmic-cyan md:text-left">
              Your Move
            </p>
            <h2 data-layer="auction-heading" className="mt-3 text-center font-display text-3xl uppercase tracking-wide text-cosmic-text md:text-left md:text-4xl">
              Send Your Scientists. Claim the Five.
            </h2>
            <p data-layer="auction-body" className="mt-4 max-w-3xl text-center font-mono text-sm leading-relaxed text-cosmic-text-muted md:text-left md:text-base">
              The Cosmos called them. Now bid yours to bring one home.
              Highest stack wins. Didn&apos;t win? Your Scientists come back.
            </p>

            <div data-layer="auction-steps" className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {auctionSteps.map((item, i) => (
                <article
                  key={item.step}
                  className="flex border border-cosmic bg-[linear-gradient(145deg,rgba(13,10,30,0.92),rgba(5,9,22,0.9))] overflow-hidden"
                >
                  <div className="w-[120px] shrink-0 border-r border-cosmic/20 bg-cosmic-bg-light md:w-[150px]">
                    <AuctionProcessSvg panel={i + 1} />
                  </div>
                  <div className="flex-1 p-4 md:p-5">
                    <p className="font-display text-3xl leading-none text-cosmic md:text-4xl">
                      {item.step}
                    </p>
                    <h3 className="mt-3 font-display text-sm uppercase tracking-[0.08em] text-cosmic-text md:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-cosmic-text-dim md:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div data-layer="auction-cta" className="mt-8 flex flex-col border border-cosmic bg-cosmic-bg md:flex-row">
                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                  <p data-layer="auction-cta-text" className="text-center font-mono text-sm leading-relaxed text-cosmic-text-muted md:text-left md:text-base">
                    Bid your Scientists. Claim a Cosmic.
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
                <div
                  data-layer="auction-stargaze"
                  className="flex items-center gap-3 border-t border-cosmic/40 px-6 py-4 md:w-[200px] md:shrink-0 md:flex-col md:items-center md:justify-center md:gap-2 md:border-l md:border-t-0 md:px-8 md:py-6 md:text-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cosmic-text-dimmer md:order-first">
                    Powered by
                  </p>
                  <Image
                    src="/images/stargaze-chain.svg"
                    alt="Stargaze"
                    width={40}
                    height={40}
                    className="hidden shrink-0 md:block"
                  />
                  <Image
                    src="/images/stargaze-chain.svg"
                    alt="Stargaze"
                    width={24}
                    height={24}
                    className="shrink-0 md:hidden"
                  />
                  <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-cosmic-text">
                    Stargaze
                  </p>
                  <p className="hidden font-mono text-[10px] text-cosmic-text-muted md:block">
                    Auction Partner
                  </p>
                </div>
            </div>

            <div data-layer="auction-lanes-wrapper" className="mt-12 md:mt-16">
              <h3 data-layer="auction-lanes-heading" className="font-display text-xl uppercase tracking-wide text-cosmic-text md:text-2xl">
                <ClearFive className="text-cosmic-text" /> Parallel Auctions
              </h3>
              <p data-layer="auction-lanes-body" className="mt-2 font-mono text-xs text-cosmic-text-dim md:text-sm">
                All 5 run at once. Pick your lane. Watch the bids stack up.
              </p>
              <div data-layer="auction-lanes" className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
                {parallelAuctionStatus.map((auction, i) => {
                  const scientist = scientists.find(
                    (item) => item.id === auction.id,
                  );
                  if (!scientist) return null;

                  return (
                    <article
                      key={auction.id}
                      className={`relative overflow-hidden border border-cosmic/40 bg-[linear-gradient(145deg,rgba(13,10,30,0.92),rgba(5,9,22,0.9))] p-3 md:p-4${
                        i === 4
                          ? " col-span-2 mx-auto w-[calc(50%-6px)] md:col-span-1 md:w-full"
                          : ""
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[#2a2740]" />

                      <div className="flex items-center gap-2.5">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden border border-cosmic grayscale-[40%] opacity-70">
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
                          <p className="flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
                            <span className="inline-flex h-1.5 w-1.5 shrink-0 bg-cosmic-text-dimmer" />
                            {auction.lane}
                          </p>
                          <h4 className="mt-0.5 truncate font-display text-xs uppercase tracking-[0.06em] text-cosmic-text-muted md:text-sm">
                            {scientist.name}
                          </h4>
                        </div>
                      </div>

                      <div className="mt-3 h-1 w-full overflow-hidden bg-[#131931]">
                        <div className="h-full w-0 bg-[#2a2740]" />
                      </div>

                      <p className="mt-3 font-display text-[10px] uppercase tracking-[0.12em] text-cosmic-text-dimmer md:text-xs">
                        Sealed
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-cosmic-text-dimmer md:text-[11px]">
                        Opens soon
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </section>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex min-w-[44px] min-h-[44px] items-center justify-center border border-cosmic bg-cosmic-bg/90 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic backdrop-blur-sm"
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
