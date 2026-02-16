import ProductsClient from '@/components/dashboard/ProductsClient';

async function getProducts(params: { page?: string; limit?: string; categoryId?: string; search?: string }) {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.set('page', params.page);
    if (params.limit) queryParams.set('limit', params.limit);
    if (params.categoryId) queryParams.set('categoryId', params.categoryId);
    if (params.search) queryParams.set('search', params.search);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products?${queryParams.toString()}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return { products: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }

    const data = await response.json();
    return {
      products: data.products || [],
      pagination: data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }
}

async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/categories?limit=100`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; categoryId?: string; search?: string }>;
}) {
  const { page = '1', categoryId, search } = await searchParams;
  
  const [{ products, pagination }, categories] = await Promise.all([
    getProducts({ page, categoryId, search }),
    getCategories(),
  ]);

  return (
    <ProductsClient 
      initialProducts={products} 
      categories={categories} 
      pagination={pagination}
    />
  );
}
