import { create } from 'zustand';
import productService from '../services/productService';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const data = await productService.getAll();
      const productsArray = Array.isArray(data) ? data : (data.products || data.data || []);
      set({ products: productsArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  createProduct: async (formData) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.createProduct(formData);
      set((state) => ({
        products: [data, ...state.products],
        loading: false
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateProduct: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.updateProduct(id, formData);
      set((state) => ({
        products: state.products.map(p => p._id === id ? data : p),
        selectedProduct: state.selectedProduct?._id === id ? data : state.selectedProduct,
        loading: false
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const data = await productService.getById(id);
      set({ selectedProduct: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  updateProductStatus: async (id, status) => {
    try {
      await productService.updateProductStatus(id, status);
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? { ...p, status } : p
        ),
        selectedProduct: state.selectedProduct?._id === id ? { ...state.selectedProduct, status } : state.selectedProduct
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteProduct: async (id) => {
    try {
      await productService.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
