import { Suspense } from 'react';
import ShopClient from '@/components/ShopClient';
import { getCategories } from '@/lib/server/categoryServer';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products?page=1&limit=10`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return {
      products: data.products || [],
      total: data.pagination?.total || 0,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0 };
  }
}

export default async function ShopPage() {
  const [productsData, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <ShopClient
        initialProducts={productsData.products}
        initialCategories={categories}
        initialTotal={productsData.total}
      />
    </Suspense>
  );
}
