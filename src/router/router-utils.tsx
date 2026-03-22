import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Layout from '../components/shared/Layout';

// Fallback Loader Component
export const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-surface">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-primary font-serif-display text-xl animate-pulse">AgroConnect...</p>
    </div>
  </div>
);

// Helper for Private Routes
export const PrivateRoute = ({ roles }: { roles?: string[] }) => {
  const { token, user } = useAuthStore() as any;
  
  if (!token) return <Navigate to="/login" replace />;
  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export const suspenseWrapper = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);
