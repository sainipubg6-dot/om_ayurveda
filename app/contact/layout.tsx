import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Om Ayurveda | Book Your Consultation',
  description: 'Get in touch with Om Ayurveda for free consultations, product inquiries, and appointment bookings. We are here to guide you on your journey to holistic wellness.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
