# Vercel Deployment Guide - Full Stack Application

This guide will help you deploy both frontend and backend to Vercel in a single project.

## 🚀 Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"

3. **Import Repository**
   - Select your repository: `Zahrah-wasif1/new-version-opf-totr`
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Vite (or Other)
   - **Root Directory**: `.` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Environment Variables**
   Click "Environment Variables" and add:
   
   **For Backend (API):**
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key-here
   ```
   
   **For Frontend:**
   ```
   VITE_API_URL=https://your-project.vercel.app/api
   ```
   
   **Important:** After adding `VITE_API_URL`, you'll need to redeploy!

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (select your account)
   - Link to existing project? **No** (first time)
   - Project name? (press Enter for default)
   - Directory? (press Enter for current directory)
   - Override settings? **No**

4. **Set Environment Variables**
   ```bash
   # Backend variables
   vercel env add MONGODB_URI
   # Paste your MongoDB connection string
   
   vercel env add JWT_SECRET
   # Enter a strong random string
   
   # Frontend variable (will be set after first deploy)
   vercel env add VITE_API_URL
   # Enter: https://your-project.vercel.app/api
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 📋 Environment Variables Setup

### Step-by-Step:

1. **After first deployment**, note your project URL (e.g., `https://car-rental-app.vercel.app`)

2. **Go to Project Settings → Environment Variables**

3. **Add these variables:**

   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string | Production, Preview, Development |
   | `JWT_SECRET` | Strong random string (use `openssl rand -base64 32`) | Production, Preview, Development |
   | `VITE_API_URL` | `https://your-project.vercel.app/api` | Production, Preview, Development |

4. **Redeploy** after adding `VITE_API_URL`:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

## 🔧 Project Structure

Vercel will automatically detect:
- **Frontend**: React + Vite (builds from root)
- **Backend**: API routes in `/api` folder (serverless functions)

```
your-project/
├── api/              # Backend API routes
├── src/              # Frontend React code
├── dist/             # Build output (generated)
├── vercel.json       # Vercel configuration
└── package.json      # Dependencies
```

## 🌐 How It Works

1. **Frontend**: Built with Vite, served as static files
2. **Backend**: API routes in `/api` run as serverless functions
3. **Routing**: 
   - `/api/*` → Backend API routes
   - `/*` → Frontend React app (SPA routing)

## ✅ Post-Deployment Checklist

- [ ] Backend API is accessible at `https://your-project.vercel.app/api`
- [ ] Frontend loads correctly
- [ ] Environment variables are set
- [ ] MongoDB connection works
- [ ] Authentication works (signup/login)
- [ ] API calls from frontend work
- [ ] CORS is configured correctly

## 🐛 Troubleshooting

### Build Fails
- Check `package.json` has correct build script
- Verify all dependencies are listed
- Check Vercel build logs for errors

### API Routes Not Working
- Verify `api/` folder structure is correct
- Check `vercel.json` has correct function configuration
- Ensure TypeScript files are properly formatted

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly
- Check it matches your Vercel deployment URL
- Redeploy after setting environment variables

### Environment Variables Not Working
- Make sure variables are set for correct environment (Production/Preview/Development)
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### CORS Errors
- Backend should handle CORS (already configured)
- Check `vercel.json` headers configuration
- Verify API routes return proper CORS headers

## 📝 Testing After Deployment

1. **Test Backend API:**
   ```bash
   curl https://your-project.vercel.app/api/cars
   ```

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try signing up
   - Try logging in
   - Browse cars
   - Create a booking

3. **Check Logs:**
   - Go to Vercel Dashboard → Your Project → Logs
   - Monitor for any errors

## 🔄 Updating Deployment

After making changes:

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Vercel will auto-deploy** (if GitHub integration is enabled)

   OR

3. **Manual deploy:**
   ```bash
   vercel --prod
   ```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 Success!

Once deployed, you'll have:
- ✅ Frontend: `https://your-project.vercel.app`
- ✅ Backend API: `https://your-project.vercel.app/api`
- ✅ Full-stack application running on Vercel!

