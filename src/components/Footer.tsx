"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Loader2, MapPin, Phone, Mail } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mrervyjd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showSuccess("Namaste! Successfully subscribed.");
        setEmail('');
      } else {
        showError("Please try again.");
      }
    } catch (err) {
      showError("Connection error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-black py-3 md:py-5 border-t border-brand-gold/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-3 md:mb-4">
          {/* Brand - Tight on Mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex flex-col mb-3 group inline-flex">
              <span className="font-serif font-bold text-xl md:text-2xl text-white tracking-tight leading-none">OM AYURVEDA</span>
              <div className="h-0.5 w-full bg-brand-gold mt-1 mb-1.5" />
              <span className="font-hindi text-white font-medium text-xs md:text-sm text-center">पहला सुख निरोगी काया</span>
            </Link>
            <div className="flex gap-2">
              {[
                { icon: Facebook, href: "https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr" },
                { icon: Instagram, href: "https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                { icon: Youtube, href: "https://youtube.com/@omayurveda786?si=gat_k6lBuZht7mqe" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-black transition-all">
                  <social.icon size={9} />
                </a>
              ))}
            </div>
          </div>

          {/* Menu & Focus - Side by Side on Mobile */}
          <div className="col-span-1">
            <h4 className="text-white font-serif text-[10px] md:text-xs font-bold mb-1 border-b border-white/10 pb-0.5 inline-block">Menu</h4>
            <ul className="space-y-0.5">
              {['Home', 'About', 'Services', 'Products', 'Contact'].map(name => (
                <li key={name}>
                  <Link to={name === 'Home' ? '/' : `/${name.toLowerCase()}`} className="text-white/60 hover:text-brand-gold transition-colors text-[9px] md:text-[11px]">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-serif text-[10px] md:text-xs font-bold mb-1 border-b border-white/10 pb-0.5 inline-block">Policies</h4>
            <ul className="space-y-0.5">
              {[
                { name: 'Terms', path: '/terms' },
                { name: 'Privacy', path: '/privacy' },
                { name: 'Shipping', path: '/shipping' },
                { name: 'Refunds', path: '/refunds' }
              ].map(policy => (
                <li key={policy.name}>
                  <Link to={policy.path} className="text-white/60 hover:text-brand-gold transition-colors text-[9px] md:text-[11px]">
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px] md:text-[10px] text-white/30 font-medium">
          <p>© 2026 Om Ayurveda®</p>
          <p className="italic font-bold text-white/50">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;