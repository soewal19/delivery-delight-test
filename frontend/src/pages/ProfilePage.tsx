import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useCartStore } from '@/store/cartStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { 
  User as UserIcon, Settings, LogOut, Package, CreditCard, Camera, TrendingUp, Calendar, ShoppingBag, RotateCcw, Save, X, Loader2, ChevronDown, ChevronUp, Heart,
  StarIcon
} from 'lucide-react';
import { api } from '@/api/client';
import { useFavoriteStore } from '@/store/favoriteStore';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, updateProfile, logout, fetchProfile } = useUserStore();
  const { orders, fetchOrders, isLoading: ordersLoading } = useCartStore();
  const { favorites, fetchFavorites } = useFavoriteStore();
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders(user.email);
      fetchFavorites();
      loadStats();
    }
    if (user) {
      setName(user.name || '');
      setAvatarUrl(user.avatar || '');
    }
  }, [user?.email, user?.id]);

  const loadStats = async () => {
    if (!user?.id) return;
    try {
      const data = await api.users.getStats(user.id);
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats', err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large (max 5MB)');
      return;
    }

    setIsUploading(true);
    try {
      const { url } = await api.users.uploadAvatar(file);
      setAvatarUrl(url);
      await updateProfile({ avatar: url });
      toast.success('Avatar uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateProfile({ name, avatar: avatarUrl });
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="container py-16 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-2xl border-none">
          <CardHeader className="text-center space-y-2">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Personal Cabinet</CardTitle>
            <CardDescription>Please login to access your profile</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-6">
            <p className="text-muted-foreground mb-6">You need to be authenticated to view this page.</p>
            <Button variant="outline" onClick={() => window.location.href = '/'}>Go to Homepage</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  const fullAvatarUrl = avatarUrl.startsWith('http') || avatarUrl.startsWith('data:') 
    ? avatarUrl 
    : `${API_URL.replace('/api', '')}${avatarUrl}`;

  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl overflow-hidden">
              <AvatarImage src={fullAvatarUrl} alt={user.name || user.email} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {(user.name || user.email)[0].toUpperCase()}
              </AvatarFallback>
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
            </Avatar>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload}
            />
            <button 
              className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{user.name || 'Anonymous User'}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="font-medium">{user.email}</span>
              <Badge variant="secondary" className="text-[10px] uppercase">Member</Badge>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="destructive" size="sm" onClick={logout} className="shadow-lg hover:shadow-destructive/20">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto md:mx-0 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:shadow-md">
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-lg data-[state=active]:shadow-md">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-lg data-[state=active]:shadow-md">
            <Heart className="h-4 w-4 mr-2" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg data-[state=active]:shadow-md">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg border-none bg-gradient-to-br from-card to-muted/30 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Purchase Activity
                      </CardTitle>
                      <CardDescription>Monthly spending overview</CardDescription>
                    </div>
                    {stats?.summary && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${stats.summary.totalSpent.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats?.history || []}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <ChartTooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                          }}
                          itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="total" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorTotal)" 
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground shadow-xl border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Wallet Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-primary-foreground/20">
                    <span className="opacity-80">Order Count</span>
                    <span className="text-xl font-bold">{stats?.summary?.orderCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary-foreground/20">
                    <span className="opacity-80">Avg Order Value</span>
                    <span className="text-xl font-bold">${stats?.summary?.avgOrderValue?.toFixed(2) || '0.00'}</span>
                  </div>
                  <Button variant="secondary" className="w-full mt-4 font-bold">Add Funds</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              Your Order History
            </h2>
            <Badge variant="outline" className="px-3 py-1">{orders.length} total orders</Badge>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {orders.length === 0 ? (
              <Card className="bg-muted/30 border-dashed py-20">
                <CardContent className="flex flex-col items-center justify-center text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-lg">No orders found yet.</p>
                  <Button variant="link" className="mt-2" onClick={() => window.location.href = '/'}>Start Shopping</Button>
                </CardContent>
              </Card>
            ) : (
              orders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
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
                              <Badge className={`${(order as any).status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                {(order as any).status}
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
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="hidden sm:flex"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleOrder(order.id);
                              }}
                            >
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
                            <div className="border-t bg-muted/20 p-6 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Delivery Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="text-muted-foreground">Address:</span> {order.address}</p>
                                    <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
                                    <p><span className="text-muted-foreground">Email:</span> {order.email}</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Order Items</h4>
                                  <div className="space-y-3">
                                    {order.items.map((item) => (
                                      <Link 
                                        key={item.product.id} 
                                        to={`/product/${item.product.id}`}
                                        className="flex items-center gap-3 bg-background p-2 rounded-lg border shadow-sm hover:border-primary/50 transition-colors"
                                      >
                                        <img src={item.product.image} alt={item.product.name} className="h-10 w-10 rounded object-cover" />
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                                          <p className="text-xs text-muted-foreground">{item.quantity} x ${item.product.price.toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm font-bold">${(item.quantity * item.product.price).toFixed(2)}</p>
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
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              Your Favorite Products
            </h2>
            <Badge variant="outline" className="px-3 py-1">{favorites.length} products</Badge>
          </div>
          
          {favorites.length === 0 ? (
            <Card className="bg-muted/30 border-dashed py-20">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground">
                <Heart className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg">Your favorites list is empty.</p>
                <Button variant="link" className="mt-2" onClick={() => window.location.href = '/'}>Browse Products</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product) => (
                <div key={product.id} className="relative group">
                  <div className="aspect-square rounded-xl overflow-hidden border bg-muted mb-3 relative shadow-sm group-hover:shadow-md transition-all">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => useFavoriteStore.getState().toggleFavorite(product)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">{product.category}</Badge>
                    </div>
                  </div>
                  <Link to={`/product/${product.id}`} className="block space-y-1">
                    <h3 className="font-bold text-foreground truncate">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-black text-lg">${product.price.toFixed(2)}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-none shadow-xl max-w-2xl mx-auto overflow-hidden">
            <CardHeader className="bg-muted/30 pb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Profile Settings</CardTitle>
              </div>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-base font-semibold">Display Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Your name" 
                      className="pl-10 h-12 text-lg focus-visible:ring-primary"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">This is how your name will appear to others.</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="avatar-url" className="text-base font-semibold">Avatar Image</Label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Input 
                        id="avatar-url" 
                        value={avatarUrl} 
                        onChange={(e) => setAvatarUrl(e.target.value)} 
                        placeholder="Image URL or upload" 
                        className="h-12 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="h-12 px-6"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4 mr-2" />}
                        Upload File
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="h-12 px-4"
                        onClick={() => setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`)}
                        title="Generate random avatar"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Provide a URL, upload a file, or generate a random one.</p>
                </div>
              </div>

              <div className="pt-6 border-t flex flex-col sm:flex-row justify-end gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setName(user.name || '');
                    setAvatarUrl(user.avatar || '');
                    setActiveTab('overview');
                  }}
                  className="h-12 px-8"
                >
                  <X className="h-4 w-4 mr-2" />
                  Discard Changes
                </Button>
                <Button 
                  onClick={handleUpdate} 
                  disabled={isUpdating}
                  className="h-12 px-10 font-bold shadow-lg shadow-primary/20"
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Profile Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
