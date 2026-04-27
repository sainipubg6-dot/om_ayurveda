"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Loader2 } from 'lucide-react';
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
    <footer className="bg-brand-black py-4 md:py-8 border-t border-brand-gold/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-4 md:mb-6">
          {/* Brand - Tight on Mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex flex-col mb-4 group inline-flex">
              <span className="font-serif font-bold text-2xl md:text-3xl text-brand-gold tracking-tight leading-none">OM AYURVEDA</span>
              <div className="h-0.5 md:h-1 w-full bg-brand-gold mt-1 mb-2" />
              <span className="font-hindi text-brand-gold font-medium text-sm md:text-base text-center">पहला सुख निरोगी काया</span>
            </Link>
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
            <h4 className="text-brand-cream font-serif text-[11px] md:text-sm font-bold mb-1.5 border-b border-brand-gold/10 pb-0.5 inline-block">Policies</h4>
            <ul className="space-y-1">
              {[
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Shipping Policy', path: '/shipping' },
                { name: 'Refund Policy', path: '/refunds' }
              ].map(policy => (
                <li key={policy.name}>
                  <Link to={policy.path} className="text-brand-cream/50 hover:text-brand-gold transition-colors text-[10px] md:text-xs">
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-brand-cream font-serif text-[11px] md:text-sm font-bold mb-1.5 border-b border-brand-gold/10 pb-0.5 inline-block">Newsletter</h4>
            <p className="text-brand-cream/30 text-[9px] md:text-[10px] mb-2 leading-tight">Join for health tips & exclusive offers.</p>
            <form 
              className="flex gap-1" 
              onSubmit={handleSubmit}
            >
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                disabled={isSubmitting}
                className="bg-white/5 border border-brand-gold/20 rounded px-2 py-1 text-[10px] md:text-xs text-brand-cream w-full focus:outline-none focus:border-brand-gold disabled:opacity-50"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-gold text-brand-black px-3 py-1 rounded text-[10px] font-bold hover:bg-brand-goldDark transition-colors min-w-[50px] flex items-center justify-center"
              >
                {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Join"}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-3 border-t border-brand-cream/5 flex justify-between items-center text-[9px] md:text-xs text-brand-cream/20 font-medium">
          <p>© 2026 Om Ayurveda®</p>
          <p className="italic font-bold text-brand-gold/60">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;