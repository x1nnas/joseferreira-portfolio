#!/bin/bash

echo "🚂 Deploying to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Initialize project if not already done
if [ ! -f "railway.json" ]; then
    echo "🚀 Initializing Railway project..."
    railway init
fi

# Set environment variables for production
echo "⚙️  Setting environment variables..."
railway variables set NODE_ENV=production
railway variables set USE_SQLITE=false
railway variables set JWT_SECRET=$(openssl rand -base64 32)

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: https://your-app.railway.app"
echo "🔍 Health check: https://your-app.railway.app/health"
