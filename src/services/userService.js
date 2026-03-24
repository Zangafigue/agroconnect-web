import axios from '../api/axios';

const userService = {
  getUsers: async () => {
    const response = await axios.get('/admin/users');
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axios.get(`/admin/users/${id}`);
    return response.data;
  },
  updateUserRole: async (id, role) => {
    const response = await axios.patch(`/admin/users/${id}`, { role });
    return response.data;
  },
  updateUserStatus: async (id, isActive) => {
    const response = await axios.patch(`/admin/users/${id}/status`, { isActive });
    return response.data;
  },
  updateUser: async (id, data) => {
    const response = await axios.patch(`/admin/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await axios.delete(`/admin/users/${id}`);
    return response.data;
  },
  createUser: async (data) => {
    const response = await axios.post('/admin/users', data);
    return response.data;
  }
};

export default userService;
