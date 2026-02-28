const steps = [
  {
    number: "01",
    title: "Pick Your Lane",
    description:
      "Choose which legendary 1/1 COSMIC scientist you want to bid on.",
  },
  {
    number: "02",
    title: "Stack Your Bid",
    description:
      "Select Mad Scientists from your collection to form your bid stack.",
  },
  {
    number: "03",
    title: "Highest Wins",
    description:
      "When time runs out, the biggest stack takes the 1/1. One winner per lane.",
  },
  {
    number: "04",
    title: "Losers Refunded",
    description:
      "Didn\u2019t win? All your Mad Scientists are returned to you. No risk.",
  },
];

export default function AuctionRules() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-xs uppercase tracking-[0.22em] text-cosmic-cyan">
        How It Works
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="border border-cosmic/40 p-4"
          >
            <p className="font-display text-2xl text-cosmic/40">
              {step.number}
            </p>
            <p className="mt-2 font-display text-sm uppercase tracking-wider text-cosmic-text">
              {step.title}
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-cosmic-text-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-cosmic/40 pt-4">
        <p className="font-mono text-xs text-cosmic-text-dim">
          <span className="font-display uppercase tracking-wider text-cosmic-cyan">
            Anti-Sniping
          </span>{" "}
          &mdash; Last-second bids extend the timer by 5 minutes. No
          cheap wins.
        </p>
        <p className="font-mono text-xs text-cosmic-text-dim">
          <span className="font-display uppercase tracking-wider text-cosmic-cyan">
            Escrow
          </span>{" "}
          &mdash; Your Mad Scientists are held safely in the smart
          contract until the auction ends.
        </p>
      </div>
    </div>
  );
}
