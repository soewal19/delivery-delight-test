import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { RotateCcw, Search, Loader2, ChevronDown, ChevronUp, Package, Calendar, ShoppingBag, X } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const OrdersPage = () => {
  const { orders, reorder, fetchOrders, isLoading } = useCartStore();
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const [searchEmail, setSearchEmail] = useState(user?.email || '');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchOrderId, setSearchOrderId] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      setSearchEmail(user.email);
      fetchOrders(user.email);
    } else {
      fetchOrders();
    }
  }, [fetchOrders, user?.email]);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(
      searchEmail || undefined, 
      searchPhone || undefined, 
      searchOrderId || undefined
    );
  };

  const clearSearch = () => {
    setSearchEmail(user?.email || '');
    setSearchPhone('');
    setSearchOrderId('');
    if (user?.email) {
      fetchOrders(user.email);
    } else {
      fetchOrders();
    }
  };

  const handleReorder = (order: typeof orders[0]) => {
    reorder(order);
    toast.success('Items added to cart!');
    navigate('/cart');
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Order History</h1>
        {orders.length > 0 && (
          <Badge variant="secondary" className="px-3 py-1">
            {orders.length} orders found
          </Badge>
        )}
      </div>

      <Card className="border-none shadow-sm bg-muted/20">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="se" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
              <Input id="se" placeholder="your@email.com" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sp" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
              <Input id="sp" placeholder="+380..." value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sid" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</Label>
              <Input id="sid" placeholder="ID..." value={searchOrderId} onChange={(e) => setSearchOrderId(e.target.value)} className="bg-background" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                Search
              </Button>
              <Button type="button" variant="outline" onClick={clearSearch} disabled={isLoading} size="icon" title="Clear search">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && orders.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Card className="border-dashed py-16 bg-muted/10">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-muted-foreground opacity-20" />
            </div>
            <h3 className="text-xl font-semibold mb-1">No orders found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              We couldn't find any orders matching your criteria. Try searching with a different email or phone number.
            </p>
            {user && (
              <Button variant="link" onClick={() => clearSearch()} className="mt-4">
                Show my orders
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-primary/40 transition-all hover:shadow-md group overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ShoppingBag className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-lg">Order #{order.id.slice(-6).toUpperCase()}</p>
                          <Badge variant="outline" className="capitalize">
{(order as any).status || 'pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.createdAt).toLocaleDateString(undefined, { 
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:text-right gap-6">
                      <div className="md:text-right">
                        <p className="text-2xl font-black text-primary">${order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Total Amount</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="hidden sm:flex" onClick={(e) => { e.stopPropagation(); toggleOrder(order.id); }}>
                          {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                        </Button>
                        {expandedOrder === order.id ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="border-t bg-muted/20 p-6 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground border-b pb-2">Delivery Details</h4>
                              <div className="grid grid-cols-1 gap-2 text-sm">
                                <div className="flex justify-between border-b border-dashed py-1">
                                  <span className="text-muted-foreground">Full Address</span>
                                  <span className="font-medium">{order.address}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed py-1">
                                  <span className="text-muted-foreground">Phone Number</span>
                                  <span className="font-medium">{order.phone}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed py-1">
                                  <span className="text-muted-foreground">Email Address</span>
                                  <span className="font-medium">{order.email}</span>
                                </div>
                              </div>
                              <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); handleReorder(order); }}>
                                <RotateCcw className="h-4 w-4 mr-2" /> Reorder Items
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground border-b pb-2">Order Items ({order.items.length})</h4>
                              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                {order.items.map((item) => (
                                  <Link 
                                    key={item.product.id} 
                                    to={`/product/${item.product.id}`}
                                    className="flex items-center gap-3 bg-background p-2 rounded-xl border shadow-sm hover:border-primary/50 transition-colors"
                                  >
                                    <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded-lg object-cover" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold truncate">{item.product.name}</p>
                                      <p className="text-xs text-muted-foreground">{item.quantity} x ${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <p className="text-sm font-black text-primary">${(item.quantity * item.product.price).toFixed(2)}</p>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
