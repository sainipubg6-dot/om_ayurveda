"use client";

import Link from 'next/link';
import React from 'react';
import { useWCProducts } from '@/lib/woocommerce';

const categoriesConfig = [
  { name: 'All Products', bgColor: 'bg-pink-100', link: '/products' },
  { name: 'Brain & Immunity', bgColor: 'bg-orange-100', link: '/products' },
  { name: 'Digestion Care', bgColor: 'bg-green-100', link: '/products' },
  { name: 'Hair Care', bgColor: 'bg-amber-100', link: '/products' },
  { name: 'Joint Care', bgColor: 'bg-blue-100', link: '/products' },
  { name: 'Liver Support', bgColor: 'bg-rose-100', link: '/products' },
  { name: 'Pain Relief', bgColor: 'bg-purple-100', link: '/products' },
  { name: 'Strength & Vitality', bgColor: 'bg-yellow-100', link: '/products' },
  { name: 'Respiratory', bgColor: 'bg-teal-100', link: '/products' },
];

const CategoryScroll = () => {
  const { products } = useWCProducts();

  const getCategoryImage = (categoryName: string) => {
    if (!products || products.length === 0) return '/placeholder.svg';
    
    let match = null;
    const name = categoryName.toLowerCase();
    
    if (name.includes('all')) {
      match = products[0];
    } else if (name.includes('brain') || name.includes('immunity')) {
      match = products.find(p => p.name.toLowerCase().includes('swar') || p.name.toLowerCase().includes('sukra') || p.name.toLowerCase().includes('amrit'));
    } else if (name.includes('digestion')) {
      match = products.find(p => p.name.toLowerCase().includes('detox') || p.name.toLowerCase().includes('churna') || p.name.toLowerCase().includes('arsh') || p.name.toLowerCase().includes('cure'));
    } else if (name.includes('hair')) {
      match = products.find(p => p.name.toLowerCase().includes('hair') || p.name.toLowerCase().includes('oil'));
    } else if (name.includes('joint')) {
      match = products.find(p => p.name.toLowerCase().includes('joint') || p.name.toLowerCase().includes('pro') || p.name.toLowerCase().includes('ortho'));
    } else if (name.includes('liver')) {
      match = products.find(p => p.name.toLowerCase().includes('liver'));
    } else if (name.includes('pain')) {
      match = products.find(p => p.name.toLowerCase().includes('ortho') || p.name.toLowerCase().includes('injury') || p.name.toLowerCase().includes('pain'));
    } else if (name.includes('strength') || name.includes('vitality')) {
      match = products.find(p => p.name.toLowerCase().includes('gokshura') || p.name.toLowerCase().includes('power') || p.name.toLowerCase().includes('stay') || p.name.toLowerCase().includes('long'));
    } else if (name.includes('respiratory') || name.includes('cough')) {
      match = products.find(p => p.name.toLowerCase().includes('cough') || p.name.toLowerCase().includes('har'));
    }
    
    return match?.images?.[0]?.src || products[0]?.images?.[0]?.src || '/placeholder.svg';
  };

  return (
    <section className="w-full pt-20 md:pt-28 pb-0 bg-transparent">
      <div className="w-full">
        <div className="flex overflow-x-auto md:justify-center scrollbar-hide snap-x snap-mandatory gap-2 sm:gap-6 md:gap-10 pb-2 pt-2 px-3 md:px-8">
          {categoriesConfig.map((cat, idx) => {
            const dynamicImage = getCategoryImage(cat.name);
            return (
              <Link href={cat.link}
                key={idx}
                className="flex flex-col items-center gap-1 sm:gap-4 w-[64px] xs:w-[72px] sm:w-[120px] shrink-0 snap-start group cursor-pointer"
              >
                <div className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full ${cat.bgColor} flex items-center justify-center p-2 sm:p-4 relative group-hover:shadow-lg transition-shadow duration-300`}>
                  <img 
                    src={dynamicImage} 
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryScroll;