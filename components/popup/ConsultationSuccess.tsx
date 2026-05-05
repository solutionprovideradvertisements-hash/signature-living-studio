'use client';

import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, ArrowLeft } from 'lucide-react';
import { usePopupStore } from '@/hooks/usePopupStore';

export function ConsultationSuccess() {
  const closePopup = usePopupStore((state) => state.closePopup);

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello, I would like to book a free consultation with Signature Living Studio.");
    // Replace with actual whatsapp number or use same admin number if applicable
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801314442288';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-12 px-6 h-full min-h-[400px]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
      >
        <CheckCircle2 className="w-20 h-20 text-[#C5A059] mb-6" />
      </motion.div>
      
      <h3 className="font-display text-2xl md:text-3xl text-[#FDFBF7] font-light mb-4">
        Consultation Request Received
      </h3>
      
      <p className="text-white/60 text-sm md:text-base max-w-[280px] mx-auto mb-10 leading-relaxed font-light">
        Thank you. Our team will reach you within 1 business day to confirm your session.
      </p>
      
      <div className="flex flex-col w-full gap-4 max-w-[320px]">
        <button 
          onClick={closePopup}
          className="w-full py-4 border border-[#C5A059]/30 text-[#FDFBF7] text-xs uppercase tracking-widest font-medium hover:bg-[#C5A059]/10 transition-colors"
        >
          Return to Website
        </button>
        
        <button 
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 text-xs uppercase tracking-widest font-medium hover:bg-[#25D366]/20 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
