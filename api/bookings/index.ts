import connectDB from '../../backend/db';
import Booking from '../../backend/models/Booking';
import Car from '../../backend/models/Car';
import { successResponse, errorResponse, handleError } from '../../backend/utils';
import { requireAuth } from '../../backend/auth';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    // Check authentication
    const authUser = await requireAuth(req);

    let query: any = {};

    // If not admin, only show their own bookings
    if (authUser.role !== 'admin') {
      query.userId = authUser.userId;
    } else if (userId) {
      query.userId = userId;
    }

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email phone')
      .populate('carId', 'name type seats price image')
      .sort({ createdAt: -1 });

    return successResponse(bookings);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return errorResponse(error.message, 401);
    }
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    // Check authentication
    const authUser = await requireAuth(req);

    const body = await req.json();
    const { carId, startDate, endDate, phone, email } = body;

    // Validation
    if (!carId || !startDate || !endDate) {
      return errorResponse('Car ID, start date, and end date are required', 400);
    }

    // Check if car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return errorResponse('Car not found', 404);
    }

    if (!car.available) {
      return errorResponse('Car is not available for booking', 400);
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      carId,
      status: { $in: ['pending', 'active'] },
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (overlappingBooking) {
      return errorResponse('Car is already booked for the selected dates', 400);
    }

    // Calculate amount
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const amount = days * car.price;

    // Create booking
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

    const populatedBooking = await Booking.findById(booking._id)
      .populate('userId', 'name email phone')
      .populate('carId', 'name type seats price image');

    return successResponse(populatedBooking, 201);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return errorResponse(error.message, 401);
    }
    return handleError(error);
  }
}

