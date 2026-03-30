import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import Avatar from './Avatar';
import Button from './Button';
import LogoutModal from './LogoutModal';
import NotificationBell from './NotificationBell';

export default function Header() {
  const { user, logout } = useAuthStore() as any;
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
    <header className="bg-[var(--bg-surface)] h-[64px] flex items-center justify-between px-6 z-30 border-b border-[var(--border-light)] sticky top-0 font-body">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-[var(--bg-muted)] px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border-light)] group focus-within:border-[var(--input-border-focus)] transition-all">
          <span className="material-symbols-outlined text-[18px] text-[var(--text-muted)] group-focus-within:text-[var(--text-accent)]">search</span>
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none outline-none px-2 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] w-48 font-medium"
          />
          <kbd className="hidden sm:inline-flex h-4 items-center gap-1 rounded bg-[var(--border-light)] px-1 font-mono text-[9px] font-bold text-[var(--text-muted)]">
            <span className="text-[10px]">⌘</span> K
          </kbd>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-subtle)] rounded-full border border-[var(--text-accent)]/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)] shadow-[0_0_4px_var(--text-accent)]"></div>
          <span className="text-[10px] font-bold text-[var(--text-accent)] uppercase tracking-wider">
            ADMIN PANEL
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-all"
          title={theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}
        >
          <span className="material-symbols-outlined text-[18px]">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* Notifications */}
        <NotificationBell />

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-[var(--border-light)] pl-4 ml-1 group cursor-pointer" onClick={() => navigate(`/admin/profile`)}>
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">
              {user?.firstName || user?.name || 'Admin'}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-mono opacity-80 uppercase tracking-tighter">
              SYS-#{user?._id?.slice(-4).toUpperCase() || 'ROOT'}
            </p>
          </div>
          <Avatar 
            name={user?.firstName || user?.name} 
            role="ADMIN" 
            size="sm" 
            image={user?.profilePicture}
            className="group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Logout */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => setShowLogoutModal(true)}
          icon={<span className="material-symbols-outlined">logout</span>}
          className="ml-2"
        />
      </div>
    </header>
    <LogoutModal
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      onConfirm={handleLogout}
    />
    </>
  );
}
