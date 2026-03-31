export interface Comment {
  id: string;
  author: string;
  text: string;
  rating: number;
  productId: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  shopId: string;
  shop?: Shop;
  categoryId: string;
  category: string;
  comments: Comment[];
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  productCount: number;
  lat?: number;
  lng?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  active: boolean;
  description?: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc';
