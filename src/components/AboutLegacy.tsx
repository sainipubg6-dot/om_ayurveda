"use client";

import React from 'react';
import { 
  ShieldCheck, Users, Award, Leaf, HeartPulse, Sparkles, 
  History, Heart, ClipboardList, Stethoscope, ChevronRight 
} from 'lucide-react';

const features = [
  { icon: Leaf, title: "100% Natural", subtitle: "Pure Herbal Blends" },
  { icon: HeartPulse, title: "Personalized Care", subtitle: "Custom Treatment" },
  { icon: Sparkles, title: "Swarna Bhasma", subtitle: "Expert Specialists" },
  { icon: Award, title: "68+ Years Legacy", subtitle: "Est. 1958" },
  { icon: Users, title: "1M+ Patients", subtitle: "Globally Trusted" },
  { icon: ShieldCheck, title: "Registered Brand", subtitle: "Govt. Verified" },
];

const doctors = [
  {
    name: "ACHARYA Vikas JI",
    image: "/images/ACHARYA Vikas JI.webp",
  },
  {
    name: "ACHARYA YOGESH JI",
    image: "/images/ACHARYA YOGESH JI.webp",
  }
];

const steps = [
  { title: "Consultation", icon: ClipboardList, desc: "History & Assessment" },
  { title: "Diagnosis", icon: Stethoscope, desc: "Root Cause Discovery" },
  { title: "Treatment", icon: Leaf, desc: "Custom Gold Doses" },
  { title: "Recovery", icon: Heart, desc: "Guided Healing" },
];

const AboutLegacy = () => {
  return (
    <section id="about-legacy" className="py-16 md:py-32 bg-brand-cream relative overflow-hidden">
      {/* Subtle Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-forest/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full -ml-48 -mb-48 blur-3xl" />
      
      <div className="container px-4 md:px-6 relative z-10">
        {/* PART 1: OUR LITTLE STORY */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-brand-forest text-brand-forest bg-transparent">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Our Heritage</span>
          </div>

          <h2 className="text-brand-forest font-serif text-[28px] xs:text-3xl sm:text-4xl md:text-7xl mb-8 leading-tight font-bold whitespace-nowrap sm:whitespace-normal">
            Healing Hearts Since <span className="text-brand-forest/60 font-medium">1958</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 text-left items-center mb-10 md:mb-16">
            <div className="space-y-6">
              <p className="text-brand-forest/80 text-lg md:text-2xl leading-relaxed italic border-l-[6px] border-brand-forest pl-4 md:pl-6">
                "What started as a small humble clinic in 1958 has grown into a legacy of trust that spans generations and continents."
              </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white relative shadow-lg">
              <Heart className="absolute -top-6 -right-4 w-16 h-16 text-brand-forest/10 fill-brand-forest/10" />
              <p className="text-brand-forest/70 text-sm md:text-lg leading-relaxed">
                Om Ayurveda has successfully treated millions from the root. People from across the country and abroad come here for treatment and leave satisfied.
              </p>
            </div>
          </div>

          {/* Excellence Features Grid */}
          <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4">
            {features.map((item, i) => (
              <div key={i} className="bg-white p-2 xs:p-3 md:p-6 rounded-xl md:rounded-2xl transition-all group text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-brand-forest/5 flex flex-col justify-center">
                <div className="flex items-center justify-center mx-auto mb-2 md:mb-3 text-brand-forest/90">
                  <item.icon className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-brand-forest font-serif text-[9px] xs:text-[10px] md:text-sm font-bold leading-tight">{item.title}</h3>
                <p className="text-brand-forest/60 text-[6px] xs:text-[7px] md:text-[9px] uppercase tracking-widest mt-1 font-bold">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: OUR EXPERTS (TEAM) */}
        <div className="mb-20 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h3 className="text-brand-goldDark font-serif text-[10px] md:text-sm uppercase tracking-[0.4em] mb-2 font-bold">Our Experts</h3>
            <p className="text-brand-forest font-serif text-2xl md:text-6xl mb-4 font-bold">Meet Our Vaidyas</p>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-16 max-w-4xl mx-auto">
            {doctors.map((doc, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white group-hover:border-brand-gold transition-all duration-700 mb-6 md:mb-10">
                  <img 
                    src={doc.image} 
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <h4 className="text-brand-forest font-serif text-base md:text-3xl font-bold text-center uppercase tracking-tight group-hover:text-brand-goldDark transition-colors">
                  {doc.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3: OUR JOURNEY (PROCESS) */}
        <div className="bg-brand-forest rounded-[2rem] md:rounded-[5rem] p-6 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Subtle pattern for the dark block */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#BF953F_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-20 relative z-10">
            <div className="lg:max-w-[300px] w-full text-center lg:text-left border-b border-white/10 lg:border-b-0 lg:border-r lg:border-brand-gold/20 pb-6 lg:pb-0 lg:pr-16">
              <h3 className="text-brand-cream font-serif text-[22px] xs:text-2xl md:text-5xl font-bold mb-2 md:mb-4">Our Journey</h3>
              <p className="text-brand-cream/80 text-[8px] xs:text-[9px] md:text-xs leading-relaxed uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">The Personalized Vedic protocol.</p>
            </div>

            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 md:gap-10 w-full pt-2 lg:pt-0">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-brand-cream/10 flex items-center justify-center mb-3 md:mb-6 shadow-lg group-hover:bg-brand-cream/20 transition-colors duration-300">
                    <step.icon className="text-brand-cream/70 w-4 h-4 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                      <span className="text-brand-cream/60 text-[9px] md:text-xs font-bold">0{idx + 1}</span>
                      <h4 className="text-brand-cream/90 font-serif text-[11px] xs:text-[12px] md:text-2xl font-bold">{step.title}</h4>
                    </div>
                    <p className="text-brand-cream/60 text-[7px] xs:text-[8px] md:text-xs uppercase font-bold tracking-[0.15em] md:tracking-widest leading-tight">{step.desc}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-10 -right-5 text-brand-gold/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLegacy;