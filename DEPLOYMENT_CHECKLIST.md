# Vercel Deployment Checklist ✅

Use this checklist to ensure everything is set up correctly before and after deployment.

## Pre-Deployment Checklist

### Code Preparation
- [ ] All code is committed to Git
- [ ] Code is pushed to GitHub repository
- [ ] No console errors in development
- [ ] All dependencies are in `package.json`
- [ ] `.env` file is NOT committed (in `.gitignore`)

### Backend Setup
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] IP whitelist configured (allow all for Vercel)
- [ ] MongoDB connection string ready
- [ ] JWT secret key generated

### Frontend Setup
- [ ] Environment variables documented
- [ ] API configuration uses environment variables
- [ ] Build command works locally (`npm run build`)

## Deployment Steps

### Step 1: Initial Deployment
- [ ] Go to Vercel dashboard
- [ ] Import GitHub repository
- [ ] Configure project settings:
  - [ ] Framework: Vite
  - [ ] Root Directory: `.`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Deploy (without environment variables first)

### Step 2: Set Environment Variables
After first deployment, add these in Vercel dashboard:

**Backend Variables:**
- [ ] `MONGODB_URI` = Your MongoDB Atlas connection string
- [ ] `JWT_SECRET` = Strong random string

**Frontend Variable:**
- [ ] `VITE_API_URL` = `https://your-project.vercel.app/api`
  - ⚠️ **Important:** Get this URL from your first deployment!

### Step 3: Redeploy
- [ ] After adding `VITE_API_URL`, trigger a redeploy
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors

## Post-Deployment Testing

### Backend API Tests
- [ ] Test API health: `GET /api/cars` (should return empty array or cars)
- [ ] Test signup: `POST /api/auth/signup` (should create user)
- [ ] Test login: `POST /api/auth/login` (should return token)
- [ ] Check Vercel function logs for errors

### Frontend Tests
- [ ] Visit your Vercel URL
- [ ] Page loads without errors
- [ ] Sign up form works
- [ ] Login form works
- [ ] Cars page loads (may be empty initially)
- [ ] Contact form submits successfully
- [ ] No console errors in browser

### Integration Tests
- [ ] Sign up → Login → Browse cars → Create booking
- [ ] Check browser network tab for API calls
- [ ] Verify API calls go to correct endpoint
- [ ] Check authentication token is stored
- [ ] Test protected routes (if implemented)

## Common Issues & Solutions

### ❌ Build Fails
**Solution:**
- Check build logs in Vercel dashboard
- Verify `package.json` has all dependencies
- Check for TypeScript errors
- Ensure build command is correct

### ❌ API Routes Return 404
**Solution:**
- Verify `api/` folder structure is correct
- Check `vercel.json` configuration
- Ensure TypeScript files are properly formatted
- Check function logs in Vercel dashboard

### ❌ Frontend Can't Connect to Backend
**Solution:**
- Verify `VITE_API_URL` is set correctly
- Check it matches your Vercel URL
- Ensure you redeployed after setting variable
- Check browser console for CORS errors

### ❌ MongoDB Connection Fails
**Solution:**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (allow all IPs)
- Verify database user has correct permissions
- Check Vercel function logs for connection errors

### ❌ Environment Variables Not Working
**Solution:**
- Verify variables are set for correct environment (Production)
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables
- Check Vercel logs for variable access

## Verification Commands

### Test Backend API
```bash
# Get cars
curl https://your-project.vercel.app/api/cars

# Sign up
curl -X POST https://your-project.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

### Check Deployment Status
- Visit Vercel dashboard → Your Project → Deployments
- Check latest deployment status
- Review build logs
- Check function logs

## Final Checklist

- [ ] ✅ Application is live and accessible
- [ ] ✅ Backend API is working
- [ ] ✅ Frontend is working
- [ ] ✅ Authentication works
- [ ] ✅ Database connection works
- [ ] ✅ No errors in logs
- [ ] ✅ Environment variables are set
- [ ] ✅ Documentation is updated

## 🎉 Success!

If all items are checked, your application is successfully deployed!

## 📞 Need Help?

- Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed guide
- Review Vercel documentation: https://vercel.com/docs
- Check deployment logs in Vercel dashboard

