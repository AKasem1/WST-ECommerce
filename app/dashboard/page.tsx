import DashboardStats from '@/components/dashboard/DashboardStats';

async function getDashboardStats() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/dashboard/stats`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch dashboard stats');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900" dir="rtl">
          لوحة التحكم
        </h1>
        <p className="text-gray-600 mt-2" dir="rtl">
          مرحباً بك في لوحة التحكم
        </p>
      </div>

      {stats ? (
        <DashboardStats stats={stats} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500" dir="rtl">
            فشل في تحميل الإحصائيات
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            إجراءات سريعة
          </h3>
          <div className="space-y-2">
            <a
              href="/dashboard/categories"
              className="block text-blue-600 hover:text-blue-700 hover:underline"
            >
              إدارة الفئات
            </a>
            <a
              href="/dashboard/products"
              className="block text-blue-600 hover:text-blue-700 hover:underline"
            >
              إدارة المنتجات
            </a>
            <a
              href="/dashboard/services"
              className="block text-blue-600 hover:text-blue-700 hover:underline"
            >
              إدارة الخدمات
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
