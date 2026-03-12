import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { lazy, Suspense } from 'react';

// ── Lazy loading pages ──────────────────────────────────────────────────────
// Visiteur
const HomePage         = lazy(() => import('../pages/visitor/HomePage.jsx'));
const CatalogPage      = lazy(() => import('../pages/visitor/CatalogPage.jsx'));
const ProductDetailPage= lazy(() => import('../pages/visitor/ProductDetailPage.jsx'));
const AboutPage        = lazy(() => import('../pages/visitor/AboutPage.jsx'));

// Auth
const RegisterPage         = lazy(() => import('../pages/auth/RegisterPage.jsx'));
const VerifyOtpPage        = lazy(() => import('../pages/auth/VerifyOtpPage.jsx'));
const LoginPage            = lazy(() => import('../pages/auth/LoginPage.jsx'));
const ForgotPasswordPage   = lazy(() => import('../pages/auth/ForgotPasswordPage.jsx'));
const ResetPasswordPage    = lazy(() => import('../pages/auth/ResetPasswordPage.jsx'));

// Farmer
const FarmerDashboard       = lazy(() => import('../pages/farmer/FarmerDashboard.jsx'));
const FarmerProductsPage    = lazy(() => import('../pages/farmer/FarmerProductsPage.jsx'));
const ProductFormPage       = lazy(() => import('../pages/farmer/ProductFormPage.jsx'));
const FarmerOrdersPage      = lazy(() => import('../pages/farmer/FarmerOrdersPage.jsx'));
const FarmerOrderDetailPage = lazy(() => import('../pages/farmer/FarmerOrderDetailPage.jsx'));
const FarmerMessagesPage    = lazy(() => import('../pages/farmer/FarmerMessagesPage.jsx'));
const FarmerWalletPage      = lazy(() => import('../pages/farmer/FarmerWalletPage.jsx'));
const FarmerProfilePage     = lazy(() => import('../pages/farmer/FarmerProfilePage.jsx'));

// Buyer
const BuyerDashboard        = lazy(() => import('../pages/buyer/BuyerDashboard.jsx'));
const BuyerOrdersPage       = lazy(() => import('../pages/buyer/BuyerOrdersPage.jsx'));
const BuyerOrderDetailPage  = lazy(() => import('../pages/buyer/BuyerOrderDetailPage.jsx'));
const TransportOffersPage   = lazy(() => import('../pages/buyer/TransportOffersPage.jsx'));
const PaymentPage           = lazy(() => import('../pages/buyer/PaymentPage.jsx'));
const BuyerMessagesPage     = lazy(() => import('../pages/buyer/BuyerMessagesPage.jsx'));

// Transporter
const TransporterDashboard  = lazy(() => import('../pages/transporter/TransporterDashboard.jsx'));
const MissionsPage          = lazy(() => import('../pages/transporter/MissionsPage.jsx'));
const MyOffersPage          = lazy(() => import('../pages/transporter/MyOffersPage.jsx'));
const MyDeliveriesPage      = lazy(() => import('../pages/transporter/MyDeliveriesPage.jsx'));
const TransporterMessagesPage= lazy(() => import('../pages/transporter/TransporterMessagesPage.jsx'));
const TransporterWalletPage = lazy(() => import('../pages/transporter/TransporterWalletPage.jsx'));

// Admin
const AdminDashboard        = lazy(() => import('../pages/admin/AdminDashboard.jsx'));
const AdminUsersPage        = lazy(() => import('../pages/admin/AdminUsersPage.jsx'));
const AdminProductsPage     = lazy(() => import('../pages/admin/AdminProductsPage.jsx'));
const AdminOrdersPage       = lazy(() => import('../pages/admin/AdminOrdersPage.jsx'));
const AdminDisputesPage     = lazy(() => import('../pages/admin/AdminDisputesPage.jsx'));
const AdminPaymentsPage     = lazy(() => import('../pages/admin/AdminPaymentsPage.jsx'));

// ── Guard par rôle ──────────────────────────────────────────────────────────
function PrivateRoute({ roles }) {
  const { token, user } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" replace />;
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="text-green-600 text-4xl">🌾</div></div>}>
      <Outlet />
    </Suspense>
  );
}

// ── Router ──────────────────────────────────────────────────────────────────
export const router = createBrowserRouter([
  // Public
  { path: '/',            element: <Suspense fallback={null}><HomePage /></Suspense> },
  { path: '/catalog',     element: <Suspense fallback={null}><CatalogPage /></Suspense> },
  { path: '/catalog/:id', element: <Suspense fallback={null}><ProductDetailPage /></Suspense> },
  { path: '/about',       element: <Suspense fallback={null}><AboutPage /></Suspense> },
  { path: '/login',       element: <Suspense fallback={null}><LoginPage /></Suspense> },
  { path: '/register',    element: <Suspense fallback={null}><RegisterPage /></Suspense> },
  { path: '/verify-otp',  element: <Suspense fallback={null}><VerifyOtpPage /></Suspense> },
  { path: '/forgot-password', element: <Suspense fallback={null}><ForgotPasswordPage /></Suspense> },
  { path: '/reset-password',  element: <Suspense fallback={null}><ResetPasswordPage /></Suspense> },

  // Farmer
  { element: <PrivateRoute roles={['FARMER']} />, children: [
    { path: '/farmer',                     element: <FarmerDashboard /> },
    { path: '/farmer/products',            element: <FarmerProductsPage /> },
    { path: '/farmer/products/new',        element: <ProductFormPage /> },
    { path: '/farmer/products/:id/edit',   element: <ProductFormPage /> },
    { path: '/farmer/orders',             element: <FarmerOrdersPage /> },
    { path: '/farmer/orders/:id',         element: <FarmerOrderDetailPage /> },
    { path: '/farmer/messages',           element: <FarmerMessagesPage /> },
    { path: '/farmer/wallet',             element: <FarmerWalletPage /> },
    { path: '/farmer/profile',            element: <FarmerProfilePage /> },
  ]},

  // Buyer
  { element: <PrivateRoute roles={['BUYER', 'FARMER']} />, children: [
    { path: '/buyer',                         element: <BuyerDashboard /> },
    { path: '/buyer/orders',                  element: <BuyerOrdersPage /> },
    { path: '/buyer/orders/:id',              element: <BuyerOrderDetailPage /> },
    { path: '/buyer/orders/:id/transport',    element: <TransportOffersPage /> },
    { path: '/buyer/orders/:id/payment',      element: <PaymentPage /> },
    { path: '/buyer/messages',                element: <BuyerMessagesPage /> },
  ]},

  // Transporter
  { element: <PrivateRoute roles={['TRANSPORTER']} />, children: [
    { path: '/transporter',             element: <TransporterDashboard /> },
    { path: '/transporter/missions',    element: <MissionsPage /> },
    { path: '/transporter/offers',      element: <MyOffersPage /> },
    { path: '/transporter/deliveries',  element: <MyDeliveriesPage /> },
    { path: '/transporter/messages',    element: <TransporterMessagesPage /> },
    { path: '/transporter/wallet',      element: <TransporterWalletPage /> },
  ]},

  // Admin
  { element: <PrivateRoute roles={['ADMIN']} />, children: [
    { path: '/admin',           element: <AdminDashboard /> },
    { path: '/admin/users',     element: <AdminUsersPage /> },
    { path: '/admin/products',  element: <AdminProductsPage /> },
    { path: '/admin/orders',    element: <AdminOrdersPage /> },
    { path: '/admin/disputes',  element: <AdminDisputesPage /> },
    { path: '/admin/payments',  element: <AdminPaymentsPage /> },
  ]},

  { path: '*', element: <Navigate to="/" replace /> },
]);
