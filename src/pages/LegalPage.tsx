import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { useLocation } from 'react-router-dom';

const LegalPage = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getContent = () => {
    switch (pathname) {
      case '/terms':
        return {
          title: "Terms & Conditions",
          description: "Comprehensive usage agreement, clinical disclaimers, and governing protocols.",
          content: [
            { 
              h: "1. Clinical & Medical Disclaimer", 
              p: "The information, text, graphics, images, and other materials contained on this website are for educational and informational purposes only. While Om Ayurveda has been a pioneer in Ayurvedic healing since 1958, our formulations and advice are intended to support holistic wellness and are not a substitute for professional medical advice, diagnosis, or treatment for acute life-threatening emergencies. Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website." 
            },
            { 
              h: "2. Prescriptive Formulations & Swarna Bhasma", 
              p: "Specific high-potency formulations, including those containing Swarna Bhasma (Gold Calx) and specialized mineral compounds, are prepared under strict clinical supervision. By purchasing these products, you acknowledge that you have consulted with our specialists or are acting under the guidance of a qualified Ayurvedic practitioner. You agree to strictly adhere to the prescribed dosage and administration protocols (Anupana) provided with the formulation. Om Ayurveda shall not be held liable for adverse effects resulting from self-medication or deviation from the recommended clinical protocol." 
            },
            { 
              h: "3. User Account & Conduct", 
              p: "To access certain services or features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process. Any attempt to use the platform for unauthorized commercial purposes, data mining, or any activity that disrupts the clinical integrity of our digital services is strictly prohibited and may result in immediate termination of access." 
            },
            { 
              h: "4. Intellectual Property & Heritage Rights", 
              p: "The brand 'Om Ayurveda', the logo, the hybrid clinical protocols, and all proprietary formulations mentioned on this site are the exclusive intellectual property of Om Ayurveda, Safidon. This includes our unique methods of processing minerals and herbs perfected over 68 years. No part of this website, including content, design, or clinical workflows, may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the clinical director." 
            },
            { 
              h: "5. Governing Law & Jurisdiction", 
              p: "These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions, your use of the website, or the purchase of our formulations shall be subject to the exclusive jurisdiction of the courts in Safidon/Jind, Haryana, India." 
            }
          ]
        };
      case '/privacy':
        return {
          title: "Privacy Policy",
          description: "Detailed protocols for data confidentiality and clinical patient protection.",
          content: [
            { 
              h: "1. Clinical Confidentiality Standard", 
              p: "At Om Ayurveda, we uphold the highest standards of clinical confidentiality. Your medical history, consultation records, and personal health metrics are treated with the same level of privacy as a physical medical record. We do not sell, trade, or otherwise transfer your personally identifiable information or health data to outside parties for marketing or advertising purposes. Your trust is the foundation of our 68-year legacy." 
            },
            { 
              h: "2. Information We Collect", 
              p: "We collect information from you when you register on our site, place an order, or subscribe to our clinical newsletter. This includes your name, email address, mailing address, phone number, and—crucially for our formulations—any health data you choose to share during a digital consultation. We also collect non-personal data such as browser types and IP addresses to improve our website's performance and patient experience." 
            },
            { 
              h: "3. Usage of Collected Information", 
              p: "Any of the information we collect from you may be used in one of the following ways: To personalize your healing experience (your information helps us better respond to your individual needs); to improve our formulations based on patient feedback; to process transactions securely; and to send periodic updates regarding your treatment or order status. If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email." 
            },
            { 
              h: "4. Data Security & Encryption", 
              p: "We implement a variety of security measures to maintain the safety of your personal information. We use a secure server and all supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential. Your payments are processed through Razorpay's enterprise-grade secure environment." 
            },
            { 
              h: "5. Cookies & Tracking Technology", 
              p: "Our website uses cookies to help us remember and process the items in your shopping cart and understand and save your preferences for future visits. These cookies do not store any personal health data. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings. However, like most websites, if you turn your cookies off, some of our clinical services may not function properly." 
            }
          ]
        };
      case '/shipping':
        return {
          title: "Shipping & Logistics Policy",
          description: "Professional delivery standards for potent and fresh Ayurvedic formulations.",
          content: [
            { 
              h: "1. Fresh Formulation & Processing", 
              p: "To maintain the 'Prana' or life-force of our herbal ingredients, we do not mass-produce and store our medicines in large warehouses for long periods. Instead, many of our premium formulations are prepared fresh upon receipt of your order. Because of this high clinical standard, please allow a processing time of 24 to 48 hours for your order to be prepared, energized, and packed at our Safidon facility before it is handed over to our logistics partners." 
            },
            { 
              h: "2. Nationwide Delivery Network", 
              p: "We ship across the length and breadth of India, from major metros to remote rural locations. We utilize a network of premium logistics partners including BlueDart, Delhivery, and DTDC to ensure that your medicine reaches you in a temperature-controlled and secure environment. For major cities, delivery typically occurs within 3 to 5 business days post-dispatch. For remote areas, please allow up to 7 to 10 business days." 
            },
            { 
              h: "3. Shipping Fees & Calculations", 
              p: "Shipping charges are calculated based on the weight of the shipment and the delivery pin code. However, as part of our mission to make authentic Ayurveda accessible, we offer Free Standard Shipping on orders above a certain value threshold. Any applicable shipping fees will be clearly displayed at the final checkout screen before you complete your payment. No hidden delivery charges are applied after the order is placed." 
            },
            { 
              h: "4. Shipment Tracking & Communication", 
              p: "The moment your order is scanned by our courier partner, you will receive an automated update via SMS and WhatsApp containing your unique Tracking ID and a direct link to follow your package in real-time. We encourage our patients to monitor their shipments closely to ensure they are available at the time of delivery to receive their formulations personally." 
            },
            { 
              h: "5. Delivery Issues & Redelivery", 
              p: "In the event that you are not available to receive your order, our courier partners will make up to three attempts to deliver the package. If the shipment is returned to our facility due to an incorrect address provided by the user or repeated unavailability, additional shipping charges may apply for the reshipment of the order. We take full responsibility for the safety of the medicine during transit until the first delivery attempt is made." 
            }
          ]
        };
      case '/refunds':
        return {
          title: "Refund & Cancellation Policy",
          description: "Official protocols for medicinal product safety and financial transactions.",
          content: [
            { 
              h: "1. Strict No-Cancellation Policy", 
              p: "To maintain our high clinical standards and ensure the fresh preparation of your Ayurvedic formulations, Om Ayurveda follows a strict 'No-Cancellation' policy. Once an order is successfully placed and confirmed on our platform, it immediately enters our clinical formulation stage. At this point, raw materials are allocated and processing begins. Therefore, we do not allow cancellations or modifications to an order once it has been placed. We encourage our patients to review their selection and clinical requirements carefully before completing the checkout process." 
            },
            { 
              h: "2. Medicinal Safety & Returns", 
              p: "For the protection of all our patients and to maintain strict hygiene standards for medicinal products, Om Ayurveda does not accept returns of any formulation once it has been delivered and the safety seal has been broken or tampered with. We cannot restock or resell medicinal items that have left our controlled environment. We appreciate your understanding in maintaining these high clinical safety standards." 
            },
            { 
              h: "3. Replacements for Transit Damage", 
              p: "While we use high-grade protective packaging, should your order arrive in a damaged condition (e.g., broken bottles or leakage), we are committed to making it right. Please take a clear photograph or video of the damaged package and its contents within 24 hours of delivery and share it with us via WhatsApp. Upon verification, we will ship a replacement at no additional cost or provide you with store credit for your next purchase." 
            },
            { 
              h: "4. Refund Disbursement Process", 
              p: "Once a refund is approved by our billing department, the amount is initiated for disbursement immediately. Depending on your banking institution or payment gateway (Razorpay/UPI/Card), the credit should appear in your account within 5 to 7 business days. You will receive an email confirmation once the refund has been successfully initiated from our end." 
            },
            { 
              h: "5. Dispute Resolution", 
              p: "Om Ayurveda believes in compassionate healing. If you are dissatisfied with your treatment or product experience, we encourage you to speak with our senior consultants before seeking a refund. Our goal is your recovery, and we will work tirelessly to adjust your protocol or formulation to ensure you achieve the results you are looking for." 
            }
          ]
        };
      default:
        return { title: "Legal", description: "Om Ayurveda Policies", content: [] };
    }
  };

  const { title, description, content } = getContent();

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <Seo title={`${title} - Om Ayurveda`} description={description} />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h1 className="text-brand-forest font-serif text-4xl md:text-7xl font-bold mb-8">{title}</h1>
            <div className="h-2 w-32 bg-brand-gold rounded-full mb-10" />
            <p className="text-brand-black/60 text-xl md:text-3xl font-medium leading-relaxed italic">{description}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:gap-16">
            {content.map((section, idx) => (
              <div key={idx} className="group bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-brand-gold/5 border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-700">
                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                  <span className="flex-shrink-0 w-16 h-16 rounded-[1.5rem] bg-brand-forest text-brand-gold flex items-center justify-center font-bold text-2xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
                    {idx + 1}
                  </span>
                  <div>
                    <h2 className="text-brand-forest font-serif text-3xl md:text-4xl font-bold mb-6 group-hover:text-brand-gold transition-colors">{section.h}</h2>
                    <p className="text-brand-black/70 text-lg md:text-xl leading-relaxed text-justify">{section.p}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 pt-12 border-t-2 border-brand-gold/20 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-brand-black/40 text-sm font-bold uppercase tracking-[0.3em]">
              © 2026 Om Ayurveda® Clinical Standards Bureau
            </div>
            <div className="flex items-center gap-4">
              <div className="text-brand-gold font-bold text-sm bg-brand-forest px-8 py-3 rounded-full shadow-2xl">
                Safidon, Haryana, India
              </div>
              <div className="text-brand-forest font-bold text-sm bg-brand-gold/10 px-8 py-3 rounded-full border border-brand-gold/20">
                ISO 9001:2015 Certified
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
