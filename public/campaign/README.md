# /campaign/ — Temporary Campaign Dashboard

**What:** Shareable copy of the COSMIC campaign dashboard for team review.
**Why here:** The original lives in `~/imggen/COSMIC-TEASER-V1/` (not a git repo, can't share). This copy deploys to Vercel so the team can access it via URL.
**URL:** `madscientists.io/campaign/campaign-dashboard.html`

## Differences from original
- Videos (Day 1 teaser, Day 5 reveal) replaced with placeholders — too large for git
- Stills render normally (5 images, ~13MB total)
- Original in imggen has playable videos + is the working copy

## When to delete
Delete this entire `public/campaign/` folder after the COSMIC campaign wraps (post Day 10).
No other part of the site depends on it.

```bash
rm -rf public/campaign/
```
