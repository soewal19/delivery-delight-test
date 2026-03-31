import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/api/client';
import { useUserStore } from './userStore';
import type { CartItem, Product, Order } from '@/types';

interface CartState {
  items: CartItem[];
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  couponCode: string | null;
  couponDiscount: number;

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  submitOrder: (email: string, phone: string, address: string) => Promise<Order>;
  fetchOrders: (email?: string, phone?: string, orderId?: string) => Promise<void>;
  reorder: (order: Order) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],
      isLoading: false,
      error: null,
      couponCode: null,
      couponDiscount: 0,

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),

      applyCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      fetchOrders: async (email, phone, orderId) => {
        set({ isLoading: true });
        try {
          const orders = await api.orders.find(email, phone, orderId);
          set({ orders, isLoading: false, error: null });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      submitOrder: async (email, phone, address) => {
        const state = get();
        const user = useUserStore.getState().user;
        const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
        const discount = state.couponDiscount;
        const total = Math.max(0, subtotal - (subtotal * discount) / 100);

        set({ isLoading: true });
        try {
          const order = await api.orders.create({
            email,
            phone,
            address,
            total: Math.round(total * 100) / 100,
            userId: user?.id,
            items: state.items.map((i) => ({
              productId: i.product.id,
              quantity: i.quantity,
              price: i.product.price,
            })),
          });

          set((state) => ({
            orders: [order, ...state.orders],
            items: [],
            couponCode: null,
            couponDiscount: 0,
            isLoading: false,
            error: null,
          }));

          return order;
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      reorder: (order) => {
        set((state) => {
          const newItems = [...state.items];
          for (const orderItem of order.items) {
            const existing = newItems.find((i) => i.product.id === orderItem.product.id);
            if (existing) {
              existing.quantity += orderItem.quantity;
            } else {
              newItems.push({ ...orderItem });
            }
          }
          return { items: newItems };
        });
      },

      getTotal: () => {
        const state = get();
        const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
        const discount = state.couponDiscount;
        return Math.round(Math.max(0, subtotal - (subtotal * discount) / 100) * 100) / 100;
      },

      getItemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: 'food-delivery-cart' }
  )
);
