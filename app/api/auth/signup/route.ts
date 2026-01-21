import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import type { SignupRequest, AuthResponse, ErrorResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body: SignupRequest = await request.json();
    const { name, email, phone, password, role } = body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Please provide all required fields: name, email, phone, password' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json<ErrorResponse>(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user (password will be hashed by the pre-save hook)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role: role || 'user',
    });

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Return user data (excluding password) and token
    const response: AuthResponse = {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };

    return NextResponse.json<AuthResponse>(response, { status: 201 });
  } catch (error: any) {
    console.error('Signup error:', error);

    // Handle duplicate key error (in case of race condition)
    if (error.code === 11000) {
      return NextResponse.json<ErrorResponse>(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json<ErrorResponse>(
      { error: 'An error occurred during signup. Please try again.' },
      { status: 500 }
    );
  }
}
