"use client";

import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already seen/closed the popup in this session
    const hasSeenPopup = localStorage.getItem('om_ayurveda_newsletter_seen');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50000); // 50 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('om_ayurveda_newsletter_seen', 'true');
  };

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
        showSuccess("Namaste! You have successfully joined our wellness circle.");
        handleClose();
      } else {
        showError("Something went wrong. Please try again.");
      }
    } catch (err) {
      showError("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-black/60 backdrop-blur-sm transition-opacity duration-500">
      <div className={cn(
        "relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-brand-gold/20 overflow-hidden transform transition-all duration-700",
        isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10"
      )}>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-forest/5 rounded-full -ml-16 -mb-16 blur-2xl" />

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-brand-black/40 hover:text-brand-black transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10 text-center">
          <div className="w-16 h-16 bg-brand-forest rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Mail className="text-brand-gold w-8 h-8" />
          </div>

          <h3 className="text-brand-forest font-serif text-2xl md:text-3xl font-bold mb-2">Join the Wellness Circle</h3>
          <p className="text-brand-black/60 text-sm md:text-base mb-8 leading-relaxed">
            Get personalized Ayurvedic health tips, traditional recipes, and exclusive clinical insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input 
                type="email"
                placeholder="Your email address"
                required
                disabled={isSubmitting}
                className="bg-brand-cream/20 border-brand-gold/10 h-14 rounded-xl px-4 text-brand-black focus:ring-brand-gold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-forest text-brand-gold hover:bg-brand-forest/90 font-bold py-7 rounded-xl text-lg shadow-xl group transition-all disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                  Subscribe Now
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-brand-gold/60 text-[10px] md:text-xs font-medium uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>Healing Wisdom Since 1958</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;