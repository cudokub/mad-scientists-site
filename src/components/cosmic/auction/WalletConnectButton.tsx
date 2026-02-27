"use client";

export default function WalletConnectButton({
  connected,
  address,
  onConnect,
  onDisconnect,
}: {
  connected: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  if (connected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 border border-cosmic/40 bg-cosmic-bg px-3 py-2 font-mono text-xs text-cosmic-text-muted">
          <span className="inline-block h-1.5 w-1.5 bg-green" />
          {address}
        </span>
        <button
          onClick={onDisconnect}
          className="min-h-[44px] min-w-[44px] border border-cosmic/40 px-3 py-2 font-display text-xs uppercase tracking-wider text-cosmic-text-dimmer transition-colors hover:text-cosmic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      className="min-h-[44px] border border-cosmic bg-cosmic/10 px-4 py-2.5 font-display text-sm uppercase tracking-wider text-cosmic transition-colors hover:bg-cosmic/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic"
    >
      Connect Wallet
    </button>
  );
}
