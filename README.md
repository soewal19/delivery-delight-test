# Delivery Delight - Food Delivery App

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start backend
cd backend
npm install
npm run start:dev

# In a new terminal, start frontend
cd frontend
npm install
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs

## 📦 Deployment

### Backend on Render (recommended)

**Why Render?**
- ✅ Supports WebSocket
- ✅ Supports SQLite
- ✅ Free tier
- ✅ Auto-deploy from GitHub

**Instructions:** See [RENDER_DEPLOY.md](RENDER_DEPLOY.md)

### Frontend on Vercel

**Instructions:** See [GITHUB_SETUP.md](GITHUB_SETUP.md)

## 🌿 Branches

### [master](https://github.com/soewal19/delivery-delight/tree/master) (main branch)
- **Database:** MongoDB Atlas
- **Deployment:** Render.com
- **Connection string:** `mongodb+srv://Admin2025:Pass321@cluster0.tavfxtx.mongodb.net/chates?retryWrites=true&w=majority&appName=Cluster`
- **Description:** Production-ready version with MongoDB database, deployed on Render.com

### [local](https://github.com/soewal19/delivery-delight/tree/local) (local development branch)
- **Database:** SQLite
- **Deployment:** Local
- **Connection string:** `file:./dev.db`
- **Description:** Local development version with SQLite database, perfect for testing and development

**For local development, switch to the `local` branch:**
```bash
git checkout local
```

## 🏗️ Architecture

### Backend (NestJS)
- **Framework:** NestJS 10
- **Database:** SQLite (Prisma ORM)
- **WebSocket:** Socket.io
- **API Docs:** Swagger

### Frontend (React)
- **Framework:** React 18 + Vite
- **UI:** Tailwind CSS + shadcn/ui
- **State:** React Query
- **Router:** React Router 6

## 📁 Project Structure

```
delivery-delight/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── coupons/        # Coupons
│   │   ├── events/         # WebSocket
│   │   ├── orders/         # Orders
│   │   ├── products/       # Products
│   │   ├── shops/          # Shops
│   │   └── users/          # Users
│   ├── prisma/             # DB schema
│   └── api/                # Vercel entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Components
│   │   ├── pages/          # Pages
│   │   └── api/            # API client
│   └── public/             # Static files
└── docs/                   # Documentation
```

## 🔧 Environment Variables

### Backend (master branch - MongoDB)
```env
DATABASE_URL=mongodb+srv://Admin2025:Pass321@cluster0.tavfxtx.mongodb.net/chates?retryWrites=true&w=majority&appName=Cluster
NODE_ENV=production
PORT=10000
```

### Backend (local branch - SQLite)
```env
DATABASE_URL=file:./dev.db
NODE_ENV=production
PORT=10000
```

### Frontend
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 📚 API Endpoints

### Shops
- `GET /api/shops` - All shops
- `GET /api/shops/:id` - Shop by ID

### Products
- `GET /api/products` - All products
- `GET /api/products/:id` - Product by ID

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - All orders
- `GET /api/orders/:id` - Order by ID

### Users
- `GET /api/users/:email` - User by email
- `POST /api/users` - Create/update user
- `GET /api/users/:id/stats` - User statistics

### Coupons
- `GET /api/coupons` - All coupons
- `GET /api/coupons/:code/validate` - Validate coupon

## 🛠️ Technologies

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Socket.io](https://socket.io/)
- [Swagger](https://swagger.io/)

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query)

## 📝 License

MIT
