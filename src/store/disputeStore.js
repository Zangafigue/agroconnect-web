import { create } from 'zustand';
import disputeService from '../services/disputeService';

export const useDisputeStore = create((set) => ({
  disputes: [],
  selectedDispute: null,
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

  fetchDisputeById: async (id) => {
    set({ loading: true });
    try {
      const data = await disputeService.getDisputeById(id);
      set({ selectedDispute: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  resolveDispute: async (id, solution) => {
    try {
      await disputeService.resolveDispute(id, solution);
      set((state) => ({
        disputes: state.disputes.map((d) =>
          d._id === id ? { ...d, status: 'RÉSOLU' } : d
        ),
        selectedDispute: state.selectedDispute?._id === id ? { ...state.selectedDispute, status: 'RÉSOLU' } : state.selectedDispute
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
