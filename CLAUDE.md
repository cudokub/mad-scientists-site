# Mad Scientists Site

## Overview
Official website for Mad Scientists NFT collection on Osmosis blockchain. Rebuilt from Framer to self-hosted Next.js. **Live at [madscientists.io](https://madscientists.io)** — Vercel hosting, GitHub auto-deploy from `main`.

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 (theme tokens in `globals.css`)
- Radix UI Dialog (desktop modals), Vaul (mobile drawer/bottom sheet)
- Google Fonts: Pixelify Sans 400/700 (display/headings), Reddit Mono 400/700 (body/mono)

## Design System

### Aesthetic
**Building block / pixel art grid.** Sharp corners everywhere — no border-radius on panels, buttons, or containers. Bold 1px green borders define every section. Content-first, minimal.

### Colors (Tailwind tokens)
| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#061304` | Page background |
| `green` | `#39f909` | Primary green — borders, text, buttons |
| `green-muted` | `#5cd83d` | Subtle green accents |
| `green-dark` | `#197006` | Dark green |
| `green-light` | `#88e54a` | Hover states |
| `text` | `#D2DFD4` | Headline / nav text (light gray-green) |
| `text-muted` | `#A0A0A0` | Labels / captions (gray — WCAG AA compliant on `bg`) |
| `text-dark` | `#141414` | Dark text on primary buttons |
| `cosmic` | `#9B59F0` | Cosmic purple — COSMIC page borders, accents |
| `cosmic-dark` | `#6B2FB8` | Dark cosmic purple |
| `cosmic-text` | `#f4ecff` | Cosmic headline text |
| `cosmic-text-muted` | `#c9c5d8` | Cosmic secondary text |
| `cosmic-text-dim` | `#b4afc0` | Cosmic tertiary text |
| `cosmic-text-dimmer` | `#8a84a0` | Cosmic quaternary text |
| `cosmic-bg` | `#080612` | Cosmic dark background |
| `cosmic-bg-light` | `#0a0c1d` | Cosmic lighter background |
| `cosmic-cyan` | `#7ed3ff` | Cosmic cyan accent |
| `cosmic-cyan-light` | `#9fe5ff` | Cosmic cyan hover / light accent |

### Typography
- **Headings / buttons / labels:** `font-display` (Pixelify Sans) — always uppercase, `font-bold`, `tracking-wider` or `tracking-[0.05em]`
- **Body / paragraph text:** `font-mono` (Reddit Mono)
- Headline sizes: `text-4xl md:text-5xl lg:text-6xl`

### Layout Rules
- **Max width:** `max-w-[1440px] mx-auto` on every section
- **Borders:** `border border-green` on all panels/sections — this is the core visual identity
- **Padding:** `p-6 md:p-8` inside bordered panels
- **No border-radius** — everything is sharp/square corners
- **Cosmic borders:** Default to `border-cosmic` (100% opacity) across the COSMIC page, NavBar, Footer, and ScientistModal. Use `border-cosmic/40` only for secondary elements (auction lanes, stats cards).
- **Responsive:** Mobile-first. Breakpoint at `md:` (768px). Stacked on mobile, side-by-side on desktop.

### Layer Naming (`data-layer`)
Elements use `data-layer="section-element"` attributes for designer-developer coordination. When adding new sections, name layers for easy reference (e.g., `data-layer="hero-mobile-logo"`). Named sections: `hero`, `auction`.

### Mobile Patterns
- **Text alignment:** `text-center md:text-left` — center on mobile, left-align on desktop
- **Flex alignment:** `items-center md:items-start` — center content blocks on mobile
- **Nav menu items:** Centered text on mobile dropdown
- **Footer:** Links centered on mobile, left-aligned on desktop. Social icons `justify-center md:justify-start`.
- **General rule:** On mobile, center everything for a cleaner, app-like feel.

## Components
- **`Button`** — 4 variants (`primary`/`secondary`/`ghost`/`cosmic-primary`), 3 sizes (`sm`/`md`/`lg`). Supports `theme="cosmic"` for cosmic-themed styles. `href` is optional — when provided, renders as `<Link>` or `<a>` (auto-detects external links); when omitted, renders as `<button>` with `onClick` handler. Also supports `disabled` and `type` props. `className="flex-1"` for side-by-side pairs.
- **`NavBar`** — Grid-cell layout with `border-l` dividers. Do NOT use Button here.
- **`Footer`** — 5-col link grid + social icons. Uses inline `<a>` tags, not Button.
- **`Hero`** — Two-column hero (text left, GIF right). Homepage only.
- **`Ticker`** — `"gateway"` / `"stargaze"` / `"cosmic-top"` / `"cosmic-bottom"` variants. 60s seamless loop. Cosmic variants use `border-cosmic`, `text-cosmic`, Silkscreen font for "5", borderless height-fit icons.
- **`BlockchainSection`** — 3-column info grid with circular icon avatars.
- **`Dialog`** (`src/components/ui/dialog.tsx`) — Radix UI Dialog wrapper. Used for desktop modals (≥640px). Flex-centered overlay with cosmic styling.
- **`Drawer`** (`src/components/ui/drawer.tsx`) — Vaul Drawer wrapper. Used for mobile modals (<640px). Bottom sheet with drag handle, swipe-to-close.
- **`useMediaQuery`** (`src/lib/hooks/useMediaQuery.ts`) — SSR-safe media query hook. Used to switch between Dialog and Drawer.
- **`ScientistModal`** (`src/components/cosmic/ScientistModal.tsx`) — Extracted cosmic gallery modal. Dynamically imported (`ssr: false`) to avoid bundling on initial page load.
- **`AuctionProcessSvg`** (`src/components/cosmic/AuctionProcessSvg.tsx`) — Inline SVG auction infographic (4 square 1:1 panels). Pixel art style: square dot grid, sharp corners, blocky arrowheads. Square-cropped halfbody PFPs. Supports `panel` prop (1–4) for viewBox cropping to render a single panel. Rendered inline so SVG `<image>` tags can load external assets.
- **`CountdownTimer`** (`src/components/cosmic/auction/CountdownTimer.tsx`) — Countdown display with `size="sm"` (cards) and `size="lg"` (detail page). Warning red when < 5 min. Uses `useCountdown` hook.
- **`AuctionStatusBadge`** (`src/components/cosmic/auction/AuctionStatusBadge.tsx`) — Status pill: LIVE (pulsing dot), ENDING SOON, UPCOMING, ENDED.
- **`AuctionCard`** (`src/components/cosmic/auction/AuctionCard.tsx`) — Clickable `<Link>` card for auction overview. Shows scientist image, timer, highest bid, bid count.
- **`BidPlacementFlow`** (`src/components/cosmic/auction/BidPlacementFlow.tsx`) — Multi-step bid modal (connect → select NFTs → confirm → result). Uses Dialog/Drawer responsive pattern. Dynamically imported (`ssr: false`).
- **`useCountdown`** (`src/lib/hooks/useCountdown.ts`) — Returns `{ days, hours, minutes, seconds, isExpired, isEndingSoon }` from a target `endTime`. Drift-free (recalculates from `Date.now()` each tick).

## Performance Practices
- **Page metadata:** Every page has its own `layout.tsx` with title, description, OG, Twitter card metadata, and `alternates.canonical` (required because pages use `"use client"`). Root layout has `metadataBase: new URL("https://madscientists.io")`.
- **Hero images:** Add `priority` to above-the-fold images for faster LCP. Add `sizes` prop to all `<Image>` components for responsive serving.
- **Images in flex containers:** Use `width`/`height` props (not `fill`) to keep images in document flow. `fill` makes the image absolutely positioned, causing flex containers to collapse height. Pattern: `<Image width={W} height={H} className="w-full h-full object-cover" />`.
- **Animated GIFs:** Keep `unoptimized` (Next.js strips animation otherwise). Still add `priority` and `sizes`.
- **Ticker:** `will-change: transform` in `globals.css` for GPU-accelerated animation.
- **Modal code splitting:** Interaction-only components (ScientistModal) use `next/dynamic` with `ssr: false`.

## SEO
- **Sitemap:** `src/app/sitemap.ts` — auto-generates `/sitemap.xml` for all public pages (excludes `/cosmic`).
- **Robots:** `src/app/robots.ts` — auto-generates `/robots.txt`. Blocks `/cosmic` (unlisted).
- **JSON-LD:** Organization schema in root layout (`<script type="application/ld+json">`).
- **Heading hierarchy:** Every page must have exactly one `<h1>`. Sub-sections use `<h2>` → `<h3>` → `<h4>`.

## Accessibility
- **Skip link:** Root layout has a skip-to-content link. Every page's `<main>` must have `id="main-content"`.
- **Reduced motion:** `globals.css` has `@media (prefers-reduced-motion: reduce)` that disables all animations.
- **Focus styles:** All interactive elements use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green`.
- **Contrast:** Gray caption text is `#A0A0A0` (6.3:1 on `#061304`). Never use `#8E8E8E` or darker grays for text.
- **Touch targets:** Interactive elements must be at least 44x44px on mobile. Use `min-w-[44px] min-h-[44px]` on icon links.
- **aria-labels:** Required on icon-only links (e.g., social icons in Footer).

## Security
- **Headers:** Configured in `next.config.ts` via `headers()` — X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy.

## Error Pages
- `src/app/not-found.tsx` — custom 404 page (branded).
- `src/app/error.tsx` — global error boundary with retry button.

## Pages
`/` (homepage), `/revealinfo`, `/maduniversity`, `/scienceclubs`, `/snapshot`, `/cosmic` (unlisted), `/cosmic/auction` (unlisted), `/cosmic/auction/[slug]` (unlisted)

### COSMIC Page (`/cosmic`)
Special edition showcase for the 5-piece COSMIC / Mad Scientists 1/1 collection. Uses cosmic purple (`border-cosmic`) instead of green for borders and accents. Currently **unlisted** — no nav/footer links (commented out, ready to uncomment), accessible only via direct URL. `"use client"` page with interactive state (modal, back-to-top button). `scroll-smooth` on main element for anchor link smooth scrolling. Back-to-top button appears after scrolling 600px (fixed bottom-right, cosmic styled).

**Sections (top to bottom):**
- **Ticker (top)** — cosmic-top variant ("THE COSMOS CALLED")
- **Hero** — Mobile: logo panel + stacked image/content card. Desktop: two-panel layout (image flex-[2] right, text flex-1 left via `flex-row-reverse`). Hero image uses `width`/`height` (not `fill`) to stay in document flow — avoids flex container height collapse.
- **Ticker (bottom)** — cosmic-bottom variant ("THE COSMOS CALLED")
- **Collection** — intro text + responsive grid (2-col mobile, 3-col tablet, 5-col desktop). Cards show scientist name and tagline permanently below the image. Hover: border glow + subtle image zoom (no translate-y lift, no slide-up overlay). Cards are clickable, open detail modal. Uses halfbody-v2 images for cards.
- **Auction** — "Send Your Scientists. Claim the Five." headline. Order: 4-step how-it-works (horizontal cards: SVG panel left, text right, 2-col grid), CTA box with branded Stargaze badge (side-by-side on desktop, `border-l` divider), 5 parallel auction lanes.

**Scientist detail modal** — responsive Dialog/Drawer pattern (matches app.madscientists.io). Desktop (≥640px): Radix Dialog centered overlay, side-by-side layout (full-body art left, info 360px right), prev/next arrows on overlay sides. Mobile (<640px): Vaul Drawer bottom sheet with drag handle, swipe-to-close, stacked layout, prev/next buttons at bottom. Both: keyboard arrow keys for prev/next, Escape to close, shows name, tagline, lore paragraph.

**Data model:** Each scientist has `id`, `name`, `slug`, `lane`, `src`, `fullSrc`, `tagline`, `lore`. Defined in `src/lib/auction/constants.ts` (single source of truth, shared by cosmic page and auction pages). `src` uses `cosmic-N-halfbody-v2.png` (gallery cards), `fullSrc` uses `cosmic-N-fullbody.png` (modal).

**Launch planning:** See `docs/COSMIC-CAMPAIGN.md` for the 10-day content plan, asset checklist, and site change tracker.

### COSMIC Auction Pages (`/cosmic/auction`, `/cosmic/auction/[slug]`)
Auction UI for the 5 COSMIC 1/1 NFT auctions. Built with mock data layer — swap `src/lib/auction/api.ts` to wire up real CosmWasm contract. Currently unlisted (under `/cosmic` robots block).

- **Overview** (`/cosmic/auction`) — 5-card grid showing all auctions. Each card: scientist image, countdown timer, highest bid, total bids. Polls every 15s. Links back to `/cosmic`.
- **Detail** (`/cosmic/auction/[slug]`) — Two-column layout (fullbody image left, auction info right). Countdown timer, highest bid panel, user bid status, bid history table, prev/next scientist navigation. Bid placement via multi-step Dialog/Drawer modal (`BidPlacementFlow`).
- **Data layer** (`src/lib/auction/`) — `types.ts`, `constants.ts`, `mock-data.ts`, `api.ts`. Mock mode gated by `NEXT_PUBLIC_AUCTION_MOCK` env var (defaults to mock).
- **Slugs:** `the-architect`, `the-warlord`, `the-oracle`, `the-antiquarian`, `the-dreamer`

### Key Layout Patterns
```tsx
// Page wrapper
<main id="main-content" className="min-h-screen overflow-hidden">
  <NavBar />
  {/* Sections */}
  <Footer />
</main>

// Section
<section className="max-w-[1440px] mx-auto">
  <div className="border border-green p-6 md:p-8">{/* Content */}</div>
</section>

// Two-column (GIF + text) — used on revealinfo, maduniversity
<div className="flex flex-col md:flex-row">
  <div className="md:w-[45%] border border-green overflow-hidden">{/* GIF */}</div>
  <div className="flex-1 border border-green p-6 md:p-8 flex flex-col gap-6">{/* Text */}</div>
</div>
```

Always use `target="_blank" rel="noopener noreferrer"` for external links. Button handles this automatically.

## Reference Docs
- `docs/ASSETS.md` — Full image/favicon inventory
- `docs/COSMIC-CAMPAIGN.md` — COSMIC 10-day launch plan, asset checklist, tweet copy drafts, campaign strategy, success metrics
- `docs/DESIGN-SYSTEM-AUDIT.md` — Design system audit (score: 95/100, 1 open item)
- `docs/HOMEPAGE-HANDOFF.md` — Homepage component specs and layout reference

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (always verify before deploy)
- `npm run lint` — ESLint
