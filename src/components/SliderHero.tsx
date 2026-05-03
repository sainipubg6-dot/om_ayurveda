import React, { useEffect, useState, useCallback } from 'react';
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

const slides = [
  {
    id: 1,
    title: "Expert Manual Therapy",
    subtitle: "Professional physiotherapy and posture correction for lasting relief.",
    image: "/images/services/Manual therapy.png",
    buttonText: "Book Appointment",
    link: "/services"
  },
  {
    id: 2,
    title: "Authentic Shirodhara",
    subtitle: "Experience deep relaxation with our traditional Panchakarma treatments.",
    image: "/images/services/Shirodhara.png",
    buttonText: "Explore Therapies",
    link: "/services"
  },
  {
    id: 3,
    title: "Premium Swarnaprash",
    subtitle: "Ancient Ayurvedic formula for immunity and cognitive growth in children.",
    image: "/images/products/swranprash front.png",
    buttonText: "Shop Now",
    link: "/products"
  },
  {
    id: 4,
    title: "Website Launch Sale!",
    subtitle: "Enjoy a flat 10% OFF on all premium churna and supplements.",
    image: "/images/products/detox-churna-front.png",
    buttonText: "Claim Offer",
    link: "/products",
    isSale: true
  }
];

const SliderHero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
                <div className="absolute inset-0">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                    loading={slide.id === 1 ? "eager" : "lazy"}
                    {...(slide.id === 1 ? { fetchpriority: "high" } : {})}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                </div>
                
                <div className="relative h-full px-4 xs:px-6 md:px-16 flex flex-col justify-center items-start text-white">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {slide.isSale && (
                      <span className="inline-block px-2 py-0.5 mb-1 xs:mb-3 bg-brand-gold text-brand-black font-bold text-[10px] xs:text-xs rounded-full uppercase tracking-wider animate-pulse">
                        Special Offer
                      </span>
                    )}
                    <h2 className="text-2xl xs:text-3xl md:text-5xl font-serif mb-1 xs:mb-3 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-xs xs:text-sm md:text-lg mb-3 xs:mb-6 max-w-[200px] xs:max-w-xs md:max-w-lg text-white/90 leading-tight">
                      {slide.subtitle}
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-brand-forest/90 md:bg-brand-gold hover:bg-brand-forest md:hover:bg-brand-gold/90 text-white md:text-brand-black border-none rounded-full px-4 xs:px-6 md:px-8 text-xs md:text-base font-semibold transition-all hover:scale-105"
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
