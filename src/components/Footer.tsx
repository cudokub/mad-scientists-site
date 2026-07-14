import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const footerLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Reveal Info", href: "/revealinfo" },
  { label: "Bridge", href: "https://stargaze.zone/m/cosmos1dhc08f4n6ulzqtncrsue0uk2g5fr2wxp7qc56vcfcdsy3jqzhdts4a0yuf", external: true },
  {
    label: "Reveal MAD",
    href: "https://mygateway.io/minting/mad-scientists",
    external: true,
  },
  {
    label: "Marketplace",
    href: "https://stargaze.zone/m/cosmos1dhc08f4n6ulzqtncrsue0uk2g5fr2wxp7qc56vcfcdsy3jqzhdts4a0yuf",
    external: true,
  },
  {
    label: "Trade $LAB",
    href: "https://app.osmosis.zone/?from=OSMO&to=LAB",
    external: true,
  },
  {
    label: "$LAB Chart",
    href: "https://dexscreener.com/osmosis/1642-factory_osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n_lab-uosmo",
    external: true,
  },
  {
    label: "Validator",
    href: "https://wallet.keplr.app/chains/osmosis?modal=validator&chain=osmosis-1&validator_address=osmovaloper1xvl4vrlh3epl7desfnqydt4tvexl380ue86syc&referral=true",
    external: true,
  },
  {
    label: "Brand Assets",
    href: "https://drive.google.com/drive/folders/1hnSMNvvWFUX8V4p5p79ItUjjjE3B6LaW",
    external: true,
  },
  { label: "Mad University", href: "https://mad.trendytech.dev", external: true },
  { label: "Science Clubs", href: "/scienceclubs" },
  { label: "Snapshot", href: "/snapshot" },
  { label: "Hackathon", href: "/hackathon" },
  { label: "COSMIC", href: "/cosmic" },
];

interface FooterProps {
  theme?: "default" | "cosmic" | "hackathon";
}

export default function Footer({ theme = "default" }: FooterProps) {
  const isCosmic = theme === "cosmic";
  const isHackathon = theme === "hackathon";
  const borderClass = isCosmic ? "border-cosmic" : isHackathon ? "border-hackathon" : "border-green";
  const linkClass = isCosmic
    ? "text-cosmic-text-muted hover:text-cosmic-cyan-light"
    : isHackathon
      ? "text-hackathon-text-muted hover:text-hackathon-cyan"
      : "text-green hover:text-green-light";
  const focusOutline = isCosmic ? "focus-visible:outline-cosmic" : isHackathon ? "focus-visible:outline-hackathon" : "focus-visible:outline-green";

  return (
    <footer className="max-w-[1440px] mx-auto">
      {/* Links grid + Social icons in one bordered box */}
      <div className={`flex flex-col md:flex-row gap-8 md:gap-12 border p-6 md:p-10 ${borderClass}`}>
        {/* Link Grid — 5 columns, no cell borders */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`font-display text-sm tracking-wider transition-colors py-2 text-center md:text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${focusOutline} ${linkClass}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons — right side */}
        <div className="flex items-start justify-center md:justify-start gap-4 shrink-0">
          <a
            href="https://twitter.com/madscientists_x"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on X (Twitter)"
            className={`flex items-center justify-center min-w-[44px] min-h-[44px] hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 ${focusOutline}`}
          >
            <Image
              src="/images/twitter-icon.png"
              alt="X (Twitter)"
              width={36}
              height={33}
              className="w-[32px] md:w-[36px] h-auto"
            />
          </a>
          <a
            href="https://discord.gg/q7zgmdKtKW"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord"
            className={`flex items-center justify-center min-w-[44px] min-h-[44px] hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 ${focusOutline}`}
          >
            <Image
              src="/images/discord-icon.png"
              alt="Discord"
              width={36}
              height={36}
              className="w-[32px] md:w-[36px] h-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
