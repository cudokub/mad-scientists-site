import Image from "next/image";
import Button from "@/components/Button";
import type { Auction, UserAuctionState } from "@/lib/auction/types";

export default function UserBidsDashboard({
  auctions,
  userState,
  onSelectAuction,
  onConnect,
}: {
  auctions: Auction[];
  userState: UserAuctionState;
  onSelectAuction: (slug: string) => void;
  onConnect: () => void;
}) {
  if (!userState.connected) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-xs uppercase tracking-[0.22em] text-cosmic-cyan">
          Your Bids
        </h2>
        <div className="flex flex-col items-center gap-4 border border-cosmic/20 py-8 md:flex-row md:justify-between md:px-6 md:py-6">
          <p className="text-center font-mono text-sm text-cosmic-text-muted md:text-left">
            Connect your wallet to track your bid positions across all 5 lanes.
          </p>
          <Button
            variant="cosmic-primary"
            theme="cosmic"
            size="sm"
            onClick={onConnect}
            className="shrink-0"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-xs uppercase tracking-[0.22em] text-cosmic-cyan">
        Your Bids
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {auctions.map((auction) => {
          const bid = userState.currentBids[auction.id];
          const hasBid = !!bid;

          return (
            <button
              key={auction.id}
              onClick={() => onSelectAuction(auction.scientist.slug)}
              className={`flex items-center gap-3 border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic md:flex-col md:items-center md:text-center ${
                hasBid
                  ? "border-cosmic/60 bg-cosmic/5 hover:border-cosmic"
                  : "border-cosmic/20 hover:border-cosmic/40"
              }`}
            >
              <Image
                src={auction.scientist.src}
                alt={auction.scientist.name}
                width={48}
                height={48}
                sizes="48px"
                className={`h-10 w-10 shrink-0 object-cover md:h-12 md:w-12 ${
                  hasBid ? "" : "opacity-40 grayscale"
                }`}
              />
              <div className="min-w-0 flex-1 md:flex-none">
                <p className="truncate font-display text-xs uppercase tracking-wider text-cosmic-text">
                  {auction.scientist.name}
                </p>
                {hasBid ? (
                  <>
                    <p className="mt-0.5 font-display text-lg text-cosmic-cyan">
                      {bid.nftCount}
                    </p>
                    <p
                      className={`font-display text-[10px] uppercase tracking-wider ${
                        bid.isHighest
                          ? "text-cosmic-cyan"
                          : "text-cosmic-text-dimmer"
                      }`}
                    >
                      {bid.isHighest ? "Leading" : "Outbid"}
                    </p>
                  </>
                ) : (
                  <p className="mt-0.5 font-mono text-xs text-cosmic-text-dimmer">
                    No bid
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
