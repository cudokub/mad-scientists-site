import type { Auction, Bid, UserAuctionState, UserNft } from "./types";
import { AUCTION_SCIENTISTS } from "./constants";

const MOCK_ADDRESSES = [
  "cosmos1qy3…f8k2",
  "cosmos1x7m…p4d9",
  "cosmos1ktr…w2n5",
  "cosmos1v9a…j6h3",
  "cosmos1m3c…r8t7",
  "cosmos1f5n…q1b4",
  "cosmos1h8w…s3e6",
  "cosmos1d2j…u7g0",
];

function mockBids(count: number, highestCount: number): Bid[] {
  const bids: Bid[] = [];
  for (let i = 0; i < count; i++) {
    const nftCount = i === 0 ? highestCount : Math.max(1, highestCount - Math.floor(Math.random() * 8) - 1);
    bids.push({
      id: `bid-${i}`,
      bidderAddress: MOCK_ADDRESSES[i % MOCK_ADDRESSES.length],
      nftCount,
      timestamp: new Date(Date.now() - (count - i) * 3600_000 - Math.random() * 1800_000),
      isHighest: i === 0,
    });
  }
  return bids;
}

export function getMockAuctions(): Auction[] {
  const now = Date.now();

  const configs: {
    startOffset: number;
    endOffset: number;
    bidCount: number;
    highestBid: number;
  }[] = [
    // The Architect — active, ends in 2 days
    { startOffset: -48 * 3600_000, endOffset: 48 * 3600_000, bidCount: 6, highestBid: 14 },
    // The Warlord — active, ends in 1 day
    { startOffset: -72 * 3600_000, endOffset: 24 * 3600_000, bidCount: 8, highestBid: 21 },
    // The Oracle — ending soon, ends in 8 minutes
    { startOffset: -96 * 3600_000, endOffset: 8 * 60_000, bidCount: 11, highestBid: 18 },
    // The Antiquarian — upcoming, starts in 3 hours
    { startOffset: 3 * 3600_000, endOffset: 75 * 3600_000, bidCount: 0, highestBid: 0 },
    // The Dreamer — active, ends in 3 days
    { startOffset: -24 * 3600_000, endOffset: 72 * 3600_000, bidCount: 4, highestBid: 9 },
  ];

  return AUCTION_SCIENTISTS.map((scientist, i) => {
    const cfg = configs[i];
    const startTime = new Date(now + cfg.startOffset);
    const endTime = new Date(now + cfg.endOffset);
    const bids = mockBids(cfg.bidCount, cfg.highestBid);

    let status: Auction["status"];
    if (now < startTime.getTime()) {
      status = "upcoming";
    } else if (now > endTime.getTime()) {
      status = "completed";
    } else if (endTime.getTime() - now < 10 * 60_000) {
      status = "ending-soon";
    } else {
      status = "active";
    }

    return {
      id: `auction-${scientist.id}`,
      scientist,
      status,
      startTime,
      endTime,
      minimumBid: 1,
      highestBid: cfg.highestBid || null,
      highestBidder: bids.length > 0 ? bids[0].bidderAddress : null,
      totalBids: cfg.bidCount,
      bids,
      antiSnipingExtended: false,
    };
  });
}

export function getMockUserNfts(): UserNft[] {
  return Array.from({ length: 23 }, (_, i) => ({
    tokenId: `mad-${1000 + i}`,
    name: `Mad Scientist #${1000 + i}`,
    image: `/images/nft-placeholder.png`,
  }));
}

export function getMockUserState(): UserAuctionState {
  return {
    connected: false,
    address: null,
    ownedNfts: [],
    currentBids: {},
  };
}

export function getMockConnectedUserState(): UserAuctionState {
  return {
    connected: true,
    address: "cosmos1abc…z9y8",
    ownedNfts: getMockUserNfts(),
    currentBids: {
      "auction-1": { nftCount: 7, isHighest: false },
    },
  };
}
