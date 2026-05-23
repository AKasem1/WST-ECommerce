import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

// GET /api/products/featured-by-category
// Returns one visible product per category (most recently created), with category name attached
export async function GET() {
  try {
    await dbConnect();

    const products = await Product.aggregate([
      { $match: { visibility: true } },
      { $sort: { createdAt: -1 } },
      // Pick the first (newest) product per category
      { $group: { _id: '$categoryId', doc: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$doc' } },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      // Only include products that have a matching category
      { $unwind: '$category' },
      {
        $project: {
          _id: 1,
          modelNumber: 1,
          productImage: 1,
          slug: 1,
          productSpecs: 1,
          quantity: 1,
          price: 1,
          categoryId: 1,
          visibility: 1,
          createdAt: 1,
          updatedAt: 1,
          categoryName: '$category.name',
          categorySlug: '$category.slug',
        },
      },
    ]);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error('Featured-by-category error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching featured products' },
      { status: 500 }
    );
  }
}
