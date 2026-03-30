import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Trash2, Package, MessageSquare, AlertCircle, ShieldAlert, CreditCard } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getUserRole, getRoleSlug } from '../../utils/auth';

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, fetchNotifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore() as any;
  const { user } = useAuthStore() as any;
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000); // poll every 10s
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = (notifications || []).filter((n: any) => !n.isRead).length;

  const handleNotificationClick = (n: any) => {
    if (!n.isRead) markAsRead(n._id);
    setIsOpen(false);
    
    const type = String(n.type || '').toUpperCase();

    // Si Administration
    const actualRole = getUserRole(user);
    if (actualRole === 'ADMIN') {
      if (type === 'ADMIN_ACTION') navigate(`/admin/disputes`);
      else navigate(`/admin/dashboard`);
      return;
    }

    const roleSlug = getRoleSlug(actualRole);
    
    if (type === 'MESSAGE' || type === 'NEW_MESSAGE') {
      navigate(`/${roleSlug}/messages?open=${n.relatedId}`);
    } else if (type === 'ORDER_STATUS' || type === 'ORDER') {
      navigate(actualRole === 'TRANSPORTER' ? '/transporter/missions' : `/${roleSlug}/orders`);
    } else if (type === 'PAYMENT') {
      navigate(`/${roleSlug}/wallet`);
    } else if (type === 'ADMIN_ACTION') {
      navigate(`/${roleSlug}/profile`);
    } else {
      // Fallback au cas où le type est inconnu mais on veut faire qqchose (ex: dashboard)
      // navigate(`/${roleSlug}/dashboard`);
    }
  };

  const getIcon = (typeInput: string) => {
    const type = String(typeInput || '').toUpperCase();
    switch (type) {
      case 'MESSAGE':
      case 'NEW_MESSAGE': return <MessageSquare size={16} className="text-blue-500" />;
      case 'ORDER_STATUS': 
      case 'ORDER': return <Package size={16} className="text-green-500" />;
      case 'PAYMENT': return <CreditCard size={16} className="text-[var(--text-accent)]" />;
      case 'ADMIN_ACTION': return <ShieldAlert size={16} className="text-red-500" />;
      default: return <AlertCircle size={16} className="text-orange-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center relative border border-[var(--border-light)] shadow-sm"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[var(--bg-muted)] animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="fixed sm:absolute top-16 right-4 sm:top-14 sm:right-0 w-[calc(100vw-2rem)] sm:w-80 max-h-[400px] bg-[var(--bg-surface)] border border-[var(--border-light)] shadow-2xl rounded-2xl flex flex-col z-[100] overflow-hidden">
          <div className="p-4 border-b border-[var(--border-light)] flex items-center justify-between bg-[var(--bg-muted)]/50">
            <h3 className="font-bold text-[var(--text-primary)]">Notifications {unreadCount > 0 && <span className="bg-[var(--text-accent)] text-white text-[10px] px-2 py-0.5 rounded-full ml-1">{unreadCount}</span>}</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => markAllAsRead()}
                className="text-[11px] font-bold text-[var(--text-accent)] hover:underline"
              >
                Tout marquer lu
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {!notifications || notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center">
                <Bell size={32} className="text-[var(--text-muted)] mb-3" />
                <p className="text-sm font-medium text-[var(--text-secondary)]">Aucune notification</p>
              </div>
            ) : (
              notifications.map((n: any) => (
                <div 
                  key={n._id} 
                  className={`p-4 border-b border-[var(--border-light)]/50 transition-colors flex gap-3 cursor-pointer group hover:bg-[var(--bg-muted)] ${!n.isRead ? 'bg-[var(--text-accent)]/5' : ''}`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <div className="mt-1 shrink-0 bg-[var(--bg-surface)] w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-light)] shadow-sm">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] mb-0.5 leading-snug ${!n.isRead ? 'font-bold text-[var(--text-primary)]' : 'font-medium text-[var(--text-secondary)]'}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-snug">{n.message}</p>
                    <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mt-2">
                       {format(new Date(n.createdAt), 'dd MMM HH:mm', { locale: fr })}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteNotification(n._id); }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all self-start"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
