import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Program from '@/models/Program';
import mongoose from 'mongoose';
import type {
  CreateProgramsRequest,
  CreateProgramRequest,
  ProgramResponse,
  ProgramListResponse,
  BulkCreateProgramsResponse,
} from '@/types/program';

// Helper function to generate URL-friendly slug from program name
function generateSlug(name: string): string {
  // First try to transliterate or use English name if available
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  // If slug is empty (e.g., Arabic-only name), use timestamp-based slug
  if (!slug || slug.length === 0) {
    slug = `program-${Date.now()}`;
  }
  
  return slug;
}

// POST /api/programs - Create multiple programs
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: CreateProgramsRequest = await request.json();
    const { programs } = body;

    // Validate request
    if (!programs || !Array.isArray(programs) || programs.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of programs' },
        { status: 400 }
      );
    }

    const created: ProgramResponse[] = [];
    const failed: { program: CreateProgramRequest; error: string }[] = [];

    // Process each program
    for (const programData of programs) {
      try {
        const {
          name,
          nameEn,
          programImage,
          shortDescription,
          fullDescription,
          mainFeatures,
          supportedActivities,
          systemRequirements,
          platforms,
          isFree,
          basePrice,
          hasSubscription,
          subscriptionPackages,
          supportsOffline,
          categoryId,
          visibility,
          downloadLink,
          demoLink,
          documentationLink,
          supportedLanguages,
          version,
          lastUpdated,
        } = programData;

        // Validate required fields
        if (!name || !programImage) {
          failed.push({
            program: programData,
            error: 'Missing required fields (name, programImage)',
          });
          continue;
        }

        // Validate categoryId if provided
        if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId as any)) {
          failed.push({
            program: programData,
            error: 'Invalid categoryId format',
          });
          continue;
        }

        // Check for duplicate name
        const existingProgram = await Program.findOne({ name });
        if (existingProgram) {
          failed.push({
            program: programData,
            error: `Program with name '${name}' already exists`,
          });
          continue;
        }

        // Generate unique slug from name (prefer English name if available)
        let slug = generateSlug(nameEn || name);
        let slugCounter = 1;
        
        // Check if slug already exists and make it unique if needed
        while (await Program.findOne({ slug })) {
          slug = `${generateSlug(nameEn || name)}-${slugCounter}`;
          slugCounter++;
        }

        // Create program
        const program = await Program.create({
          name,
          nameEn,
          slug,
          programImage,
          shortDescription,
          fullDescription,
          mainFeatures: mainFeatures || [],
          supportedActivities: supportedActivities || [],
          systemRequirements,
          platforms: platforms || [],
          isFree: isFree ?? false,
          basePrice,
          hasSubscription: hasSubscription ?? false,
          subscriptionPackages: subscriptionPackages || [],
          supportsOffline: supportsOffline ?? false,
          categoryId: categoryId as any,
          visibility: visibility ?? true,
          downloadLink,
          demoLink,
          documentationLink,
          supportedLanguages: supportedLanguages || ['العربية'],
          version,
          lastUpdated,
        });

        created.push({
          _id: program._id.toString(),
          name: program.name,
          nameEn: program.nameEn,
          slug: program.slug,
          programImage: program.programImage,
          shortDescription: program.shortDescription,
          fullDescription: program.fullDescription,
          mainFeatures: program.mainFeatures,
          supportedActivities: program.supportedActivities,
          systemRequirements: program.systemRequirements,
          platforms: program.platforms,
          isFree: program.isFree,
          basePrice: program.basePrice,
          hasSubscription: program.hasSubscription,
          subscriptionPackages: program.subscriptionPackages,
          supportsOffline: program.supportsOffline,
          categoryId: program.categoryId,
          visibility: program.visibility,
          downloadLink: program.downloadLink,
          demoLink: program.demoLink,
          documentationLink: program.documentationLink,
          supportedLanguages: program.supportedLanguages,
          version: program.version,
          lastUpdated: program.lastUpdated,
          createdAt: program.createdAt,
          updatedAt: program.updatedAt,
        });
      } catch (error: any) {
        console.error('Failed to create program:', {
          name: programData.name,
          error: error.message,
          stack: error.stack,
        });
        failed.push({
          program: programData,
          error: error.message || 'Failed to create program',
        });
      }
    }

    const response: BulkCreateProgramsResponse = {
      created,
      failed,
      summary: {
        total: programs.length,
        successful: created.length,
        failed: failed.length,
      },
    };

    // Return 201 if at least one program was created, 400 if all failed
    const statusCode = created.length > 0 ? 201 : 400;
    return NextResponse.json(response, { status: statusCode });
  } catch (error: any) {
    console.error('Create programs error:', error);

    return NextResponse.json(
      { error: 'An error occurred while creating programs' },
      { status: 500 }
    );
  }
}

// GET /api/programs - Get all programs with pagination and filtering
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
    const isFree = searchParams.get('isFree');
    const platform = searchParams.get('platform');
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

    if (isFree !== null && isFree !== undefined) {
      query.isFree = isFree === 'true';
    }

    if (platform) {
      query.platforms = platform;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameEn: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query with pagination
    const [programs, total] = await Promise.all([
      Program.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Program.countDocuments(query),
    ]);

    const programResponses: ProgramResponse[] = programs.map((program) => ({
      _id: program._id.toString(),
      name: program.name,
      nameEn: program.nameEn,
      slug: program.slug,
      programImage: program.programImage,
      shortDescription: program.shortDescription,
      fullDescription: program.fullDescription,
      mainFeatures: program.mainFeatures,
      supportedActivities: program.supportedActivities,
      systemRequirements: program.systemRequirements,
      platforms: program.platforms,
      isFree: program.isFree,
      basePrice: program.basePrice,
      hasSubscription: program.hasSubscription,
      subscriptionPackages: program.subscriptionPackages,
      supportsOffline: program.supportsOffline,
      categoryId: program.categoryId,
      visibility: program.visibility,
      downloadLink: program.downloadLink,
      demoLink: program.demoLink,
      documentationLink: program.documentationLink,
      supportedLanguages: program.supportedLanguages,
      version: program.version,
      lastUpdated: program.lastUpdated,
      createdAt: program.createdAt,
      updatedAt: program.updatedAt,
    }));

    const response: ProgramListResponse = {
      programs: programResponses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get programs error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching programs' },
      { status: 500 }
    );
  }
}
