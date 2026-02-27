"use client";

import { useCountdown } from "@/lib/hooks/useCountdown";

function Segment({
  value,
  label,
  size,
}: {
  value: number;
  label: string;
  size: "sm" | "lg";
}) {
  const formatted = String(value).padStart(2, "0");

  if (size === "sm") {
    return (
      <span className="font-display text-sm text-cosmic-text tabular-nums">
        {formatted}
        <span className="ml-0.5 text-[10px] text-cosmic-text-dimmer">{label.charAt(0)}</span>
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl tabular-nums text-cosmic-text md:text-4xl">
        {formatted}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cosmic-text-dimmer">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  endTime,
  size = "sm",
}: {
  endTime: Date;
  size?: "sm" | "lg";
}) {
  const { days, hours, minutes, seconds, isExpired, isEndingSoon } =
    useCountdown(endTime);

  if (isExpired) {
    return (
      <span className="font-display text-sm uppercase tracking-wider text-cosmic-text-dimmer">
        Auction Ended
      </span>
    );
  }

  const warningClass = isEndingSoon ? "text-red-400" : "";

  if (size === "sm") {
    return (
      <div className={`flex items-center gap-1.5 ${warningClass}`}>
        {days > 0 && <Segment value={days} label="days" size="sm" />}
        <Segment value={hours} label="hrs" size="sm" />
        <span className="text-cosmic-text-dimmer">:</span>
        <Segment value={minutes} label="min" size="sm" />
        <span className="text-cosmic-text-dimmer">:</span>
        <Segment value={seconds} label="sec" size="sm" />
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 md:gap-4 ${warningClass}`}>
      {days > 0 && (
        <>
          <Segment value={days} label="days" size="lg" />
          <span className="mt-1 font-display text-2xl text-cosmic-text-dimmer md:text-3xl">:</span>
        </>
      )}
      <Segment value={hours} label="hours" size="lg" />
      <span className="mt-1 font-display text-2xl text-cosmic-text-dimmer md:text-3xl">:</span>
      <Segment value={minutes} label="mins" size="lg" />
      <span className="mt-1 font-display text-2xl text-cosmic-text-dimmer md:text-3xl">:</span>
      <Segment value={seconds} label="secs" size="lg" />
    </div>
  );
}
