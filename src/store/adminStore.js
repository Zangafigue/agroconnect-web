import { create } from 'zustand';
import adminService from '../services/adminService';

export const useAdminStore = create((set) => ({
  stats: null,
  payments: [],
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const data = await adminService.getStats();
      set({ stats: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPayments: async () => {
    set({ loading: true });
    try {
      const data = await adminService.getPayments();
      set({ payments: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  releaseFunds: async (id) => {
    try {
      await adminService.releaseFunds(id);
      set((state) => ({
        payments: state.payments.map((p) =>
          p._id === id ? { ...p, status: 'LIBÉRÉ' } : p
        )
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  validateWithdrawal: async (id) => {
    try {
      await adminService.validateWithdrawal(id);
      set((state) => ({
        payments: state.payments.map((p) =>
          p._id === id ? { ...p, status: 'VALIDÉ' } : p
        )
      }));
    } catch (error) {
      set({ error: error.message });
    }
  }
}));
