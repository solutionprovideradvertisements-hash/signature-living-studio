'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    quote: "The signature consultation completely demystified the budget and timeline. The level of detail in the design direction gave us utter confidence before execution began.",
    name: "A. Rahman",
    project: "Villa Interior — Gulshan, Dhaka"
  },
  {
    quote: "Signature Living delivered our apartment with stunning precision. The custom factory furniture fits perfectly and the aesthetic is unparalleled.",
    name: "S. Ahmed",
    project: "Apartment Interior — Banani, Dhaka"
  },
  {
    quote: "Their one-stop execution saved us from dealing with multiple contractors. A truly premium, headache-free experience from start to finish.",
    name: "M. Hossain",
    project: "Penthouse Fit-Out — Baridhara, Dhaka"
  }
];

export function TestimonialsSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.15 });
  
  return (
    <section id="testimonials" className="py-24 md:py-40 bg-[#100E0C]"> {/* Lighter offset from #080808 */}
      <div className="container" ref={ref}>
        <div className="flex flex-col items-center mb-20 text-center">
          <p className={`text-[#C5A059] uppercase tracking-[0.3em] text-[10px] mb-4 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[24px]'}`}>
            Client Confidence
          </p>
          <h2 className={`font-display text-4xl md:text-5xl text-[#FDFBF7] font-light transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[24px]'}`}>
            Words from <span className="italic text-[#E6D5B8]">Our Clients</span>
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              className={`relative p-8 md:p-12 bg-[#080808] border border-[#080808] flex flex-col h-full
                transition-all duration-[300ms] ease-out
                hover:-translate-y-[6px] hover:shadow-2xl hover:shadow-[#00000080] hover:border-l-[#C5A059]
                ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[24px]'}`}
              style={{ 
                borderLeftColor: 'transparent',
                transitionProperty: 'all',
                transitionDuration: isRevealed ? '300ms' : '600ms',
                transitionTimingFunction: isRevealed ? 'ease-out' : 'cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: isRevealed ? '0ms' : `${i * 150}ms`,
              }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-transparent transition-colors duration-300 group-hover:bg-[#C5A059]" />
              <span className="text-[#C5A059] font-display text-6xl leading-none mb-4 block">&quot;</span>
              <p className="text-[14px] text-white/50 italic leading-relaxed font-light mb-8 flex-grow">
                {t.quote}
              </p>
              <div className="w-8 h-[1px] bg-[#C5A059]/30 mb-6" />
              <div>
                <p className="text-[#FDFBF7] text-[13px] font-medium tracking-wide uppercase mb-1">{t.name}</p>
                <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.2em]">{t.project}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
