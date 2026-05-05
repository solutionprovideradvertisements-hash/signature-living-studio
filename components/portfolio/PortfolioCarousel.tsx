'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface Project {
  title: string;
  category: string;
  images: string[];
}

export function PortfolioCarousel({ project, delay }: { project: Project, delay: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((i) => (i + 1) % project.images.length);
  };
  
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((i) => (i - 1 + project.images.length) % project.images.length);
  };

  return (
    <Reveal type="fade-scale" delay={delay} className="group relative aspect-[3/4] overflow-hidden border border-[#C5A059]/10 bg-[#080808]">
      <div className="absolute inset-0 flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {project.images.map((src, i) => (
          <div key={i} className="relative w-full h-full shrink-0">
             <Image 
                src={src} 
                alt={`${project.title} - Image ${i + 1}`} 
                fill 
                className="object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s] ease-out" 
             />
          </div>
        ))}
      </div>
      
      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#12100E]/70 backdrop-blur-sm text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#12100E] rounded-full z-30">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#12100E]/70 backdrop-blur-sm text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#12100E] rounded-full z-30">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {project.images.map((_, i) => (
          <button 
            key={i} 
            onClick={(e) => { e.preventDefault(); setCurrentIndex(i); }} 
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-[#C5A059]' : 'bg-[#C5A059]/30 drop-shadow-md'}`} 
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent z-10 transition-all duration-700 group-hover:h-[70%] pointer-events-none" />
      <div className="absolute inset-0 border-[1px] border-[#E6D5B8]/5 m-4 pointer-events-none transition-all duration-700 group-hover:m-6 z-20" />
      
      <div className="absolute bottom-10 left-10 right-10 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out pointer-events-none">
        <p className="text-[#C5A059] text-[9px] uppercase tracking-[0.4em] mb-3 font-medium flex items-center gap-2">
          <span className="w-4 h-[1px] bg-[#C5A059]/50"></span>
          {project.category}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-[#FDFBF7] font-light">{project.title}</h3>
      </div>
    </Reveal>
  );
}
