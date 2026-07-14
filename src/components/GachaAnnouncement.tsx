import Button from "./Button";

const GACHA_URL = "https://gacha.madscientists.io";
const GAMEPLAY_URL = "https://gacha.madscientists.io/gameplay";

export default function GachaAnnouncement() {
  return (
    <section data-layer="gacha-announcement" className="mx-auto max-w-[1440px]">
      <div className="border-x border-b border-green bg-black">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 border-b border-green p-6 md:border-b-0 md:border-r md:p-8">
            <p
              data-layer="gacha-announcement-label"
              className="font-display text-sm font-bold uppercase tracking-wider text-green md:text-base"
            >
              Now live · Onchain gacha
            </p>
            <h2
              data-layer="gacha-announcement-heading"
              className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-wider text-text md:text-4xl"
            >
              <span className="text-gacha-purple">Mad</span> Gacha
            </h2>
            <p
              data-layer="gacha-announcement-body"
              className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-text-muted md:text-base"
            >
              Load a Scientist, choose your mode, pull the lever. An onchain gacha machine built
              around the Mad Scientists collection.
            </p>
          </div>

          <div
            data-layer="gacha-announcement-cta"
            className="flex flex-col justify-center gap-3 bg-bg p-6 md:w-[340px] md:p-8"
          >
            <Button href={GACHA_URL} variant="primary" size="lg">
              PLAY MAD GACHA
            </Button>
            <Button href={GAMEPLAY_URL} variant="secondary" size="lg">
              HOW IT WORKS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
