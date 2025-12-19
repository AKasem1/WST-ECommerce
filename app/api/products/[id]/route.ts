import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';
import type { UpdateProductRequest, ProductResponse } from '@/types/product';

// Force Node.js runtime (required for MongoDB/crypto)
export const runtime = 'nodejs';

// GET /api/products/[id] - Get single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const response: ProductResponse = {
      _id: product._id.toString(),
      modelNumber: product.modelNumber,
      productImage: product.productImage,
      productDescription: product.productDescription,
      quantity: product.quantity,
      msrpPrice: product.msrpPrice,
      dppPrice: product.dppPrice,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get product error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching the product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const body: UpdateProductRequest = await request.json();

    // Validate numeric fields if provided
    if (body.quantity !== undefined && body.quantity < 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than or equal to 0' },
        { status: 400 }
      );
    }

    if (
      (body.msrpPrice !== undefined && body.msrpPrice < 0) ||
      (body.dppPrice !== undefined && body.dppPrice < 0)
    ) {
      return NextResponse.json(
        { error: 'Prices must be greater than or equal to 0' },
        { status: 400 }
      );
    }

    // Check if updating modelNumber and if it already exists
    if (body.modelNumber) {
      const existingProduct = await Product.findOne({
        modelNumber: body.modelNumber,
        _id: { $ne: id },
      });

      if (existingProduct) {
        return NextResponse.json(
          { error: 'Product with this model number already exists' },
          { status: 400 }
        );
      }
    }

    // Update product
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const response: ProductResponse = {
      _id: product._id.toString(),
      modelNumber: product.modelNumber,
      productImage: product.productImage,
      productDescription: product.productDescription,
      quantity: product.quantity,
      msrpPrice: product.msrpPrice,
      dppPrice: product.dppPrice,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Update product error:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Product with this model number already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while updating the product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'Product deleted successfully',
        productId: id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete product error:', error);

    return NextResponse.json(
      { error: 'An error occurred while deleting the product' },
      { status: 500 }
    );
  }
}
