import React from 'react';

type LogoProps = {
  className?: string;
  mode?: "full" | "monogram" | "horizontal" | "stacked";
};

export const BrandLogo = ({ className = "", mode = "full" }: LogoProps) => {
  const isHorizontal = mode === "horizontal";
  const isStacked = mode === "full" || mode === "stacked";
  const isMonogram = mode === "monogram";

  const defs = (
    <defs>
      <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8C97A" />
        <stop offset="45%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <linearGradient id="glow-divider" x1="20%" y1="0%" x2="80%" y2="0%">
        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
        <stop offset="20%" stopColor="#C9A84C" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="80%" stopColor="#C9A84C" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
      </linearGradient>
      <filter id="inner-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.8"/>
      </filter>
    </defs>
  );

  const baseSPath = "M72.1,38.8v-18l-8.5-0.2c-5-6-15.1-12.7-30-12.7c-21.7,0-36.9,13-36.9,35.6c0,19.3,13.6,28.6,35.6,37.6 C51.3,88.9,60.5,95.5,60.5,110c0,14.5-12.9,25.4-32.3,25.4C11.5,135.4,3,121.7,3,121.7L-5.3,132c8.8,14.5,23.3,19.3,37.3,19.3 c27.5,0,51.3-13.6,51.3-40.2c0-23.6-18.1-32.9-36.5-41.4C30,60.3,20,55.4,20,44.9c0-14.2,9.7-22.3,21.1-22.3 C55,22.6,63.1,28,66.8,32.8L72.1,38.8z";
  
  const TopLeftS = <path transform="translate(30, -5) scale(0.9)" d={baseSPath} fill="url(#gold-metallic)" filter="url(#inner-glow)"/>;
  const CenterL = <path transform="translate(58, 15) scale(0.95)" d="M48 20 l0 8 l5 0 l0 95 c0 8 4 10 12 10 l32 0 c6 0 10 -4 10 -15 l0 -12 l10 0 l0 35 l-94 0 l0 -8 l10 0 l0 -95 l-10 0 l0 -8 z" fill="url(#gold-metallic)" filter="url(#inner-glow)"/>;
  const BottomRightS = <path transform="translate(85, 20) scale(1.15)" d={baseSPath} fill="url(#gold-metallic)" filter="url(#inner-glow)"/>;

  const MonogramGroup = (
    <g transform={isStacked ? "translate(100, 10)" : "translate(0, 0)"}>
      {TopLeftS}
      {CenterL}
      {BottomRightS}
    </g>
  );

  if (isMonogram) {
    return (
      <svg viewBox="0 0 200 180" className={className} xmlns="http://www.w3.org/2000/svg">
        {defs}
        {MonogramGroup}
      </svg>
    );
  }

  if (isHorizontal) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <svg viewBox="0 0 200 180" className="h-12 w-auto shrink-0 drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
          {defs}
          {MonogramGroup}
        </svg>
        <div className="flex flex-col">
          <span className="font-display tracking-[0.3em] uppercase text-[#C9A84C] font-bold text-lg leading-none mb-1 text-transparent bg-clip-text bg-gradient-to-br from-[#E8C97A] via-[#C9A84C] to-[#8B6914]">
            SIGNATURE
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#C9A84C] opacity-80 text-[10px]">—</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-light text-transparent bg-clip-text bg-gradient-to-b from-[#C9A84C] to-[#8B6914]">
              LIVING STUDIO
            </span>
            <span className="text-[#C9A84C] opacity-80 text-[10px]">—</span>
          </div>
        </div>
      </div>
    );
  }

  // Stacked Full Logo
  return (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
      {defs}
      
      {/* Monogram Section */}
      {MonogramGroup}
      
      {/* Glow Divider line */}
      <rect x="50" y="210" width="300" height="2" fill="url(#glow-divider)" />
      {/* Light Flare */}
      <ellipse cx="200" cy="211" rx="15" ry="3" fill="#FFFFFF" opacity="0.8" filter="blur(2px)" />
      <circle cx="200" cy="211" r="2" fill="#FFFFFF" />

      {/* Signature Text */}
      <text 
        x="200" 
        y="255" 
        fontFamily="var(--font-playfair), serif" 
        fontWeight="bold" 
        fontSize="32" 
        letterSpacing="0.3em" 
        textAnchor="middle" 
        fill="url(#gold-metallic)"
      >
        SIGNATURE
      </text>

      {/* Living Studio Text */}
      <text 
        x="200" 
        y="285" 
        fontFamily="sans-serif" 
        fontWeight="300" 
        fontSize="12" 
        letterSpacing="0.3em" 
        textAnchor="middle" 
        fill="url(#gold-metallic)"
      >
        — LIVING STUDIO —
      </text>
    </svg>
  );
};

