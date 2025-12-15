import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../db';
import User from '../models/User';
import { generateToken } from '../auth';
import { successResponse, errorResponse } from '../utils';

export async function signupController(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { name, email, phone, password } = body;

  if (!name || !email || !password) {
    return errorResponse('Name, email, and password are required', 400);
  }
  if (password.length < 6) {
    return errorResponse('Password must be at least 6 characters', 400);
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return errorResponse('User with this email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    phone,
    password: hashedPassword,
    role: 'customer',
    status: 'active',
  });

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return successResponse(
    {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      token,
    },
    201
  );
}

export async function loginController(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return errorResponse('Email and password are required', 400);
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return errorResponse('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return errorResponse('Invalid email or password', 401);
  }

  if (user.status !== 'active') {
    return errorResponse('Account is inactive', 403);
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return successResponse({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    token,
  });
}

