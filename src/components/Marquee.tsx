import React from 'react';
import InfiniteScroll from './react-bits/InfiniteScroll';

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
    <div className="bg-brand-goldDark overflow-hidden border-y border-brand-gold/50">
      <InfiniteScroll speed={40} pauseOnHover={false}>
        {specialties.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-brand-cream font-serif text-xl md:text-2xl mx-8 font-bold uppercase tracking-wider">
              {item}
            </span>
            <span className="text-brand-forest text-2xl">✦</span>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Marquee;