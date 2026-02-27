import Link from "next/link";
import Image from "next/image";
import type { Auction } from "@/lib/auction/types";
import AuctionStatusBadge from "./AuctionStatusBadge";
import CountdownTimer from "./CountdownTimer";

export default function AuctionCard({ auction }: { auction: Auction }) {
  const { scientist } = auction;

  return (
    <Link
      href={`/cosmic/auction/${scientist.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
    >
      <article className="border border-cosmic bg-[linear-gradient(145deg,rgba(13,10,30,0.92),rgba(5,9,22,0.9))] transition duration-300 group-hover:border-cosmic/70 group-hover:shadow-[0_10px_30px_rgba(155,89,240,0.2)]">
        <div className="relative overflow-hidden">
          <Image
            src={scientist.src}
            alt={scientist.name}
            width={500}
            height={500}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 20vw"
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <AuctionStatusBadge
            status={auction.status}
            className="absolute left-3 top-3"
          />
        </div>

        <div className="border-t border-cosmic/40 p-3 md:p-4">
          <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cosmic-text-dimmer">
            Lane {scientist.lane}
          </p>
          <h2 className="mt-1 font-display text-sm uppercase tracking-wider text-cosmic-text md:text-base">
            {scientist.name}
          </h2>

          <div className="mt-3">
            <CountdownTimer endTime={auction.endTime} size="sm" />
          </div>

          <div className="mt-3 flex justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-cosmic-text-dimmer">
                Highest Bid
              </p>
              <p className="font-display text-lg text-cosmic-cyan">
                {auction.highestBid ?? "\u2014"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-cosmic-text-dimmer">
                Bids
              </p>
              <p className="font-display text-lg text-cosmic-text">
                {auction.totalBids}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
