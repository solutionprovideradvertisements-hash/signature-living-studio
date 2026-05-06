'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/components/EventTracking';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#1A1410] py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-xl sm:text-2xl text-[#FAF7F1] tracking-wide relative group">
          Signature Living <span className="text-[#C9A24D]">Studio</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-[#D8C3A5] hover:text-[#C9A24D] transition-colors uppercase tracking-widest">Services</a>
          <a href="#portfolio" className="text-sm font-medium text-[#D8C3A5] hover:text-[#C9A24D] transition-colors uppercase tracking-widest">Projects</a>
          <a href="#process" className="text-sm font-medium text-[#D8C3A5] hover:text-[#C9A24D] transition-colors uppercase tracking-widest">Process</a>
          <a href="#consultation" onClick={() => trackEvent('book_consultation_click', { cta_location: 'navbar' })} className="px-5 py-2.5 bg-[#C9A24D] text-[#050505] text-sm font-bold uppercase tracking-widest rounded hover:bg-[#E4C878] transition-colors">
            Book Consult
          </a>
        </nav>

        {/* Mobile Nav Toggle can be added here if needed, keeping it simple for now as we have sticky mobile CTA */}
        <div className="md:hidden">
          <a href="#consultation" onClick={() => trackEvent('book_consultation_click', { cta_location: 'navbar_mobile' })} className="px-4 py-2 bg-[#C9A24D] text-[#050505] text-xs font-bold uppercase tracking-widest rounded hover:bg-[#E4C878] transition-colors">
            Consult
          </a>
        </div>
      </div>
    </header>
  );
}
