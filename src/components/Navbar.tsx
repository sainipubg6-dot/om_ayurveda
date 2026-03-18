"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled 
          ? "bg-brand-forest/95 backdrop-blur-md border-b border-brand-gold/30 py-3 shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-brand-forest font-bold text-xl">ॐ</span>
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-serif font-bold text-xl tracking-tight leading-none",
              scrolled ? "text-brand-gold" : "text-brand-gold"
            )}>
              OM AYURVEDA
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/80">Registered Brand</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-brand-cream hover:text-brand-gold transition-colors font-medium text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="bg-gradient-to-r from-brand-gold to-brand-goldDark text-brand-black font-bold hover:opacity-90 transition-all shadow-lg border-none"
            onClick={() => window.location.href = 'tel:7015001978'}
          >
            <Phone className="w-4 h-4 mr-2" />
            Book Consultation
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-brand-forest z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <button 
          className="absolute top-6 right-6 text-brand-gold"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-brand-cream text-2xl font-serif hover:text-brand-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
        <Button 
          className="bg-brand-gold text-brand-black font-bold px-8 py-6 text-lg"
          onClick={() => {
            setIsOpen(false);
            window.location.href = 'tel:7015001978';
          }}
        >
          Book Consultation
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;