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
      const usersArray = Array.isArray(data) ? data : (data.users || data.data || []);
      set({ users: usersArray, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
