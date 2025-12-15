
import { NextRequest } from 'next/server';
import {
  listCarsController,
  createCarController,
} from '../../backend/controllers/carsController';
import { handleError, errorResponse } from '../../backend/utils';
import { requireAdmin } from '../../backend/auth';

export async function GET(req: NextRequest) {
  try {
    return await listCarsController(req);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    return await createCarController(req);
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}

