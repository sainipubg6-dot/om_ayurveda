"use client";

import React from 'react';
import { ShieldCheck, Users, Award, Leaf, HeartPulse, Sparkles, ClipboardList, Stethoscope, Heart, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <section className="py-8 md:py-16 bg-brand-forest relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-12">
          <h2 className="text-brand-gold font-serif text-[10px] md:text-sm uppercase tracking-[0.4em] mb-1 font-bold">Our Excellence & Journey</h2>
          <h3 className="text-white font-serif text-2xl md:text-4xl leading-tight">Tradition. Science. Results.</h3>
          <div className="w-12 md:w-20 h-1 bg-brand-gold mx-auto rounded-full mt-2" />
        </div>

        {/* 1. WHY CHOOSE US - COMPACT 3x2 GRID ON MOBILE, 6 COL ON DESKTOP */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-16">
          {features.map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-3 md:p-5 rounded-2xl md:rounded-[1.5rem] hover:border-white/30 transition-all group flex flex-col items-center text-center">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-white/10 rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                <item.icon className="text-white w-4 h-4 md:w-6 md:h-6" />
              </div>
              <h4 className="text-white font-serif text-[11px] md:text-sm font-bold leading-tight">{item.title}</h4>
              <p className="text-white/60 text-[8px] md:text-[9px] uppercase tracking-widest mt-1 font-bold">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* 2. THE JOURNEY - COMPACT TIMELINE */}
        <div className="bg-brand-cream/5 border border-brand-gold/20 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-10 relative z-10">
            <div className="lg:max-w-[200px] w-full border-b lg:border-b-0 lg:border-r border-brand-gold/20 pb-4 lg:pb-0 lg:pr-6">
              <h4 className="text-brand-gold font-serif text-xl md:text-2xl font-bold mb-1">Our Journey</h4>
              <p className="text-brand-cream/40 text-[10px] md:text-xs leading-relaxed">A standardized, personalized Vedic protocol.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-center lg:flex-col lg:text-center gap-3 group">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon className="text-brand-black w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <div className="flex items-center lg:justify-center gap-2 mb-0.5">
                      <span className="text-brand-gold text-[9px] font-bold">0{idx + 1}</span>
                      <h5 className="text-brand-cream font-serif text-xs md:text-base font-bold">{step.title}</h5>
                    </div>
                    <p className="text-brand-cream/40 text-[9px] md:text-[11px] leading-tight">{step.desc}</p>
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
