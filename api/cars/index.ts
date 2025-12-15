import { NextRequest } from 'next/server';
import connectDB from '../lib/db';
import Car from '../models/Car';
import { successResponse, errorResponse, handleError } from '../lib/utils';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const seats = searchParams.get('seats');
    const priceRange = searchParams.get('priceRange');
    const search = searchParams.get('search');
    const available = searchParams.get('available');

    let query: any = {};

    // Filter by type
    if (type && type !== 'all') {
      query.type = type;
    }

    // Filter by seats
    if (seats && seats !== 'all') {
      query.seats = { $gte: parseInt(seats) };
    }

    // Filter by price range
    if (priceRange && priceRange !== 'all') {
      if (priceRange.includes('-')) {
        const [min, max] = priceRange.split('-').map(Number);
        query.price = { $gte: min };
        if (max) {
          query.price.$lte = max;
        }
      } else {
        query.price = { $gte: parseInt(priceRange) };
      }
    }

    // Filter by availability
    if (available !== null && available !== undefined) {
      query.available = available === 'true';
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const cars = await Car.find(query).sort({ createdAt: -1 });

    return successResponse(cars);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Check authentication and admin role
    const { requireAdmin } = await import('../lib/auth');
    await requireAdmin(req);

    const body = await req.json();
    const { name, type, seats, price, image, description, features, available } = body;

    // Validation
    if (!name || !type || !seats || !price || !image) {
      return errorResponse('Name, type, seats, price, and image are required', 400);
    }

    const car = await Car.create({
      name,
      type,
      seats: parseInt(seats),
      price: parseFloat(price),
      image,
      description,
      features: features || [],
      available: available !== undefined ? available : true,
    });

    return successResponse(car, 201);
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return handleError(error);
  }
}

