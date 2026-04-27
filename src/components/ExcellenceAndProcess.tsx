"use client";

import React from 'react';
import { ShieldCheck, Users, Award, Leaf, HeartPulse, Sparkles, ClipboardList, Stethoscope, Heart, ChevronRight } from 'lucide-react';

const features = [
  { icon: Award, title: "68+ Years Legacy", subtitle: "Est. 1958" },
  { icon: Users, title: "1M+ Patients", subtitle: "Globally Trusted" },
  { icon: ShieldCheck, title: "Registered Brand", subtitle: "Govt. Verified" },
  { icon: Sparkles, title: "Swarna Bhasma", subtitle: "Expert Specialists" },
  { icon: Leaf, title: "100% Natural", subtitle: "Pure Herbal Blends" },
  { icon: HeartPulse, title: "Personalized Care", subtitle: "Custom Treatment" },
];

const steps = [
  { title: "Consultation", icon: ClipboardList, desc: "History & Assessment" },
  { title: "Diagnosis", icon: Stethoscope, desc: "Root Cause Discovery" },
  { title: "Treatment", icon: Leaf, desc: "Custom Gold Doses" },
  { title: "Recovery", icon: Heart, desc: "Guided Healing" },
];

const ExcellenceAndProcess = () => {
  return (
    <section className="py-6 md:py-16 bg-brand-cream relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-brand-forest/5 rounded-full blur-3xl -mr-24 md:-mr-32 -mt-24 md:-mt-32" />
      <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-brand-forest/5 rounded-full blur-3xl -ml-24 md:-ml-32 -mb-24 md:-mb-32" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-5 md:mb-12">
          <h2 className="text-brand-forest/40 font-serif text-[9px] md:text-sm uppercase tracking-[0.4em] mb-1 font-bold">Our Excellence & Journey</h2>
          <h3 className="text-brand-forest font-serif text-xl md:text-4xl leading-tight font-bold">Tradition. Science. Results.</h3>
          <div className="w-10 md:w-20 h-0.5 md:h-1 bg-brand-forest/20 mx-auto rounded-full mt-1.5" />
        </div>

        {/* 1. WHY CHOOSE US - Reduced padding and gaps by ~30% on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4 mb-6 md:mb-16">
          {features.map((item, i) => (
            <div key={i} className="bg-brand-forest border border-brand-forest/10 p-2.5 md:p-5 rounded-xl md:rounded-[1.5rem] hover:opacity-90 transition-all group flex flex-col items-center text-center shadow-lg">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-lg flex items-center justify-center mb-1.5 md:mb-3 group-hover:scale-110 transition-transform">
                <item.icon className="text-brand-cream w-3.5 h-3.5 md:w-6 md:h-6" />
              </div>
              <h4 className="text-brand-cream font-serif text-[10px] md:text-sm font-bold leading-tight">{item.title}</h4>
              <p className="text-brand-gold/60 text-[7px] md:text-[9px] uppercase tracking-widest mt-0.5 font-bold">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* 2. THE JOURNEY - Compact layout for mobile */}
        <div className="bg-brand-forest border border-brand-gold/20 rounded-xl md:rounded-[2.5rem] p-4 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-10 relative z-10">
            <div className="lg:max-w-[200px] w-full border-b lg:border-b-0 lg:border-r border-brand-gold/20 pb-3 lg:pb-0 lg:pr-6">
              <h4 className="text-brand-gold font-serif text-lg md:text-2xl font-bold mb-0.5">Our Journey</h4>
              <p className="text-brand-cream/40 text-[9px] md:text-xs leading-relaxed uppercase tracking-widest">Personalized Vedic protocol.</p>
            </div>

            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-center lg:flex-col lg:text-center gap-2.5 group">
                  <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon className="text-brand-forest w-4 h-4 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <div className="flex items-center lg:justify-center gap-1.5 mb-0">
                      <span className="text-brand-gold text-[8px] md:text-[9px] font-bold">0{idx + 1}</span>
                      <h5 className="text-brand-cream font-serif text-[11px] md:text-base font-bold">{step.title}</h5>
                    </div>
                    <p className="text-brand-cream/40 text-[8px] md:text-[11px] leading-tight uppercase font-medium">{step.desc}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-brand-gold/20" />
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

export default ExcellenceAndProcess;
