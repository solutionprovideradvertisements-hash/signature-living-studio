'use client';
import { trackEvent } from '@/components/EventTracking';

interface ServiceCardProps {
  title: string;
  description: string;
  ctaText: string;
}

export default function ServiceCard({ title, description, ctaText }: ServiceCardProps) {
  return (
    <div className="service-card group bg-[#121212] border border-[#1A1410] p-6 rounded flex flex-col h-full outline-none">
      <h3 className="text-lg font-serif text-[#FAF7F1] mb-3">{title}</h3>
      <p className="text-sm text-[#D8C3A5] mb-6 flex-grow leading-relaxed">{description}</p>
      <a 
        href="#consultation" 
        onClick={() => trackEvent('service_card_click', { service_name: title })}
        className="service-card-cta text-[#C9A24D] text-sm font-semibold uppercase tracking-wider flex items-center hover:text-[#E4C878] transition-colors mt-auto w-fit outline-none"
      >
        {ctaText}
        <svg className="service-card-arrow ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
