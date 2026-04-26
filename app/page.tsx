'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Home, Phone, ShieldCheck, Sparkles, Gem, Menu, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      project_type: formData.get('project_type'),
      budget_range: formData.get('budget_range'),
      message: formData.get('message'),
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from('enquiries').insert([data]);
      if (error) throw error;
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
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
      <section id="topbar" className="border-b border-white/5 bg-black py-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
        Signature Living Studio :: Dhaka · Automated Excellence
      </section>

      {/* Section 2: Header */}
      <header id="header" className="sticky top-0 z-50 border-b border-white/10 bg-void/90 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-xl md:text-2xl tracking-[0.3em] uppercase text-white">Signature Living</Link>
          
          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-white/40 lg:flex">
            {["Services", "Process", "Packages", "Portfolio", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="btn-primary hidden sm:inline-flex">Book Consultation</a>
            <button 
              className="lg:hidden text-cream" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <motion.div 
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden bg-void border-b border-border"
        >
          <div className="container py-8 flex flex-col gap-6 text-lg">
            {["Services", "Process", "Packages", "Portfolio", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-muted hover:text-gold"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="btn-primary w-full" onClick={() => setIsMenuOpen(false)}>Book Consultation</a>
          </div>
        </motion.div>
      </header>

      {/* Section 3: Hero */}
      <section id="hero" className="relative overflow-hidden py-24 md:py-40">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_20%,rgba(197,160,89,0.2),transparent_40%)]" />
        <div className="container relative grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] bg-white/5 text-white/60">
              Elite Interior Studio
            </div>
            <h1 className="font-display text-6xl leading-[0.95] md:text-8xl lg:text-9xl tracking-tighter font-extralight text-white mb-8">
              Tailored <br className="hidden md:block" /> <span className="italic font-serif text-gold">Luxury.</span> <br /> Designed Around <br className="hidden md:block" /> Lifestyle.
            </h1>
            <p className="mt-8 max-w-lg text-sm md:text-base leading-relaxed text-white/50">
              Integrated with Supabase architectural refinements. Every refinement is committed via AI Studio and deployed instantly to Hostinger infrastructure.
            </p>
            <div className="mt-12 flex flex-wrap gap-6">
              <a href="#contact" className="btn-primary">View Live Projects</a>
              <a href="#portfolio" className="btn-secondary">Studio Documentation</a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="p-1 border border-white/10 rounded-[32px]"
          >
            <div className="luxury-panel p-6 md:p-10 shadow-luxury">
              <div className="aspect-[4/5] rounded-[24px] bg-[linear-gradient(145deg,#0a0a0a,#111)] p-8 md:p-12 flex flex-col justify-between border border-white/5">
                <div className="flex justify-between items-start">
                  <Gem className="h-10 w-10 text-gold/60" />
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-tighter text-white/30">Architecture</p>
                    <p className="text-[11px] font-mono text-white/60">v2.0.48</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-4xl md:text-6xl text-white font-extralight tracking-tight mb-2">Excellence.</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Premium Design Studio</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Trust Strip */}
      <section id="trust-strip" className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="container">
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4 items-center">
            {["Premium Architecture", "Edge Infrastructure", "Factory-Backed Production", "Turnkey Handover"].map((x) => (
              <div key={x} className="text-white/40 font-mono text-center text-[10px] uppercase tracking-widest">{x}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: About */}
      <section id="about" className="py-24 md:py-40 border-b border-white/5">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-[10px] mb-8">Studio Philosophy</p>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.9] font-light text-white italic">Design follows<br/> <span className="not-italic text-white">function.</span></h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <p className="text-sm md:text-base leading-loose text-white/40 max-w-md">
                Managing concept, materials, and custom furniture through a centralized deployment system. We prioritize architectural integrity over aesthetic fluff.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: Services */}
      <section id="services" className="bg-cream py-24 md:py-32 text-charcoal">
        <div className="container">
          <header className="mb-16">
            <p className="text-bronze font-semibold uppercase tracking-widest text-sm">Our Expertise</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">Complete Luxury Interior <br /> & Turnkey Solutions</h2>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div 
                key={service} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-black/5 bg-white p-6 hover:shadow-xl hover:border-bronze/20 transition-all cursor-default"
              >
                <CheckCircle2 className="mb-4 h-5 w-5 text-bronze group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm md:text-base">{service}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Process */}
      <section id="process" className="py-24 md:py-32 bg-void">
        <div className="container">
          <p className="text-gold uppercase tracking-widest text-sm text-center">Our Methodology</p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-center">A 7-step premium execution system</h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {steps.map((step, index) => (
              <motion.div 
                key={step} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="luxury-panel p-6 flex flex-col items-center text-center group hover:bg-charcoal/40 transition-colors"
              >
                <span className="text-gold font-display text-2xl mb-4 group-hover:scale-110 transition-transform">0{index + 1}</span>
                <p className="text-xs md:text-sm text-muted font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Portfolio */}
      <section id="portfolio" className="py-24 md:py-32 bg-charcoal/20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="text-gold uppercase tracking-widest text-sm">Showcase</p>
              <h2 className="mt-4 font-display text-3xl md:text-5xl">Modern, warm, detailed <br /> and lifestyle-led spaces</h2>
            </div>
            <a href="#contact" className="btn-secondary w-fit">Inquire About Portfolio</a>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Apartment Interior", category: "Residential" },
              { title: "Villa Interior", category: "Elite" },
              { title: "Commercial Fit-Out", category: "Corporate" }
            ].map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative aspect-[4/5] rounded-[32px] overflow-hidden border border-border"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#221b14] to-[#0b0b0c]" />
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/interior'+i+'/800/1000')] bg-cover bg-center mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-gold text-xs uppercase tracking-widest mb-2">{item.category}</p>
                  <h3 className="font-display text-3xl gold-text">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Packages */}
      <section id="packages" className="py-24 md:py-32">
        <div className="container">
          <header className="text-center mb-16">
            <p className="text-gold uppercase tracking-widest text-sm">Investment Options</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">Flexible luxury based on your scope</h2>
          </header>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, i) => (
              <motion.div 
                key={pkg.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="luxury-panel p-8 flex flex-col h-full border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <h3 className="font-display text-2xl mb-4">{pkg.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-10 flex-grow">{pkg.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-3 text-gold font-semibold text-sm hover:gap-4 transition-all">
                  Request Quote <ArrowRight size={18} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Why Us */}
      <section id="why-us" className="bg-cream py-24 md:py-32 text-charcoal">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { 
                title: "Personalized Design", 
                text: "Every layout is designed around family lifestyle, storage, movement and comfort.",
                icon: <Home className="text-bronze mb-6 h-10 w-10" />
              },
              { 
                title: "Flexible Budget Range", 
                text: "Custom material and finish options help align design with your preferred investment level.",
                icon: <Sparkles className="text-bronze mb-6 h-10 w-10" />
              },
              { 
                title: "One-Stop Execution", 
                text: "Design, furniture, lighting, fitting, installation and handover from one accountable team.",
                icon: <ShieldCheck className="text-bronze mb-6 h-10 w-10" />
              }
            ].map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white p-10 shadow-sm hover:shadow-md transition-shadow"
              >
                {item.icon}
                <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                <p className="text-black/60 text-sm md:text-base leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: Metrics & NRI */}
      <section id="metrics" className="py-24 md:py-32 bg-void">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="grid gap-6 grid-cols-2">
                {["Luxury Homes", "Custom Furniture", "Turnkey Fit-Out", "Dhaka Based"].map((x, i) => (
                  <motion.div 
                    key={x} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="luxury-panel p-8 text-center"
                  >
                    <Sparkles className="mx-auto mb-4 text-gold/60 h-6 w-6" />
                    <p className="font-display text-xl md:text-2xl gold-text font-bold mb-1">{x}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted">Excellence</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:border-l lg:border-border lg:pl-16 flex flex-col justify-center">
              <p className="text-gold uppercase tracking-widest text-sm">NRI Special Care</p>
              <h2 className="mt-6 font-display text-3xl md:text-4xl leading-tight">Manage your family home in Dhaka from abroad</h2>
              <p className="mt-6 text-sm md:text-base text-muted leading-relaxed">
                We support long-distance families with digital consultation, remote updates,
                transparent budgeting, material approval, execution progress and final handover documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Materials & Reviews */}
      <section id="materials" className="py-24 md:py-32 border-t border-border">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-gold uppercase tracking-widest text-sm mb-6">Our Materials</p>
              <h2 className="font-display text-3xl md:text-5xl mb-12">Premium finishes for timeless appeal</h2>
              <div className="grid gap-6">
                {["Wood & Veneer", "Marble & Stone", "Lighting & Accessories"].map((x) => (
                  <div key={x} className="flex gap-6 items-center p-6 border border-border rounded-2xl bg-charcoal/20">
                    <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Gem size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-1">{x}</h3>
                      <p className="text-xs text-muted">Curated for luxury homes and practical maintenance.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center bg-cream rounded-[40px] p-10 md:p-16 text-charcoal">
              <p className="text-bronze font-semibold uppercase tracking-widest text-xs mb-6">Client Confidence</p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">Designed for people who want clarity before commitment</h2>
              <p className="text-lg text-black/70 italic leading-relaxed">
                &quot;Our consultation helps you understand design direction, budget range, material choice,
                timeline and execution process before moving forward.&quot;
              </p>
              <div className="mt-10 flex gap-1">
                {[1,2,3,4,5].map(i => <Sparkles key={i} size={16} className="text-bronze" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Contact */}
      <section id="contact" className="py-24 md:py-40 bg-black relative">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[40%_60%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold uppercase tracking-widest text-[10px] mb-8">Ready to start?</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.9] font-extralight text-white mb-8">Let&apos;s <br/><span className="text-gold italic font-serif">Compose.</span></h2>
              <div className="space-y-12 mt-16">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Primary Contact</p>
                  <p className="text-xl font-mono text-white">+8801XXXXXXXXX</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Studio Location</p>
                  <p className="text-xl font-mono text-white">DHAKA :: BD</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 rounded-2xl bg-white/[0.01]"
            >
              <form className="grid gap-8" onSubmit={handleSubmit}>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 ml-1">Label :: Name</label>
                    <input required name="name" placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/10 p-5 focus:border-white/30 outline-none transition-colors text-sm" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 ml-1">Label :: Whatsapp</label>
                    <input required name="phone" placeholder="Phone Number" className="w-full bg-white/[0.03] border border-white/10 p-5 focus:border-white/30 outline-none transition-colors text-sm" />
                  </div>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 ml-1">Label :: Category</label>
                    <select required name="project_type" className="w-full bg-white/[0.03] border border-white/10 p-5 focus:border-white/30 outline-none transition-colors text-sm appearance-none">
                      <option className="bg-charcoal">Apartment</option>
                      <option className="bg-charcoal">Villa</option>
                      <option className="bg-charcoal">Commercial</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 ml-1">Label :: Budget</label>
                    <select required name="budget_range" className="w-full bg-white/[0.03] border border-white/10 p-5 focus:border-white/30 outline-none transition-colors text-sm appearance-none">
                      <option className="bg-charcoal">Premium tier</option>
                      <option className="bg-charcoal">Luxury tier</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 ml-1">Label :: Requirements</label>
                  <textarea name="message" placeholder="Details..." rows={4} className="w-full bg-white/[0.03] border border-white/10 p-5 focus:border-white/30 outline-none transition-colors text-sm resize-none" />
                </div>
                
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full group mt-4 disabled:opacity-50">
                  {isSubmitting ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : submitStatus === 'success' ? (
                    "Dispatch Successful"
                  ) : (
                    <>Send Dispatch <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={16} /></>
                  )}
                </button>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-[10px] text-center uppercase tracking-widest">
                    Transmission Error :: Please try again
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 14: Final CTA & Footer */}
      <section id="final-cta" className="py-24 border-t border-white/5 text-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-8xl text-white font-extralight tracking-tighter mb-12 italic">Signature <span className="not-italic">Living.</span></h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <a href="tel:+8801XXXXXXXXX" className="btn-primary">
                Call Now
              </a>
              <a href="#contact" className="btn-secondary">
                Book Visit
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-void">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="font-display text-base tracking-[0.3em] uppercase text-white">Signature Living</Link>
            <p className="mt-4 text-[9px] text-white/20 uppercase tracking-[0.3em]">DHAKA :: STUDIO :: INTERNAL</p>
          </div>
          
          <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium">
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#about" className="hover:text-white transition-colors">Studio</a>
            <a href="#contact" className="hover:text-white transition-colors">Privacy</a>
          </div>

          <p className="text-[9px] text-white/10 uppercase tracking-[0.2em] text-center md:text-right">
            © {new Date().getFullYear()} Signature Living Studio — Dhaka infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
}
