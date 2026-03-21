<<<<<<< Updated upstream:src/router/index.jsx
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { lazy, Suspense } from 'react';
import Layout from '../components/shared/Layout';
import FarmerLayout from '../components/farmer/FarmerLayout';// Public & Auth
=======
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Loader, PrivateRoute, suspenseWrapper } from './router-utils';

// Public & Auth
>>>>>>> Stashed changes:src/router/index.tsx
const HomePage = lazy(() => import('../pages/visitor/HomePage'));
const CatalogPage = lazy(() => import('../pages/visitor/CatalogPage'));
const ProducersPage = lazy(() => import('../pages/visitor/ProducersPage'));
const HowItWorksPage = lazy(() => import('../pages/visitor/HowItWorksPage'));
const NewsPage = lazy(() => import('../pages/visitor/NewsPage'));
const AboutPage = lazy(() => import('../pages/visitor/AboutPage'));
const ProductDetailPage = lazy(() => import('../pages/visitor/ProductDetailPage'));
const FarmersLandingPage = lazy(() => import('../pages/visitor/FarmersLandingPage'));
const TransportersLandingPage = lazy(() => import('../pages/visitor/TransportersLandingPage'));
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
const FarmerDashboardPage = lazy(() => import('../pages/farmer/FarmerDashboardPage'));
const FarmerProductsPage = lazy(() => import('../pages/farmer/FarmerProductsPage'));
const ProductFormPage = lazy(() => import('../pages/farmer/ProductFormPage'));
const FarmerOrdersPage = lazy(() => import('../pages/farmer/FarmerOrdersPage'));
const FarmerWalletPage = lazy(() => import('../pages/farmer/FarmerWalletPage'));
const FarmerProfilePage = lazy(() => import('../pages/farmer/FarmerProfilePage'));

// Buyer
const BuyerLayout = lazy(() => import('../components/buyer/BuyerLayout'));
const BuyerDashboardPage = lazy(() => import('../pages/buyer/BuyerDashboardPage'));
const MarketplacePage = lazy(() => import('../pages/buyer/MarketplacePage'));
const BuyerProductDetailPage = lazy(() => import('../pages/buyer/ProductDetailPage'));
const BuyerOrdersPage = lazy(() => import('../pages/buyer/BuyerOrdersPage'));
const BuyerOffersPage = lazy(() => import('../pages/buyer/BuyerOffersPage'));
const BuyerPaymentPage = lazy(() => import('../pages/buyer/BuyerPaymentPage'));
const BuyerProfilePage = lazy(() => import('../pages/buyer/BuyerProfilePage'));

// Transporter
const TransporterLayout = lazy(() => import('../components/transporter/TransporterLayout'));
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
const AdminDisputesPage = lazy(() => import('../pages/admin/AdminDisputesPage'));
const AdminDisputeResolvePage = lazy(() => import('../pages/admin/AdminDisputeResolvePage'));
const AdminPaymentsPage = lazy(() => import('../pages/admin/AdminPaymentsPage'));
const AdminStatsPage = lazy(() => import('../pages/admin/AdminStatsPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));

<<<<<<< Updated upstream:src/router/index.jsx

function PrivateRoute({ roles }) {
  const { token, user } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center h-full text-green-600 text-4xl animate-pulse">🌾</div>}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const suspenseWrapper = (Component) => (
  <Suspense fallback={<div className="flex items-center justify-center h-screen text-green-600 text-4xl animate-pulse">🌾</div>}>
    <Component />
  </Suspense>
);
=======

>>>>>>> Stashed changes:src/router/index.tsx

export const router = createBrowserRouter([
  // Public
  { path: '/', element: suspenseWrapper(HomePage) },
  { path: '/catalog', element: suspenseWrapper(CatalogPage) },
  { path: '/catalog/:id', element: suspenseWrapper(ProductDetailPage) },
  {path: '/producers', element: suspenseWrapper(ProducersPage) },
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
    { element: <FarmerLayout />, children: [
      { path: '/farmer/dashboard', element: <FarmerDashboardPage /> },
      { path: '/farmer/products', element: <FarmerProductsPage /> },
      { path: '/farmer/products/new', element: <ProductFormPage /> },
      { path: '/farmer/products/:id/edit', element: <ProductFormPage /> },
      { path: '/farmer/orders', element: <FarmerOrdersPage /> },
      { path: '/farmer/messages', element: <MessagingPage /> },
      { path: '/farmer/wallet', element: <FarmerWalletPage /> },
      { path: '/farmer/profile', element: <FarmerProfilePage /> },
      { path: '/farmer/settings', element: <SettingsPage /> },
    ]}
  ]},

  // Buyer
  { element: <PrivateRoute roles={['BUYER']} />, children: [
    { element: <BuyerLayout />, children: [
      { path: '/buyer/dashboard', element: <BuyerDashboardPage /> },
      { path: '/buyer/marketplace', element: <MarketplacePage /> },
      { path: '/buyer/marketplace/product/:id', element: <BuyerProductDetailPage /> },
      { path: '/buyer/orders', element: <BuyerOrdersPage /> },
      { path: '/buyer/offers', element: <BuyerOffersPage /> },
      { path: '/buyer/payment', element: <BuyerPaymentPage /> },
      { path: '/buyer/messages', element: <MessagingPage /> },
      { path: '/buyer/profile', element: <BuyerProfilePage /> },
      { path: '/buyer/settings', element: <SettingsPage /> },
    ]}
  ]},

  // Transporter
  { element: <PrivateRoute roles={['TRANSPORTER']} />, children: [
    { element: <TransporterLayout />, children: [
      { path: '/transporter/dashboard', element: <TransporterDashboard /> },
      { path: '/transporter/missions', element: <MissionsPage /> },
      { path: '/transporter/offers', element: <MyOffersPage /> },
      { path: '/transporter/deliveries', element: <MyDeliveriesPage /> },
      { path: '/transporter/messages', element: <MessagingPage /> },
      { path: '/transporter/wallet', element: <TransporterWalletPage /> },
      { path: '/transporter/profile', element: <TransporterProfilePage /> },
      { path: '/transporter/settings', element: <SettingsPage /> },
    ]}
  ]},

  // Admin
  { element: <PrivateRoute roles={['ADMIN']} />, children: [
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/admin/users', element: <AdminUsersPage /> },
    { path: '/admin/users/:id', element: <AdminUserDetailPage /> },
    { path: '/admin/products', element: <AdminProductsPage /> },
    { path: '/admin/orders', element: <AdminOrdersPage /> },
    { path: '/admin/disputes', element: <AdminDisputesPage /> },
    { path: '/admin/disputes/:id', element: <AdminDisputeResolvePage /> },
    { path: '/admin/payments', element: <AdminPaymentsPage /> },
    { path: '/admin/stats', element: <AdminStatsPage /> },
    { path: '/admin/settings', element: <AdminSettingsPage /> },
  ]},
  
  { path: '*', element: <Navigate to="/" replace /> },
]);
