import { create } from 'zustand';
import userService from '../services/userService';

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const data = await userService.getUsers();
      const usersArray = Array.isArray(data) ? data : (data.users || data.data?.users || data.data || []);
      set({ users: usersArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchUserById: async (id) => {
    set({ loading: true });
    try {
      const data = await userService.getUserById(id);
      set({ selectedUser: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  updateUser: async (id, data) => {
    try {
      const updated = await userService.updateUser(id, data);
      set((state) => ({
        users: state.users.map((u) => u._id === id ? { ...u, ...updated } : u),
        selectedUser: state.selectedUser?._id === id ? { ...state.selectedUser, ...updated } : state.selectedUser
      }));
      return updated;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  updateUserStatus: async (id, isActive) => {
    try {
      await userService.updateUserStatus(id, isActive);
      set((state) => ({
        users: state.users.map((u) => u._id === id ? { ...u, isActive } : u),
        selectedUser: state.selectedUser?._id === id ? { ...state.selectedUser, isActive } : state.selectedUser
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
  deleteUser: async (id) => {
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        selectedUser: state.selectedUser?._id === id ? null : state.selectedUser
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
