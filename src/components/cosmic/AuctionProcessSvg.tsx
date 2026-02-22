const scientistImages = [
  "/images/cosmic-1-halfbody-v2.png",
  "/images/cosmic-2-halfbody-v2.png",
  "/images/cosmic-3-halfbody-v2.png",
  "/images/cosmic-4-halfbody-v2.png",
  "/images/cosmic-5-halfbody-v2.png",
];

const oracleImg = scientistImages[2];
const panelOneX = [35, 85, 135, 185, 235];
const pfpY = 60;

function SelectedPfp({ x, y, r, src }: { x: number; y: number; r: number; src: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 8} fill="#7ed3ff" opacity="0.15" style={{ filter: "blur(4px)" }} />
      <image
        href={src}
        x={x - r}
        y={y - r}
        width={r * 2}
        height={r * 2}
        clipPath="url(#circle-clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#7ed3ff" strokeWidth="2" opacity="0.7" />
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
        clipPath="url(#circle-clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#4a4a5a" strokeWidth="1.5" />
    </g>
  );
}

export default function AuctionProcessSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" className="h-auto w-full">
      <defs>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap');
          .title { font-family: 'Pixelify Sans', sans-serif; fill: #ffffff; font-size: 22px; font-weight: 700; text-anchor: middle; letter-spacing: 1.5px; }
          .panel-frame { stroke: #2A2A3A; stroke-width: 2; fill: #111018; }
        `}</style>

        <radialGradient id="bg-glow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1A1525" />
          <stop offset="100%" stopColor="#0B0A10" />
        </radialGradient>

        <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#2A2A3A" opacity="0.5" />
        </pattern>

        <clipPath id="circle-clip" clipPathUnits="objectBoundingBox">
          <circle cx="0.5" cy="0.5" r="0.5" />
        </clipPath>

        <g id="nft-purple">
          <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#2D1152" stroke="#9B59F0" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#7ed3ff" />
        </g>
        <g id="nft-pink">
          <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#521132" stroke="#ff73c7" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#7ed3ff" />
        </g>
        <g id="nft-cyan">
          <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#113252" stroke="#7ed3ff" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#ff73c7" />
        </g>

        <marker id="arrowhead-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 5 3 L 0 6 Z" fill="#9B59F0" />
        </marker>
        <marker id="arrowhead-pink" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 5 3 L 0 6 Z" fill="#ff73c7" />
        </marker>
        <marker id="arrowhead-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 5 3 L 0 6 Z" fill="#7ed3ff" />
        </marker>

        <g id="panel-bg">
          <rect x="0" y="0" width="270" height="490" className="panel-frame" rx="12" />
          <rect x="0" y="0" width="270" height="490" fill="url(#dot-grid)" rx="12" />
        </g>
      </defs>

      <rect width="1200" height="630" fill="url(#bg-glow)" />

      {/* PANEL 1 — PICK YOUR LANE */}
      <g transform="translate(24, 40)">
        <use href="#panel-bg" />
        <text x="135" y="545" className="title">PICK YOUR LANE</text>

        <rect x="110" y="20" width="50" height="450" fill="#7ed3ff" opacity="0.05" rx="8" />
        <path d="M 110,20 L 110,470 M 160,20 L 160,470" stroke="#7ed3ff" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />

        {panelOneX.map((x, i) =>
          i === 2 ? (
            <SelectedPfp key={i} x={x} y={pfpY} r={18} src={scientistImages[i]} />
          ) : (
            <UnselectedPfp key={i} x={x} y={pfpY} r={15} src={scientistImages[i]} />
          ),
        )}

        <path d="M 60,30 L 60,460 M 210,30 L 210,460" stroke="#2A2A3A" strokeWidth="1" strokeDasharray="4,4" />
      </g>

      {/* PANEL 2 — STACK YOUR BID */}
      <g transform="translate(318, 40)">
        <use href="#panel-bg" />
        <text x="135" y="545" className="title">STACK YOUR BID</text>

        <rect x="85" y="20" width="100" height="450" fill="#7ed3ff" opacity="0.05" rx="8" />
        <SelectedPfp x={135} y={pfpY} r={20} src={oracleImg} />

        <path d="M 135,120 L 135,260" stroke="#9B59F0" strokeWidth="2" strokeDasharray="6,4" opacity="0.6" />
        <path d="M 135,260 L 135,290" stroke="#9B59F0" strokeWidth="2" markerEnd="url(#arrowhead-purple)" opacity="0.8" />

        <use href="#nft-purple" x="135" y="200" opacity="0.6" transform="rotate(-5, 135, 200)" />
        <use href="#nft-purple" x="135" y="240" opacity="0.8" transform="rotate(2, 135, 240)" />

        <use href="#nft-purple" x="135" y="440" />
        <use href="#nft-purple" x="135" y="418" />
        <use href="#nft-purple" x="135" y="396" />
        <use href="#nft-purple" x="135" y="374" />
        <use href="#nft-purple" x="135" y="352" />
      </g>

      {/* PANEL 3 — HIGHEST STACK WINS */}
      <g transform="translate(612, 40)">
        <use href="#panel-bg" />
        <text x="135" y="545" className="title">HIGHEST STACK WINS</text>

        <rect x="20" y="20" width="230" height="450" fill="#7ed3ff" opacity="0.05" rx="8" />
        <SelectedPfp x={135} y={pfpY} r={20} src={oracleImg} />

        <use href="#nft-pink" x="65" y="440" />
        <use href="#nft-pink" x="65" y="418" />
        <use href="#nft-pink" x="65" y="396" />

        <use href="#nft-cyan" x="205" y="440" />
        <use href="#nft-cyan" x="205" y="418" />

        <use href="#nft-purple" x="135" y="440" />
        <use href="#nft-purple" x="135" y="418" />
        <use href="#nft-purple" x="135" y="396" />
        <use href="#nft-purple" x="135" y="374" />
        <use href="#nft-purple" x="135" y="352" />
        <use href="#nft-purple" x="135" y="330" />
        <use href="#nft-purple" x="135" y="308" />

        <g transform="translate(135, 265)">
          <circle cx="0" cy="0" r="16" fill="#7ed3ff" opacity="0.2" style={{ filter: "blur(3px)" }} />
          <path d="M -8,0 L -3,6 L 10,-6" stroke="#7ed3ff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* PANEL 4 — LOSERS GET REFUNDED */}
      <g transform="translate(906, 40)">
        <use href="#panel-bg" />
        <text x="135" y="545" className="title">LOSERS GET REFUNDED</text>

        <rect x="20" y="20" width="230" height="450" fill="#7ed3ff" opacity="0.05" rx="8" />
        <SelectedPfp x={135} y={pfpY} r={20} src={oracleImg} />

        <use href="#nft-purple" x="135" y="440" />
        <use href="#nft-purple" x="135" y="418" />
        <use href="#nft-purple" x="135" y="396" />
        <use href="#nft-purple" x="135" y="374" />
        <use href="#nft-purple" x="135" y="352" />
        <use href="#nft-purple" x="135" y="330" />
        <use href="#nft-purple" x="135" y="308" />

        <g opacity="0.6">
          <use href="#nft-pink" x="65" y="290" />
          <use href="#nft-pink" x="50" y="270" transform="rotate(-15, 50, 270)" />
          <use href="#nft-pink" x="35" y="250" transform="rotate(-30, 35, 250)" />
        </g>
        <path d="M 65,330 Q 65,260 20,230" fill="none" stroke="#ff73c7" strokeWidth="3" strokeDasharray="6,4" markerEnd="url(#arrowhead-pink)" />

        <g opacity="0.6">
          <use href="#nft-cyan" x="205" y="330" />
          <use href="#nft-cyan" x="220" y="300" transform="rotate(15, 220, 300)" />
        </g>
        <path d="M 205,370 Q 205,310 250,280" fill="none" stroke="#7ed3ff" strokeWidth="3" strokeDasharray="6,4" markerEnd="url(#arrowhead-cyan)" />
      </g>
    </svg>
  );
}
