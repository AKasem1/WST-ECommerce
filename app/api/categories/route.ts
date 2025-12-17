import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import type {
  CreateCategoriesRequest,
  CategoryResponse,
  CategoryListResponse,
  BulkCreateResponse,
  CreateCategoryRequest,
} from '@/types/category-api';

// POST /api/categories - Create multiple categories
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: CreateCategoriesRequest = await request.json();
    const { categories } = body;

    // Validate request
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of categories' },
        { status: 400 }
      );
    }

    const created: CategoryResponse[] = [];
    const failed: { category: CreateCategoryRequest; error: string }[] = [];

    // Process each category
    for (const categoryData of categories) {
      try {
        const { id, name, slug } = categoryData;

        // Validate required fields
        if (!id || !name || !slug) {
          failed.push({
            category: categoryData,
            error: 'Missing required fields: id, name, or slug',
          });
          continue;
        }

        // Check for duplicate id
        const existingById = await Category.findOne({ id });
        if (existingById) {
          failed.push({
            category: categoryData,
            error: `Category with id ${id} already exists`,
          });
          continue;
        }

        // Check for duplicate slug
        const existingBySlug = await Category.findOne({ slug: slug.toLowerCase() });
        if (existingBySlug) {
          failed.push({
            category: categoryData,
            error: `Category with slug '${slug}' already exists`,
          });
          continue;
        }

        // Create category
        const category = await Category.create({
          id,
          name,
          slug: slug.toLowerCase(),
        });

        created.push({
          _id: category._id.toString(),
          id: category.id,
          name: category.name,
          slug: category.slug,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        });
      } catch (error: any) {
        failed.push({
          category: categoryData,
          error: error.message || 'Failed to create category',
        });
      }
    }

    const response: BulkCreateResponse = {
      created,
      failed,
      summary: {
        total: categories.length,
        successful: created.length,
        failed: failed.length,
      },
    };

    // Return 201 if at least one category was created, 400 if all failed
    const statusCode = created.length > 0 ? 201 : 400;
    return NextResponse.json(response, { status: statusCode });
  } catch (error: any) {
    console.error('Create categories error:', error);

    return NextResponse.json(
      { error: 'An error occurred while creating categories' },
      { status: 500 }
    );
  }
}

// GET /api/categories - Get all categories with pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    // Filter parameters
    const search = searchParams.get('search');

    // Build query
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query with pagination
    const [categories, total] = await Promise.all([
      Category.find(query).sort({ id: 1 }).skip(skip).limit(limit),
      Category.countDocuments(query),
    ]);

    const categoryResponses: CategoryResponse[] = categories.map((category) => ({
      _id: category._id.toString(),
      id: category.id,
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));

    const response: CategoryListResponse = {
      categories: categoryResponses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get categories error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching categories' },
      { status: 500 }
    );
  }
}
