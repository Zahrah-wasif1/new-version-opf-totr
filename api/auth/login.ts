import { loginController } from '../../backend/controllers/authController';
import { handleError } from '../../backend/utils';

export async function POST(req: Request) {
  try {
    return await loginController(req);
  } catch (error: any) {
    return handleError(error);
  }
}
