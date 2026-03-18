"use client";

import React from 'react';
import { ShieldCheck, Users, Award, Leaf, HeartPulse, Sparkles } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "Registered Brand",
    description: "Om Ayurveda is a government-registered brand ensuring authenticity and trust in every treatment."
  },
  {
    icon: Users,
    title: "10,000+ Happy Patients",
    description: "We have successfully treated thousands of patients across India for various chronic conditions."
  },
  {
    icon: Award,
    title: "25+ Years Legacy",
    description: "Decades of experience in traditional Ayurvedic medicine and modern holistic healing."
  },
  {
    icon: Leaf,
    title: "100% Pure Herbs",
    description: "We use only the highest quality, ethically sourced herbs and minerals for our formulations."
  },
  {
    icon: HeartPulse,
    title: "Personalized Care",
    description: "Every patient receives a custom treatment plan based on their unique body constitution (Prakriti)."
  },
  {
    icon: Sparkles,
    title: "Swarna Bhasma Experts",
    description: "Specialized in high-potency gold-based treatments for rapid recovery and vitality."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Why Om Ayurveda</h2>
          <h3 className="text-brand-forest font-serif text-4xl md:text-5xl mb-6">The Gold Standard of Healing</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 rounded-3xl bg-brand-cream/10 border border-brand-gold/10 hover:border-brand-gold transition-all duration-500 group">
              <div className="w-16 h-16 bg-brand-forest rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <feature.icon className="text-brand-gold w-8 h-8" />
              </div>
              <h4 className="text-brand-forest font-serif text-2xl font-bold mb-4">{feature.title}</h4>
              <p className="text-brand-black/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;