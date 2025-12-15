import { NextRequest } from 'next/server';
import connectDB from '../../../lib/db';
import Car from '../../../models/Car';
import { successResponse, errorResponse, handleError } from '../../../lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const car = await Car.findById(params.id);

    if (!car) {
      return errorResponse('Car not found', 404);
    }

    return successResponse(car);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Check authentication and admin role
    const { requireAdmin } = await import('../../../lib/auth');
    await requireAdmin(req);

    const body = await req.json();
    const { name, type, seats, price, image, description, features, available } = body;

    const car = await Car.findByIdAndUpdate(
      params.id,
      {
        ...(name && { name }),
        ...(type && { type }),
        ...(seats && { seats: parseInt(seats) }),
        ...(price && { price: parseFloat(price) }),
        ...(image && { image }),
        ...(description !== undefined && { description }),
        ...(features && { features }),
        ...(available !== undefined && { available }),
      },
      { new: true, runValidators: true }
    );

    if (!car) {
      return errorResponse('Car not found', 404);
    }

    return successResponse(car);
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Check authentication and admin role
    const { requireAdmin } = await import('../../../lib/auth');
    await requireAdmin(req);

    const car = await Car.findByIdAndDelete(params.id);

    if (!car) {
      return errorResponse('Car not found', 404);
    }

    return successResponse({ message: 'Car deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}

