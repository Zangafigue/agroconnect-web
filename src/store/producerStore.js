import { create } from 'zustand';
import producerService from '../services/producerService';

export const useProducerStore = create((set) => ({
  producers: [],
  loading: false,
  error: null,
  
  fetchProducers: async (params) => {
    set({ loading: true });
    try {
      const data = await producerService.getAll(params);
      const producersArray = Array.isArray(data) ? data : (data.users || data.producers || data.data?.users || data.data || []);
      set({ producers: producersArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
