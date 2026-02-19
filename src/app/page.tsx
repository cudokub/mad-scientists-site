import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import BlockchainSection from "@/components/BlockchainSection";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <NavBar />
      <Ticker variant="gateway" />
      <Hero />
      <Ticker variant="stargaze" />
      <BlockchainSection />
      <Footer />
    </main>
  );
}
