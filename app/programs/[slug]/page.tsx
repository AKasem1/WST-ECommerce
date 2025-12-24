import { notFound } from 'next/navigation';
import ProgramDetailClient from '@/components/ProgramDetailClient';

async function getProgram(slug: string) {
  try {
    // Fetch all programs and find by slug
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/programs?limit=100`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const program = data.programs?.find((p: any) => p.slug === slug);
    
    return program || null;
  } catch (error) {
    console.error('Error fetching program:', error);
    return null;
  }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  return <ProgramDetailClient program={program} />;
}
