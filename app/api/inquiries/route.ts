import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Inquiry from '@/models/Inquiry';
import type {
  CreateInquiryRequest,
  InquiryResponse,
  InquiryListResponse,
} from '@/types/inquiry';

// Force Node.js runtime (required for MongoDB)
export const runtime = 'nodejs';

// POST /api/inquiries - Create new inquiry
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: CreateInquiryRequest = await request.json();
    const { name, phone, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (name, phone, message)' },
        { status: 400 }
      );
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      name,
      phone,
      message,
    });

    const response: InquiryResponse = {
      _id: inquiry._id.toString(),
      name: inquiry.name,
      phone: inquiry.phone,
      message: inquiry.message,
      createdAt: inquiry.createdAt,
      updatedAt: inquiry.updatedAt,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error('Create inquiry error:', error);

    return NextResponse.json(
      { error: 'An error occurred while creating the inquiry' },
      { status: 500 }
    );
  }
}

// GET /api/inquiries - Get all inquiries with pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [inquiries, total] = await Promise.all([
      Inquiry.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Inquiry.countDocuments({}),
    ]);

    const inquiryResponses: InquiryResponse[] = inquiries.map((inquiry) => ({
      _id: inquiry._id.toString(),
      name: inquiry.name,
      phone: inquiry.phone,
      message: inquiry.message,
      createdAt: inquiry.createdAt,
      updatedAt: inquiry.updatedAt,
    }));

    const response: InquiryListResponse = {
      inquiries: inquiryResponses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get inquiries error:', error);

    return NextResponse.json(
      { error: 'An error occurred while fetching inquiries' },
      { status: 500 }
    );
  }
}
