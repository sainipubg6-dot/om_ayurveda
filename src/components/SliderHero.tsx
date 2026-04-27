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

  const onSelect = useCallback((api: CarouselApi) => {
    // We could add logic here if needed
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => onSelect(api));

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api, onSelect]);

  return (
    <section className="relative w-full overflow-hidden bg-brand-cream border-b border-brand-gold/20">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 relative h-[400px] md:h-[550px] w-full">
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </div>
              
              <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start text-white">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {slide.isSale && (
                    <span className="inline-block px-4 py-1 mb-4 bg-brand-gold text-brand-black font-bold text-sm rounded-full uppercase tracking-wider animate-pulse">
                      Special Offer
                    </span>
                  )}
                  <h2 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 max-w-xl text-white/90">
                    {slide.subtitle}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black border-none rounded-none px-8 font-semibold transition-all hover:scale-105"
                    onClick={() => window.location.href = slide.link}
                  >
                    {slide.buttonText}
                  </Button>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-8 bg-white/20 border-white/40 text-white hover:bg-brand-gold hover:text-brand-black" />
          <CarouselNext className="right-8 bg-white/20 border-white/40 text-white hover:bg-brand-gold hover:text-brand-black" />
        </div>
      </Carousel>
    </section>
  );
};

export default SliderHero;
