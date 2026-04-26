"use client";

import React from 'react';

const doctors = [
  {
    name: "ACHARYA Vikas JI",
    image: "/images/ACHARYA Vikas JI.png",
  },
  {
    name: "ACHARYA YOGESH JI",
    image: "/images/ACHARYA YOGESH JI.png",
  }
];

const Team = () => {
  return (
    <section id="team" className="py-10 md:py-32 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <h2 className="text-brand-gold font-serif text-xs md:text-lg uppercase tracking-[0.3em] mb-2 md:mb-4">Our Experts</h2>
          <h3 className="text-brand-forest font-serif text-2xl md:text-5xl mb-3 md:mb-6 leading-tight">Meet Our Vaidyas</h3>
          <div className="w-16 h-0.5 md:w-24 md:h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
          {doctors.map((doc, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-brand-gold/10 group-hover:border-brand-gold transition-all duration-700 mb-6 md:mb-10">
                <img 
                  src={doc.image} 
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <h4 className="text-brand-forest font-serif text-2xl md:text-4xl font-bold text-center group-hover:text-brand-gold transition-colors duration-500 uppercase tracking-tight">
                {doc.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;