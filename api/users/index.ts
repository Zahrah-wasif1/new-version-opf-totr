import { NextRequest } from 'next/server';
import connectDB from '../lib/db';
import User from '../models/User';
import { successResponse, errorResponse, handleError } from '../lib/utils';
import { requireAdmin } from '../lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Only admin can access users list
    await requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');

    let query: any = {};

    if (role && role !== 'all') {
      query.role = role;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });

    return successResponse(users);
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}

