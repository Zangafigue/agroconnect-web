import axios from 'axios';

const API_URL = 'http://localhost:5000/api/disputes';

const disputeService = {
  getDisputes: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching disputes:', error);
      return [];
    }
  },
  getDisputeById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching dispute ${id}:`, error);
      return null;
    }
  },
  resolveDispute: async (id, solution) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/resolve`, { solution });
      return response.data;
    } catch (error) {
      console.error(`Error resolving dispute ${id}:`, error);
      throw error;
    }
  }
};

export default disputeService;
