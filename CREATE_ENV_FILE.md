# How to Create .env File

Since `.env` files are in `.gitignore` (for security), you need to create it manually.

## Steps to Create .env File

### Option 1: Copy from env.example

1. **Copy the example file:**
   ```bash
   # Windows PowerShell
   Copy-Item env.example .env
   
   # Windows CMD
   copy env.example .env
   
   # Mac/Linux
   cp env.example .env
   ```

2. **Edit the .env file** and update with your actual values:
   - Replace `MONGODB_URI` with your MongoDB Atlas connection string
   - Replace `JWT_SECRET` with a strong random string
   - Update `VITE_API_URL` for production (after deployment)

### Option 2: Create Manually

1. **Create a new file** named `.env` in the root directory

2. **Add these variables:**

```env
# Backend Environment Variables
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development

# Frontend Environment Variables
VITE_API_URL=http://localhost:3000/api
```

3. **Update the values:**
   - Get `MONGODB_URI` from MongoDB Atlas
   - Generate `JWT_SECRET` (use: `openssl rand -base64 32`)
   - For production, update `VITE_API_URL` after deployment

## Important Notes

- ✅ `.env` file is already in `.gitignore` (won't be committed)
- ✅ Never commit `.env` file to Git
- ✅ Use `env.example` as a template
- ✅ For Vercel deployment, set environment variables in Vercel dashboard

## For Vercel Deployment

Don't upload `.env` file. Instead, set environment variables in Vercel dashboard:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `VITE_API_URL` (after first deployment)

