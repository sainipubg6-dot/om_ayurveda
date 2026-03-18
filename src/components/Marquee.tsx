"use client";

import React from 'react';

const Marquee = () => {
  const specialties = [
    "स्वर्ण भस्म",
    "जोड़ों का दर्द",
    "Sexual Wellness",
    "Athletes Performance",
    "Chronic Illness",
    "Stamina Boost",
    "Immunity Booster",
    "Natural Healing",
    "Ayurvedic Detox",
  ];

  return (
    <div className="bg-brand-goldDark py-4 overflow-hidden border-y border-brand-gold/50">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {specialties.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-brand-cream font-serif text-xl md:text-2xl mx-8 font-bold uppercase tracking-wider">
                  {item}
                </span>
                <span className="text-brand-forest text-2xl">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;