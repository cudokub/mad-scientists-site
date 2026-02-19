import Image from "next/image";

interface TickerProps {
  variant?: "gateway" | "stargaze";
}

const gatewayItem = {
  text: "REVEAL LIVE ON",
  subtext: "GATEWAY",
  icon: "/images/nft-1.jpg",
};

const stargazeItem = {
  text: "BUY SECONDARY ON",
  subtext: "STARGAZE",
  icon: "/images/nft-2.jpg",
};

function TickerSet({ item, count }: { item: typeof gatewayItem; count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 mx-8 shrink-0"
        >
          <span className="font-display text-green text-lg md:text-2xl font-bold tracking-wider">
            {item.text}
          </span>
          <div className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full border-2 border-green overflow-hidden shrink-0">
            <Image
              src={item.icon}
              alt=""
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display text-green text-lg md:text-2xl font-bold tracking-wider">
            {item.subtext}
          </span>
        </div>
      ))}
    </>
  );
}

export default function Ticker({ variant = "gateway" }: TickerProps) {
  const item = variant === "gateway" ? gatewayItem : stargazeItem;

  return (
    <div className="border border-green max-w-[1440px] mx-auto">
      <div
        className="overflow-hidden py-3"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex ticker-animate items-center whitespace-nowrap w-max">
          <TickerSet item={item} count={8} />
          <TickerSet item={item} count={8} />
        </div>
      </div>
    </div>
  );
}
