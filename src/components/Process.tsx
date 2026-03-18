"use client";

import React from 'react';
import { ClipboardList, Stethoscope, Leaf, Heart } from 'lucide-react';

const steps = [
  {
    title: "Consultation",
    hindi: "परामर्श",
    description: "Detailed analysis of your Prakriti (body type) and current health concerns.",
    icon: ClipboardList,
  },
  {
    title: "Diagnosis",
    hindi: "निदान",
    description: "Identifying the root cause of imbalance using traditional Nadi Pariksha.",
    icon: Stethoscope,
  },
  {
    title: "Treatment",
    hindi: "उपचार",
    description: "Personalized herbal formulations and Swarna Bhasma protocols.",
    icon: Leaf,
  },
  {
    title: "Recovery",
    hindi: "स्वास्थ्य लाभ",
    description: "Continuous support and lifestyle guidance for long-term wellness.",
    icon: Heart,
  }
];

const Process = () => {
  return (
    <section className="py-24 bg-brand-forest relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-brand-gold rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-brand-gold rounded-full" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">The Journey</h2>
          <h3 className="text-brand-cream font-serif text-4xl md:text-5xl mb-6">Your Path to Wellness</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-brand-gold/50 to-transparent z-0 -translate-x-8" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-brand-gold/10 border-2 border-brand-gold/30 rounded-full flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(201,168,76,0.1)]">
                  <step.icon className="text-brand-gold group-hover:text-brand-black w-10 h-10 transition-colors" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-brand-gold text-brand-black rounded-full flex items-center justify-center font-bold text-sm border-4 border-brand-forest">
                    0{index + 1}
                  </span>
                </div>
                
                <h4 className="text-brand-gold font-hindi text-2xl mb-1">{step.hindi}</h4>
                <h5 className="text-brand-cream font-serif text-xl font-bold mb-4">{step.title}</h5>
                <p className="text-brand-cream/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;