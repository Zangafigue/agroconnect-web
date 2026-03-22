import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { LogOut, Bell, Search, Command, Sun, Moon } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="bg-[var(--bg-surface)] h-20 flex items-center justify-between px-8 z-30 border-b border-[var(--border-light)]">
      {/* Search Bar / Console Indicator */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-[var(--bg-muted)] px-4 py-2 rounded-2xl border border-[var(--border-light)] group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-4 h-4 text-[var(--text-muted)] opacity-50 group-hover:opacity-100 transition-opacity" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none outline-none px-3 text-sm text-[var(--text-[var(--text-accent)])] placeholder:text-[var(--text-muted)]/50 w-64 font-medium"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded bg-border/50 px-1.5 font-mono text-[10px] font-black text-[var(--text-muted)]">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-subtle)] rounded-2xl border border-primary/10">
          <div className="w-2 h-2 rounded-full bg-[var(--green-600)] animate-pulse"></div>
          <span className="text-[10px] font-bold text-[var(--text-accent)] uppercase tracking-widest">
            {user?.role || 'Session'} Active
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-12 h-12 bg-[var(--bg-muted)] hover:bg-[var(--bg-subtle)] transition-colors flex items-center justify-center rounded-2xl border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-accent)]"
          title={theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="relative w-12 h-12 bg-[var(--bg-muted)] hover:bg-[var(--bg-subtle)] transition-colors flex items-center justify-center rounded-2xl border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-accent)]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface shadow-sm"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 border-l border-[var(--border-light)] pl-6 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[var(--text-[var(--text-accent)])] group-hover:text-[var(--text-accent)] transition-colors leading-none mb-1 uppercase tracking-tight">
              {user?.name || 'Utilisateur'}
            </p>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest opacity-60">
              {user?.role}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg-subtle)] p-1 border border-primary/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
             <div className="w-full h-full rounded-xl overflow-hidden bg-[var(--green-600)] flex items-center justify-center text-[var(--text-inverse)] font-black text-xs">
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
