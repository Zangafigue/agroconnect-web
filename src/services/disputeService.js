import axios from '../api/axios';

const disputeService = {
  getDisputes: async () => {
    const response = await axios.get('/admin/disputes');
    return response.data;
  },
  getDisputeById: async (id) => {
    const response = await axios.get(`/admin/disputes/${id}`);
    return response.data;
  },
  resolveDispute: async (id, solution) => {
    const response = await axios.post(`/admin/disputes/${id}/resolve`, { solution });
    return response.data;
  }
};

export default disputeService;
