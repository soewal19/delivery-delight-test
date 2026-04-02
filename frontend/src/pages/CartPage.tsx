import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Trash2, Minus, Plus, Tag, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/api/client';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotal, applyCoupon, removeCoupon, couponCode, couponDiscount, submitOrder, isLoading } = useCartStore();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);

  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!phone.match(/^\+?[\d\s()-]{7,}$/)) errs.phone = 'Valid phone number required';
    if (address.trim().length < 5) errs.address = 'Address must be at least 5 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setIsValidatingCoupon(true);
    try {
      const coupon = await api.coupons.validate(couponInput.trim());
      applyCoupon(coupon.code, coupon.discount);
      toast.success(`Coupon ${coupon.code} applied! ${coupon.discount}% off`);
    } catch (err: any) {
      toast.error(err.message || 'Invalid or inactive coupon code');
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) { toast.error('Cart is empty'); return; }
    
    try {
      const order = await submitOrder(email, phone, address);
      toast.success(`Order #${order.id} placed successfully!`);
      navigate('/orders');
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order');
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <span className="text-5xl mb-4">🛒</span>
          <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
          <Button onClick={() => navigate('/')}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map(({ product, quantity }) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                      <img src={product.image} alt={product.name} className="h-20 w-20 rounded-md object-cover" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Decrease quantity</TooltipContent>
                        </Tooltip>
                        <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Increase quantity</TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="font-semibold text-foreground w-20 text-right">${(product.price * quantity).toFixed(2)}</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(product.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Remove from cart</TooltipContent>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="destructive" size="sm" onClick={clearCart}>Clear Cart</Button>
              </TooltipTrigger>
              <TooltipContent>Remove all items from cart</TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Coupon</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {couponCode ? (
                  <div className="flex items-center justify-between rounded-md bg-secondary p-2">
                    <span className="flex items-center gap-1 text-sm font-medium text-secondary-foreground">
                      <Tag className="h-3 w-3" /> {couponCode} (–{couponDiscount}%)
                    </span>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>Remove</Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1"
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          onClick={handleApplyCoupon}
                          disabled={isValidatingCoupon || !couponInput}
                        >
                          {isValidatingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Apply coupon code for discount</TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600"><span>Discount (–{couponDiscount}%)</span><span>–${((subtotal * couponDiscount) / 100).toFixed(2)}</span></div>
                )}
                <div className="flex justify-between font-bold text-foreground border-t pt-2 text-base"><span>Total</span><span>${getTotal().toFixed(2)}</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Delivery Details</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+380 50 123 4567" />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Kyiv" />
                    {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        className="w-full mt-4 h-12 text-lg font-bold shadow-lg shadow-primary/20"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Place Order'
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Complete your order and proceed to checkout</TooltipContent>
                  </Tooltip>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
