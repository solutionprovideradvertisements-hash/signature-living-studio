import React from 'react';

export const BrandLogo = ({ className = "", mode = "full" }: { className?: string, mode?: "full" | "monogram" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Monogram */}
      <svg
        viewBox="0 0 240 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={mode === "full" ? "h-20 md:h-24" : "h-14 md:h-16"}
        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))" }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A6E2F" />
            <stop offset="20%" stopColor="#C5A037" />
            <stop offset="40%" stopColor="#F9F295" />
            <stop offset="50%" stopColor="#E6BE8A" />
            <stop offset="60%" stopColor="#F9F295" />
            <stop offset="80%" stopColor="#C5A037" />
            <stop offset="100%" stopColor="#8A6E2F" />
          </linearGradient>
        </defs>
        
        {/* Monogram - SL interwoven - Refined for exact serif look */}
        <g fill="url(#goldGradient)" className="translate-x-[20px] translate-y-[10px]">
          {/* L - Central Pillar */}
          <path d="M105 20 H120 V125 H165 V135 H80 V125 H105 V20Z" />
          
          {/* S Left - High positioned, extremely elegant serif curvature */}
          <path d="M45 75 C45 45 75 35 100 35 V48 C75 48 58 55 58 75 C58 95 105 105 105 135 C105 165 65 175 40 175 V162 C65 162 92 155 92 135 C92 115 45 105 45 75Z" />
          
          {/* S Right - Lower positioned, elegant serif curvature */}
          <path d="M135 95 C135 65 165 55 190 55 V68 C165 68 148 75 148 95 C148 115 195 125 195 155 C195 185 155 195 130 195 V182 C155 182 182 175 182 155 C182 135 135 125 135 95Z" />
        </g>
      </svg>

      {/* Signature Text - Only in full mode */}
      {mode === "full" && (
        <div className="flex flex-col items-center mt-3">
          <span className="font-display text-[16px] md:text-[18px] tracking-[0.4em] uppercase text-[#FDFBF7] leading-none mb-2 translate-x-[0.2em]">
            SIGNATURE
          </span>
          <div className="flex items-center gap-4">
            <span className="w-6 h-[1px] bg-[#C5A059]/40"></span>
            <div className="flex flex-col items-center text-[7px] md:text-[8px] uppercase tracking-[0.5em] text-[#C5A059] font-medium pb-1 leading-[1.3] translate-x-[0.25em]">
              <span>LIVING</span>
              <span>STUDIO</span>
            </div>
            <span className="w-6 h-[1px] bg-[#C5A059]/40"></span>
          </div>
        </div>
      )}
    </div>
  );
};

