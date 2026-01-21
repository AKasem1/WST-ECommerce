import InquiriesClient from '@/components/dashboard/InquiriesClient';

async function getInquiries() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/inquiries?limit=100`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.inquiries || [];
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  return <InquiriesClient initialInquiries={inquiries} />;
}
