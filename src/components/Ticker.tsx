import Image from "next/image";
import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400"],
});

interface TickerItem {
  text: string;
  subtext: string;
  icon: string;
}

interface TickerProps {
  variant?: "gateway" | "stargaze" | "cosmic-top" | "cosmic-bottom";
}

const gatewayItem: TickerItem = {
  text: "REVEAL LIVE ON",
  subtext: "GATEWAY",
  icon: "/images/nft-1.jpg",
};

const stargazeItem: TickerItem = {
  text: "BUY SECONDARY ON",
  subtext: "STARGAZE",
  icon: "/images/nft-2.jpg",
};

const cosmicTopItem: TickerItem = {
  text: "THE COSMOS",
  subtext: "CALLED",
  icon: "/images/cosmos-icon.png",
};

const cosmicBottomItem: TickerItem = {
  text: "THE COSMOS",
  subtext: "CALLED",
  icon: "/images/cosmos-icon.png",
};

const isCosmic = (variant: string) => variant.startsWith("cosmic-");

function TickerSet({ item, count, cosmic }: { item: TickerItem; count: number; cosmic?: boolean }) {
  const textClass = cosmic
    ? "font-display text-cosmic text-lg md:text-2xl font-bold tracking-wider"
    : "font-display text-green text-lg md:text-2xl font-bold tracking-wider";

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 mx-8 shrink-0"
        >
          <span className={textClass}>
            {cosmic && item.text.includes("5") ? (
              <>
                <span className={`${silkscreen.className} font-normal tracking-normal`}>5</span>
                {item.text.replace("5", "")}
              </>
            ) : (
              item.text
            )}
          </span>
          <div className={`${cosmic ? "h-[30px] md:h-[36px]" : `w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full`} overflow-hidden shrink-0`}>
            <Image
              src={item.icon}
              alt=""
              width={36}
              height={36}
              className={cosmic ? "h-full w-auto object-contain" : "w-full h-full object-cover"}
            />
          </div>
          <span className={textClass}>
            {item.subtext}
          </span>
        </div>
      ))}
    </>
  );
}

const items: Record<string, TickerItem> = {
  gateway: gatewayItem,
  stargaze: stargazeItem,
  "cosmic-top": cosmicTopItem,
  "cosmic-bottom": cosmicBottomItem,
};

export default function Ticker({ variant = "gateway" }: TickerProps) {
  const item = items[variant];
  const cosmic = isCosmic(variant);
  const borderClass = cosmic ? "border-cosmic" : "border-green";

  return (
    <div className={`border ${borderClass} max-w-[1440px] mx-auto`} role="marquee" aria-label="Scrolling announcement">
      <div
        className="overflow-hidden py-3"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex ticker-animate items-center whitespace-nowrap w-max">
          <TickerSet item={item} count={8} cosmic={cosmic} />
          <TickerSet item={item} count={8} cosmic={cosmic} />
        </div>
      </div>
    </div>
  );
}
