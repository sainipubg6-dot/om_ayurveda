"use client";

import React, { useState } from 'react';
import { Phone, Clock, MapPin, Send, MessageCircle, Globe, ExternalLink, Activity, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const branches = [
  {
    city: "Safidon (Main)",
    name: "OM AYURVEDA",
    phones: ["7015001978", "8168887276"],
    address: "Rampura, Road Safidon (Haryana), Near Haryana School",
    map: "https://maps.app.goo.gl/vvRvzaicPrgiPKjJ7"
  },
  {
    city: "Fatehabad",
    name: "OM AYURVEDA, FATEHABAD",
    phones: ["9588773580", "9034937443"],
    address: "Near Bhuna Mod, opposite side Red-Tape showroom, Fatehabad (Haryana)",
    map: "https://maps.app.goo.gl/vGd8Wu4GAWH7oykD6"
  },
  {
    city: "Hisar",
    name: "OM AYURVEDA, HISAR",
    phones: ["9812272877", "9306540541"],
    address: "Matka Chowk Near I.A office, Hisar",
    map: "https://maps.app.goo.gl/tG4rFBz6cWXuYA7v5"
  },
  {
    city: "Kaithal",
    name: "OM AYURVEDA, KAITHAL",
    phones: ["7357269799", "9896973443"],
    address: "Karnal, Bypass Road, Near Hanuman Vatika, Kaithal (Haryana)",
    map: "https://maps.app.goo.gl/pbC2hqRceNDNWKAc7"
  },
  {
    city: "Gohana",
    name: "OM AYURVEDA, GOHANA",
    type: "Online Branch",
    phones: ["8814011950"]
  },
  {
    city: "USA",
    name: "OM AYURVEDA, USA",
    phones: ["+1 (209) 868-0170"],
    address: "Global Ayurvedic Consultation Center, USA",
    map: "https://maps.app.goo.gl/YcFLaoYKsmn6gSNg7"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    concern: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "917015001978";
    const text = `*New Global Consultation Request*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Phone:* ${formData.phone}%0A` +
                 `*Health Concern:* ${formData.concern}%0A` +
                 `*Message:* ${formData.message}`;
    
    showSuccess("Redirecting to WhatsApp...");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-8 md:py-32 bg-brand-cream overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-20">
          <h2 className="text-brand-gold font-serif text-[10px] md:text-sm uppercase tracking-[0.4em] mb-2 font-bold">Presence</h2>
          <h3 className="text-brand-forest font-serif text-2xl md:text-6xl mb-3 leading-tight font-bold">Contact Us</h3>
          <div className="w-12 md:w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start max-w-7xl mx-auto">
          
          {/* LEFT SIDE: BRANCHES SECTION (COMPACT MOBILE) */}
          <div className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-brand-gold/10 w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-forest rounded-lg flex items-center justify-center shadow-lg">
                <Globe className="text-brand-gold w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-brand-forest font-serif text-xl md:text-3xl font-bold leading-tight">Our Branches</h4>
                <p className="text-brand-black/40 text-[9px] uppercase tracking-widest font-bold">Global Network</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {branches.map((branch, idx) => (
                <div 
                  key={idx} 
                  className="bg-brand-cream/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-gold/5 hover:border-brand-gold/20 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-brand-forest font-serif text-[13px] md:text-sm font-bold leading-tight truncate mr-1">
                      {branch.city}
                    </h5>
                    {branch.map && (
                      <a href={branch.map} target="_blank" rel="noopener noreferrer" className="text-brand-goldDark hover:text-brand-gold flex-shrink-0">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {branch.address && (
                      <a 
                        href={branch.map} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-brand-black/60 text-[9px] md:text-[10px] hover:text-brand-gold transition-colors block mb-2 leading-snug line-clamp-1 underline decoration-brand-gold/10"
                      >
                        {branch.address}
                      </a>
                    )}
                  </div>

                  <div className="space-y-1 pt-1.5 border-t border-brand-gold/5">
                    {branch.phones.map(phone => (
                      <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="text-brand-forest font-bold text-[10px] md:text-xs hover:text-brand-gold transition-colors flex items-center gap-1.5">
                        <Phone className="w-2.5 h-2.5 text-brand-gold" /> {phone}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-brand-gold/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="text-brand-gold w-3 h-3 md:w-4 md:h-4" />
                  <a href="mailto:omayurveda786@gmail.com" className="text-brand-forest font-bold text-[10px] md:text-xs hover:text-brand-gold transition-colors">omayurveda786@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="text-brand-gold w-3 h-3 md:w-4 md:h-4" />
                  <a href="https://wa.me/917015001978" className="text-brand-forest font-bold text-[10px] md:text-xs hover:text-brand-gold transition-colors">Support: +91 70150 01978</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-brand-gold w-3 h-3 md:w-4 md:h-4" />
                <p className="text-brand-forest font-bold text-[10px] md:text-xs">9 AM – 5 PM <span className="text-[9px] text-brand-black/40 font-normal">IST</span></p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DIGITAL CONSULTATION FORM (COMPACT MOBILE) */}
          <div className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-brand-gold/10 w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-forest rounded-lg flex items-center justify-center shadow-lg">
                <Activity className="text-brand-gold w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-brand-forest font-serif text-xl md:text-3xl font-bold leading-tight">Consultation</h4>
                <p className="text-brand-black/40 text-[9px] uppercase tracking-widest font-bold">Diagnosis Form</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-brand-forest/60 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Full Name</label>
                  <Input 
                    required
                    className="bg-brand-cream/10 border-brand-gold/10 text-brand-black h-11 md:h-12 rounded-lg text-sm" 
                    placeholder="Enter Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-brand-forest/60 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Phone Number</label>
                  <Input 
                    required
                    className="bg-brand-cream/10 border-brand-gold/10 text-brand-black h-11 md:h-12 rounded-lg text-sm" 
                    placeholder="Enter Phone" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-brand-forest/60 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Health Category</label>
                <Select onValueChange={(val) => setFormData({...formData, concern: val})}>
                  <SelectTrigger className="bg-brand-cream/10 border-brand-gold/10 text-brand-black h-11 md:h-12 rounded-lg text-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Athletes Performance">Athletes Performance</SelectItem>
                    <SelectItem value="Joint Pain">Joint Pain</SelectItem>
                    <SelectItem value="Sexual Wellness">Sexual Wellness</SelectItem>
                    <SelectItem value="Chronic Illness">Chronic Illness</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-brand-forest/60 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Symptoms</label>
                <Textarea 
                  required
                  className="bg-brand-cream/10 border-brand-gold/10 text-brand-black placeholder:text-brand-black/30 min-h-[100px] md:min-h-[160px] rounded-xl text-sm resize-none" 
                  placeholder="Describe your issue..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full bg-brand-forest text-brand-gold hover:bg-brand-forest/90 font-bold py-6 md:py-7 rounded-xl text-lg shadow-xl active:scale-95 transition-all group">
                <Send className="w-5 h-5 mr-3" />
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;