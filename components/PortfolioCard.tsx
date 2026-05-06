'use client';
import Image from 'next/image';
import { trackEvent } from '@/components/EventTracking';

interface PortfolioCardProps {
  title: string;
  scope: string;
  imageFallbackLabel?: string;
}

export default function PortfolioCard({ title, scope, imageFallbackLabel = "Project Preview" }: PortfolioCardProps) {
  return (
    <div className="group relative overflow-hidden rounded bg-[#121212] border border-[#1A1410] flex flex-col h-full">
      <div className="relative aspect-[4/3] w-full bg-[#1A1410] overflow-hidden flex items-center justify-center">
        {/* Placeholder image representation since we don't have real assets yet */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1410] to-[#121212] flex flex-col items-center justify-center text-[#8A8379] p-6 text-center z-0">
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" className="mb-3">
             <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
             <polyline points="9 22 9 12 15 12 15 22"></polyline>
           </svg>
           <span className="text-sm font-medium tracking-widest uppercase opacity-70">{imageFallbackLabel}</span>
           <span className="text-xs opacity-50 mt-2">{title}</span>
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-serif text-[#FAF7F1] mb-2">{title}</h3>
        <p className="text-sm text-[#8A8379] mb-6 flex-grow">{scope}</p>
        <a 
          href="#consultation"
          onClick={() => trackEvent('view_portfolio_click', { project_name: title })}
          className="inline-flex items-center text-[#C9A24D] text-sm font-bold uppercase tracking-wider hover:text-[#E4C878] transition-colors mt-auto"
        >
          View Case Study
          <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
