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
      let producersArray = [];
      if (Array.isArray(data)) producersArray = data;
      else if (Array.isArray(data?.users)) producersArray = data.users;
      else if (Array.isArray(data?.producers)) producersArray = data.producers;
      else if (Array.isArray(data?.data)) producersArray = data.data;
      else if (Array.isArray(data?.data?.users)) producersArray = data.data.users;
      else if (Array.isArray(data?.data?.producers)) producersArray = data.data.producers;
      else if (Array.isArray(data?.data?.docs)) producersArray = data.data.docs;
      else if (Array.isArray(data?.data?.items)) producersArray = data.data.items;
      else if (Array.isArray(data?.docs)) producersArray = data.docs;
      else if (Array.isArray(data?.items)) producersArray = data.items;
      
      set({ producers: producersArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
