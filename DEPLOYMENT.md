# Deployment Guide for Car Rental Backend

## Prerequisites

1. MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
2. Vercel account (free tier available at https://vercel.com)

## Step 1: Set up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new cluster (choose the free tier)
4. Create a database user:
   - Go to Database Access
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
5. Whitelist your IP:
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add specific IPs
6. Get your connection string:
   - Go to Clusters
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `car-rental` or your preferred database name

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Navigate to your project directory:
```bash
cd "C:\Users\123\Downloads\udevs car rental project\udevs car rental project\track_ontrack_rental"
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (select your account)
   - Link to existing project? **No**
   - Project name? (press Enter for default or enter a name)
   - Directory? (press Enter for current directory)
   - Override settings? **No**

6. Set environment variables:
```bash
vercel env add MONGODB_URI
# Paste your MongoDB connection string when prompted

vercel env add JWT_SECRET
# Enter a strong random string (e.g., use: openssl rand -base64 32)
```

7. Redeploy with environment variables:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Sign in or create an account
3. Click "Add New Project"
4. Import your Git repository (GitHub, GitLab, or Bitbucket)
   - Or drag and drop your project folder
5. Configure the project:
   - Framework Preset: **Other**
   - Root Directory: `.` (current directory)
   - Build Command: Leave empty (or `npm run build` if you have one)
   - Output Directory: Leave empty
6. Add Environment Variables:
   - Go to Project Settings → Environment Variables
   - Add `MONGODB_URI` with your MongoDB connection string
   - Add `JWT_SECRET` with a strong random string
7. Click "Deploy"

## Step 3: Verify Deployment

1. After deployment, Vercel will provide you with a URL like: `https://your-project.vercel.app`
2. Test the API endpoints:
   - `GET https://your-project.vercel.app/api/cars` - Should return an empty array or cars
   - `POST https://your-project.vercel.app/api/auth/signup` - Test user registration

## Step 4: Update Frontend

Update your frontend to use the deployed API URL:

1. Create a config file in your frontend:
```typescript
// src/config/api.ts
export const API_BASE_URL = process.env.VITE_API_URL || 'https://your-project.vercel.app/api';
```

2. Update your API calls to use this base URL

## Environment Variables

### Required Variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secret key for JWT token generation (use a strong random string)

### Optional Variables:
- `NODE_ENV`: Set to `production` for production deployment

## API Base URL

After deployment, your API will be available at:
```
https://your-project.vercel.app/api
```

## Testing the API

You can test the API using:
- Postman
- curl
- Your frontend application
- Browser (for GET requests)

Example:
```bash
# Sign up
curl -X POST https://your-project.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Get cars
curl https://your-project.vercel.app/api/cars
```

## Troubleshooting

### Connection Issues
- Verify MongoDB Atlas IP whitelist includes Vercel's IPs (or allow all IPs for testing)
- Check that your MongoDB connection string is correct
- Ensure database user has proper permissions

### Environment Variables
- Make sure environment variables are set in Vercel dashboard
- Redeploy after adding environment variables
- Check Vercel logs for errors

### CORS Issues
- The API includes CORS support
- If you encounter CORS errors, check the frontend URL is allowed

## Next Steps

1. Create an admin user (you can do this through the signup endpoint and then manually update the role in MongoDB)
2. Test all API endpoints
3. Integrate the API with your frontend
4. Set up monitoring and logging (optional)

