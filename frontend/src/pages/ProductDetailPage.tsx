import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarRating from '@/components/StarRating';
import ProductPagination from '@/components/ProductPagination';
import CartAnimation from '@/components/CartAnimation';
import ShopMap from '@/components/ShopMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { ArrowLeft, Plus, Send, MessageCircle, Percent, Loader2, Store } from 'lucide-react';
import { useShopStore } from '@/store/shopStore';
import { useCartStore } from '@/store/cartStore';
import { useViewedStore } from '@/store/viewedStore';
import { api } from '@/api/client';
import { toast } from 'sonner';
import type { Comment, Product } from '@/types';

const REVIEWS_PER_PAGE = 6;

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const products = useShopStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const addViewed = useViewedStore((s) => s.addViewed);
  
  const [product, setProduct] = useState<Product | null>(
    products.find((p) => p.id === id) || null
  );
  const [isLoading, setIsLoading] = useState(!product);
  const [reviewPage, setReviewPage] = useState(1);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [showCartAnim, setShowCartAnim] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      if (product && product.id === id) return;
      
      setIsLoading(true);
      try {
        const data = await api.products.get(id);
        setProduct(data);
        addViewed(data.id);
      } catch (err) {
        toast.error('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id, addViewed]);

  if (isLoading) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <p className="text-2xl text-muted-foreground">Product not found</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to shop
          </Button>
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const allComments = [...localComments, ...product.comments];
  const totalReviewPages = Math.ceil(allComments.length / REVIEWS_PER_PAGE);
  const paginatedComments = allComments.slice(
    (reviewPage - 1) * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE
  );

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    const newComment: Comment = {
      id: String(Date.now()),
      author: author.trim(),
      text: text.trim(),
      rating,
      productId: product.id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLocalComments((prev) => [newComment, ...prev]);
    setAuthor('');
    setText('');
    setRating(5);
    setReviewPage(1);
    toast.success('Review added!');
  };

  const handleAddToCart = () => {
    addItem(product);
    setShowCartAnim(true);
    toast.success(`${product.name} added to cart`);
  };

  const avgRating =
    allComments.length > 0
      ? allComments.reduce((s, c) => s + c.rating, 0) / allComments.length
      : product.rating;

  return (
    <>
      <CartAnimation show={showCartAnim} onComplete={() => setShowCartAnim(false)} />
      <div className="container py-8 space-y-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="relative aspect-square overflow-hidden rounded-2xl border bg-muted"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            {discountPercent > 0 && (
              <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-base px-3 py-1 gap-1">
                <Percent className="h-4 w-4" />
                -{discountPercent}%
              </Badge>
            )}
          </motion.div>
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <Badge variant="secondary" className="w-fit">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="text-muted-foreground text-lg">{product.description}</p>
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} size={20} />
              <span className="text-sm text-muted-foreground">
                {avgRating.toFixed(1)} ({allComments.length} reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <p className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
              )}
            </div>
            {discountPercent > 0 && (
              <p className="text-sm text-destructive font-medium">You save ${(product.originalPrice! - product.price).toFixed(2)}!</p>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleAddToCart} size="lg" className="w-fit">
                  <Plus className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add this item to your shopping cart</TooltipContent>
            </Tooltip>
          </motion.div>
        </div>

        {/* Map Section */}
        {product.shop?.lat && product.shop?.lng && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Find Us</h2>
            </div>
            <ShopMap 
              shopLat={product.shop.lat} 
              shopLng={product.shop.lng} 
              shopName={product.shop.name} 
            />
          </div>
        )}

        {/* Reviews section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Reviews ({allComments.length})</h2>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Leave a review</h3>
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your name" value={author} onChange={(e) => setAuthor(e.target.value)} />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setRating(v)}
                        className={`text-xl transition-colors ${v <= rating ? 'text-yellow-500' : 'text-muted-foreground/30'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea placeholder="Write your review..." value={text} onChange={(e) => setText(e.target.value)} rows={3} />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" size="sm">
                      <Send className="h-4 w-4 mr-1" /> Submit Review
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Submit your review for this product</TooltipContent>
                </Tooltip>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedComments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                    </div>
                    <StarRating rating={comment.rating} size={14} />
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {allComments.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first!</p>
          )}

          <ProductPagination currentPage={reviewPage} totalPages={totalReviewPages} onPageChange={setReviewPage} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
