import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import Avatar from './Avatar';
import { getUserRole, getRoleSlug } from '../../utils/auth';
import LogoutModal from './LogoutModal';
import NotificationBell from './NotificationBell';
import UpgradeRoleModal from './UpgradeRoleModal';
import WorkspaceSwitcher from './WorkspaceSwitcher';

interface UserLayoutProps {
  children: React.ReactNode;
}

const ROLE_NAV: Record<string, { icon: string; name: string; path: string }[]> = {
  FARMER: [
    { icon: 'dashboard', name: 'Dashboard', path: '/farmer/dashboard' },
    { icon: 'storefront', name: 'Produits', path: '/farmer/products' },
    { icon: 'receipt_long', name: 'Commandes', path: '/farmer/orders' },
    { icon: 'forum', name: 'Messages', path: '/farmer/messages' },
    { icon: 'account_balance_wallet', name: 'Portefeuille', path: '/farmer/wallet' },
    { icon: 'person', name: 'Profil', path: '/farmer/profile' },
    { icon: 'settings', name: 'Paramètres', path: '/farmer/settings' },
  ],
  BUYER: [
    { icon: 'dashboard', name: 'Dashboard', path: '/buyer/dashboard' },
    { icon: 'local_grocery_store', name: 'Marché', path: '/buyer/marketplace' },
    { icon: 'groups', name: 'Producteurs', path: '/buyer/producers' },
    { icon: 'shopping_bag', name: 'Achats', path: '/buyer/orders' },
    { icon: 'forum', name: 'Messages', path: '/buyer/messages' },
    { icon: 'person', name: 'Profil', path: '/buyer/profile' },
    { icon: 'settings', name: 'Paramètres', path: '/buyer/settings' },
  ],
  TRANSPORTER: [
    { icon: 'dashboard', name: 'Dashboard', path: '/transporter/dashboard' },
    { icon: 'assignment', name: 'Missions', path: '/transporter/missions' },
    { icon: 'local_shipping', name: 'Mes Livraisons', path: '/transporter/deliveries' },
    { icon: 'sell', name: 'Mes Offres', path: '/transporter/offers' },
    { icon: 'forum', name: 'Messages', path: '/transporter/messages' },
    { icon: 'account_balance_wallet', name: 'Portefeuille', path: '/transporter/wallet' },
    { icon: 'person', name: 'Profil', path: '/transporter/profile' },
    { icon: 'settings', name: 'Paramètres', path: '/transporter/settings' },
  ],
};

export default function UserLayout({ children }: UserLayoutProps) {
  const { user, logout } = useAuthStore() as any;
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { showUpgradeModal, setShowUpgradeModal } = useAuthStore() as any;

  // Common sidebars reuse this component, but WorkspaceSwitcher is now isolated to avoid ref conflicts
  const role = getUserRole(user);
  const roleSlug = getRoleSlug(role);
  const links = ROLE_NAV[role] || [];
  
  const currentLink = links.find(l => location.pathname === l.path || location.pathname.startsWith(l.path + '/')) || { name: 'Accueil' };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--border-light)] shrink-0">
        <Link to={`/${roleSlug}/dashboard`} className="flex items-center gap-2.5 group shrink-0 w-full">
          <div className="w-8 h-8 bg-[var(--text-accent)] rounded-lg flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white text-[18px]">eco</span>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-[var(--text-primary)] md:block">AgroConnect</span>
        </Link>
      </div>

      {/* Workspace Switcher */}
      <WorkspaceSwitcher />

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-2 space-y-0.5">
          {links.map((link) => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all
                  ${isActive
                    ? 'bg-[var(--text-accent)] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'}
                `}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`}>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-[var(--border-light)] shrink-0">
        <div className="flex flex-col gap-1">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-all text-[13px] font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
            Thème {theme === 'light' ? 'Sombre' : 'Clair'}
          </button>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-[13px] font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Déconnexion
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex font-body">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[220px] flex-col fixed inset-y-0 left-0 bg-[var(--bg-surface)] border-r border-[var(--border-light)] z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[var(--bg-surface)] border-r border-[var(--border-light)] z-50 flex flex-col lg:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main Area */}
      <div className="flex-1 lg:ml-[220px] flex flex-col min-h-screen">
        {/* Global Header */}
        <header className="h-[64px] flex items-center justify-between px-4 lg:px-8 bg-[var(--bg-surface)] border-b border-[var(--border-light)] sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--bg-muted)] text-[var(--text-secondary)]"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
            <div className="flex items-center gap-2">
               <span className="font-display text-xl font-bold text-[var(--text-primary)] hidden sm:block">{currentLink.name}</span>
               <span className="font-display text-lg font-bold text-[var(--text-primary)] sm:hidden">AgroConnect</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />
            <div 
              className="flex items-center gap-3 pl-4 border-l border-[var(--border-light)] cursor-pointer group"
              onClick={() => navigate(`/${roleSlug}/profile`)}
            >
              <div className="hidden sm:block text-right">
                <p className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">{user?.firstName || user?.name}</p>
                <p className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">{user?.role === 'FARMER' ? 'Agriculteur' : user?.role === 'BUYER' ? 'Acheteur' : 'Transporteur'}</p>
              </div>
              <Avatar role={user?.role} name={user?.firstName || user?.name} size="sm" className="group-hover:scale-105 transition-transform" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
      <UpgradeRoleModal />
    </div>
  );
}
