'use client';
import { trackEvent } from '@/components/EventTracking';

interface PackageCardProps {
  title: string;
  bestFor: string;
  includes: string;
  ctaText: string;
  isPopular?: boolean;
}

export default function PackageCard({ title, bestFor, includes, ctaText, isPopular }: PackageCardProps) {
  return (
    <div className={`relative bg-[#121212] flex flex-col h-full rounded p-6 sm:p-8 border ${isPopular ? 'border-[#C9A24D]' : 'border-[#1A1410]'} hover:border-[#C9A24D]/50 transition-colors`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C9A24D] text-[#050505] text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
          Most Requested
        </div>
      )}
      <h3 className="text-xl font-serif text-[#FAF7F1] mb-2">{title}</h3>
      <p className="text-sm text-[#8A8379] mb-6"><strong className="text-[#D8C3A5]">Best For:</strong> {bestFor}</p>
      
      <div className="mb-8 flex-grow">
        <p className="text-sm text-[#D8C3A5] font-medium mb-3">Includes:</p>
        <p className="text-sm text-[#D8C3A5] leading-relaxed relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#C9A24D]">
          {includes}
        </p>
      </div>

      <a 
        href="#consultation"
        onClick={() => trackEvent('package_cta_click', { package_name: title })}
        className={`w-full text-center py-3 px-4 rounded text-sm font-bold uppercase tracking-widest transition-colors ${
          isPopular 
            ? 'bg-[#C9A24D] text-[#050505] hover:bg-[#E4C878]' 
            : 'bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-[#050505]'
        }`}
      >
        {ctaText}
      </a>
    </div>
  );
}
