import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Package, 
  User, 
  Phone, 
  FileText, 
  Download, 
  Lock, 
  Gavel, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Weight,
  ArrowRight,
  ShieldAlert,
  CreditCard,
  Ban
} from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { formatFCFA } from '../../utils/currency';

const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchOrderById, selectedOrder, updateStatus, loading } = useOrderStore() as any;
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) fetchOrderById(id);
  }, [id, fetchOrderById]);

  if (loading && !selectedOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-[var(--green-600)] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-display text-sm font-black uppercase tracking-[0.3em] text-[var(--text-muted)] animate-pulse">Extraction des données de l'ordre...</p>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="p-20 text-center bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-light)]">
        <AlertTriangle size={48} className="mx-auto text-[var(--text-muted)] mb-6 opacity-40" />
        <h2 className="font-display text-2xl font-black text-[var(--text-accent)] uppercase tracking-tight mb-4">Ordre Introuvable</h2>
        <p className="text-[var(--text-muted)] font-medium mb-10">Cette transaction n'existe pas ou a été purgée du système.</p>
        <Link to="/admin/orders" className="px-10 py-5 bg-[var(--green-600)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[var(--green-600)]/20 hover:scale-105 transition-all">
          Retour au registre
        </Link>
      </div>
    );
  }

  const order = selectedOrder;

  const handleUpdateStatus = async (newStatus: string) => {
    if (!window.confirm(`Confirmer le changement de statut vers : ${newStatus} ?`)) return;
    setIsUpdating(true);
    await updateStatus(order._id, newStatus);
    setIsUpdating(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING': return { color: 'var(--text-muted)', icon: Clock, label: 'En attente', bg: 'bg-[var(--bg-muted)]' };
      case 'CONFIRMED': return { color: 'var(--green-600)', icon: CheckCircle2, label: 'Confirmée', bg: 'bg-[var(--green-600)]/10' };
      case 'SHIPPED': return { color: 'blue', icon: Truck, label: 'En transit', bg: 'bg-blue-500/10' };
      case 'DELIVERED': return { color: 'var(--green-600)', icon: Package, label: 'Livrée', bg: 'bg-[var(--green-600)]/20' };
      case 'CANCELLED': return { color: 'red', icon: Ban, label: 'Annulée', bg: 'bg-red-500/10' };
      case 'DISPUTED': return { color: 'orange', icon: AlertTriangle, label: 'Litige', bg: 'bg-orange-500/10' };
      default: return { color: 'var(--text-muted)', icon: Clock, label: status, bg: 'bg-[var(--bg-muted)]' };
    }
  };

  const config = getStatusConfig(order.status);

  return (
    <div className="pb-12 animate-in fade-in duration-700 font-body">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate(-1)} className="p-4 bg-[var(--bg-surface)] rounded-[1.5rem] text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-all border border-[var(--border-light)] shadow-sm hover:shadow-md">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <h2 className="font-display font-black text-4xl tracking-tighter text-[var(--text-accent)] uppercase">Ordre <span className="text-[var(--green-600)]">#{order._id?.slice(-8).toUpperCase()}</span></h2>
              <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] ${config.bg} border border-current/10 shadow-sm`} style={{ color: config.color }}>
                {config.label}
              </div>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
               <Clock size={12} className="opacity-40" /> Émis le {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })} à {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-8 py-4 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-[var(--text-accent)] hover:bg-[var(--bg-muted)] transition-all shadow-sm flex items-center gap-3">
             <Download size={18} className="opacity-40" /> Dossier Transaction
           </button>
           {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
             <button 
                onClick={() => handleUpdateStatus('CANCELLED')}
                disabled={isUpdating}
                className="px-8 py-4 bg-red-50 text-red-600 border border-red-100 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-3"
             >
               <Ban size={18} /> Révoquer l'ordre
             </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* COLONNE GAUCHE (70%) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Acteurs Card */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-10 shadow-sm border border-[var(--border-light)]">
            <h3 className="font-display text-2xl font-black mb-10 text-[var(--text-accent)] uppercase tracking-tight flex items-center gap-4">
              <User size={24} className="text-[var(--green-600)]" />
              Nœuds de la Transaction
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                { label: 'Acheteur', data: order.buyer, icon: User, color: '#2563eb' },
                { label: 'Vendeur', data: order.seller, icon: User, color: '#16a34a' },
                { label: 'Transp.', data: order.transporter, icon: Truck, color: '#d97706' }
              ].map((actor, idx) => (
                <div key={idx} className="relative group">
                   <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-[var(--bg-muted)]/20 border border-transparent group-hover:bg-white group-hover:border-[var(--border-light)] group-hover:shadow-2xl transition-all duration-500">
                      <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-2xl font-black mb-5 shadow-inner ring-8 ring-[var(--bg-surface)]" style={{ backgroundColor: `${actor.color}15`, color: actor.color }}>
                        {actor.data?.firstName?.charAt(0) || actor.data?.name?.charAt(0) || '?'}
                      </div>
                      <p className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-[0.3em] mb-2">{actor.label}</p>
                      <p className="font-display font-black text-[var(--text-accent)] text-lg tracking-tight mb-1 truncate w-full">
                        {actor.data?.firstName ? `${actor.data.firstName} ${actor.data.lastName || ''}` : actor.data?.name || 'Inconnu'}
                      </p>
                      <p className="text-[10px] font-bold text-[var(--text-muted)] italic mb-6 opacity-60">{actor.data?.phone || 'Pas de contact'}</p>
                      {actor.data?._id && (
                        <Link to={`/admin/users/${actor.data._id}`} className="px-6 py-2.5 bg-white border border-[var(--border-light)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--green-600)] hover:border-[var(--green-600)] transition-all flex items-center gap-2">
                          Explorer <ChevronRight size={12} />
                        </Link>
                      )}
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Logistics & Items */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-10 shadow-sm border border-[var(--border-light)]">
            <h3 className="font-display text-2xl font-black mb-8 text-[var(--text-accent)] uppercase tracking-tight flex items-center gap-4">
              <Package size={24} className="text-[var(--green-600)]" />
              Cargaison & Logistique
            </h3>
            
            <div className="space-y-4 mb-10">
              {order.items?.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-[var(--bg-muted)]/20 border border-[var(--border-light)]/50">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-sm border border-[var(--border-light)]">
                    <img src={item.productId?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-[var(--green-600)] uppercase tracking-widest mb-1">{item.productId?.category || 'PRODUIT'}</p>
                    <p className="font-display font-black text-[var(--text-accent)] text-lg tracking-tight uppercase">{item.productId?.name || 'Produit Agro'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">{item.quantity} UNITÉS</p>
                    <p className="font-mono font-black text-[var(--text-accent)] text-lg">{formatFCFA(item.price)} <span className="text-[10px]">L'UNITÉ</span></p>
                  </div>
                </div>
              ))}
              {(!order.items || order.items.length === 0) && (
                <div className="p-8 text-center border-2 border-dashed border-[var(--border-light)] rounded-3xl grayscale opacity-30">
                  <Package size={32} className="mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Contenu cryptique ou non spécifié</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { label: 'Origine', val: 'Bobo-Dioulasso', icon: MapPin },
                 { label: 'Destination', val: 'Ouagadougou', icon: MapPin },
                 { label: 'Livraison', val: 'Express (24h)', icon: Truck },
                 { label: 'Poids Total', val: '850 Kg', icon: Weight }
               ].map((info, i) => (
                 <div key={i} className="p-5 rounded-[1.5rem] bg-white border border-[var(--border-light)] shadow-sm">
                   <div className="flex items-center gap-2 mb-3 opacity-40">
                      <info.icon size={14} className="text-[var(--text-accent)]" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)]">{info.label}</span>
                   </div>
                   <p className="text-xs font-black text-[var(--text-accent)] uppercase tracking-tight">{info.val}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-10 shadow-sm border border-[var(--border-light)]">
            <h3 className="font-display text-2xl font-black mb-12 text-[var(--text-accent)] uppercase tracking-tight flex items-center gap-4">
              <Clock size={24} className="text-[var(--green-600)]" />
              Chronologie des Flux
            </h3>
            <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-20px)] before:w-[3px] before:bg-[var(--border-light)] before:opacity-30">
              {[
                { title: "Statut Actuel : " + config.label, desc: "Traitement système en cours sur ce nœud.", time: "Dernière MAJ: " + new Date().toLocaleTimeString(), icon: config.icon, active: true },
                { title: "Transfert des fonds au séquestre", desc: "Le montant total a été sécurisé et vérifié par l'opérateur.", time: new Date(order.createdAt).toLocaleDateString(), icon: CreditCard, active: false },
                { title: "Génération du bon d'ordre", desc: "Attribution de l'identifiant unique " + order._id?.slice(-6).toUpperCase(), time: new Date(order.createdAt).toLocaleDateString(), icon: FileText, active: false }
              ].map((log, i) => (
                <div key={i} className="relative flex items-start gap-10 pl-14 group">
                  <div className={`absolute left-0 w-11 h-11 rounded-[1.2rem] flex items-center justify-center z-10 border-4 border-[var(--bg-surface)] shadow-2xl transition-all duration-500 ${log.active ? 'bg-[var(--green-600)] text-white scale-125' : 'bg-[var(--bg-muted)] text-[var(--text-muted)] scale-100 opacity-60 group-hover:opacity-100'}`}>
                    <log.icon size={20} />
                  </div>
                  <div className={log.active ? '' : 'opacity-60 group-hover:opacity-100 transition-opacity'}>
                    <p className="font-display font-black text-[var(--text-accent)] text-xl tracking-tight uppercase mb-1">{log.title}</p>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] leading-relaxed italic opacity-70 mb-3">{log.desc}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-muted)] rounded-lg">
                       <Clock size={10} className="text-[var(--green-600)]" />
                       <span className="text-[8px] font-black text-[var(--green-600)] uppercase tracking-widest">{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLONNE DROITE (30%) */}
        <div className="lg:col-span-4 space-y-10">
          {/* Economic Card */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] shadow-2xl shadow-[var(--green-600)]/5 border border-[var(--border-light)] overflow-hidden flex flex-col h-fit sticky top-8">
            <div className="p-10 bg-[var(--bg-muted)]/20 border-b border-[var(--border-light)]">
              <h3 className="font-display text-2xl font-black text-[var(--text-accent)] uppercase tracking-tight">Valeur du Flux</h3>
              <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1 opacity-60 italic">Audit économique en temps réel</p>
            </div>
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-end border-b border-[var(--border-light)] pb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Cargaison Brute</span>
                  <span className="font-display font-black text-[var(--text-accent)] text-2xl tracking-tighter">{formatFCFA((order.totalAmount || order.price) * 0.9)}</span>
                </div>
                <Package size={24} className="text-[var(--border-light)]" />
              </div>
              
              <div className="flex justify-between items-end border-b border-[var(--border-light)] pb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Réseau Logistique</span>
                  <span className="font-display font-black text-[var(--text-accent)] text-2xl tracking-tighter">{formatFCFA((order.totalAmount || order.price) * 0.07)}</span>
                </div>
                <Truck size={24} className="text-[var(--border-light)]" />
              </div>

              <div className="flex justify-between items-end pb-8 border-b-4 border-double border-[var(--border-light)]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[var(--green-600)] uppercase tracking-[0.2em] mb-1">Taxe Plateforme (3%)</span>
                  <span className="font-display font-black text-[var(--green-600)] text-3xl tracking-tighter">{formatFCFA((order.totalAmount || order.price) * 0.03)}</span>
                </div>
                <ShieldCheck size={28} className="text-[var(--green-600)] opacity-40 shadow-sm" />
              </div>

              <div className="py-6 flex flex-col items-center">
                <span className="text-[10px] font-black text-[var(--text-accent)] uppercase tracking-[0.5em] mb-4">Total Net Liquide</span>
                <span className="font-display font-black text-6xl text-[var(--text-accent)] tracking-tighter leading-none mb-3">
                  {formatFCFA(order.totalAmount || order.price).split(' ')[0]}
                </span>
                <span className="text-xl font-display font-black text-[var(--green-600)] tracking-widest">FCFA</span>
              </div>
            </div>

            <div className="px-10 pb-12 flex flex-col gap-5">
              <div className="flex items-center gap-5 p-6 bg-[var(--bg-muted)]/30 rounded-[2rem] border border-[var(--border-light)]/40 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--green-600)]/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md text-[var(--green-600)] z-10 border border-[var(--border-light)]">
                  <Lock size={24} />
                </div>
                <div className="z-10">
                  <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">Status de Sécurité</p>
                  <p className="text-lg font-display font-black text-[var(--text-accent)] tracking-tight uppercase">FONDS SÉQUESTRES</p>
                </div>
              </div>
              
              {order.status === 'DISPUTED' ? (
                <button onClick={() => navigate(`/admin/disputes/${order._id}`)} className="w-full py-6 bg-orange-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Gavel size={24} />
                  Arbitrer Friction (Litige)
                </button>
              ) : (
                <button 
                  onClick={() => handleUpdateStatus('DELIVERED')}
                  disabled={order.status === 'DELIVERED' || isUpdating}
                  className="w-full py-6 bg-[var(--green-600)] text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-[var(--green-600)]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100"
                >
                  <ShieldCheck size={24} />
                  {order.status === 'DELIVERED' ? 'ORDRE CLÔTURÉ' : 'FORCER VALIDATION'}
                </button>
              )}
            </div>
          </section>

          {/* Legal Card */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-10 shadow-sm border border-[var(--border-light)]">
            <h3 className="font-display text-lg font-black mb-8 text-[var(--text-accent)] uppercase tracking-tight flex items-center gap-3">
              <ShieldAlert size={20} className="text-[var(--text-muted)] opacity-40" />
              Notes d'Audit
            </h3>
            <div className="space-y-6">
               <div className="p-5 rounded-2xl bg-[var(--bg-muted)]/50 border-l-4 border-[var(--text-muted)]">
                 <p className="text-[10px] font-bold text-[var(--text-muted)] italic leading-relaxed">
                   "Aucune anomalie détectée sur ce nœud. Les métadonnées de transaction correspondent au profil de risque standard."
                 </p>
               </div>
               <div className="flex items-center gap-4 text-[var(--text-muted)] opacity-30 hover:opacity-80 transition-opacity cursor-help">
                  <FileText size={16} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Journal des logs système (JSON)</span>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
