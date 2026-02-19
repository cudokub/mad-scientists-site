import Image from "next/image";

export default function BlockchainSection() {
  return (
    <section className="max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Col 1: Blockchain / Osmosis */}
        <div className="flex-1 border border-green p-6 md:p-8 flex flex-col items-center gap-3">
          <span className="font-display text-[#8E8E8E] text-sm tracking-wider">
            BLOCKCHAIN
          </span>
          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full border-2 border-green overflow-hidden shrink-0">
              <Image
                src="/images/nft-3.jpg"
                alt="Osmosis"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-[#D2DFD4] text-2xl md:text-3xl font-bold capitalize">
              Osmosis
            </span>
          </div>
        </div>

        {/* Col 2: Trade $LAB — 3 circular icons only */}
        <div className="flex-1 border border-green p-6 md:p-8 flex flex-col items-center gap-3">
          <span className="font-display text-[#8E8E8E] text-sm tracking-wider">
            TRADE $LAB
          </span>
          <div className="flex gap-3 mt-1">
            <a
              href="https://app.osmosis.zone/?from=OSMO&to=LAB"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[48px] h-[48px] rounded-full border-2 border-green overflow-hidden hover:border-green-light transition-colors"
            >
              <Image
                src="/images/nft-3.jpg"
                alt="Osmosis"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </a>
            <a
              href="https://coinhall.org/osmosis/osmo12zk0xmacanpz9huy8huth2wee98smf9kktg4lltu9zrk3x9w58aq7k64cz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[48px] h-[48px] rounded-full border-2 border-green overflow-hidden hover:border-green-light transition-colors"
            >
              <Image
                src="/images/nft-4.jpg"
                alt="CoinHall"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </a>
            <a
              href="https://swapfast.app/?destinationAsset=factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB&destinationChainId=osmosis-1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[48px] h-[48px] rounded-full border-2 border-green overflow-hidden hover:border-green-light transition-colors"
            >
              <Image
                src="/images/logo-large.png"
                alt="SwapFast"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>

        {/* Col 3: Reveal MAD Scientists */}
        <div className="flex-1 border border-green p-6 md:p-8 flex flex-col items-center gap-3">
          <span className="font-display text-[#8E8E8E] text-sm tracking-wider">
            REVEAL MAD SCIENTISTS
          </span>
          <a
            href="https://mygateway.io/minting/mad-scientists"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-[48px] h-[48px] rounded-full border-2 border-green overflow-hidden shrink-0">
              <Image
                src="/images/nft-1.jpg"
                alt="Gateway"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-[#D2DFD4] text-2xl md:text-3xl font-bold capitalize">
              Gateway
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
