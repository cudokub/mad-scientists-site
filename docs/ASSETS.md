# Assets Reference

## Favicon
Multi-format setup for all devices. Generated from `public/images/ms-symbol.png` via Pillow (squared with transparent padding).

| File | Size | Purpose |
|------|------|---------|
| `src/app/favicon.ico` | 16/32/48 | Multi-size ICO, auto-discovered by Next.js |
| `src/app/apple-icon.png` | 180x180 | Auto-discovered for Safari/iOS |
| `public/favicon-16x16.png` | 16x16 | Small browser tabs |
| `public/favicon-32x32.png` | 32x32 | Standard browser tabs |
| `public/apple-touch-icon.png` | 180x180 | iOS home screen |
| `public/android-chrome-192x192.png` | 192x192 | Android/PWA |
| `public/android-chrome-512x512.png` | 512x512 | Android/PWA splash |
| `public/site.webmanifest` | — | Web app manifest (theme: `#061304`) |

## Images (`public/images/`)

### Shared
| File | Usage |
|------|-------|
| `ms-symbol.png` | Nav logo (source for favicons) |
| `hero-og.gif` | OG/Twitter card image |
| `twitter-icon.png` | Footer social |
| `discord-icon.png` | Footer social |
| `logo-large.png` | SwapFast / large logo |
| `osmosis-icon.png` | Osmosis icon (homepage) |

### Homepage
| File | Usage |
|------|-------|
| `hero.gif` | Hero right panel |
| `nft-1.jpg` | Gateway ticker icon |
| `nft-2.jpg` | Stargaze ticker icon |
| `nft-3.jpg` | Osmosis ticker icon |
| `nft-4.jpg` | CoinHall ticker icon |

### Reveal Info (`/revealinfo`)
| File | Usage |
|------|-------|
| `revealinfo-hero.gif` | Top hero GIF |
| `revealinfo-bottom.gif` | Bottom GIF (right column) |
| `osmosis-dex.png` | Osmosis DEX trade icon |
| `coinhall-icon.png` | Coinhall trade icon |
| `tfm-icon.png` | TFM trade icon |
| `gateway-logo.jpg` | Gateway reveal button icon |
| `lab-banner.webp` | Stats banner (unused) |
| `lab-symbol.png` | NFT symbol (unused) |

### Mad University (`/maduniversity`)
| File | Usage |
|------|-------|
| `maduni-hero.gif` | Overview section GIF |
| `maduni-discord.gif` | Discord commands GIF |

### Science Clubs (`/scienceclubs`)
| File | Usage |
|------|-------|
| `scienceclubs-hero.png` | Illustration (left panel) |

### Snapshot (`/snapshot`)
| File | Usage |
|------|-------|
| `stargaze-chain.svg` | Stargaze chain icon |
| `osmosis-chain.png` | Osmosis chain icon |

### COSMIC (`/cosmic`)
| File | Usage |
|------|-------|
| `cosmic-logo.png` | COSMIC logo text in hero (480px wide, ~90KB — resized from 2406x740 source) |
| `cosmic-symbol.png` | Cosmic potion bottle icon, NavBar logo for cosmic theme (200x200, ~62KB — resized from 1524x1626 source) |
| `cosmic-hero-2026.png` | Portal lineup art — all 5 scientists, 1376x768 (hero banner) |
| `cosmic-1-halfbody-v2.png` | The Architect — halfbody crop (gallery cards + auction SVG PFP) |
| `cosmic-2-halfbody-v2.png` | The Warlord — halfbody crop (gallery cards + auction SVG PFP) |
| `cosmic-3-halfbody-v2.png` | The Oracle — halfbody crop (gallery cards + auction SVG PFP) |
| `cosmic-4-halfbody-v2.png` | The Antiquarian — halfbody crop (gallery cards + auction SVG PFP) |
| `cosmic-5-halfbody-v2.png` | The Dreamer — halfbody crop (gallery cards + auction SVG PFP) |
| `cosmic-1-fullbody.png` | The Architect — full body (detail modal) |
| `cosmic-2-fullbody.png` | The Warlord — full body (detail modal) |
| `cosmic-3-fullbody.png` | The Oracle — full body (detail modal) |
| `cosmic-4-fullbody.png` | The Antiquarian — full body (detail modal) |
| `cosmic-5-fullbody.png` | The Dreamer — full body (detail modal) |
| `cosmic-auction-process.svg` | Auction process infographic — 4-panel SVG (Pick Lane → Stack Bid → Highest Wins → Losers Refunded). Rendered inline via `AuctionProcessSvg` component, uses halfbody-v2 PNGs as circular PFPs. |
