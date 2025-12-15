import { NextRequest } from 'next/server';
import { signupController } from '../../backend/controllers/authController';
import { handleError } from '../../backend/utils';

export async function POST(req: NextRequest) {
  try {
    return await signupController(req);
  } catch (error) {
    return handleError(error);
  }
}

