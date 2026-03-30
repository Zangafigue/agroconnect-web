import { create } from 'zustand';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useBuyerStore = create((set, get) => ({
  stats: null,
  activeOrders: [],
  favorites: [],
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      // API with Fallback Mock for UI dev
      const [statsRes, ordersRes] = await Promise.all([
        api.get('/buyer/stats'),
        api.get('/buyer/orders/active')
      ]);

      set({ 
        stats: statsRes.data, 
        activeOrders: ordersRes.data,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Erreur lors du chargement des données Acheteur.');
    }
  }
}));
