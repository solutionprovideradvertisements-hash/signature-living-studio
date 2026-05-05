'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Home, Phone, ShieldCheck, Sparkles, Gem, Menu, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { BrandLogo } from "@/components/BrandLogo";
import { sendLeadNotifications } from "@/app/actions/contact";
import { usePopupStore } from '@/hooks/usePopupStore';
import { Reveal } from '@/components/ui/Reveal';
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection';
import { PortfolioCarousel } from '@/components/portfolio/PortfolioCarousel';

const services = [
  "Villa Interior Design",
  "Apartment Interior Design",
  "Kitchen Design",
  "Bedroom Design",
  "Living Room Design",
  "Dining Room Design",
  "Office Design & Commercial Fit-Out",
  "Hotel Interior Design",
  "Restaurant Design & Fit-Out",
  "Retail Fit-Out",
  "Beauty Salon",
  "Hospital & Clinical Fit-Out",
  "Landscape Design",
  "Exterior Design",
  "Joinery",
  "Smart Home",
  "Home Cinema",
  "Swimming Pool Design",
  "Marble Supply, Fixing & Polishing",
  "Engineering Consultant MEP"
];

const packages = [
  { title: "Essential Interior", desc: "For apartment owners who need a premium start with clear scope." },
  { title: "Premium Turnkey", desc: "Design, custom furniture, factory production and site execution." },
  { title: "Villa Signature", desc: "Full luxury villa planning, fit-out, furnishing and supervision." },
  { title: "Fast Track Pack", desc: "Urgent kitchen, wardrobe or renovation execution in 72 hours to 7 days." }
];

const steps = [
  "Consultation & Lifestyle Mapping",
  "Space Planning & Design Direction",
  "3D Visualization & Material Selection",
  "BOQ, Budget Lock & Timeline Lock",
  "Factory Production & Quality Check",
  "Site Execution & Installation",
  "Handover, Warranty & After-Sales Care"
];

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, "Must be a valid Bangladeshi phone number"),
  project_type: z.string().min(1, "Please select a project type"),
  budget_range: z.string().min(1, "Please select an investment tier"),
  message: z.string().refine(val => !val || val.length >= 20, "Brief must be at least 20 characters").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const openPopup = usePopupStore((state) => state.openPopup);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      project_type: "Apartment Interior",
      budget_range: "Premium",
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const submissionData = {
      ...data,
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from('enquiries').insert([submissionData]);
      if (error) throw error;
      
      // Attempt to send SMS securely via server action
      try {
        await sendLeadNotifications(data);
      } catch (smsError) {
        console.error('Non-blocking SMS error:', smsError);
      }

      setSubmitStatus('success');
      reset();
      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Section 1: Top Bar */}
      <section id="topbar" className="border-b border-[#C5A059]/20 bg-[#050505] py-2 text-center text-[9px] uppercase tracking-[0.3em] text-[#E6D5B8]/60">
        SIGNATURE LIVING STUDIO :: TAILORED LUXURY, DESIGNED AROUND YOUR LIFESTYLE
      </section>

      {/* Section 2: Header */}
      <header id="header" className="sticky top-0 z-50 border-b border-[#C5A059]/10 bg-[#080808]/95 backdrop-blur-xl">
        <div className="container flex h-24 items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <BrandLogo mode="horizontal" className="h-[48px] w-auto scale-90 md:scale-100 origin-left" />
          </Link>
          
          <nav className="hidden items-center gap-10 text-[10px] uppercase tracking-[0.3em] text-white/50 xl:flex">
            {["Services", "Process", "Portfolio", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#E6D5B8] hover:tracking-[0.35em] transition-all duration-500 font-medium">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => openPopup('popup_navbar')} className="hidden border border-[#C5A059] bg-[#C5A059] text-[#050505] text-[9px] uppercase tracking-[0.2em] font-semibold py-2 px-6 hover:bg-[#E6D5B8] transition-colors md:flex flex-col items-center justify-center leading-tight">
              <span>BOOK</span>
              <span>CONSULTATION</span>
            </button>
            <button 
              className="text-[#E6D5B8] ml-2 outline-none p-2 xl:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <motion.div 
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="xl:hidden overflow-hidden bg-[#080808] border-b border-[#C5A059]/20"
        >
          <div className="container py-8 flex flex-col gap-6 text-center">
            {["Services", "Process", "Portfolio", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-white/60 hover:text-[#E6D5B8] text-[11px] uppercase tracking-[0.3em]"
              >
                {item}
              </a>
            ))}
            <button className="btn-primary w-full mx-auto max-w-xs mt-4" onClick={() => { setIsMenuOpen(false); openPopup('popup_navbar'); }}>Book Consultation</button>
          </div>
        </motion.div>
      </header>

      {/* Section 3: Hero */}
      <section id="hero" className="relative overflow-hidden py-32 md:py-48 bg-[#080808]">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* Circular Gold Forms (from reference) */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-[#C5A059]/20 rounded-full translate-x-1/3 -translate-y-1/3 opacity-30 blur-[2px]" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border border-[#C5A059]/40 rounded-full translate-x-1/4 -translate-y-1/4 opacity-20 blur-[1px]" />
        <div className="absolute bottom-0 left-0 w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] border border-[#C5A059]/10 rounded-full -translate-x-1/2 translate-y-1/2 opacity-20 blur-[3px]" />

        <div className="container relative grid gap-16 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrandLogo mode="stacked" className="h-[150px] w-[200px] mb-8" />
            <div className="mb-8 inline-flex items-center gap-4 px-6 p-4 border border-[#C5A059]/30 rounded-[30px] font-medium text-[8px] md:text-[9px] uppercase tracking-[0.3em] bg-[#12100E] text-[#E6D5B8]/80 backdrop-blur-sm max-w-xs shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0"></span>
              <span className="leading-[1.6]">EXCLUSIVE INTERIOR<br/>ARCHITECTURE</span>
            </div>
            <h1 className="font-display text-[55px] md:text-[85px] leading-[1.05] tracking-[-0.04em] text-[#FDFBF7] mb-8 max-w-[90vw]">
              Tailored<br />
              <span className="italic text-[#C5A059] font-light">Luxury,</span><br />
              <span className="text-white/95">Designed<br />Around<br />Your Lifestyle.</span>
            </h1>
            <p className="mt-8 max-w-lg text-[13px] md:text-[15px] leading-relaxed text-white/50 font-light tracking-wide">
              An elite design studio serving affluent homeowners in Dhaka. We deliver cinematic spaces with quiet confidence, integrating factory-backed execution with high-touch service.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a href="#portfolio" className="btn-primary">View Portfolio</a>
              <button onClick={() => openPopup('popup_hero')} className="btn-secondary">Request Consultation</button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-[#C5A059]/40 to-transparent"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent z-10 rounded-[24px] h-[50%] top-auto bottom-0 translate-y-1"></div>
            <div className="rounded-[24px] overflow-hidden bg-[#12100E] relative aspect-[3/4]">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/luxuryhome/800/1000')] bg-cover bg-center mix-blend-overlay opacity-50 hover:scale-105 transition-transform duration-[2s]"></div>
              <div className="absolute inset-0 border-[1px] border-white/5 mx-4 my-4 rounded-[16px] pointer-events-none"></div>
              <div className="absolute bottom-10 inset-x-0 text-center z-20 px-8">
                 <BrandLogo mode="monogram" className="h-[100px] w-auto opacity-70 mb-4 mx-auto" />
                 <p className="text-[10px] uppercase tracking-[0.4em] text-[#E6D5B8]/80 font-medium">Signature Execution</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Trust Strip */}
      <section id="trust-strip" className="py-12 border-y border-[#C5A059]/10 bg-[#12100E] overflow-hidden">
        <div className="container">
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4 items-center">
            {["Premium Architecture", "Edge Infrastructure", "Factory-Backed Production", "Turnkey Handover"].map((x) => (
              <div key={x} className="text-[#E6D5B8]/60 font-medium text-center text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-2">
                <span className="w-8 h-[1px] bg-[#C5A059]/30"></span>
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: About */}
      <section id="about" className="py-24 md:py-40 bg-[#080808]">
        <div className="container relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] border border-[#C5A059]/10 rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />
          <div className="grid gap-16 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-[#C5A059]/50"></span>
              <p className="text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-medium">Studio Philosophy</p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.1] font-light text-[#FDFBF7]">
              Design must <br/>
              <span className="italic text-[#E6D5B8]">serve the life</span><br/>
              lived within.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-white/60 max-w-lg font-light mb-8">
                We believe in tailored luxury. Our approach manages concept, fine materials, and custom furniture production through a unified, meticulous execution process. We prioritize timeless architectural integrity over fleeting aesthetic trends.
              </p>
              <BrandLogo mode="monogram" className="opacity-40 origin-left scale-75" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 6: Services */}
      <section id="services" className="bg-[#12100E] py-24 md:py-40 border-t border-[#C5A059]/10">
        <div className="container">
          <header className="mb-20 text-center md:text-left">
            <p className="text-[#C5A059] font-medium uppercase tracking-[0.3em] text-[10px] mb-4">Our Expertise</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#FDFBF7] font-light tracking-tight">Complete Luxury <span className="italic text-[#E6D5B8]">Interior</span> <br className="hidden md:block" /> & Turnkey Solutions</h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 12).map((service, i) => (
              <Reveal 
                key={service} 
                delay={i * 80}
                className="group relative rounded-none border border-[#C5A059]/10 bg-[#080808]/50 p-8 hover:bg-[#080808] hover:border-[#C5A059]/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="block text-[#C5A059]/40 font-mono text-[10px] mb-6 group-hover:text-[#C5A059] transition-colors">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-medium text-[#FDFBF7] text-[14px] leading-snug tracking-wide group-hover:text-[#E6D5B8] transition-colors relative z-10">{service}</h3>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#C5A059] group-hover:w-full transition-all duration-700 ease-out" />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => openPopup('popup_services')} className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] hover:text-[#E6D5B8] transition-colors border-b border-[#C5A059]/30 hover:border-[#E6D5B8] pb-1 inline-block">
              Request Full Service Outline
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: Process */}
      <section id="process" className="py-24 md:py-40 bg-[#080808]">
        <div className="container">
          <div className="flex flex-col items-center mb-20 text-center">
            <BrandLogo mode="monogram" className="scale-50 opacity-40 mb-2" />
            <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] mb-4">Our Methodology</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#FDFBF7] font-light">The <span className="italic">Signature</span> <br/>Execution Framework</h2>
          </div>
          <div className="mt-16 grid gap-0 md:grid-cols-2 lg:grid-cols-7 border-y border-[#C5A059]/10 group">
            {steps.map((step, index) => (
              <Reveal 
                key={step} 
                type="slide-left"
                delay={index * 100}
                className="relative p-8 flex flex-col items-center text-center hover:bg-[#12100E] transition-colors duration-500 border-b border-b-[#C5A059]/10 lg:border-b-0 lg:border-r lg:border-r-[#C5A059]/10 last:border-b-0 lg:last:border-r-0"
              >
                <span className="text-[#C5A059]/50 font-display text-3xl mb-6 font-light transition-colors">{index + 1}</span>
                <p className="text-[11px] text-[#E6D5B8]/80 font-medium uppercase tracking-wider leading-relaxed">{step}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Portfolio */}
      <section id="portfolio" className="py-24 md:py-40 bg-[#12100E]">
        <div className="container relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] font-medium">Showcase</p>
                <span className="h-[1px] w-12 bg-[#C5A059]/50"></span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#FDFBF7] font-light tracking-tight max-w-xl">Curated <span className="italic text-[#E6D5B8]">Masterpieces</span> <br className="hidden md:block"/> for Modern Living.</h2>
            </div>
            <button onClick={() => openPopup('popup_portfolio')} className="btn-secondary w-fit shrink-0">View Full Portfolio</button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "The Penthouse", category: "Residential Interior", images: ['https://picsum.photos/seed/lux1/800/1000', 'https://picsum.photos/seed/lux1b/800/1000', 'https://picsum.photos/seed/lux1c/800/1000'] },
              { title: "Villa Noir", category: "Elite Architecture", images: ['https://picsum.photos/seed/lux2/800/1000', 'https://picsum.photos/seed/lux2b/800/1000', 'https://picsum.photos/seed/lux2c/800/1000'] },
              { title: "Gold & Charcoal", category: "Custom Styling", images: ['https://picsum.photos/seed/lux3/800/1000', 'https://picsum.photos/seed/lux3b/800/1000', 'https://picsum.photos/seed/lux3c/800/1000'] }
            ].map((item, i) => (
              <PortfolioCarousel key={item.title} project={item} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8.5: Testimonials */}
      <TestimonialsSection />

      {/* Section 9: Packages */}
      <section id="packages" className="py-24 md:py-40 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 min-w-[100vw] min-h-[100vw] sm:min-w-[80vw] sm:min-h-[80vw] border-[1px] border-[#C5A059]/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="container relative">
          <header className="text-center mb-20 flex flex-col items-center">
            <BrandLogo mode="monogram" className="scale-50 opacity-30 mb-2" />
            <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] mb-4">Investment Scale</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#FDFBF7] font-light">Tailored <span className="italic text-[#E6D5B8]">Propositions</span></h2>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, i) => (
              <motion.div 
                key={pkg.title} 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-[#12100E] p-10 flex flex-col h-full border border-[#C5A059]/10 hover:border-[#C5A059]/30 transition-all duration-500 group relative"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Gem className="text-[#C5A059]/30 w-5 h-5" />
                </div>
                <h3 className="font-display text-2xl mb-4 text-[#FDFBF7] group-hover:text-[#E6D5B8] transition-colors">{pkg.title}</h3>
                <p className="text-[13px] text-white/50 font-light leading-relaxed mb-10 flex-grow">{pkg.desc}</p>
                <button onClick={() => openPopup('popup_packages')} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium hover:gap-4 transition-all">
                  Request Detail <ArrowRight size={14} className="text-[#E6D5B8]" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Why Us */}
      <section id="why-us" className="bg-[#12100E] py-24 md:py-40">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
             <h2 className="font-display text-4xl md:text-5xl text-[#FDFBF7] font-light max-w-lg">
                The <span className="italic text-[#E6D5B8]">Signature</span> Standard
             </h2>
             <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] hidden md:block">Uncompromising Excellence</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { 
                title: "Personalized Design", 
                text: "Every layout is meticulously designed around family lifestyle, storage, movement and absolute comfort.",
                icon: <Home className="text-[#C5A059] mb-8 h-8 w-8 stroke-1" />
              },
              { 
                title: "Material Transparency", 
                text: "Detailed budgets and clear material specifications to align exceptional design with your preferred investment.",
                icon: <Sparkles className="text-[#C5A059] mb-8 h-8 w-8 stroke-1" />
              },
              { 
                title: "One-Stop Execution", 
                text: "Architecture, bespoke furniture, technical fittings, installation and handover from a singular accountable studio.",
                icon: <ShieldCheck className="text-[#C5A059] mb-8 h-8 w-8 stroke-1" />
              }
            ].map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="border border-[#C5A059]/10 bg-[#080808] p-12 hover:bg-[#080808]/80 transition-colors group"
              >
                <div className="p-3 bg-[#C5A059]/5 inline-block rounded-none mb-6 border border-[#C5A059]/20 group-hover:bg-[#C5A059]/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-display text-2xl mb-4 text-[#FDFBF7] font-light tracking-wide">{item.title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed font-light">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: Metrics & NRI */}
      <section id="metrics" className="py-24 md:py-40 bg-[#080808] border-t border-[#C5A059]/10">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid gap-4 grid-cols-2">
                {["Luxury Residences", "Bespoke Furniture", "Factory Execution", "Dhaka Studio"].map((x, i) => (
                  <motion.div 
                    key={x} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-[#C5A059]/10 p-8 text-center bg-[#12100E] flex flex-col items-center justify-center hover:border-[#C5A059]/30 transition-colors"
                  >
                    <BrandLogo mode="monogram" className="scale-50 opacity-20 mb-2 grayscale" />
                    <p className="font-medium text-[11px] uppercase tracking-[0.2em] text-[#FDFBF7] mb-1">{x}</p>
                  </motion.div>
                ))}
            </div>
            <div className="lg:pl-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                 <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] font-medium">NRI & Overseas Clients</p>
                 <span className="h-[1px] w-12 bg-[#C5A059]/50"></span>
              </div>
              <h2 className="font-display text-4xl leading-[1.1] text-[#FDFBF7] font-light">Manage your Dhaka residence <span className="italic text-[#E6D5B8]">from anywhere.</span></h2>
              <p className="mt-8 text-[14px] leading-relaxed text-white/50 font-light max-w-md">
                We support distant families with rigorous digital consultation, secure material approvals, transparent progress tracking, and elevated final handover documentation—ensuring total peace of mind.
              </p>
              <div className="mt-10">
                <button onClick={() => openPopup('popup_remote')} className="border-b border-[#C5A059]/40 pb-1 text-[10px] uppercase tracking-[0.3em] text-[#C5A059] hover:text-[#E6D5B8] transition-colors">Setup Remote Call</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Materials & Reviews */}
      <section id="materials" className="py-24 md:py-40 bg-[#12100E] border-y border-[#C5A059]/10">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                 <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] font-medium">Curated Finishes</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FDFBF7] font-light leading-[1.1] mb-12">
                Materials for <span className="italic text-[#E6D5B8]">timeless</span> appeal.
              </h2>
              <div className="grid gap-4">
                {["Italian Veneer & Natural Wood", "Emperador Marble & Quartz", "Brushed Brass & Architectural Lighting"].map((x) => (
                  <div key={x} className="flex gap-6 items-center p-6 border border-[#C5A059]/10 bg-[#080808] hover:border-[#C5A059]/30 transition-colors">
                    <div className="h-10 w-10 border border-[#C5A059]/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-[#C5A059]/60 rotate-45" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#FDFBF7] text-[13px] uppercase tracking-wider">{x}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center border border-[#C5A059]/10 bg-[#080808] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 border border-[#C5A059]/20 rounded-full translate-x-1/2 -translate-y-1/2 opacity-20" />
              <BrandLogo mode="monogram" className="opacity-20 mb-8 w-fit scale-75 origin-left" />
              <p className="text-[#C5A059] font-medium uppercase tracking-[0.3em] text-[10px] mb-8">Client Confidence</p>
              <h2 className="font-display text-3xl leading-[1.2] text-[#FDFBF7] font-light mb-8">
                Designed for those who demand clarity before commitment.
              </h2>
              <p className="text-[14px] text-white/50 italic leading-relaxed font-light mb-12">
                &quot;The signature consultation completely demystified the budget and timeline. The level of detail in the design direction gave us utter confidence before execution began.&quot;
              </p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/80" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Contact */}
      <section id="contact" className="py-24 md:py-40 bg-[#080808] relative">
        <div className="container relative z-10">
          <div className="grid gap-16 lg:grid-cols-[40%_60%] items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                 <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] font-medium">Ready to start?</p>
              </div>
              <h2 className="font-display text-5xl md:text-7xl leading-[1.1] font-light text-[#FDFBF7] mb-8">
                Let&apos;s <br/><span className="italic text-[#E6D5B8]">Compose.</span>
              </h2>
              <div className="space-y-12 mt-16 border-l border-[#C5A059]/30 pl-8">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] mb-3 font-medium">Primary Contact</p>
                  <p className="text-lg md:text-xl font-light text-[#FDFBF7] mb-1">+8801314442288</p>
                  <p className="text-lg md:text-xl font-light text-[#FDFBF7] mb-1">+8801533450316</p>
                  <p className="text-[12px] text-white/40">hello@signatureliving.studio</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] mb-3 font-medium">Studio Location</p>
                  <p className="text-lg md:text-xl font-light text-[#FDFBF7] mb-1">DHAKA, BD</p>
                  <p className="text-[12px] text-white/40">By Private Appointment Only</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="p-8 md:p-12 border border-[#C5A059]/10 bg-[#12100E] relative"
            >
              <div className="absolute top-0 right-0 p-4 border-b border-l border-[#C5A059]/10">
                 <BrandLogo mode="monogram" className="scale-50 opacity-20" />
              </div>
              <form className="grid gap-8 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-8 md:grid-cols-2">
                  <Reveal delay={0} className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">Client Name</label>
                    <input 
                      {...register("name")}
                      placeholder="Full Name" 
                      className={`w-full bg-[#080808] border-b pb-3 pt-2 px-0 outline-none transition-colors text-[13px] text-[#FDFBF7] placeholder:text-white/20
                        ${errors.name ? 'border-[#C0392B] animate-shake focus:border-[#C0392B]' : 'border-[#C5A059]/20 focus:border-[#C5A059]'}`} 
                    />
                    {errors.name && (
                      <p className="text-[12px] text-[#C0392B] mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-300">
                        <span>⚠</span> {errors.name.message}
                      </p>
                    )}
                  </Reveal>
                  <Reveal delay={100} className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">Contact Number</label>
                    <input 
                      {...register("phone")}
                      placeholder="Phone / Whatsapp" 
                      className={`w-full bg-[#080808] border-b pb-3 pt-2 px-0 outline-none transition-colors text-[13px] text-[#FDFBF7] placeholder:text-white/20
                        ${errors.phone ? 'border-[#C0392B] animate-shake focus:border-[#C0392B]' : 'border-[#C5A059]/20 focus:border-[#C5A059]'}`} 
                    />
                    {errors.phone && (
                      <p className="text-[12px] text-[#C0392B] mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-300">
                        <span>⚠</span> {errors.phone.message}
                      </p>
                    )}
                  </Reveal>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  <Reveal delay={200} className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">Project Scope</label>
                    <select 
                      {...register("project_type")}
                      className={`w-full bg-[#080808] border-b pb-3 pt-2 px-0 outline-none transition-colors text-[13px] text-[#FDFBF7] appearance-none
                        ${errors.project_type ? 'border-[#C0392B] animate-shake focus:border-[#C0392B]' : 'border-[#C5A059]/20 focus:border-[#C5A059]'}`}
                    >
                      <option value="Apartment Interior" className="bg-[#12100E]">Apartment Interior</option>
                      <option value="Villa Architecture" className="bg-[#12100E]">Villa Architecture</option>
                      <option value="Commercial Fit-Out" className="bg-[#12100E]">Commercial Fit-Out</option>
                    </select>
                    {errors.project_type && (
                      <p className="text-[12px] text-[#C0392B] mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-300">
                        <span>⚠</span> {errors.project_type.message}
                      </p>
                    )}
                  </Reveal>
                  <Reveal delay={300} className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">Investment Tier</label>
                    <select 
                      {...register("budget_range")}
                      className={`w-full bg-[#080808] border-b pb-3 pt-2 px-0 outline-none transition-colors text-[13px] text-[#FDFBF7] appearance-none
                        ${errors.budget_range ? 'border-[#C0392B] animate-shake focus:border-[#C0392B]' : 'border-[#C5A059]/20 focus:border-[#C5A059]'}`}
                    >
                      <option value="Premium" className="bg-[#12100E]">Premium</option>
                      <option value="Luxury" className="bg-[#12100E]">Luxury</option>
                      <option value="Ultra-Luxury" className="bg-[#12100E]">Ultra-Luxury</option>
                    </select>
                    {errors.budget_range && (
                      <p className="text-[12px] text-[#C0392B] mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-300">
                        <span>⚠</span> {errors.budget_range.message}
                      </p>
                    )}
                  </Reveal>
                </div>

                <Reveal delay={400} className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">Project Brief</label>
                  <textarea 
                    {...register("message")}
                    placeholder="Location, timeline, specific requirements..." 
                    rows={4} 
                    className={`w-full bg-[#080808] border-b pb-3 pt-2 px-0 outline-none transition-colors text-[13px] text-[#FDFBF7] placeholder:text-white/20 resize-none
                      ${errors.message ? 'border-[#C0392B] animate-shake focus:border-[#C0392B]' : 'border-[#C5A059]/20 focus:border-[#C5A059]'}`} 
                  />
                  {errors.message && (
                    <p className="text-[12px] text-[#C0392B] mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-300">
                      <span>⚠</span> {errors.message.message}
                    </p>
                  )}
                </Reveal>
                
                <Reveal delay={500}>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full group mt-6 disabled:opacity-50">
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : submitStatus === 'success' ? (
                      "Inquiry Received"
                    ) : (
                      <>Submit Inquiry <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={16} /></>
                    )}
                  </button>
                </Reveal>

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-[10px] text-center uppercase tracking-widest mt-2">
                    Transmission Error. Please try again.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 14: Final CTA & Footer */}
      <section id="final-cta" className="py-32 border-t border-[#C5A059]/10 text-center bg-[#12100E]">
        <div className="container flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <BrandLogo mode="monogram" className="scale-75 opacity-50 mb-8" />
            <h2 className="font-display text-5xl md:text-8xl text-[#FDFBF7] font-light tracking-tight mb-12">Signature <span className="italic text-[#C5A059]">Living.</span></h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="tel:+8801314442288" className="btn-primary">
                Call Studio
              </a>
              <button onClick={() => openPopup('popup_footer')} className="btn-secondary">
                Request Meeting
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-[#C5A059]/10 bg-[#080808]">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <BrandLogo mode="stacked" className="h-[120px] w-[160px] origin-center md:origin-left opacity-80 mb-6" />
            <p className="text-[8px] text-white/30 uppercase tracking-[0.4em] font-medium">DHAKA :: STUDIO HQ</p>
          </div>
          
          <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">
            <a href="#portfolio" className="hover:text-[#E6D5B8] transition-colors">Portfolio</a>
            <a href="#about" className="hover:text-[#E6D5B8] transition-colors">Studio</a>
            <a href="#contact" className="hover:text-[#E6D5B8] transition-colors">Contact</a>
          </div>

          <p className="text-[9px] text-[#C5A059]/30 uppercase tracking-[0.3em] text-center md:text-right font-medium">
            © {new Date().getFullYear()} Signature Living.<br/> All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Bottom Floating Button */}
      <button 
        onClick={() => openPopup('popup_sticky')}
        className="fixed bottom-6 right-6 z-40 bg-[#C5A059] text-[#080808] px-6 py-4 shadow-2xl hover:bg-[#E6D5B8] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group md:hidden"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Book Consultation</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  );
}
