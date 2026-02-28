# Auction UI → Contract Integration Handoff

## Overview

The auction UI is fully built with mock data. To wire up the real CosmWasm contract, **you only need to touch one file:**

```
src/lib/auction/api.ts
```

Mock mode is gated by the `NEXT_PUBLIC_AUCTION_MOCK` env var. Set it to `"false"` to switch to real contract queries. When set to `"true"` (or unset), the UI uses mock data for development.

## Functions to Implement

`api.ts` has 3 functions with `// TODO` comments where the real implementation goes:

### `fetchAuctions(): Promise<Auction[]>`

Returns all 5 auctions with full bid history. Called on page load and polled every 15 seconds.

### `fetchUserState(connected: boolean): Promise<UserAuctionState>`

Returns the user's wallet status, owned Mad Scientist NFTs, and current bids across all auctions. Called when the user connects/disconnects their wallet.

### `placeBid(auctionId: string, nftTokenIds: string[]): Promise<{ success: boolean; error?: string }>`

Submits a bid. The user selects Mad Scientist NFTs from their collection, and this function sends the transaction. Returns success/failure.

## Data Shapes

TypeScript interfaces are in `src/lib/auction/types.ts`. The UI expects these exact shapes:

### Auction

```typescript
{
  id: string;                    // e.g. "auction-0"
  scientist: AuctionScientist;   // mapped from constants — don't change this
  status: "upcoming" | "active" | "ending-soon" | "completed" | "cancelled";
  startTime: Date;
  endTime: Date;
  minimumBid: number;            // minimum NFT count to bid
  highestBid: number | null;     // NFT count of highest bid (null if no bids)
  highestBidder: string | null;  // cosmos address of highest bidder
  totalBids: number;
  bids: Bid[];                   // full bid history
  antiSnipingExtended: boolean;  // whether anti-sniping extended the timer
}
```

### Bid

```typescript
{
  id: string;
  bidderAddress: string;         // cosmos1... address
  nftCount: number;              // how many NFTs in this bid
  timestamp: Date;
  isHighest: boolean;
}
```

### UserAuctionState

```typescript
{
  connected: boolean;
  address: string | null;        // cosmos1... address
  ownedNfts: UserNft[];          // NFTs available to bid with
  currentBids: Record<string, {  // keyed by auction ID
    nftCount: number;
    isHighest: boolean;
  }>;
}
```

### UserNft

```typescript
{
  tokenId: string;
  name: string;
  image: string;                 // URL to NFT image
}
```

## Wallet Connect

Currently a mock toggle in `src/components/cosmic/auction/WalletConnectButton.tsx`. Replace with Keplr/Leap integration (`window.keplr.enable()`). The connect/disconnect handlers live in the overview page (`src/app/cosmic/auction/page.tsx`) and get passed down through props — no need to restructure anything.

## Scientist Mapping

The 5 scientists are defined in `src/lib/auction/constants.ts`. Each has a `slug` used as a key. When returning auction data from the contract, map each auction to the correct scientist by ID or slug:

| Slug | Lane | Contract Lane? |
|------|------|---------------|
| `the-architect` | Alpha | 0 or "alpha" |
| `the-warlord` | Beta | 1 or "beta" |
| `the-oracle` | Gamma | 2 or "gamma" |
| `the-antiquarian` | Delta | 3 or "delta" |
| `the-dreamer` | Omega | 4 or "omega" |

## Polling vs Real-time

The UI polls `fetchAuctions()` every 15 seconds. If the contract supports WebSocket/Tendermint subscriptions, you can swap polling for real-time updates inside `api.ts` — the UI doesn't care how the data arrives, it just reads the return value.

## Anti-sniping

The UI reads `antiSnipingExtended` (boolean) and `endTime` from the auction data. If the contract extends the timer on a last-second bid, just return the updated `endTime` — the countdown component recalculates automatically every second.

## Auction Lifecycle

The UI handles 3 phases based on the `status` field:

| Phase | Status Values | UI Behavior |
|-------|--------------|-------------|
| Pre-auction | `upcoming` | Shows countdown to start, bid button hidden |
| Live | `active`, `ending-soon` | Full bidding flow, countdown to end |
| Ended | `completed`, `cancelled` | Shows final results, bid button hidden |

The `ending-soon` status should be set when the auction is in its final minutes (the UI shows a red warning timer). The exact threshold is up to the contract.

## Files You Don't Need to Touch

Everything else in the UI is self-contained:

- Components (`src/components/cosmic/auction/`) — all read from the data shapes above
- Mock data (`src/lib/auction/mock-data.ts`) — only used in mock mode
- Constants (`src/lib/auction/constants.ts`) — scientist metadata, shared with the COSMIC showcase page
- Hooks (`src/lib/hooks/useCountdown.ts`) — countdown timer logic

## Quick Start

1. Clone the repo, run `npm install && npm run dev`
2. Visit `localhost:3000/cosmic/auction` — you'll see the full UI with mock data
3. Click cards, open modals, go through the bid flow to understand the UX
4. When ready, set `NEXT_PUBLIC_AUCTION_MOCK=false` and implement the 3 functions in `api.ts`
