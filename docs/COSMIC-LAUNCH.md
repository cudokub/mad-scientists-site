# COSMIC Launch Plan

> 5 hand-crafted 1/1 Mad Scientists. Auctioned by bidding Mad Scientists 10k collection NFTs.
> 10-day campaign. Primary audience: Twitter/X.

---

## Timeline

### Phase 1: Tease (Days 1–4)

| Day | Post | Status |
|-----|------|--------|
| 1 | "Something's coming" — mystery tweet + header swap | todo |
| 2 | Silhouette drop #1 | todo |
| 3 | Silhouette drop #2 | todo |
| 4 | Silhouette drop #3 | todo |

### Phase 2: Reveal (Days 5–7)

| Day | Post | Status |
|-----|------|--------|
| 5 | Full reveal — lineup poster, all 5 names, `/cosmic` goes live | todo |
| 6 | Identity cards batch 1 (2–3 scientists) | todo |
| 7 | Identity cards batch 2 (remaining scientists) | todo |

### Phase 3: Auction (Days 8–10)

| Day | Post | Status |
|-----|------|--------|
| 8 | Auction mechanic reveal — "bid your Scientists" | todo |
| 9 | Auction opens — pinned tweet, clear instructions, link | todo |
| 10 | Final call / auction closes | todo |

---

## Assets Checklist

| Asset | Count | Status | Notes |
|-------|-------|--------|-------|
| Cosmic Twitter header | 1 | todo | Purple-themed, no art spoilers |
| Silhouette images | 3 | todo | Shadowed versions of 3 scientists |
| Lineup poster | 1 | todo | All 5 side-by-side, names below. Also used as `/cosmic` hero |
| Identity cards | 5 | todo | Art + name + one-liner each |
| Auction GIF | 1 | todo | Animated visual explaining the bid mechanic. Replaces static graphic |

**Total: 11 graphics**

---

## Tweet Copy Drafts

### Day 1 — Mystery tweet
```
(draft here)
```

### Day 2 — Silhouette #1
```
(draft here)
```

### Day 3 — Silhouette #2
```
(draft here)
```

### Day 4 — Silhouette #3
```
(draft here)
```

### Day 5 — Full reveal
```
(draft here)
```

### Day 6 — Identity cards batch 1
```
(draft here)
```

### Day 7 — Identity cards batch 2
```
(draft here)
```

### Day 8 — Auction mechanic reveal
```
(draft here)
```

### Day 9 — Auction opens
```
(draft here)
```

### Day 10 — Final call
```
(draft here)
```

---

## Decisions Log

- **Lore depth:** Tagline + short lore paragraph per character. Displayed in detail modal.
- **Auction mechanic:** 5 separate auctions, one per scientist. Bid by transferring Mad Scientists 10k NFTs. Highest bidder wins. Losers returned. No minimum bid. On-chain smart contract.
- **Page strategy:** `/cosmic` is currently unlisted. Goes live on Day 5 reveal.
- **Silhouettes:** Only 3 of 5 scientists teased — avoids repetition.
- **Auction visual:** GIF instead of static explainer graphic — matches team's content style.
- **Hero:** Portal lineup art (`cosmic-hero-2026.png`, 1376x768) with all 5 scientists. `cosmic-hero-v3.png` was a temporary test file, renamed to `cosmic-hero-2026.png`. Mobile and lineup alternates removed.
- **Collection section:** Moved "Beyond the Lab" text into collection section. Removed standalone about section.
- **Gallery modal:** Side-by-side layout (full-body art left, info 360px right). Shows name, tagline, lore paragraph. Prev/next navigation via arrow buttons (desktop sides, mobile bottom) and keyboard arrow keys. No radial gradient overlay, no edition badge, no collection/access grid. Stacks on mobile.
- **Gallery cards:** Name and tagline displayed permanently below the image. Hover effect is border glow + subtle image zoom only (no translate-y lift, no slide-up overlay).
- **Gallery layout:** Replaced carousel with responsive CSS grid (2-col mobile, 3-col tablet, 5-col desktop). No JS scroll logic. 5th card centered on mobile via `col-span-2`.
- **Image variants:** Gallery cards use `halfbody-v2` crops. Modal uses `fullbody` images via `fullSrc` field. Full-body, halfbody-v1, and halfbody-v2 images all in repo.
- **Page UX:** `scroll-smooth` on main element for anchor link smooth scrolling. Back-to-top button appears after scrolling 600px (fixed bottom-right, cosmic styled arrow).
- **Auction headline:** Changed from "Sacrifice Scientists to Win Scientists" to "Bid Scientists. Win Scientists." — cleaner and more direct.
- **Body copy:** Trimmed significantly across hero, collection, auction steps, and bottom CTA. Shorter, punchier copy throughout.

---

## Site Changes Needed

- [x] Add auction section with 4-step how-it-works, per-scientist slots, GIF placeholder + CTA
- [x] Move "Beyond the Lab" text into collection section intro
- [x] Remove standalone about section (potion bottle + text)
- [x] Add clickable gallery cards with detail modal (side-by-side art + info)
- [x] Add taglines and lore paragraphs for all 5 scientists
- [x] Prep COSMIC link in NavBar + Footer (commented out, ready to uncomment)
- [x] Swap hero with portal lineup art (`cosmic-hero-2026.png`, 1376x768)
- [ ] Drop in auction GIF at `/public/images/cosmic-auction.gif` (replace placeholder)
- [ ] Update auction button href + text when auction goes live
- [ ] Update per-scientist auction status text (replace "Auction opens soon")
- [ ] Uncomment NavBar + Footer COSMIC links (Day 5)
- [ ] Add OG/Twitter meta tags for `/cosmic` page

---

## Notes

_Use this section for ideas, feedback, or anything that comes up between sessions._
