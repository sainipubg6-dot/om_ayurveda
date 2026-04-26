import { useEffect } from 'react';

export interface SeoProps {
  title: string;
  description?: string;
}

export const Seo = ({ title, description }: SeoProps) => {
  useEffect(() => {
    // Set Document Title
    const fullTitle = `${title} | Om Ayurveda`;
    document.title = fullTitle;

    // Handle Description Meta Tag
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null; // No longer using Helmet component
};

export default Seo;
