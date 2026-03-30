import { create } from 'zustand';
import axios from '../api/axios';

export const useNotificationStore = create((set) => ({
  notifications: [],
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      // Pour tous les utilisateurs connectés
      const response = await axios.get('/notifications/mine');
      set({ notifications: response.data, loading: false });
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      set({ loading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      await axios.patch(`/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      }));
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  },

  markAllAsRead: async () => {
    try {
      await axios.patch('/notifications/read-all');
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
      }));
    } catch (error) {
      console.error('Erreur lors du marquage global:', error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await axios.delete(`/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter((n) => n._id !== id)
      }));
    } catch (error) {
      console.error('Erreur lors de la suppression de la notification:', error);
    }
  }
}));
