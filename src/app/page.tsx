import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import BlockchainSection from "@/components/BlockchainSection";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import CosmicShowcase from "@/components/CosmicShowcase";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <NavBar />
      <Ticker
        variant="gateway"
        href="https://mygateway.io/minting/mad-scientists"
        ariaLabel="Reveal Mad Scientists on Gateway"
      />
      <Hero />
      <Ticker
        variant="stargaze"
        href="https://stargaze.zone/m/cosmos1dhc08f4n6ulzqtncrsue0uk2g5fr2wxp7qc56vcfcdsy3jqzhdts4a0yuf"
        ariaLabel="Buy Mad Scientists on Stargaze"
      />
      <CosmicShowcase />
      <BlockchainSection />
      <Footer />
    </main>
  );
}
