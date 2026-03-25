import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import Avatar from './Avatar';
import { getUserRole, getRoleSlug } from '../../utils/auth';
import LogoutModal from './LogoutModal';

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

  const role = getUserRole(user);
  const roleSlug = getRoleSlug(role);
  const links = ROLE_NAV[role] || [];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-14 flex items-center gap-3 px-4 border-b border-[var(--border-light)] shrink-0">
        <Link to={`/${roleSlug}/dashboard`} className="flex items-center gap-2.5 group w-full">
          <div className="w-8 h-8 bg-[var(--text-accent)] rounded-lg flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white text-[18px]">eco</span>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-[var(--text-primary)]">AgroConnect</span>
        </Link>
      </div>

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

      {/* Bottom User Card */}
      <div className="p-3 border-t border-[var(--border-light)] shrink-0">
        <div
          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-muted)] cursor-pointer transition-all group"
          onClick={() => navigate(`/${roleSlug}/profile`)}
        >
          <Avatar role={user?.role} name={user?.firstName || user?.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[11px] text-[var(--text-muted)] truncate">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 px-1">
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all text-[12px] font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>
          <button
            onClick={() => setShowLogoutModal(true)}
            title="Se déconnecter"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-[12px] font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Quitter</span>
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
        {/* Mobile top bar */}
        <header className="lg:hidden h-14 flex items-center gap-4 px-4 bg-[var(--bg-surface)] border-b border-[var(--border-light)] sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--bg-muted)] text-[var(--text-secondary)]"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
          <Link to={`/${roleSlug}/dashboard`} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[var(--text-accent)] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[16px]">eco</span>
            </div>
            <span className="font-bold text-[14px] text-[var(--text-primary)]">AgroConnect</span>
          </Link>
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
    </div>
  );
}
