# Mad Scientists Site

Official website for the [Mad Scientists](https://madscientists.io) NFT collection on the Osmosis blockchain. Rebuilt from Framer to self-hosted Next.js.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Fonts: Pixelify Sans (display), Reddit Mono (body)

## Pages

- `/` — Homepage with hero, tickers, blockchain info
- `/revealinfo` — Reveal process guide, trade links, tokenomics
- `/maduniversity` — Scoring system, roles, Discord commands
- `/scienceclubs` — Community clubs overview
- `/snapshot` — Chain snapshot downloads (Stargaze + Osmosis)
- `/cosmic` — COSMIC special edition showcase (unlisted, 5 hand-crafted 1/1s)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Auto-deploys to Vercel on push to `main`. Domain: [madscientists.io](https://madscientists.io).
