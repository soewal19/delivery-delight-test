#!/usr/bin/env bash

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy Backend
echo "Deploying Backend..."
cd backend && vercel --prod --yes
cd ..

# Deploy Frontend
echo "Deploying Frontend..."
cd frontend && vercel --prod --yes
cd ..

echo "Deployment complete!"
