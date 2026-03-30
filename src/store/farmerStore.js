import { create } from 'zustand';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useFarmerStore = create((set, get) => ({
  stats: null,
  activeOrders: [],
  products: [],
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      // Intégration backend avec données par défaut (Mock) si l'API échoue (pour permettre le dev frontend contigu)
      const [statsRes, ordersRes] = await Promise.all([
        api.get('/farmer/stats'),
        api.get('/farmer/orders/active')
      ]);

      set({ 
        stats: statsRes.data, 
        activeOrders: ordersRes.data,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Erreur lors du chargement des données Agriculteur.');
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/farmer/orders');
      set({ activeOrders: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    try {
      // TODO: Backend dev to implement PATCH /farmer/orders/:id/status
      await api.patch(`/farmer/orders/${orderId}/status`, { status: newStatus }).catch(e => console.warn("API manquante, fallback local."));
      
      const orders = get().activeOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      set({ activeOrders: orders });
      toast.success(`Commande ${orderId} mise à jour (${newStatus}).`);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour.');
    }
  }
}));
