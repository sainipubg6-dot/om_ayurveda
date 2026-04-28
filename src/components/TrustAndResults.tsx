"use client";

import React from 'react';
import { Trophy, ShieldPlus, CheckCircle2, ShieldCheck, Award, BadgeCheck } from 'lucide-react';

const certificates = [
  { label: "FSSAI CERTIFIED", icon: ShieldCheck }, 
  { label: "ISO 9001:2015", icon: BadgeCheck }, 
  { label: "GMP CERTIFIED", icon: Award }, 
  { label: "WHO COMPLIANT", icon: CheckCircle2 }, 
  { label: "100% NATURAL", icon: CheckCircle2 }, 
  { label: "GOVT OF INDIA APPROVED", icon: Trophy }, 
  { label: "AYUSH CERTIFIED", icon: ShieldPlus }
];

// Duplicate enough times for a seamless infinite loop
const marqueeItems = [...certificates, ...certificates, ...certificates, ...certificates];

const TrustAndResults = () => {
  return (
    <div className="w-full bg-[#7C8F79] overflow-hidden py-3 flex relative shadow-inner">
      <div className="flex animate-marquee shrink-0 whitespace-nowrap min-w-full items-center">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`m1-${idx}`} className="flex items-center">
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#FDFBF7] ml-4 md:ml-8" />
              <span className="text-[#FDFBF7] font-serif text-sm md:text-base font-bold tracking-widest px-2 md:px-3">
                {item.label}
              </span>
              <svg className="w-3 h-3 md:w-4 md:h-4 text-[#1C3A27] mx-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          );
        })}
      </div>
      
      <div className="flex animate-marquee shrink-0 whitespace-nowrap min-w-full items-center" aria-hidden="true">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`m2-${idx}`} className="flex items-center">
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#FDFBF7] ml-4 md:ml-8" />
              <span className="text-[#FDFBF7] font-serif text-sm md:text-base font-bold tracking-widest px-2 md:px-3">
                {item.label}
              </span>
              <svg className="w-3 h-3 md:w-4 md:h-4 text-[#1C3A27] mx-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustAndResults;
