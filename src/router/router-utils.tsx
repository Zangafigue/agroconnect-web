import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { normalizeRole, getRoleSlug } from '../utils/auth';
import AdminLayout from '../components/shared/AdminLayout';
import UserLayout from '../components/shared/UserLayout';

// Fallback Loader Component
export const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-[var(--bg-page)]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[var(--text-accent)]/20 border-t-[var(--text-accent)] rounded-full animate-spin"></div>
      <p className="text-[var(--text-accent)] font-display text-2xl animate-pulse tracking-tight">AgroConnect</p>
    </div>
  </div>
);

// Helper for Private Routes
export const PrivateRoute = ({ roles }: { roles?: string[] }) => {
  const { token, user, isAuthChecked } = useAuthStore() as any;
  
  // If authentication check hasn't completed, show loader
  if (!isAuthChecked) return <Loader />;

  if (!token) return <Navigate to="/login" replace />;
  
  // If we have a token but no user yet, wait for rehydration/store sync
  if (!user && token) return <Loader />;

  // If user is authenticated but trying to access a route without a specific role,
  // redirect them to their appropriate dashboard based on their role.
  // This handles cases where a user might try to manually navigate to a generic route
  // or if their role isn't explicitly handled by the current route's `roles` prop.
  if (user && !roles) { // Only apply this logic if `roles` prop is not defined for the route
    const normalized = normalizeRole(user.role);
    const slug = getRoleSlug(normalized);
    
    let targetPath = '/';
    if (normalized === 'ADMIN') targetPath = '/admin';
    else if (slug !== 'visitor') targetPath = `/${slug}/dashboard`;
    
    // Force a full reload to ensure store state is atomic across the transition
    window.location.href = targetPath;
    return null; // Return null as we are performing a full page redirect
  }

  const userRole = normalizeRole(user?.role);
  
  // Lenient role check to avoid premature redirects during store sync
  if (roles && roles.length > 0) {
    const normalizedTargetRoles = roles.map(r => normalizeRole(r));
    if (userRole && !normalizedTargetRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
    if (!userRole && token) return <Loader />;
  }

  const LayoutComponent = user?.role === 'ADMIN' ? AdminLayout : UserLayout;

  return (
    <LayoutComponent>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </LayoutComponent>
  );
};

export const suspenseWrapper = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);
