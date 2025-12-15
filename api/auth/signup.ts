import { signupController } from '../../backend/controllers/authController';
import { handleError } from '../../backend/utils';

export async function POST(req: Request) {
  try {
    return await signupController(req);
  } catch (error) {
    return handleError(error);
  }
}

