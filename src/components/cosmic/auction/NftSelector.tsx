"use client";

import { useState } from "react";
import Image from "next/image";
import type { UserNft } from "@/lib/auction/types";

export default function NftSelector({
  nfts,
  selected,
  onSelectionChange,
  minimumBid,
}: {
  nfts: UserNft[];
  selected: string[];
  onSelectionChange: (tokenIds: string[]) => void;
  minimumBid: number;
}) {
  const [filter, setFilter] = useState("");

  const filtered = filter
    ? nfts.filter(
        (n) =>
          n.tokenId.toLowerCase().includes(filter.toLowerCase()) ||
          n.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : nfts;

  const toggle = (tokenId: string) => {
    if (selected.includes(tokenId)) {
      onSelectionChange(selected.filter((id) => id !== tokenId));
    } else {
      onSelectionChange([...selected, tokenId]);
    }
  };

  const selectAll = () => {
    onSelectionChange(filtered.map((n) => n.tokenId));
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by ID..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 border border-cosmic/40 bg-cosmic-bg px-3 py-2 font-mono text-xs text-cosmic-text placeholder:text-cosmic-text-dimmer focus:border-cosmic focus:outline-none"
        />
        <button
          onClick={selectAll}
          className="min-h-[44px] border border-cosmic/40 px-3 py-2 font-display text-[10px] uppercase tracking-wider text-cosmic-text-dimmer transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
        >
          All
        </button>
        <button
          onClick={clearAll}
          className="min-h-[44px] border border-cosmic/40 px-3 py-2 font-display text-[10px] uppercase tracking-wider text-cosmic-text-dimmer transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
        >
          Clear
        </button>
      </div>

      <div className="grid max-h-[50vh] grid-cols-4 gap-1.5 overflow-y-auto sm:grid-cols-5 md:grid-cols-6">
        {filtered.map((nft) => {
          const isSelected = selected.includes(nft.tokenId);
          return (
            <button
              key={nft.tokenId}
              onClick={() => toggle(nft.tokenId)}
              className={`relative border p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic ${
                isSelected
                  ? "border-cosmic-cyan bg-cosmic-cyan/10"
                  : "border-cosmic/20 hover:border-cosmic/60"
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-cosmic-bg-light">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  width={100}
                  height={100}
                  sizes="80px"
                  className="h-full w-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-cosmic-bg/50">
                    <span className="font-display text-lg text-cosmic-cyan">
                      &#10003;
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-1 truncate font-mono text-[9px] text-cosmic-text-dimmer">
                {nft.tokenId}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-cosmic/40 pt-3">
        <p className="font-mono text-xs text-cosmic-text-muted">
          Selected:{" "}
          <span className="font-display text-sm text-cosmic-cyan">
            {selected.length}
          </span>{" "}
          Mad Scientists
        </p>
        {selected.length > 0 && selected.length < minimumBid && (
          <p className="font-mono text-[10px] text-red-400">
            Minimum bid: {minimumBid}
          </p>
        )}
      </div>
    </div>
  );
}
