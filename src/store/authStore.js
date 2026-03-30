import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import profileService from '../services/profileService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthChecked: false, // Track if rehydration finished
      showUpgradeModal: false,
      setAuth: (token, user) => set({ token, user, isAuthChecked: true }),
      setShowUpgradeModal: (isOpen) => set({ showUpgradeModal: isOpen }),
      
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
      
      updatePassword: async (currentPassword, newPassword) => {
        try {
          const response = await profileService.updatePassword(currentPassword, newPassword);
          return response;
        } catch (error) {
          console.error('Erreur mise à jour mot de passe:', error);
          throw error;
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthChecked: true });
        localStorage.removeItem('auth-storage');
      },
    }),
    { 
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.isAuthChecked = true;
      }
    }
  )
);
