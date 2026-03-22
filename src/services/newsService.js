import api from '../api/axios';

const newsService = {
  getAll: async (params) => {
    const response = await api.get('/news', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
};

export default newsService;
