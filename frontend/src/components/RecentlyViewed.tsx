import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from '@/components/StarRating';
import type { Product } from '@/types';
import { Eye } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

interface RecentlyViewedProps {
  products: Product[];
}

const RecentlyViewed = ({ products }: RecentlyViewedProps) => {
  if (products.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Recently Viewed</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {products.slice(0, 8).map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="shrink-0 w-40">
            <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
              <div className="aspect-square overflow-hidden">
                <LazyImage src={p.image} alt={p.name} />
              </div>
              <CardContent className="p-2 space-y-0.5">
                <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">${p.price.toFixed(2)}</span>
                  <StarRating rating={p.rating} size={10} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
