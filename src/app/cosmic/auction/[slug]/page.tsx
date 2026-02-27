"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import CountdownTimer from "@/components/cosmic/auction/CountdownTimer";
import AuctionStatusBadge from "@/components/cosmic/auction/AuctionStatusBadge";
import BidHistoryTable from "@/components/cosmic/auction/BidHistoryTable";
import WalletConnectButton from "@/components/cosmic/auction/WalletConnectButton";
import type { Auction, UserAuctionState } from "@/lib/auction/types";
import { AUCTION_SCIENTISTS, SLUG_TO_SCIENTIST } from "@/lib/auction/constants";
import { fetchAuction, fetchUserState } from "@/lib/auction/api";

const BidPlacementFlow = dynamic(
  () => import("@/components/cosmic/auction/BidPlacementFlow"),
  { ssr: false },
);

const POLL_INTERVAL = 15_000;

function getAdjacentSlugs(slug: string) {
  const idx = AUCTION_SCIENTISTS.findIndex((s) => s.slug === slug);
  const prev =
    AUCTION_SCIENTISTS[(idx - 1 + AUCTION_SCIENTISTS.length) % AUCTION_SCIENTISTS.length];
  const next =
    AUCTION_SCIENTISTS[(idx + 1) % AUCTION_SCIENTISTS.length];
  return { prev, next };
}

export default function AuctionDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const scientist = SLUG_TO_SCIENTIST[slug];

  const [auction, setAuction] = useState<Auction | null>(null);
  const [userState, setUserState] = useState<UserAuctionState>({
    connected: false,
    address: null,
    ownedNfts: [],
    currentBids: {},
  });
  const [loading, setLoading] = useState(true);
  const [bidFlowOpen, setBidFlowOpen] = useState(false);

  const load = useCallback(async () => {
    const data = await fetchAuction(slug);
    if (data) setAuction(data);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [load]);

  if (!scientist) {
    notFound();
  }

  const { prev, next } = getAdjacentSlugs(slug);
  const userBid = auction ? userState.currentBids[auction.id] : null;

  const handleConnect = async () => {
    const state = await fetchUserState(true);
    setUserState(state);
  };

  const handleDisconnect = async () => {
    const state = await fetchUserState(false);
    setUserState(state);
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#04070f] text-cosmic-text">
      <NavBar theme="cosmic" />

      <section className="mx-auto max-w-[1440px] border-x border-cosmic">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 border-b border-cosmic px-6 py-3">
          <Link
            href="/cosmic/auction"
            className="font-mono text-xs text-cosmic-text-dimmer transition-colors hover:text-cosmic-cyan"
          >
            &larr; All Auctions
          </Link>
          <span className="text-cosmic-text-dimmer">/</span>
          <span className="font-display text-xs uppercase tracking-wider text-cosmic-text-muted">
            {scientist.name}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-16">
            <p className="animate-pulse font-display text-sm uppercase tracking-wider text-cosmic-text-dimmer">
              Loading auction...
            </p>
          </div>
        ) : auction ? (
          <>
            {/* Hero: two-column */}
            <div className="flex flex-col border-b border-cosmic md:flex-row">
              {/* Image */}
              <div className="border-b border-cosmic md:w-[45%] md:border-b-0 md:border-r">
                <Image
                  src={scientist.fullSrc}
                  alt={scientist.name}
                  width={900}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Info panel */}
              <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
                <div className="flex flex-col gap-2">
                  <AuctionStatusBadge status={auction.status} />
                  <h1 className="font-display text-3xl uppercase tracking-wide text-cosmic-text md:text-4xl">
                    {scientist.name}
                  </h1>
                  <p className="font-display text-xs uppercase tracking-[0.16em] text-cosmic-cyan">
                    Lane {scientist.lane}
                  </p>
                  <p className="font-mono text-sm text-cosmic-text-muted">
                    {scientist.tagline}
                  </p>
                </div>

                {/* Countdown */}
                <div>
                  <p className="mb-2 font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
                    {auction.status === "upcoming"
                      ? "Starts In"
                      : auction.status === "completed"
                        ? "Auction"
                        : "Time Remaining"}
                  </p>
                  <CountdownTimer
                    endTime={
                      auction.status === "upcoming"
                        ? auction.startTime
                        : auction.endTime
                    }
                    size="lg"
                  />
                </div>

                {/* Highest bid */}
                <div className="border border-cosmic/40 p-4">
                  <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
                    Current Highest Bid
                  </p>
                  <p className="mt-1 font-display text-3xl text-cosmic-cyan">
                    {auction.highestBid ?? "\u2014"}{" "}
                    <span className="text-sm text-cosmic-text-muted">
                      Mad Scientists
                    </span>
                  </p>
                  {auction.highestBidder && (
                    <p className="mt-1 font-mono text-xs text-cosmic-text-dimmer">
                      by {auction.highestBidder}
                    </p>
                  )}
                </div>

                {/* User bid status */}
                {userBid && (
                  <div className="border border-cosmic/40 bg-cosmic/5 p-4">
                    <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
                      Your Bid
                    </p>
                    <p className="mt-1 font-display text-xl text-cosmic-text">
                      {userBid.nftCount}{" "}
                      <span className="text-sm text-cosmic-text-muted">
                        Mad Scientists
                      </span>
                    </p>
                    <p
                      className={`mt-1 font-display text-xs uppercase tracking-wider ${
                        userBid.isHighest
                          ? "text-cosmic-cyan"
                          : "text-cosmic-text-dimmer"
                      }`}
                    >
                      {userBid.isHighest ? "You\u2019re Leading" : "Outbid"}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  {auction.status !== "completed" &&
                    auction.status !== "cancelled" && (
                      <Button
                        variant="cosmic-primary"
                        theme="cosmic"
                        size="lg"
                        onClick={() => setBidFlowOpen(true)}
                        className="w-full"
                      >
                        {userState.connected
                          ? "Place Your Bid"
                          : "Connect Wallet to Bid"}
                      </Button>
                    )}

                  <WalletConnectButton
                    connected={userState.connected}
                    address={userState.address}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                  />
                </div>

                {/* Stats */}
                <div className="flex gap-4 border-t border-cosmic/40 pt-4">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
                      Total Bids
                    </p>
                    <p className="mt-0.5 font-display text-lg text-cosmic-text">
                      {auction.totalBids}
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
                      Min Bid
                    </p>
                    <p className="mt-0.5 font-display text-lg text-cosmic-text">
                      {auction.minimumBid}
                    </p>
                  </div>
                  {auction.antiSnipingExtended && (
                    <p className="self-end font-mono text-[10px] text-cosmic-cyan">
                      Extended (anti-snipe)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bid history */}
            <div className="border-b border-cosmic p-6 md:p-8">
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-cosmic-text">
                Bid History
              </h2>
              <BidHistoryTable
                bids={auction.bids}
                userAddress={userState.address}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center p-16">
            <p className="font-display text-sm uppercase tracking-wider text-cosmic-text-dimmer">
              Auction not found.
            </p>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="flex border-b border-cosmic">
          <Link
            href={`/cosmic/auction/${prev.slug}`}
            className="flex flex-1 items-center gap-2 border-r border-cosmic p-4 font-display text-xs uppercase tracking-wider text-cosmic-text-dimmer transition-colors hover:text-cosmic-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
          >
            <span>&larr;</span>
            <span>{prev.name}</span>
          </Link>
          <Link
            href={`/cosmic/auction/${next.slug}`}
            className="flex flex-1 items-center justify-end gap-2 p-4 font-display text-xs uppercase tracking-wider text-cosmic-text-dimmer transition-colors hover:text-cosmic-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
          >
            <span>{next.name}</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </section>

      <Footer theme="cosmic" />

      {auction && (
        <BidPlacementFlow
          open={bidFlowOpen}
          onClose={() => {
            setBidFlowOpen(false);
            load();
          }}
          auction={auction}
          userState={userState}
          onConnect={handleConnect}
        />
      )}
    </main>
  );
}
