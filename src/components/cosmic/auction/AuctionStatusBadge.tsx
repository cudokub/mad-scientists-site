import type { AuctionStatus } from "@/lib/auction/types";

const statusConfig: Record<
  AuctionStatus,
  { label: string; dotClass: string; textClass: string; bgClass: string; pulse?: boolean }
> = {
  upcoming: {
    label: "UPCOMING",
    dotClass: "bg-cosmic-text-dimmer",
    textClass: "text-cosmic-text-dimmer",
    bgClass: "bg-cosmic-bg/80",
  },
  active: {
    label: "LIVE",
    dotClass: "bg-cosmic",
    textClass: "text-cosmic",
    bgClass: "bg-cosmic-bg/80",
    pulse: true,
  },
  "ending-soon": {
    label: "ENDING SOON",
    dotClass: "bg-cosmic-cyan",
    textClass: "text-cosmic-cyan",
    bgClass: "bg-cosmic-bg/80",
    pulse: true,
  },
  completed: {
    label: "ENDED",
    dotClass: "bg-cosmic-text-dimmer",
    textClass: "text-cosmic-text-dimmer",
    bgClass: "bg-cosmic-bg/80",
  },
  cancelled: {
    label: "CANCELLED",
    dotClass: "bg-red-500",
    textClass: "text-red-400",
    bgClass: "bg-cosmic-bg/80",
  },
};

export default function AuctionStatusBadge({
  status,
  className = "",
}: {
  status: AuctionStatus;
  className?: string;
}) {
  const cfg = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-cosmic/40 px-2 py-1 font-display text-[10px] uppercase tracking-[0.14em] ${cfg.textClass} ${cfg.bgClass} ${className}`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 shrink-0 ${cfg.dotClass} ${cfg.pulse ? "animate-pulse" : ""}`}
      />
      {cfg.label}
    </span>
  );
}
