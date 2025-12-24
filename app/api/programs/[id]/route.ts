import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Program from '@/models/Program';
import mongoose from 'mongoose';
import type { UpdateProgramRequest, ProgramResponse } from '@/types/program';

// Force Node.js runtime (required for MongoDB/crypto)
export const runtime = 'nodejs';

// GET /api/programs/[id] - Get single program by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid program ID' }, { status: 400 });
    }

    const program = await Program.findById(id);

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const response: ProgramResponse = {
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
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get program error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching the program' },
      { status: 500 }
    );
  }
}

// PUT /api/programs/[id] - Update program
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid program ID' }, { status: 400 });
    }

    const body: UpdateProgramRequest = await request.json();

    // Check if updating name and if it already exists
    if (body.name) {
      const existingProgram = await Program.findOne({
        name: body.name,
        _id: { $ne: id },
      });

      if (existingProgram) {
        return NextResponse.json(
          { error: 'Program with this name already exists' },
          { status: 400 }
        );
      }
    }

    // Update program
    const program = await Program.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const response: ProgramResponse = {
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
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Update program error:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Program with this name already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while updating the program' },
      { status: 500 }
    );
  }
}

// DELETE /api/programs/[id] - Delete program
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid program ID' }, { status: 400 });
    }

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'Program deleted successfully',
        programId: id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete program error:', error);

    return NextResponse.json(
      { error: 'An error occurred while deleting the program' },
      { status: 500 }
    );
  }
}
