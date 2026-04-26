import React from 'react';
import { CheckCircle2, Instagram, Facebook } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-brand-cream">
              <img 
                src="/images/inmark.JPEG" 
                alt="Om Ayurveda Legacy"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl opacity-50 md:opacity-100" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-leaf/10 rounded-full blur-3xl opacity-50 md:opacity-100" />
            <div className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-brand-forest p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl hidden sm:block border border-brand-gold/20">
              <p className="text-brand-gold font-serif text-3xl sm:text-4xl font-bold mb-1">1958</p>
              <p className="text-brand-cream text-[8px] sm:text-[10px] uppercase tracking-widest leading-none">Est. Since</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-brand-gold font-serif text-base md:text-lg uppercase tracking-[0.3em] mb-3 md:mb-4">Our Legacy</h2>
            <h3 className="text-brand-forest font-serif text-3xl md:text-5xl mb-6 md:mb-8 leading-tight">Om Ayurveda: Tradition Meets Science</h3>
            
            <p className="text-brand-black/70 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
              Om Ayurvedam was established in 1958, and today it has successfully treated millions of people from the root. People from across the country and abroad come here for treatment and leave satisfied. 
            </p>
            <p className="text-brand-black/90 text-base md:text-lg mb-6 md:mb-8 leading-relaxed font-hindi">
              ओम आयुर्वेदम की शुरुआत सन 1958 में हुई थी, और आज यह लाखों लोगों का जड़ से सफल उपचार कर चुका है। यहाँ देश-विदेश से लोग अपना इलाज करवाने आते हैं और संतुष्ट होकर जाते हैं।
            </p>

            <div className="space-y-3 sm:space-y-4 mb-10">
              {[
                "Registered & Certified Ayurvedic Brand",
                "100% Natural & Pure Ingredients",
                "Personalized Treatment Protocols",
                "Expert Doctors with Decades of Experience",
                "Specialized Care for Athletes & Chronic Pain"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-gold w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="text-brand-forest font-medium text-base sm:text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-6 bg-brand-cream rounded-2xl border-l-4 border-brand-gold mb-8">
              <p className="text-brand-forest font-hindi text-lg sm:text-xl italic mb-4 leading-relaxed">
                "आप भी अपनी समस्या का सही और प्राकृतिक समाधान पाने के लिए आज ही ओम आयुर्वेदम से जुड़ें।"
              </p>
              <p className="text-brand-forest/70 text-xs sm:text-sm font-medium">
                Join Om Ayurvedam today to find the right and natural solution to your health problems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <span className="text-brand-forest/40 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Follow our journey</span>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-forest rounded-full flex items-center justify-center text-brand-gold hover:scale-110 hover:bg-brand-gold hover:text-brand-forest transition-all shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-forest rounded-full flex items-center justify-center text-brand-gold hover:scale-110 hover:bg-brand-gold hover:text-brand-forest transition-all shadow-lg"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;