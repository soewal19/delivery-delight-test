#!/bin/bash

# Delivery Delight Setup Script
# This script sets up the development environment

set -e

echo "🚀 Starting setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated"

# Run database migrations
echo "🔧 Running database migrations..."
npx prisma migrate dev
echo "✅ Database migrations completed"

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed
echo "✅ Database seeded"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

# Create .env files if they don't exist
echo "🔧 Creating .env files..."

if [ ! -f "../backend/.env" ]; then
    cat > ../backend/.env << EOF
DATABASE_URL="file:./dev.db"
PORT=3000
EOF
    echo "✅ Created backend/.env"
else
    echo "✅ backend/.env already exists"
fi

if [ ! -f ".env" ]; then
    cat > .env << EOF
VITE_API_URL=http://localhost:3000/api
EOF
    echo "✅ Created frontend/.env"
else
    echo "✅ frontend/.env already exists"
fi

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "To start the application:"
echo "  1. Start backend: cd backend && npm run start:dev"
echo "  2. Start frontend: cd frontend && npm run dev"
echo ""
echo "Access the application:"
echo "  - Frontend: http://localhost:8080"
echo "  - Backend API: http://localhost:3000"
echo "  - API Documentation: http://localhost:3000/api"
