import type { Auction } from "@/lib/auction/types";

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

interface FeedEntry {
  id: string;
  bidderAddress: string;
  nftCount: number;
  timestamp: Date;
  scientistName: string;
}

export default function ActivityFeed({
  auctions,
}: {
  auctions: Auction[];
}) {
  const entries: FeedEntry[] = auctions
    .flatMap((auction) =>
      auction.bids.map((bid) => ({
        id: `${auction.id}-${bid.id}`,
        bidderAddress: bid.bidderAddress,
        nftCount: bid.nftCount,
        timestamp: bid.timestamp,
        scientistName: auction.scientist.name,
      })),
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10);

  if (entries.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-xs uppercase tracking-[0.22em] text-cosmic-cyan">
          Live Activity
        </h2>
        <p className="py-4 text-center font-mono text-sm text-cosmic-text-dimmer">
          No bids yet. Be the first to bid.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-xs uppercase tracking-[0.22em] text-cosmic-cyan">
        Live Activity
      </h2>

      <div className="flex flex-col gap-0">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 border-b border-cosmic/20 py-2.5 last:border-b-0"
          >
            <span className="inline-block h-1.5 w-1.5 shrink-0 bg-cosmic" />
            <p className="min-w-0 flex-1 font-mono text-xs text-cosmic-text-dim">
              <span className="text-cosmic-text-muted">
                {entry.bidderAddress}
              </span>{" "}
              bid{" "}
              <span className="font-display text-sm text-cosmic-cyan">
                {entry.nftCount}
              </span>{" "}
              NFTs on{" "}
              <span className="text-cosmic-text">
                {entry.scientistName}
              </span>
            </p>
            <span className="shrink-0 font-mono text-[10px] text-cosmic-text-dimmer">
              {timeAgo(entry.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
