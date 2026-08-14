/**
 * FACE SCORE - SVG ARTWORK & VECTOR ASSETS (assets/svg-assets.js)
 * High-aesthetic cosmetic illustrations and icons
 * Student: Amasha Bandara (2021/asp/59)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderHeroIllustration();
  renderBeforeAfterVisuals();
});

function renderHeroIllustration() {
  const container = document.getElementById('hero-illustration-container');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-svg-art">
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FAD0C4" />
          <stop offset="100%" stop-color="#FFD1FF" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5A4741" />
          <stop offset="100%" stop-color="#3A2D29" />
        </linearGradient>
        <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D9695F" />
          <stop offset="100%" stop-color="#C9564A" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#D9695F" flood-opacity="0.18" />
        </filter>
      </defs>

      <!-- Background Organic Blob Shapes -->
      <path d="M420 220C420 310 330 380 230 380C130 380 60 300 60 210C60 120 150 50 250 50C350 50 420 130 420 220Z" fill="#F8E6E4" opacity="0.8" />
      <circle cx="390" cy="100" r="45" fill="#F6E2E0" />
      <circle cx="80" cy="320" r="35" fill="#E8C5C2" opacity="0.6" />

      <!-- Wavy Line Accents -->
      <path d="M30 80 Q 70 50 110 90 T 190 70" stroke="#D9695F" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />
      <path d="M320 350 Q 360 380 400 340 T 470 370" stroke="#C77B77" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />

      <!-- Scattered Dot Clusters -->
      <circle cx="430" cy="180" r="4" fill="#D9695F" />
      <circle cx="445" cy="195" r="3" fill="#C77B77" />
      <circle cx="420" cy="205" r="5" fill="#E5A93C" />
      
      <circle cx="70" cy="140" r="4" fill="#D9695F" />
      <circle cx="85" cy="155" r="3" fill="#C77B77" />

      <!-- Stylized Woman Face & Cosmetics Illustration -->
      <g filter="url(#shadow)">
        <!-- Hair Back Layer -->
        <path d="M150 220 C140 130, 190 80, 260 80 C330 80, 370 130, 360 250 C350 330, 300 370, 260 370 C200 370, 160 310, 150 220 Z" fill="url(#hairGrad)" />

        <!-- Face Base -->
        <path d="M190 170 C190 120, 310 120, 310 170 C310 240, 290 290, 250 290 C210 290, 190 240, 190 170 Z" fill="url(#skinGrad)" />
        
        <!-- Neck & Collar -->
        <path d="M232 280 L268 280 L275 340 L225 340 Z" fill="#F0BEB4" />
        <path d="M190 335 Q250 365 310 335 L330 400 L170 400 Z" fill="#FFFFFF" />

        <!-- Hair Front / Style -->
        <path d="M190 160 C210 100, 290 100, 315 150 C290 130, 230 130, 190 160 Z" fill="#4A3A35" />
        <path d="M180 175 C175 230, 185 270, 205 310 C195 270, 185 220, 185 175 Z" fill="#4A3A35" />
        
        <!-- Facial Features -->
        <!-- Eyes (Serene / Closed lash curve) -->
        <path d="M215 185 Q230 195 240 185" stroke="#5A4741" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path d="M260 185 Q270 195 285 185" stroke="#5A4741" stroke-width="3.5" stroke-linecap="round" fill="none" />
        
        <!-- Lashes -->
        <path d="M238 187 L244 192" stroke="#5A4741" stroke-width="2" stroke-linecap="round" />
        <path d="M262 187 L256 192" stroke="#5A4741" stroke-width="2" stroke-linecap="round" />

        <!-- Eyebrows -->
        <path d="M210 175 Q228 168 245 175" stroke="#5A4741" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M255 175 Q272 168 290 175" stroke="#5A4741" stroke-width="3" stroke-linecap="round" fill="none" />

        <!-- Nose -->
        <path d="M250 190 Q253 215 247 218" stroke="#D98A7F" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- Soft Blush on Cheeks -->
        <circle cx="215" cy="210" r="14" fill="#D9695F" opacity="0.35" />
        <circle cx="285" cy="210" r="14" fill="#D9695F" opacity="0.35" />

        <!-- Lips -->
        <path d="M236 240 Q250 248 264 240 Q250 256 236 240 Z" fill="#D9695F" />

        <!-- Skincare Serum Dropper / Cosmetic Brush Tool -->
        <g transform="translate(310, 160) rotate(-15)">
          <rect x="0" y="0" width="18" height="70" rx="9" fill="#FFFFFF" stroke="#D9695F" stroke-width="2" />
          <rect x="3" y="15" width="12" height="40" rx="2" fill="url(#coralGrad)" opacity="0.8" />
          <path d="M9 -15 L14 0 L4 0 Z" fill="#5A4741" />
          <circle cx="9" cy="78" r="4" fill="#D9695F" />
        </g>

        <!-- AI Facial Scan Overlay Ring -->
        <circle cx="250" cy="200" r="95" stroke="#D9695F" stroke-width="2" stroke-dasharray="6 6" fill="none" opacity="0.75" />
        <!-- Scan Nodes -->
        <circle cx="250" cy="105" r="4" fill="#D9695F" />
        <circle cx="345" cy="200" r="4" fill="#D9695F" />
        <circle cx="250" cy="295" r="4" fill="#D9695F" />
        <circle cx="155" cy="200" r="4" fill="#D9695F" />
      </g>
    </svg>
  `;
}

function renderBeforeAfterVisuals() {
  const rawContainer = document.getElementById('raw-img-container');
  const procContainer = document.getElementById('processed-img-container');

  if (!rawContainer || !procContainer) return;

  const rawSvg = `
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
      <rect width="400" height="320" fill="#E8D8D5"/>
      <!-- Unfiltered face representation with noise -->
      <circle cx="200" cy="160" r="90" fill="#D8B5A9"/>
      <circle cx="170" cy="140" r="10" fill="#6B5953"/>
      <circle cx="230" cy="140" r="10" fill="#6B5953"/>
      <path d="M185 190 Q200 205 215 190" stroke="#6B5953" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Noise dots -->
      <circle cx="150" cy="120" r="3" fill="#AA7969"/>
      <circle cx="240" cy="180" r="4" fill="#AA7969"/>
      <circle cx="190" cy="110" r="3" fill="#AA7969"/>
      <circle cx="220" cy="195" r="3" fill="#AA7969"/>
      <text x="20" y="40" fill="#5A4741" font-family="sans-serif" font-weight="bold" font-size="14">STAGE 01: RAW UNPROCESSED INPUT</text>
    </svg>
  `;

  const procSvg = `
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
      <rect width="400" height="320" fill="#FBEDEC"/>
      <!-- Filtered, Bounding Box Normalized Face -->
      <circle cx="200" cy="160" r="90" fill="#FAD0C4"/>
      <circle cx="170" cy="140" r="10" fill="#5A4741"/>
      <circle cx="230" cy="140" r="10" fill="#5A4741"/>
      <path d="M185 190 Q200 205 215 190" stroke="#D9695F" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Bounding box overlay -->
      <rect x="90" y="50" width="220" height="220" rx="12" stroke="#D9695F" stroke-width="2" stroke-dasharray="8 6" fill="none"/>
      <!-- Landmark Grid Points -->
      <circle cx="170" cy="140" r="4" fill="#D9695F"/>
      <circle cx="230" cy="140" r="4" fill="#D9695F"/>
      <circle cx="200" cy="165" r="4" fill="#D9695F"/>
      <circle cx="200" cy="195" r="4" fill="#D9695F"/>
      <text x="20" y="40" fill="#D9695F" font-family="sans-serif" font-weight="bold" font-size="14">STAGE 02: NORMALIZED & CROP ALIGNED</text>
    </svg>
  `;

  rawContainer.innerHTML = rawSvg;
  procContainer.innerHTML = procSvg;
}
