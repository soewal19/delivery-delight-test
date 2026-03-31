import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from '@/components/StarRating';
import type { Shop } from '@/types';
import { useShopStore } from '@/store/shopStore';
import { cn } from '@/lib/utils';
import LazyImage from '@/components/LazyImage';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard = ({ shop }: ShopCardProps) => {
  const { selectedShopId, setSelectedShop } = useShopStore();
  const isActive = selectedShopId === shop.id;

  return (
    <Card
      className={cn(
        'cursor-pointer overflow-hidden transition-all hover:shadow-md',
        isActive && 'ring-2 ring-primary shadow-md'
      )}
      onClick={() => setSelectedShop(isActive ? null : shop.id)}
    >
      <div className="aspect-video overflow-hidden">
        <LazyImage
          src={shop.image}
          alt={shop.name}
          className="transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-3 space-y-1">
        <h3 className="font-semibold text-foreground text-sm">{shop.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{shop.description}</p>
        <div className="flex items-center justify-between">
          <StarRating rating={shop.rating} size={12} />
          <span className="text-xs text-muted-foreground">{shop.productCount} items</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
