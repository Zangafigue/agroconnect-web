import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  MessageSquare, 
  Wallet, 
  User, 
  Settings, 
  Truck, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  CreditCard 
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuthStore();
  const location = useLocation();

  const getLinks = () => {
    switch (user?.role) {
      case 'FARMER':
        return [
          { name: 'Tableau de bord', path: '/farmer/dashboard', icon: LayoutDashboard },
          { name: 'Mes Produits', path: '/farmer/products', icon: ShoppingBag },
          { name: 'Mes Commandes', path: '/farmer/orders', icon: ShoppingCart, badge: 3 },
          { name: 'Messagerie', path: '/farmer/messages', icon: MessageSquare },
          { name: 'Portefeuille', path: '/farmer/wallet', icon: Wallet },
          { name: 'Profil', path: '/farmer/profile', icon: User },
        ];
      case 'BUYER':
        return [
          { name: 'Tableau de bord', path: '/buyer/dashboard', icon: LayoutDashboard },
          { name: 'Marché', path: '/buyer/marketplace', icon: ShoppingBag },
          { name: 'Mes Achats', path: '/buyer/orders', icon: ShoppingCart },
          { name: 'Messagerie', path: '/buyer/messages', icon: MessageSquare },
          { name: 'Profil', path: '/buyer/profile', icon: User },
        ];
      case 'TRANSPORTER':
        return [
          { name: 'Tableau de bord', path: '/transporter/dashboard', icon: LayoutDashboard },
          { name: 'Missions Disponibles', path: '/transporter/missions', icon: Truck },
          { name: 'Mes Livraisons', path: '/transporter/deliveries', icon: ShoppingCart },
          { name: 'Messagerie', path: '/transporter/messages', icon: MessageSquare },
          { name: 'Portefeuille', path: '/transporter/wallet', icon: Wallet },
        ];
      case 'ADMIN':
        return [
          { name: 'Tableau de bord', path: '/admin', icon: LayoutDashboard },
          { name: 'Utilisateurs', path: '/admin/users', icon: Users },
          { name: 'Produits', path: '/admin/products', icon: ShoppingBag },
          { name: 'Commandes', path: '/admin/orders', icon: ShoppingCart },
          { name: 'Litiges', path: '/admin/disputes', icon: AlertTriangle, badge: 2 },
          { name: 'Paiements', path: '/admin/payments', icon: CreditCard },
          { name: 'Statistiques', path: '/admin/stats', icon: BarChart3 },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-72 bg-surface-container-low border-r border-outline-variant/10 flex flex-col h-screen transition-all duration-300">
      <div className="p-8 border-b border-outline-variant/10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <span className="font-serif-display text-xl text-primary font-bold block leading-none">AgroConnect</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold opacity-60">BF Marketplace</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-4 mb-4 text-[10px] font-black text-outline uppercase tracking-[0.2em] opacity-50">Navigation</p>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-5 h-5 ${isActive ? 'text-on-primary' : 'text-on-surface-variant group-hover:text-primary'} transition-colors`} />
                <span className={`text-sm tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {link.name}
                </span>
              </div>
              {link.badge && !isActive && (
                <span className="bg-error text-on-error text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile Sidebar Quick Menu */}
      <div className="p-4 mx-4 mb-8 bg-surface-variant/30 rounded-3xl border border-outline-variant/10">
        <Link to={`/${user?.role?.toLowerCase()}/settings`} className="flex items-center gap-3 p-2 hover:bg-surface-variant/50 rounded-2xl transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-on-surface truncate">Paramètres</p>
            <p className="text-[10px] text-outline truncate uppercase tracking-widest">Configuration</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
