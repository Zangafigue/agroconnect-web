import axios from '../api/axios';

const adminService = {
  getStats: async () => {
    const response = await axios.get('/admin/stats');
    return response.data;
  },
  getPayments: async () => {
    const response = await axios.get('/admin/payments');
    return response.data;
  },
  releaseFunds: async (id) => {
    const response = await axios.post(`/admin/payments/${id}/release`);
    return response.data;
  },
  validateWithdrawal: async (id) => {
    const response = await axios.patch(`/admin/payments/withdrawals/${id}/validate`);
    return response.data;
  }
};

export default adminService;
