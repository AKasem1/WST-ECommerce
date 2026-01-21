import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import type { LoginRequest, AuthResponse, ErrorResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Find user by email (include password field for comparison)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

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

    return NextResponse.json<AuthResponse>(response, { status: 200 });
  } catch (error: any) {
    console.error('Login error:', error);

    return NextResponse.json<ErrorResponse>(
      { error: 'An error occurred during login. Please try again.' },
      { status: 500 }
    );
  }
}
