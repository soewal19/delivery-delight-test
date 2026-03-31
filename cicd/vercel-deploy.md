# Vercel Deployment Configuration

This project is a monorepo containing both the **Frontend** (Vite + React) and **Backend** (NestJS).

## Structure
- `/frontend` — Frontend application.
- `/backend` — Backend application.

## Deployment Options

### Option 1: Automatic Deployment (Recommended)
Connect your GitHub/Bitbucket/GitLab repository to Vercel. Vercel will automatically detect the settings from `vercel.json` in the root and subdirectories.

### Option 2: Manual Deployment via CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run deployment from the root: `vercel`

## Root Configuration
The root `vercel.json` handles routing between the frontend and backend.

```json
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/backend/api/index.ts" },
    { "source": "/(.*)", "destination": "/frontend/$1" }
  ]
}
```
