"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-black pt-16 md:pt-24 pb-8 md:pb-10 border-t border-brand-gold/20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <img 
                src="/Logo.png" 
                alt="Om Ayurveda Logo" 
                className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif font-bold text-xl md:text-2xl text-brand-gold tracking-tight leading-none">OM AYURVEDA</span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-brand-cream/50 mt-1">Authentic Vedic Healing</span>
              </div>
            </Link>
            <p className="text-brand-cream/50 leading-relaxed mb-6 md:mb-8 text-sm md:text-base pr-4">
              Premium Ayurvedic healthcare dedicated to ancient wisdom and modern healing. Registered brand serving thousands across India.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr", title: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", title: "Instagram" },
                { icon: Youtube, href: "https://youtube.com/@omayurveda786?si=gat_k6lBuZht7mqe", title: "Youtube" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 hover:-translate-y-1 shadow-lg group/social"
                  title={`Follow us on ${social.title}`}
                >
                  <social.icon size={18} className="md:size-20 group-hover/social:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:pl-0 lg:pl-4">
            <h4 className="text-brand-cream font-serif text-lg md:text-xl font-bold mb-6 md:mb-8 border-b border-brand-gold/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Services', href: '/services' },
                { name: 'Products', href: '/products' },
                { name: 'Contact', href: '/contact' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-brand-cream/60 hover:text-brand-gold transition-colors text-sm md:text-base">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-brand-cream font-serif text-lg md:text-xl font-bold mb-6 md:mb-8 border-b border-brand-gold/10 pb-2 inline-block">Specialties</h4>
            <ul className="space-y-3 md:space-y-4">
              {['Swarna Bhasma', 'Joint Pain', 'Sexual Wellness', 'Athletes Care', 'Chronic Illness'].map(item => (
                <li key={item}>
                  <Link to="/services" className="text-brand-cream/60 hover:text-brand-gold transition-colors text-sm md:text-base">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brand-cream font-serif text-lg md:text-xl font-bold mb-6 md:mb-8 border-b border-brand-gold/10 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 md:space-y-6">
              <li className="text-brand-cream/60 text-sm md:text-base">
                <span className="block text-brand-gold font-bold mb-2 uppercase text-[10px] tracking-widest">Phone Support:</span>
                <div className="grid grid-cols-1 gap-1">
                  <a href="tel:7015001978" className="hover:text-brand-gold transition-colors">70150-01978</a>
                  <a href="tel:7404587273" className="hover:text-brand-gold transition-colors">74045-87273</a>
                  <a href="tel:8168887276" className="hover:text-brand-gold transition-colors">81688-87276</a>
                </div>
              </li>
              <li className="text-brand-cream/60 text-sm md:text-base">
                <span className="block text-brand-gold font-bold mb-2 uppercase text-[10px] tracking-widest">Clinic Location:</span>
                <a href="https://maps.app.goo.gl/vvRvzaicPrgiPKjJ7" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors block leading-relaxed">
                  Om Ayurveda Wellness Center, India
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-10 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <p className="text-brand-cream/30 text-[10px] md:text-xs">
            © 2025 Om Ayurveda®. All rights reserved. Registered Brand.
          </p>
          <p className="text-brand-cream/30 text-[10px] md:text-xs flex items-center justify-center gap-1">
            Bridging ancient Vedic tradition with modern healing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;