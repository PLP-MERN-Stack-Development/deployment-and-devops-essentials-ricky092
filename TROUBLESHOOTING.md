# 🔧 Troubleshooting Guide

Common issues and solutions for deploying your MERN application.

## 🚨 Common Issues

### 1. Backend Deployment Fails

#### Issue: "Cannot find module 'express'"
**Solution:**
- Ensure `package.json` is in the backend directory
- Check that `npm install` runs in build command
- Verify `node_modules` is in `.gitignore`

#### Issue: "MongoDB connection failed"
**Solution:**
- Verify MongoDB connection string is correct
- Check that password doesn't contain special characters (or URL encode them)
- Ensure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
- Test connection string locally first

#### Issue: "Port already in use"
**Solution:**
- Use `process.env.PORT` in your server.js
- Don't hardcode port numbers
- Render assigns ports automatically

### 2. Frontend Deployment Fails

#### Issue: "Build failed - npm ERR!"
**Solution:**
- Check `package.json` for correct dependencies
- Ensure `react-scripts` is installed
- Try building locally first: `npm run build`
- Check for syntax errors in your code

#### Issue: "Cannot read property of undefined"
**Solution:**
- Check that `REACT_APP_API_URL` is set in Vercel
- Verify environment variable names start with `REACT_APP_`
- Rebuild after adding environment variables

#### Issue: "404 on page refresh"
**Solution:**
- Add `vercel.json` or `netlify.toml` for routing
- Configure rewrites to `/index.html`
- See provided configuration files

### 3. CORS Errors

#### Issue: "Access-Control-Allow-Origin error"
**Solution:**
```javascript
// In your backend server.js
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

#### Issue: "Preflight request failed"
**Solution:**
- Ensure CORS is configured before routes
- Allow credentials if using cookies/sessions
- Check that frontend URL is correct in backend env vars

### 4. Environment Variables Not Working

#### Issue: "undefined environment variable"
**Solution:**

**Backend:**
- Verify `.env` file exists (locally)
- Check environment variables are set in Render dashboard
- Restart service after adding variables
- Use `require('dotenv').config()` at top of server.js

**Frontend:**
- Environment variables must start with `REACT_APP_`
- Set in Vercel dashboard under Settings → Environment Variables
- Redeploy after adding variables
- Access with `process.env.REACT_APP_VARIABLE_NAME`

### 5. GitHub Actions Failing

#### Issue: "Workflow syntax error"
**Solution:**
- Validate YAML syntax (use online YAML validator)
- Check indentation (use spaces, not tabs)
- Ensure all required fields are present

#### Issue: "Secret not found"
**Solution:**
- Go to GitHub Settings → Secrets and variables → Actions
- Verify secret names match exactly (case-sensitive)
- Re-add secrets if needed

#### Issue: "Tests failing in CI"
**Solution:**
- Add `-- --passWithNoTests` to test command if no tests exist
- Set `CI=true` environment variable
- Check that test command works locally

### 6. Database Connection Issues

#### Issue: "MongoServerError: Authentication failed"
**Solution:**
- Verify database username and password
- Check that user has correct permissions
- Ensure password is URL encoded in connection string
- Special characters: `@` → `%40`, `#` → `%23`, etc.

#### Issue: "Connection timeout"
**Solution:**
- Check network access in MongoDB Atlas
- Ensure 0.0.0.0/0 is whitelisted
- Verify connection string format
- Check if cluster is paused (free tier auto-pauses)

### 7. Health Check Fails

#### Issue: "Health endpoint returns 503"
**Solution:**
- Check database connection
- Verify all services are running
- Look at server logs for errors
- Ensure health route is defined before error handlers

#### Issue: "Cannot GET /health"
**Solution:**
```javascript
// Add to server.js
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});
```

### 8. Deployment Succeeds but App Doesn't Work

#### Issue: "White screen on frontend"
**Solution:**
- Check browser console for errors
- Verify API URL is correct
- Check network tab for failed requests
- Ensure backend is running

#### Issue: "API calls fail with 404"
**Solution:**
- Verify API routes are correct
- Check that backend URL includes `/api` if needed
- Ensure routes are registered in server.js
- Test endpoints with Postman/Thunder Client

### 9. CI/CD Pipeline Issues

#### Issue: "Deploy hook not triggering"
**Solution:**
- Verify deploy hook URL is correct
- Check that secret is set in GitHub
- Ensure workflow has correct branch trigger
- Test deploy hook manually with curl

#### Issue: "Vercel deployment fails in CD"
**Solution:**
- Verify Vercel token is valid
- Check org ID and project ID are correct
- Ensure Vercel CLI is properly configured in workflow
- Try manual deployment first

### 10. Performance Issues

#### Issue: "App is very slow"
**Solution:**
- Check database queries for optimization
- Implement caching where appropriate
- Optimize images and assets
- Use CDN for static files
- Check server resources in dashboard

#### Issue: "Free tier limitations"
**Solution:**
- Render free tier spins down after inactivity (cold starts)
- Consider keeping app warm with uptime monitoring
- Upgrade to paid tier if needed
- Optimize to reduce resource usage

## 🔍 Debugging Steps

### 1. Check Logs

**Render:**
```
Dashboard → Your Service → Logs
```

**Vercel:**
```
Project → Deployments → Click deployment → View Function Logs
```

**GitHub Actions:**
```
Repository → Actions → Click workflow run → Click job
```

### 2. Test Locally First

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm start
```

### 3. Test API Endpoints

```bash
# Health check
curl https://your-backend.onrender.com/health

# With details
curl -v https://your-backend.onrender.com/health
```

### 4. Check Environment Variables

**Backend (Render):**
```
Dashboard → Service → Environment → Verify all variables
```

**Frontend (Vercel):**
```
Project → Settings → Environment Variables → Verify all variables
```

### 5. Verify Database Connection

```bash
# Test MongoDB connection locally
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_CONNECTION_STRING').then(() => console.log('Connected!')).catch(err => console.error(err));"
```

## 📞 Getting Help

### 1. Check Documentation
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

### 2. Check Status Pages
- [Render Status](https://status.render.com/)
- [Vercel Status](https://www.vercel-status.com/)
- [MongoDB Atlas Status](https://status.mongodb.com/)
- [GitHub Status](https://www.githubstatus.com/)

### 3. Community Resources
- Stack Overflow
- GitHub Discussions
- Platform-specific Discord/Slack channels

## 🛠️ Useful Commands

### Check if port is in use (Windows)
```cmd
netstat -ano | findstr :5000
```

### Kill process on port (Windows)
```cmd
taskkill /PID <PID> /F
```

### Test API endpoint
```bash
curl -X GET https://your-api.com/health
```

### Check environment variables (local)
```bash
# Windows CMD
echo %MONGODB_URI%

# Windows PowerShell
$env:MONGODB_URI
```

### Clear npm cache
```bash
npm cache clean --force
```

### Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## ✅ Prevention Checklist

- [ ] Test everything locally before deploying
- [ ] Use `.env.example` to document required variables
- [ ] Keep `.env` in `.gitignore`
- [ ] Test API endpoints with Postman before deployment
- [ ] Verify database connection locally
- [ ] Check logs regularly
- [ ] Set up monitoring from day one
- [ ] Document any custom configuration
- [ ] Keep dependencies updated
- [ ] Use version control properly

---

**Remember**: Most deployment issues are related to:
1. Environment variables (70%)
2. CORS configuration (15%)
3. Database connection (10%)
4. Build configuration (5%)

Always check these first!
