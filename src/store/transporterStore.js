import { create } from 'zustand';
import api from '../api/axios';

export const useTransporterStore = create((set) => ({
  // Missions (available transport requests)
  missions: [],
  missionsLoading: false,

  // My active/past deliveries
  deliveries: [],
  deliveriesLoading: false,

  // My submitted offers
  offers: [],
  offersLoading: false,

  // Wallet
  wallet: null,
  walletLoading: false,

  fetchMissions: async () => {
    set({ missionsLoading: true });
    try {
      const { data } = await api.get('/orders?status=PENDING');
      const arr = Array.isArray(data) ? data : (data.orders || data.data || []);
      set({ missions: arr, missionsLoading: false });
    } catch {
      set({ missionsLoading: false });
    }
  },

  fetchDeliveries: async () => {
    set({ deliveriesLoading: true });
    try {
      const { data } = await api.get('/deliveries/me');
      const arr = Array.isArray(data) ? data : (data.deliveries || data.data || []);
      set({ deliveries: arr, deliveriesLoading: false });
    } catch {
      set({ deliveriesLoading: false });
    }
  },

  fetchOffers: async () => {
    set({ offersLoading: true });
    try {
      const { data } = await api.get('/offers/me');
      const arr = Array.isArray(data) ? data : (data.offers || data.data || []);
      set({ offers: arr, offersLoading: false });
    } catch {
      set({ offersLoading: false });
    }
  },

  submitOffer: async (orderId, payload) => {
    const { data } = await api.post(`/orders/${orderId}/offers`, payload);
    return data;
  },

  fetchWallet: async () => {
    set({ walletLoading: true });
    try {
      const { data } = await api.get('/wallet/me');
      set({ wallet: data, walletLoading: false });
    } catch {
      set({ walletLoading: false });
    }
  },

  updateDeliveryStatus: async (id, status) => {
    await api.patch(`/deliveries/${id}`, { status });
    set((state) => ({
      deliveries: state.deliveries.map((d) =>
        (d._id === id || d.id === id) ? { ...d, status } : d
      ),
    }));
  },
}));
