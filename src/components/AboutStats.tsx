"use client";

import React from 'react';
import { Users, Leaf, Heart, Globe2 } from 'lucide-react';

const stats = [
  { label: "Patients Treated", value: "1M+", icon: Users },
  { label: "Vedic Formulas", value: "500+", icon: Leaf },
  { label: "Successful Cases", value: "98%", icon: Heart },
  { label: "Global Reach", value: "25+", icon: Globe2, suffix: " Countries" }
];

const AboutStats = () => {
  return (
    <section className="py-20 bg-brand-forest relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-leaf.png')] opacity-10" />
      
      <div className="container px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-brand-gold/20">
                <stat.icon className="text-brand-gold w-8 h-8" />
              </div>
              <p className="text-brand-gold font-serif text-5xl font-bold mb-2">
                {stat.value}
                {stat.suffix && <span className="text-brand-cream text-lg ml-1 font-sans">{stat.suffix}</span>}
              </p>
              <p className="text-brand-cream/60 uppercase tracking-[0.2em] text-xs font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
