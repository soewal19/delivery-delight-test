import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductPagination from '@/components/ProductPagination';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { api } from '@/api/client';
import type { Coupon } from '@/types';
import { Tag, Copy, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 6;

const CouponsPage = () => {
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const data = await api.coupons.list();
        setCoupons(data);
      } catch (err) {
        toast.error('Failed to load coupons');
      } finally {
        setIsLoading(false);
      }
    };
    loadCoupons();
  }, []);

  const activeCoupons = coupons.filter((c) => c.active);
  const totalPages = Math.ceil(activeCoupons.length / ITEMS_PER_PAGE);
  const paginated = activeCoupons.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success(`Coupon code "${code}" copied!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Coupons</h1>
        <p className="text-muted-foreground mt-1">Apply these codes at checkout to save on your order</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg border-2 border-dashed" />
          ))
        ) : paginated.length > 0 ? (
          paginated.map((coupon, i) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
            <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-bold text-foreground">{coupon.code}</code>
                    <Badge variant="secondary">{coupon.discount}% off</Badge>
                  </div>
                  {coupon.description && (
                    <p className="text-xs text-muted-foreground truncate">{coupon.description}</p>
                  )}
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(coupon.code, coupon.id)}
                      className="shrink-0"
                    >
                      {copiedId === coupon.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Click to copy code to clipboard</TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">No coupons available at the moment.</p>
          </div>
        )}
      </div>
      <ProductPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default CouponsPage;
