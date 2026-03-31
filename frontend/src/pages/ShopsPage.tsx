import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShopCard from '@/components/ShopCard';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import ProductPagination from '@/components/ProductPagination';
import RecentlyViewed from '@/components/RecentlyViewed';
import ShopMap from '@/components/ShopMap';
import { useShopStore } from '@/store/shopStore';
import { useViewedStore } from '@/store/viewedStore';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const ShopsPage = () => {
  const { 
    getFilteredShops, 
    shops,
    products, 
    selectedShopId,
    currentPage, 
    setCurrentPage, 
    totalPages, 
    totalItems, 
    fetchShops, 
    fetchProducts,
    isLoading 
  } = useShopStore();
  
  const selectedShop = useMemo(() => shops.find(s => s.id === selectedShopId), [shops, selectedShopId]);
  
  const viewedIds = useViewedStore((s) => s.viewedIds);
  const recentlyViewed = useMemo(
    () => viewedIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products,
    [viewedIds, products]
  );

  useEffect(() => {
    fetchShops();
    fetchProducts();
  }, [fetchShops, fetchProducts]);

  const filteredShops = getFilteredShops();

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">FoodDelivery</h1>
        <p className="text-muted-foreground">Pick your favorite restaurant and start ordering</p>
      </div>

      <RecentlyViewed products={recentlyViewed} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar: Shops + Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <AnimatePresence mode="wait">
            {selectedShop?.lat && selectedShop?.lng && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ShopMap 
                  shopLat={selectedShop.lat} 
                  shopLng={selectedShop.lng} 
                  shopName={selectedShop.name} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Shops</h2>
            {isLoading && shops.length === 0 ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              filteredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))
            )}
          </div>
          <Filters />
        </aside>

        {/* Right: Products grid */}
        <section className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Products</h2>
            <span className="text-sm text-muted-foreground">{totalItems} items found</span>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
              key={currentPage}
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-4xl mb-2">🔍</span>
              <p className="text-muted-foreground">No products match your filters</p>
            </div>
          )}
          <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </section>
      </div>
    </div>
  );
};

export default ShopsPage;
