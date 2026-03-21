import axios from '../api/axios';

const orderService = {
  getOrders: async () => {
    const response = await axios.get('/orders');
    return response.data;
  },
  getOrderById: async (id) => {
    const response = await axios.get(`/orders/${id}`);
    return response.data;
  },
  updateOrderStatus: async (id, status) => {
    const response = await axios.patch(`/orders/${id}`, { status });
    return response.data;
  }
};

export default orderService;
