import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ScienceClubsPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <NavBar />

      <section className="max-w-[1440px] mx-auto">
        {/* Heading */}
        <div className="border border-green p-6 md:p-8 text-center md:text-left">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2DFD4] uppercase tracking-[-1.5px]">
            SCIENCE CLUBS
          </h1>
        </div>

        {/* Content — image left, text right */}
        <div className="flex flex-col md:flex-row">
          {/* Image Panel */}
          <div className="md:flex-1 border border-green bg-[rgba(85,212,53,0.12)] overflow-hidden">
            <Image
              src="/images/scienceclubs-hero.png"
              alt="Science Clubs"
              width={2000}
              height={1100}
              className="w-full h-full object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Card */}
          <div className="md:flex-1 border border-green p-6 md:p-8 flex flex-col gap-8">
            {/* Overview */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-green tracking-wider mb-4 text-center md:text-left">
                OVERVIEW
              </h3>
              <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed">
                Mad Scientists, Have you ever dreamed of joining a science club?
                (don&apos;t answer that) We&apos;d like you to create your own
                clubs based on Mad Scientists traits. Like mice trait, how about
                a Mouse club?
              </p>
            </div>

            {/* Why create a club? */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-green tracking-wider mb-4 text-center md:text-left">
                Why create a club?
              </h3>
              <ul className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed list-disc pl-6 space-y-2">
                <li>Special discord role, and gated chat room</li>
                <li>Look cool amongst your peers</li>
                <li>Grants 👀</li>
                <li>Even get featured on the official MS website</li>
              </ul>
            </div>

            {/* Protocol to create a club */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-green tracking-wider mb-4 text-center md:text-left">
                Protocol to create a club
              </h3>
              <ul className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed list-disc pl-6 space-y-2">
                <li>Find 10 Mad Scientists frens to start a club.</li>
                <li>
                  Pick an MS trait for your club (or combination of traits),
                  find a name for your club, mission statement and open a ticket
                  to share with us.
                </li>
              </ul>
              <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed mt-4">
                The more creative you get, i.e starting an X for your club,
                doing mad experiments, etc... the more likely you are to receive
                a grant for your club.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
