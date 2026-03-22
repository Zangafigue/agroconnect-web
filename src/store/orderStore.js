import { create } from 'zustand';
import orderService from '../services/orderService';

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,
  fetchOrders: async () => {
    set({ loading: true });
    try {
      const data = await orderService.getOrders();
      const ordersArray = Array.isArray(data) ? data : (data.orders || data.data || []);
      set({ orders: ordersArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  updateStatus: async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id ? { ...order, status } : order
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
