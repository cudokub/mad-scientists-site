const scientistImages = [
  "/images/cosmic-1-halfbody-v4.webp",
  "/images/cosmic-2-halfbody-v4.webp",
  "/images/cosmic-3-halfbody-v4.webp",
  "/images/cosmic-4-halfbody-v4.webp",
  "/images/cosmic-5-halfbody-v4.webp",
];

const oracleImg = scientistImages[2];
const panelOneX = [35, 85, 135, 185, 235];
const pfpY = 45;

function SelectedPfp({ x, y, r, src }: { x: number; y: number; r: number; src: string }) {
  return (
    <g>
      <rect x={x - r - 4} y={y - r - 4} width={(r + 4) * 2} height={(r + 4) * 2} fill="#7ed3ff" opacity="0.15" />
      <image
        href={src}
        x={x - r}
        y={y - r}
        width={r * 2}
        height={r * 2}
        preserveAspectRatio="xMidYMid slice"
      />
      <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill="none" stroke="#7ed3ff" strokeWidth="2" />
    </g>
  );
}

function UnselectedPfp({ x, y, r, src }: { x: number; y: number; r: number; src: string }) {
  return (
    <g opacity="0.45">
      <image
        href={src}
        x={x - r}
        y={y - r}
        width={r * 2}
        height={r * 2}
        preserveAspectRatio="xMidYMid slice"
      />
      <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill="none" stroke="#4a4a5a" strokeWidth="1.5" />
    </g>
  );
}

const PANEL_X = [24, 318, 612, 906];

export default function AuctionProcessSvg({ panel }: { panel?: number } = {}) {
  const viewBox = panel
    ? `${PANEL_X[panel - 1]} 165 270 270`
    : "0 0 1200 630";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} className="h-auto w-full">
      <defs>
        <style>{`
          .title { font-family: 'Pixelify Sans', sans-serif; fill: #ffffff; font-size: 22px; font-weight: 700; text-anchor: middle; letter-spacing: 1.5px; }
          .panel-frame { stroke: #2A2A3A; stroke-width: 2; fill: #111018; }
        `}</style>

        <radialGradient id="bg-glow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1A1525" />
          <stop offset="100%" stopColor="#0B0A10" />
        </radialGradient>

        <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="2" height="2" fill="#2A2A3A" opacity="0.7" />
        </pattern>

        {/* NFT Blocks (Pixel style — no rounding) */}
        <g id="nft-purple">
          <rect x="-15" y="-10" width="30" height="20" fill="#2D1152" stroke="#9B59F0" strokeWidth="2" />
          <rect x="-2" y="-2" width="4" height="4" fill="#7ed3ff" />
        </g>
        <g id="nft-pink">
          <rect x="-15" y="-10" width="30" height="20" fill="#521132" stroke="#ff73c7" strokeWidth="2" />
          <rect x="-2" y="-2" width="4" height="4" fill="#7ed3ff" />
        </g>
        <g id="nft-cyan">
          <rect x="-15" y="-10" width="30" height="20" fill="#113252" stroke="#7ed3ff" strokeWidth="2" />
          <rect x="-2" y="-2" width="4" height="4" fill="#ff73c7" />
        </g>

        {/* Pixel Arrowheads (Blocky) */}
        <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
          <path d="M 0,2 L 4,2 L 4,0 L 8,4 L 4,8 L 4,6 L 0,6 Z" fill="#9B59F0" />
        </marker>
        <marker id="arrowhead-pink" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
          <path d="M 0,2 L 4,2 L 4,0 L 8,4 L 4,8 L 4,6 L 0,6 Z" fill="#ff73c7" />
        </marker>
        <marker id="arrowhead-cyan" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
          <path d="M 0,2 L 4,2 L 4,0 L 8,4 L 4,8 L 4,6 L 0,6 Z" fill="#7ed3ff" />
        </marker>

        {/* Panel BG (Square corners) */}
        <g id="panel-bg">
          <rect x="0" y="0" width="270" height="270" className="panel-frame" />
          <rect x="0" y="0" width="270" height="270" fill="url(#dot-grid)" />
        </g>
      </defs>

      <rect width="1200" height="630" fill="url(#bg-glow)" />

      {/* PANEL 1 — PICK YOUR LANE */}
      <g transform="translate(24, 165)">
        <use href="#panel-bg" />
        <text x="135" y="315" className="title">PICK YOUR LANE</text>

        <rect x="110" y="15" width="50" height="240" fill="#7ed3ff" opacity="0.05" />
        <path d="M 110,15 L 110,255 M 160,15 L 160,255" stroke="#7ed3ff" strokeWidth="2" strokeDasharray="8,8" opacity="0.3" />

        {panelOneX.map((x, i) =>
          i === 2 ? (
            <SelectedPfp key={i} x={x} y={pfpY} r={18} src={scientistImages[i]} />
          ) : (
            <UnselectedPfp key={i} x={x} y={pfpY} r={15} src={scientistImages[i]} />
          ),
        )}

        <path d="M 60,20 L 60,250 M 210,20 L 210,250" stroke="#2A2A3A" strokeWidth="2" strokeDasharray="4,4" />
      </g>

      {/* PANEL 2 — STACK YOUR BID */}
      <g transform="translate(318, 165)">
        <use href="#panel-bg" />
        <text x="135" y="315" className="title">STACK YOUR BID</text>

        <rect x="85" y="15" width="100" height="240" fill="#7ed3ff" opacity="0.05" />
        <SelectedPfp x={135} y={pfpY} r={20} src={oracleImg} />

        <path d="M 135,70 L 135,125" stroke="#9B59F0" strokeWidth="2" strokeDasharray="8,8" opacity="0.6" />
        <path d="M 135,125 L 135,140" stroke="#9B59F0" strokeWidth="2" markerEnd="url(#arrowhead-purple)" opacity="0.8" />

        <use href="#nft-purple" x="135" y="70" opacity="0.6" />
        <use href="#nft-purple" x="135" y="105" opacity="0.8" />

        <use href="#nft-purple" x="135" y="240" />
        <use href="#nft-purple" x="135" y="218" />
        <use href="#nft-purple" x="135" y="196" />
        <use href="#nft-purple" x="135" y="174" />
        <use href="#nft-purple" x="135" y="152" />
      </g>

      {/* PANEL 3 — HIGHEST STACK WINS */}
      <g transform="translate(612, 165)">
        <use href="#panel-bg" />
        <text x="135" y="315" className="title">HIGHEST STACK WINS</text>

        <rect x="20" y="15" width="230" height="240" fill="#7ed3ff" opacity="0.05" />
        <SelectedPfp x={135} y={pfpY} r={20} src={oracleImg} />

        <use href="#nft-pink" x="65" y="240" />
        <use href="#nft-pink" x="65" y="218" />
        <use href="#nft-pink" x="65" y="196" />

        <use href="#nft-cyan" x="205" y="240" />
        <use href="#nft-cyan" x="205" y="218" />

        <use href="#nft-purple" x="135" y="240" />
        <use href="#nft-purple" x="135" y="218" />
        <use href="#nft-purple" x="135" y="196" />
        <use href="#nft-purple" x="135" y="174" />
        <use href="#nft-purple" x="135" y="152" />
        <use href="#nft-purple" x="135" y="130" />
        <use href="#nft-purple" x="135" y="108" />

        {/* Blocky Pixel Checkmark */}
        <g transform="translate(135, 75)">
          <rect x="-14" y="-14" width="28" height="28" fill="#7ed3ff" opacity="0.2" />
          <path d="M -8,-2 L -4,2 L 8,-10 L 10,-8 L -4,6 L -10,0 Z" fill="#7ed3ff" />
        </g>
      </g>

      {/* PANEL 4 — NON-WINNERS REFUNDED */}
      <g transform="translate(906, 165)">
        <use href="#panel-bg" />
        <text x="135" y="315" className="title">NON-WINNERS REFUNDED</text>

        <rect x="20" y="15" width="230" height="240" fill="#7ed3ff" opacity="0.05" />
        <SelectedPfp x={135} y={pfpY} r={20} src={oracleImg} />

        <use href="#nft-purple" x="135" y="240" />
        <use href="#nft-purple" x="135" y="218" />
        <use href="#nft-purple" x="135" y="196" />
        <use href="#nft-purple" x="135" y="174" />
        <use href="#nft-purple" x="135" y="152" />
        <use href="#nft-purple" x="135" y="130" />
        <use href="#nft-purple" x="135" y="108" />

        {/* Left Refund (Pink) */}
        <g opacity="0.6">
          <use href="#nft-pink" x="65" y="160" />
          <use href="#nft-pink" x="65" y="130" />
          <use href="#nft-pink" x="40" y="100" />
        </g>
        <path d="M 65,190 L 65,100 L 25,100" fill="none" stroke="#ff73c7" strokeWidth="2" strokeDasharray="8,8" markerEnd="url(#arrowhead-pink)" />

        {/* Right Refund (Cyan) */}
        <g opacity="0.6">
          <use href="#nft-cyan" x="205" y="170" />
          <use href="#nft-cyan" x="205" y="140" />
          <use href="#nft-cyan" x="230" y="110" />
        </g>
        <path d="M 205,200 L 205,110 L 245,110" fill="none" stroke="#7ed3ff" strokeWidth="2" strokeDasharray="8,8" markerEnd="url(#arrowhead-cyan)" />
      </g>
    </svg>
  );
}
