import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function BuyerLayout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="bg-[#f8faf8] text-[#0c200d] antialiased min-h-screen font-body">
      {/* Top Navigation Bar */}
      <nav className="bg-emerald-50/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-6 py-3 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold text-emerald-900 font-headline tracking-tight">AgroCatalogue</span>
            <div className="hidden md:flex gap-6 items-center">
              <Link to="/buyer/marketplace" className={`font-semibold border-b-2 py-1 transition-colors ${isActive('/marketplace') ? 'text-emerald-700 border-emerald-700' : 'text-emerald-900/60 border-transparent hover:bg-emerald-100/50 rounded'}`}>Marché</Link>
              <Link to="/buyer/orders" className={`font-semibold border-b-2 py-1 transition-colors ${isActive('/orders') ? 'text-emerald-700 border-emerald-700' : 'text-emerald-900/60 border-transparent hover:bg-emerald-100/50 rounded'}`}>Mes Commandes</Link>
              <Link to="#" className="text-emerald-900/60 hover:bg-emerald-100/50 px-3 py-1 rounded transition-colors">Favoris</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 text-emerald-800 hover:bg-emerald-100/50 rounded-full transition-all active:scale-95">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="p-2 text-emerald-800 hover:bg-emerald-100/50 rounded-full transition-all active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-emerald-100 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-emerald-900">{user?.name || 'Acheteur'}</p>
                <p className="text-[10px] uppercase tracking-widest text-emerald-700/60">Acheteur Premium</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AC'}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full py-24 w-64 bg-emerald-50 border-r-0 z-40 overflow-y-auto">
        <div className="px-6 mb-8">
          <h3 className="font-headline text-emerald-900 text-xl font-bold">Espace Acheteur</h3>
          <p className="text-xs text-emerald-700/60 uppercase tracking-widest mt-1">Premium Sourcing</p>
        </div>
        <nav className="flex flex-col gap-1">
          <Link to="/buyer/dashboard" className={`px-6 py-3 flex items-center gap-3 font-medium transition-all ${isActive('/dashboard') ? 'bg-emerald-100 text-emerald-900 rounded-lg mx-2' : 'text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50'}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span>Tableau de bord</span>
          </Link>
          <Link to="/buyer/marketplace" className={`px-6 py-3 flex items-center gap-3 font-medium transition-all ${isActive('/marketplace') ? 'bg-emerald-100 text-emerald-900 rounded-lg mx-2' : 'text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50'}`}>
            <span className="material-symbols-outlined">grid_view</span>
            <span>Catalogue</span>
          </Link>
          <Link to="/buyer/orders" className={`px-6 py-3 flex items-center gap-3 font-medium transition-all ${isActive('/orders') ? 'bg-emerald-100 text-emerald-900 rounded-lg mx-2' : 'text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50'}`}>
            <span className="material-symbols-outlined">shopping_bag</span>
            <span>Mes Commandes</span>
          </Link>
          <Link to="/buyer/profile" className={`px-6 py-3 flex items-center gap-3 font-medium transition-all ${isActive('/profile') ? 'bg-emerald-100 text-emerald-900 rounded-lg mx-2' : 'text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50'}`}>
            <span className="material-symbols-outlined">person</span>
            <span>Profil</span>
          </Link>

          <div className="my-4 mx-6 h-[1px] bg-emerald-100"></div>
          
          <button onClick={handleLogout} className="text-red-600 hover:bg-red-50 px-6 py-3 flex items-center gap-3 font-medium transition-all text-left">
            <span className="material-symbols-outlined">logout</span>
            <span>Déconnexion</span>
          </button>
        </nav>
        
        <div className="mt-auto px-4 pb-8">
          <Link to="/buyer/marketplace" className="w-full bg-[#006b2c] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#00873a] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            Nouvelle Commande
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 pt-20">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center pt-3 pb-6 px-4 bg-emerald-50/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-emerald-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50 rounded-t-2xl">
        <Link to="/buyer/marketplace" className={`flex flex-col items-center justify-center ${isActive('/marketplace') ? 'text-emerald-700 font-bold scale-110' : 'text-zinc-400'}`}>
          <span className="material-symbols-outlined">storefront</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Boutique</span>
        </Link>
        <Link to="/buyer/orders" className={`flex flex-col items-center justify-center ${isActive('/orders') ? 'text-emerald-700 font-bold scale-110' : 'text-zinc-400'}`}>
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Suivi</span>
        </Link>
        <Link to="/buyer/profile" className={`flex flex-col items-center justify-center ${isActive('/profile') ? 'text-emerald-700 font-bold scale-110' : 'text-zinc-400'}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Profil</span>
        </Link>
      </nav>
    </div>
  );
}
