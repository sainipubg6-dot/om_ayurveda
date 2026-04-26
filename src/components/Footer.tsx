"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-black py-4 md:py-8 border-t border-brand-gold/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-4 md:mb-6">
          {/* Brand - Tight on Mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-2 group inline-flex">
              <img 
                src="/Logo.png" 
                alt="Om Ayurveda Logo" 
                className="h-7 md:h-9 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm md:text-base text-brand-gold tracking-tight leading-none">OM AYURVEDA</span>
                <span className="text-[6px] md:text-[7px] uppercase tracking-[0.2em] text-brand-cream/30">Vedic Healing</span>
              </div>
            </Link>
            <p className="text-brand-cream/30 text-[10px] md:text-xs leading-tight mb-3">
              Ancient wisdom meet modern clinical precision.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Facebook, href: "https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr" },
                { icon: Instagram, href: "https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                { icon: Youtube, href: "https://youtube.com/@omayurveda786?si=gat_k6lBuZht7mqe" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded bg-white/5 border border-brand-gold/5 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all">
                  <social.icon size={10} />
                </a>
              ))}
            </div>
          </div>

          {/* Menu & Focus - Side by Side on Mobile */}
          <div className="col-span-1">
            <h4 className="text-brand-cream font-serif text-[11px] md:text-sm font-bold mb-1.5 border-b border-brand-gold/10 pb-0.5 inline-block">Menu</h4>
            <ul className="space-y-1">
              {['Home', 'About', 'Services', 'Products', 'Contact'].map(name => (
                <li key={name}>
                  <Link to={name === 'Home' ? '/' : `/${name.toLowerCase()}`} className="text-brand-cream/40 hover:text-brand-gold transition-colors text-[10px] md:text-xs">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-brand-cream font-serif text-[11px] md:text-sm font-bold mb-1.5 border-b border-brand-gold/10 pb-0.5 inline-block">Focus</h4>
            <ul className="space-y-1">
              {['Joint Pain', 'Sexual Wellness', 'Athletes', 'Detox'].map(item => (
                <li key={item}>
                  <Link to="/services" className="text-brand-cream/40 hover:text-brand-gold transition-colors text-[10px] md:text-xs">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Minimalist on Mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-brand-cream font-serif text-[11px] md:text-sm font-bold mb-1.5 border-b border-brand-gold/10 pb-0.5 inline-block">Contact</h4>
            <div className="flex lg:flex-col gap-x-4 gap-y-1">
              <div className="text-brand-cream/40 text-[10px] md:text-xs">
                <a href="tel:7015001978" className="hover:text-brand-gold block">70150-01978</a>
              </div>
              <div className="text-brand-cream/40 text-[10px] md:text-xs">
                <a href="https://maps.app.goo.gl/vvRvzaicPrgiPKjJ7" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold block">
                  Safidon, Haryana
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-brand-cream/5 flex justify-between items-center text-[9px] md:text-xs text-brand-cream/20 font-medium">
          <p>© 2025 Om Ayurveda®</p>
          <p className="italic">Vedic Healing • Modern Precision</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;