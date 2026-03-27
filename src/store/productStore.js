import { create } from 'zustand';
import productService from '../services/productService';
import { normalizeProductImages } from '../utils/image';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const data = await productService.getAll();
      const productsArray = Array.isArray(data) ? data : (data.products || data.data || []);
      set({ products: productsArray.map(normalizeProductImages), loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  createProduct: async (formData) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.createProduct(formData);
      const normalized = normalizeProductImages(data);
      set((state) => ({
        products: [normalized, ...state.products],
        loading: false
      }));
      return normalized;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateProduct: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.updateProduct(id, formData);
      const normalized = normalizeProductImages(data);
      set((state) => ({
        products: state.products.map(p => p._id === id ? normalized : p),
        selectedProduct: state.selectedProduct?._id === id ? normalized : state.selectedProduct,
        loading: false
      }));
      return normalized;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const data = await productService.getById(id);
      const normalized = normalizeProductImages(data);
      set({ selectedProduct: normalized, loading: false });
      return normalized;
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
