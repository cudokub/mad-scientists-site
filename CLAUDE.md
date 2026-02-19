# Mad Scientists Site

## Overview
Official website for Mad Scientists NFT collection on Osmosis blockchain. Rebuilt from Framer to self-hosted Next.js. **Live at [madscientists.io](https://madscientists.io)** — Vercel hosting, GitHub auto-deploy from `main`.

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 (theme tokens in `globals.css`)
- Google Fonts: Pixelify Sans (display/headings), Reddit Mono (body/mono)

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
| — | `#D2DFD4` | Headline / nav text (light gray-green) |
| — | `#8E8E8E` | Labels / captions (gray) |
| — | `#141414` | Dark text on primary buttons |

### Typography
- **Headings / buttons / labels:** `font-display` (Pixelify Sans) — always uppercase, `font-bold`, `tracking-wider` or `tracking-[0.05em]`
- **Body / paragraph text:** `font-mono` (Reddit Mono)
- Headline sizes: `text-4xl md:text-5xl lg:text-6xl`

### Layout Rules
- **Max width:** `max-w-[1440px] mx-auto` on every section
- **Borders:** `border border-green` on all panels/sections — this is the core visual identity
- **Padding:** `p-6 md:p-8` inside bordered panels
- **No border-radius** — everything is sharp/square corners
- **Responsive:** Mobile-first. Breakpoint at `md:` (768px). Stacked on mobile, side-by-side on desktop.

### Mobile Patterns
- **Text alignment:** `text-center md:text-left` — center on mobile, left-align on desktop
- **Flex alignment:** `items-center md:items-start` — center content blocks on mobile
- **Nav menu items:** Centered text on mobile dropdown
- **Footer:** Links centered on mobile, left-aligned on desktop. Social icons `justify-center md:justify-start`.
- **General rule:** On mobile, center everything for a cleaner, app-like feel.

## Components
- **`Button`** — 3 variants (`primary`/`secondary`/`ghost`), 3 sizes (`sm`/`md`/`lg`). Auto-detects external links. `className="flex-1"` for side-by-side pairs.
- **`NavBar`** — Grid-cell layout with `border-l` dividers. Do NOT use Button here.
- **`Footer`** — 5-col link grid + social icons. Uses inline `<a>` tags, not Button.
- **`Hero`** — Two-column hero (text left, GIF right). Homepage only.
- **`Ticker`** — `"gateway"` / `"stargaze"` variants. Homepage only. 60s seamless loop.
- **`BlockchainSection`** — 3-column info grid with circular icon avatars.

## Pages
`/` (homepage), `/revealinfo`, `/maduniversity`, `/scienceclubs`, `/snapshot`

### Key Layout Patterns
```tsx
// Page wrapper
<main className="min-h-screen overflow-hidden">
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

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (always verify before deploy)
- `npm run lint` — ESLint
