import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const roles = [
  {
    emoji: "🥽",
    name: "Waste Engineer",
    points: "0 — 1500 points",
    color: "text-[#49F60F]",
  },
  {
    emoji: "🥼",
    name: "Lab Technician",
    points: "1501 — 3000 points",
    color: "text-[#FFB13C]",
  },
  {
    emoji: "🔬",
    name: "Full Professor",
    points: "3001 — 5000 points",
    color: "text-[#3CFFF1]",
  },
  {
    emoji: "🧪",
    name: "Master of Madness",
    points: "5001+ points",
    color: "text-[#FF3CCC]",
  },
];

export default function MadUniversityPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <NavBar />

      <section className="max-w-[1440px] mx-auto">
        {/* Heading */}
        <div className="border border-green p-6 md:p-8 text-center md:text-left">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2DFD4] uppercase tracking-[-1.5px]">
            MAD UNIVERSITY
          </h1>
        </div>

        {/* Overview Card — GIF + Text */}
        <div className="flex flex-col md:flex-row">
          {/* GIF Panel */}
          <div className="md:flex-1 border border-green overflow-hidden">
            <Image
              src="/images/maduni-hero.gif"
              alt="Mad University"
              width={720}
              height={720}
              className="w-full h-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>

          {/* Text Panel */}
          <div className="md:flex-1 border border-green p-6 md:p-8 flex flex-col gap-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-green tracking-wider mb-4 text-center md:text-left">
                OVERVIEW
              </h3>
              <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed">
                Mad University encourages you to create content using the{" "}
                <strong>
                  <em>Research and Reward</em>
                </strong>{" "}
                motto. Whether it be a topic you&apos;re passionate about or a
                sponsored topic for bonus points, you&apos;re encouraged to do
                quality research and report your findings in a fun way!
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-green tracking-wider mb-4 text-center md:text-left">
                EACH X POST MUST CONTAIN
              </h3>
              <div className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed space-y-2 pl-2">
                <p>1. Tagging @madscientists_x</p>
                <p>2. At least 100 characters</p>
                <p>
                  3. Must include an image, video or gif (Users can use{" "}
                  <a
                    href="https://drive.google.com/drive/folders/1hnSMNvvWFUX8V4p5p79ItUjjjE3B6LaW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0cdefa] hover:text-[#067572] transition-colors"
                  >
                    Brand Assets
                  </a>
                  )
                </p>
              </div>
              <p className="font-mono text-[#C2C2C2] text-sm md:text-base leading-relaxed mt-4">
                <strong>
                  Note: the @ must be within the first 300 characters to be
                  captured by the bot
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Two-column: Scoring + Roles left, Discord GIF right */}
        <div className="flex flex-col md:flex-row">
          {/* Left — Scoring + Roles */}
          <div className="flex-1 border border-green p-6 md:p-8 flex flex-col gap-6">
            {/* Scoring */}
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-green tracking-wider text-center md:text-left">
              SCORING
            </h2>

            {/* Scoring rules in bordered box */}
            <div className="border border-green p-4 md:p-6">
              <ul className="font-mono text-[#C2C2C2] text-sm md:text-base leading-relaxed list-disc pl-5 space-y-4">
                <li>
                  3 points per post with a maximum of 1 posts per day
                </li>
                <li>
                  5 bonus points per post when you have signup* Mad Scientists
                  PFP on X
                  <br />
                  <em className="text-xs md:text-sm text-[#A0A0A0]">
                    * You will lose the bonus if you change your PFP. If you
                    change back to a Mad Scientist PFP you must signup again to
                    get the bonus
                  </em>
                </li>
                <li>
                  Each point serves as a raffle ticket to win monthly prizes
                </li>
                <li>
                  2 bonus points per post when you post about the Bonus Topic of
                  the day
                </li>
              </ul>
            </div>

            {/* Roles */}
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-green tracking-wider text-center md:text-left">
              ROLES
            </h2>

            {/* Points header row */}
            <div className="flex items-center justify-between border border-green px-4 py-3">
              <span className="font-mono text-base md:text-lg font-bold text-[#D2DFD4]">
                Possible
              </span>
              <span className="font-mono text-base md:text-lg font-bold text-[#D2DFD4]">
                5474 points in a year
              </span>
            </div>

            {/* Role rows — stacked vertically */}
            <div className="flex flex-col gap-2">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className="flex items-center justify-between py-2"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`font-mono text-base md:text-lg font-bold ${role.color}`}
                    >
                      {role.name}
                    </span>
                    <span className="text-xl">{role.emoji}</span>
                  </span>
                  <span className="font-mono text-[#C2C2C2] text-sm md:text-base">
                    {role.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Discord GIF */}
          <div className="md:w-[45%] border border-green overflow-hidden">
            <Image
              src="/images/maduni-discord.gif"
              alt="Discord Commands"
              width={735}
              height={735}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              unoptimized
            />
          </div>
        </div>

        {/* Discord Command Overview */}
        <div className="border border-green p-6 md:p-8 flex flex-col gap-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-green tracking-wider text-center md:text-left">
            DISCORD COMMAND OVERVIEW
          </h3>

          {/* /signup */}
          <div>
            <h4 className="font-display text-xl md:text-2xl font-bold text-green tracking-wider mb-3">
              /signup
            </h4>
            <ul className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed list-disc pl-6 space-y-1">
              <li>
                Step 1: type command{" "}
                <code className="text-green">/signup</code> and press enter
              </li>
              <li>
                Step 2: type in your X handle without the @ symbol and press
                enter
              </li>
              <li>
                Step 3: type in your NFT ID and press enter (type in 0 if you
                don&apos;t have an MS pfp but wen?!)
              </li>
            </ul>
          </div>

          {/* /connect-to-x */}
          <div>
            <h4 className="font-display text-xl md:text-2xl font-bold text-green tracking-wider mb-3">
              /connect-to-x
            </h4>
            <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed mb-2">
              Optional tool to link your X account to post your MU Badge. Type
              command <code className="text-green">/connect-to-x</code> and
              press enter, this will give you the below prompt:
            </p>
            <ul className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed list-disc pl-6 space-y-1">
              <li>
                Visit the URL provided below logged in with your X Account, and
                authorize this bot.
              </li>
              <li>Save the PIN number returned by X.</li>
              <li>
                Run this bot command again: /connect-to-x, and enter the PIN in
                the bot&apos;s optional parameter.
              </li>
            </ul>
          </div>

          {/* /profile */}
          <div>
            <h4 className="font-display text-xl md:text-2xl font-bold text-green tracking-wider mb-3">
              /profile
            </h4>
            <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed mb-2">
              Type command <code className="text-green">/profile</code> and
              press enter; this will show:
            </p>
            <ul className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed list-disc pl-6 space-y-1">
              <li>Daily Stats button — daily posts left and reset timer</li>
              <li>MU Badge button — show badge</li>
              <li>Leaderboard button — shows top 20 for the month</li>
              <li>Post to X button — to share your MU badge on X</li>
            </ul>
          </div>

          {/* /dropout */}
          <div>
            <h4 className="font-display text-xl md:text-2xl font-bold text-green tracking-wider mb-3">
              /dropout
            </h4>
            <p className="font-mono text-[#C2C2C2] text-base md:text-lg leading-relaxed">
              Type command <code className="text-green">/dropout</code> and
              press enter to leave the Mad University program.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
