import Link from "next/link";

export default function CosmicBanner() {
  return (
    <Link
      href="/cosmic"
      aria-label="COSMIC — meet the 5 Cosmics"
      className="block border-b border-cosmic bg-[linear-gradient(90deg,#080612_0%,#1a0f2e_50%,#080612_100%)] py-2 md:py-2.5 group transition-colors hover:bg-[linear-gradient(90deg,#0b0818_0%,#24153f_50%,#0b0818_100%)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cosmic"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-2.5 px-4 md:gap-3 md:px-6">
        <span
          className="h-1.5 w-1.5 shrink-0 animate-pulse bg-cosmic"
          aria-hidden
        />
        <span className="font-display text-[11px] uppercase tracking-[0.12em] text-cosmic-text md:text-sm md:tracking-[0.16em]">
          The Cosmos Called — Meet the{" "}
          <span className="font-bold text-cosmic">5 Cosmics</span>
        </span>
        <span
          className="font-display text-sm text-cosmic-cyan-light transition-transform group-hover:translate-x-1 md:text-base"
          aria-hidden
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
}
