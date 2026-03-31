# Scripts

This folder contains deployment and utility scripts for the Delivery Delight project.

## Scripts

### `deploy.sh`

Deployment script that deploys the application to Vercel.

**Usage:**
```bash
./scripts/deploy.sh
```

**What it does:**
1. Checks if Vercel CLI is installed
2. Checks if user is logged in to Vercel
3. Builds the backend application
4. Builds the frontend application
5. Deploys to Vercel

**Prerequisites:**
- Node.js v18 or higher
- Vercel CLI installed (`npm install -g vercel`)
- Logged in to Vercel (`vercel login`)

### `setup.sh`

Setup script that sets up the development environment.

**Usage:**
```bash
./scripts/setup.sh
```

**What it does:**
1. Checks if Node.js is installed (v18 or higher)
2. Checks if npm is installed
3. Installs backend dependencies
4. Generates Prisma client
5. Runs database migrations
6. Seeds the database
7. Installs frontend dependencies
8. Creates `.env` files if they don't exist

**Prerequisites:**
- Node.js v18 or higher
- npm

## Making Scripts Executable

On Unix-like systems (Linux, macOS), you need to make the scripts executable:

```bash
chmod +x scripts/deploy.sh
chmod +x scripts/setup.sh
```

On Windows, you can run the scripts using Git Bash or WSL.

## Adding New Scripts

When adding new scripts to this folder:

1. Create the script file with a descriptive name
2. Add a shebang line at the top: `#!/bin/bash`
3. Make the script executable: `chmod +x scripts/script-name.sh`
4. Update this README.md with documentation for the new script
