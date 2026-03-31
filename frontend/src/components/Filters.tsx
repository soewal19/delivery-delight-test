import React from 'react';
import { useShopStore } from '@/store/shopStore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import type { SortOption } from '@/types';

const Filters = () => {
  const {
    categories,
    selectedCategories,
    toggleCategory,
    clearCategories,
    sortOption,
    setSortOption,
    ratingFilter,
    setRatingFilter,
  } = useShopStore();

  return (
    <div className="space-y-6 rounded-lg border bg-card p-4">
      {/* Sort */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Sort by</h4>
        <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="rating-desc">Rating (High → Low)</SelectItem>
            <SelectItem value="price-asc">Price (Low → High)</SelectItem>
            <SelectItem value="price-desc">Price (High → Low)</SelectItem>
            <SelectItem value="name-asc">Name (A → Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Categories</h4>
          {selectedCategories.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCategories} className="h-auto py-0 px-1 text-xs text-muted-foreground">
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">
          Shop Rating: {ratingFilter[0].toFixed(1)} – {ratingFilter[1].toFixed(1)}
        </h4>
        <Slider
          min={1}
          max={5}
          step={0.5}
          value={ratingFilter}
          onValueChange={(v) => setRatingFilter(v as [number, number])}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Filters;
