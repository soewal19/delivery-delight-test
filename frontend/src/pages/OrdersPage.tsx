import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { RotateCcw, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const { orders, reorder, fetchOrders, isLoading } = useCartStore();
  const navigate = useNavigate();
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchOrderId, setSearchOrderId] = useState('');

  useEffect(() => {
    // Initial fetch if we have some data or just to sync
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(
      searchEmail || undefined, 
      searchPhone || undefined, 
      searchOrderId || undefined
    );
  };

  const handleReorder = (order: typeof orders[0]) => {
    reorder(order);
    toast.success('Items added to cart!');
    navigate('/cart');
  };

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Order History</h1>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-end max-w-4xl">
        <div className="flex-1 w-full">
          <Label htmlFor="se">Email</Label>
          <Input id="se" placeholder="Filter by email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
        </div>
        <div className="flex-1 w-full">
          <Label htmlFor="sp">Phone</Label>
          <Input id="sp" placeholder="Filter by phone" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
        </div>
        <div className="flex-1 w-full">
          <Label htmlFor="sid">Order ID</Label>
          <Input id="sid" placeholder="Filter by ID" value={searchOrderId} onChange={(e) => setSearchOrderId(e.target.value)} />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
          Search
        </Button>
      </form>

      {isLoading && orders.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <span className="text-5xl mb-4">📋</span>
          <p className="text-muted-foreground">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">Order #{order.id}</CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    {order.email} · {order.phone} · {order.address}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-2 rounded-md border p-2">
                        <img src={item.product.image} alt={item.product.name} className="h-10 w-10 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity} × ${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>
                        <RotateCcw className="h-4 w-4 mr-1" /> Reorder
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Re-add all items from this order to cart</TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
