import { NextRequest } from 'next/server';
import connectDB from '../db';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils';
import { requireAdmin } from '../auth';

export async function listUsersController(req: NextRequest) {
  await connectDB();
  await requireAdmin(req);

  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role');
  const status = searchParams.get('status');

  const query: any = {};
  if (role && role !== 'all') query.role = role;
  if (status && status !== 'all') query.status = status;

  const users = await User.find(query).select('-password').sort({ createdAt: -1 });
  return successResponse(users);
}

export async function getUserController(req: NextRequest, id: string) {
  await connectDB();
  await requireAdmin(req);

  const user = await User.findById(id).select('-password');
  if (!user) return errorResponse('User not found', 404);
  return successResponse(user);
}

export async function updateUserController(req: NextRequest, id: string) {
  await connectDB();
  await requireAdmin(req);

  const body = await req.json();
  const { name, email, phone, role, status } = body;

  const user = await User.findByIdAndUpdate(
    id,
    {
      ...(name && { name }),
      ...(email && { email: email.toLowerCase() }),
      ...(phone !== undefined && { phone }),
      ...(role && { role }),
      ...(status && { status }),
    },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) return errorResponse('User not found', 404);
  return successResponse(user);
}

export async function deleteUserController(req: NextRequest, id: string) {
  await connectDB();
  await requireAdmin(req);

  const user = await User.findByIdAndDelete(id);
  if (!user) return errorResponse('User not found', 404);
  return successResponse({ message: 'User deleted successfully' });
}

