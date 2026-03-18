"use client";

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-black pt-20 pb-10 border-t border-brand-gold/20">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
                <span className="text-brand-forest font-bold text-xl">ॐ</span>
              </div>
              <span className="font-serif font-bold text-2xl text-brand-gold tracking-tight">OM AYURVEDA</span>
            </div>
            <p className="text-brand-cream/50 leading-relaxed mb-8">
              Premium Ayurvedic healthcare dedicated to ancient wisdom and modern healing. Registered brand serving thousands across India.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'TW', 'YT'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-cream font-serif text-xl font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Services', 'Products', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-brand-cream/60 hover:text-brand-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-brand-cream font-serif text-xl font-bold mb-8">Specialties</h4>
            <ul className="space-y-4">
              {['Swarna Bhasma', 'Joint Pain', 'Sexual Wellness', 'Athletes Care', 'Chronic Illness'].map(item => (
                <li key={item}>
                  <a href="#services" className="text-brand-cream/60 hover:text-brand-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brand-cream font-serif text-xl font-bold mb-8">Contact Us</h4>
            <ul className="space-y-4">
              <li className="text-brand-cream/60">
                <span className="block text-brand-gold font-bold mb-1">Phone:</span>
                70150-01978<br />
                74045-87273
              </li>
              <li className="text-brand-cream/60">
                <span className="block text-brand-gold font-bold mb-1">Hours:</span>
                9:00 AM – 5:00 PM (Daily)
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-cream/30 text-sm">
            © 2025 Om Ayurveda®. All rights reserved.
          </p>
          <p className="text-brand-cream/30 text-sm flex items-center gap-1">
            Designed with <span className="text-brand-leaf">🌿</span> for your health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;