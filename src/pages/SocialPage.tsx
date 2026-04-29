import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Instagram, ExternalLink } from 'lucide-react';

const SocialPage = () => {
  useEffect(() => {
    // Dynamically inject the Elfsight script when the page mounts
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 mt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 mb-6 p-1">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Instagram className="w-8 h-8 text-pink-600" />
              </div>
            </div>
            <h1 className="text-brand-forest font-serif text-4xl md:text-5xl font-bold mb-4">@om_ayurveda</h1>
            <p className="text-brand-forest/70 text-lg max-w-2xl mx-auto">
              Follow our daily journey of healing, wellness tips, and ancient Ayurvedic wisdom on Instagram.
            </p>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-brand-forest text-white px-8 py-3 rounded-full font-bold hover:bg-brand-gold hover:text-brand-forest transition-colors shadow-lg"
            >
              Follow on Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Elfsight Instagram Widget */}
          <div className="min-h-[500px]">
            <div className="elfsight-app-28eb650b-05f8-42e5-aeec-5b947a6a7640" data-elfsight-app-lazy></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SocialPage;

