# Frontend-Backend Connection Guide

## ✅ What Has Been Connected

### 1. **API Service Layer**
- Created `src/services/api.ts` - Centralized API service for all backend calls
- Created `src/config/api.ts` - API configuration and auth token management

### 2. **Authentication System**
- Created `src/context/AuthContext.tsx` - React context for managing authentication state
- Updated `src/main.tsx` - Wrapped app with AuthProvider
- Updated `src/pages/Login/Login.tsx` - Connected to backend login API
- Updated `src/pages/Signup/Signup.tsx` - Connected to backend signup API

### 3. **Cars Management**
- Updated `src/pages/Cars/Cars.tsx` - Fetches cars from backend API
- Updated `src/pages/CarDetail/CarDetail.tsx` - Fetches car details and handles bookings

### 4. **Contact Form**
- Updated `src/pages/Contact/Contact.tsx` - Submits contact form to backend

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, update with your Vercel backend URL:
```env
VITE_API_URL=https://your-project.vercel.app/api
```

## 📡 API Integration Details

### Authentication Flow
1. User signs up/logs in → Frontend calls API
2. Backend returns JWT token → Stored in localStorage
3. Token included in all subsequent API requests
4. AuthContext manages user state across the app

### API Endpoints Used

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

#### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Create car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)

#### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings

#### Contact
- `POST /api/contact` - Submit contact form

## 🚀 How to Use

### 1. Set Up Backend
- Deploy backend to Vercel (see `DEPLOYMENT.md`)
- Get your backend URL

### 2. Configure Frontend
- Create `.env` file with `VITE_API_URL`
- Update the URL with your deployed backend

### 3. Run Frontend
```bash
npm install
npm run dev
```

### 4. Test Connection
- Sign up a new user
- Login with credentials
- Browse cars (should load from backend)
- Create a booking
- Submit contact form

## 🔐 Authentication

The app uses JWT tokens for authentication:
- Token stored in `localStorage` as `authToken`
- User data stored as `userData`
- Token automatically included in API requests
- Protected routes check authentication status

## 📝 Next Steps

### Admin Components (Still Need Integration)
- `src/pages/Admin/Cars/AdminCars.tsx` - Connect CRUD operations
- `src/pages/Admin/Bookings/AdminBookings.tsx` - Connect booking management
- `src/pages/Admin/Users/AdminUsers.tsx` - Connect user management

### Features to Add
- Protected routes (redirect to login if not authenticated)
- Admin route protection
- Error handling improvements
- Loading states
- Toast notifications for success/error messages

## 🐛 Troubleshooting

### API Calls Not Working
1. Check `.env` file has correct `VITE_API_URL`
2. Verify backend is deployed and accessible
3. Check browser console for CORS errors
4. Verify backend environment variables are set

### Authentication Issues
1. Check token is being stored in localStorage
2. Verify token format in Authorization header
3. Check backend JWT_SECRET is set

### CORS Errors
- Backend should handle CORS (already configured)
- Check backend allows your frontend origin

## 📚 Files Modified

- `src/main.tsx` - Added AuthProvider
- `src/App.tsx` - Removed duplicate Router
- `src/pages/Login/Login.tsx` - Backend integration
- `src/pages/Signup/Signup.tsx` - Backend integration
- `src/pages/Cars/Cars.tsx` - Backend integration
- `src/pages/CarDetail/CarDetail.tsx` - Backend integration
- `src/pages/Contact/Contact.tsx` - Backend integration

## 📚 Files Created

- `src/config/api.ts` - API configuration
- `src/services/api.ts` - API service layer
- `src/context/AuthContext.tsx` - Authentication context
- `.env.example` - Environment variables example

