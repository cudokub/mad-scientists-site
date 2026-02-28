"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import AuctionCard from "@/components/cosmic/auction/AuctionCard";
import ActivityFeed from "@/components/cosmic/auction/ActivityFeed";
import UserBidsDashboard from "@/components/cosmic/auction/UserBidsDashboard";
import AuctionRules from "@/components/cosmic/auction/AuctionRules";
import type { Auction, UserAuctionState } from "@/lib/auction/types";
import { fetchAuctions, fetchUserState } from "@/lib/auction/api";

const AuctionDetailModal = dynamic(
  () => import("@/components/cosmic/auction/AuctionDetailModal"),
  { ssr: false },
);

const POLL_INTERVAL = 15_000;

export default function AuctionOverviewPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [userState, setUserState] = useState<UserAuctionState>({
    connected: false,
    address: null,
    ownedNfts: [],
    currentBids: {},
  });

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

  const handleConnect = async () => {
    const state = await fetchUserState(true);
    setUserState(state);
  };

  const handleDisconnect = async () => {
    const state = await fetchUserState(false);
    setUserState(state);
  };

  const handleBidComplete = () => {
    load();
  };

  return (
    <main id="main-content" className="min-h-screen scroll-smooth bg-[#04070f] text-cosmic-text">
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
              <Button
                variant="ghost"
                theme="cosmic"
                size="sm"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
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
                <AuctionCard
                  auction={auction}
                  onClick={() => setSelectedSlug(auction.scientist.slug)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Your Bids Dashboard — only when connected */}
        {!loading && (
          <div className="border-b border-cosmic p-6 md:p-8">
            <UserBidsDashboard
              auctions={auctions}
              userState={userState}
              onSelectAuction={setSelectedSlug}
              onConnect={handleConnect}
            />
          </div>
        )}

        {/* Live Activity Feed */}
        {!loading && (
          <div className="border-b border-cosmic p-6 md:p-8">
            <ActivityFeed auctions={auctions} />
          </div>
        )}

        {/* Quick Rules */}
        <div id="how-it-works" className="border-b border-cosmic p-6 md:p-8 scroll-mt-4">
          <AuctionRules />
        </div>
      </section>

      <Footer theme="cosmic" />

      {selectedSlug && (
        <AuctionDetailModal
          auctions={auctions}
          selectedSlug={selectedSlug}
          userState={userState}
          onClose={() => setSelectedSlug(null)}
          onNavigate={setSelectedSlug}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onBidComplete={handleBidComplete}
        />
      )}
    </main>
  );
}
