import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('auth-storage');
  if (stored) {
    try {
      const { state } = JSON.parse(stored);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    } catch (e) {
      console.error('Failed to parse auth storage', e);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    const requestUrl = error.config?.url || '';
    const currentPath = window.location.pathname;

    // Only force-logout if the failed request is to an auth-specific endpoint
    // (e.g., token verification, profile fetch) OR if we're not already in a protected area.
    // Background data requests (products, orders, etc.) returning 401 should NOT wipe the session.
    const isAuthEndpoint = requestUrl.includes('/auth/') || requestUrl.includes('/me');
    const isOnProtectedPage = currentPath.startsWith('/farmer') || 
                              currentPath.startsWith('/buyer') || 
                              currentPath.startsWith('/transporter') || 
                              currentPath.startsWith('/admin');

    if (isAuthEndpoint || !isOnProtectedPage) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    // Otherwise swallow the 401 silently – the user is already logged in
  }
  return Promise.reject(error);
});

export default api;
