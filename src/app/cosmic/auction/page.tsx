"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import AuctionCard from "@/components/cosmic/auction/AuctionCard";
import type { Auction } from "@/lib/auction/types";
import { fetchAuctions } from "@/lib/auction/api";

const POLL_INTERVAL = 15_000;

export default function AuctionOverviewPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const data = await fetchAuctions();
    setAuctions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [load]);

  return (
    <main id="main-content" className="min-h-screen bg-[#04070f] text-cosmic-text">
      <NavBar theme="cosmic" />

      <section className="mx-auto max-w-[1440px] border-x border-cosmic">
        <div className="border-b border-cosmic p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Link
                href="/cosmic"
                className="font-mono text-xs text-cosmic-text-dimmer transition-colors hover:text-cosmic-cyan"
              >
                &larr; Back to COSMIC
              </Link>
              <p className="mt-3 font-display text-xs uppercase tracking-[0.22em] text-cosmic-cyan">
                Live Auctions
              </p>
              <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-cosmic-text md:text-4xl lg:text-5xl">
                Claim Your Cosmic
              </h1>
              <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-cosmic-text-muted md:text-base">
                5 parallel auctions. Bid your Mad Scientists to win a legendary 1/1.
                Pick your lane. Stack your bid. Highest stack wins.
              </p>
            </div>
            <div className="shrink-0">
              <Button href="/cosmic#auction" variant="ghost" theme="cosmic" size="sm">
                How It Works
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center border-b border-cosmic p-16">
            <p className="animate-pulse font-display text-sm uppercase tracking-wider text-cosmic-text-dimmer">
              Loading auctions...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-0 border-b border-cosmic sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {auctions.map((auction, i) => (
              <div
                key={auction.id}
                className={
                  i === 4
                    ? "col-span-1 sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:w-full xl:col-span-1"
                    : ""
                }
              >
                <AuctionCard auction={auction} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer theme="cosmic" />
    </main>
  );
}
