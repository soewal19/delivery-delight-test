#!/bin/bash

# Delivery Delight Deployment Script
# This script deploys the application to Vercel

set -e

echo "🚀 Starting deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please run 'vercel login' first."
    exit 1
fi

echo "✅ Vercel CLI is installed and user is logged in"

# Build backend
echo "🔨 Building backend..."
cd backend
npm run build
echo "✅ Backend built successfully"

# Build frontend
echo "🔨 Building frontend..."
cd ../frontend
npm run build
echo "✅ Frontend built successfully"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
cd ..
vercel --prod

echo "✅ Deployment completed successfully!"
echo "🌐 Your application is now live on Vercel"
