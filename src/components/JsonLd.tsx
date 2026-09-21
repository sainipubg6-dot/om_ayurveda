import React from 'react';

type JsonLdProps = {
  schema: Record<string, any>;
};

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Om Ayurveda",
  "url": "https://omayurveda.in",
  "logo": "https://omayurveda.in/Logo.png",
  "foundingDate": "1958",
  "description": "Authentic Ayurvedic clinic and product brand providing Panchakarma treatments and clinical formularies since 1958.",
  "sameAs": [
    "https://www.instagram.com/om_ayurveda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "https://www.facebook.com/share/18GU2kfgpM/?mibextid=wwXIfr",
    "https://youtube.com/@omayurveda786?si=gat_k6lBuZht7mqe"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "medicalSpecialty": "Ayurvedic"
};
