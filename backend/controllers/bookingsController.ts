import { NextRequest } from 'next/server';
import connectDB from '../db';
import Booking from '../models/Booking';
import Car from '../models/Car';
import { successResponse, errorResponse } from '../utils';
import { requireAuth, requireAdmin } from '../auth';

export async function listBookingsController(req: NextRequest) {
  await connectDB();
  const authUser = await requireAuth(req);
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const userId = searchParams.get('userId');

  const query: any = {};
  if (authUser.role !== 'admin') {
    query.userId = authUser.userId;
  } else if (userId) {
    query.userId = userId;
  }
  if (status && status !== 'all') {
    query.status = status;
  }

  const bookings = await Booking.find(query)
    .populate('userId', 'name email phone')
    .populate('carId', 'name type seats price image')
    .sort({ createdAt: -1 });

  return successResponse(bookings);
}

export async function getBookingController(req: NextRequest, id: string) {
  await connectDB();
  const authUser = await requireAuth(req);

  const booking = await Booking.findById(id)
    .populate('userId', 'name email phone')
    .populate('carId', 'name type seats price image');

  if (!booking) return errorResponse('Booking not found', 404);
  if (authUser.role !== 'admin' && booking.userId._id.toString() !== authUser.userId) {
    return errorResponse('Forbidden', 403);
  }
  return successResponse(booking);
}

export async function createBookingController(req: NextRequest) {
  await connectDB();
  const authUser = await requireAuth(req);
  const body = await req.json();
  const { carId, startDate, endDate, phone, email } = body;

  if (!carId || !startDate || !endDate) {
    return errorResponse('Car ID, start date, and end date are required', 400);
  }

  const car = await Car.findById(carId);
  if (!car) return errorResponse('Car not found', 404);
  if (!car.available) return errorResponse('Car is not available for booking', 400);

  const overlapping = await Booking.findOne({
    carId,
    status: { $in: ['pending', 'active'] },
    $or: [
      {
        startDate: { $lte: new Date(endDate) },
        endDate: { $gte: new Date(startDate) },
      },
    ],
  });
  if (overlapping) return errorResponse('Car is already booked for the selected dates', 400);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const amount = days * car.price;

  const booking = await Booking.create({
    userId: authUser.userId,
    carId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    status: 'pending',
    amount,
    phone: phone || authUser.email,
    email: email || authUser.email,
  });

  const populated = await Booking.findById(booking._id)
    .populate('userId', 'name email phone')
    .populate('carId', 'name type seats price image');

  return successResponse(populated, 201);
}

export async function updateBookingController(req: NextRequest, id: string) {
  await connectDB();
  const authUser = await requireAuth(req);
  const booking = await Booking.findById(id);
  if (!booking) return errorResponse('Booking not found', 404);

  const body = await req.json();
  const { status } = body;

  if (authUser.role !== 'admin') {
    if (booking.userId.toString() !== authUser.userId) {
      return errorResponse('Forbidden', 403);
    }
    if (status && status !== 'cancelled') {
      return errorResponse('You can only cancel your own bookings', 403);
    }
  }

  const updated = await Booking.findByIdAndUpdate(
    id,
    { ...(status && { status }) },
    { new: true, runValidators: true }
  )
    .populate('userId', 'name email phone')
    .populate('carId', 'name type seats price image');

  return successResponse(updated);
}

export async function deleteBookingController(req: NextRequest, id: string) {
  await connectDB();
  await requireAdmin(req);
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) return errorResponse('Booking not found', 404);
  return successResponse({ message: 'Booking deleted successfully' });
}

