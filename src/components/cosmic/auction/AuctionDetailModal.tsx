"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import Button from "@/components/Button";
import CountdownTimer from "./CountdownTimer";
import AuctionStatusBadge from "./AuctionStatusBadge";
import BidHistoryTable from "./BidHistoryTable";
import NftSelector from "./NftSelector";
import WalletConnectButton from "./WalletConnectButton";
import type { Auction, UserAuctionState } from "@/lib/auction/types";
import { AUCTION_SCIENTISTS } from "@/lib/auction/constants";
import { placeBid } from "@/lib/auction/api";

type ModalStep = "detail" | "connect" | "select" | "confirm" | "result";

function getAdjacentSlugs(slug: string) {
  const idx = AUCTION_SCIENTISTS.findIndex((s) => s.slug === slug);
  const prev =
    AUCTION_SCIENTISTS[(idx - 1 + AUCTION_SCIENTISTS.length) % AUCTION_SCIENTISTS.length];
  const next =
    AUCTION_SCIENTISTS[(idx + 1) % AUCTION_SCIENTISTS.length];
  return { prev, next };
}

function AuctionModalContent({
  auction,
  userState,
  onConnect,
  onDisconnect,
  onClose,
  onNavigate,
  onBidComplete,
  isDesktop,
}: {
  auction: Auction;
  userState: UserAuctionState;
  onConnect: () => void;
  onDisconnect: () => void;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  onBidComplete: () => void;
  isDesktop: boolean;
}) {
  const [step, setStep] = useState<ModalStep>("detail");
  const [selectedNfts, setSelectedNfts] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  const slug = auction.scientist.slug;
  const { prev, next } = getAdjacentSlugs(slug);
  const userBid = userState.currentBids[auction.id];

  // Reset step when navigating to a different scientist
  useEffect(() => {
    setStep("detail");
    setSelectedNfts([]);
    setResult(null);
  }, [slug]);

  const handlePlaceBid = () => {
    setStep(userState.connected ? "select" : "connect");
  };

  const handleConnect = () => {
    onConnect();
    setStep("select");
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    const res = await placeBid(auction.id, selectedNfts);
    setResult(res);
    setSubmitting(false);
    setStep("result");
    if (res.success) onBidComplete();
  };

  const TitleComponent = isDesktop ? DialogTitle : DrawerTitle;
  const DescComponent = isDesktop ? DialogDescription : DrawerDescription;

  const isOnDetailStep = step === "detail";

  // --- Render the right-side panel content based on step ---

  const renderPanel = () => {
    if (step === "detail") {
      return (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <AuctionStatusBadge status={auction.status} />
            <TitleComponent className="font-display text-3xl uppercase tracking-wide text-cosmic-text md:text-4xl">
              {auction.scientist.name}
            </TitleComponent>
            <p className="font-display text-xs uppercase tracking-[0.16em] text-cosmic-cyan">
              Lane {auction.scientist.lane}
            </p>
            <DescComponent className="font-mono text-sm text-cosmic-text-muted">
              {auction.scientist.tagline}
            </DescComponent>
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
                  onClick={handlePlaceBid}
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
              onConnect={onConnect}
              onDisconnect={onDisconnect}
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

          {/* Bid history */}
          <div className="border-t border-cosmic/40 pt-4">
            <h2 className="mb-3 font-display text-sm uppercase tracking-wide text-cosmic-text">
              Bid History
            </h2>
            <BidHistoryTable
              bids={auction.bids}
              userAddress={userState.address}
            />
          </div>
        </div>
      );
    }

    if (step === "connect") {
      return (
        <div className="flex flex-col gap-4">
          <TitleComponent className="font-display text-lg uppercase tracking-wider text-cosmic-text">
            Connect Wallet
          </TitleComponent>
          <DescComponent className="sr-only">
            Connect your wallet to bid on {auction.scientist.name}
          </DescComponent>

          <div className="flex flex-col items-center gap-4 py-6">
            <p className="text-center font-mono text-sm text-cosmic-text-muted">
              Connect your wallet to bid on {auction.scientist.name}.
            </p>
            <Button
              variant="cosmic-primary"
              theme="cosmic"
              size="lg"
              onClick={handleConnect}
              className="w-full"
            >
              Connect Wallet
            </Button>
            <button
              onClick={() => setStep("detail")}
              className="font-display text-xs uppercase tracking-wider text-cosmic-text-dimmer transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
            >
              &larr; Back
            </button>
          </div>
        </div>
      );
    }

    if (step === "select") {
      return (
        <div className="flex flex-col gap-4">
          <TitleComponent className="font-display text-lg uppercase tracking-wider text-cosmic-text">
            Select Your NFTs
          </TitleComponent>
          <DescComponent className="sr-only">
            Select Mad Scientists to bid on {auction.scientist.name}
          </DescComponent>

          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-cosmic-text-muted">
              Your Mad Scientists ({userState.ownedNfts.length} available)
            </p>
            {auction.highestBid && (
              <p className="font-mono text-xs text-cosmic-text-dimmer">
                Current highest: {auction.highestBid}
              </p>
            )}
          </div>

          <NftSelector
            nfts={userState.ownedNfts}
            selected={selectedNfts}
            onSelectionChange={setSelectedNfts}
            minimumBid={auction.minimumBid}
          />

          <div className="flex gap-3">
            <Button
              variant="ghost"
              theme="cosmic"
              onClick={() => setStep("detail")}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              variant="cosmic-primary"
              theme="cosmic"
              size="lg"
              onClick={() => setStep("confirm")}
              disabled={selectedNfts.length < auction.minimumBid}
              className="flex-1"
            >
              Review Bid ({selectedNfts.length})
            </Button>
          </div>
        </div>
      );
    }

    if (step === "confirm") {
      return (
        <div className="flex flex-col gap-4">
          <TitleComponent className="font-display text-lg uppercase tracking-wider text-cosmic-text">
            Confirm Bid
          </TitleComponent>
          <DescComponent className="sr-only">
            Confirm your bid on {auction.scientist.name}
          </DescComponent>

          <div className="border border-cosmic/40 p-4">
            <p className="font-display text-xs uppercase tracking-wider text-cosmic-text-dimmer">
              Bidding On
            </p>
            <p className="mt-1 font-display text-lg uppercase text-cosmic-text">
              {auction.scientist.name}
            </p>
          </div>

          <div className="border border-cosmic/40 p-4">
            <p className="font-display text-xs uppercase tracking-wider text-cosmic-text-dimmer">
              Your Bid
            </p>
            <p className="mt-1 font-display text-2xl text-cosmic-cyan">
              {selectedNfts.length}{" "}
              <span className="text-sm text-cosmic-text-muted">
                Mad Scientists
              </span>
            </p>
          </div>

          {auction.highestBid &&
            selectedNfts.length <= auction.highestBid && (
              <div className="border border-red-500/40 bg-red-500/5 p-3">
                <p className="font-mono text-xs text-red-400">
                  Your bid ({selectedNfts.length}) is not higher than the
                  current leading bid ({auction.highestBid}). You won&apos;t be
                  in the lead.
                </p>
              </div>
            )}

          <p className="font-mono text-xs leading-relaxed text-cosmic-text-dimmer">
            Your Mad Scientists will be held in escrow until the auction ends.
            If you don&apos;t win, they&apos;ll be returned to you.
          </p>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              theme="cosmic"
              onClick={() => setStep("select")}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              variant="cosmic-primary"
              theme="cosmic"
              size="lg"
              onClick={handleConfirm}
              disabled={submitting}
              className="flex-1"
            >
              {submitting ? "Submitting..." : "Confirm Bid"}
            </Button>
          </div>
        </div>
      );
    }

    // result step
    return (
      <div className="flex flex-col gap-4">
        <TitleComponent className="sr-only">
          {result?.success ? "Bid Placed" : "Error"}
        </TitleComponent>
        <DescComponent className="sr-only">
          {result?.success
            ? `You bid ${selectedNfts.length} Mad Scientists on ${auction.scientist.name}`
            : result?.error ?? "Something went wrong"}
        </DescComponent>

        <div className="flex flex-col items-center gap-4 py-6">
          {result?.success ? (
            <>
              <div className="flex h-16 w-16 items-center justify-center border border-cosmic bg-cosmic/10">
                <span className="font-display text-2xl text-cosmic-cyan">
                  &#10003;
                </span>
              </div>
              <p className="text-center font-display text-lg uppercase tracking-wider text-cosmic-text">
                Bid Placed
              </p>
              <p className="text-center font-mono text-sm text-cosmic-text-muted">
                You bid {selectedNfts.length} Mad Scientists on{" "}
                {auction.scientist.name}. Good luck.
              </p>
            </>
          ) : (
            <>
              <div className="flex h-16 w-16 items-center justify-center border border-red-500/40 bg-red-500/5">
                <span className="font-display text-2xl text-red-400">
                  &times;
                </span>
              </div>
              <p className="text-center font-display text-lg uppercase tracking-wider text-red-400">
                Failed
              </p>
              <p className="text-center font-mono text-sm text-cosmic-text-muted">
                {result?.error ?? "Something went wrong. Try again."}
              </p>
            </>
          )}
          <Button
            variant="cosmic-primary"
            theme="cosmic"
            onClick={onClose}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isDesktop ? (
        <div className="grid grid-cols-[minmax(0,1fr)_360px]">
          <div className="border-r border-cosmic">
            <Image
              src={auction.scientist.fullSrc}
              alt={auction.scientist.name}
              width={900}
              height={900}
              sizes="60vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex max-h-[90vh] flex-col overflow-y-auto p-6">
            {renderPanel()}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {isOnDetailStep ? (
            <div className="border-b border-cosmic">
              <Image
                src={auction.scientist.fullSrc}
                alt={auction.scientist.name}
                width={900}
                height={900}
                sizes="100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          ) : (
            /* Compact header for bid flow steps on mobile */
            <div className="flex items-center gap-3 border-b border-cosmic p-4">
              <Image
                src={auction.scientist.src}
                alt={auction.scientist.name}
                width={48}
                height={48}
                className="h-12 w-12 object-cover"
              />
              <div>
                <p className="font-display text-sm uppercase tracking-wider text-cosmic-text">
                  {auction.scientist.name}
                </p>
                <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
                  Lane {auction.scientist.lane}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-5 p-5">
            {renderPanel()}

            {/* Mobile prev/next — only on detail step */}
            {isOnDetailStep && (
              <div className="flex items-center justify-between border-t border-cosmic pt-4">
                <button
                  onClick={() => onNavigate(prev.slug)}
                  className="flex h-11 items-center gap-1.5 border border-cosmic bg-cosmic-bg/70 px-3 font-display text-sm text-cosmic/70 transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
                  aria-label={`Previous: ${prev.name}`}
                >
                  &larr;
                  <span className="text-xs uppercase tracking-wider">Prev</span>
                </button>
                <button
                  onClick={() => onNavigate(next.slug)}
                  className="flex h-11 items-center gap-1.5 border border-cosmic bg-cosmic-bg/70 px-3 font-display text-sm text-cosmic/70 transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
                  aria-label={`Next: ${next.name}`}
                >
                  <span className="text-xs uppercase tracking-wider">Next</span>
                  &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function AuctionDetailModal({
  auctions,
  selectedSlug,
  userState,
  onClose,
  onNavigate,
  onConnect,
  onDisconnect,
  onBidComplete,
}: {
  auctions: Auction[];
  selectedSlug: string;
  userState: UserAuctionState;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onBidComplete: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const auction = auctions.find((a) => a.scientist.slug === selectedSlug);
  if (!auction) return null;

  const { prev, next } = getAdjacentSlugs(selectedSlug);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onNavigate(prev.slug);
      if (e.key === "ArrowRight") onNavigate(next.slug);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onNavigate, prev.slug, next.slug]);

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent onClick={onClose}>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(prev.slug); }}
            className="absolute left-2 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cosmic bg-cosmic-bg/80 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
            aria-label={`Previous: ${prev.name}`}
          >
            &larr;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(next.slug); }}
            className="absolute right-2 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cosmic bg-cosmic-bg/80 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
            aria-label={`Next: ${next.name}`}
          >
            &rarr;
          </button>
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden border border-cosmic bg-cosmic-bg/95 shadow-lg animate-[dialogIn_300ms_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-[110] flex h-11 w-11 items-center justify-center border border-cosmic bg-cosmic-bg/80 font-display text-sm text-cosmic/70 transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
              aria-label="Close modal"
            >
              &times;
            </button>
            <AuctionModalContent
              auction={auction}
              userState={userState}
              onConnect={onConnect}
              onDisconnect={onDisconnect}
              onClose={onClose}
              onNavigate={onNavigate}
              onBidComplete={onBidComplete}
              isDesktop
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DrawerContent>
        <AuctionModalContent
          auction={auction}
          userState={userState}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
          onClose={onClose}
          onNavigate={onNavigate}
          onBidComplete={onBidComplete}
          isDesktop={false}
        />
      </DrawerContent>
    </Drawer>
  );
}
