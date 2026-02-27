export type AuctionStatus =
  | "upcoming"
  | "active"
  | "ending-soon"
  | "completed"
  | "cancelled";

export interface AuctionScientist {
  id: number;
  name: string;
  slug: string;
  lane: string;
  src: string;
  fullSrc: string;
  tagline: string;
  lore: string;
}

export interface Bid {
  id: string;
  bidderAddress: string;
  nftCount: number;
  timestamp: Date;
  isHighest: boolean;
}

export interface Auction {
  id: string;
  scientist: AuctionScientist;
  status: AuctionStatus;
  startTime: Date;
  endTime: Date;
  minimumBid: number;
  highestBid: number | null;
  highestBidder: string | null;
  totalBids: number;
  bids: Bid[];
  antiSnipingExtended: boolean;
}

export interface UserNft {
  tokenId: string;
  name: string;
  image: string;
}

export interface UserAuctionState {
  connected: boolean;
  address: string | null;
  ownedNfts: UserNft[];
  currentBids: Record<
    string,
    {
      nftCount: number;
      isHighest: boolean;
    }
  >;
}
