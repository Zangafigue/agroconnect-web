import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import profileService from '../services/profileService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      
      updateUser: (partialUser) => set((state) => ({
        user: state.user ? { ...state.user, ...partialUser } : null
      })),

      updateProfile: async (data) => {
        try {
          const response = await profileService.updateProfile(data);
          set({ user: response.user });
          return response;
        } catch (error) {
          console.error('Erreur mise à jour profil:', error);
          throw error;
        }
      },

      uploadPicture: async (file) => {
        try {
          const response = await profileService.uploadPicture(file);
          set({ user: response.user });
          return response;
        } catch (error) {
          console.error('Erreur upload photo:', error);
          throw error;
        }
      },

      logout: () => {
        set({ token: null, user: null });
        localStorage.removeItem('auth-storage');
      },
    }),
    { name: 'auth-storage' }
  )
);
