// Sentry configuration for error tracking

// Backend (Node.js/Express)
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");

const initBackendSentry = (app) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development',
  });

  // RequestHandler creates a separate execution context
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
};

const sentryErrorHandler = () => {
  return Sentry.Handlers.errorHandler();
};

module.exports = { initBackendSentry, sentryErrorHandler };

// Frontend (React)
// Add to your React index.js or App.js:
/*
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
  environment: process.env.NODE_ENV || 'development',
});
*/
