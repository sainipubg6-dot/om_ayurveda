"use client";

import React from 'react';
import { 
  ShieldCheck, Users, Award, Leaf, HeartPulse, Sparkles, 
  History, Heart, ClipboardList, Stethoscope, ChevronRight 
} from 'lucide-react';

const features = [
  { icon: Award, title: "68+ Years Legacy", subtitle: "Est. 1958" },
  { icon: Users, title: "1M+ Patients", subtitle: "Globally Trusted" },
  { icon: ShieldCheck, title: "Registered Brand", subtitle: "Govt. Verified" },
  { icon: Sparkles, title: "Swarna Bhasma", subtitle: "Expert Specialists" },
  { icon: Leaf, title: "100% Natural", subtitle: "Pure Herbal Blends" },
  { icon: HeartPulse, title: "Personalized Care", subtitle: "Custom Treatment" },
];

const doctors = [
  {
    name: "ACHARYA Vikas JI",
    image: "/images/ACHARYA Vikas JI.png",
  },
  {
    name: "ACHARYA YOGESH JI",
    image: "/images/ACHARYA YOGESH JI.png",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-brand-forest/5 border border-brand-forest/10 text-brand-forest">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Our Heritage</span>
          </div>

          <h2 className="text-brand-forest font-serif text-3xl md:text-7xl mb-8 leading-tight font-bold">
            Healing Hearts Since <span className="text-brand-goldDark font-bold">1958</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 text-left items-center mb-16">
            <div className="space-y-6">
              <p className="text-brand-forest/80 text-lg md:text-2xl leading-relaxed italic border-l-4 border-brand-gold pl-6">
                "What started as a small humble clinic in 1958 has grown into a legacy of trust that spans generations and continents."
              </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-brand-gold/20 relative shadow-xl">
              <Heart className="absolute -top-4 -right-4 w-12 h-12 text-brand-gold fill-brand-gold opacity-10" />
              <p className="text-brand-forest/70 text-sm md:text-lg leading-relaxed">
                Om Ayurveda has successfully treated millions from the root. People from across the country and abroad come here for treatment and leave satisfied.
              </p>
            </div>
          </div>

          {/* Excellence Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
            {features.map((item, i) => (
              <div key={i} className="bg-white border border-brand-forest/5 p-4 md:p-6 rounded-2xl hover:border-brand-gold transition-all group text-center shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-forest/5 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-gold/20 transition-colors">
                  <item.icon className="text-brand-forest w-5 h-5 md:w-6 md:h-6 group-hover:text-brand-goldDark transition-colors" />
                </div>
                <h4 className="text-brand-forest font-serif text-xs md:text-sm font-bold leading-tight">{item.title}</h4>
                <p className="text-brand-goldDark/60 text-[8px] md:text-[9px] uppercase tracking-widest mt-1 font-bold">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: OUR EXPERTS (TEAM) */}
        <div className="mb-20 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h3 className="text-brand-goldDark font-serif text-[10px] md:text-sm uppercase tracking-[0.4em] mb-2 font-bold">Our Experts</h3>
            <h4 className="text-brand-forest font-serif text-2xl md:text-6xl mb-4 font-bold">Meet Our Vaidyas</h4>
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
                <h5 className="text-brand-forest font-serif text-base md:text-3xl font-bold text-center uppercase tracking-tight group-hover:text-brand-goldDark transition-colors">
                  {doc.name}
                </h5>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3: OUR JOURNEY (PROCESS) */}
        <div className="bg-brand-forest rounded-[2.5rem] md:rounded-[5rem] p-8 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Subtle pattern for the dark block */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#BF953F_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20 relative z-10">
            <div className="lg:max-w-[300px] w-full text-center lg:text-left border-b lg:border-b-0 lg:border-r border-brand-gold/20 pb-10 lg:pb-0 lg:pr-16">
              <h4 className="text-brand-gold font-serif text-3xl md:text-5xl font-bold mb-4">Our Journey</h4>
              <p className="text-brand-cream/50 text-[10px] md:text-xs leading-relaxed uppercase tracking-[0.3em] font-medium">The Personalized Vedic protocol.</p>
            </div>

            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 w-full">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-brand-gold flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-all duration-500 border-4 border-brand-forest">
                    <step.icon className="text-brand-forest w-7 h-7 md:w-12 md:h-12" />
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-brand-gold text-[10px] md:text-xs font-bold">0{idx + 1}</span>
                      <h5 className="text-brand-cream font-serif text-sm md:text-2xl font-bold">{step.title}</h5>
                    </div>
                    <p className="text-brand-cream/40 text-[9px] md:text-xs uppercase font-bold tracking-widest leading-tight">{step.desc}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-12 -right-5 text-brand-gold/10" />
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
