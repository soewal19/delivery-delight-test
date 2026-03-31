import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';
import SEO from '@/components/SEO';

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const Layout = ({ children }: { children?: React.ReactNode }) => (
  <AnimatedPage>
    <div className="min-h-screen flex flex-col bg-background">
      <SEO />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          {children || <Outlet />}
        </Suspense>
      </main>
      <Footer />
    </div>
  </AnimatedPage>
);

export default Layout;
