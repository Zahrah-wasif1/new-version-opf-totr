<<<<<<< HEAD
import {
  getCarController,
  updateCarController,
  deleteCarController,
} from '../../../../backend/controllers/carsController';
import { requireAdmin } from '../../../../backend/auth';
import { errorResponse, handleError } from '../../../../backend/utils';

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

=======
declare module 'backend/controllers/carsController' {
  export function getCarController(id: string): Promise<any>;
  export function updateCarController(id: string, data: any): Promise<any>;
  export function deleteCarController(id: string): Promise<any>;
}

declare module 'backend/auth' {
  import { Request } from 'express';
  export function requireAdmin(req: Request): Promise<void>;
}

declare module 'backend/utils' {
  export function errorResponse(message: string, status?: number): any;
  export function handleError(error: any): any;
}
>>>>>>> 8eeb0a6 (Initial commit)
