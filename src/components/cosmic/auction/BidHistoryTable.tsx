import type { Bid } from "@/lib/auction/types";

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

export default function BidHistoryTable({
  bids,
  userAddress,
}: {
  bids: Bid[];
  userAddress: string | null;
}) {
  if (bids.length === 0) {
    return (
      <p className="py-8 text-center font-mono text-sm text-cosmic-text-dimmer">
        No bids yet. Be the first.
      </p>
    );
  }

  const sorted = [...bids].sort(
    (a, b) => b.nftCount - a.nftCount || a.timestamp.getTime() - b.timestamp.getTime(),
  );

  return (
    <div className="overflow-x-auto">
      {/* Desktop table */}
      <table className="hidden w-full md:table">
        <thead>
          <tr className="border-b border-cosmic/40">
            <th className="py-3 text-left font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
              Rank
            </th>
            <th className="py-3 text-left font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
              Bidder
            </th>
            <th className="py-3 text-right font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
              NFTs
            </th>
            <th className="py-3 text-right font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((bid, i) => {
            const isUser = userAddress && bid.bidderAddress === userAddress;
            return (
              <tr
                key={bid.id}
                className={`border-b border-cosmic/20 ${isUser ? "bg-cosmic/5" : ""}`}
              >
                <td className="py-3 font-display text-sm text-cosmic-text-dim">
                  {i === 0 && (
                    <span className="mr-1.5 font-display text-[10px] uppercase tracking-wider text-cosmic-cyan">
                      Leading
                    </span>
                  )}
                  #{i + 1}
                </td>
                <td className="py-3 font-mono text-sm text-cosmic-text-muted">
                  {bid.bidderAddress}
                  {isUser && (
                    <span className="ml-2 font-display text-[10px] uppercase tracking-wider text-cosmic">
                      You
                    </span>
                  )}
                </td>
                <td className="py-3 text-right font-display text-sm text-cosmic-cyan">
                  {bid.nftCount}
                </td>
                <td className="py-3 text-right font-mono text-xs text-cosmic-text-dimmer">
                  {timeAgo(bid.timestamp)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="flex flex-col gap-2 md:hidden">
        {sorted.map((bid, i) => {
          const isUser = userAddress && bid.bidderAddress === userAddress;
          return (
            <div
              key={bid.id}
              className={`border border-cosmic/20 p-3 ${isUser ? "bg-cosmic/5" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xs text-cosmic-text-dim">
                  #{i + 1}
                  {i === 0 && (
                    <span className="ml-1.5 text-cosmic-cyan">Leading</span>
                  )}
                </span>
                <span className="font-display text-base text-cosmic-cyan">
                  {bid.nftCount} NFTs
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-xs text-cosmic-text-muted">
                  {bid.bidderAddress}
                  {isUser && (
                    <span className="ml-1 font-display text-[10px] uppercase text-cosmic">
                      You
                    </span>
                  )}
                </span>
                <span className="font-mono text-[10px] text-cosmic-text-dimmer">
                  {timeAgo(bid.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
