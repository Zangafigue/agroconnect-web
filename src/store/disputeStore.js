import { create } from 'zustand';
import disputeService from '../services/disputeService';

export const useDisputeStore = create((set) => ({
  disputes: [],
  loading: false,
  error: null,
  fetchDisputes: async () => {
    set({ loading: true });
    try {
      const data = await disputeService.getDisputes();
      set({ disputes: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  resolveDispute: async (id, solution) => {
    try {
      await disputeService.resolveDispute(id, solution);
      set((state) => ({
        disputes: state.disputes.map((d) =>
          d.id === id ? { ...d, status: 'RÉSOLU' } : d
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
