import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

interface ChainCardProps {
  name: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  description: string;
  downloadUrl: string;
}

function ChainCard({
  name,
  icon,
  iconWidth,
  iconHeight,
  description,
  downloadUrl,
}: ChainCardProps) {
  return (
    <div className="flex-1 border border-green p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-[75px] h-[75px] border border-green flex items-center justify-center shrink-0">
          <Image
            src={icon}
            alt={name}
            width={iconWidth}
            height={iconHeight}
            className="w-[50px] h-[50px] object-contain"
          />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-[#D2DFD4] tracking-wider">
          {name}
        </h3>
      </div>
      <p className="font-mono text-[#A0A0A0] text-base md:text-lg leading-relaxed">
        {description}
      </p>
      <Button href={downloadUrl} size="lg">
        DOWNLOAD
      </Button>
    </div>
  );
}

export default function SnapshotPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <NavBar />

      <section className="max-w-[1440px] mx-auto">
        {/* Heading */}
        <div className="border border-green p-6 md:p-8 text-center md:text-left">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2DFD4] uppercase tracking-[-1.5px]">
            HOLDERS SNAPSHOT
          </h1>
          <p className="font-mono text-[#A0A0A0] text-base md:text-lg mt-3 leading-relaxed">
            The snapshot is taken everyday at 2am CET
          </p>
        </div>

        {/* Chain Cards */}
        <div className="flex flex-col md:flex-row">
          <ChainCard
            name="Stargaze"
            icon="/images/stargaze-chain.svg"
            iconWidth={150}
            iconHeight={150}
            description="List of all owners converted to STARS addresses"
            downloadUrl="https://www.eleiton.dev/api/madscientists/snapshot?chain=stars&output=csv"
          />
          <ChainCard
            name="Osmo"
            icon="/images/osmosis-chain.png"
            iconWidth={200}
            iconHeight={200}
            description="List of all owners converted to OSMO addresses"
            downloadUrl="https://www.eleiton.dev/api/madscientists/snapshot?chain=osmo&output=csv"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
