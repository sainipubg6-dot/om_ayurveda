"use client";

import React from 'react';
import { Award, GraduationCap, Stethoscope } from 'lucide-react';

const doctors = [
  {
    name: "Dr. Arvind Sharma",
    title: "Senior Ayurvedic Physician",
    specialty: "Chronic Disease & Swarna Bhasma Expert",
    experience: "25+ Years",
    education: "B.A.M.S, M.D. (Ayurveda)",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Dr. Meera Pathak",
    title: "Wellness Consultant",
    specialty: "Panchakarma & Women's Health",
    experience: "15+ Years",
    education: "B.A.M.S, P.G.D. (Yoga)",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Dr. Vikram Singh",
    title: "Sports Ayurveda Specialist",
    specialty: "Athletic Performance & Recovery",
    experience: "12+ Years",
    education: "B.A.M.S, M.S. (Shalya Tantra)",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
  }
];

const Team = () => {
  return (
    <section id="team" className="py-24 bg-white relative overflow-hidden">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Our Experts</h2>
          <h3 className="text-brand-forest font-serif text-4xl md:text-5xl mb-6">Meet Our Vaidyas</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {doctors.map((doc, index) => (
            <div key={index} className="group relative bg-brand-cream/20 rounded-3xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold transition-all duration-500">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={doc.image} 
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-brand-cream text-sm italic">"{doc.specialty}"</p>
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-brand-forest font-serif text-2xl font-bold mb-1">{doc.name}</h4>
                <p className="text-brand-goldDark font-bold text-sm uppercase tracking-widest mb-4">{doc.title}</p>
                
                <div className="space-y-3 border-t border-brand-gold/20 pt-4">
                  <div className="flex items-center gap-3 text-brand-black/70">
                    <GraduationCap className="w-5 h-5 text-brand-gold" />
                    <span className="text-sm">{doc.education}</span>
                  </div>
                  <div className="flex items-center gap-3 text-brand-black/70">
                    <Award className="w-5 h-5 text-brand-gold" />
                    <span className="text-sm">{doc.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-brand-black/70">
                    <Stethoscope className="w-5 h-5 text-brand-gold" />
                    <span className="text-sm">{doc.specialty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;