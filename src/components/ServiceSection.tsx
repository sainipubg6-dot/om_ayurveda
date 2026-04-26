"use client";

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceSectionProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  benefits: string[];
  image: string;
  reverse?: boolean;
  onEnquire: () => void;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  subtitle,
  description,
  price,
  benefits,
  image,
  reverse = false,
  onEnquire
}) => {
  return (
    <section className={cn(
      "py-24 overflow-hidden",
      reverse ? "bg-white" : "bg-brand-cream/30"
    )}>
      <div className="container px-6">
        <div className={cn(
          "flex flex-col lg:flex-row items-center gap-16 xl:gap-24",
          reverse && "lg:flex-row-reverse"
        )}>
          {/* Image Column */}
          <div className="flex-1 w-full group">
            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] shadow-2xl border-8 border-white bg-white">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-forest/10 group-hover:bg-transparent transition-colors" />
            </div>
            {/* Visual Decoration */}
            <div className={cn(
              "hidden xl:block absolute w-64 h-64 border-4 border-brand-gold/10 rounded-full -z-10",
              reverse ? "-left-12 -top-12" : "-right-12 -bottom-12"
            )} />
          </div>

          {/* Content Column */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4 inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-bold uppercase tracking-widest border border-brand-gold/20">
              {subtitle}
            </div>
            <h2 className="text-brand-forest font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {title}
            </h2>
            <p className="text-brand-black/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-xl mx-auto lg:mx-0">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-brand-gold/10 hover:border-brand-gold transition-colors text-left group/item">
                  <div className="w-8 h-8 bg-brand-forest rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:rotate-12 transition-transform">
                    <CheckCircle2 className="text-brand-gold w-4 h-4" />
                  </div>
                  <span className="text-brand-forest font-bold text-sm leading-tight">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-brand-black/40 text-[10px] uppercase tracking-widest font-bold mb-1">Pricing starts From</span>
                <span className="text-brand-gold text-4xl font-bold font-serif">₹{price}</span>
              </div>
              <div className="h-12 w-px bg-brand-gold/20 hidden sm:block" />
              <Button 
                onClick={onEnquire}
                className="bg-brand-forest hover:bg-brand-forest/90 text-brand-gold font-bold h-16 px-10 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 group"
              >
                Consult with Vaidhya
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
