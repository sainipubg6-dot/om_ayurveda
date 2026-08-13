"use client";

import Link from 'next/link';
import React, { useState } from 'react';

import { Activity, Sparkles, ChevronRight, CheckCircle2, IndianRupee, Clock, Tag, PhoneCall, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── PHYSIOTHERAPY DATA ─────────────────────────────────── */
const physiotherapyServices = [
  {
    name: "One Part Physiotherapy",
    hindi: "एक भाग फिजियोथेरेपी",
    price: "₹200",
    duration: "30–45 min",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
    description:
      "Targeted physiotherapy for a single body part — shoulder, knee, back, elbow, wrist, or hip. Ideal for acute injuries, chronic pain localised to one region, or post-injury rehabilitation.",
    benefits: [
      "Reduces localised pain & inflammation",
      "Restores range of motion",
      "Strengthens surrounding muscles",
      "Non-invasive & drug-free",
    ],
  },
  {
    name: "Taping",
    hindi: "टेपिंग",
    price: "₹500",
    duration: "20–30 min",
    image: "https://images.unsplash.com/photo-1620735692151-26a7e0748429?auto=format&fit=crop&q=80&w=800",
    description:
      "Kinesiology or sports taping applied to injured or strained muscles and joints. Supports the soft tissue, reduces swelling, and allows pain-free movement without restricting circulation.",
    benefits: [
      "Immediate pain relief",
      "Supports injured joints & muscles",
      "Reduces swelling & bruising",
      "Allows full movement during recovery",
    ],
  },
  {
    name: "Cupping Therapy",
    hindi: "कपिंग थेरेपी",
    price: "₹500",
    duration: "30–40 min",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    description:
      "An ancient therapeutic technique using suction cups placed on the skin to increase blood flow, relieve muscle tension, and promote deep-tissue healing. Effective for back pain, neck pain, and sports recovery.",
    benefits: [
      "Improves blood circulation",
      "Relieves deep muscle tension",
      "Reduces chronic pain",
      "Detoxifies soft tissue",
    ],
  },
  {
    name: "Post-Surgery Rehabilitation",
    hindi: "सर्जरी के बाद देखभाल",
    price: "₹500",
    duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    description:
      "Specialised physiotherapy protocols designed for patients recovering from orthopaedic or neurological surgery. Carefully graded exercises and manual techniques to restore full function safely.",
    benefits: [
      "Accelerates post-op healing",
      "Prevents scar tissue build-up",
      "Restores strength & balance",
      "Reduces dependency on medication",
    ],
  },
  {
    name: "Foot & Calf Massager",
    hindi: "पैर और पिंडली मालिश",
    price: "₹400",
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    description:
      "Therapeutic massage targeting the feet, ankles, and calf muscles. Relieves plantar fasciitis, heel pain, varicose veins, and fatigue caused by prolonged standing or sports activity.",
    benefits: [
      "Relieves foot & heel pain",
      "Reduces calf muscle tightness",
      "Improves circulation in lower limbs",
      "Ideal for diabetic foot care",
    ],
  },
  {
    name: "Posture Correction Session",
    hindi: "मुद्रा सुधार (एक दिन)",
    price: "₹700",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    description:
      "A comprehensive single-day session to assess and correct postural deviations such as forward head posture, kyphosis, lordosis, and scoliotic tendencies using targeted exercises and manual correction.",
    benefits: [
      "Corrects forward head & rounded shoulders",
      "Reduces back & neck pain",
      "Improves body alignment",
      "Teaches self-correction techniques",
    ],
  },
  {
    name: "Manual Therapy Session",
    hindi: "मैनुअल थेरेपी सत्र",
    price: "₹700",
    duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=800",
    description:
      "Hands-on mobilisation and manipulation of joints and soft tissue to restore mobility, relieve pain, and improve neuromuscular function. Effective for frozen shoulder, back stiffness, and joint restrictions.",
    benefits: [
      "Restores joint mobility",
      "Reduces spasm & stiffness",
      "Improves nerve function",
      "Long-lasting pain relief",
    ],
  },
];

/* ─── PANCHKARMA DATA ────────────────────────────────────── */
const panchkarmaServices = [
  {
    name: "Shirodhara",
    hindi: "शिरोधारा",
    price: "₹1,800",
    duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800",
    description:
      "A medicated warm oil stream is continuously poured over the forehead (\"third eye\") in a rhythmic flow. One of Ayurveda's most powerful treatments for calming the nervous system, reducing stress, and promoting deep sleep.",
    benefits: [
      "Relieves anxiety, stress & depression",
      "Improves sleep quality",
      "Reduces migraines & headaches",
      "Balances Vata & Pitta doshas",
    ],
  },
  {
    name: "Steam Bath (Svedana)",
    hindi: "स्टीम बाथ",
    price: "₹700",
    duration: "20–30 min",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    description:
      "Medicated herbal steam therapy that opens pores, liquefies toxins (ama), and allows them to be expelled through sweat. A cornerstone of Panchkarma preparatory (Purvakarma) treatment.",
    benefits: [
      "Deep detoxification through sweat",
      "Relieves joint pain & stiffness",
      "Improves circulation",
      "Softens & nourishes the skin",
    ],
  },
  {
    name: "Pottli Sweda",
    hindi: "पोटली स्वेदा",
    price: "₹1,200",
    duration: "45–60 min",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    description:
      "Heated boluses (pottis) filled with medicated herbs, rice, or powders are rhythmically massaged over the body. Deeply effective for musculoskeletal disorders, arthritis, and sports injuries.",
    benefits: [
      "Reduces inflammation & swelling",
      "Relieves arthritis & joint pain",
      "Nourishes & strengthens muscles",
      "Improves flexibility",
    ],
  },
  {
    name: "Patra Sweda",
    hindi: "पात्र स्वेदा",
    price: "₹500",
    duration: "30–45 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    description:
      "Ayurvedic fomentation using heated medicated leaves (eranda, coconut, etc.) stir-fried with oils and herbs, applied as a sudation therapy. Ideal for pain, cold conditions, and neurological disorders.",
    benefits: [
      "Relieves body aches & coldness",
      "Stimulates nerves & muscles",
      "Reduces Vata-related disorders",
      "Improves skin texture",
    ],
  },
  {
    name: "Janu Vasti",
    hindi: "जानू वस्ती",
    price: "₹1,200",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
    description:
      "A reservoir of warm medicated oil is retained over the knee joint using specially shaped dough rings. A powerful treatment for knee osteoarthritis, ligament injuries, and chronic knee pain.",
    benefits: [
      "Lubricates knee joint cartilage",
      "Reduces pain in osteoarthritis",
      "Strengthens knee ligaments",
      "Prevents further degeneration",
    ],
  },
  {
    name: "Kati Vasti",
    hindi: "कटी वस्ती",
    price: "₹1,200",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80&w=800",
    description:
      "Warm medicated oil is pooled over the lower back using circular dough dams. The oil deeply penetrates and nourishes the lumbar vertebrae, intervertebral discs, and surrounding muscles.",
    benefits: [
      "Relieves lower back pain & sciatica",
      "Treats lumbar disc herniation",
      "Strengthens the lumbar spine",
      "Reduces muscle spasms",
    ],
  },
  {
    name: "Griva Vasti",
    hindi: "ग्रीवा वस्ती",
    price: "₹1,200",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800",
    description:
      "Medicated oil retained over the cervical spine (neck region) using a dough dam. Targets cervical spondylosis, neck stiffness, radiating arm pain, and chronic headaches originating from the neck.",
    benefits: [
      "Relieves cervical spondylosis pain",
      "Reduces neck stiffness & headaches",
      "Treats radiating arm & shoulder pain",
      "Improves cervical disc health",
    ],
  },
  {
    name: "Hridya Vasti",
    hindi: "हृदय वस्ती",
    price: "₹1,200",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&q=80&w=800",
    description:
      "Warm medicated oil is held over the heart region. This rare Panchkarma procedure strengthens the heart muscle, calms palpitations, and is a powerful treatment for cardiac weakness and anxiety disorders.",
    benefits: [
      "Strengthens heart muscle",
      "Reduces chest tightness & palpitations",
      "Calms anxiety & emotional stress",
      "Balances Prana Vata",
    ],
  },
  {
    name: "Netra Vasti",
    hindi: "नेत्र वस्ती",
    price: "₹1,200",
    duration: "30–40 min",
    image: "https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&q=80&w=800",
    description:
      "Medicated ghee (clarified butter) is retained over the eyes using dough reservoirs. Revitalises tired, strained eyes and treats dry eye syndrome, blurry vision, and eye strain from screen exposure.",
    benefits: [
      "Relieves eye strain & dryness",
      "Improves vision clarity",
      "Treats computer eye syndrome",
      "Nourishes optic nerves",
    ],
  },
  {
    name: "Full Body Treatment",
    hindi: "पूर्ण शरीर उपचार",
    price: "₹4,900",
    duration: "3–4 hrs",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
    description:
      "The complete Panchkarma experience — a full-body Abhyanga (medicated oil massage), followed by Svedana (steam), and targeted Vasti therapy. Our most comprehensive wellness package for total rejuvenation.",
    benefits: [
      "Complete body detox & rejuvenation",
      "Deep stress & fatigue relief",
      "Improves immunity & vitality",
      "Anti-aging & skin nourishment",
    ],
    highlight: true,
  },
];

/* ─── COMBO DEALS ─────────────────────────────────────────── */
const combos = [
  {
    name: "Shirodhara + Steam Bath",
    hindi: "शिरोधारा + स्टीम बाथ",
    price: "₹2,300",
    originalPrice: "₹2,500",
    description: "The ultimate stress-relief package. Steam opens the body, then Shirodhara calms the mind. Perfect for burnout, anxiety, and sleep disorders.",
    duration: "75–90 min",
  },
  {
    name: "Pottli Sweda + Patra Sweda",
    hindi: "पोटली स्वेदा + पात्र स्वेदा",
    price: "₹1,500",
    originalPrice: "₹1,700",
    description: "Dual herbal fomentation combo. The heat and herbs work synergistically to melt away muscular pain, joint stiffness, and deep-seated tension.",
    duration: "75–90 min",
  },
];

/* ─── CARD COMPONENT ─────────────────────────────────────── */
const TreatmentCard = ({ service }: { service: (typeof physiotherapyServices)[0] & { highlight?: boolean } }) => (
  <div className={`group bg-white rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col ${service.highlight ? 'border-brand-gold ring-2 ring-brand-gold/40' : 'border-brand-gold/15'}`}>
    {service.highlight && (
      <div className="bg-gradient-to-r from-brand-gold to-brand-goldDark text-brand-black text-center text-xs font-bold py-1.5 tracking-widest uppercase">
        ⭐ Most Popular — Best Value
      </div>
    )}
    {/* Image */}
    <div className="relative h-44 overflow-hidden flex-shrink-0">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/70 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
        <div>
          <p className="text-brand-gold font-hindi text-sm leading-tight">{service.hindi}</p>
        </div>
        <div className="flex items-center gap-1 bg-brand-gold/90 text-brand-black px-2 py-1 rounded-full text-xs font-bold">
          <Clock className="w-3 h-3" />
          {service.duration}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-brand-forest font-serif text-lg font-bold leading-tight pr-2">{service.name}</h4>
        <div className="flex items-center gap-0.5 text-brand-goldDark font-bold text-lg whitespace-nowrap flex-shrink-0">
          <span className="text-base">₹</span>
          <span>{service.price.replace('₹', '').replace(',', '')}</span>
        </div>
      </div>

      <p className="text-brand-black/65 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>

      {/* Benefits */}
      <div className="space-y-1.5">
        <p className="text-brand-forest font-bold text-xs uppercase tracking-widest mb-2">Key Benefits</p>
        {service.benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 className="text-brand-gold w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-brand-black/70 text-xs leading-snug">{b}</span>
          </div>
        ))}
      </div>

      {/* Book CTA */}
      <Link href="/contact" className="mt-5">
        <button className="w-full bg-brand-forest/8 hover:bg-brand-forest text-brand-forest hover:text-brand-gold border border-brand-forest/20 hover:border-brand-forest py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2">
          <PhoneCall className="w-4 h-4" /> Book This Treatment
        </button>
      </Link>
    </div>
  </div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const Services = () => {
  const [activeTab, setActiveTab] = useState<'physio' | 'panchkarma'>('physio');

  return (
    <section id="services" className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative bg-brand-forest py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-brand-gold rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-brand-gold rounded-full" />
        </div>
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1 mb-4 border border-brand-gold/40 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-medium tracking-widest uppercase">
            GST 18% Extra · Per Session Pricing
          </span>
          <h1 className="text-brand-cream font-serif text-3xl sm:text-4xl md:text-6xl mb-4 leading-tight">
            Expert <span className="text-brand-gold">Treatments</span>
          </h1>
          <p className="text-brand-cream/70 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Two specialised wings — modern Physiotherapy for injury rehabilitation and ancient Panchkarma for deep holistic healing. Choose your path to recovery.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-10 md:py-20">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex bg-white border border-brand-gold/20 rounded-2xl p-1.5 shadow-xl gap-1">
            <button
              onClick={() => setActiveTab('physio')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'physio'
                  ? 'bg-brand-forest text-brand-gold shadow-lg'
                  : 'text-brand-forest/60 hover:text-brand-forest'
              }`}
            >
              <Activity className="w-4 h-4" />
              Physiotherapy
            </button>
            <button
              onClick={() => setActiveTab('panchkarma')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'panchkarma'
                  ? 'bg-brand-forest text-brand-gold shadow-lg'
                  : 'text-brand-forest/60 hover:text-brand-forest'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Panchkarma
            </button>
          </div>
        </div>

        {/* Physiotherapy Grid */}
        {activeTab === 'physio' && (
          <div>
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-forest rounded-xl flex items-center justify-center">
                  <Activity className="text-brand-gold w-5 h-5" />
                </div>
                <h2 className="text-brand-forest font-serif text-2xl md:text-4xl font-bold">Physiotherapy Treatments</h2>
              </div>
              <p className="text-brand-black/60 text-sm md:text-base max-w-2xl mx-auto mt-2">
                Science-backed physical therapy for pain relief, injury rehabilitation, and postural correction. All sessions supervised by certified physiotherapists.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {physiotherapyServices.map((s, i) => (
                <TreatmentCard key={i} service={s} />
              ))}
            </div>
          </div>
        )}

        {/* Panchkarma Grid */}
        {activeTab === 'panchkarma' && (
          <div>
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-forest rounded-xl flex items-center justify-center">
                  <Sparkles className="text-brand-gold w-5 h-5" />
                </div>
                <h2 className="text-brand-forest font-serif text-2xl md:text-4xl font-bold">Panchkarma Treatments</h2>
              </div>
              <p className="text-brand-black/60 text-sm md:text-base max-w-2xl mx-auto mt-2">
                Ancient Vedic cleansing and rejuvenation therapies. Each treatment is customised to your Prakriti (body constitution) by our experienced Ayurvedic physicians.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 mb-14 md:mb-20">
              {panchkarmaServices.map((s, i) => (
                <TreatmentCard key={i} service={s} />
              ))}
            </div>

            {/* Combo Deals */}
            <div className="mt-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full mb-4">
                  <Gift className="text-brand-gold w-4 h-4" />
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Special Combo Packages</span>
                </div>
                <h3 className="text-brand-forest font-serif text-2xl md:text-3xl font-bold">Better Together</h3>
                <p className="text-brand-black/60 text-sm mt-2">Save more with our curated treatment combinations</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
                {combos.map((combo, i) => (
                  <div key={i} className="bg-white border-2 border-brand-gold/30 rounded-2xl p-6 hover:border-brand-gold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-brand-forest font-serif text-lg font-bold leading-tight">{combo.name}</h4>
                        <p className="text-brand-gold font-hindi text-sm">{combo.hindi}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <p className="text-brand-black/40 line-through text-sm">{combo.originalPrice}</p>
                        <p className="text-brand-goldDark font-bold text-xl">{combo.price}</p>
                      </div>
                    </div>
                    <p className="text-brand-black/65 text-sm leading-relaxed mb-4">{combo.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 text-brand-forest/60 text-xs">
                        <Clock className="w-3.5 h-3.5" /> {combo.duration}
                      </span>
                      <Link href="/contact">
                        <button className="flex items-center gap-1.5 bg-brand-forest text-brand-gold px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-forest/90 transition-colors">
                          Book Combo <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Note + CTA */}
        <div className="mt-14 md:mt-20 bg-brand-forest rounded-2xl md:rounded-3xl p-6 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <p className="text-brand-gold font-hindi text-lg md:text-2xl mb-2">आपका स्वास्थ्य, हमारी प्राथमिकता</p>
            <p className="text-brand-cream/50 text-xs md:text-sm mb-6">
              * All prices are per session. GST 18% applicable. Consult our doctors for personalised treatment plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-brand-gold text-brand-black hover:bg-brand-goldDark font-bold px-7 py-3 rounded-full text-sm h-auto">
                  <PhoneCall className="w-4 h-4 mr-2" /> Book a Consultation
                </Button>
              </Link>
              <a href="https://wa.me/917015001978" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold px-7 py-3 rounded-full text-sm h-auto">
                  💬 WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;