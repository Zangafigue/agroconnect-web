import axios from '../api/axios';

const orderService = {
  getOrders: async () => {
    const response = await axios.get('/admin/orders');
    return response.data;
  },
  getOrderById: async (id) => {
    const response = await axios.get(`/admin/orders/${id}`);
    return response.data;
  },
  updateOrderStatus: async (id, status) => {
    const response = await axios.patch(`/admin/orders/${id}`, { status });
    return response.data;
  }
};

export default orderService;
