import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ShowcaseGallery from "@/components/hackathon/ShowcaseGallery";
import { showcaseEntries } from "@/lib/hackathon/showcase";

export const metadata: Metadata = {
  title: "Mad Easy on Cosmos Showcase Archive | Mad Scientists",
  description:
    "Browse Mad Easy on Cosmos hackathon submissions, announced winners, demos, teams, Cosmos Hub connections, and AI usage notes.",
  openGraph: {
    type: "website",
    title: "Mad Easy on Cosmos Showcase Archive | Mad Scientists",
    description:
      "An archive gallery for Mad Easy on Cosmos hackathon submissions, announced winners, and experiments.",
    images: ["/images/hackathon/announcement-clean.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mad Easy on Cosmos Showcase Archive | Mad Scientists",
    description:
      "Browse the Mad Easy on Cosmos submission gallery and announced winner results.",
    images: ["/images/hackathon/announcement-clean.png"],
  },
  alternates: {
    canonical: "/hackathon/showcase",
  },
};

export default function HackathonShowcasePage() {
  const awardedCount = showcaseEntries.filter((entry) => entry.award).length;
  const projectTypeCount = new Set(showcaseEntries.map((entry) => entry.projectType)).size;

  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-hackathon-bg text-hackathon-text">
      <NavBar theme="hackathon" />

      <section className="mx-auto max-w-[1440px]" data-layer="hackathon-showcase-hero">
        <div className="grid grid-cols-1 border border-hackathon bg-black lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="border-b border-hackathon p-6 md:p-8 lg:border-b-0 lg:border-r">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan md:text-base">
              Mad Easy on Cosmos / Project Gallery
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wider text-white md:text-5xl lg:text-6xl">
              Showcase Archive
            </h1>
            <p className="mt-4 max-w-3xl font-mono text-base leading-relaxed text-hackathon-text-muted md:text-lg">
              Browse every submitted experiment from the Mad Easy on Cosmos hackathon. Announced
              winners are marked as results go live, while the full project catalog stays open for
              demos, repositories, team notes, and Cosmos Hub signals.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hackathon"
                className="flex min-h-[44px] items-center justify-center border border-hackathon bg-hackathon px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-hackathon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon md:text-base"
              >
                Back To Hackathon
              </Link>
              <a
                href="#archive-wall"
                className="flex min-h-[44px] items-center justify-center border border-hackathon bg-black px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan transition-colors hover:bg-hackathon/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon md:text-base"
              >
                Browse Projects
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-hackathon-bg-light">
            <div className="border-b border-r border-hackathon p-5">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-hackathon-cyan">
                Records
              </p>
              <p className="mt-2 font-mono text-3xl font-bold text-white">
                {showcaseEntries.length}
              </p>
            </div>
            <div className="border-b border-hackathon p-5">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-hackathon-cyan">
                Winners
              </p>
              <p className="mt-2 font-mono text-3xl font-bold text-white">{awardedCount}</p>
            </div>
            <div className="border-r border-hackathon p-5">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-hackathon-cyan">
                Types
              </p>
              <p className="mt-2 font-mono text-3xl font-bold text-white">{projectTypeCount}</p>
            </div>
            <div className="p-5">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-hackathon-cyan">
                Next
              </p>
              <p className="mt-2 font-mono text-sm font-bold uppercase leading-tight text-white">
                Top Two Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <div id="archive-wall">
        <ShowcaseGallery entries={showcaseEntries} />
      </div>

      <Footer theme="hackathon" />
    </main>
  );
}
