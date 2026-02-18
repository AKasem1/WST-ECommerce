import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import type { ProductResponse } from '@/types/product';

// Force Node.js runtime (required for MongoDB/crypto)
export const runtime = 'nodejs';

// GET /api/products/[slug] - Get single product by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const response: ProductResponse = {
      _id: product._id.toString(),
      modelNumber: product.modelNumber,
      productImage: product.productImage,
      slug: product.slug,
      productSpecs: product.productSpecs,
      quantity: product.quantity,
      price: product.price,
      categoryId: product.categoryId,
      visibility: product.visibility,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get product by slug error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching the product' },
      { status: 500 }
    );
  }
}
