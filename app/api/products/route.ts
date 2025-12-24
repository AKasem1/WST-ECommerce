import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';
import type {
  CreateProductsRequest,
  CreateProductRequest,
  ProductResponse,
  ProductListResponse,
  BulkCreateProductsResponse,
} from '@/types/product';

// Helper function to generate URL-friendly slug from model number
function generateSlug(modelNumber: string): string {
  return modelNumber
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// POST /api/products - Create multiple products
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: CreateProductsRequest = await request.json();
    const { products } = body;

    // Validate request
    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of products' },
        { status: 400 }
      );
    }

    const created: ProductResponse[] = [];
    const failed: { product: CreateProductRequest; error: string }[] = [];

    // Process each product
    for (const productData of products) {
      try {
        const {
          modelNumber,
          productImage,
          productSpecs,
          quantity,
          price,
          categoryId,
          visibility,
        } = productData;

        // Validate required fields
        if (
          !modelNumber ||
          !productImage ||
          !productSpecs ||
          !Array.isArray(productSpecs) ||
          productSpecs.length === 0 ||
          quantity === undefined ||
          price === undefined ||
          categoryId === undefined
        ) {
          failed.push({
            product: productData,
            error: 'Missing required fields',
          });
          continue;
        }

        // Validate numeric fields
        if (quantity < 0) {
          failed.push({
            product: productData,
            error: 'Quantity must be greater than or equal to 0',
          });
          continue;
        }

        if (price < 0) {
          failed.push({
            product: productData,
            error: 'Price must be greater than or equal to 0',
          });
          continue;
        }

        // Validate categoryId is a valid ObjectId string
        if (!mongoose.Types.ObjectId.isValid(categoryId as any)) {
          failed.push({
            product: productData,
            error: 'Invalid categoryId format',
          });
          continue;
        }

        // Check for duplicate model number
        const existingProduct = await Product.findOne({ modelNumber });
        if (existingProduct) {
          failed.push({
            product: productData,
            error: `Product with model number '${modelNumber}' already exists`,
          });
          continue;
        }

        // Generate unique slug from model number
        let slug = generateSlug(modelNumber);
        let slugCounter = 1;
        
        // Check if slug already exists and make it unique if needed
        while (await Product.findOne({ slug })) {
          slug = `${generateSlug(modelNumber)}-${slugCounter}`;
          slugCounter++;
        }

        // Create product (Mongoose will convert categoryId string to ObjectId)
        const product = await Product.create({
          modelNumber,
          productImage,
          slug,
          productSpecs,
          quantity,
          price,
          categoryId: categoryId as any,
          visibility: visibility ?? true,
        });

        created.push({
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
        });
      } catch (error: any) {
        console.error('Failed to create product:', {
          modelNumber: productData.modelNumber,
          error: error.message,
          stack: error.stack,
        });
        failed.push({
          product: productData,
          error: error.message || 'Failed to create product',
        });
      }
    }

    const response: BulkCreateProductsResponse = {
      created,
      failed,
      summary: {
        total: products.length,
        successful: created.length,
        failed: failed.length,
      },
    };

    // Return 201 if at least one product was created, 400 if all failed
    const statusCode = created.length > 0 ? 201 : 400;
    return NextResponse.json(response, { status: statusCode });
  } catch (error: any) {
    console.error('Create products error:', error);

    return NextResponse.json(
      { error: 'An error occurred while creating products' },
      { status: 500 }
    );
  }
}

// GET /api/products - Get all products with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Filter parameters
    const categoryId = searchParams.get('categoryId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');

    // Build query
    const query: any = {};

    if (categoryId) {
      // Validate and convert categoryId to ObjectId
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        query.categoryId = new mongoose.Types.ObjectId(categoryId);
      } else {
        return NextResponse.json(
          { error: 'Invalid categoryId format' },
          { status: 400 }
        );
      }
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      query.$or = [
        { modelNumber: { $regex: search, $options: 'i' } },
        { productSpecs: { $elemMatch: { $regex: search, $options: 'i' } } },
      ];
    }

    // Execute query with pagination
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    const productResponses: ProductResponse[] = products.map((product) => ({
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
    }));

    const response: ProductListResponse = {
      products: productResponses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get products error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching products' },
      { status: 500 }
    );
  }
}
