import api from '../api/axios';

const producerService = {
  getAll: async (params) => {
    const response = await api.get('/users?role=FARMER', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/producers/${id}`);
    return response.data;
  },
};

export default producerService;
