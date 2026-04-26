"use client";

import React, { useState } from 'react';
import { Phone, Clock, MapPin, Send, MessageCircle, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    concern: '',
    message: '',
    height: '',
    weight: '',
    allergy: '',
    underTreatment: 'No',
    sufferFrom: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "917015001978";
    const text = `*New Consultation Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Concern:* ${formData.concern}%0A*Message:* ${formData.message}%0A*Height:* ${formData.height}%0A*Weight:* ${formData.weight}%0A*Allergy:* ${formData.allergy}%0A*Under Treatment:* ${formData.underTreatment}%0A*Condition:* ${formData.sufferFrom}`;
    
    showSuccess("Redirecting to WhatsApp...");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-cream relative">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-brand-gold font-serif text-base md:text-lg uppercase tracking-[0.3em] mb-3 md:mb-4">Get In Touch</h2>
          <h3 className="text-brand-forest font-serif text-3xl md:text-5xl mb-4 md:mb-6 leading-tight">Start Your Healing Journey</h3>
          <div className="w-20 md:w-24 h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Info Side */}
          <div className="space-y-6 md:space-y-10">
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-brand-gold/10">
              <h4 className="text-brand-forest font-serif text-xl md:text-2xl font-bold mb-6 md:mb-8">Contact Information</h4>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-brand-gold w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-brand-black/50 text-[10px] md:text-sm uppercase tracking-widest mb-1">Consultation Hours</p>
                    <p className="text-brand-forest font-bold text-base md:text-lg leading-tight md:leading-normal">Everyday: 9:00 AM – 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-brand-gold w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-brand-black/50 text-[10px] md:text-sm uppercase tracking-widest mb-1">Call Us Directly</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-3">
                      {["70150-01978", "74045-87273", "81688-87276", "74040-40527"].map(phone => (
                        <a key={phone} href={`tel:${phone.replace('-', '')}`} className="text-brand-forest font-bold text-xl md:text-2xl hover:text-brand-gold transition-colors leading-tight">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-gold w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-brand-black/50 text-[10px] md:text-sm uppercase tracking-widest mb-1">Our Location</p>
                    <a 
                      href="https://maps.app.goo.gl/vvRvzaicPrgiPKjJ7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-forest font-bold text-base md:text-lg hover:text-brand-gold transition-colors block leading-tight md:leading-normal"
                    >
                      Om Ayurveda Wellness Center, India
                      <span className="block text-xs md:text-sm font-medium text-brand-gold mt-1 underline">Get Directions →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-brand-gold/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full -mr-12 -mt-12 blur-xl transition-all group-hover:bg-brand-gold/10" />
              <h4 className="text-brand-forest font-serif text-xl md:text-2xl font-bold mb-4 md:mb-6">Follow Our Journey</h4>
              <p className="text-brand-black/50 mb-6 md:mb-8 text-xs md:text-sm leading-relaxed">
                Join our community of wellness seekers and get daily Ayurvedic tips, health updates, and exclusive clinical insights.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {[
                  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: 'hover:text-[#E4405F] hover:bg-[#E4405F]/5' },
                  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr', color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/5' },
                  { name: 'Youtube', icon: Youtube, href: 'https://youtube.com/@omayurveda786?si=gat_k6lBuZht7mqe', color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/5' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-gold/10 transition-all duration-300 group/item hover:border-brand-gold/30 hover:shadow-md",
                      social.color
                    )}
                  >
                    <social.icon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover/item:scale-110" />
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-black/40 group-hover/item:text-inherit transition-colors">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button 
                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6 md:py-8 rounded-xl md:rounded-2xl text-base md:text-lg h-auto"
                onClick={() => window.open('https://wa.me/917015001978', '_blank')}
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                WhatsApp Us
              </Button>
              <Button 
                className="flex-1 bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold py-6 md:py-8 rounded-xl md:rounded-2xl text-base md:text-lg h-auto"
                onClick={() => window.location.href = 'tel:7015001978'}
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-brand-forest p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <h4 className="text-brand-cream font-serif text-xl md:text-2xl font-bold mb-6 md:mb-8 relative z-10">Send a Message</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Full Name</label>
                  <Input 
                    required
                    className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold h-11 md:h-12" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Phone Number</label>
                  <Input 
                    required
                    className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold h-11 md:h-12" 
                    placeholder="Your Phone" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Health Concern</label>
                <Select onValueChange={(val) => setFormData({...formData, concern: val})}>
                  <SelectTrigger className="bg-white/10 border-brand-cream/20 text-brand-cream h-11 md:h-12">
                    <SelectValue placeholder="Select Concern" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Height (cm) <span className="text-[10px] text-brand-cream/50">optional</span></label>
                  <Input 
                    className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold h-11 md:h-12" 
                    placeholder="e.g. 170" 
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Weight (kg) <span className="text-[10px] text-brand-cream/50">optional</span></label>
                  <Input 
                    className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold h-11 md:h-12" 
                    placeholder="e.g. 65" 
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Allergy details <span className="text-[10px] text-brand-cream/50">optional</span></label>
                <Textarea 
                  className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold min-h-[70px]" 
                  placeholder="Any known allergies" 
                  value={formData.allergy}
                  onChange={(e) => setFormData({...formData, allergy: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Under Treatment?</label>
                  <Select value={formData.underTreatment} onValueChange={(val) => setFormData({...formData, underTreatment: val})}>
                    <SelectTrigger className="bg-white/10 border-brand-cream/20 text-brand-cream h-11 md:h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Suffering from (problem)</label>
                  <Input 
                    className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold h-11 md:h-12" 
                    placeholder="e.g. back pain, migraine" 
                    value={formData.sufferFrom}
                    onChange={(e) => setFormData({...formData, sufferFrom: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-brand-cream/70 text-xs md:text-sm font-medium">Message</label>
                <Textarea 
                  required
                  className="bg-white/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-gold min-h-[100px] md:min-h-[120px]" 
                  placeholder="Describe your issue in detail" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold py-6 md:py-7 rounded-xl md:rounded-2xl text-base md:text-lg shadow-lg h-auto active:scale-95 transition-transform">
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