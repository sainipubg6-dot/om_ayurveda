"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 border-b transition-all duration-300",
          isScrolled 
            ? "bg-brand-forest/80 backdrop-blur-md border-white/10 shadow-xl py-2" 
            : "bg-brand-forest border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group cursor-pointer" aria-label="Om Ayurveda Home">
            <img 
              src="/Logo.png" 
              alt="Om Ayurveda Logo" 
              className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.name}
                  href={link.href}
                  className={cn(
                    "transition-all font-bold text-xs uppercase tracking-[0.2em]",
                    pathname === link.href ? "text-white underline underline-offset-8 decoration-2" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <Link href="/cart" className="relative p-2 text-white hover:text-brand-gold transition-colors" aria-label={`View Cart with ${cartCount} items`}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-brand-forest">
                  {cartCount}
                </span>
              </Link>
              <Button 
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-lg px-6 flex items-center gap-2"
                onClick={() => window.location.href = 'tel:7015001978'}
              >
                <Phone className="w-3.5 h-3.5" />
                Consult
              </Button>
            </div>
          </div>

          {/* Mobile Toggle & Cart */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/cart" className="relative p-2 text-white transition-colors mr-2" aria-label={`View Cart with ${cartCount} items`}>
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-brand-forest">
                {cartCount}
              </span>
            </Link>
            <button 
              className="text-white p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-brand-forest z-[60] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
        isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        {/* Close Button */}
        <button 
          className="absolute top-6 right-6 text-white p-2 z-10"
          onClick={() => setIsOpen(false)}
          aria-label="Close mobile menu"
        >
          <X size={32} />
        </button>

        <div className="flex flex-col items-center gap-8 relative z-10">
          {navLinks.map((link, i) => (
            <Link key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-2xl font-serif tracking-[0.3em] uppercase transition-all duration-300",
                pathname === link.href ? "text-brand-gold scale-110" : "text-white hover:text-brand-gold"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 w-full px-12 max-w-sm relative z-10">
          <Button 
            className="w-full bg-brand-gold text-brand-black font-bold py-8 text-xl rounded-2xl shadow-2xl transition-transform active:scale-95"
            onClick={() => {
              setIsOpen(false);
              window.location.href = 'tel:7015001978';
            }}
          >
            <Phone className="w-5 h-5 mr-3" />
            Call for Advice
          </Button>
          <Link href="/cart" className="w-full" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full border-white/20 text-white py-8 text-xl rounded-2xl bg-white/5">
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