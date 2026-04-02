import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface SocketState {
  socket: Socket | null;
  isSocketConnected: boolean;
  isDbConnected: boolean;
  
  connect: () => void;
  disconnect: () => void;
  setDbStatus: (status: boolean) => void;
  checkHealth: () => Promise<void>;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;
const API_URL = import.meta.env.VITE_API_URL || `${window.location.origin}/api`;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isSocketConnected: false,
  isDbConnected: false,

  checkHealth: async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      set({ isDbConnected: data.status === 'ok' });
    } catch (error) {
      console.error('Health check failed:', error);
      set({ isDbConnected: false });
    }
  },

  connect: () => {
    // Also perform an initial health check
    get().checkHealth();
    
    if (get().socket?.connected) return;

    const socket = io(SOCKET_URL, {
      transports: ['polling', 'websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socket.on('connect', () => {
      set({ isSocketConnected: true });
    });

    socket.on('disconnect', () => {
      set({ isSocketConnected: false });
    });

    socket.on('db_status', (data: { isHealthy: boolean }) => {
      set({ isDbConnected: data.isHealthy });
    });

    // Handle real-time order status updates
    socket.on('order_update', (data: { orderId: string, status: string }) => {
      console.log('Order update received:', data);
      const statusLabels: Record<string, string> = {
        confirmed: '✅ Order Confirmed!',
        cooking: '👨‍🍳 Chef is cooking your food!',
        on_the_way: '🛵 Delivery is on the way!',
        delivered: '🎉 Food delivered! Enjoy your meal!',
      };
      
      const label = statusLabels[data.status] || `Order status: ${data.status}`;
      toast(label, {
        description: `Order ID: ${data.orderId}`,
        duration: 5000,
      });
    });

    set({ socket });
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, isSocketConnected: false });
  },

  setDbStatus: (isDbConnected) => set({ isDbConnected }),
}));
