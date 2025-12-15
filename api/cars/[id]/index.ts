import {
  getCarController,
  updateCarController,
  deleteCarController,
} from '../../../backend/controllers/carsController';
import { requireAdmin } from '../../../backend/auth';
import { errorResponse, handleError } from '../../../backend/utils';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return await getCarController(params.id);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    return await updateCarController(params.id, body);
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(req);
    return await deleteCarController(params.id);
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}
