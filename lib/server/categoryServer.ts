import type { CategoryResponse } from '@/types/category-api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Fetch all categories from the API
 * This is a server-side function
 */
export async function getCategories(): Promise<CategoryResponse[]> {
  try {
    const response = await fetch(`${API_URL}/api/categories?limit=100`, {
      cache: 'no-store', // Always fetch fresh data
      // Alternatively, use revalidation:
      // next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
