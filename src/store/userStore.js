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
      let usersArray = [];
      if (Array.isArray(data)) usersArray = data;
      else if (Array.isArray(data?.users)) usersArray = data.users;
      else if (Array.isArray(data?.data)) usersArray = data.data;
      else if (Array.isArray(data?.data?.users)) usersArray = data.data.users;
      else if (Array.isArray(data?.data?.docs)) usersArray = data.data.docs;
      else if (Array.isArray(data?.data?.items)) usersArray = data.data.items;
      else if (Array.isArray(data?.docs)) usersArray = data.docs;
      else if (Array.isArray(data?.items)) usersArray = data.items;
      
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
