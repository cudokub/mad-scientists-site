import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
        {/* Left Panel — Text + Buttons */}
        <div className="flex-1 border border-green flex flex-col">
          <div className="flex flex-col gap-4 p-6 md:p-8 flex-1 justify-center items-center md:items-start">
            {/* Headline */}
            <h1 className="font-display uppercase tracking-[-1.5px] text-center md:text-left">
              <span className="block text-[#D2DFD4] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
                EVERYTHING
              </span>
              <span className="block text-[#D2DFD4] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
                IS AN
              </span>
              <span className="block text-[#D2DFD4] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
                EXPERIMENT
              </span>
            </h1>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-4 w-full">
              <Button
                href="https://mygateway.io/minting/mad-scientists"
                variant="primary"
                size="lg"
              >
                REVEAL MAD
              </Button>

              <div className="flex flex-row gap-3">
                <Button
                  href="https://coinhall.org/osmosis/osmo12zk0xmacanpz9huy8huth2wee98smf9kktg4lltu9zrk3x9w58aq7k64cz"
                  className="flex-1"
                >
                  TRADE $LAB
                </Button>
                <Button
                  href="https://www.stargaze.zone/m/stars1v8avajk64z7pppeu45ce6vv8wuxmwacdff484lqvv0vnka0cwgdqdk64sf/tokens"
                  className="flex-1"
                >
                  MARKETPLACE
                </Button>
              </div>

              <Button href="https://app.madscientists.io" size="lg">
                MAD APP
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel — Hero GIF */}
        <div className="flex-[2] border border-green overflow-hidden">
          <Image
            src="/images/hero.gif"
            alt="Mad Scientists NFT Collection"
            width={850}
            height={480}
            className="w-full h-full object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
