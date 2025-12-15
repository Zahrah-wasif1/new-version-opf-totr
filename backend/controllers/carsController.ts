import { NextRequest } from 'next/server';
import connectDB from '../db';
import Car from '../models/Car';
import { successResponse, errorResponse } from '../utils';

export async function listCarsController(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const seats = searchParams.get('seats');
  const priceRange = searchParams.get('priceRange');
  const search = searchParams.get('search');
  const available = searchParams.get('available');

  const query: any = {};

  if (type && type !== 'all') query.type = type;
  if (seats && seats !== 'all') query.seats = { $gte: parseInt(seats) };

  if (priceRange && priceRange !== 'all') {
    if (priceRange.includes('-')) {
      const [min, max] = priceRange.split('-').map(Number);
      query.price = { $gte: min };
      if (max) query.price.$lte = max;
    } else {
      query.price = { $gte: parseInt(priceRange) };
    }
  }

  if (available !== null && available !== undefined) {
    query.available = available === 'true';
  }
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  const cars = await Car.find(query).sort({ createdAt: -1 });
  return successResponse(cars);
}

export async function createCarController(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { name, type, seats, price, image, description, features, available } = body;

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
}

export async function getCarController(id: string) {
  await connectDB();
  const car = await Car.findById(id);
  if (!car) return errorResponse('Car not found', 404);
  return successResponse(car);
}

export async function updateCarController(id: string, body: any) {
  await connectDB();
  const { name, type, seats, price, image, description, features, available } = body;

  const car = await Car.findByIdAndUpdate(
    id,
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

  if (!car) return errorResponse('Car not found', 404);
  return successResponse(car);
}

export async function deleteCarController(id: string) {
  await connectDB();
  const car = await Car.findByIdAndDelete(id);
  if (!car) return errorResponse('Car not found', 404);
  return successResponse({ message: 'Car deleted successfully' });
}

