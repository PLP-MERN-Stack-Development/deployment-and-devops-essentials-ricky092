# 🚀 MERN Stack Deployment - Week 7 Assignment

A full-stack MERN (MongoDB, Express, React, Node.js) application deployed to production with CI/CD pipelines and monitoring.

## 📋 Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring](#monitoring)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)

## 🌐 Live Demo

- **Frontend**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend API**: [https://your-app.onrender.com](https://your-app.onrender.com)
- **API Health Check**: [https://your-app.onrender.com/health](https://your-app.onrender.com/health)

> **Note**: Replace the URLs above with your actual deployed application URLs

## ✨ Features

- ✅ Full MERN stack application
- ✅ RESTful API with Express.js
- ✅ MongoDB Atlas database
- ✅ React frontend with modern UI
- ✅ JWT authentication
- ✅ Secure HTTP headers with Helmet
- ✅ CORS configuration
- ✅ Error handling and logging
- ✅ CI/CD with GitHub Actions
- ✅ Automated testing
- ✅ Health check endpoints
- ✅ Production-ready deployment

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Helmet for security
- Morgan for logging
- Express Rate Limit

### DevOps
- GitHub Actions (CI/CD)
- Render (Backend hosting)
- Vercel (Frontend hosting)
- MongoDB Atlas (Database)
- UptimeRobot (Monitoring)
- Sentry (Error tracking)

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── production.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── security.js
│   ├── routes/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── axios.js
│   │   └── App.js
│   ├── package.json
│   ├── vercel.json
│   └── .env.example
├── .github/
│   └── workflows/
│       ├── frontend-ci.yml
│       ├── frontend-cd.yml
│       ├── backend-ci.yml
│       └── backend-cd.yml
├── deployment/
│   ├── DEPLOYMENT_GUIDE.md
│   ├── render.yaml
│   ├── railway.json
│   └── scripts/
├── monitoring/
│   ├── MONITORING_SETUP.md
│   ├── sentry-config.js
│   └── uptime-config.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. **Set up Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Set up Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

## 🌍 Deployment

### Quick Deployment Steps

1. **Database Setup** (MongoDB Atlas)
   - Create cluster
   - Create database user
   - Whitelist IP addresses
   - Get connection string

2. **Backend Deployment** (Render)
   - Connect GitHub repository
   - Configure build settings
   - Add environment variables
   - Deploy

3. **Frontend Deployment** (Vercel)
   - Import GitHub repository
   - Configure build settings
   - Add environment variables
   - Deploy

4. **Update CORS**
   - Add frontend URL to backend CORS configuration

For detailed deployment instructions, see [deployment/DEPLOYMENT_GUIDE.md](deployment/DEPLOYMENT_GUIDE.md)

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### Frontend CI (`frontend-ci.yml`)
- Triggers on push to main/develop branches
- Runs linting
- Executes tests
- Builds the application
- Uploads build artifacts

#### Backend CI (`backend-ci.yml`)
- Triggers on push to main/develop branches
- Runs linting
- Executes tests
- Checks for security vulnerabilities

#### Frontend CD (`frontend-cd.yml`)
- Triggers on push to main branch
- Builds production bundle
- Deploys to Vercel

#### Backend CD (`backend-cd.yml`)
- Triggers on push to main branch
- Triggers Render deployment
- Runs health check verification

### Setting Up CI/CD

1. Go to GitHub repository Settings > Secrets and variables > Actions
2. Add required secrets:
   - `RENDER_DEPLOY_HOOK_URL`
   - `BACKEND_URL`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `REACT_APP_API_URL`

## 📊 Monitoring

### Health Checks
- Backend health endpoint: `/health`
- Returns server status, uptime, and system checks

### Uptime Monitoring
- UptimeRobot monitors application availability
- Checks every 5 minutes
- Email alerts on downtime

### Error Tracking
- Sentry integration for error tracking
- Real-time error notifications
- Stack traces and user context

For detailed monitoring setup, see [monitoring/MONITORING_SETUP.md](monitoring/MONITORING_SETUP.md)

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=your_frontend_url
```

### Frontend (.env)
```env
REACT_APP_API_URL=your_backend_url
```

See `.env.example` files for complete templates.

## 📸 Screenshots

### CI/CD Pipeline
![GitHub Actions Workflow](screenshots/github-actions.png)
*GitHub Actions CI/CD pipeline running successfully*

### Deployed Application
![Frontend Application](screenshots/frontend.png)
*Live frontend application*

### Backend Health Check
![Health Check](screenshots/health-check.png)
*Backend health check endpoint*

### Monitoring Dashboard
![UptimeRobot Dashboard](screenshots/monitoring.png)
*UptimeRobot monitoring dashboard*

> **Note**: Add your actual screenshots to the `screenshots/` directory

## 📝 Assignment Completion Checklist

- [x] Backend prepared for production
- [x] Frontend optimized for production
- [x] MongoDB Atlas configured
- [x] Backend deployed to Render
- [x] Frontend deployed to Vercel
- [x] CI/CD pipelines set up
- [x] Health check endpoints implemented
- [x] Monitoring configured
- [x] Documentation completed
- [ ] Screenshots added
- [ ] URLs updated in README

## 🔧 Maintenance

### Regular Tasks
- Monitor application uptime weekly
- Check error logs daily
- Update dependencies monthly
- Backup database weekly
- Review security vulnerabilities monthly

### Rollback Procedure
See [deployment/DEPLOYMENT_GUIDE.md](deployment/DEPLOYMENT_GUIDE.md#rollback-procedure)

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 📄 License

This project is part of a course assignment.

---

**Submission Date**: [Add date]  
**Course**: Web Development  
**Assignment**: Week 7 - Deployment and DevOps 