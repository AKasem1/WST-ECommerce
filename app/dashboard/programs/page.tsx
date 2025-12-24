import ProgramsClient from '@/components/dashboard/ProgramsClient';

async function getPrograms() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/programs?limit=100`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.programs || [];
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
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

export default async function ProgramsPage() {
  const [programs, categories] = await Promise.all([
    getPrograms(),
    getCategories(),
  ]);

  return <ProgramsClient initialPrograms={programs} categories={categories} />;
}
