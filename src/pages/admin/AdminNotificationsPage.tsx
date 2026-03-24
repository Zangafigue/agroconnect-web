import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Trash2, 
  Clock, 
  MoreVertical,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Wallet
} from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminNotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications, markAsRead, deleteNotification, loading } = useNotificationStore() as any;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DISPUTE': return <AlertTriangle size={20} className="text-red-500" />;
      case 'KYC': return <ShieldCheck size={20} className="text-[var(--green-600)]" />;
      case 'PAYMENT': return <Wallet size={20} className="text-amber-500" />;
      default: return <Info size={20} className="text-[var(--text-accent)]" />;
    }
  };

  const getBgColor = (type: string) => {
     switch (type) {
      case 'DISPUTE': return 'bg-red-500/10 border-red-500/20';
      case 'KYC': return 'bg-[var(--green-600)]/10 border-[var(--green-600)]/20';
      case 'PAYMENT': return 'bg-amber-500/10 border-amber-500/20';
      default: return 'bg-[var(--bg-muted)] border-[var(--border-light)]';
    }
  }

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-pulse">
           <div className="w-16 h-16 border-4 border-[var(--green-600)] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] italic">Écoute du Flux d'Événements...</p>
        </div>
     );
  }

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-body">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight leading-none mb-3">
            Flux de Notifications
          </h2>
          <p className="text-[var(--text-muted)] font-medium italic text-sm max-w-xl">
            Journal de bord temps réel des activités critiques nécessitant l'attention ou la validation de l'Administrateur.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 px-8 py-4 bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-accent)] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--bg-muted)] transition-all shadow-sm">
             Tout marquer comme lu
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[var(--bg-surface)] rounded-[3.5rem] border border-[var(--border-light)] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
         {/* Sidebar Navigation */}
         <aside className="w-full md:w-80 border-r border-[var(--border-light)] p-8 space-y-8 bg-[var(--bg-muted)]/10">
            <div className="space-y-3">
               <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-6 opacity-40 italic">Filtrage des Flux</p>
               {[ 
                 { label: 'Tous les événements', count: notifications.length, active: true },
                 { label: 'Litiges', count: notifications.filter((n: any) => n.type === 'DISPUTE').length, active: false },
                 { label: 'Certifications KYC', count: notifications.filter((n: any) => n.type === 'KYC').length, active: false },
                 { label: 'Paiements', count: notifications.filter((n: any) => n.type === 'PAYMENT').length, active: false },
               ].map((item, i) => (
                 <button 
                   key={i} 
                   className={`w-full flex items-center justify-between p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${item.active ? 'bg-[var(--gray-900)] text-white shadow-xl shadow-gray-900/20' : 'bg-white text-[var(--text-muted)] border border-[var(--border-light)] hover:bg-[var(--bg-muted)]'}`}
                 >
                   {item.label}
                   <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[8px] ${item.active ? 'bg-white/20' : 'bg-[var(--bg-muted)]'}`}>{item.count}</span>
                 </button>
               ))}
            </div>
         </aside>

         {/* Notification List */}
         <main className="flex-1 p-10 space-y-6">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[var(--border-light)]">
               <div className="flex items-center gap-4 bg-white border border-[var(--border-light)] px-6 py-3 rounded-2xl w-full max-w-md shadow-inner">
                  <Search size={18} className="text-[var(--text-muted)]" />
                  <input type="text" placeholder="Rechercher une alerte..." className="bg-transparent border-none text-sm font-medium w-full outline-none placeholder:opacity-30" />
               </div>
               <button className="p-3 bg-white border border-[var(--border-light)] text-[var(--text-muted)] rounded-2xl hover:bg-[var(--bg-muted)] shadow-sm"><Filter size={20} /></button>
            </div>

            <div className="space-y-4">
               {notifications.length > 0 ? (
                 notifications.map((notif: any) => (
                    <div 
                      key={notif._id} 
                      className={`group p-8 rounded-[2.5rem] border transition-all flex items-start gap-8 relative overflow-hidden ${notif.read ? 'bg-white border-[var(--border-light)]' : 'bg-[var(--bg-muted)] border-[var(--green-600)] shadow-2xl shadow-[var(--green-600)]/5 animate-in slide-in-from-left-2 duration-500'}`}
                      onClick={() => markAsRead(notif._id)}
                    >
                       {!notif.read && (
                         <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-6 transition-transform">
                            <Bell size={100} />
                         </div>
                       )}
                       
                       <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${getBgColor(notif.type)}`}>
                          {getTypeIcon(notif.type)}
                       </div>

                       <div className="flex-1 space-y-2 relative z-10">
                          <div className="flex items-center justify-between">
                             <h4 className={`font-display font-black text-lg uppercase tracking-tight ${notif.read ? 'text-[var(--text-accent)]' : 'text-[var(--green-600)]'}`}>{notif.title}</h4>
                             <div className="flex items-center gap-3 text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-40 italic">
                                <Clock size={12} /> {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: fr })}
                             </div>
                          </div>
                          <p className={`text-sm font-medium italic ${notif.read ? 'text-[var(--text-muted)]' : 'text-[var(--text-accent)]'}`}>{notif.message}</p>
                          <div className="pt-4 flex items-center gap-4">
                             <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notif._id);
                                  if (notif.type === 'DISPUTE') navigate(`/admin/disputes/${notif.relatedId}`);
                                  else if (notif.type === 'KYC') navigate(`/admin/users/${notif.relatedId}`);
                                  else if (notif.type === 'PAYMENT') navigate(`/admin/payments`);
                                  else if (notif.relatedId) navigate(`/admin/orders/${notif.relatedId}`);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--gray-900)] text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg group-hover:scale-105"
                              >
                                Consulter <ArrowRight size={12} />
                             </button>
                             <button 
                               onClick={(e) => { e.stopPropagation(); deleteNotification(notif._id); }}
                               className="p-2.5 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                             >
                                <Trash2 size={18} />
                             </button>
                          </div>
                       </div>
                    </div>
                 ))
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 opacity-30 italic">
                    <Bell size={64} className="mb-6" />
                    <p className="text-sm font-black uppercase tracking-widest">Le journal de bord est vide.</p>
                 </div>
               )}
            </div>
         </main>
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
