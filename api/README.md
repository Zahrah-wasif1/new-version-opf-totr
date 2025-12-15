# Car Rental Backend API

This is the backend API for the Car Rental application, built with TypeScript and designed to be deployed on Vercel.

## Features

- **Authentication**: User registration and login with JWT tokens
- **Cars Management**: CRUD operations for cars (admin only for create/update/delete)
- **Bookings**: Create and manage car rental bookings
- **Users Management**: Admin panel for user management
- **Contact Form**: Handle contact form submissions

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Cars
- `GET /api/cars` - Get all cars (with filters: type, seats, priceRange, search, available)
- `GET /api/cars/:id` - Get a specific car
- `POST /api/cars` - Create a new car (admin only)
- `PUT /api/cars/:id` - Update a car (admin only)
- `DELETE /api/cars/:id` - Delete a car (admin only)

### Bookings
- `GET /api/bookings` - Get all bookings (user's own bookings, or all if admin)
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete a booking (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get a specific user (admin only)
- `PUT /api/users/:id` - Update a user (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)

### Contact
- `POST /api/contact` - Submit contact form

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Setup

1. Install dependencies:
```bash
cd api
npm install
```

2. Create a `.env` file in the root directory with:
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

3. For local development:
```bash
npm run dev
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `MONGODB_URI` and `JWT_SECRET` in Environment Variables

## Database Models

### User
- name, email, phone, password, role (admin/customer), status (active/inactive)

### Car
- name, type, seats, price, image, description, features, available

### Booking
- userId, carId, startDate, endDate, status, amount, phone, email

## Response Format

Success:
```json
{
  "success": true,
  "data": { ... }
}
```

Error:
```json
{
  "success": false,
  "error": "Error message"
}
```

