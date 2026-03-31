import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Plus, Percent } from 'lucide-react';
import StarRating from '@/components/StarRating';
import CartAnimation from '@/components/CartAnimation';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

import LazyImage from '@/components/LazyImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const [showCartAnim, setShowCartAnim] = useState(false);
  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setShowCartAnim(true);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <CartAnimation show={showCartAnim} onComplete={() => setShowCartAnim(false)} />
      <Link to={`/product/${product.id}`}>
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Card className="group overflow-hidden transition-all hover:shadow-lg h-full">
            <div className="relative aspect-[4/3] overflow-hidden">
              <LazyImage
                src={product.image}
                alt={product.name}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {product.category}
              </span>
              {discountPercent > 0 && (
                <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground gap-1">
                  <Percent className="h-3 w-3" />
                  -{discountPercent}%
                </Badge>
              )}
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground leading-tight line-clamp-1">{product.name}</h3>
                <div className="text-right shrink-0">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="block text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <StarRating rating={product.rating} size={14} />
                <span className="text-xs text-muted-foreground">{product.comments.length} reviews</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleAdd} className="w-full mt-2" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add to Cart
                  </Button>
                </TooltipTrigger>
                <TooltipContent>The item should be added in the Shopping Cart</TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </>
  );
};

export default ProductCard;
