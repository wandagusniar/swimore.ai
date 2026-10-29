import React from 'react'

// The Swimore lightning-bolt logo as an inline SVG component
export const BrandIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${className} shrink-0`}>
    <defs>
      <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFA3" />
        <stop offset="100%" stopColor="#00D284" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="#0A0F18" />
    <rect x="24" y="24" width="464" height="464" rx="112" fill="url(#emeraldGrad)" />
    <rect x="28" y="28" width="456" height="456" rx="108" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="4" />
    <path d="M280 84 L160 268 C155 276 161 286 170 286 L250 286 L224 424 C221 436 236 443 244 432 L364 248 C369 240 363 230 354 230 L274 230 L300 92 C303 80 288 73 280 84 Z" fill="#05080E" />
  </svg>
)

export default BrandIcon
