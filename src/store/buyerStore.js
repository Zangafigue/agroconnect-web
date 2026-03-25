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
        api.get('/buyer/stats').catch(() => ({ 
          data: { 
            activeOrdersCount: 2, 
            favoritesCount: 12, 
            unreadMessages: 5,
            totalSpent: 450000
          } 
        })),
        api.get('/buyer/orders/active').catch(() => ({
          data: [
            { id: 'CMD-B-882', product: 'Pommes de terre', qty: '50kg', status: 'SHIPPED', price: 25000, date: '2026-03-21', seller: 'Coopérative de Fada' },
            { id: 'CMD-B-881', product: 'Oignons Galmi', qty: '2 sacs', status: 'CONFIRMED', price: 30000, date: '2026-03-20', seller: 'Ferme Kadiogo' }
          ]
        }))
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
