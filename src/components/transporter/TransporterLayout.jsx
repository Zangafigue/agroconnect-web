import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function TransporterLayout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/transporter/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
    { path: '/transporter/missions', icon: 'local_shipping', label: 'Missions' },
    { path: '/transporter/deliveries', icon: 'inventory_2', label: 'Livraisons' },
    { path: '/transporter/messages', icon: 'chat', label: 'Messages' },
    { path: '/transporter/wallet', icon: 'account_balance_wallet', label: 'Portefeuille' },
    { path: '/transporter/profile', icon: 'person', label: 'Mon Profil' },
    { path: '/transporter/settings', icon: 'settings', label: 'Paramètres' },
  ];

  return (
    <div className="bg-[#ebffe5] font-['Plus_Jakarta_Sans'] text-[#0c200d] min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#62df7d]/20 flex flex-col p-6 space-y-4 z-50">
        <div className="mb-8">
          <span className="text-xl font-bold text-[#005320] font-['Newsreader'] tracking-tight">AgroConnect BF</span>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#92400e] font-bold">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'KD'}
            </div>
            <div>
              <p className="font-bold text-sm">Transporteur</p>
              <p className="text-xs opacity-60">Logistique Premium</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 font-bold rounded-lg transition-transform duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-[#e1fbdc] text-[#006b2c]' 
                    : 'text-[#005320]/70 hover:bg-[#e1fbdc]/50 hover:translate-x-1'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-['Newsreader'] text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-[#62df7d]/20 space-y-2">
          <Link to="/transporter/help" className="flex items-center gap-3 px-4 py-3 text-[#005320]/70 hover:bg-[#e1fbdc]/50 hover:translate-x-1 transition-transform duration-200 font-bold rounded-lg">
            <span className="material-symbols-outlined">help</span>
            <span className="font-['Newsreader'] text-base">Aide</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/50 hover:translate-x-1 transition-transform duration-200 font-bold rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Newsreader'] text-base">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 z-40 bg-white shadow-sm font-['Newsreader'] text-[#0c200d]">
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#006b2c]/50">search</span>
            <input 
              type="text" 
              placeholder="Rechercher une mission..." 
              className="w-full pl-10 pr-4 py-2 bg-[#e1fbdc]/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#006b2c] outline-none" 
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#e1fbdc] transition-colors rounded-full relative">
            <span className="material-symbols-outlined text-[#006b2c]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-[#e1fbdc] transition-colors rounded-full">
            <span className="material-symbols-outlined text-[#006b2c]">mail</span>
          </button>
          <div className="h-8 w-[1px] bg-[#bdcaba]/30 mx-2"></div>
          <Link to="/transporter/profile" className="flex items-center gap-2 cursor-pointer hover:bg-[#e1fbdc] p-1 pr-3 rounded-full transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#92400e] text-xs font-bold">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'KD'}
            </div>
            <span className="text-sm font-bold">{user?.name ? user.name.split(' ')[0] : 'Koné'}</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="ml-64 pt-16">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center py-6 px-12 ml-64 bg-[#213521] text-[#62df7d] font-['Newsreader'] text-xs tracking-wide">
        <p className="opacity-80">© 2024 AgroConnect BF - Excellence en Logistique Agricole</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#b1f2be] transition-colors opacity-90 hover:opacity-100">Conditions</a>
          <a href="#" className="hover:text-[#b1f2be] transition-colors opacity-90 hover:opacity-100">Confidentialité</a>
          <a href="#" className="hover:text-[#b1f2be] transition-colors opacity-90 hover:opacity-100">Support</a>
        </div>
      </footer>
    </div>
  );
}
