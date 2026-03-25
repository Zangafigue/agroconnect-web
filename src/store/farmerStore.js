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
        api.get('/farmer/stats').catch(() => ({ 
          data: { 
            totalSales: 1250000, 
            activeOrders: 8, 
            productsListed: 14,
            pendingReviews: 3,
            revenueGrowth: 12.5
          } 
        })),
        api.get('/farmer/orders/active').catch(() => ({
          data: [
            { id: 'CMD-001', buyer: 'Coopérative Faso', product: 'Maïs Blanc', quantity: '5 Tonnes', amount: 750000, status: 'PENDING', date: '2026-03-24' },
            { id: 'CMD-002', buyer: 'Société Céréalière', product: 'Sorgho Rouge', quantity: '2 Tonnes', amount: 320000, status: 'PROCESSING', date: '2026-03-23' },
            { id: 'CMD-003', buyer: 'Marché Central', product: 'Oignons', quantity: '500 kg', amount: 180000, status: 'SHIPPED', date: '2026-03-22' }
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
      toast.error('Erreur lors du chargement des données Agriculteur.');
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/farmer/orders').catch(() => ({
        data: get().activeOrders // Fallback
      }));
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
