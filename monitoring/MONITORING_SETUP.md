# Monitoring Setup Guide

This guide covers setting up monitoring and error tracking for your MERN application.

## 1. Uptime Monitoring with UptimeRobot

### Setup Steps:
1. Go to [UptimeRobot](https://uptimerobot.com) and create a free account
2. Click "Add New Monitor"
3. Configure Backend Monitor:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: MERN Backend API
   - **URL**: `https://your-backend.onrender.com/health`
   - **Monitoring Interval**: 5 minutes
   - **Monitor Timeout**: 30 seconds
4. Configure Frontend Monitor:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: MERN Frontend
   - **URL**: `https://your-frontend.vercel.app`
   - **Monitoring Interval**: 5 minutes
5. Set up alert contacts (email, SMS, Slack, etc.)
6. Save monitors

### What It Does:
- Checks if your application is up every 5 minutes
- Sends alerts when downtime is detected
- Provides uptime statistics and reports

## 2. Error Tracking with Sentry

### Backend Setup:

1. Go to [Sentry](https://sentry.io) and create account
2. Create new project for Node.js/Express
3. Install Sentry SDK:
```bash
cd backend
npm install @sentry/node @sentry/profiling-node
```

4. Add to your `server.js` (before routes):
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Your routes here...

// Error handler (must be before other error middleware)
app.use(Sentry.Handlers.errorHandler());
```

5. Add `SENTRY_DSN` to your environment variables

### Frontend Setup:

1. Create new Sentry project for React
2. Install Sentry SDK:
```bash
cd frontend
npm install @sentry/react
```

3. Add to your `index.js` or `App.js`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

4. Add `REACT_APP_SENTRY_DSN` to your environment variables

### What It Does:
- Captures and tracks errors in real-time
- Provides stack traces and context
- Shows user impact and error frequency
- Records session replays for debugging

## 3. Application Performance Monitoring

### Backend Metrics (Built-in):

Add performance logging to your Express app:

```javascript
// middleware/performance.js
const performanceMonitor = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    
    // Alert on slow requests
    if (duration > 1000) {
      console.warn(`Slow request detected: ${req.method} ${req.path} took ${duration}ms`);
    }
  });
  
  next();
};

module.exports = performanceMonitor;
```

### Frontend Metrics:

Use Web Vitals for performance monitoring:

```bash
npm install web-vitals
```

```javascript
// reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
  // Send to your analytics endpoint
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 4. Database Monitoring

### MongoDB Atlas Built-in Monitoring:

1. Go to your MongoDB Atlas dashboard
2. Click on your cluster
3. Go to "Metrics" tab
4. Monitor:
   - Connection count
   - Query performance
   - Storage usage
   - Network traffic

### Set Up Alerts:

1. Go to "Alerts" in Atlas
2. Create alerts for:
   - High connection count
   - Low storage space
   - Slow queries
   - Replication lag

## 5. Log Management

### Backend Logging with Winston:

```bash
npm install winston
```

```javascript
// config/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
```

### Viewing Logs:

**Render:**
- Go to your service dashboard
- Click "Logs" tab
- View real-time logs

**Railway:**
- Go to your service
- Click "Deployments"
- Click on deployment to view logs

## 6. Health Check Endpoints

Ensure your backend has comprehensive health checks:

```javascript
// routes/health.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/health', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      database: 'unknown',
      memory: 'unknown',
    }
  };

  try {
    // Check database connection
    if (mongoose.connection.readyState === 1) {
      healthcheck.checks.database = 'connected';
    } else {
      healthcheck.checks.database = 'disconnected';
      healthcheck.message = 'Database connection issue';
    }

    // Check memory usage
    const memUsage = process.memoryUsage();
    const memUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    healthcheck.checks.memory = `${memUsageMB}MB`;

    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});

module.exports = router;
```

## 7. Monitoring Dashboard

Create a simple monitoring dashboard page in your frontend:

```javascript
// components/MonitoringDashboard.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function MonitoringDashboard() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get('/health');
        setHealth(response.data);
      } catch (error) {
        setHealth({ message: 'Error', error: error.message });
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>System Health</h2>
      <p>Status: {health.message}</p>
      <p>Uptime: {Math.floor(health.uptime / 60)} minutes</p>
      <p>Database: {health.checks?.database}</p>
      <p>Memory: {health.checks?.memory}</p>
    </div>
  );
}

export default MonitoringDashboard;
```

## 8. Monitoring Checklist

- [ ] UptimeRobot monitors configured
- [ ] Sentry error tracking set up (backend & frontend)
- [ ] Health check endpoints implemented
- [ ] MongoDB Atlas alerts configured
- [ ] Log management in place
- [ ] Performance monitoring active
- [ ] Alert contacts configured
- [ ] Weekly monitoring review scheduled

## 9. Alert Response Plan

When you receive an alert:

1. **Check the alert details** - What triggered it?
2. **Verify the issue** - Visit the application
3. **Check logs** - Look for errors in platform logs
4. **Check database** - Verify MongoDB Atlas status
5. **Take action** - Fix the issue or rollback
6. **Document** - Record what happened and how you fixed it
7. **Follow up** - Monitor for recurrence

## Resources

- [UptimeRobot Documentation](https://uptimerobot.com/api/)
- [Sentry Documentation](https://docs.sentry.io/)
- [MongoDB Atlas Monitoring](https://docs.atlas.mongodb.com/monitoring-alerts/)
- [Winston Logger](https://github.com/winstonjs/winston)
