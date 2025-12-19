import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Service from '@/models/Service';
import type { DashboardStats } from '@/types/dashboard';

// Force Node.js runtime (required for MongoDB/crypto)
export const runtime = 'nodejs';

// GET /api/dashboard/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get date for "recent" items (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch all stats in parallel
    const [
      totalCategories,
      recentCategories,
      totalProducts,
      recentProducts,
      lowStockProducts,
      totalServices,
      recentServices,
    ] = await Promise.all([
      Category.countDocuments(),
      Category.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Product.countDocuments(),
      Product.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Product.countDocuments({ quantity: { $lt: 10 } }),
      Service.countDocuments(),
      Service.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    ]);

    const stats: DashboardStats = {
      categories: {
        total: totalCategories,
        recent: recentCategories,
      },
      products: {
        total: totalProducts,
        recent: recentProducts,
        lowStock: lowStockProducts,
      },
      services: {
        total: totalServices,
        recent: recentServices,
      },
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error: any) {
    console.error('Get dashboard stats error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching dashboard statistics' },
      { status: 500 }
    );
  }
}
