import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import mongoose from 'mongoose';
import type { UpdateCategoryRequest, CategoryResponse } from '@/types/category-api';

// GET /api/categories/[id] - Get single category by MongoDB ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const response: CategoryResponse = {
      _id: category._id.toString(),
      id: category.id,
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get category error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching the category' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const body: UpdateCategoryRequest = await request.json();

    // Check if updating id and if it already exists
    if (body.id !== undefined) {
      const existingCategory = await Category.findOne({
        id: body.id,
        _id: { $ne: id },
      });

      if (existingCategory) {
        return NextResponse.json(
          { error: 'Category with this id already exists' },
          { status: 400 }
        );
      }
    }

    // Check if updating slug and if it already exists
    if (body.slug) {
      const existingCategory = await Category.findOne({
        slug: body.slug.toLowerCase(),
        _id: { $ne: id },
      });

      if (existingCategory) {
        return NextResponse.json(
          { error: 'Category with this slug already exists' },
          { status: 400 }
        );
      }

      // Ensure slug is lowercase
      body.slug = body.slug.toLowerCase();
    }

    // Update category
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const response: CategoryResponse = {
      _id: category._id.toString(),
      id: category.id,
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Update category error:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category with this id or slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while updating the category' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'Category deleted successfully',
        categoryId: id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete category error:', error);

    return NextResponse.json(
      { error: 'An error occurred while deleting the category' },
      { status: 500 }
    );
  }
}
