import { NextRequest } from 'next/server';
import connectDB from '../../../../backend/db';
import Booking from '../../../../backend/models/Booking';
import { successResponse, errorResponse, handleError } from '../../../../backend/utils';
import { requireAuth, requireAdmin } from '../../../../backend/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Check authentication
    const authUser = await requireAuth(req);

    const booking = await Booking.findById(params.id)
      .populate('userId', 'name email phone')
      .populate('carId', 'name type seats price image');

    if (!booking) {
      return errorResponse('Booking not found', 404);
    }

    // If not admin, only allow access to own bookings
    if (authUser.role !== 'admin' && booking.userId._id.toString() !== authUser.userId) {
      return errorResponse('Forbidden', 403);
    }

    return successResponse(booking);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return errorResponse(error.message, 401);
    }
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Check authentication
    const authUser = await requireAuth(req);

    const booking = await Booking.findById(params.id);

    if (!booking) {
      return errorResponse('Booking not found', 404);
    }

    // Only admin can update bookings, or user can cancel their own
    const body = await req.json();
    const { status } = body;

    if (authUser.role !== 'admin') {
      if (booking.userId.toString() !== authUser.userId) {
        return errorResponse('Forbidden', 403);
      }
      // Users can only cancel their own bookings
      if (status && status !== 'cancelled') {
        return errorResponse('You can only cancel your own bookings', 403);
      }
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      params.id,
      {
        ...(status && { status }),
      },
      { new: true, runValidators: true }
    )
      .populate('userId', 'name email phone')
      .populate('carId', 'name type seats price image');

    return successResponse(updatedBooking);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return errorResponse(error.message, 401);
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

    // Only admin can delete bookings
    await requireAdmin(req);

    const booking = await Booking.findByIdAndDelete(params.id);

    if (!booking) {
      return errorResponse('Booking not found', 404);
    }

    return successResponse({ message: 'Booking deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}

