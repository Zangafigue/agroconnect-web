import { create } from 'zustand';
import productService from '../services/productService';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async (params) => {
    set({ loading: true });
    try {
      const data = await productService.getAll(params);
      const productsArray = Array.isArray(data) ? data : (data.products || data.data || []);
      set({ products: productsArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const product = await productService.getById(id);
      set({ loading: false });
      return product;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
