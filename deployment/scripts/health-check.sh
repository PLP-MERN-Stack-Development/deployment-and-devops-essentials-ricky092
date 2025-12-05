#!/bin/bash

# Health check script for deployed application
# Usage: ./health-check.sh <backend-url>

BACKEND_URL=$1

if [ -z "$BACKEND_URL" ]; then
  echo "Usage: ./health-check.sh <backend-url>"
  echo "Example: ./health-check.sh https://your-app.onrender.com"
  exit 1
fi

echo "Checking backend health at: $BACKEND_URL/health"

response=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/health")

if [ $response -eq 200 ]; then
  echo "✅ Backend is healthy (HTTP $response)"
  
  # Get detailed health info
  health_data=$(curl -s "$BACKEND_URL/health")
  echo "Health data: $health_data"
  exit 0
else
  echo "❌ Backend health check failed (HTTP $response)"
  exit 1
fi
