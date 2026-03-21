import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Bell, Search, Command } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-surface-container-lowest h-20 flex items-center justify-between px-8 z-30 border-b border-outline-variant/10">
      {/* Search Bar / Console Indicator */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-2xl border border-outline-variant/10 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-4 h-4 text-outline opacity-50 group-hover:opacity-100 transition-opacity" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none outline-none px-3 text-sm text-on-surface placeholder:text-outline/50 w-64 font-medium"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded bg-surface-variant/50 px-1.5 font-mono text-[10px] font-black text-outline">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-2xl border border-primary/10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {user?.role || 'Session'} Active
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative w-12 h-12 bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-center rounded-2xl border border-outline-variant/10 text-outline hover:text-primary">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest shadow-sm"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 border-l border-outline-variant/10 pl-6 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-on-surface group-hover:text-primary transition-colors leading-none mb-1 uppercase tracking-tighter">
              {user?.name || 'Utilisateur'}
            </p>
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest opacity-60">
              {user?.role}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 p-1 border border-primary/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
             <div className="w-full h-full rounded-xl overflow-hidden bg-primary flex items-center justify-center text-white font-black text-xs">
               {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
             </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-12 h-12 bg-error/5 hover:bg-error/10 text-error flex items-center justify-center rounded-2xl transition-all hover:scale-105 border border-error/10"
          title="Déconnexion"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
