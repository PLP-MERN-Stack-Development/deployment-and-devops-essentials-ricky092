# Deployment Guide

This guide will walk you through deploying your MERN stack application to production.

## Prerequisites

Before deploying, ensure you have:
- [ ] A GitHub account with your code pushed
- [ ] MongoDB Atlas account and cluster set up
- [ ] Accounts on deployment platforms (Render, Vercel, etc.)
- [ ] All environment variables documented

## Step 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is fine)
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Save username and password
4. Whitelist IP addresses:
   - Go to Network Access
   - Add IP Address
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for production
5. Get connection string:
   - Go to Database > Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Step 2: Backend Deployment (Render)

1. Go to [Render](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: mern-backend (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `NODE_ENV` = production
   - `PORT` = 5000
   - `MONGODB_URI` = (your MongoDB Atlas connection string)
   - `JWT_SECRET` = (generate a random string)
   - `FRONTEND_URL` = (will add after frontend deployment)
6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., https://your-app.onrender.com)

## Step 3: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build
5. Add environment variables:
   - `REACT_APP_API_URL` = (your backend URL from Step 2)
6. Click "Deploy"
7. Wait for deployment to complete
8. Copy your frontend URL (e.g., https://your-app.vercel.app)

## Step 4: Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Go to Environment
4. Update `FRONTEND_URL` with your Vercel URL
5. Save changes (this will trigger a redeploy)

## Step 5: Set Up CI/CD with GitHub Actions

1. Go to your GitHub repository
2. Go to Settings > Secrets and variables > Actions
3. Add the following secrets:

### For Backend CD:
- `RENDER_DEPLOY_HOOK_URL`: Get from Render > Settings > Deploy Hook
- `BACKEND_URL`: Your Render backend URL

### For Frontend CD:
- `VERCEL_TOKEN`: Get from Vercel > Settings > Tokens
- `VERCEL_ORG_ID`: Found in Vercel project settings
- `VERCEL_PROJECT_ID`: Found in Vercel project settings
- `REACT_APP_API_URL`: Your backend URL

### For CI:
- `MONGODB_TEST_URI`: A test database connection string (optional)

4. Push to main branch to trigger workflows

## Step 6: Verify Deployment

1. Visit your frontend URL
2. Check that it loads correctly
3. Test API calls to backend
4. Check health endpoint: `https://your-backend.onrender.com/health`
5. Monitor GitHub Actions for successful builds

## Step 7: Set Up Monitoring (Optional)

### UptimeRobot
1. Go to [UptimeRobot](https://uptimerobot.com)
2. Add new monitor
3. Monitor Type: HTTP(s)
4. URL: Your backend health endpoint
5. Monitoring Interval: 5 minutes

### Sentry (Error Tracking)
1. Go to [Sentry](https://sentry.io)
2. Create new project
3. Follow integration instructions for React and Node.js
4. Add DSN to environment variables

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify all environment variables are set
- Test MongoDB connection string locally
- Check CORS configuration

### Frontend Issues
- Check browser console for errors
- Verify API URL is correct
- Check network tab for failed requests
- Ensure build completed successfully

### CI/CD Issues
- Check GitHub Actions logs
- Verify all secrets are set correctly
- Check workflow file syntax
- Ensure branch names match

## Rollback Procedure

### Render
1. Go to your service dashboard
2. Click on "Events" tab
3. Find previous successful deployment
4. Click "Rollback to this version"

### Vercel
1. Go to your project dashboard
2. Click on "Deployments" tab
3. Find previous successful deployment
4. Click three dots > "Promote to Production"

## Maintenance Checklist

- [ ] Monitor application uptime weekly
- [ ] Check error logs daily
- [ ] Update dependencies monthly
- [ ] Backup database weekly
- [ ] Review security vulnerabilities monthly
- [ ] Test rollback procedure quarterly

## Support

If you encounter issues:
1. Check the logs on your deployment platform
2. Review GitHub Actions workflow runs
3. Consult platform documentation
4. Check MongoDB Atlas connection status
