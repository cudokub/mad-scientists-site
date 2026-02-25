# Handoff Spec: Homepage (`/`)

> **Purpose:** Future reference documentation for maintaining and extending the Mad Scientists homepage.
> **Last updated:** 2026-02-25
> **Live URL:** [madscientists.io](https://madscientists.io)

---

## Overview

The homepage is the primary landing page for the Mad Scientists NFT collection on Osmosis blockchain. It serves three goals: brand introduction (hero), driving users to key actions (reveal, trade, marketplace), and showcasing the blockchain ecosystem (info grid). The page is entirely static with no client-side state — only the NavBar uses `"use client"` for the mobile menu toggle.

**Component render order:**

```
<main id="main-content">
  NavBar
  Ticker (variant="gateway")
  Hero
  Ticker (variant="stargaze")
  BlockchainSection
  Footer
</main>
```

---

## Layout

**Page wrapper:** `min-h-screen overflow-hidden` on `<main id="main-content">`.

**Max width constraint:** Every section uses `max-w-[1440px] mx-auto` to center content and cap width. This is applied at the section level, not the page level.

**No global padding** — each section manages its own internal padding via `p-6 md:p-8` inside bordered panels.

**Stacking model:** All sections stack vertically with no gaps between them. Borders on adjacent sections share edges visually (no doubled borders because each section has its own `border` which creates the grid-line look).

**Border thickness:** Tailwind's `border` class applies `1px solid` by default. The only exception is BlockchainSection icon avatars which use `border-2` (2px).

---

## Design Tokens Used

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#061304` | Page background (set on `<body>`) |
| `green` | `#39f909` | Primary — borders, ticker text, button fills, links |
| `green-muted` | `#5cd83d` | Subtle green accents |
| `green-dark` | `#197006` | Dark green |
| `green-light` | `#88e54a` | Hover states on links/borders |
| `text` | `#D2DFD4` | Headlines, nav text (light gray-green) |
| `text-muted` | `#A0A0A0` | Labels, captions (6.3:1 contrast on `bg`) |
| `text-dark` | `#141414` | Text on primary (filled green) buttons |

### Typography

| Token | Font | Usage |
|-------|------|-------|
| `font-display` | Pixelify Sans 400/700 | Headings, buttons, labels, nav links — always `uppercase`, `font-bold`, `tracking-wider` or `tracking-[0.05em]` |
| `font-mono` | Reddit Mono 400/700 | Body text, paragraphs (not used on homepage currently) |

### Spacing

| Pattern | Value | Usage |
|---------|-------|-------|
| Section padding | `p-6` (mobile) / `p-8` (desktop) | Inside all bordered panels |
| Button gap | `gap-3` | Between stacked/side-by-side buttons |
| Content gap | `gap-4` | Between headline and button group in Hero |
| Ticker item gap | `gap-4 mx-8` | Between text/icon within each ticker item |

---

## Components

### NavBar

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `theme` | `"default" \| "cosmic"` | `"default"` | Homepage uses default (green) |

**Desktop (≥768px):** Horizontal bar with grid-cell layout. Logo cell takes `w-[35%]` with `border-r`. Nav links fill remaining space as `flex-1` cells with `border-l` dividers. Sticky top (`sticky top-0 z-50`). Background: `bg-bg`.

**Mobile (<768px):** Logo left, hamburger right in a `flex justify-between` row. Hamburger animates to X on open (CSS transforms). Mobile menu renders below as a dropdown with `border-x border-b`. Links are `block`, `text-center`, `py-4 px-6`. Menu closes on link click, on Escape key, and auto-closes on resize to ≥768px. Body scroll is locked when menu is open.

**Accessibility:** Focus trap in mobile menu (Tab cycles through items). Escape returns focus to hamburger button. `aria-label="Toggle menu"` and `aria-expanded` on hamburger.

**Nav links data:**

| Label | Destination | External | Highlight |
|-------|-------------|----------|-----------|
| REVEAL INFO | `/revealinfo` | No | No |
| UNIVERSITY | `/maduniversity` | No | No |
| MAD APP | `app.madscientists.io` | Yes | No |
| REVEAL MAD | `mygateway.io/minting/mad-scientists` | Yes | **Yes** (bold green) |

### Ticker

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `"gateway" \| "stargaze" \| "cosmic-top" \| "cosmic-bottom"` | `"gateway"` | Homepage uses `"gateway"` and `"stargaze"` |

**Structure:** Outer `border border-green` container at `max-w-[1440px]`. Inner overflow-hidden div with CSS mask (linear gradient fade on left/right 8% edges). Content is a `flex` row with `ticker-animate` class.

**Animation:** `ticker-scroll` keyframes — `translateX(0)` to `translateX(-50%)` over 60s, linear, infinite. Uses `will-change: transform` for GPU acceleration. Content is duplicated (2× `TickerSet` of 8 items each) to create seamless loop.

**Gateway variant:** "REVEAL LIVE ON [nft-1.jpg circle] GATEWAY" — circular 30/36px icon.
**Stargaze variant:** "BUY SECONDARY ON [nft-2.jpg circle] STARGAZE" — circular 30/36px icon.

**Reduced motion:** Animation is fully disabled via `@media (prefers-reduced-motion: reduce)`.

### Hero

**No props.** Static two-column layout.

**Desktop (≥768px):** `flex-row` — text panel `flex-1` (left), GIF panel `flex-[2]` (right, takes 2/3 of width). Min height `md:min-h-[600px]`.

**Mobile (<768px):** `flex-col` — text stacks above GIF. Min height `min-h-[500px]`.

**Left panel (text + buttons):**

- Bordered: `border border-green`
- Content is vertically centered (`flex-1 justify-center`)
- Mobile: horizontally centered (`items-center text-center`)
- Desktop: left-aligned (`md:items-start md:text-left`)

**Headline:** `<h1>` with three `<span>` blocks: "EVERYTHING", "IS AN", "EXPERIMENT". Sizes: `text-4xl md:text-5xl lg:text-6xl`. Font: `font-display uppercase font-bold tracking-[-1.5px]`. Color: `text-text`.

**Button stack:**

| Button | Variant | Size | Layout |
|--------|---------|------|--------|
| REVEAL MAD | `primary` | `lg` | Full width |
| TRADE $LAB | `secondary` (default) | `md` (default) | Side-by-side (`flex-1`) |
| MARKETPLACE | `secondary` (default) | `md` (default) | Side-by-side (`flex-1`) |
| MAD APP | `secondary` (default) | `lg` | Full width |

**Right panel (video):**
- `flex-[2]` width ratio
- `border border-green overflow-hidden bg-green-dark` (dark green fallback if video/image fails)
- `<video>` element with `autoPlay loop muted playsInline preload="auto"` — behaves like a GIF but at ~64% smaller file size
- Source: `hero.mp4` (134KB, H.264) with `poster="/images/hero.gif"` for instant visual before video loads
- Fallback: `<Image>` of `hero.gif` inside `<video>` for browsers that don't support `<video>` (extremely rare)

### Button

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `children` | `ReactNode` | — | Required |
| `href` | `string?` | — | Renders as `<Link>` (internal) or `<a>` (external) |
| `onClick` | `() => void?` | — | Only when no `href` |
| `disabled` | `boolean` | `false` | Adds `opacity-50 cursor-not-allowed` |
| `type` | `"button" \| "submit"` | `"button"` | Only for `<button>` renders |
| `variant` | `"primary" \| "secondary" \| "ghost" \| "cosmic-primary"` | `"secondary"` | See styles below |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | See sizes below |
| `theme` | `"default" \| "cosmic"` | `"default"` | Switches full style set |
| `className` | `string` | `""` | Merged into final classes |

**Variant styles (default theme):**

| Variant | Background | Border | Text | Hover |
|---------|-----------|--------|------|-------|
| `primary` | `bg-green` | — | `text-dark` | `brightness-110` |
| `secondary` | `rgba(85,212,53,0.12)` | `border-green` | `text-green` | bg opacity → 0.2 |
| `ghost` | transparent | — | `text-green` | `text-green-light` |

**Size styles:**

| Size | Padding | Font |
|------|---------|------|
| `sm` | `px-4 py-2` | `text-sm` |
| `md` | `px-4 py-3` | `text-sm md:text-base` |
| `lg` | `px-6 py-4` | `text-base md:text-lg` |

**Base classes (all variants):** `flex items-center justify-center font-display font-bold tracking-[0.05em] text-center transition-all`. No border-radius.

### BlockchainSection

**No props.** Three-column info grid.

**Desktop (≥768px):** `flex-row` — three `flex-1` columns side by side.
**Mobile (<768px):** `flex-col` — columns stack vertically.

Each column: `border border-green p-6 md:p-8 flex flex-col items-center gap-3`.

| Column | Label | Content |
|--------|-------|---------|
| 1. Blockchain | `text-text-muted text-sm` | Osmosis logo (48px circle, `border-2 border-green`) + "Osmosis" text |
| 2. Trade $LAB | `text-text-muted text-sm` | 3 circular icon links (Osmosis, CoinHall, SwapFast) — each 48px, `border-2 border-green`, hover → `border-green-light` |
| 3. Reveal MAD Scientists | `text-text-muted text-sm` | Gateway logo (48px circle) + "Gateway" text, wrapped in link |

**Icon avatars:** 48×48px, `rounded-full`, `border-2 border-green`, `overflow-hidden`. Trade $LAB icons have hover state `border-green-light`.

### Footer

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `theme` | `"default" \| "cosmic"` | `"default"` | Homepage uses default |

**Structure:** Single bordered container (`border border-green p-6 md:p-10`) containing a `flex-col md:flex-row` with link grid and social icons.

**Link grid:** `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-2`. Links use `font-display text-sm tracking-wider`. Color: `text-green hover:text-green-light`. Text alignment: `text-center md:text-left`.

**Social icons:** Two icons (X/Twitter, Discord) in a `flex gap-4` row. Touch targets: `min-w-[44px] min-h-[44px]`. Each has `aria-label`. Hover: `opacity-80`. Alignment: `justify-center md:justify-start`.

**Footer links (12 total):** Home, Reveal Info, Bridge, Reveal MAD, Marketplace, Trade $LAB, $LAB Chart, Validator, Brand Assets, Mad University, Science Clubs, Snapshot.

---

## States and Interactions

| Element | State | Behavior |
|---------|-------|----------|
| NavBar links | Hover | `text-text` → `text-green` (color transition) |
| NavBar highlight link | Default | `text-green font-bold` (always emphasized) |
| NavBar hamburger | Open | Lines animate to X via CSS transforms |
| NavBar mobile menu | Open | Body scroll locked, focus trapped |
| Button (primary) | Hover | `brightness-110` (slight glow) |
| Button (secondary) | Hover | Background opacity increases (0.12 → 0.2) |
| All buttons | Focus | `outline-2 outline-offset-2 outline-green` |
| Ticker | Default | 60s infinite horizontal scroll |
| Ticker | Reduced motion | Animation fully stopped |
| BlockchainSection icons | Hover | `border-green` → `border-green-light` |
| Footer links | Hover | `text-green` → `text-green-light` |
| Social icons | Hover | `opacity-80` |

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **Mobile (<768px)** | Columns stack vertically. Text centers. NavBar becomes hamburger + dropdown. Hero: text above GIF. Ticker icons 30px. Button text `text-sm`. Footer grid 2 columns. Social icons centered. |
| **SM (≥640px)** | Footer grid expands to 3 columns. |
| **MD (≥768px)** | Side-by-side layouts activate. NavBar becomes horizontal bar. Hero splits text (1/3) + GIF (2/3). BlockchainSection becomes 3-col row. Footer grid 5 columns, social icons left-aligned. Text left-aligns. Ticker icons 36px. Mobile menu auto-closes. |
| **LG (≥1024px)** | Headline scales to `text-6xl`. No other structural changes. |
| **Max (1440px)** | `max-w-[1440px]` caps all section widths. Content remains centered via `mx-auto`. |

---

## Edge Cases

- **Long nav labels:** Nav links are `flex-1` cells — text could overflow on narrow viewports. Currently mitigated by short labels and `text-base` size.
- **GIF loading:** Hero GIF is `priority` + `unoptimized`. Large file size could delay LCP on slow connections. Consider a static poster frame as fallback.
- **Ticker without JS:** Ticker scroll is pure CSS (`@keyframes`), so it works without JavaScript. Content is duplicated in HTML for seamless loop.
- **No empty states:** All content is static/hardcoded. No loading states, error states, or missing data scenarios.
- **External link failure:** All CTA buttons link to external services (Gateway, Stargaze, Osmosis). If those services are down, users see external error pages — nothing the homepage can control.

---

## Animation / Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Ticker | Page load | `translateX(0)` → `translateX(-50%)` | 60s | `linear` (infinite loop) |
| Nav hamburger lines | Menu toggle | `rotate-45 translate-y-2` / `opacity-0` / `-rotate-45 -translate-y-2` | CSS `transition-transform` default (150ms) | ease |
| Button hover | `:hover` | `brightness-110` or background color shift | CSS `transition-all` default (150ms) | ease |
| Link hover | `:hover` | Color transition | CSS `transition-colors` default (150ms) | ease |

**Reduced motion:** All animations are disabled via `@media (prefers-reduced-motion: reduce)` in `globals.css`. This sets `animation-duration: 0.01ms`, `transition-duration: 0.01ms`, and `scroll-behavior: auto` on all elements.

---

## Accessibility Notes

- **Skip link:** Root layout includes a skip-to-content link (`#main-content`) that appears on keyboard focus. Styled as a fixed green pill.
- **Heading hierarchy:** Single `<h1>` in Hero ("EVERYTHING IS AN EXPERIMENT"). Sub-sections should use `<h2>` if adding content.
- **Focus order:** Natural DOM order — NavBar → Ticker (non-interactive) → Hero buttons → Ticker (non-interactive) → BlockchainSection links → Footer links → Social icons.
- **Focus styles:** All interactive elements use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green`.
- **Keyboard navigation:** NavBar mobile menu supports Tab cycling (focus trap), Escape to close (returns focus to hamburger). `aria-expanded` on hamburger button.
- **Touch targets:** Social icons enforce `min-w-[44px] min-h-[44px]`. BlockchainSection icon links are 48px circles. All buttons meet 44px minimum via padding.
- **ARIA labels:** Social icons have explicit `aria-label` ("Follow us on X (Twitter)", "Join our Discord"). BlockchainSection trade icons have labels ("Trade $LAB on Osmosis", etc.).
- **Contrast:** Body text `#A0A0A0` on `#061304` = 6.3:1 ratio (exceeds WCAG AA 4.5:1). Green `#39F909` on dark bg is high contrast. `text-dark` (#141414) on `green` (#39F909) buttons meets requirements.
- **External links:** All external links use `target="_blank" rel="noopener noreferrer"`.
- **Ticker decorative images:** Ticker icons use `alt=""` (decorative).

---

## SEO & Metadata

- **Title:** "Mad Scientists on Osmosis"
- **Description:** "Explore Mad Scientists NFTs: the PFP collection on Osmosis blockchain..."
- **OG image:** `/images/hero-og.gif`
- **Twitter card:** `summary_large_image`
- **Canonical:** `https://madscientists.io/`
- **JSON-LD:** Organization schema with name, URL, logo, sameAs (Twitter, Discord)
- **Structured data:** Injected via `<script type="application/ld+json">` in root layout

---

## Performance Notes

- **Hero video:** MP4 (134KB) replaces GIF (376KB) — 64% smaller. `<video autoPlay loop muted playsInline>` with `poster` attribute for instant first frame. GIF fallback inside `<video>` for legacy browsers.
- **Image fallbacks:** Hero container and BlockchainSection icons use `bg-green-dark` so broken images show a dark green fill instead of nothing.
- **Ticker GPU:** `will-change: transform` on `.ticker-animate` enables GPU-accelerated animation.
- **NavBar sticky:** `sticky top-0 z-50` — stays in view without JS scroll listeners.
- **Fonts:** Google Fonts loaded via `next/font` (self-hosted, no external requests). Two weights per font (400, 700).

---

## Known Gaps & Future Considerations

- **Z-index scale:** Only `z-50` is used (NavBar sticky). If modals, tooltips, or overlays are added, establish a formal stacking order (e.g., nav 50, modals 100, tooltips 150).

### Resolved

- **Image fallbacks:** Hero video container and BlockchainSection icon containers now have `bg-green-dark` fallback backgrounds. Hero uses `poster` attribute for instant visual before video loads.
- **Disabled button hover:** Disabled buttons now include `hover:brightness-100` to neutralize hover effects.
- **Hero GIF → MP4:** Converted hero animation from GIF (376KB) to MP4 (134KB) — 64% file size reduction with better quality. GIF retained as poster frame and `<Image>` fallback.

---

## Security Headers

Configured in `next.config.ts`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (HSTS)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (restricts camera, microphone, etc.)
