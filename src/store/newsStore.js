import { create } from 'zustand';
import newsService from '../services/newsService';

export const useNewsStore = create((set) => ({
  news: [],
  loading: false,
  error: null,
  
  fetchNews: async (params) => {
    set({ loading: true });
    try {
      const data = await newsService.getAll(params);
      const newsArray = Array.isArray(data) ? data : (data.news || data.data || []);
      set({ news: newsArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
