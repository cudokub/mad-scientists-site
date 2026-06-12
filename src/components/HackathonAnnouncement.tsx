import Button from "./Button";

const RESOURCES_URL = "https://docs.cosmos.network/hub/latest";

export default function HackathonAnnouncement() {
  return (
    <section data-layer="hackathon-announcement" className="mx-auto max-w-[1440px]">
      <div className="border-x border-b border-green bg-black">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 border-b border-green p-6 md:border-b-0 md:border-r md:p-8">
            <p
              data-layer="hackathon-announcement-label"
              className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan md:text-base"
            >
              Event window · June 15-29
            </p>
            <h2
              data-layer="hackathon-announcement-heading"
              className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-wider text-text md:text-4xl"
            >
              Mad Easy on Cosmos Hackathon
            </h2>
            <p
              data-layer="hackathon-announcement-body"
              className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-text-muted md:text-base"
            >
              Build AI-assisted onchain experiments for games, incentives, and mad science on the
              Cosmos Hub.
            </p>
          </div>

          <div
            data-layer="hackathon-announcement-cta"
            className="flex flex-col justify-center gap-3 bg-hackathon-bg-light p-6 md:w-[340px] md:p-8"
          >
            <Button href="/hackathon" variant="primary" size="lg">
              VIEW HACKATHON
            </Button>
            <Button href={RESOURCES_URL} variant="secondary" size="lg">
              RESOURCES
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
