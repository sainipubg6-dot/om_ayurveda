"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4",
          (scrolled || !isHome)
            ? "bg-brand-forest/95 backdrop-blur-md border-b border-brand-gold/30 py-3 shadow-lg" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <img 
                src="/Logo.png" 
                alt="Om Ayurveda Logo" 
                className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl tracking-tight leading-none text-brand-gold">
                OM AYURVEDA
              </span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-brand-cream/80 leading-none mt-1">Registered Brand</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "transition-colors font-medium text-sm uppercase tracking-wider",
                  location.pathname === link.href ? "text-brand-gold" : "text-brand-cream hover:text-brand-gold"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative p-2 text-brand-cream hover:text-brand-gold transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-brand-forest">
                  {cartCount}
                </span>
              </Link>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-brand-gold to-brand-goldDark text-brand-black font-bold hover:opacity-90 transition-all shadow-lg border-none text-xs"
                onClick={() => window.location.href = 'tel:7015001978'}
              >
                <Phone className="w-3 h-3 mr-1.5" />
                Consult
              </Button>
            </div>
          </div>

          {/* Mobile Toggle & Cart */}
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/cart" className="relative p-2 text-brand-gold transition-colors mr-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-brand-forest">
                {cartCount}
              </span>
            </Link>
            <button 
              className="text-brand-gold p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - SOLID BACKGROUND FOR PERFECT CONTRAST */}
      <div className={cn(
        "fixed inset-0 bg-brand-forest z-[60] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
        isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        {/* Close Button Inside Overlay */}
        <button 
          className="absolute top-6 right-6 text-brand-gold p-2 z-10"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>

        <div className="flex flex-col items-center gap-8 relative z-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={cn(
                "text-3xl font-serif tracking-[0.3em] uppercase transition-all duration-300 drop-shadow-md",
                location.pathname === link.href ? "text-brand-gold scale-110" : "text-brand-cream hover:text-brand-gold"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 w-full px-12 max-w-sm relative z-10">
          <Button 
            className="w-full bg-brand-gold text-brand-black font-bold py-8 text-xl rounded-2xl shadow-2xl active:scale-95 transition-transform"
            onClick={() => {
              setIsOpen(false);
              window.location.href = 'tel:7015001978';
            }}
          >
            <Phone className="w-5 h-5 mr-3" />
            Call for Advice
          </Button>
          <Link to="/cart" className="w-full" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full border-brand-gold/30 text-brand-gold py-8 text-xl rounded-2xl bg-white/5">
              <ShoppingCart className="w-5 h-5 mr-3" />
              Cart ({cartCount})
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;