"use client";

import React from 'react';
import { Phone, Clock, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-cream relative">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Get In Touch</h2>
          <h3 className="text-brand-forest font-serif text-4xl md:text-5xl mb-6">Start Your Healing Journey</h3>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-gold/10">
              <h4 className="text-brand-forest font-serif text-2xl font-bold mb-8">Contact Information</h4>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-brand-gold w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-brand-black/50 text-sm uppercase tracking-widest mb-1">Consultation Hours</p>
                    <p className="text-brand-forest font-bold text-lg">Everyday: 9:00 AM – 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-brand-gold w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-brand-black/50 text-sm uppercase tracking-widest mb-1">Call Us Directly</p>
                    <div className="flex flex-col gap-2">
                      <a href="tel:7015001978" className="text-brand-forest font-bold text-2xl hover:text-brand-gold transition-colors">70150-01978</a>
                      <a href="tel:7404587273" className="text-brand-forest font-bold text-2xl hover:text-brand-gold transition-colors">74045-87273</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-gold w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-brand-black/50 text-sm uppercase tracking-widest mb-1">Our Location</p>
                    <p className="text-brand-forest font-bold text-lg">Om Ayurveda Wellness Center, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-8 rounded-2xl text-lg"
                onClick={() => window.open('https://wa.me/917015001978', '_blank')}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp Us
              </Button>
              <Button 
                className="flex-1 bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold py-8 rounded-2xl text-lg"
                onClick={() => window.location.href = 'tel:7015001978'}
              >
                <Phone className="w-6 h-6 mr-2" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-brand-forest p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <h4 className="text-brand-cream font-serif text-2xl font-bold mb-8 relative z-10">Send a Message</h4>
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-brand-cream/70 text-sm font-medium">Full Name</label>
                  <Input className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-brand-cream/70 text-sm font-medium">Phone Number</label>
                  <Input className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold" placeholder="Your Phone" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-brand-cream/70 text-sm font-medium">Health Concern</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-brand-cream/20 text-brand-cream">
                    <SelectValue placeholder="Select Concern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="athletes">Athletes Performance</SelectItem>
                    <SelectItem value="joints">Joint Pain</SelectItem>
                    <SelectItem value="sexual">Sexual Wellness</SelectItem>
                    <SelectItem value="chronic">Chronic Illness</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-brand-cream/70 text-sm font-medium">Message</label>
                <Textarea className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold min-h-[120px]" placeholder="How can we help you?" />
              </div>

              <Button className="w-full bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold py-6 text-lg shadow-lg">
                <Send className="w-5 h-5 mr-2" />
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;