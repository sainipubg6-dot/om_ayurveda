"use client";

import React from 'react';
import { ShieldCheck, HeartPulse, Scale, Flame } from 'lucide-react';

const values = [
  {
    title: "Purity First",
    desc: "Every herb is sourced from its natural habitat, ensuring 100% active potency in our formulations.",
    icon: ShieldCheck
  },
  {
    title: "Patient-Centric",
    desc: "We don't just treat symptoms; we treat the individual. Each dose is customized for your unique biology.",
    icon: HeartPulse
  },
  {
    title: "Empirical Wisdom",
    desc: "Our treatments are rooted in the Charaka Samhita and Sushruta Samhita, verified by decades of practice.",
    icon: Scale
  },
  {
    title: "Ageless Science",
    desc: "Ayurveda is the science of life. We bridge ancient knowledge with modern clinical precision.",
    icon: Flame
  }
];

const AboutValues = () => {
  return (
    <section className="py-24 bg-brand-cream relative">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-goldDark font-serif text-lg uppercase tracking-[0.3em] mb-4">Our Core Philosophy</h2>
          <h3 className="text-brand-forest font-serif text-4xl md:text-5xl mb-6">Values That Drive Us</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-brand-gold/10 hover:border-brand-gold transition-all duration-500 shadow-xl group">
              <div className="w-14 h-14 bg-brand-forest rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg">
                <value.icon className="text-brand-gold w-8 h-8" />
              </div>
              <h4 className="text-brand-forest font-serif text-2xl font-bold mb-4">{value.title}</h4>
              <p className="text-brand-black/60 text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;