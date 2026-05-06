'use client';
import { useState } from 'react';
import { trackEvent } from '@/components/EventTracking';
import { motion, AnimatePresence } from 'motion/react';

interface FAQAccordionProps {
  question: string;
  answer: string;
}

export default function FAQAccordion({ question, answer }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (!isOpen) {
      trackEvent('faq_open', { question_text: question });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-[#1A1410] overflow-hidden">
      <button 
        onClick={toggle}
        className="w-full text-left py-6 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D]"
        aria-expanded={isOpen}
      >
        <span className="text-[#FAF7F1] pr-8 font-medium font-sans">{question}</span>
        <span className="text-[#C9A24D] flex-shrink-0 transition-transform duration-300 transform">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="pb-6 text-[#D8C3A5] text-sm leading-relaxed pr-8 font-sans">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
