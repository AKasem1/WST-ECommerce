import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/Service';
import type {
  CreateServicesRequest,
  CreateServiceRequest,
  ServiceResponse,
  ServiceListResponse,
  BulkCreateServicesResponse,
} from '@/types/service-api';

// Force Node.js runtime (required for MongoDB/crypto)
export const runtime = 'nodejs';

// POST /api/services - Create multiple services
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: CreateServicesRequest = await request.json();
    const { services } = body;

    // Validate request
    if (!services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of services' },
        { status: 400 }
      );
    }

    const created: ServiceResponse[] = [];
    const failed: { service: CreateServiceRequest; error: string }[] = [];

    // Process each service
    for (const serviceData of services) {
      try {
        const { id, name, image, slug } = serviceData;

        // Validate required fields
        if (!id || !name || !image || !slug) {
          failed.push({
            service: serviceData,
            error: 'Missing required fields: id, name, image, or slug',
          });
          continue;
        }

        // Check for duplicate id
        const existingById = await Service.findOne({ id });
        if (existingById) {
          failed.push({
            service: serviceData,
            error: `Service with id ${id} already exists`,
          });
          continue;
        }

        // Check for duplicate slug
        const existingBySlug = await Service.findOne({ slug: slug.toLowerCase() });
        if (existingBySlug) {
          failed.push({
            service: serviceData,
            error: `Service with slug '${slug}' already exists`,
          });
          continue;
        }

        // Create service
        const service = await Service.create({
          id,
          name,
          image,
          slug: slug.toLowerCase(),
        });

        created.push({
          _id: service._id.toString(),
          id: service.id,
          name: service.name,
          image: service.image,
          slug: service.slug,
          createdAt: (service as any).createdAt,
          updatedAt: (service as any).updatedAt,
        });
      } catch (error: any) {
        failed.push({
          service: serviceData,
          error: error.message || 'Failed to create service',
        });
      }
    }

    const response: BulkCreateServicesResponse = {
      created,
      failed,
      summary: {
        total: services.length,
        successful: created.length,
        failed: failed.length,
      },
    };

    // Return 201 if at least one service was created, 400 if all failed
    const statusCode = created.length > 0 ? 201 : 400;
    return NextResponse.json(response, { status: statusCode });
  } catch (error: any) {
    console.error('Create services error:', error);

    return NextResponse.json(
      { error: 'An error occurred while creating services' },
      { status: 500 }
    );
  }
}

// GET /api/services - Get all services with pagination
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
    const [services, total] = await Promise.all([
      Service.find(query).sort({ id: 1 }).skip(skip).limit(limit),
      Service.countDocuments(query),
    ]);

    const serviceResponses: ServiceResponse[] = services.map((service) => ({
      _id: service._id.toString(),
      id: service.id,
      name: service.name,
      image: service.image,
      slug: service.slug,
      createdAt: (service as any).createdAt,
      updatedAt: (service as any).updatedAt,
    }));

    const response: ServiceListResponse = {
      services: serviceResponses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get services error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching services' },
      { status: 500 }
    );
  }
}
