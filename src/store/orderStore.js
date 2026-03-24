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
  fetchOrderById: async (id) => {
    set({ loading: true });
    try {
      const data = await orderService.getOrderById(id);
      set({ selectedOrder: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  updateStatus: async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id ? { ...order, status } : order
        ),
        selectedOrder: state.selectedOrder?._id === id ? { ...state.selectedOrder, status } : state.selectedOrder
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
