'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, MessageCircle, Lock } from 'lucide-react';
import { usePopupStore } from '@/hooks/usePopupStore';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  project_type: z.string().min(1, 'Project type is required'),
  investment_tier: z.string().min(1, 'Investment tier is required'),
  project_brief: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ConsultationForm({ onSuccess }: { onSuccess: () => void }) {
  const source = usePopupStore((state) => state.source);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_type: 'Apartment Interior',
      investment_tier: '10–20 Lakh',
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Collect UTM params
      const searchParams = new URLSearchParams(window.location.search);
      const payload = {
        ...data,
        source: source || 'popup_unknown',
        utm_source: searchParams.get('utm_source') || undefined,
        utm_medium: searchParams.get('utm_medium') || undefined,
        utm_campaign: searchParams.get('utm_campaign') || undefined,
        page_url: window.location.href,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      };

      const res = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('sls_modal_submitted', 'true');
        }
        reset();
        onSuccess();
      } else {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setSubmitError('Connection error. Please try again or contact via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello, I would like to book a free consultation with Signature Living Studio.");
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801314442288';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-8 md:px-10">
      <div className="mb-8">
        <h3 className="font-display text-2xl md:text-3xl text-[#FDFBF7] font-light mb-2">
          Get a Free Consultation
        </h3>
        <p className="text-white/60 text-sm font-light">
          Share your details — our design team will contact you shortly.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-200 text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <div className="space-y-2">
          <input 
            {...register('name')}
            placeholder="Full Name *" 
            className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-[#C5A059]/30'} pb-3 pt-2 px-0 focus:border-[#C5A059] outline-none transition-colors text-[14px] text-[#FDFBF7] placeholder:text-white/30`} 
          />
          {errors.name && <p className="text-[10px] text-red-500/80 uppercase tracking-widest">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <input 
            {...register('phone')}
            placeholder="Phone Number (e.g. 017XXXXXXXX) *" 
            className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-500/50' : 'border-[#C5A059]/30'} pb-3 pt-2 px-0 focus:border-[#C5A059] outline-none transition-colors text-[14px] text-[#FDFBF7] placeholder:text-white/30`} 
          />
          {errors.phone && <p className="text-[10px] text-red-500/80 uppercase tracking-widest">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <input 
            {...register('email')}
            placeholder="Email Address (Optional)" 
            className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-[#C5A059]/30'} pb-3 pt-2 px-0 focus:border-[#C5A059] outline-none transition-colors text-[14px] text-[#FDFBF7] placeholder:text-white/30`} 
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <select 
              {...register('project_type')}
              className={`w-full bg-transparent border-b ${errors.project_type ? 'border-red-500/50' : 'border-[#C5A059]/30'} pb-3 pt-2 px-0 focus:border-[#C5A059] outline-none transition-colors text-[14px] text-white/80 appearance-none rounded-none`}
            >
              <option value="Apartment Interior" className="bg-[#12100E]">Apartment Interior</option>
              <option value="Villa Interior" className="bg-[#12100E]">Villa Interior</option>
              <option value="Kitchen & Wardrobe" className="bg-[#12100E]">Kitchen & Wardrobe</option>
              <option value="Custom Furniture" className="bg-[#12100E]">Custom Furniture</option>
              <option value="Full Home Package" className="bg-[#12100E]">Full Home Package</option>
              <option value="Other" className="bg-[#12100E]">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <select 
              {...register('investment_tier')}
              className={`w-full bg-transparent border-b ${errors.investment_tier ? 'border-red-500/50' : 'border-[#C5A059]/30'} pb-3 pt-2 px-0 focus:border-[#C5A059] outline-none transition-colors text-[14px] text-white/80 appearance-none rounded-none`}
            >
              <option value="Under 5 Lakh" className="bg-[#12100E]">Under 5 Lakh</option>
              <option value="5–10 Lakh" className="bg-[#12100E]">5–10 Lakh</option>
              <option value="10–20 Lakh" className="bg-[#12100E]">10–20 Lakh</option>
              <option value="20–50 Lakh" className="bg-[#12100E]">20–50 Lakh</option>
              <option value="50 Lakh+" className="bg-[#12100E]">50 Lakh+</option>
              <option value="Prefer not to say" className="bg-[#12100E]">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <textarea 
            {...register('project_brief')}
            placeholder="Project Brief (Optional)" 
            rows={2}
            className="w-full bg-transparent border-b border-[#C5A059]/30 pb-3 pt-2 px-0 focus:border-[#C5A059] outline-none transition-colors text-[14px] text-[#FDFBF7] placeholder:text-white/30 resize-none" 
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-[#C5A059] text-[#080808] hover:bg-[#b08d4b] py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Book Free Consultation'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 flex items-center gap-4 text-white/30 uppercase text-[10px] tracking-widest whitespace-nowrap">
        <div className="h-[1px] bg-white/10 w-full" />
        OR
        <div className="h-[1px] bg-white/10 w-full" />
      </div>

      <button 
        type="button"
        onClick={handleWhatsApp} 
        disabled={isSubmitting}
        className="mt-6 w-full bg-transparent border border-white/20 text-white/80 hover:bg-white/5 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px]"
      >
        <MessageCircle className="w-4 h-4" />
        Chat on WhatsApp
      </button>

      <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-[10px]">
        <Lock className="w-3 h-3" />
        <span>Private inquiry — No spam. Data protected.</span>
      </div>
    </div>
  );
}
