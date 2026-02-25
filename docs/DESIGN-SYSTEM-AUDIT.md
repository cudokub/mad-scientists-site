# Design System Audit — Mad Scientists Site

**Date:** February 25, 2026
**Components reviewed:** 10 | **Issues found:** 14 | **Score:** 72/100

---

## Summary

The Mad Scientists design system has a strong, well-documented foundation with clear rules around typography, borders, layout, and theming. Components are well-structured with consistent prop interfaces and good accessibility patterns. However, significant **token coverage gaps** exist — particularly around text colors, background colors, and the cosmic theme palette — leading to widespread hardcoded hex values across pages. The main areas for improvement are expanding the token set and standardizing repeated color values.

---

## Token Coverage

| Category | Tokens Defined | Hardcoded Values Found | Notes |
|----------|---------------|----------------------|-------|
| **Primary colors** | 6 (`green`, `green-muted`, `green-dark`, `green-light`, `cosmic`, `cosmic-dark`) | 0 | Well-covered |
| **Background** | 2 (`bg`, `body`) | 15+ instances of `#090b17`, `#050a16`, `#080612`, `#09081a`, `#060a16`, etc. | Cosmic backgrounds lack tokens |
| **Text colors** | 0 dedicated tokens | 100+ instances of `#D2DFD4`, `#A0A0A0`, `#C2C2C2`, `#141414` | **Critical gap** — most-used colors have no tokens |
| **Cosmic text** | 0 | 50+ instances of `#f4ecff`, `#f3ecff`, `#f3edff`, `#e8dcff`, `#d8d4e2`, `#c9c5d8`, `#b4afc0`, `#b5b2c8`, `#bdb8cc`, `#aaa4bf`, `#a8a3bd`, `#8a84a0`, `#cfc6ea`, `#d5cfee` | **Critical gap** — near-identical shades used inconsistently |
| **Accent colors** | 1 (`link: #0cdefa`) | `#7ed3ff`, `#9fe5ff`, `#00FF26` used directly | Missing `cyan` / `cyan-light` tokens |
| **Typography** | 2 (`font-display`, `font-mono`) | 1 (Silkscreen loaded in Ticker, acceptable) | Well-covered |
| **Spacing** | Via Tailwind defaults | Mostly consistent `p-6 md:p-8` | Minor variations |
| **Borders** | 0 (uses default `border`) | Consistent | No issues |
| **Shadows** | 0 | 4+ hardcoded `box-shadow` values | Could benefit from tokens |
| **Motion** | 4 keyframes defined | Consistent | Well-covered |

---

## Component Completeness

| Component | Props/API | Variants | States | Accessibility | Theme Support | Score |
|-----------|-----------|----------|--------|---------------|--------------|-------|
| **Button** | `href`, `variant`, `size`, `theme`, `className` | 4 (primary, secondary, ghost, cosmic-primary) | hover, focus-visible | focus-visible outline, auto external detection | default + cosmic | **9/10** |
| **NavBar** | `theme` | — | hover, focus-visible, mobile open/closed | aria-label, aria-expanded, focus trap, Escape close | default + cosmic | **10/10** |
| **Footer** | `theme` | — | hover, focus-visible | aria-labels on icon links, min touch targets | default + cosmic | **9/10** |
| **Hero** | — | — | — | Image alt, priority loading | default only | **7/10** |
| **Ticker** | `variant` | 4 (gateway, stargaze, cosmic-top, cosmic-bottom) | — | reduced-motion, decorative alt="" | default + cosmic | **8/10** |
| **BlockchainSection** | — | — | hover | aria-labels on icon links | default only | **7/10** |
| **Dialog** | Radix forwarded props | — | open/closed, animation | Radix built-in a11y | cosmic only | **8/10** |
| **Drawer** | Vaul forwarded props | — | open/closed, drag | Vaul built-in a11y | cosmic only | **8/10** |
| **ScientistModal** | `scientist`, `onClose`, `onPrev`, `onNext` | desktop (Dialog) / mobile (Drawer) | keyboard nav, hover | arrow keys, Escape, aria-labels, screen reader titles | cosmic only | **9/10** |
| **AuctionProcessSvg** | `panel` | single-panel / full | — | Inline SVG (no alt text mechanism) | cosmic only | **6/10** |

---

## Naming Consistency

| Issue | Affected Areas | Recommendation |
|-------|---------------|----------------|
| **Inconsistent cosmic text grays** | `#f4ecff` vs `#f3ecff` vs `#f3edff` vs `#f0e8ff` used interchangeably for "light cosmic text" | Standardize to 3 tiers: `cosmic-text` (lightest), `cosmic-text-muted`, `cosmic-text-dim` |
| **Inconsistent cyan accent** | `#7ed3ff` vs `#9fe5ff` vs `#0cdefa` used across cosmic theme | Add `cosmic-cyan` and `cosmic-cyan-light` tokens |
| **Two different greens for emphasis** | `#39f909` (token) vs `#00FF26` (hardcoded in revealinfo) | Always use `text-green` token |
| **Body text color inconsistency** | `#C2C2C2` (token as `body`) vs `#A0A0A0` (hardcoded) vs `#909991` (hardcoded) | Add `text-muted` and `text-caption` tokens |
| **File organization** | Components in root `src/components/` vs `src/components/cosmic/` vs `src/components/ui/` | Consistent — cosmic-specific in `/cosmic`, primitives in `/ui`, shared at root |

---

## Accessibility Compliance

| Check | Status | Notes |
|-------|--------|-------|
| Skip-to-content link | **Pass** | Present in root layout |
| `id="main-content"` on `<main>` | **Pass** | All pages |
| `<h1>` per page | **Pass** | Every page has exactly one |
| Heading hierarchy | **Pass** | Proper h1 → h2 → h3 ordering |
| Focus-visible styles | **Warn** | Cosmic page card button uses `focus-visible:outline-none focus-visible:ring-2` instead of the standard `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic` pattern |
| Touch targets (44x44px) | **Warn** | Back-to-top button in cosmic page uses `h-10 w-10` (40x40px) — below 44px minimum |
| Reduced motion | **Pass** | `globals.css` disables all animations |
| Color contrast | **Pass** | `#A0A0A0` on `#061304` = 6.3:1 ratio (WCAG AA) |
| aria-labels on icon links | **Pass** | Social icons in Footer have descriptive labels |
| External link handling | **Pass** | `target="_blank" rel="noopener noreferrer"` consistent |
| `alt` text on images | **Pass** | All content images have descriptive alt; decorative images use `alt=""` |

---

## Specific Issues

### 1. Missing text color tokens (Critical)

The most-used text colors have no Tailwind tokens:

```css
/* Proposed additions to @theme in globals.css */
--color-text: #D2DFD4;           /* Headlines, nav text */
--color-text-muted: #A0A0A0;     /* Labels, captions */
/* body token already exists: #C2C2C2 */
--color-text-dark: #141414;      /* Dark text on primary buttons */

/* Cosmic palette */
--color-cosmic-text: #f4ecff;    /* Cosmic headings */
--color-cosmic-text-muted: #c9c5d8;  /* Cosmic body */
--color-cosmic-text-dim: #8a84a0;    /* Cosmic captions */
--color-cosmic-bg: #080612;      /* Cosmic panel backgrounds */
--color-cosmic-cyan: #7ed3ff;    /* Cosmic cyan accent */
```

### 2. Duplicate near-identical cosmic colors

At least 6 nearly identical "cosmic light text" hex values are used across the cosmic page. These should collapse to 2–3 semantic tokens.

| Current Values | Proposed Token |
|---------------|---------------|
| `#f4ecff`, `#f3ecff`, `#f3edff`, `#f0e8ff`, `#f1eaff`, `#e8e0ff` | `cosmic-text` |
| `#d8d4e2`, `#c9c5d8`, `#c4bfd3`, `#cfc6ea`, `#d5cfee`, `#e8dcff` | `cosmic-text-muted` |
| `#b4afc0`, `#b5b2c8`, `#bdb8cc`, `#aaa4bf`, `#a8a3bd` | `cosmic-text-dim` |
| `#8a84a0` | `cosmic-text-dimmer` |

### 3. Non-standard green `#00FF26`

`revealinfo/page.tsx` uses `#00FF26` in multiple places instead of the design token `#39f909` (`text-green`). This creates a subtly different green.

### 4. Focus style inconsistency on cosmic page

The cosmic collection card button uses `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic` instead of the project standard `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic`. This is the only component using `ring` instead of `outline`.

### 5. Back-to-top button touch target

The cosmic page back-to-top button uses `h-10 w-10` (40x40px), which is below the 44px minimum documented in the accessibility rules.

### 6. Button component missing `disabled` and `loading` states

The Button component has no disabled or loading state support. While not currently needed, this would improve component completeness.

### 7. Button requires `href` (no `onClick` support)

The Button component only supports link-style usage via `href`. There's no `onClick` variant for in-page actions. The cosmic page creates its own ad-hoc buttons for modal interactions rather than reusing Button.

### 8. Placeholder link in cosmic page

`cosmic/page.tsx` has an `href="#"` placeholder link in the auction CTA section, which is non-functional.

---

## What's Working Well

- **Border consistency** — `border border-green` / `border border-cosmic` is applied universally and correctly
- **No border-radius** — The "sharp corners everywhere" rule is followed perfectly across all components and pages
- **Layout max-width** — `max-w-[1440px] mx-auto` is present on every section without exception
- **Typography rules** — `font-display` is always paired with `uppercase` and `font-bold`; body text always uses `font-mono`
- **Mobile-first alignment** — `text-center md:text-left` and `items-center md:items-start` patterns are consistent
- **Theme prop pattern** — NavBar, Footer, and Button all support `theme="cosmic"` cleanly
- **Accessibility fundamentals** — Skip link, heading hierarchy, focus styles, reduced motion, contrast, touch targets, and aria-labels are all well-handled
- **External link handling** — `target="_blank" rel="noopener noreferrer"` is consistent everywhere
- **Performance practices** — `priority`, `sizes`, `unoptimized` (GIFs), and dynamic imports are used correctly

---

## Priority Actions

1. **Add text color tokens to `globals.css`** — Define `text`, `text-muted`, `text-dark` tokens and replace 100+ hardcoded instances of `#D2DFD4`, `#A0A0A0`, `#C2C2C2`, `#141414` across all pages. **Impact: High. Effort: Medium.**

2. **Add cosmic palette tokens** — Define `cosmic-text`, `cosmic-text-muted`, `cosmic-text-dim`, `cosmic-bg`, `cosmic-cyan` tokens and consolidate the 50+ near-duplicate cosmic hex values. **Impact: High. Effort: Medium.**

3. **Fix `#00FF26` → `text-green`** — Replace non-standard green in `revealinfo/page.tsx` with the `text-green` token. **Impact: Low. Effort: Low.**

4. **Fix focus style on cosmic card button** — Change from `ring` to `outline` pattern for consistency. **Impact: Low. Effort: Low.**

5. **Fix back-to-top button touch target** — Increase from `h-10 w-10` to `min-w-[44px] min-h-[44px]`. **Impact: Low. Effort: Low.**

6. **Extend Button to support `onClick`** — Make `href` optional and add `onClick` prop + `<button>` rendering for in-page actions. **Impact: Medium. Effort: Low.**
