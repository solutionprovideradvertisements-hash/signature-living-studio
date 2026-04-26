import React from 'react';

export const BrandLogo = ({ className = "", mode = "full" }: { className?: string, mode?: "full" | "monogram" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Monogram */}
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={mode === "full" ? "h-16 md:h-20" : "h-12 md:h-14"}
        style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6D5B8" />
            <stop offset="30%" stopColor="#C5A059" />
            <stop offset="70%" stopColor="#9C7938" />
            <stop offset="100%" stopColor="#F5EDDF" />
          </linearGradient>
        </defs>
        
        {/* Abstract interconnected text monogram imitating SLS */}
        <g fill="url(#goldGradient)" style={{ fontFamily: "var(--font-display), 'Playfair Display', serif" }}>
          {/* Left S */}
          <text x="80" y="110" fontSize="110" textAnchor="middle" letterSpacing="-0.05em">S</text>
          {/* Middle L */}
          <text x="105" y="115" fontSize="120" textAnchor="middle" fontWeight="300">L</text>
          {/* Right S */}
          <text x="135" y="110" fontSize="110" textAnchor="middle" letterSpacing="-0.05em">S</text>
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

