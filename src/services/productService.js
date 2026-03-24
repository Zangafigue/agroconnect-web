import api from '../api/axios';

const productService = {
  getAll: async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  getAllAdmin: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  updateProductStatus: async (id, status) => {
    const response = await api.patch(`/admin/products/${id}/status`, { status });
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  }
};

export default productService;
