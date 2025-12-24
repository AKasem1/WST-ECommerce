import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

async function getProduct(slug: string) {
  try {
    // Fetch all products and find by slug
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products?limit=100`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const product = data.products?.find((p: any) => p.slug === slug);
    
    return product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
