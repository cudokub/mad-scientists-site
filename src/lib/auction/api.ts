import type { Auction, UserAuctionState } from "./types";
import {
  getMockAuctions,
  getMockUserState,
  getMockConnectedUserState,
} from "./mock-data";

const IS_MOCK = process.env.NEXT_PUBLIC_AUCTION_MOCK !== "false";

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchAuctions(): Promise<Auction[]> {
  if (IS_MOCK) {
    await delay(300);
    return getMockAuctions();
  }
  // TODO: CosmJS contract query
  throw new Error("Contract integration not implemented");
}

export async function fetchUserState(
  connected: boolean,
): Promise<UserAuctionState> {
  if (IS_MOCK) {
    await delay(200);
    return connected ? getMockConnectedUserState() : getMockUserState();
  }
  // TODO: Query wallet holdings + contract bids
  throw new Error("Contract integration not implemented");
}

export async function placeBid(
  _auctionId: string,
  _nftTokenIds: string[],
): Promise<{ success: boolean; error?: string }> {
  if (IS_MOCK) {
    await delay(1500);
    return { success: true };
  }
  // TODO: client.execute() contract call
  throw new Error("Contract integration not implemented");
}
