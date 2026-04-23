import Link from "next/link";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import BlockchainSection from "@/components/BlockchainSection";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import CosmicBanner from "@/components/CosmicBanner";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <CosmicBanner />
      <NavBar />
      {/* TODO: Restore after COSMIC campaign ends — see docs/COSMIC-CAMPAIGN.md */}
      {/* <Ticker variant="gateway" /> */}
      <Link
        href="/cosmic"
        aria-label="Go to COSMIC page"
        className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cosmic"
      >
        <Ticker variant="cosmic-top" />
      </Link>
      <Hero />
      {/* TODO: Restore after COSMIC campaign ends — see docs/COSMIC-CAMPAIGN.md */}
      {/* <Ticker variant="stargaze" /> */}
      <Link
        href="/cosmic"
        aria-label="Go to COSMIC page"
        className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cosmic"
      >
        <Ticker variant="cosmic-bottom" />
      </Link>
      <BlockchainSection />
      <Footer />
    </main>
  );
}
