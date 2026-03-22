import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Layout from '../components/shared/Layout';

// Fallback Loader Component
const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-surface">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-primary font-serif-display text-xl animate-pulse">AgroConnect...</p>
    </div>
  </div>
);

// Helper for Private Routes
const PrivateRoute = ({ roles }: { roles?: string[] }) => {
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

const suspenseWrapper = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

// Public Pages
const HomePage = lazy(() => import('../pages/visitor/HomePage'));
const CatalogPage = lazy(() => import('../pages/visitor/CatalogPage'));
const ProductDetailPage = lazy(() => import('../pages/visitor/ProductDetailPage'));
const ProducersPage = lazy(() => import('../pages/visitor/ProducersPage'));
const HowItWorksPage = lazy(() => import('../pages/visitor/HowItWorksPage'));
const NewsPage = lazy(() => import('../pages/visitor/NewsPage'));
const AboutPage = lazy(() => import('../pages/visitor/AboutPage'));
const FarmersLandingPage = lazy(() => import('../pages/visitor/FarmersLandingPage'));
const TransportersLandingPage = lazy(() => import('../pages/visitor/TransportersLandingPage'));

// Auth Pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const VerifyOtpPage = lazy(() => import('../pages/auth/VerifyOtpPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));

// Shared
const MessagingPage = lazy(() => import('../pages/shared/MessagingPage'));
const WalletPage = lazy(() => import('../pages/shared/WalletPage'));
const ProfilePage = lazy(() => import('../pages/shared/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/shared/SettingsPage'));

// Farmer
const FarmerDashboard = lazy(() => import('../pages/farmer/FarmerDashboard'));
const FarmerProductsPage = lazy(() => import('../pages/farmer/FarmerProductsPage'));
const ProductFormPage = lazy(() => import('../pages/farmer/ProductFormPage'));
const FarmerOrdersPage = lazy(() => import('../pages/farmer/FarmerOrdersPage'));
const FarmerWalletPage = lazy(() => import('../pages/farmer/FarmerWalletPage'));
const FarmerProfilePage = lazy(() => import('../pages/farmer/FarmerProfilePage'));

// Buyer
const BuyerDashboard = lazy(() => import('../pages/buyer/BuyerDashboard'));
const MarketplacePage = lazy(() => import('../pages/buyer/MarketplacePage'));
const BuyerProductDetailPage = lazy(() => import('../pages/buyer/ProductDetailPage'));
const BuyerOrdersPage = lazy(() => import('../pages/buyer/BuyerOrdersPage'));
const BuyerOffersPage = lazy(() => import('../pages/buyer/BuyerOffersPage'));
const BuyerPaymentPage = lazy(() => import('../pages/buyer/BuyerPaymentPage'));
const BuyerProfilePage = lazy(() => import('../pages/buyer/BuyerProfilePage'));

// Transporter
const TransporterDashboard = lazy(() => import('../pages/transporter/TransporterDashboard'));
const MissionsPage = lazy(() => import('../pages/transporter/MissionsPage'));
const MyOffersPage = lazy(() => import('../pages/transporter/MyOffersPage'));
const MyDeliveriesPage = lazy(() => import('../pages/transporter/MyDeliveriesPage'));
const TransporterProfilePage = lazy(() => import('../pages/transporter/TransporterProfilePage'));
const TransporterWalletPage = lazy(() => import('../pages/transporter/TransporterWalletPage'));

// Admin
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminUserDetailPage = lazy(() => import('../pages/admin/AdminUserDetailPage'));
const AdminProductsPage = lazy(() => import('../pages/admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('../pages/admin/AdminOrdersPage'));
const AdminOrderDetailPage = lazy(() => import('../pages/admin/AdminOrderDetailPage'));
const AdminDisputesPage = lazy(() => import('../pages/admin/AdminDisputesPage'));
const AdminDisputeResolvePage = lazy(() => import('../pages/admin/AdminDisputeResolvePage'));
const AdminPaymentsPage = lazy(() => import('../pages/admin/AdminPaymentsPage'));
const AdminStatsPage = lazy(() => import('../pages/admin/AdminStatsPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));

export const router = createBrowserRouter([
  // Public
  { path: '/', element: suspenseWrapper(HomePage) },
  { path: '/catalog', element: suspenseWrapper(CatalogPage) },
  { path: '/catalog/:id', element: suspenseWrapper(ProductDetailPage) },
  { path: '/producers', element: suspenseWrapper(ProducersPage) },
  { path: '/farmers', element: suspenseWrapper(FarmersLandingPage) },
  { path: '/transporters', element: suspenseWrapper(TransportersLandingPage) },
  { path: '/how-it-works', element: suspenseWrapper(HowItWorksPage) },
  { path: '/news', element: suspenseWrapper(NewsPage) },
  { path: '/about', element: suspenseWrapper(AboutPage) },
  
  // Auth
  { path: '/login', element: suspenseWrapper(LoginPage) },
  { path: '/register', element: suspenseWrapper(RegisterPage) },
  { path: '/verify-otp', element: suspenseWrapper(VerifyOtpPage) },
  { path: '/forgot-password', element: suspenseWrapper(ForgotPasswordPage) },
  { path: '/reset-password', element: suspenseWrapper(ResetPasswordPage) },

  // Farmer
  { element: <PrivateRoute roles={['FARMER']} />, children: [
    { path: '/farmer/dashboard', element: <FarmerDashboard /> },
    { path: '/farmer/products', element: <FarmerProductsPage /> },
    { path: '/farmer/products/new', element: <ProductFormPage /> },
    { path: '/farmer/products/:id/edit', element: <ProductFormPage /> },
    { path: '/farmer/orders', element: <FarmerOrdersPage /> },
    { path: '/farmer/messages', element: <MessagingPage /> },
    { path: '/farmer/wallet', element: <FarmerWalletPage /> },
    { path: '/farmer/profile', element: <FarmerProfilePage /> },
    { path: '/farmer/settings', element: <SettingsPage /> },
    { path: '/farmer', element: <Navigate to="/farmer/dashboard" replace /> },
  ]},

  // Buyer
  { element: <PrivateRoute roles={['BUYER']} />, children: [
    { path: '/buyer/dashboard', element: <BuyerDashboard /> },
    { path: '/buyer/marketplace', element: <MarketplacePage /> },
    { path: '/buyer/marketplace/product/:id', element: <BuyerProductDetailPage /> },
    { path: '/buyer/orders', element: <BuyerOrdersPage /> },
    { path: '/buyer/offers', element: <BuyerOffersPage /> },
    { path: '/buyer/payment', element: <BuyerPaymentPage /> },
    { path: '/buyer/messages', element: <MessagingPage /> },
    { path: '/buyer/profile', element: <BuyerProfilePage /> },
    { path: '/buyer/settings', element: <SettingsPage /> },
    { path: '/buyer', element: <Navigate to="/buyer/dashboard" replace /> },
  ]},

  // Transporter
  { element: <PrivateRoute roles={['TRANSPORTER']} />, children: [
    { path: '/transporter/dashboard', element: <TransporterDashboard /> },
    { path: '/transporter/missions', element: <MissionsPage /> },
    { path: '/transporter/offers', element: <MyOffersPage /> },
    { path: '/transporter/deliveries', element: <MyDeliveriesPage /> },
    { path: '/transporter/messages', element: <MessagingPage /> },
    { path: '/transporter/wallet', element: <TransporterWalletPage /> },
    { path: '/transporter/profile', element: <TransporterProfilePage /> },
    { path: '/transporter/settings', element: <SettingsPage /> },
    { path: '/transporter', element: <Navigate to="/transporter/dashboard" replace /> },
  ]},

  // Admin
  { element: <PrivateRoute roles={['ADMIN']} />, children: [
    { path: '/admin/dashboard', element: <AdminDashboard /> },
    { path: '/admin/users', element: <AdminUsersPage /> },
    { path: '/admin/users/:id', element: <AdminUserDetailPage /> },
    { path: '/admin/products', element: <AdminProductsPage /> },
    { path: '/admin/orders', element: <AdminOrdersPage /> },
    { path: '/admin/orders/:id', element: <AdminOrderDetailPage /> },
    { path: '/admin/disputes', element: <AdminDisputesPage /> },
    { path: '/admin/disputes/:id', element: <AdminDisputeResolvePage /> },
    { path: '/admin/payments', element: <AdminPaymentsPage /> },
    { path: '/admin/stats', element: <AdminStatsPage /> },
    { path: '/admin/settings', element: <AdminSettingsPage /> },
    { path: '/admin', element: <Navigate to="/admin/dashboard" replace /> },
  ]},
  
  { path: '*', element: <Navigate to="/" replace /> },
]);
