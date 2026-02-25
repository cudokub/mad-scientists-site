# Performance Audit Report: madscientists.io

**Date:** February 25, 2026
**Scope:** Full-site audit across all 6 pages (/, /revealinfo, /maduniversity, /scienceclubs, /snapshot, /cosmic)
**Stack:** Next.js 16.1.6, React 19, Tailwind CSS 4, Vercel hosting

---

## Executive Summary

The Mad Scientists site is well-architected with solid fundamentals: clean component structure, proper `next/image` usage, good accessibility practices, and security headers in place. However, there are **12 actionable findings** across performance, resource management, and configuration that can meaningfully improve Core Web Vitals scores and user experience.

**Overall Grade: B+** (good foundation, room for optimization)

| Category | Score | Notes |
|----------|-------|-------|
| Image Optimization | B | Good use of next/image, but oversized sources and missing lazy hints |
| Bundle / JS | A- | Lean dependency tree, good code splitting |
| Core Web Vitals (LCP) | B- | Hero video/GIF dual-loading, large poster images |
| Core Web Vitals (CLS) | A | Proper width/height on images prevents layout shift |
| Core Web Vitals (INP) | A | Lightweight interactions, passive scroll listeners |
| Resource Cleanup | B | One memory concern in cosmic page preloader |
| Security Headers | B+ | Good set, missing CSP |
| Caching | C | No cache headers configured in next.config.ts |
| SEO / Metadata | A | Proper OG tags, sitemap, robots, JSON-LD |
| Accessibility | A- | Skip link, focus styles, reduced motion, contrast |

---

## Finding 1: Hero Video Poster Images Load Unnecessarily (HIGH)

**Location:** `Hero.tsx`, `revealinfo/page.tsx`, `maduniversity/page.tsx`

**Issue:** The `<video>` elements use GIF files as `poster` images. When the browser supports MP4, it downloads the video *and* the poster GIF. These GIFs are large (376KB-1.2MB each) and are never displayed if the video loads successfully.

**Impact:** Up to 3.6MB of unnecessary downloads across pages that use video.

**Fix:** Use a static PNG/WebP screenshot as the poster instead of the full animated GIF. The GIF fallback inside `<video>` is also unreliable since `<Image>` inside `<video>` is non-standard HTML.

```tsx
// Before
<video poster="/images/hero.gif" ...>

// After — use a lightweight static frame
<video poster="/images/hero-poster.webp" ...>
```

Generate poster frames from the MP4s:
```bash
ffmpeg -i hero.mp4 -frames:v 1 -q:v 2 hero-poster.webp
```

**Estimated savings:** ~2-3MB total across all video pages.

---

## Finding 2: Cosmic Hero Image Oversized at Source (HIGH)

**Location:** `cosmic/page.tsx` line 287-295

**Issue:** The cosmic hero image (`cosmic-hero-2026-v4.png`, 373KB) is served with `width={1376}` but the live site serves it at up to 3840px via Next.js image optimization. The source image dimensions and the PNG format both contribute to unnecessary weight.

**Impact:** LCP on the cosmic page is slower than necessary, especially on mobile.

**Fix:**
1. Convert the source to WebP (Next.js handles this, but a pre-optimized source helps)
2. Add tighter `sizes` prop for mobile:

```tsx
// Before
sizes="66vw"

// After — more specific breakpoints
sizes="(max-width: 768px) 100vw, (max-width: 1440px) 66vw, 960px"
```

---

## Finding 3: Missing `loading="lazy"` on Below-Fold Images (MEDIUM)

**Location:** Multiple components

**Issue:** Next.js `<Image>` defaults to `loading="lazy"`, which is good. However, the `<video>` elements with `preload="auto"` on subpages (revealinfo, maduniversity) eagerly load video content that may be below the fold on mobile.

**Affected videos:**
- `revealinfo/page.tsx` bottom video (line 256-275)
- `maduniversity/page.tsx` discord video (line 193-214)

**Fix:** Change `preload="auto"` to `preload="metadata"` for below-fold videos:

```tsx
// Before
<video preload="auto" ...>

// After — only loads metadata until user scrolls to it
<video preload="metadata" ...>
```

**Estimated savings:** 158KB-372KB deferred per page.

---

## Finding 4: Ticker Renders 16 Identical Image Instances (MEDIUM)

**Location:** `Ticker.tsx` line 108-111

**Issue:** Each Ticker renders two `TickerSet` components with `count={8}`, producing 16 `<Image>` elements for the same icon. While the browser caches the image after the first load, 16 DOM nodes with identical images add unnecessary DOM weight.

**Impact:** ~32 extra `<Image>` DOM nodes on the homepage (2 tickers), ~32 on cosmic page. Each Next.js `<Image>` generates a `<picture>` with `<source>` elements, multiplying DOM size.

**Fix (optional, low priority):** Consider using CSS `background-image` for ticker icons since they are decorative (`alt=""`), or use a single inline SVG data URI.

---

## Finding 5: Cosmic Page Fullbody Image Preloader Has No Cleanup (MEDIUM)

**Location:** `cosmic/page.tsx` lines 152-158

**Issue:**
```tsx
useEffect(() => {
  if (!selected) return;
  scientists.forEach((s) => {
    const img = new window.Image();
    img.src = s.fullSrc;
  });
}, [selected !== null]);
```

Problems:
1. **Dependency array uses a boolean expression** (`selected !== null`) instead of a proper value. React may not correctly track this.
2. **No cleanup** — if the component unmounts while images are loading, the requests continue.
3. **Preloads all 5 fullbody images** every time any scientist is selected, even if the user only views one.

**Fix:**
```tsx
useEffect(() => {
  if (!selected) return;

  const controllers: AbortController[] = [];

  scientists.forEach((s) => {
    const img = new window.Image();
    img.src = s.fullSrc;
    // Images don't support AbortController, but we can
    // prevent memory retention by clearing the src on cleanup
    controllers.push({ abort: () => { img.src = ""; } } as unknown as AbortController);
  });

  return () => {
    controllers.forEach((c) => c.abort());
  };
}, [!!selected]); // Use !! for clearer boolean coercion
```

Or better yet, preload only the adjacent scientists (prev/next) rather than all five.

---

## Finding 6: No Cache-Control Headers Configured (MEDIUM)

**Location:** `next.config.ts`

**Issue:** The config sets security headers but has no `Cache-Control` directives. Vercel provides defaults, but explicit configuration ensures optimal caching for static assets.

**Fix:** Add cache headers for static assets:

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

---

## Finding 7: Missing Content-Security-Policy Header (LOW-MEDIUM)

**Location:** `next.config.ts`

**Issue:** The site has good security headers (X-Frame-Options, HSTS, etc.) but is missing a Content-Security-Policy (CSP) header, which is the most effective defense against XSS.

**Fix:** Add a baseline CSP:

```typescript
{
  key: "Content-Security-Policy",
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self'; connect-src 'self' https:; frame-ancestors 'none';",
},
```

Start with a report-only policy (`Content-Security-Policy-Report-Only`) to test before enforcing.

---

## Finding 8: AuctionProcessSvg Imports Google Fonts via CSS @import (LOW)

**Location:** `AuctionProcessSvg.tsx` line 57

**Issue:**
```tsx
<style>{`@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans...');`}</style>
```

This triggers a render-blocking font request from within an inline SVG. The font is already loaded by Next.js in the root layout, so this import is redundant and adds an extra network request.

**Fix:** Remove the `@import` and use `font-family: var(--font-display), sans-serif` or hardcode the font-family knowing it is already loaded:

```tsx
.title { font-family: 'Pixelify Sans', sans-serif; /* already loaded by Next.js */ }
```

Remove the `@import url(...)` line entirely.

---

## Finding 9: logo-large.png Used as 48px Avatar (LOW)

**Location:** `BlockchainSection.tsx` line 73-76

**Issue:** `logo-large.png` (100KB, high-resolution) is loaded and displayed at 48x48px. This wastes ~95KB of bandwidth for a tiny icon.

**Fix:** Either create a 96x96px version (`logo-small.png`, ~5KB) or add proper `sizes` prop:

```tsx
<Image
  src="/images/logo-large.png"
  alt="SwapFast"
  width={48}
  height={48}
  sizes="48px"  // Add this — tells Next.js to serve a small version
  className="w-full h-full object-cover"
/>
```

---

## Finding 10: NavBar Resize Listener Could Use matchMedia (LOW)

**Location:** `NavBar.tsx` lines 49-57

**Issue:** A `resize` event listener is used to close the mobile menu at `md` breakpoint. The `resize` event fires very frequently during window resizing.

**Fix:** Use `matchMedia` (already used in `useMediaQuery.ts`) instead:

```tsx
useEffect(() => {
  const mql = window.matchMedia("(min-width: 768px)");
  const handler = (e: MediaQueryListEvent) => {
    if (e.matches) setMobileOpen(false);
  };
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}, []);
```

---

## Finding 11: Silkscreen Font Loaded Twice (LOW)

**Location:** `Ticker.tsx` line 4, `cosmic/page.tsx` line 6

**Issue:** The `Silkscreen` font is initialized separately in both `Ticker.tsx` and `cosmic/page.tsx`. While Next.js deduplicates the network request, each creates its own CSS class.

**Fix:** Extract to a shared constant:

```tsx
// src/lib/fonts.ts
import { Silkscreen } from "next/font/google";
export const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400"] });
```

Then import from both components. This ensures a single CSS class is generated.

---

## Finding 12: NavBar body.overflow Cleanup Has Edge Case (LOW)

**Location:** `NavBar.tsx` lines 40-47

**Issue:**
```tsx
useEffect(() => {
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow;
  return () => {
    document.body.style.overflow = previousOverflow;
  };
}, [mobileOpen]);
```

If another component also modifies `body.overflow`, the captured `previousOverflow` could be stale on cleanup. This is minor in the current codebase since only NavBar touches it.

**Fix (optional):** Simply set and unset without capturing:
```tsx
useEffect(() => {
  if (mobileOpen) {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }
}, [mobileOpen]);
```

---

## What Is Already Done Well

These are industry best practices that are already correctly implemented:

1. **Next.js Image component** used consistently with `width`/`height` props (prevents CLS)
2. **`priority` prop** on above-the-fold hero images (good LCP)
3. **`sizes` prop** on most images (enables responsive serving)
4. **`will-change: transform`** on ticker animation (GPU-accelerated)
5. **`prefers-reduced-motion`** media query (accessibility)
6. **Dynamic import with `ssr: false`** for ScientistModal (code splitting)
7. **Passive scroll listener** on cosmic page (`{ passive: true }`)
8. **Lean dependency tree** (only 4 runtime deps: Next, React, Radix, Vaul)
9. **Security headers** (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
10. **Skip-to-content link** and proper focus management
11. **Proper heading hierarchy** (one H1 per page)
12. **Touch targets** (44px minimum on interactive elements)
13. **WCAG AA contrast** ratios for text colors
14. **SEO metadata** with Open Graph, Twitter cards, sitemap, robots.txt, JSON-LD

---

## Priority Action Plan

| Priority | Finding | Effort | Impact |
|----------|---------|--------|--------|
| 1 | #1 Replace GIF posters with WebP stills | 30 min | High — saves 2-3MB |
| 2 | #3 Change below-fold video preload to "metadata" | 5 min | Medium — defers 500KB+ |
| 3 | #6 Add cache headers for static assets | 10 min | Medium — faster repeat visits |
| 4 | #8 Remove redundant @import in SVG | 5 min | Low-Medium — removes render-blocking request |
| 5 | #9 Add sizes="48px" to logo-large.png | 2 min | Low — saves ~95KB |
| 6 | #2 Tighten cosmic hero sizes prop | 5 min | Medium on mobile |
| 7 | #5 Fix cosmic preloader cleanup | 15 min | Medium — prevents memory retention |
| 8 | #7 Add Content-Security-Policy | 30 min | Security improvement |
| 9 | #10 Switch resize listener to matchMedia | 10 min | Low — cleaner code |
| 10 | #11 Deduplicate Silkscreen font init | 10 min | Low — cleaner code |
| 11 | #4 Consider CSS background for ticker icons | 30 min | Low — DOM reduction |
| 12 | #12 Simplify body overflow logic | 5 min | Low — edge case fix |

**Total estimated effort:** ~2.5 hours for all fixes, ~50 minutes for the top 5.
