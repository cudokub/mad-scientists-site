import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const scientists = [
  { id: 1, name: "The Architect", src: "/images/cosmic-1.png" },
  { id: 2, name: "The Warlord", src: "/images/cosmic-2.png" },
  { id: 3, name: "The Oracle", src: "/images/cosmic-3.png" },
  { id: 4, name: "The Antiquarian", src: "/images/cosmic-4.png" },
  { id: 5, name: "The Dreamer", src: "/images/cosmic-5.png" },
];

export default function CosmicPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <NavBar />

      <section className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <div
          className="border border-cosmic p-8 md:p-12 flex flex-col items-center gap-6"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0a0618 50%, #061304 100%)",
          }}
        >
          <Image
            src="/images/cosmic-logo.png"
            alt="COSMIC Mad Scientists"
            width={600}
            height={200}
            className="w-[280px] md:w-[420px] lg:w-[520px] h-auto"
            priority
          />
          <p className="font-display text-lg md:text-2xl text-cosmic tracking-wider uppercase">
            5 Scientists. Infinite Universe.
          </p>
        </div>

        {/* Gallery */}
        <div className="border border-cosmic p-6 md:p-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-cosmic tracking-wider mb-6 text-center">
            THE COLLECTION
          </h3>

          {/* Top row: 3 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {scientists.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="border border-cosmic cosmic-glow overflow-hidden group relative"
              >
                <Image
                  src={s.src}
                  alt={s.name}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[rgba(10,6,24,0.85)] py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-display text-sm md:text-base text-cosmic tracking-wider text-center uppercase">
                    {s.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row: 2 centered */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
            <div className="hidden md:block" />
            {scientists.slice(3, 5).map((s) => (
              <div
                key={s.id}
                className="border border-cosmic cosmic-glow overflow-hidden group relative"
              >
                <Image
                  src={s.src}
                  alt={s.name}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[rgba(10,6,24,0.85)] py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-display text-sm md:text-base text-cosmic tracking-wider text-center uppercase">
                    {s.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col md:flex-row">
          {/* Potion bottle */}
          <div className="md:w-[35%] border border-cosmic p-8 flex items-center justify-center bg-[#0a0618]">
            <Image
              src="/images/cosmic-symbol.png"
              alt="Cosmic Potion"
              width={400}
              height={400}
              className="w-[180px] md:w-[240px] h-auto"
            />
          </div>

          {/* Text */}
          <div className="flex-1 border border-cosmic p-6 md:p-8 flex flex-col gap-6 items-center md:items-start">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-cosmic tracking-wider text-center md:text-left">
              BEYOND THE LAB
            </h3>
            <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed text-center md:text-left">
              COSMIC is a special edition of 5 hand-crafted 1/1 Mad Scientists.
              Each piece takes a scientist beyond the lab and into the cosmos —
              with unique cosmic gear, celestial backgrounds, and individual
              character identity.
            </p>
            <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed text-center md:text-left">
              Not generative. Not random. Each one is a standalone work of pixel
              art, designed to push the Mad Scientists universe further than
              it&apos;s ever gone.
            </p>
            <p className="font-display text-sm text-cosmic/60 tracking-wider uppercase text-center md:text-left">
              Everything is an Experiment — Even the Cosmos
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
