import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../lib/db';
import User from '../models/User';
import { generateToken, successResponse, errorResponse, handleError } from '../lib/utils';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return errorResponse('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse('Invalid email or password', 401);
    }

    // Check if user is active
    if (user.status !== 'active') {
      return errorResponse('Account is inactive', 403);
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Return user data (without password)
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      token,
    };

    return successResponse(userData);
  } catch (error) {
    return handleError(error);
  }
}

