"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { silkscreen } from "@/lib/fonts";
import NavBar from "@/components/NavBar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { AUCTION_SCIENTISTS } from "@/lib/auction/constants";
import type { AuctionScientist } from "@/lib/auction/types";

const ScientistModal = dynamic(
  () => import("@/components/cosmic/ScientistModal"),
  { ssr: false },
);

const scientists = AUCTION_SCIENTISTS;

const HERO_IMAGE_SRC = "/images/cosmic-hero-2026-v4.png";
const HERO_IMAGE_ALT = "Mad Scientists cosmic lab lineup";

const COSMIC_MARKETPLACE_URL =
  "https://stargaze.zone/m/cosmos1szgwggzmxsda8na7pm0t74ypngv8qqzj0dqerazm2xe8432vymmqzyahh9";

function GalleryCard({
  scientist,
  onClick,
}: {
  scientist: AuctionScientist;
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
  const [selected, setSelected] = useState<AuctionScientist | null>(null);
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
                <ClearFive className="text-cosmic-cyan" /> Cosmics.
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
                  href={COSMIC_MARKETPLACE_URL}
                  variant="cosmic-primary"
                  size="lg"
                  theme="cosmic"
                  className="w-full"
                >
                  Buy on Stargaze
                </Button>
                <Button
                  href="#collection"
                  variant="ghost"
                  size="lg"
                  theme="cosmic"
                  className="w-full"
                >
                  See the Five
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
                  <ClearFive className="text-cosmic-cyan" /> Cosmics.
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
                    href={COSMIC_MARKETPLACE_URL}
                    variant="cosmic-primary"
                    size="lg"
                    theme="cosmic"
                  >
                    Buy on Stargaze
                  </Button>
                  <Button
                    href="#collection"
                    variant="ghost"
                    size="lg"
                    theme="cosmic"
                  >
                    See the Five
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

        <section data-layer="credits" className="relative px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl border border-cosmic bg-cosmic-bg p-6 md:p-8">
            <p
              data-layer="credits-label"
              className="text-center font-display text-xs uppercase tracking-[0.22em] text-cosmic/70"
            >
              Credits
            </p>

            <p
              data-layer="credits-body"
              className="mt-4 text-center font-mono text-sm leading-relaxed text-cosmic-text-muted md:text-base"
            >
              The 5 Cosmics were released as 1/1 auctions in April 2026. They
              live on{" "}
              <a
                href={COSMIC_MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cosmic-cyan-light underline transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
              >
                Stargaze
              </a>
              .
            </p>

            <div
              data-layer="credits-trendy"
              className="mt-6 flex items-center justify-center gap-3 border-t border-cosmic/40 pt-6 md:gap-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cosmic-text-dimmer md:text-xs">
                Built with
              </span>
              <Image
                src="/images/trendy-logo.webp"
                alt="Trendy"
                width={28}
                height={28}
                className="shrink-0 border border-cosmic/60"
              />
              <span className="font-display text-sm font-bold uppercase tracking-[0.08em] text-cosmic-text">
                Trendy
              </span>
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
