import { Metadata } from 'next';
import { getWCProductsServer } from '@/lib/woocommerce-server';
import { getSecureImageUrl } from '@/lib/utils';
import ProductDetailClient from './ProductDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const products = await getWCProductsServer();
  const wcProduct = products.find(p => (p.slug === params.slug) || (String(p.id) === String(params.slug)));

  if (!wcProduct) {
    return {
      title: 'Product Not Found | Om Ayurveda',
    };
  }

  const title = `${wcProduct.name} | Om Ayurveda`;
  const description = wcProduct.short_description?.replace(/<[^>]*>?/gm, '') || 'Authentic Ayurvedic formulation.';
  const image = wcProduct.images?.[0]?.src ? getSecureImageUrl(wcProduct.images[0].src) : 'https://omayurveda.co.in/Logo.png';

  return {
    title,
    description,
    alternates: {
      canonical: `https://omayurveda.co.in/product/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://omayurveda.co.in/product/${params.slug}`,
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: wcProduct.name,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductDetailPage(props: Props) {
  const params = await props.params;
  const products = await getWCProductsServer();
  const wcProduct = products.find(p => (p.slug === params.slug) || (String(p.id) === String(params.slug)));

  let cleanedProduct = null;
  let relatedProducts = [];

  if (wcProduct) {
    const hasDiscount = wcProduct.on_sale && wcProduct.regular_price && wcProduct.regular_price !== wcProduct.price;

    // Extract any .mp4 or .webm URLs from the description to add to the gallery
    const videoRegex = /https?:\/\/[^\s"'<>]+\.(?:mp4|webm)/gi;
    const descText = (wcProduct.description || '') + ' ' + (wcProduct.short_description || '');
    const extractedVideos = [...new Set(descText.match(videoRegex) || [])];

    let combinedMedia = wcProduct.images?.length > 0 
      ? wcProduct.images.map((img: any) => getSecureImageUrl(typeof img === 'string' ? img : img.src))
      : ["https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=800"];
    
    combinedMedia = [...combinedMedia, ...extractedVideos];

    cleanedProduct = {
      id: wcProduct.id,
      name: wcProduct.name || "Ayurvedic Formulation",
      category: wcProduct.categories?.[0]?.name || "Wellness",
      price: wcProduct.price || "0",
      regularPrice: wcProduct.regular_price || null,
      onSale: hasDiscount,
      description: wcProduct.description || wcProduct.short_description || "Authentic Ayurvedic formulation.",
      shortDescription: wcProduct.short_description?.replace(/<[^>]*>?/gm, '') || "Premium Ayurvedic wellness solution.",
      images: combinedMedia
    };

    const related = products.filter(p => p.id !== wcProduct.id && p.categories?.[0]?.name === cleanedProduct.category);
    relatedProducts = related.length > 0 ? related : products.filter(p => p.id !== wcProduct.id);
  }

  // Generate Product Schema
  const schema = cleanedProduct ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": cleanedProduct.name,
    "image": cleanedProduct.images[0],
    "description": cleanedProduct.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": "Om Ayurveda"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://omayurveda.co.in/product/${params.slug}`,
      "priceCurrency": "INR",
      "price": cleanedProduct.price,
      "availability": "https://schema.org/InStock"
    }
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream selection:bg-brand-gold selection:text-brand-black">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container px-4 md:px-6">
          <ProductDetailClient product={cleanedProduct} relatedProducts={relatedProducts} />
        </div>
      </main>
    </div>
  );
}