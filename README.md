# Car Rental Application - Full Stack

A complete car rental management system built with React (Frontend) and TypeScript (Backend), deployable on Vercel.

## 🚀 Features

- **Frontend**: React + TypeScript + Vite
- **Backend**: TypeScript + Node.js + MongoDB
- **Authentication**: JWT-based authentication
- **Deployment**: Fully configured for Vercel

## 📁 Project Structure

```
├── api/                    # Backend API (Vercel Serverless Functions)
│   ├── auth/               # Authentication endpoints
│   ├── cars/               # Car management endpoints
│   ├── bookings/           # Booking endpoints
│   ├── users/              # User management endpoints
│   ├── models/             # MongoDB models
│   └── lib/                # Utilities and helpers
├── src/                     # Frontend React application
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── context/            # React context (Auth)
│   └── config/             # Configuration files
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies

```

## 🛠️ Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zahrah-wasif1/new-version-opf-totr.git
   cd new-version-opf-totr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Backend
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   
   # Frontend
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Run development server**
   ```bash
   # For frontend
   npm run dev
   
   # For backend (in another terminal)
   cd api
   npm install
   vercel dev
   ```

## 🚀 Deployment to Vercel

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy:

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `VITE_API_URL` (set after first deploy)
4. Deploy!

## 📚 Documentation

- [Backend Setup](./BACKEND_SETUP.md) - Backend API documentation
- [Deployment Guide](./DEPLOYMENT.md) - Backend deployment instructions
- [Frontend-Backend Connection](./FRONTEND_BACKEND_CONNECTION.md) - Integration guide
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Full-stack deployment guide

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Create car (admin)
- `PUT /api/cars/:id` - Update car (admin)
- `DELETE /api/cars/:id` - Delete car (admin)

### Bookings
- `GET /api/bookings` - Get bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking (admin)

### Users
- `GET /api/users` - Get users (admin)
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Contact
- `POST /api/contact` - Submit contact form

## 🧪 Testing

After deployment, test the application:

1. Visit your Vercel URL
2. Sign up for a new account
3. Login
4. Browse cars
5. Create a booking
6. Test admin features (if admin user)

## 📝 Environment Variables

### Required for Backend:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

### Required for Frontend:
- `VITE_API_URL` - Backend API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues or questions:
- Check the documentation files
- Review Vercel deployment logs
- Check MongoDB connection

---

Built with ❤️ using React, TypeScript, MongoDB, and Vercel
