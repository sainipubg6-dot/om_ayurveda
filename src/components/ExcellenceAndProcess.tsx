"use client";

import React from 'react';
import { ShieldCheck, Users, Award, Leaf, HeartPulse, Sparkles, ClipboardList, Stethoscope, Heart, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  { icon: Award, title: "68+ Years Legacy", subtitle: "Est. 1958" },
  { icon: Users, title: "1M+ Patients", subtitle: "Globally Trusted" },
  { icon: ShieldCheck, title: "Registered Brand", subtitle: "Govt. Verified" },
  { icon: Sparkles, title: "Swarna Bhasma", subtitle: "Gold Specialists" },
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
          <h3 className="text-brand-cream font-serif text-2xl md:text-4xl leading-tight">Tradition. Science. Results.</h3>
          <div className="w-12 md:w-20 h-1 bg-brand-gold mx-auto rounded-full mt-2" />
        </div>

        {/* 1. WHY CHOOSE US - COMPACT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
          {features.map((item, i) => (
            <div key={i} className="bg-white/5 border border-brand-gold/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem] hover:border-brand-gold/30 transition-all group">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="text-brand-gold w-5 h-5 md:w-7 md:h-7" />
              </div>
              <h4 className="text-brand-cream font-serif text-[13px] md:text-xl font-bold leading-tight">{item.title}</h4>
              <p className="text-brand-gold/50 text-[9px] md:text-xs uppercase tracking-widest mt-1 font-bold">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* 2. THE JOURNEY - COMPACT TIMELINE */}
        <div className="bg-brand-cream/5 border border-brand-gold/20 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-12 relative z-10">
            <div className="lg:max-w-[240px] w-full border-b lg:border-b-0 lg:border-r border-brand-gold/20 pb-6 lg:pb-0 lg:pr-8">
              <h4 className="text-brand-gold font-serif text-xl md:text-3xl font-bold mb-2">The Healing Journey</h4>
              <p className="text-brand-cream/40 text-[11px] md:text-sm leading-relaxed">A standardized, yet deeply personalized Vedic recovery protocol.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-center lg:flex-col lg:text-center gap-4 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon className="text-brand-black w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <div className="flex items-center lg:justify-center gap-2 mb-0.5">
                      <span className="text-brand-gold text-[10px] font-bold">0{idx + 1}</span>
                      <h5 className="text-brand-cream font-serif text-sm md:text-lg font-bold">{step.title}</h5>
                    </div>
                    <p className="text-brand-cream/40 text-[10px] md:text-xs leading-tight">{step.desc}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-brand-gold/20" />
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
