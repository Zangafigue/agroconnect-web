import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Trash2, 
  Clock, 
  Search,
  ArrowRight,
  ShieldCheck,
  Wallet
} from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';

const AdminNotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications, markAsRead, deleteNotification, loading } = useNotificationStore() as any;
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DISPUTE': return <AlertTriangle size={18} className="text-[var(--btn-danger-text)]" />;
      case 'KYC': return <ShieldCheck size={18} className="text-[var(--text-accent)]" />;
      case 'PAYMENT': return <Wallet size={18} className="text-amber-500" />;
      default: return <Info size={18} className="text-[var(--text-secondary)]" />;
    }
  };

  const filteredNotifications = notifications.filter((n: any) => {
    const matchesFilter = filter === 'ALL' || n.type === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
           <div className="w-10 h-10 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">Chargement des notifications...</p>
        </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Flux de Notifications</h1>
          <p className="text-[14px] text-[var(--text-secondary)] max-w-xl">
            Journal de bord des activités critiques nécessitant votre attention.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="md" 
            onClick={() => notifications.forEach((n: any) => !n.read && markAsRead(n._id))}
            icon={<CheckCircle2 size={16} />}
          >
            Tout marquer comme lu
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar Navigation */}
         <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 space-y-2">
               <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 opacity-70">Filtrer par type</p>
               {[ 
                 { label: 'Tous les événements', type: 'ALL', count: notifications.length },
                 { label: 'Litiges', type: 'DISPUTE', count: notifications.filter((n: any) => n.type === 'DISPUTE').length },
                 { label: 'Certifications KYC', type: 'KYC', count: notifications.filter((n: any) => n.type === 'KYC').length },
                 { label: 'Paiements', type: 'PAYMENT', count: notifications.filter((n: any) => n.type === 'PAYMENT').length },
               ].map((item, i) => (
                 <button 
                   key={i} 
                   onClick={() => setFilter(item.type)}
                   className={`w-full flex items-center justify-between p-3 rounded-[var(--radius-md)] text-[12px] font-medium transition-all ${filter === item.type ? 'bg-[var(--bg-subtle)] text-[var(--text-accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'}`}
                 >
                   {item.label}
                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${filter === item.type ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>{item.count}</span>
                 </button>
               ))}
            </Card>
         </div>

         {/* Notification List */}
         <div className="lg:col-span-3 space-y-4">
            <Card className="flex items-center gap-4">
               <Input 
                 placeholder="Rechercher une alerte..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 icon={<Search size={16} />}
                 className="flex-1"
               />
            </Card>

            <div className="space-y-3">
               {filteredNotifications.length > 0 ? (
                 filteredNotifications.map((notif: any) => (
                    <Card 
                      key={notif._id} 
                      className={`relative overflow-hidden border-l-4 transition-all ${notif.read ? 'border-l-transparent px-6' : 'border-l-[var(--text-accent)] bg-[var(--bg-subtle)]/30 px-6'}`}
                    >
                       <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--bg-muted)] border border-[var(--border-light)] shadow-sm`}>
                             {getTypeIcon(notif.type)}
                          </div>

                          <div className="flex-1 space-y-1">
                             <div className="flex items-center justify-between">
                                <h4 className={`text-[15px] font-bold ${notif.read ? 'text-[var(--text-primary)]' : 'text-[var(--text-accent)]'}`}>{notif.title}</h4>
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--text-muted)]">
                                   <Clock size={12} /> {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: fr })}
                                </div>
                             </div>
                             <p className={`text-[13px] leading-relaxed ${notif.read ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] font-medium'}`}>{notif.message}</p>
                             
                             <div className="pt-4 flex items-center gap-2">
                                <Button 
                                   size="sm"
                                   variant="secondary"
                                   onClick={() => {
                                     markAsRead(notif._id);
                                     if (notif.type === 'DISPUTE') navigate(`/admin/disputes/${notif.relatedId}`);
                                     else if (notif.type === 'KYC') navigate(`/admin/users/${notif.relatedId}`);
                                     else if (notif.type === 'PAYMENT') navigate(`/admin/payments`);
                                     else if (notif.relatedId) navigate(`/admin/orders/${notif.relatedId}`);
                                   }}
                                   icon={<ArrowRight size={14} />}
                                   iconPosition="right"
                                 >
                                   Détails
                                </Button>
                                {!notif.read && (
                                   <Button 
                                     size="sm"
                                     variant="ghost"
                                     onClick={() => markAsRead(notif._id)}
                                   >
                                     Marquer comme lu
                                   </Button>
                                )}
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  className="text-[var(--btn-danger-text)] hover:bg-[var(--badge-dispute-bg)] p-2 min-w-0"
                                  onClick={() => deleteNotification(notif._id)}
                                >
                                   <Trash2 size={16} />
                                </Button>
                             </div>
                          </div>
                       </div>
                    </Card>
                 ))
               ) : (
                 <Card className="flex flex-col items-center justify-center py-20 opacity-40 italic">
                    <Bell size={48} className="mb-4 text-[var(--text-muted)]" />
                    <p className="text-[13px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Aucune notification correspondant aux critères.</p>
                 </Card>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
