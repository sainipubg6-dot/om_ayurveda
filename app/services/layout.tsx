import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ayurvedic Services & Panchakarma | Om Ayurveda',
  description: 'Book authentic Panchakarma treatments, Physiotherapy, and Swarna Bhasma schedules at Om Ayurveda. Explore our therapeutic packages for deep holistic healing.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
