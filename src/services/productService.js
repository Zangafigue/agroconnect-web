import api from '../api/axios';

const productService = {
  getAll: async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  createProduct: async (formData) => {
    const response = await api.post('/products', formData);
    return response.data;
  },
  updateProduct: async (id, payload) => {
    // If payload is FormData but contains no image files, convert to JSON to avoid
    // crashing backends that don't have Multer configured on their PUT route.
    let body = payload;
    let headers = {};
    if (payload instanceof FormData) {
      const hasImages = payload.getAll('images').some(v => v instanceof File && v.size > 0);
      if (!hasImages) {
        // Convert FormData fields to a plain object for a standard JSON request
        const json = {};
        payload.forEach((value, key) => { if (key !== 'images') json[key] = value; });
        body = json;
        headers = { 'Content-Type': 'application/json' };
      }
    }
    const response = await api.put(`/products/${id}`, body, { headers });
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
  updateMyProductStatus: async (id, status) => {
    const response = await api.patch(`/products/${id}/status`, { status });
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  }
};

export default productService;
