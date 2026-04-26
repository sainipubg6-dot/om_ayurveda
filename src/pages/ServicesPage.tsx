"use client";

import React, { useState, useEffect } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  Gift, Star, Quote, ChevronRight, X, Clock, PhoneCall, Activity, Sparkles, CheckCircle2
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */
type Service = {
  name: string; hindi: string; price: string; duration: string;
  image: string; description: string; benefits: string[];
  highlight?: boolean; isCombo?: boolean; originalPrice?: string;
  pricingTable?: {
    headers: string[];
    rows: (string | number)[][];
    footerText?: string;
  };
};

const physioServices: Service[] = [
  {
    name: "One Part Physiotherapy", hindi: "एक भाग फिजियोथेरेपी", price: "₹200", duration: "30–45 min",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
    description: "Targeted physiotherapy for a single body part — shoulder, knee, back, elbow, wrist, or hip. Ideal for acute injuries, chronic pain, or post-injury rehabilitation.",
    benefits: ["Reduces localised pain & inflammation", "Restores range of motion", "Strengthens surrounding muscles", "Non-invasive & drug-free"],
  },
  {
    name: "Taping", hindi: "टेपिंग", price: "₹500", duration: "20–30 min",
    image: "https://images.unsplash.com/photo-1620735692151-26a7e0748429?auto=format&fit=crop&q=80&w=800",
    description: "Kinesiology or sports taping applied to injured or strained muscles/joints. Supports soft tissue, reduces swelling, and allows pain-free movement without restricting circulation.",
    benefits: ["Immediate pain relief", "Supports injured joints & muscles", "Reduces swelling & bruising", "Full movement during recovery"],
  },
  {
    name: "Cupping Therapy", hindi: "कपिंग थेरेपी", price: "₹500", duration: "30–40 min",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    description: "Ancient suction-cup technique to boost blood flow, relieve muscle tension, and promote deep-tissue healing. Effective for back pain, neck pain, and sports recovery.",
    benefits: ["Improves blood circulation", "Relieves deep muscle tension", "Reduces chronic pain", "Detoxifies soft tissue"],
  },
  {
    name: "Post-Surgery Rehab", hindi: "सर्जरी के बाद देखभाल", price: "₹500", duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    description: "Specialised protocols for patients recovering from orthopaedic or neurological surgery. Carefully graded exercises restore full function safely.",
    benefits: ["Accelerates post-op healing", "Prevents scar tissue build-up", "Restores strength & balance", "Reduces medication dependency"],
  },
  {
    name: "Foot & Calf Massage", hindi: "पैर और पिंडली मालिश", price: "₹400", duration: "30 min",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    description: "Therapeutic massage targeting feet, ankles, and calves. Relieves plantar fasciitis, heel pain, and fatigue from prolonged standing or sports.",
    benefits: ["Relieves foot & heel pain", "Reduces calf tightness", "Improves lower-limb circulation", "Ideal for diabetic foot care"],
  },
  {
    name: "Posture Correction", hindi: "मुद्रा सुधार", price: "₹700", duration: "60 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    description: "Comprehensive assessment and correction of postural deviations — forward head, kyphosis, lordosis — using targeted exercises and manual correction.",
    benefits: ["Corrects rounded shoulders", "Reduces back & neck pain", "Improves body alignment", "Self-correction techniques taught"],
  },
  {
    name: "Manual Therapy", hindi: "मैनुअल थेरेपी सत्र", price: "₹700", duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=800",
    description: "Hands-on mobilisation and manipulation of joints and soft tissue. Effective for frozen shoulder, back stiffness, and joint restrictions.",
    benefits: ["Restores joint mobility", "Reduces spasm & stiffness", "Improves nerve function", "Long-lasting pain relief"],
  },
];

const panchkarmaServices: Service[] = [
  {
    name: "Shirodhara", hindi: "शिरोधारा", price: "₹1,800", duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800",
    description: "Warm medicated oil poured continuously over the forehead in a rhythmic stream. Ayurveda's most powerful treatment for calming the nervous system and promoting deep sleep.",
    benefits: ["Relieves anxiety & depression", "Improves sleep quality", "Reduces migraines", "Balances Vata & Pitta doshas"],
  },
  {
    name: "Steam Bath", hindi: "स्टीम बाथ", price: "₹700", duration: "20–30 min",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    description: "Medicated herbal steam therapy that opens pores, liquefies toxins, and expels them through sweat. A cornerstone of Panchkarma preparatory treatment.",
    benefits: ["Deep detoxification", "Relieves joint stiffness", "Improves circulation", "Nourishes the skin"],
  },
  {
    name: "Steam + Shirodhara Combo", hindi: "स्टीम + शिरोधारा", price: "₹2,300", duration: "75–90 min",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    description: "The ultimate stress-relief package. Steam opens the body first, then Shirodhara calms the mind. Perfect for burnout, anxiety, and sleep disorders.",
    benefits: ["Complete mind-body relaxation", "Enhanced detox + deep calm", "Better value than separate sessions", "Ideal for chronic stress"],
    isCombo: true, originalPrice: "₹2,500",
  },
  {
    name: "Pottli Sweda", hindi: "पोटली स्वेदा", price: "₹1,500", duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    description: "Heated boluses of medicated herbs massaged rhythmically over the body. Deeply effective for musculoskeletal disorders, arthritis, and sports injuries.",
    benefits: ["Reduces inflammation & swelling", "Relieves arthritis pain", "Strengthens muscles", "Improves flexibility"],
  },
  {
    name: "Patra Sweda", hindi: "पात्र स्वेदा", price: "₹500", duration: "30–45 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    description: "Ayurvedic fomentation using heated medicated leaves stir-fried with oils. Ideal for pain, cold conditions, and neurological disorders.",
    benefits: ["Relieves body aches", "Stimulates nerves & muscles", "Reduces Vata disorders", "Improves skin texture"],
  },
  {
    name: "Pottli + Patra Combo", hindi: "पोटली + पात्र स्वेदा", price: "₹1,500", duration: "75–90 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    description: "Dual herbal fomentation combo. Heat and herbs work synergistically to dissolve muscular pain, joint stiffness, and deep-seated tension.",
    benefits: ["Synergistic pain relief", "Deep tissue penetration", "Better value than separate", "Full-body recovery"],
    isCombo: true, originalPrice: "₹2,000",
  },
  {
    name: "Janu Vasti", hindi: "जानू वस्ती", price: "₹1,200", duration: "45 min",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
    description: "Warm medicated oil retained over the knee joint using dough rings. Powerful for knee osteoarthritis, ligament injuries, and chronic knee pain.",
    benefits: ["Lubricates knee cartilage", "Reduces osteoarthritis pain", "Strengthens ligaments", "Prevents degeneration"],
  },
  {
    name: "Kati Vasti", hindi: "कटी वस्ती", price: "₹1,200", duration: "45 min",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80&w=800",
    description: "Warm medicated oil pooled over the lower back. Deeply nourishes lumbar vertebrae, discs, and surrounding muscles.",
    benefits: ["Relieves lower back & sciatica", "Treats disc herniation", "Strengthens lumbar spine", "Reduces muscle spasms"],
  },
  {
    name: "Griva Vasti", hindi: "ग्रीवा वस्ती", price: "₹1,200", duration: "45 min",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800",
    description: "Medicated oil retained over the cervical spine. Targets cervical spondylosis, neck stiffness, and radiating arm pain.",
    benefits: ["Relieves cervical pain", "Reduces neck stiffness", "Treats radiating arm pain", "Improves disc health"],
  },
  {
    name: "Hridya Vasti", hindi: "हृदय वस्ती", price: "₹1,200", duration: "45 min",
    image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&q=80&w=800",
    description: "Warm medicated oil held over the heart region. Strengthens heart muscle, calms palpitations, and treats anxiety disorders.",
    benefits: ["Strengthens heart muscle", "Reduces palpitations", "Calms emotional stress", "Balances Prana Vata"],
  },
  {
    name: "Netra Vasti", hindi: "नेत्र वस्ती", price: "₹1,200", duration: "30–40 min",
    image: "https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&q=80&w=800",
    description: "Medicated ghee retained over the eyes. Revitalises tired eyes, treats dry eye syndrome, and screen-related eye strain.",
    benefits: ["Relieves eye strain", "Improves vision clarity", "Treats digital eye fatigue", "Nourishes optic nerves"],
  },
  {
    name: "Full Body Treatment", hindi: "पूर्ण शरीर उपचार", price: "₹4,900", duration: "3–4 hrs",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
    description: "The complete Panchkarma experience — full-body Abhyanga (oil massage), Svedana (steam), and targeted Vasti therapy. Our most comprehensive wellness package.",
    benefits: ["Complete body detox", "Deep stress relief", "Boosts immunity & vitality", "Anti-aging & skin nourishment"],
  },
];

const swarnaBhasmaProducts: Service[] = [
  {
    name: "Swarna Bhasma", hindi: "स्वर्ण भस्म", price: "From ₹6,800", duration: "Premium",
    image: "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800",
    description: "OM AYURVEDA – SWARNA BHASMA SCHEDULE. An elite Ayurvedic regimen designed for profound rejuvenation and absolute peak performance.",
    benefits: ["Power & Stamina", "Speed & Weight Gain", "Fat Loss", "Overall Health"],
    pricingTable: {
      headers: ["Sr No", "Price", "Swarna Bhasma"],
      rows: [
        [1, "₹6,800", "100 mg"],
        [2, "₹9,300", "300 mg"],
        [3, "₹12,400", "500 mg"],
        [4, "₹16,200", "800 mg"],
        [5, "₹19,300", "1000 mg"],
        [6, "₹24,200", "1500 mg"],
        [7, "₹32,400", "2000 mg"],
        [8, "₹44,200", "2500 mg"],
        [9, "₹63,300", "3000 mg"],
        [10, "₹81,200", "4000 mg"],
        [11, "₹93,200", "5000 mg"],
        [12, "₹1,22,000", "7000 mg"],
        [13, "₹1,53,000", "9000 mg"],
        [14, "₹1,82,000", "11000 mg"],
      ]
    },
    highlight: true,
  },
  {
    name: "Hirak Bhasma", hindi: "हीरक भस्म", price: "From ₹16,200", duration: "Premium",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
    description: "OM AYURVEDA – SWARNA BHASMA SCHEDULE. Processed Diamond (Hirak) traditionally used for severe ailments and remarkable strength.",
    benefits: ["Cellular Regeneration", "Immunity Boost", "Chronic Ailments Support", "Lifespan Support"],
    pricingTable: {
      headers: ["Sr No", "Price", "Hirak Bhasma"],
      rows: [
        [1, "₹16,200", "50 mg"],
        [2, "₹19,300", "100 mg"],
        [3, "₹24,200", "200 mg"],
        [4, "₹32,400", "300 mg"],
        [5, "₹44,200", "400 mg"],
        [6, "₹63,300", "500 mg"],
        [7, "₹81,200", "1000 mg"],
        [8, "₹93,200", "1500 mg"],
        [9, "₹1,22,000", "2000 mg"],
        [10, "₹1,53,000", "3000 mg"],
        [11, "₹1,82,000", "4000 mg"],
      ]
    }
  },
  {
    name: "Chandi Bhasma", hindi: "चांदी भस्म", price: "From ₹6,800", duration: "Premium",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    description: "OM AYURVEDA – SWARNA BHASMA SCHEDULE. Cooling processed Silver (Chandi). Perfect for balancing Pitta dosha.",
    benefits: ["Nervous System Calm", "Pitta Balance", "Memory Support", "Cooling Effect"],
    pricingTable: {
      headers: ["Sr No", "Price", "Chandi Bhasma"],
      rows: [
        [1, "₹6,800", "1000 mg"],
        [2, "₹9,300", "1000 mg"],
        [3, "₹12,400", "2000 mg"],
        [4, "₹16,200", "3000 mg"],
        [5, "₹19,300", "4000 mg"],
        [6, "₹24,200", "5000 mg"],
        [7, "₹32,400", "6000 mg"],
        [8, "₹44,200", "7000 mg"],
        [9, "₹63,300", "8000 mg"],
        [10, "₹81,200", "9000 mg"],
        [11, "₹93,200", "11000 mg"],
        [12, "₹1,22,000", "12000 mg"],
        [13, "₹1,53,000", "14000 mg"],
        [14, "₹1,82,000", "16000 mg"],
      ]
    }
  }
];

const premiumSwarnaPackProducts: Service[] = [
  {
    name: "Swarna Bhasma", hindi: "स्वर्ण भस्म", price: "From ₹5,400", duration: "Premium Pak",
    image: "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800",
    description: "OM AYURVEDA – PREMIUM SWARNA PACK variant of pure Gold (Swarna) for profound rejuvenation.",
    benefits: ["Power", "Stamina & Strength", "Endurance & Speed", "Sexual & Joint Health"],
    pricingTable: {
      headers: ["Sr No", "Price", "Swarna Bhasma"],
      rows: [
        [1, "₹5,400", "100 mg"],
        [2, "₹9,600", "300 mg"],
        [3, "₹18,200", "700 mg"],
        [4, "₹26,400", "1000 mg"],
        [5, "₹36,600", "1500 mg"],
        [6, "₹46,200", "2000 mg"],
      ],
      footerText: "₹65,000 से ₹5,00,000 तक (Super Schedule)"
    },
    highlight: true,
  },
  {
    name: "Chandi Bhasma", hindi: "चांदी भस्म", price: "From ₹5,400", duration: "Premium Pak",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    description: "OM AYURVEDA – PREMIUM SWARNA PACK variant of cooling Silver (Chandi).",
    benefits: ["Nervous System Calm", "Pitta Balance", "Memory Support", "Cooling Effect"],
    pricingTable: {
      headers: ["Sr No", "Price", "Chandi Bhasma"],
      rows: [
        [1, "₹5,400", "1000 mg"],
        [2, "₹9,600", "2000 mg"],
        [3, "₹18,200", "3000 mg"],
        [4, "₹26,400", "4000 mg"],
        [5, "₹36,600", "5000 mg"],
        [6, "₹46,200", "6000 mg"],
      ],
      footerText: "₹65,000 से ₹5,00,000 तक (Super Schedule)"
    }
  },
  {
    name: "Hirak Bhasma", hindi: "हीरक भस्म", price: "From ₹5,400", duration: "Premium Pak",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
    description: "OM AYURVEDA – PREMIUM SWARNA PACK extremely potent variant featuring processed Diamond (Hirak).",
    benefits: ["Cellular Regeneration", "Immunity Boost", "Chronic Ailments Support", "Remarkable Strength"],
    pricingTable: {
      headers: ["Sr No", "Price", "Hirak Bhasma"],
      rows: [
        [1, "₹5,400", "100 mg"],
        [2, "₹9,600", "200 mg"],
        [3, "₹18,200", "300 mg"],
        [4, "₹26,400", "400 mg"],
        [5, "₹36,600", "500 mg"],
        [6, "₹46,200", "700 mg"],
      ],
      footerText: "₹65,000 से ₹5,00,000 तक (Super Schedule)"
    }
  },
  {
    name: "Special Keeda Jadi", hindi: "कीड़ा जड़ी", price: "From ₹5,400", duration: "Premium Pak",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    description: "OM AYURVEDA – PREMIUM SWARNA PACK. Extremely potent Special Keeda Jadi for ultimate strength.",
    benefits: ["Testosterone Booster", "Endurance & Speed", "Sexual & Joint Health", "Power"],
    pricingTable: {
      headers: ["Sr No", "Price", "Special Keeda Jadi"],
      rows: [
        [1, "₹5,400", "1000 mg"],
        [2, "₹9,600", "2000 mg"],
        [3, "₹18,200", "4000 mg"],
        [4, "₹26,400", "6000 mg"],
        [5, "₹36,600", "8000 mg"],
        [6, "₹46,200", "10000 mg"],
      ],
      footerText: "₹65,000 से ₹5,00,000 तक (Super Schedule)"
    }
  }
];


/* ═══════════════════════════════════════════════════════════
   COMPACT SERVICE CARD (name + price + image only)
   ═══════════════════════════════════════════════════════════ */
const ServiceCard = ({ service, onClick }: { service: Service; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group bg-white rounded-2xl overflow-hidden border border-brand-gold/15 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 text-left w-full focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
  >
    <div className="relative h-36 md:h-44 overflow-hidden">
      <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {service.isCombo && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-brand-gold text-brand-black px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
          <Gift className="w-2.5 h-2.5" /> Combo
        </div>
      )}
      {service.highlight && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-brand-gold text-brand-black px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
          ⭐ Best Value
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h4 className="text-white font-serif text-sm md:text-base font-bold leading-tight drop-shadow-lg line-clamp-2">{service.name}</h4>
      </div>
    </div>
    <div className="px-3 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-1 text-brand-black/50 text-[10px]">
        <Clock className="w-3 h-3" /> {service.duration}
      </div>
      <div className="flex items-center gap-1.5">
        {service.originalPrice && (
          <span className="text-brand-black/30 text-xs line-through">{service.originalPrice}</span>
        )}
        <span className="text-brand-goldDark font-bold text-base">{service.price}</span>
      </div>
    </div>
  </button>
);

/* ═══════════════════════════════════════════════════════════
   DETAIL POPUP MODAL
   ═══════════════════════════════════════════════════════════ */
const ServiceDetailModal = ({ service, isOpen, onClose }: { service: Service | null; isOpen: boolean; onClose: () => void }) => {
  if (!service) return null;

  const handleEnquire = () => {
    const msg = `Namaste! I'm interested in the ${service.name} treatment (${service.price}). Please share more details.`;
    window.open(`https://wa.me/917015001978?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-brand-gold/30 bg-white gap-0">
        {/* Image Header */}
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl flex-shrink-0">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 via-brand-forest/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-brand-gold font-hindi text-sm mb-1">{service.hindi}</p>
            <DialogHeader className="p-0 space-y-0">
              <DialogTitle className="text-white font-serif text-xl md:text-2xl font-bold leading-tight">{service.name}</DialogTitle>
            </DialogHeader>
          </div>
          {service.isCombo && (
            <div className="absolute top-3 left-4 flex items-center gap-1 bg-brand-gold text-brand-black px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
              <Gift className="w-2.5 h-2.5" /> Combo Deal
            </div>
          )}
          {service.highlight && (
            <div className="absolute top-3 left-4 flex items-center gap-1 bg-brand-gold text-brand-black px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
              ⭐ Most Popular
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Price & Duration Row */}
          <div className="flex items-center justify-between bg-brand-cream/60 p-3 rounded-xl border border-brand-gold/15">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-forest/60" />
              <span className="text-brand-forest text-sm font-medium">{service.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              {service.originalPrice && (
                <span className="text-brand-black/30 text-sm line-through">{service.originalPrice}</span>
              )}
              <span className="text-brand-goldDark font-bold text-2xl">{service.price}</span>
            </div>
          </div>

          {/* Description */}
          <DialogDescription className="text-brand-black/70 text-sm leading-relaxed">
            {service.description}
          </DialogDescription>

          {/* Benefits */}
          <div className="bg-brand-forest/5 rounded-xl p-4">
            <h5 className="text-brand-forest font-bold text-xs uppercase tracking-widest mb-3">Key Benefits</h5>
            <div className="space-y-2">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-brand-gold w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="text-brand-black/70 text-sm leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Table */}
          {service.pricingTable && (
            <div className="border border-brand-gold/30 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-brand-forest text-brand-gold px-4 py-2 text-sm font-bold flex items-center gap-2">
                <Gift className="w-4 h-4" /> Pricing Table
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-brand-cream/50 text-brand-forest border-b border-brand-gold/20">
                    <tr>
                      {service.pricingTable.headers.map((h, i) => (
                        <th key={i} className="px-3 py-2 font-bold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/10 bg-white">
                    {service.pricingTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-brand-cream/30 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td 
                            key={cIdx} 
                            className={`px-3 py-2 whitespace-nowrap ${cIdx === 1 ? 'font-bold text-brand-goldDark' : 'text-brand-black/70'}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {service.pricingTable.footerText && (
                <div className="bg-brand-cream/30 text-center py-2 text-xs font-medium text-brand-forest italic border-t border-brand-gold/20">
                  {service.pricingTable.footerText}
                </div>
              )}
            </div>
          )}

          {/* GST Note */}
          <p className="text-brand-black/40 text-[10px] text-center">
            * Price is per session. GST 18% applicable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              onClick={handleEnquire}
              className="flex-1 bg-brand-forest text-brand-gold hover:bg-brand-forest/90 font-bold py-3 rounded-xl text-sm h-auto"
            >
              <PhoneCall className="w-4 h-4 mr-2" /> Book on WhatsApp
            </Button>
            <Link to="/contact" className="flex-1">
              <Button variant="outline" className="w-full border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold py-3 rounded-xl text-sm h-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleEnquire = () => {
    const msg = "Namaste! I'd like to book a free consultation. Please share the available slots.";
    window.open(`https://wa.me/917015001978?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans overflow-x-hidden">
      <Seo title="Treatments & Services - Ayurveda Veda" description="Expert Physiotherapy and ancient Panchkarma treatments." />
      <Navbar />

      <main className="pt-16 md:pt-20">
        {/* ═══ 1. HERO ═══ */}
        <section className="relative py-16 md:py-32 bg-brand-forest overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 border-2 border-brand-gold rounded-full" />
            <div className="absolute bottom-10 right-10 w-72 h-72 border-2 border-brand-gold rounded-full" />
          </div>
          <div className="container px-4 md:px-6 relative z-10 text-center">
            <span className="inline-block px-3 py-1 mb-4 border border-brand-gold/40 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] md:text-xs font-medium tracking-widest uppercase">
              GST 18% Extra · Per Session
            </span>
            <h1 className="text-brand-cream font-serif text-3xl sm:text-4xl md:text-6xl mb-4 leading-tight">
              Our Expert <span className="text-brand-gold">Treatments</span>
            </h1>
            <p className="text-brand-cream/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-6">
              Modern <strong className="text-brand-gold">Physiotherapy</strong> for injury recovery and ancient <strong className="text-brand-gold">Panchkarma</strong> for deep holistic healing — all under one roof.
            </p>
            <p className="text-brand-cream/40 text-xs">Tap any treatment card to see full details</p>
          </div>
        </section>

        {/* ═══ 2. PHYSIOTHERAPY ═══ */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-forest rounded-xl flex items-center justify-center flex-shrink-0">
                <Activity className="text-brand-gold w-5 h-5" />
              </div>
              <div>
                <h2 className="text-brand-forest font-serif text-2xl md:text-4xl font-bold leading-tight">Physiotherapy</h2>
                <p className="text-brand-gold font-hindi text-sm">फिजियोथेरेपी</p>
              </div>
            </div>
            <p className="text-brand-black/60 text-xs md:text-sm max-w-2xl mb-8 md:mb-12 ml-0 md:ml-[52px]">
              Science-backed physical therapy — supervised by certified physiotherapists.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {physioServices.map((s, i) => (
                <ServiceCard key={i} service={s} onClick={() => setSelectedService(s)} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 3. PANCHKARMA ═══ */}
        <section className="py-12 md:py-20 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-forest rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-brand-gold w-5 h-5" />
              </div>
              <div>
                <h2 className="text-brand-forest font-serif text-2xl md:text-4xl font-bold leading-tight">Panchkarma</h2>
                <p className="text-brand-gold font-hindi text-sm">पंचकर्म</p>
              </div>
            </div>
            <p className="text-brand-black/60 text-xs md:text-sm max-w-2xl mb-8 md:mb-12 ml-0 md:ml-[52px]">
              Ancient Vedic detox & rejuvenation therapies — including combo packages for better value.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {panchkarmaServices.map((s, i) => (
                <ServiceCard key={i} service={s} onClick={() => setSelectedService(s)} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. SWARNA BHASMA SCHEDULE ═══ */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-forest rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="text-brand-gold w-5 h-5" />
              </div>
              <div>
                <h2 className="text-brand-forest font-serif text-2xl md:text-3xl font-bold leading-tight">Swarna Bhasma Schedule</h2>
                <p className="text-brand-gold font-hindi text-sm">स्वर्ण भस्म अनुसूची</p>
              </div>
            </div>
            <p className="text-brand-black/60 text-xs md:text-sm max-w-2xl mb-8 md:mb-12 ml-0 md:ml-[52px]">
              Elite Ayurvedic regimens originally formulated for profound rejuvenation and absolute peak performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 ml-0 md:ml-[52px]">
              {swarnaBhasmaProducts.map((s, i) => (
                <ServiceCard key={i} service={s} onClick={() => setSelectedService(s)} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. PREMIUM SWARNA PACK ═══ */}
        <section className="py-12 md:py-20 bg-brand-cream">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-forest rounded-xl flex items-center justify-center flex-shrink-0">
                <Gift className="text-brand-gold w-5 h-5" />
              </div>
              <div>
                <h2 className="text-brand-forest font-serif text-2xl md:text-3xl font-bold leading-tight">Premium Swarna Pack</h2>
                <p className="text-brand-gold font-hindi text-sm">प्रीमियम स्वर्ण पाक</p>
              </div>
            </div>
            <p className="text-brand-black/60 text-xs md:text-sm max-w-2xl mb-8 md:mb-12 ml-0 md:ml-[52px]">
              A potent formulation combining the essence of precious Bhasmas and Keeda Jadi for ultimate strength.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 ml-0 md:ml-[52px]">
              {premiumSwarnaPackProducts.map((s, i) => (
                <ServiceCard key={i} service={s} onClick={() => setSelectedService(s)} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. BOOK FREE CONSULTATION ═══ */}
        <section className="py-12 md:py-20 bg-brand-forest relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-leaf/5 rounded-full -ml-32 -mb-32" />
          </div>
          <div className="container px-4 md:px-6 relative z-10 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-brand-gold font-hindi text-base md:text-xl mb-2">निःशुल्क परामर्श</p>
              <h2 className="text-brand-cream font-serif text-2xl md:text-4xl mb-4 leading-tight">Book a Free Consultation</h2>
              <p className="text-brand-cream/60 text-sm md:text-base mb-8 leading-relaxed">
                Not sure which treatment is right for you? Our senior Ayurvedic physicians and certified physiotherapists offer a free introductory consultation to understand your condition and recommend the perfect healing path.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleEnquire}
                  className="bg-brand-gold hover:bg-brand-goldDark text-brand-black font-bold px-8 py-3 rounded-full text-sm h-auto shadow-xl"
                >
                  <PhoneCall className="w-4 h-4 mr-2" /> WhatsApp Consultation
                </Button>
                <a href="tel:7015001978">
                  <Button variant="outline" className="w-full sm:w-auto border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold px-8 py-3 rounded-full text-sm h-auto">
                    Call Now
                  </Button>
                </a>
              </div>
              <p className="text-brand-cream/30 text-[10px] mt-6">
                * GST 18% applicable on all treatments. Prices are per session.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Detail Popup */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};

export default ServicesPage;