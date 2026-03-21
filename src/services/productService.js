import api from '../api/axios';

const productService = {
  getAll: async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  // Add more methods as needed (create, update, delete)
};

export default productService;
