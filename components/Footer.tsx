'use client';
import { CONTACT } from '@/lib/content';
import { trackEvent } from '@/components/EventTracking';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#050505] pt-20 pb-10 border-t border-[#1A1410]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif text-[#C9A24D]">Signature Living Studio</h2>
          <p className="text-[#8A8379] text-sm leading-relaxed max-w-xs text-balance">
            Tailored Luxury, Designed Around Your Lifestyle. Premium interior design and Turnkey execution in Dhaka.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-[#FAF7F1] font-semibold mb-6 uppercase tracking-widest text-xs">Explore</h3>
          <ul className="space-y-3">
            <li><a href="#services" className="text-[#D8C3A5] hover:text-[#C9A24D] text-sm transition-colors">Services</a></li>
            <li><a href="#portfolio" className="text-[#D8C3A5] hover:text-[#C9A24D] text-sm transition-colors">Real Projects</a></li>
            <li><a href="#packages" className="text-[#D8C3A5] hover:text-[#C9A24D] text-sm transition-colors">Packages</a></li>
            <li><a href="#nri" className="text-[#D8C3A5] hover:text-[#C9A24D] text-sm transition-colors">NRI Solutions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#FAF7F1] font-semibold mb-6 uppercase tracking-widest text-xs">Contact</h3>
          <ul className="space-y-4">
            <li>
              <a 
                href={`tel:${CONTACT.phone.replace(/\\D/g,'')}`}
                onClick={() => trackEvent('call_click', { cta_location: 'footer' })}
                className="text-[#D8C3A5] hover:text-[#C9A24D] text-sm tracking-wide flex items-center gap-2 transition-colors"
                aria-label="Call Studio"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a 
                href={`mailto:${CONTACT.email}`}
                className="text-[#D8C3A5] hover:text-[#C9A24D] text-sm flex items-center gap-2 transition-colors break-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                {CONTACT.email}
              </a>
            </li>
            <li className="text-[#D8C3A5] text-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-[#FAF7F1] font-semibold mb-6 uppercase tracking-widest text-xs">Follow Us</h3>
          <div className="flex gap-4">
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#121212] rounded-full text-[#D8C3A5] hover:bg-[#C9A24D] hover:text-[#050505] transition-colors" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#121212] rounded-full text-[#D8C3A5] hover:bg-[#C9A24D] hover:text-[#050505] transition-colors" aria-label="Instagram">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-[#1A1410] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#8A8379]">
        <p>&copy; {new Date().getFullYear()} Signature Living Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#D8C3A5] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#D8C3A5] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
