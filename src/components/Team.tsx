"use client";

import React from 'react';

const doctors = [
  {
    name: "ACHARYA Vikas JI",
    image: "/images/ACHARYA Vikas JI.webp",
  },
  {
    name: "ACHARYA YOGESH JI",
    image: "/images/ACHARYA YOGESH JI.webp",
  }
];

const Team = () => {
  return (
    <section id="team" className="py-10 md:py-32 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-brand-gold font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 md:mb-4 font-bold">Our Experts</h2>
          <h3 className="text-brand-forest font-serif text-2xl md:text-5xl mb-3 md:mb-6 leading-tight font-bold">Meet Our Vaidyas</h3>
          <div className="w-16 h-0.5 md:w-24 md:h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        {/* 2-Column Grid on Mobile and Desktop, Max-width reduced to 2xl for the 30% size reduction effect */}
        <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-2xl mx-auto">
          {doctors.map((doc, index) => (
            <div key={index} className="group flex flex-col items-center">
              {/* Reduced aspect ratio and scale for a more compact look */}
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-xl border-2 md:border-4 border-brand-gold/10 group-hover:border-brand-gold transition-all duration-700 mb-4 md:mb-8">
                <img 
                  src={doc.name === "ACHARYA Vikas JI" ? "/images/ACHARYA Vikas JI.webp" : "/images/ACHARYA YOGESH JI.webp"} 
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <h4 className="text-brand-forest font-serif text-sm md:text-2xl font-bold text-center group-hover:text-brand-gold transition-colors duration-500 uppercase tracking-tight leading-tight">
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