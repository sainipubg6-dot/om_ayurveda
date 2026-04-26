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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
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
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight leading-none text-brand-gold">
              OM AYURVEDA
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/80 leading-none mt-1">Registered Brand</span>
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
          <Link to="/cart" className="relative p-2 text-brand-gold transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-brand-forest">
              {cartCount}
            </span>
          </Link>
          <button 
            className="text-brand-gold p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-brand-forest/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden overflow-y-auto pt-20 pb-10",
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        <button 
          className="absolute top-5 right-5 text-brand-gold p-2"
          onClick={() => setIsOpen(false)}
        >
          <X size={30} />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "text-xl font-serif tracking-widest uppercase transition-all",
              location.pathname === link.href ? "text-brand-gold scale-110" : "text-brand-cream hover:text-brand-gold"
            )}
          >
            {link.name}
          </Link>
        ))}
        <div className="mt-4 flex flex-col gap-4 w-full px-10">
          <Button 
            className="w-full bg-brand-gold text-brand-black font-bold py-7 text-lg rounded-full shadow-xl"
            onClick={() => {
              setIsOpen(false);
              window.location.href = 'tel:7015001978';
            }}
          >
            <Phone className="w-5 h-5 mr-2" />
            Consult Now
          </Button>
          <Link to="/cart" className="w-full" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full border-brand-gold text-brand-gold py-7 text-lg rounded-full">
              View Cart ({cartCount})
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;