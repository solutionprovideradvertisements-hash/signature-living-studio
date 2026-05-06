'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/components/EventTracking';
import { CONTACT } from '@/lib/content';
import { Phone, MessageCircle } from 'lucide-react';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show after scrolling down 20% of the viewport height, but hide near footer
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.2;
      
      const footer = document.getElementById('footer');
      const footerTop = footer ? footer.offsetTop : document.body.scrollHeight;
      const overFooter = (scrolled + window.innerHeight) > footerTop;
      
      if (scrolled > threshold && !overFooter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#050505] border-t border-[#1A1410] flex items-center justify-between px-4 py-3 pb-safe gap-3 shadow-2xl">
      <a 
        href={`https://wa.me/${CONTACT.whatsapp.replace(/\\D/g,'')}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { cta_location: 'mobile_sticky' })}
        className="flex items-center justify-center gap-2 flex-1 bg-[#121212] border border-[#2F7D5C] text-[#2F7D5C] font-semibold rounded py-3 transition-colors active:bg-[#2F7D5C] active:text-white"
      >
        <MessageCircle size={18} />
        <span className="text-sm">WhatsApp</span>
      </a>
      <a 
        href="#consultation"
        onClick={() => trackEvent('book_consultation_click', { cta_location: 'mobile_sticky' })}
        className="flex-1 bg-[#C9A24D] text-[#050505] font-bold text-center rounded py-3 text-sm transition-colors active:bg-[#E4C878]"
      >
        Book Consult
      </a>
    </div>
  );
}
