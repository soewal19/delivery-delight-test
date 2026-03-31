import React, { lazy, Suspense, useState, useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from '@/components/Layout';
import ErrorPage from '@/pages/ErrorPage';
import Preloader from '@/components/Preloader';
import { useSocketStore } from '@/store/socketStore';

const ShopsPage = lazy(() => import('./pages/ShopsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const CouponsPage = lazy(() => import('./pages/CouponsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ShopsPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "help", element: <HelpPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const handlePreloaderComplete = useCallback(() => setShowPreloader(false), []);
  const connectSocket = useSocketStore((s) => s.connect);
  const disconnectSocket = useSocketStore((s) => s.disconnect);

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, [connectSocket, disconnectSocket]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {showPreloader && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
        </AnimatePresence>
        {!showPreloader && (
          <RouterProvider router={router} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
