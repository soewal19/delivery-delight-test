import type { Product, Shop, Coupon, Order, CartItem } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('/api') ? `${API_BASE_URL.replace('/api', '')}${endpoint}` : `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API error' }));
    throw new Error(error.message || 'API error');
  }

  return response.json();
}

export const api = {
  shops: {
    list: (minRating?: number, maxRating?: number) => {
      const params = new URLSearchParams();
      if (minRating) params.append('minRating', minRating.toString());
      if (maxRating) params.append('maxRating', maxRating.toString());
      return fetchApi<Shop[]>(`/shops?${params.toString()}`);
    },
    get: (id: string) => fetchApi<Shop & { products: Product[] }>(`/shops/${id}`),
  },
  products: {
    list: (params: {
      page?: number;
      limit?: number;
      shopId?: string;
      categoryId?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, value.toString());
      });
      return fetchApi<{ items: Product[]; total: number; totalPages: number }>(`/products?${searchParams.toString()}`);
    },
    get: (id: string) => fetchApi<Product>(`/products/${id}`),
  },
  orders: {
    create: (data: { email: string; phone: string; address: string; total: number; items: { productId: string; quantity: number; price: number }[] }) =>
      fetchApi<Order>('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    find: (email?: string, phone?: string, orderId?: string) => {
      const params = new URLSearchParams();
      if (email) params.append('email', email);
      if (phone) params.append('phone', phone);
      if (orderId) params.append('orderId', orderId);
      return fetchApi<Order[]>(`/orders?${params.toString()}`);
    },
    get: (id: string) => fetchApi<Order>(`/orders/${id}`),
  },
  coupons: {
    list: () => fetchApi<Coupon[]>('/coupons'),
    validate: (code: string) => fetchApi<Coupon>(`/coupons/${code}/validate`),
  },
  users: {
    get: (email: string) => fetchApi<any>(`/users/${email}`),
    upsert: (data: { email: string; name?: string; avatar?: string }) => 
      fetchApi<any>('/users', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getStats: (id: string) => fetchApi<any>(`/users/${id}/stats`),
  },
};
