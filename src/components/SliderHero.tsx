"use client";

import React, { useEffect, useState, useMemo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FESTIVAL_CONFIG } from "@/themes/festival-config";

/* ──────────────────────────────────────────────
   Festival slide data — add new festivals here
   ────────────────────────────────────────────── */
const FESTIVAL_SLIDES: Record<string, {
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  badge?: string;
  gradient?: string;
  image?: string;
  emoji?: string;
}> = {
  'independence-day': {
    title: "Happy Independence Day!",
    subtitle: "Celebrate freedom with the power of Ayurveda. Special Independence Day offers on all products!",
    buttonText: "Shop Freedom Sale",
    link: "/products",
    badge: "★ 15 August Special ★",
    image: "/festive  theam/Flag.png",
  },
  'raksha-bandhan': {
    title: "Happy Raksha Bandhan 🌸",
    subtitle: "Gift your sibling the power of Ayurveda. Use code RAKHI20 for 20% OFF",
    buttonText: "Gift Wellness",
    link: "/products",
    badge: "🌸 Raksha Bandhan Special",
    gradient: "from-[#e84393] via-[#2d1b3d]/80 to-[#d4a017]",
    emoji: "🌸",
  },
};

/* ──────────────────────────────────────────────
   Normal slides (unchanged)
   ────────────────────────────────────────────── */
type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
  buttonText: string;
  link: string;
  isSale?: boolean;
  isFestival?: boolean;
  gradient?: string;
  badge?: string;
  emoji?: string;
};

const baseSlides: Slide[] = [
  {
    id: 1,
    title: "Expert Manual Therapy",
    subtitle: "Professional physiotherapy and posture correction for lasting relief.",
    image: "/images/services/Manual therapy.webp",
    buttonText: "Book Appointment",
    link: "/services"
  },
  {
    id: 2,
    title: "Authentic Shirodhara",
    subtitle: "Experience deep relaxation with our traditional Panchakarma treatments.",
    image: "/images/services/Shirodhara.webp",
    buttonText: "Explore Therapies",
    link: "/services"
  },
  {
    id: 3,
    title: "Premium Swarnaprash",
    subtitle: "Ancient Ayurvedic formula for immunity and cognitive growth in children.",
    image: "/images/products/swranprash front.webp",
    buttonText: "Shop Now",
    link: "/products"
  },
  {
    id: 4,
    title: "Website Launch Sale!",
    subtitle: "Enjoy a flat 10% OFF on all premium churna and supplements.",
    image: "/images/products/detox-churna-front.webp",
    buttonText: "Claim Offer",
    link: "/products",
    isSale: true
  }
];

const SliderHero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Build slides: prepend festival slide when active
  const slides = useMemo<Slide[]>(() => {
    const festival = FESTIVAL_CONFIG.activeFestival;
    if (festival === 'none' || !FESTIVAL_SLIDES[festival]) return baseSlides;

    const f = FESTIVAL_SLIDES[festival];
    const festivalSlide: Slide = {
      id: 0,
      title: f.title,
      subtitle: f.subtitle,
      buttonText: f.buttonText,
      link: f.link,
      isFestival: true,
      gradient: f.gradient,
      image: f.image,
      badge: f.badge,
      emoji: f.emoji,
    };
    return [festivalSlide, ...baseSlides];
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="relative w-full bg-brand-cream pb-0">
      <div className="w-full max-w-[1400px] mx-auto px-1 xs:px-2 md:px-6 lg:px-8">
        <Carousel setApi={setApi} className="w-full rounded-xl md:rounded-[2rem] overflow-hidden shadow-2xl" opts={{ loop: true }}>
          <CarouselContent className="-ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0 relative h-[200px] xs:h-[230px] md:h-[400px] w-full">

                {/* ── Festival slide (tricolor / gradient background or image) ── */}
                {slide.isFestival ? (
                  <div className="absolute inset-0">
                    {slide.image ? (
                      <>
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-full object-cover object-right-bottom xs:object-right"
                          loading="eager"
                          fetchPriority="high"
                        />
                        {/* Dark overlay: stronger on mobile to ensure white text readability against light flag parts */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 md:to-transparent" />
                      </>
                    ) : (
                      /* Vector fallbacks (e.g. Rakhi vector layout) */
                      <>
                        {/* Tricolor horizontal bands */}
                        <div className="absolute inset-0" style={{
                          background: 'linear-gradient(180deg, #FF9933 0%, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%, #138808 100%)'
                        }} />
                        {/* Dark overlay — only left half for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                        {/* Rakhi-style ornamental design */}
                        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 pointer-events-none z-10">
                          <svg viewBox="0 0 200 200" className="w-20 h-20 md:w-36 md:h-36">
                            {/* Outer decorative petals */}
                            {[...Array(12)].map((_, i) => (
                              <ellipse key={`p${i}`} cx="100" cy="30" rx="12" ry="28"
                                fill="#d4a017" fillOpacity="0.7" stroke="#b8860b" strokeWidth="1"
                                transform={`rotate(${i * 30} 100 100)`} />
                            ))}
                            {/* Inner petals */}
                            {[...Array(12)].map((_, i) => (
                              <ellipse key={`ip${i}`} cx="100" cy="48" rx="8" ry="18"
                                fill="#e84393" fillOpacity="0.6" stroke="#c0392b" strokeWidth="0.5"
                                transform={`rotate(${i * 30 + 15} 100 100)`} />
                            ))}
                            {/* Middle ring */}
                            <circle cx="100" cy="100" r="35" fill="none" stroke="#d4a017" strokeWidth="3" />
                            {/* Beads on middle ring */}
                            {[...Array(12)].map((_, i) => {
                              const angle = (i * 30 - 90) * (Math.PI / 180);
                              const cx = 100 + 35 * Math.cos(angle);
                              const cy = 100 + 35 * Math.sin(angle);
                              return <circle key={`b${i}`} cx={cx} cy={cy} r="4" fill="#d4a017" stroke="#b8860b" strokeWidth="0.5" />;
                            })}
                            {/* Center gem */}
                            <circle cx="100" cy="100" r="18" fill="#c0392b" />
                            <circle cx="100" cy="100" r="12" fill="#e74c3c" />
                            <circle cx="100" cy="100" r="6" fill="#f5b041" />
                            <circle cx="100" cy="100" r="2.5" fill="#fff" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* ── Normal slide (image background) ── */
                  <div className="absolute inset-0">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover"
                      loading={slide.id === 1 ? "eager" : "lazy"}
                      {...(slide.id === 1 ? { fetchPriority: "high" as const } : {})}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  </div>
                )}
                
                <div className="relative h-full px-4 xs:px-6 md:px-16 flex flex-col justify-center items-start text-white">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {(slide.isSale || slide.badge) && (
                      <span className={`inline-block px-2 py-0.5 mb-1 xs:mb-2 font-bold text-[9px] xs:text-xs rounded-full uppercase tracking-wider ${
                        slide.isFestival 
                          ? 'bg-white/20 text-white backdrop-blur-sm border border-white/30 animate-pulse' 
                          : 'bg-brand-gold text-brand-black animate-pulse'
                      }`}>
                        {slide.badge || 'Special Offer'}
                      </span>
                    )}
                    <h2 className="text-lg xs:text-xl md:text-5xl font-serif mb-1 xs:mb-2 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-[10px] xs:text-xs md:text-lg mb-2 xs:mb-4 max-w-[210px] xs:max-w-xs md:max-w-lg text-white/90 leading-tight">
                      {slide.subtitle}
                    </p>
                    <Button 
                      size="sm" 
                      className={`rounded-full px-4 xs:px-6 md:px-8 text-xs md:text-base font-semibold transition-all hover:scale-105 border-none ${
                        slide.isFestival
                          ? 'bg-white text-brand-forest hover:bg-white/90'
                          : 'bg-brand-forest/90 md:bg-brand-gold hover:bg-brand-forest md:hover:bg-brand-gold/90 text-white md:text-brand-black'
                      }`}
                      onClick={() => window.location.href = slide.link}
                      aria-label={`${slide.buttonText} for ${slide.title}`}
                    >
                      {slide.buttonText}
                    </Button>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious 
              className="left-6 bg-white/20 border-white/40 text-white hover:bg-brand-gold hover:text-brand-black" 
              aria-label="Previous slide"
            />
            <CarouselNext 
              className="right-6 bg-white/20 border-white/40 text-white hover:bg-brand-gold hover:text-brand-black" 
              aria-label="Next slide"
            />
          </div>
        </Carousel>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center items-center space-x-2 py-2 bg-brand-cream">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 xs:h-2.5 rounded-full transition-all duration-300 ${
              current === index 
                ? "bg-brand-forest w-6 xs:w-8" 
                : "bg-brand-forest/20 hover:bg-brand-forest/40 w-2 xs:w-2.5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default SliderHero;