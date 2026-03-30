import axios from '../api/axios';

const orderService = {
  // ====================================================================
  // BUYER ORDER ROUTES NEEDED:
  //   POST /api/orders        → create a new order
  //   GET  /api/orders/mine   → get the current buyer's orders
  // ====================================================================

  /**
   * Create a new order (buyer places order on a product).
   * Payload: { productId, quantity, deliveryAddress, deliveryDate, notes }
   */
  createOrder: async (payload) => {
    const response = await axios.post('/orders', payload);
    return response.data;
  },

  /**
   * Get orders belonging to the currently logged-in buyer.
   */
  getMyOrders: async () => {
    const response = await axios.get('/orders/mine');
    return response.data;
  },

  // Admin routes
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
  },

  /**
   * Farmer confirms order availability & logistics
   * POST /orders/:id/confirm
   */
  confirmOrder: async (id) => {
    const response = await axios.post(`/orders/${id}/confirm`);
    return response.data;
  },

  /**
   * Buyer pays the order (Product + Delivery)
   * PATCH /orders/:id/pay
   */
  payOrder: async (id) => {
    const response = await axios.patch(`/orders/${id}/pay`);
    return response.data;
  }
};

export default orderService;
