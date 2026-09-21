import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Om Ayurveda | Legacy of Healing Since 1958',
  description: 'Learn about Om Ayurveda, our legacy of Vedic science and clinical precision since 1958. Discover our story, our doctors, and our commitment to authentic healing.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
