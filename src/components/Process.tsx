"use client";

import React from 'react';
import { ClipboardList, Stethoscope, Leaf, Heart, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Detailed Consultation",
    hindi: "विस्तृत परामर्श",
    description: "We analyze your medical history, height, weight, blood group, allergies, and past/current medications to understand your unique body needs.",
    icon: ClipboardList,
    details: ["Medical History", "Height & Weight", "Blood Group", "Allergies", "Current Medicines"]
  },
  {
    title: "Personalized Diagnosis",
    hindi: "व्यक्तिगत निदान",
    description: "Identifying root causes through traditional Vedic wisdom and modern physical assessment.",
    icon: Stethoscope,
  },
  {
    title: "Customized Treatment",
    hindi: "अनुकूलित उपचार",
    description: "Doses are meticulously prepared for you. Special Swarna Bhasma schedules are created based on your specific health requirements.",
    icon: Leaf,
  },
  {
    title: "Guided Recovery",
    hindi: "निर्देशित सुधार",
    description: "Continuous support and schedule adjustments to ensure the most effective healing journey.",
    icon: Heart,
  }
];

const Process = () => {
  return (
    <section className="py-12 md:py-24 bg-brand-forest relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-brand-gold rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-brand-gold rounded-full" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-20">
          <h2 className="text-brand-gold font-serif text-xs md:text-lg uppercase tracking-[0.3em] mb-2 md:mb-4">The Journey</h2>
          <h3 className="text-brand-cream font-serif text-2xl md:text-5xl mb-3 md:mb-6 leading-tight">Your Path to Personalized Healing</h3>
          <div className="w-16 h-0.5 md:w-24 md:h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-brand-gold/50 to-transparent z-0 -translate-x-8" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-24 md:h-24 bg-brand-gold/10 border-2 border-brand-gold/30 rounded-full flex items-center justify-center mb-4 md:mb-8 group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(201,168,76,0.1)] relative">
                  <step.icon className="text-brand-gold group-hover:text-brand-black w-6 h-6 md:w-10 md:h-10 transition-colors" />
                  <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-8 md:h-8 bg-brand-gold text-brand-black rounded-full flex items-center justify-center font-bold text-[9px] md:text-sm border-2 md:border-4 border-brand-forest">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="text-brand-gold font-hindi text-sm md:text-2xl mb-0.5">{step.hindi}</h4>
                <h5 className="text-brand-cream font-serif text-xs md:text-xl font-bold mb-2 md:mb-4 leading-tight">{step.title}</h5>
                <p className="text-brand-cream/70 leading-relaxed text-xs md:text-base hidden md:block">
                  {step.description}
                </p>

                {step.details && (
                  <div className="hidden md:flex flex-wrap justify-center gap-2 mt-2">
                    {step.details.map((d, i) => (
                      <span key={i} className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-1 rounded-md border border-brand-gold/30">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-20 bg-brand-cream/5 border border-brand-gold/20 p-4 md:p-8 rounded-2xl md:rounded-3xl text-center max-w-4xl mx-auto">
          <p className="text-brand-gold font-serif text-sm md:text-xl italic leading-relaxed">
            "Because every individual is unique, our healing is tailored just for you."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;