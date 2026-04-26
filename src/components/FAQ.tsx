"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Swarna Bhasma safe for long-term use?",
    hindi: "क्या स्वर्ण भस्म लंबे समय तक उपयोग के लिए सुरक्षित है?",
    answer: "Yes, when prepared according to authentic Shastras and taken under expert supervision, Swarna Bhasma is highly safe and effective for rejuvenation and immunity."
  },
  {
    question: "How soon can I see results for joint pain?",
    hindi: "जोड़ों के दर्द में मुझे कितनी जल्दी परिणाम दिख सकते हैं?",
    answer: "Most patients experience significant relief within 15-30 days. However, chronic conditions may require a 3-month protocol for complete restoration."
  },
  {
    question: "Are your products 100% natural?",
    hindi: "क्या आपके उत्पाद 100% प्राकृतिक हैं?",
    answer: "Absolutely. We use only pure herbs, minerals, and metals processed through traditional Ayurvedic methods without any synthetic chemicals or steroids."
  },
  {
    question: "Do you provide online consultations?",
    hindi: "क्या आप ऑनलाइन परामर्श प्रदान करते हैं?",
    answer: "Yes, we offer video and phone consultations for patients across India. You can book your slot via WhatsApp or by calling our helpline."
  },
  {
    question: "Is Ayurveda effective for athletic performance?",
    hindi: "क्या आयुर्वेद एथलेटिक प्रदर्शन के लिए प्रभावी है?",
    answer: "Ayurveda focuses on 'Ojas' (vitality). Our specialized formulations for athletes enhance natural stamina, muscle recovery, and mental focus without banned substances."
  }
];

const FAQ = () => {
  return (
    <section className="py-12 md:py-24 bg-white relative">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-brand-gold font-serif text-xs md:text-lg uppercase tracking-[0.3em] mb-2 md:mb-4">Common Queries</h2>
          <h3 className="text-brand-forest font-serif text-2xl md:text-5xl mb-3 md:mb-6 leading-tight">Frequently Asked Questions</h3>
          <div className="w-16 h-0.5 md:w-24 md:h-1 bg-brand-gold mx-auto rounded-full" />
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2 md:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-brand-gold/20 rounded-xl md:rounded-2xl px-4 md:px-6 bg-brand-cream/20 overflow-hidden"
            >
              <AccordionTrigger className="hover:no-underline py-3 md:py-6">
                <div className="text-left">
                  <p className="text-brand-gold font-hindi text-sm md:text-lg mb-0.5">{faq.hindi}</p>
                  <p className="text-brand-forest font-serif text-sm md:text-xl font-bold leading-tight">{faq.question}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-brand-black/70 text-sm md:text-lg pb-3 md:pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;