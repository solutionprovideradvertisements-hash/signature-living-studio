'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[32px] right-[32px] z-[9999] w-12 h-12 flex items-center justify-center rounded-full bg-[#C9A84C] text-[#12100E] shadow-xl hover:shadow-[0_0_16px_rgba(201,168,76,0.4)]
        transition-all duration-300 ease-out group
        ${isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}
      `}
      aria-label="Back to top"
    >
      <div className="absolute inset-0 rounded-full border border-[#C9A84C] animate-[pulse_2s_ease-in-out_infinite] scale-110 opacity-40"></div>
      <ChevronUp size={24} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
    </button>
  );
}
