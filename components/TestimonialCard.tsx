import { trackEvent } from '@/components/EventTracking';

interface TestimonialCardProps {
  quote: string;
  author: string;
  details: string;
}

export default function TestimonialCard({ quote, author, details }: TestimonialCardProps) {
  return (
    <div className="bg-[#121212] p-8 rounded border border-[#1A1410] flex flex-col h-full relative">
      <div className="text-[#C9A24D] mb-6 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        ))}
      </div>
      <div className="text-[#D8C3A5] italic leading-relaxed mb-8 flex-grow">
        "{quote}"
      </div>
      <div>
        <p className="text-[#FAF7F1] font-semibold font-sans">{author}</p>
        <p className="text-[#8A8379] text-xs uppercase tracking-wider mt-1">{details}</p>
      </div>
    </div>
  );
}
