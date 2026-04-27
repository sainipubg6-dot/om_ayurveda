"use client";

import React, { useEffect } from 'react';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ExcellenceAndProcess from '@/components/ExcellenceAndProcess';
import FeaturedServices from '@/components/FeaturedServices';
import FeaturedProducts from '@/components/FeaturedProducts';
import Team from '@/components/Team';
import LittleStory from '@/components/LittleStory';
import TrustAndResults from '@/components/TrustAndResults';
import SliderHero from '@/components/SliderHero';
import Newsletter from '@/components/Newsletter';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { FadedContent } from '@/components/react-bits/FadedContent';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // INJECT MULTI-LOCATION LOCAL BUSINESS SCHEMA
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": "Om Ayurveda",
      "image": "https://omayurveda.co.in/Logo.png",
      "url": "https://omayurveda.co.in/",
      "telephone": "+91-70150-01978",
      "description": "Premium Ayurvedic clinic and Swarna Bhasma center with multiple branches across Haryana and USA. Healing since 1958.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rampura Road, Near Haryana School",
        "addressLocality": "Safidon",
        "addressRegion": "Haryana",
        "postalCode": "126112",
        "addressCountry": "IN"
      },
      "subOrganization": [
        {
          "@type": "MedicalClinic",
          "name": "Om Ayurveda Fatehabad",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Near Bhuna Mod, opposite side Red-Tape showroom",
            "addressLocality": "Fatehabad",
            "addressRegion": "Haryana",
            "addressCountry": "IN"
          },
          "telephone": "+91-95887-73580"
        },
        {
          "@type": "MedicalClinic",
          "name": "Om Ayurveda Hisar",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Matka Chowk Near I.A office",
            "addressLocality": "Hisar",
            "addressRegion": "Haryana",
            "addressCountry": "IN"
          },
          "telephone": "+91-98122-72877"
        },
        {
          "@type": "MedicalClinic",
          "name": "Om Ayurveda Kaithal",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Karnal Bypass Road, Near Hanuman Vatika",
            "addressLocality": "Kaithal",
            "addressRegion": "Haryana",
            "addressCountry": "IN"
          },
          "telephone": "+91-73572-69799"
        },
        {
          "@type": "MedicalClinic",
          "name": "Om Ayurveda USA",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Global Consultation Center",
            "addressRegion": "USA",
            "addressCountry": "US"
          },
          "telephone": "+1-209-868-0170"
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 29.4124,
        "longitude": 76.6664
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      },
      "sameAs": [
        "https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr",
        "https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        "https://youtube.com/@omayurveda786?si=gat_k6lBuZht7mqe"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-black">
      <Seo 
        title="Best Ayurveda Clinic in Safidon, Hisar, Fatehabad - Om Ayurveda" 
        description="Om Ayurveda: Healing since 1958. Top Ayurvedic clinic in Safidon, Hisar, Fatehabad, Kaithal. Specialized in Swarna Bhasma and holistic wellness." 
      />
      <Navbar />

      <main className="flex-1">
        {/* New Slider Hero */}
        <SliderHero />

        {/* 1. Hero Banner */}
        <Hero />
        <Marquee />

        {/* 2. Top Selling Products */}
        <FadedContent>
          <FeaturedProducts />
        </FadedContent>

        {/* 3. Featured Services */}
        <FadedContent>
          <FeaturedServices />
        </FadedContent>

        {/* 4. Little Story (NEW BRIDGE SECTION) */}
        <FadedContent>
          <LittleStory />
        </FadedContent>

        {/* 5. Meet Our Vaidyas */}
        <FadedContent>
          <div className="py-4 md:py-8 bg-white">
            <Team />
          </div>
        </FadedContent>

        {/* 6. Excellence & Healing Journey */}
        <FadedContent>
          <ExcellenceAndProcess />
        </FadedContent>

        {/* 7. Trust & Results */}
        <FadedContent>
          <TrustAndResults />
        </FadedContent>

        {/* 8. Newsletter Section */}
        <FadedContent>
          <Newsletter />
        </FadedContent>

        {/* 9. Reviews Section */}
        <FadedContent>
          <Testimonials isInsideSection={false} />
        </FadedContent>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;