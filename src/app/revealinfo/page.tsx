import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

const tradeLinks = [
  {
    name: "Osmosis",
    icon: "/images/osmosis-dex.png",
    href: "https://app.osmosis.zone/?from=OSMO&to=LAB",
  },
  {
    name: "Coinhall",
    icon: "/images/coinhall-icon.png",
    href: "https://coinhall.org/osmosis/osmo12zk0xmacanpz9huy8huth2wee98smf9kktg4lltu9zrk3x9w58aq7k64cz",
  },
  {
    name: "TFM",
    icon: "/images/tfm-icon.png",
    href: "https://tfm.com/osmosis/trade/protrade?from=uosmo&to=factory%2Fosmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n%2FLAB&market=Whitewhale",
  },
];

const stats = [
  { value: "100,000", label: "$LAB SUPPLY" },
  { value: "10,000", label: "NFTs SUPPLY" },
  { value: "10 $LAB", label: "TO MINT" },
];

const tokenomics = [
  { allocation: "Streamswap Pool", percentage: "75%" },
  { allocation: "Rekt Gang community", percentage: "9%" },
  { allocation: "Backbone Labs community", percentage: "9%" },
  {
    allocation: "Builders, content creators and infrastructure providers",
    percentage: "4.5%",
  },
  { allocation: "Liquidity Pool", percentage: "2.5%" },
];

export default function RevealInfoPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <NavBar />

      <section className="max-w-[1440px] mx-auto">
        {/* Heading */}
        <div className="border border-green p-6 md:p-8 text-center md:text-left">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2DFD4] uppercase tracking-[-1.5px]">
            REVEAL INFO
          </h2>
        </div>

        {/* Two-column: GIF left, content right */}
        <div className="flex flex-col md:flex-row">
          {/* Left — Hero GIF */}
          <div className="md:w-[45%] border border-green overflow-hidden">
            <Image
              src="/images/revealinfo-hero.gif"
              alt="Mad Scientists Reveal"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              unoptimized
            />
          </div>

          {/* Right — How to Reveal + Trade + Reveal */}
          <div className="flex-1 border border-green p-6 md:p-8 flex flex-col gap-6 items-center md:items-start">
            {/* How to Reveal heading in bordered box */}
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#D2DFD4] tracking-[-1.5px] border border-green px-4 py-2 text-center md:text-left">
              How To Reveal{" "}
              <span className="text-[#00FF26]">Mad Scientists?</span>
            </h3>

            <p className="font-display text-xl md:text-2xl text-[#909991] text-center md:text-left">
              Use <span className="text-green font-bold">10</span>{" "}
              <span className="text-[#00FF26]">$LAB</span> to reveal{" "}
              <span className="text-green font-bold">1</span>{" "}
              <span className="text-[#00FF26]">MAD NFT</span>
            </p>

            <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed text-center md:text-left">
              Use 10 $LAB tokens to reveal 1 Mad Scientist NFT. You will then be
              able to trade your NFTs on the marketplace. You can also choose to
              hold onto your $LAB tokens as unrevealed NFTs and trade it.
            </p>

            {/* Trade $LAB */}
            <div className="w-full">
              <h4 className="font-display text-lg md:text-xl font-bold text-[#D2DFD4] tracking-wider mb-3 text-center md:text-left">
                TRADE <span className="text-[#00FF26]">$LAB</span>
              </h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {tradeLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-green px-4 py-2 hover:bg-[rgba(85,212,53,0.12)] transition-colors"
                  >
                    <Image
                      src={link.icon}
                      alt={link.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-display text-sm font-bold text-green tracking-wider">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Reveal MAD */}
            <div className="w-full">
              <h4 className="font-display text-lg md:text-xl font-bold text-[#D2DFD4] tracking-wider mb-3 text-center md:text-left">
                REVEAL <span className="text-[#00FF26]">MAD</span>
              </h4>
              <div className="flex justify-center md:justify-start">
                <a
                  href="https://mygateway.io/minting/mad-scientists"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-green px-4 py-2 hover:bg-[rgba(85,212,53,0.12)] transition-colors"
                >
                  <Image
                    src="/images/gateway-logo.jpg"
                    alt="Gateway"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-display text-sm font-bold text-green tracking-wider">
                    Gateway
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-green p-6 md:p-8 text-center"
            >
              <p className="font-mono text-2xl md:text-3xl font-bold text-green mb-2">
                {stat.value}
              </p>
              <p className="font-display text-sm md:text-base text-[#8E8E8E] tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column: Story + Tokenomics left, Bottom GIF right */}
        <div className="flex flex-col md:flex-row">
          {/* Left — Story + Tokenomics */}
          <div className="flex-1 border border-green p-6 md:p-8 flex flex-col gap-6">
            {/* Story heading */}
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#D2DFD4] tracking-[-1.5px] text-center md:text-left">
              The Story of{" "}
              <span className="text-[#00FF26]">$LAB</span> Tokens
            </h2>

            {/* Story items in bordered box with bullet points */}
            <div className="border border-green p-4 md:p-6">
              <ul className="font-mono text-[#C2C2C2] text-sm md:text-base leading-relaxed list-disc pl-5 space-y-4">
                <li>
                  <strong className="text-[#D2DFD4]">A Fair Launch:</strong> The
                  event was marked by the absence of whitelists (WLs), no bots
                  and no lock, ensuring an equitable opportunity for all
                  interested parties.
                </li>
                <li>
                  <strong className="text-[#D2DFD4]">
                    Preparation for the Launch:
                  </strong>{" "}
                  Participants were given a 52.91-hour window to deposit $OSMO
                  into a pool on{" "}
                  <a
                    href="https://app.streamswap.io/stream/OSMO/8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0cdefa] hover:text-[#067572] transition-colors"
                  >
                    Streamswap
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-[#D2DFD4]">
                    The Swap Process:
                  </strong>{" "}
                  After the initial deposit period, $OSMO was converted into
                  $LAB tokens over an additional hour, allowing for a smooth
                  transition and fair distribution.
                </li>
              </ul>
            </div>

            {/* Tokenomics */}
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#D2DFD4] tracking-[-1.5px] text-center md:text-left">
              <span className="text-[#00FF26]">$LAB</span> Tokenomics
            </h2>

            {/* Supply header row */}
            <div className="flex items-center justify-between border border-green px-4 py-3">
              <span className="font-mono text-base md:text-lg font-bold text-[#D2DFD4]">
                SUPPLY
              </span>
              <span className="font-mono text-base md:text-lg font-bold text-[#D2DFD4]">
                100,000 $LAB
              </span>
            </div>

            {/* Distribution rows */}
            <div className="flex flex-col">
              {tokenomics.map((item) => (
                <div
                  key={item.allocation}
                  className="flex items-center justify-between border-b border-green/30 py-3"
                >
                  <span className="font-mono text-[#C2C2C2] text-sm md:text-base">
                    {item.allocation}
                  </span>
                  <span className="font-mono text-green font-bold text-sm md:text-base shrink-0 ml-4">
                    {item.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bottom GIF */}
          <div className="md:w-[45%] border border-green overflow-hidden">
            <Image
              src="/images/revealinfo-bottom.gif"
              alt="Mad Scientists"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
