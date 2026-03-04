import type { AuctionScientist } from "./types";

export const AUCTION_SCIENTISTS: AuctionScientist[] = [
  {
    id: 1,
    name: "The Architect",
    slug: "the-architect",
    lane: "Alpha",
    src: "/images/cosmic-1-halfbody-v4.webp",
    fullSrc: "/images/cosmic-1-fullbody-v3.webp",
    tagline: "Built the machine. Became the machine.",
    lore: "When the signal came, The Architect didn\u2019t hesitate. A broken system is just a blueprint waiting to be rewritten. Every wire, every circuit, every solution traces back to him. He walked through the portal because no one else could rebuild what was falling apart.",
  },
  {
    id: 2,
    name: "The Warlord",
    slug: "the-warlord",
    lane: "Beta",
    src: "/images/cosmic-2-halfbody-v4.webp",
    fullSrc: "/images/cosmic-2-fullbody-v3.webp",
    tagline: "Didn\u2019t come to explore. Came to conquer.",
    lore: "The Warlord doesn\u2019t answer calls. He answers threats. When the signal hit, he saw what the others wouldn\u2019t admit. The Cosmos doesn\u2019t need a rescue team. It needs a weapon. The crimson crystal isn\u2019t decoration. It\u2019s the reason he was chosen.",
  },
  {
    id: 3,
    name: "The Oracle",
    slug: "the-oracle",
    lane: "Gamma",
    src: "/images/cosmic-3-halfbody-v4.webp",
    fullSrc: "/images/cosmic-3-fullbody-v3.webp",
    tagline: "Sees everything. Says nothing.",
    lore: "The Oracle saw the signal before it arrived. His mind broke through the dome a long time ago. Floating, exposed, receiving transmissions from places that don\u2019t have names yet. He walked through the portal in silence. He already knows how this ends.",
  },
  {
    id: 4,
    name: "The Antiquarian",
    slug: "the-antiquarian",
    lane: "Delta",
    src: "/images/cosmic-4-halfbody-v4.webp",
    fullSrc: "/images/cosmic-4-fullbody-v3.webp",
    tagline: "Carried the old world into the new one.",
    lore: "While the others prepared for what\u2019s ahead, The Antiquarian packed what came before. Ancient tools, forgotten maps, knowledge that predates the lab itself. He walked through the portal because this isn\u2019t the first time the Cosmos has called. He knows how it went last time.",
  },
  {
    id: 5,
    name: "The Dreamer",
    slug: "the-dreamer",
    lane: "Omega",
    src: "/images/cosmic-5-halfbody-v4.webp",
    fullSrc: "/images/cosmic-5-fullbody-v3.webp",
    tagline: "Closed eyes. Open universe.",
    lore: "The Dreamer never built a ship or drew a weapon. She just closed her eyes and was already there. The rainbow trail isn\u2019t exhaust. It\u2019s the residue of imagination meeting reality. She\u2019s the only one who didn\u2019t need the portal. She walked through it anyway. For them.",
  },
];

export const SLUG_TO_SCIENTIST = Object.fromEntries(
  AUCTION_SCIENTISTS.map((s) => [s.slug, s]),
) as Record<string, AuctionScientist>;
