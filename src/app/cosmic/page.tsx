"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

function ScientistModal({
  scientist,
  onClose,
}: {
  scientist: Scientist;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#061304]/90 backdrop-blur-sm" />

      {/* Modal — side-by-side on desktop, stacked on mobile */}
      <div
        className="relative border border-cosmic bg-[#0a0618] max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center font-display text-cosmic/60 hover:text-cosmic transition-colors text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Art — 60% on desktop */}
        <div className="md:w-[60%] shrink-0 border-b md:border-b-0 md:border-r border-cosmic/30">
          <Image
            src={scientist.src}
            alt={scientist.name}
            width={800}
            height={800}
            className="w-full h-auto"
          />
        </div>

        {/* Info — right panel */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-5">
          <div>
            <p className="font-display text-xs text-cosmic/40 tracking-wider uppercase mb-2">
              1/1 · COSMIC EDITION
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-cosmic tracking-wider uppercase">
              {scientist.name}
            </h3>
          </div>

          <div className="border-t border-cosmic/20 pt-5">
            <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed italic">
              &ldquo;{scientist.tagline}&rdquo;
            </p>
          </div>

          <div className="pt-3">
            <p className="font-mono text-[#8E8E8E] text-sm md:text-base leading-relaxed">
              {scientist.lore}
            </p>
          </div>

          <div className="border-t border-cosmic/20 pt-5 mt-auto">
            <p className="font-display text-xs text-cosmic/30 tracking-wider uppercase">
              COSMIC / Mad Scientists Collection
            </p>
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
      className="border border-cosmic cosmic-glow overflow-hidden group relative text-left cursor-pointer"
    >
      <Image
        src={scientist.src}
        alt={scientist.name}
        width={500}
        height={500}
        className="w-full h-auto"
      />
      <div className="absolute inset-x-0 bottom-0 bg-[rgba(10,6,24,0.85)] py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-display text-sm md:text-base text-cosmic tracking-wider text-center uppercase">
          {scientist.name}
        </p>
      </div>
    </button>
  );
}

export default function CosmicPage() {
  const [selected, setSelected] = useState<Scientist | null>(null);

  return (
    <main className="min-h-screen overflow-hidden">
      <NavBar />

      <section className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <div
          className="border border-cosmic p-8 md:p-12 flex flex-col items-center gap-6"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0a0618 50%, #061304 100%)",
          }}
        >
          <Image
            src="/images/cosmic-logo.png"
            alt="COSMIC Mad Scientists"
            width={600}
            height={200}
            className="w-[280px] md:w-[420px] lg:w-[520px] h-auto"
            priority
          />
          <p className="font-display text-lg md:text-2xl text-cosmic tracking-wider uppercase">
            5 Scientists. Infinite Universe.
          </p>
        </div>

        {/* Gallery */}
        <div className="border border-cosmic p-6 md:p-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-cosmic tracking-wider mb-4 text-center">
            THE COLLECTION
          </h3>
          <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-6">
            5 hand-crafted 1/1s. Not generative. Not random. Each one is a
            standalone work of pixel art, pushing the Mad Scientists universe
            further than it&apos;s ever gone.
          </p>
          <p className="font-display text-sm text-cosmic/60 tracking-wider uppercase text-center mb-6">
            Everything is an Experiment — Even the Cosmos
          </p>

          {/* Top row: 3 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {scientists.slice(0, 3).map((s) => (
              <GalleryCard
                key={s.id}
                scientist={s}
                onClick={() => setSelected(s)}
              />
            ))}
          </div>

          {/* Bottom row: 2 centered */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
            <div className="hidden md:block" />
            {scientists.slice(3, 5).map((s) => (
              <GalleryCard
                key={s.id}
                scientist={s}
                onClick={() => setSelected(s)}
              />
            ))}
          </div>
        </div>

        {/* Auction */}
        <div className="border border-cosmic p-6 md:p-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-cosmic tracking-wider mb-4 text-center">
            THE AUCTION
          </h3>
          <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-8">
            COSMIC isn&apos;t bought with cash or coins. To claim a 1/1, you
            bid with your Mad Scientists from the 10k collection. The highest
            bidder wins.
          </p>

          {/* How it works */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              { step: "01", title: "PICK YOUR TARGET", desc: "Choose which COSMIC scientist you want to claim." },
              { step: "02", title: "BID YOUR SCIENTISTS", desc: "Transfer your Mad Scientists 10k NFTs as your bid. No minimum." },
              { step: "03", title: "HIGHEST BID WINS", desc: "When the auction closes, the highest bidder claims the 1/1." },
              { step: "04", title: "LOSERS RETURNED", desc: "Didn\u2019t win? Your Mad Scientists are sent back to you." },
            ].map((item) => (
              <div
                key={item.step}
                className="border border-cosmic/30 p-4 md:p-5 flex flex-col gap-2"
              >
                <span className="font-display text-3xl md:text-4xl font-bold text-cosmic/20">
                  {item.step}
                </span>
                <h4 className="font-display text-sm md:text-base font-bold text-cosmic tracking-wider">
                  {item.title}
                </h4>
                <p className="font-mono text-[#8E8E8E] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Auction slots — one per scientist */}
          <h4 className="font-display text-lg md:text-xl font-bold text-cosmic tracking-wider mb-4 text-center">
            5 AUCTIONS. 5 SCIENTISTS.
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
            {scientists.map((s) => (
              <div key={s.id} className="border border-cosmic/30 overflow-hidden">
                <Image
                  src={s.src}
                  alt={s.name}
                  width={300}
                  height={300}
                  className="w-full h-auto"
                />
                <div className="p-2 md:p-3 bg-[#0a0618]">
                  <p className="font-display text-xs md:text-sm text-cosmic tracking-wider text-center uppercase">
                    {s.name}
                  </p>
                  {/* TODO: Replace with live auction status/link */}
                  <p className="font-mono text-[10px] md:text-xs text-[#8E8E8E] text-center mt-1">
                    Auction opens soon
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* GIF + CTA */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* GIF placeholder */}
            <div className="md:w-[45%] border border-cosmic/30 overflow-hidden flex items-center justify-center bg-[#0a0618] min-h-[200px] md:min-h-[280px]">
              {/* TODO: Replace with auction GIF when ready */}
              {/* <Image src="/images/cosmic-auction.gif" alt="COSMIC Auction" width={600} height={600} unoptimized className="w-full h-full object-cover" /> */}
              <p className="font-display text-lg text-cosmic/40 tracking-wider uppercase">
                GIF COMING SOON
              </p>
            </div>

            {/* CTA panel */}
            <div className="flex-1 border border-cosmic/30 p-6 md:p-8 flex flex-col gap-4 items-center md:items-start justify-center bg-[#0a0618]">
              <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed text-center md:text-left">
                Your Scientists built the lab. Now they&apos;re your ticket to
                the cosmos.
              </p>
              {/* TODO: Update href when auction goes live */}
              <Button
                href="#"
                variant="secondary"
                size="lg"
                className="border-cosmic text-cosmic bg-[rgba(155,89,240,0.12)] hover:bg-[rgba(155,89,240,0.2)]"
              >
                ENTER THE AUCTION
              </Button>
            </div>
          </div>
        </div>

      </section>

      <Footer />

      {/* Scientist detail modal */}
      {selected && (
        <ScientistModal
          scientist={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}
