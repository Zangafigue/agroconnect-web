import axios from '../api/axios';

const userService = {
  getUsers: async () => {
    const response = await axios.get('/users');
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  },
  updateUserRole: async (id, role) => {
    const response = await axios.patch(`/users/${id}`, { role });
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await axios.delete(`/users/${id}`);
    return response.data;
  }
};

export default userService;
