'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ConsultationForm from '@/components/ConsultationForm';
import ServiceCard from '@/components/ServiceCard';
import PortfolioCard from '@/components/PortfolioCard';
import PackageCard from '@/components/PackageCard';
import TestimonialCard from '@/components/TestimonialCard';
import FAQAccordion from '@/components/FAQAccordion';
import { trackEvent } from '@/components/EventTracking';
import { BRAND } from '@/lib/content';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex flex-col min-h-screen">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background image - using a subtle gradient placeholder since we don't have assets */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1410] to-[#050505] -z-20" />
          <div className="absolute inset-0 bg-[#050505]/40 -z-10" />

          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
            <h1 className="font-serif max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-[#FAF7F1] mb-6">
              Luxury Interiors, <span className="text-[#C9A24D]">Planned Before</span> They Are Built
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-[#D8C3A5] mb-8 leading-relaxed">
              Signature Living Studio designs and executes premium interiors in Dhaka with 3D visualization, custom furniture, factory-backed production and turnkey delivery.
            </p>
            
            <div className="text-sm font-semibold tracking-[0.2em] text-[#8A8379] uppercase mb-10 flex flex-wrap justify-center gap-x-4 gap-y-2">
              <span>Apartment</span> <span className="hidden sm:inline">•</span>
              <span>Villa</span> <span className="hidden sm:inline">•</span>
              <span>Kitchen</span> <span className="hidden sm:inline">•</span>
              <span>Wardrobe</span> <span className="hidden sm:inline">•</span>
              <span>Full Home Turnkey</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#consultation" className="w-full sm:w-auto px-8 py-4 bg-[#C9A24D] text-[#050505] font-bold uppercase tracking-widest rounded hover:bg-[#E4C878] transition-colors text-center">
                Book Design Consultation
              </a>
              <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#C9A24D] text-[#C9A24D] font-bold uppercase tracking-widest rounded hover:bg-[#C9A24D]/10 transition-colors text-center">
                View Real Projects
              </a>
            </div>

            <div className="mt-16 sm:mt-24 w-full border-t border-[#1A1410] pt-8 flex justify-center gap-6 sm:gap-12 flex-wrap px-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8379] flex items-center gap-2">
                <span className="text-[#C9A24D]">✓</span> 3D Preview Before Execution
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8379] flex items-center gap-2">
                <span className="text-[#C9A24D]">✓</span> Factory-Backed Furniture
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8379] flex items-center gap-2">
                <span className="text-[#C9A24D]">✓</span> Clear BOQ & Scope
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8379] flex items-center gap-2">
                <span className="text-[#C9A24D]">✓</span> Dhaka Studio
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER TRANSFORMATION SECTION */}
        <section className="py-24 bg-[#050505] border-y border-[#1A1410]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-6">From Empty Flat to Tailored Luxury</h2>
            <p className="text-[#D8C3A5] max-w-2xl mx-auto mb-16 leading-relaxed">
              See how clear planning, 3D visualization and controlled execution transform a raw space into a premium home.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
               {/* Placeholders for Before/After images */}
               <div className="relative aspect-[4/3] bg-[#121212] flex items-center justify-center rounded overflow-hidden border border-[#1A1410]">
                 <span className="text-[#8A8379] font-medium tracking-widest uppercase">Project Preview: Before</span>
                 <div className="absolute inset-0 bg-black/10"></div>
                 <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-white">Raw Space</div>
               </div>
               <div className="relative aspect-[4/3] bg-[#1A1410] flex items-center justify-center rounded overflow-hidden border border-[#C9A24D]/30">
                 <span className="text-[#8A8379] font-medium tracking-widest uppercase">Project Preview: 3D Design</span>
                 <div className="absolute inset-0 bg-black/10"></div>
                 <div className="absolute top-4 left-4 bg-[#C9A24D] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-[#050505]">3D Visualization</div>
               </div>
            </div>

            <a href="#consultation" className="inline-flex items-center text-[#C9A24D] text-sm font-bold uppercase tracking-wider hover:text-[#E4C878] transition-colors">
              See How Your Space Can Look
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-16 text-center">Residential Interiors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard 
                 title="Apartment Interior Design"
                 description="Full-home planning, storage, lighting, custom furniture and turnkey execution."
                 ctaText="Plan My Apartment"
              />
              <ServiceCard 
                 title="Villa Interior Design"
                 description="Luxury spatial planning, material curation and complete villa execution."
                 ctaText="Discuss Villa Scope"
              />
              <ServiceCard 
                 title="Kitchen Design"
                 description="Smart layout, premium finishes, optimized storage and factory-backed cabinetry."
                 ctaText="Design My Kitchen"
              />
              <ServiceCard 
                 title="Wardrobe / Storage"
                 description="Custom wardrobe systems planned for daily use, capacity and clean aesthetics."
                 ctaText="Plan My Storage"
              />
            </div>
            
            <div className="mt-16 text-center">
              <a href="#consultation" className="px-8 py-3 bg-[#1A1410] border border-[#C9A24D] text-[#C9A24D] font-bold uppercase tracking-widest rounded hover:bg-[#C9A24D] hover:text-[#050505] transition-colors inline-block text-sm">
                Find the Right Scope for My Project
              </a>
            </div>
          </div>
        </section>

        {/* SIGNATURE EXECUTION FRAMEWORK */}
        <section id="process" className="py-24 bg-[#0a0a0a] border-y border-[#1A1410]">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                 <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-6">A Clear Process From Idea to Handover</h2>
                 <p className="text-[#D8C3A5] leading-relaxed">
                   Our 7-step execution framework reduces guesswork, budget confusion and site stress — so you know what will be designed, produced and delivered before execution begins.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   { step: "01", title: "Consultation & Lifestyle Mapping", desc: "We understand your family lifestyle, storage needs, routine, taste and budget direction." },
                   { step: "02", title: "Space Planning & Design Direction", desc: "Layout, movement flow, furniture placement and practical usability are defined." },
                   { step: "03", title: "3D Visualization & Material Selection", desc: "You see the design direction, materials and spatial flow before work begins." },
                   { step: "04", title: "BOQ, Budget & Timeline Lock", desc: "Clear scope, itemized costing and committed execution timeline." },
                   { step: "05", title: "Factory Production & Quality Check", desc: "Custom furniture produced under controlled quality supervision." },
                   { step: "06", title: "Site Execution & Installation", desc: "One accountable team handles installation, coordination and finishing." },
                   { step: "07", title: "Handover & After-Sales Care", desc: "Final inspection, handover support and post-project care." },
                 ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="text-[#C9A24D] font-serif text-2xl md:text-3xl pt-1 opacity-50">{item.step}</div>
                       <div>
                          <h4 className="text-[#FAF7F1] font-semibold mb-2">{item.title}</h4>
                          <p className="text-sm text-[#8A8379] leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="mt-16 text-center">
                 <a href="#consultation" className="inline-flex items-center text-[#C9A24D] text-sm font-bold uppercase tracking-wider hover:text-[#E4C878] transition-colors">
                    Start With a Planning Session
                 <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </a>
              </div>
           </div>
        </section>

        {/* REAL PROJECT SHOWCASE */}
        <section id="portfolio" className="py-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-6 text-center">Real Projects in Dhaka</h2>
            <p className="text-[#D8C3A5] max-w-2xl mx-auto mb-16 leading-relaxed text-center">
               Explore premium interiors planned, visualized and executed for modern Dhaka living.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <PortfolioCard title="Gulshan Penthouse Residence" scope="Full interior · Living · Kitchen · Master Suite" />
               <PortfolioCard title="Bashundhara Family Apartment" scope="Full-home interior · Kitchen · Wardrobe · Living-Dining" />
               <PortfolioCard title="Dhanmondi Premium Renovation" scope="Apartment renovation · Kitchen · Bedroom · Wardrobe" />
               <PortfolioCard title="Banani Kitchen & Wardrobe Project" scope="Modular kitchen · Built-in wardrobe · Storage" />
               <PortfolioCard title="Baridhara Villa Interior" scope="Villa interior · Multiple floors · Custom furniture" />
               <PortfolioCard title="Uttara Full Home Interior" scope="Complete turnkey · Living · Dining · Bedrooms · Kitchen" />
            </div>
          </div>
        </section>

        {/* PACKAGES SECTION */}
        <section id="packages" className="py-24 bg-[#0a0a0a] border-y border-[#1A1410]">
           <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-6 text-center">Tailored Propositions</h2>
              <p className="text-[#D8C3A5] max-w-2xl mx-auto mb-16 leading-relaxed text-center">
                 Choose the starting point that fits your project scope. Final scope and BOQ are prepared after consultation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <PackageCard 
                    title="Essential Interior" 
                    bestFor="Apartment owners needing selected room design or a premium start"
                    includes="Design direction, material guidance, basic layout and quotation scope"
                    ctaText="Request Essential Scope"
                 />
                 <PackageCard 
                    title="Premium Turnkey" 
                    bestFor="Full apartment interior from design to handover"
                    includes="3D design, custom furniture, kitchen, wardrobe, wall panel, lighting and site execution"
                    ctaText="Plan My Full Home"
                    isPopular={true}
                 />
                 <PackageCard 
                    title="Fast Track Pack" 
                    bestFor="Selected urgent kitchen, wardrobe or renovation scopes"
                    includes="Priority planning, fast material selection, production schedule and installation support"
                    ctaText="Check Availability"
                 />
              </div>
           </div>
        </section>

        {/* NRI SECTION */}
        <section id="nri" className="py-24 bg-[#050505]">
           <div className="max-w-7xl mx-auto px-6 lg:flex items-center gap-16">
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                 <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-6">Manage Your Dhaka Residence From Anywhere</h2>
                 <p className="text-[#D8C3A5] mb-8 leading-relaxed">
                   For overseas Bangladeshis and NRI families — remote interior projects with digital consultation, secure material approvals, progress tracking and final handover documentation.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {["Remote design consultation", "Digital 3D preview", "Weekly progress updates", "Payment milestone clarity"].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-[#FAF7F1]">
                          <span className="text-[#C9A24D]">✓</span> {item}
                       </li>
                    ))}
                 </ul>
                 <a href="#consultation" onClick={() => trackEvent('nri_remote_review_click')} className="px-8 py-3 bg-[#C9A24D] text-[#050505] font-bold uppercase tracking-widest rounded hover:bg-[#E4C878] transition-colors inline-block text-sm">
                    Book Remote Project Review
                 </a>
              </div>
              <div className="lg:w-1/2">
                 <div className="relative aspect-square md:aspect-video lg:aspect-square bg-[#121212] rounded border border-[#1A1410] flex items-center justify-center p-8 text-center text-[#8A8379]">
                   <span className="text-sm font-medium tracking-widest uppercase">Remote Coordination Preview</span>
                 </div>
              </div>
           </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#0a0a0a] border-y border-[#1A1410]">
           <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-6 text-center">Clarity Before Commitment</h2>
              <p className="text-[#D8C3A5] max-w-2xl mx-auto mb-16 leading-relaxed text-center">
                 Premium interior decisions become easier when scope, budget and timeline are clear before execution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <TestimonialCard 
                    quote="The consultation made the budget, material and timeline clear before we committed. That clarity helped us move forward confidently."
                    author="Fahim Rahman"
                    details="Bashundhara R/A · Full Apartment Interior"
                 />
                 <TestimonialCard 
                    quote="3D design helped us decide faster. The final output matched the plan and the execution felt smooth."
                    author="Nusrat Jahan"
                    details="Dhanmondi · Apartment Renovation"
                 />
                 <TestimonialCard 
                    quote="We wanted one team to handle everything. Signature Living Studio gave us design, furniture and site execution in one flow."
                    author="Imran Hossain"
                    details="Uttara · Kitchen & Wardrobe"
                 />
              </div>

              <div className="mt-16 text-center">
                  <a href="#consultation" className="px-8 py-3 bg-transparent border border-[#C9A24D] text-[#C9A24D] font-bold uppercase tracking-widest rounded hover:bg-[#C9A24D] hover:text-[#050505] transition-colors inline-block text-sm">
                    Book a Clarity Session
                  </a>
              </div>
           </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 bg-[#050505]">
           <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif text-[#FAF7F1] mb-12 text-center">Common Questions</h2>
              <div className="border-t border-[#1A1410]">
                 <FAQAccordion question="How much does apartment interior cost in Dhaka?" answer="Cost depends on space size, material selection, furniture scope and execution depth. We prepare a tailored BOQ after understanding your project." />
                 <FAQAccordion question="Do you provide 3D design before execution?" answer="Yes. We provide 3D visualization so you can understand the look, layout and material direction before work begins." />
                 <FAQAccordion question="Do you manufacture custom furniture?" answer="Yes. Kitchen, wardrobe, storage, wall panel and selected custom furniture produced through factory-backed execution." />
                 <FAQAccordion question="How long does a full-home interior take?" answer="Timeline depends on scope, material availability and site readiness. Practical timeline defined after consultation." />
              </div>
           </div>
        </section>

        {/* CONSULTATION / FINAL CTA SECTION */}
        <section id="consultation" className="py-24 bg-[#0a0a0a] border-t border-[#1A1410]">
           <div className="max-w-7xl mx-auto px-6">
              <ConsultationForm />
           </div>
        </section>

      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
}
