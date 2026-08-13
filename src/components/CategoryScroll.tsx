"use client";

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';


const categories = [
  { name: 'All Products', image: '/images/products/omega-3-front.png', bgColor: 'bg-pink-100', link: '/products' },
  { name: 'Brain & Immunity', image: '/images/products/swranprash front.png', bgColor: 'bg-orange-100', link: '/products' },
  { name: 'Digestion Care', image: '/images/products/detox-churna-front.png', bgColor: 'bg-green-100', link: '/products' },
  { name: 'Hair Care', image: '/images/products/hair-oil-front.png', bgColor: 'bg-amber-100', link: '/products' },
  { name: 'Joint Care', image: '/images/products/joint-pro-front.png', bgColor: 'bg-blue-100', link: '/products' },
  { name: 'Liver Support', image: '/images/products/liver -front.png', bgColor: 'bg-rose-100', link: '/products' },
  { name: 'Pain Relief', image: '/images/products/ortho-front.png', bgColor: 'bg-purple-100', link: '/products' },
  { name: 'Strength & Vitality', image: '/images/products/gokshura-front.png', bgColor: 'bg-yellow-100', link: '/products' },
  { name: 'Respiratory', image: '/images/products/cough-har-front.png', bgColor: 'bg-teal-100', link: '/products' },
];

const CategoryScroll = () => {
  return (
    <section className="w-full pt-20 md:pt-28 pb-0 bg-transparent">
      <div className="w-full">
        <div className="flex overflow-x-auto md:justify-center scrollbar-hide snap-x snap-mandatory gap-2 sm:gap-6 md:gap-10 pb-2 pt-2 px-3 md:px-8">
          {categories.map((cat, idx) => (
            <Link href={cat.link}
              key={idx}
              className="flex flex-col items-center gap-1 sm:gap-4 w-[64px] xs:w-[72px] sm:w-[120px] shrink-0 snap-start group cursor-pointer"
            >
              <div className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full ${cat.bgColor} flex items-center justify-center p-2 sm:p-4 relative group-hover:shadow-lg transition-shadow duration-300`}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-contain drop-shadow-xl group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-300 relative z-10"
                  loading={idx < 4 ? "eager" : "lazy"}
                  {...(idx < 4 ? { fetchPriority: "high" } : {})}
                />
              </div>
              <span className="text-[9px] xs:text-[10px] sm:text-sm md:text-base font-bold text-brand-forest text-center leading-tight sm:whitespace-nowrap group-hover:text-brand-gold transition-colors px-0 w-full break-words">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryScroll;