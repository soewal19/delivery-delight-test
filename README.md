# Delivery Delight — Advanced Level (Test Task) 🍔🍕🥤

**Accomplished Level: Advanced (Base + Middle + Advanced + Additional Ideas)**

## 🚀 Public URL
[Link to your hosted application here]

## 📝 Accomplished Tasks

### Base Level (Completed)
- [x] **Shops Page**: Users can browse shops and add products to the cart.
- [x] **Shopping Cart Page**: Users can manage items, change quantities, and remove products.
- [x] **Order Submission**: Form validation for email, phone, and address.
- [x] **Database Integration**: Orders are saved in MongoDB using Prisma ORM.

### Middle Level (Completed)
- [x] **Responsive Design**: Works perfectly on Mobile, Tablet, and Desktop.
- [x] **Product Filtering**: Filter products by multiple categories (Burgers, Pizza, Drinks, etc.).
- [x] **Product Sorting**: Sort by price (low/high) and name (A-Z).
- [x] **Shop Filtering**: Filter restaurants by rating range (e.g., 4.0 - 5.0).

### Advanced Level (Completed)
- [x] **Pagination**: Efficiently load products in batches.
- [x] **Reorder Functionality**: Quick repeat of previous orders from history.
- [x] **Advanced State Management**: Powered by Zustand with persistence.

### Additional Features (World-Class Practices)
- [x] **Real-time Connectivity**: Socket.io integration for DB and Server status indicators.
- [x] **Personal Cabinet**: User profiles with avatar management (DiceBear API).
- [x] **Data Visualization**: Animated spending charts using Recharts.
- [x] **Animated Logging**: Custom NestJS logger with file rotation and automatic compression (keeps last 3 logs, archives the rest).
- [x] **Modern Routing**: Integrated React Router 6.x with `createBrowserRouter` and centralized Error Boundaries.
- [x] **Performance Optimization**: Image Lazy Loading with skeleton placeholders and React Suspense for code-splitting.
- [x] **Interactive Shop Maps**: Integration with Leaflet (OpenStreetMap) to show shop locations.
- [x] **Dynamic Directions**: Real-time visual indicators (arrows) from the user's location to the shop on the map.
- [x] **SEO Optimization**: React Helmet integration for meta tags and social sharing.
- [x] **Modern UI/UX**: Built with Shadcn/UI, Tailwind CSS, and Framer Motion animations.
- [x] **Serverless Ready**: Optimized for Vercel deployment.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Zustand, TanStack Query, Tailwind CSS, Shadcn/UI, Framer Motion.
- **Backend**: NestJS, Prisma ORM, Socket.io.
- **Database**: MongoDB Atlas.
- **Deployment**: Vercel.

## ⚙️ Setup & Installation

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` with `DATABASE_URL` (MongoDB).
4. `npx prisma generate`
5. `npm run start:dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---
Developed with ❤️ using best world practices.
