"use client";

import { useState } from "react";
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
import NftSelector from "./NftSelector";
import type { Auction, UserAuctionState } from "@/lib/auction/types";
import { placeBid } from "@/lib/auction/api";

type Step = "connect" | "select" | "confirm" | "result";

function FlowContent({
  auction,
  userState,
  onConnect,
  onClose,
  isDesktop,
}: {
  auction: Auction;
  userState: UserAuctionState;
  onConnect: () => void;
  onClose: () => void;
  isDesktop: boolean;
}) {
  const [step, setStep] = useState<Step>(
    userState.connected ? "select" : "connect",
  );
  const [selectedNfts, setSelectedNfts] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  const TitleComponent = isDesktop ? DialogTitle : DrawerTitle;
  const DescComponent = isDesktop ? DialogDescription : DrawerDescription;

  const handleConnect = () => {
    onConnect();
    setStep("select");
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    const res = await placeBid(
      auction.id,
      selectedNfts,
    );
    setResult(res);
    setSubmitting(false);
    setStep("result");
  };

  return (
    <div className="flex flex-col gap-4 p-5 md:p-6">
      <div className="flex items-center justify-between">
        <TitleComponent className="font-display text-lg uppercase tracking-wider text-cosmic-text">
          {step === "connect" && "Connect Wallet"}
          {step === "select" && "Select Your NFTs"}
          {step === "confirm" && "Confirm Bid"}
          {step === "result" && (result?.success ? "Bid Placed" : "Error")}
        </TitleComponent>
        <button
          onClick={onClose}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center font-display text-sm text-cosmic-text-dimmer transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <DescComponent className="sr-only">
        Bid placement flow for {auction.scientist.name}
      </DescComponent>

      {/* Step indicators */}
      <div className="flex items-center gap-1">
        {(["connect", "select", "confirm", "result"] as Step[]).map((s, i) => (
          <div
            key={s}
            className={`h-0.5 flex-1 ${
              i <=
              ["connect", "select", "confirm", "result"].indexOf(step)
                ? "bg-cosmic"
                : "bg-cosmic/20"
            }`}
          />
        ))}
      </div>

      {step === "connect" && (
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
        </div>
      )}

      {step === "select" && (
        <div className="flex flex-col gap-4">
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
            {!userState.connected && (
              <Button
                variant="ghost"
                theme="cosmic"
                onClick={() => setStep("connect")}
                className="flex-1"
              >
                Back
              </Button>
            )}
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
      )}

      {step === "confirm" && (
        <div className="flex flex-col gap-4 py-2">
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
      )}

      {step === "result" && result && (
        <div className="flex flex-col items-center gap-4 py-6">
          {result.success ? (
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
                {result.error ?? "Something went wrong. Try again."}
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
      )}
    </div>
  );
}

export default function BidPlacementFlow({
  open,
  onClose,
  auction,
  userState,
  onConnect,
}: {
  open: boolean;
  onClose: () => void;
  auction: Auction;
  userState: UserAuctionState;
  onConnect: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
        <DialogContent>
          <div
            className="relative w-full max-w-lg border border-cosmic bg-cosmic-bg/95 shadow-lg animate-[dialogIn_300ms_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <FlowContent
              auction={auction}
              userState={userState}
              onConnect={onConnect}
              onClose={onClose}
              isDesktop
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DrawerContent>
        <FlowContent
          auction={auction}
          userState={userState}
          onConnect={onConnect}
          onClose={onClose}
          isDesktop={false}
        />
      </DrawerContent>
    </Drawer>
  );
}
