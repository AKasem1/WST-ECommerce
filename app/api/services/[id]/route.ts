import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/Service';
import type { ServiceResponse, UpdateServiceRequest } from '@/types/service-api';

// Force Node.js runtime (required for MongoDB/crypto)
export const runtime = 'nodejs';

// GET /api/services/[id] - Get single service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const serviceId = parseInt(id);

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    const service = await Service.findOne({ id: serviceId });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const response: ServiceResponse = {
      _id: service._id.toString(),
      id: service.id,
      name: service.name,
      image: service.image,
      slug: service.slug,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get service error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching the service' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const serviceId = parseInt(id);

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    const body: UpdateServiceRequest = await request.json();
    const { name, image, slug } = body;

    // Check if service exists
    const service = await Service.findOne({ id: serviceId });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Check for duplicate slug if slug is being updated
    if (slug && slug !== service.slug) {
      const existingBySlug = await Service.findOne({ slug: slug.toLowerCase() });
      if (existingBySlug) {
        return NextResponse.json(
          { error: `Service with slug '${slug}' already exists` },
          { status: 400 }
        );
      }
    }

    // Update service
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (slug !== undefined) updateData.slug = slug.toLowerCase();

    const updatedService = await Service.findOneAndUpdate(
      { id: serviceId },
      updateData,
      { new: true, runValidators: true }
    );

    const response: ServiceResponse = {
      _id: updatedService!._id.toString(),
      id: updatedService!.id,
      name: updatedService!.name,
      image: updatedService!.image,
      slug: updatedService!.slug,
      createdAt: updatedService!.createdAt,
      updatedAt: updatedService!.updatedAt,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Update service error:', error);

    return NextResponse.json(
      { error: 'An error occurred while updating the service' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const serviceId = parseInt(id);

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    const service = await Service.findOneAndDelete({ id: serviceId });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Service deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete service error:', error);

    return NextResponse.json(
      { error: 'An error occurred while deleting the service' },
      { status: 500 }
    );
  }
}
