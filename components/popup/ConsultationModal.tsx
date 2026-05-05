'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { usePopupStore } from '@/hooks/usePopupStore';
import { BrandLogo } from '@/components/BrandLogo';
import { ConsultationForm } from './ConsultationForm';
import { ConsultationSuccess } from './ConsultationSuccess';

export function ConsultationModal() {
  const { isOpen, closePopup } = usePopupStore();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closePopup();
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      // Small delay on reset so we don't flash form while closing
      const t = setTimeout(() => setIsSuccess(false), 500);
      return () => clearTimeout(t);
    }
  }, [isOpen, closePopup]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ y: '100%', opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '100%', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-[880px] bg-[#0E0C0A] sm:rounded-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto shadow-2xl relative"
              style={{ maxHeight: 'calc(100vh - 20px)' }}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Panel - Hidden on mobile */}
              <div className="hidden md:flex flex-col flex-1 bg-[#080808] p-10 border-r border-white/5 relative overflow-hidden">
                <div className="absolute -top-32 -left-32 w-[300px] h-[300px] bg-[#C5A059]/10 rounded-full blur-[100px]" />
                
                <div className="relative z-10">
                  <div className="mb-12">
                    <BrandLogo className="scale-75 origin-left" />
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[10px] uppercase tracking-widest font-medium mb-6 rounded-full border border-[#C5A059]/20">
                    LIMITED SLOTS AVAILABLE
                  </span>

                  <h2 className="font-display text-4xl text-[#FDFBF7] font-light tracking-tight mb-4 leading-tight">
                    Design Clarity<br/>Before You Commit
                  </h2>
                  <p className="text-white/60 text-sm font-light leading-relaxed mb-10 max-w-[280px]">
                    Expert guidance on space, style, materials, and budget before a single rupee is spent.
                  </p>

                  <ul className="space-y-4 mb-12">
                    {[
                      'Space planning & layout direction',
                      'Material and finish consultation',
                      'Budget and execution clarity'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/80 font-light">
                        <span className="text-[#C5A059]">✦</span> {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8 border-t border-white/10 mt-auto">
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-widest font-medium">
                      Factory-backed premium solutions
                    </p>
                    <p className="text-sm font-light text-[#C5A059]">
                      150+ premium projects delivered
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="flex-1 w-full bg-[#12100E] min-h-[60vh] sm:min-h-[500px]">
                {isSuccess ? (
                  <ConsultationSuccess />
                ) : (
                  <ConsultationForm onSuccess={() => setIsSuccess(true)} />
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
