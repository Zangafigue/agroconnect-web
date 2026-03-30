import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useDisputeStore } from '../../store/disputeStore';

export default function Sidebar() {
  const { user } = useAuthStore();
  const { disputes } = useDisputeStore();
  const location = useLocation();

  const getLinks = () => {
    const role = user?.role;
    switch (role) {
      case 'ADMIN':
        const openDisputes = disputes.filter((d: any) => 
          !['RÉSOLU', 'RESOLVED', 'CLOSED', 'FERMÉ'].includes(d.status?.toUpperCase())
        ).length;
        return [
          { name: 'Tableau de bord', path: '/admin/dashboard', icon: 'dashboard' },
          { name: 'Requêtes Espaces', path: '/admin/requests', icon: 'verified_user' },
          { name: 'Utilisateurs', path: '/admin/users', icon: 'group' },
          { name: 'Produits', path: '/admin/products', icon: 'inventory_2' },
          { name: 'Commandes', path: '/admin/orders', icon: 'shopping_cart' },
          { name: 'Litiges', path: '/admin/disputes', icon: 'report', badge: openDisputes || null },
          { name: 'Paiements', path: '/admin/payments', icon: 'payments' },
          { name: 'Statistiques', path: '/admin/stats', icon: 'analytics' },
          { name: 'Notifications', path: '/admin/notifications', icon: 'notifications' },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  const dashboardPath = user?.role === 'ADMIN' ? '/admin/dashboard' : `/${user?.role?.toLowerCase()}/dashboard`;

  return (
    <aside className="w-[var(--sidebar-width)] bg-[var(--bg-sidebar,var(--bg-surface))] border-r border-[var(--border-light)] flex flex-col h-screen transition-all duration-300 z-40 font-body">
      {/* Area Logo */}
      <div className="px-5 py-6 border-b border-[var(--bg-muted)]">
        <Link to={dashboardPath} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[var(--text-accent)] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-[20px]">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[14px] text-[var(--text-primary)] leading-tight">AgroConnect</span>
            <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)] font-medium">B. FASO</span>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {links.map((link) => {
          const isActive = location.pathname === link.path || (link.path === '/admin/dashboard' && location.pathname === '/admin');
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center justify-between h-[34px] px-2.5 rounded-[var(--radius-md)] transition-all duration-150 group
                ${isActive
                  ? 'bg-[var(--bg-subtle)] text-[var(--text-accent)] border-l-[2px] border-[var(--text-accent)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'
                }
              `}
              style={isActive && document.documentElement.getAttribute('data-theme') === 'dark' ? { backgroundColor: 'rgba(22,163,74,0.10)', color: 'var(--text-accent)' } : {}}
            >
              <div className="flex items-center gap-2.5">
                <span className={`material-symbols-outlined text-[18px] transition-colors ${isActive ? 'text-[var(--text-accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`}>
                  {link.icon}
                </span>
                <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {link.name}
                </span>
              </div>
              {link.badge && (
                <span className={`${isActive ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--btn-danger-text)] text-white'} text-[10px] font-bold px-1.5 py-0 rounded-full`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-3 border-t border-[var(--border-light)]">
        <Link 
          to={`/${user?.role?.toLowerCase()}/settings`} 
          className="flex items-center gap-3 p-2 hover:bg-[var(--bg-muted)] rounded-[var(--radius-md)] transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--text-accent)] transition-all">
            <span className="material-symbols-outlined text-[18px]">settings</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[12px] font-semibold text-[var(--text-primary)] truncate">Paramètres</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium opacity-70">Système</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
