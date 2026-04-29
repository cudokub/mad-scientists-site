import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const COSMIC_MARKETPLACE_URL =
  "https://stargaze.zone/m/cosmos1szgwggzmxsda8na7pm0t74ypngv8qqzj0dqerazm2xe8432vymmqzyahh9";

export default function CosmicShowcase() {
  return (
    <section data-layer="cosmic-showcase" className="max-w-[1440px] mx-auto">
      <div className="border border-green p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <Link
            data-layer="cosmic-showcase-image"
            href="/cosmic"
            aria-label="View the COSMIC collection"
            className="group block aspect-[21/9] overflow-hidden border border-green bg-[#0a1305] transition duration-300 hover:border-green-light hover:shadow-[0_10px_30px_rgba(57,249,9,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green md:flex-1"
          >
            <Image
              src="/images/cosmic-hero-2026-v4.png"
              alt="The COSMIC five Mad Scientists lineup"
              width={1376}
              height={768}
              sizes="(max-width: 767px) 100vw, 60vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </Link>

          <div
            data-layer="cosmic-showcase-content"
            className="flex flex-col items-center gap-3 text-center md:flex-1 md:items-start md:text-left"
          >
            <span
              data-layer="cosmic-showcase-label"
              className="font-display text-sm tracking-wider text-text-muted"
            >
              COSMIC
            </span>
            <h2
              data-layer="cosmic-showcase-heading"
              className="font-display text-3xl uppercase tracking-wide text-text md:text-4xl"
            >
              The 1/1 Five
            </h2>
            <p
              data-layer="cosmic-showcase-body"
              className="font-mono text-sm leading-relaxed text-text-muted"
            >
              Five hand-crafted 1/1 Mad Scientists who answered the Cosmos&apos;
              call.
            </p>
            <div
              data-layer="cosmic-showcase-cta"
              className="mt-2 flex w-full flex-col gap-3"
            >
              <Button href="/cosmic" variant="primary" size="lg">
                Meet the Five
              </Button>
              <Button
                href={COSMIC_MARKETPLACE_URL}
                variant="secondary"
                size="lg"
              >
                Buy on Stargaze
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
