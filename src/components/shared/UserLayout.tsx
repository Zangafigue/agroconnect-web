import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import Avatar from './Avatar';
import Button from './Button';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const { user, logout } = useAuthStore() as any;
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  const getLinks = () => {
    const role = user?.role;
    switch (role) {
      case 'FARMER':
        return [
          { name: 'Dashboard', path: '/farmer/dashboard' },
          { name: 'Produits', path: '/farmer/products' },
          { name: 'Commandes', path: '/farmer/orders' },
          { name: 'Messages', path: '/farmer/messages' },
          { name: 'Portefeuille', path: '/farmer/wallet' },
        ];
      case 'BUYER':
        return [
          { name: 'Dashboard', path: '/buyer/dashboard' },
          { name: 'Marché', path: '/buyer/marketplace' },
          { name: 'Achats', path: '/buyer/orders' },
          { name: 'Messages', path: '/buyer/messages' },
        ];
      case 'TRANSPORTER':
        return [
          { name: 'Dashboard', path: '/transporter/dashboard' },
          { name: 'Missions', path: '/transporter/missions' },
          { name: 'Courses', path: '/transporter/deliveries' },
          { name: 'Messages', path: '/transporter/messages' },
          { name: 'Portefeuille', path: '/transporter/wallet' },
        ];
      default:
        return [];
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = getLinks();
  const dashboardPath = `/${user?.role?.toLowerCase()}/dashboard`;

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col font-body">
      {/* Top Navigation */}
      <nav className="h-[56px] bg-[var(--bg-surface)] border-b border-[var(--border-light)] flex items-center px-4 md:px-8 sticky top-0 z-50 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2 mr-12">
          <Link to={dashboardPath} className="flex items-center gap-2 group">
             <div className="w-7 h-7 bg-[var(--text-accent)] rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]">eco</span>
             </div>
             <span className="font-semibold text-[15px] tracking-tight text-[var(--text-primary)]">AgroConnect</span>
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 h-[32px] flex items-center rounded-[var(--radius-md)] text-[13px] transition-all
                  ${isActive 
                    ? 'text-[var(--text-primary)] font-semibold bg-[var(--bg-muted)]' 
                    : 'text-[var(--text-secondary)] font-normal hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]/50'}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          <div 
            className="flex items-center gap-2 pl-3 border-l border-[var(--border-light)] group cursor-pointer"
            onClick={() => navigate(`/${user?.role?.toLowerCase()}/profile`)}
          >
            <span className="hidden sm:block text-[13px] font-medium text-[var(--text-primary)]">
               {user?.firstName || user?.name}
            </span>
            <Avatar role={user?.role} name={user?.firstName || user?.name} size="sm" />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-1 min-w-0"
            onClick={handleLogout}
            icon={<span className="material-symbols-outlined">logout</span>}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-[1400px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
