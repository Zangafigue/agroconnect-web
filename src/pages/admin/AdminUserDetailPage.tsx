import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  BadgeCheck, 
  Calendar, 
  Clock, 
  Wallet, 
  ShoppingBag, 
  MessageSquareWarning,
  ExternalLink,
  Edit3,
  Ban,
  MoreVertical,
  ChevronRight,
  Star,
  Activity
} from 'lucide-react';

const AdminUserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="pb-12 space-y-10 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link to="/admin/users" className="p-3 bg-surface-container-high rounded-2xl text-outline hover:text-primary transition-all border border-outline-variant/10 shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h2 className="font-serif-display text-3xl font-bold tracking-tight text-on-surface">Fiche Utilisateur <span className="font-mono text-primary">#{id || '1'}</span></h2>
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-primary/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                COMPTE ACTIF
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-sm font-bold text-on-surface hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2">
            <Edit3 size={18} /> Modifier
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-error/10 text-error rounded-2xl text-sm font-bold hover:bg-error hover:text-white transition-all shadow-lg shadow-error/10 border border-error/20 flex items-center justify-center gap-2">
            <Ban size={18} /> Suspendre
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Profile & Identity */}
        <div className="lg:col-span-4 space-y-8">
          {/* Identity Card */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10 text-center flex flex-col items-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <div className="relative mb-6">
               <div className="w-28 h-28 rounded-[2.5rem] bg-secondary-container text-on-secondary-container flex items-center justify-center text-4xl font-bold shadow-xl ring-4 ring-white group-hover:rotate-3 transition-transform duration-500">
                FT
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-2xl shadow-lg ring-4 ring-white">
                <BadgeCheck size={20} fill="currentColor" />
              </div>
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-on-surface">Fatima Traoré</h3>
            <p className="text-sm text-outline font-medium mb-6 italic">fatima.t@agro.bf</p>
            
            <div className="inline-flex items-center px-6 py-2 bg-blue-500/10 text-blue-600 rounded-full text-xs font-bold uppercase tracking-[0.15em] border border-blue-500/20 mb-8">
              Acheteur Certifié
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low/50 p-4 rounded-3xl border border-outline-variant/5">
                <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1 opacity-60">Depuis le</p>
                <p className="font-mono text-xs font-bold text-on-surface">12 Oct 2023</p>
              </div>
              <div className="bg-surface-container-low/50 p-4 rounded-3xl border border-outline-variant/5">
                <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1 opacity-60">Dernière vit.</p>
                <p className="font-mono text-xs font-bold text-on-surface">2h ago</p>
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10">
            <h4 className="font-serif-display text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
               <Phone size={18} className="text-primary" /> Coordonnées
            </h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-surface-container-high rounded-2xl text-outline group-hover:text-primary transition-all">
                   <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-bold tracking-widest leading-none mb-1">Téléphone</p>
                  <p className="font-mono text-sm font-bold text-on-surface">+226 70 00 00 00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-surface-container-high rounded-2xl text-outline group-hover:text-primary transition-all">
                   <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-bold tracking-widest leading-none mb-1">Résidence</p>
                  <p className="text-sm font-bold text-on-surface">Secteur 15, Ouagadougou</p>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Status */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10">
            <h4 className="font-serif-display text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
               <ShieldCheck size={18} className="text-primary" /> Sécurité & KYC
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-primary" />
                  <span className="text-sm font-bold text-on-surface">2FA (SMS/APP)</span>
                </div>
                <span className="text-[10px] font-bold text-primary italic">ACTIVÉ</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-3">
                  <BadgeCheck size={18} className="text-primary" />
                  <span className="text-sm font-bold text-on-surface">KYC (Pièce ID)</span>
                </div>
                <span className="text-[10px] font-bold text-primary italic">VALIDÉ</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Activity & Analytics */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Metrics Bento */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border-l-8 border-primary shadow-sm border border-outline-variant/10 group hover:-translate-y-1 transition-all">
              <p className="text-[10px] text-outline uppercase font-bold tracking-[0.2em] mb-3">Volume d'achats</p>
              <h3 className="font-serif-display text-3xl font-bold text-on-surface">1.2M <span className="text-xs text-outline font-body">FCFA</span></h3>
              <p className="text-[10px] text-primary font-bold mt-2 flex items-center gap-1 italic">
                 <Activity size={12} /> +24% vs mois dernier
              </p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border-l-8 border-secondary shadow-sm border border-outline-variant/10 group hover:-translate-y-1 transition-all">
              <p className="text-[10px] text-outline uppercase font-bold tracking-[0.2em] mb-3">Transactions</p>
              <h3 className="font-serif-display text-3xl font-bold text-on-surface">124</h3>
              <p className="text-[10px] text-secondary font-bold mt-2 italic flex items-center gap-1">
                 <ShoppingBag size={12} /> 98% Taux de succès
              </p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border-l-8 border-error shadow-sm border border-outline-variant/10 group hover:-translate-y-1 transition-all">
              <p className="text-[10px] text-outline uppercase font-bold tracking-[0.2em] mb-3">Litiges Actifs</p>
              <div className="flex items-end justify-between">
                <h3 className="font-serif-display text-3xl font-bold text-error">1</h3>
                <span className="px-3 py-1 bg-error/10 text-error text-[9px] font-bold rounded-full mb-1 border border-error/10 uppercase tracking-tight">OUVERT</span>
              </div>
              <p className="text-[10px] text-outline font-medium mt-2 italic underline cursor-pointer">Voir l'incident #LTG-882</p>
            </div>
          </section>

          {/* Recent Orders Table */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/20">
              <h3 className="font-serif-display text-xl font-bold text-on-surface">Activité transactionnelle récente</h3>
              <Link to="/admin/orders" className="p-2.5 bg-white border border-outline-variant/10 rounded-xl text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm">
                Consulter tout
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/30 text-[10px] uppercase tracking-[0.15em] text-outline font-bold border-b border-outline-variant/5">
                    <th className="px-8 py-4">Référence</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Statut</th>
                    <th className="px-8 py-4 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {[
                    { ref: 'CMD-2035', date: "Aujourd'hui, 10:23", status: 'EN ATTENTE', color: 'outline', amount: '125 000' },
                    { ref: 'CMD-045', date: 'Hier, 15:40', status: 'EN TRANSIT', color: 'tertiary', amount: '85 000' },
                    { ref: 'CMD-2033', date: '12 Oct 2023', status: 'LIVRÉE', color: 'primary', amount: '45 500' },
                  ].map((order, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/20 transition-colors group">
                      <td className="px-8 py-5">
                        <Link to={`/admin/orders/${order.ref}`} className="font-mono font-bold text-primary hover:underline">#{order.ref}</Link>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-on-surface-variant italic">{order.date}</td>
                      <td className="px-8 py-5">
                        <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-${order.color}/10 text-${order.color} border border-${order.color}/20 shadow-inner`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right font-serif-display font-bold text-on-surface">{order.amount} <span className="text-[10px] font-body text-outline">F</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Activity Timeline (M3 Style) */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
            <h3 className="font-serif-display text-xl font-bold text-on-surface mb-10 flex items-center gap-3">
               <Activity size={24} className="text-primary" /> Chronique du compte
            </h3>
            <div className="relative space-y-10 before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-outline-variant/10">
              {[
                { title: 'Connexion réussie', detail: 'IP: 197.231.xx.xx (Ouagadougou)', time: '10:45 AM', icon: ShieldCheck, color: 'primary' },
                { title: 'Création commande #CMD-2035', detail: 'Montant: 125 000 FCFA', time: '10:23 AM', icon: ShoppingBag, color: 'secondary' },
                { title: 'Modification profil', detail: 'Mise à jour de l\'adresse de livraison', time: 'Hier, 18:30', icon: Edit3, color: 'tertiary' },
                { title: 'Ouverture litige #LTG-882', detail: 'Motif: Produit non conforme', time: 'Hier, 14:15', icon: MessageSquareWarning, color: 'error' }
              ].map((log, i) => (
                <div key={i} className="relative pl-12 group">
                  <div className={`absolute left-0 w-8 h-8 rounded-xl bg-white shadow-md border border-${log.color}/20 flex items-center justify-center text-${log.color} z-10 group-hover:scale-125 transition-transform duration-500`}>
                    <log.icon size={16} />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{log.title}</p>
                      <p className="text-[11px] text-outline font-medium italic mt-1">{log.detail}</p>
                    </div>
                    <span className="font-mono text-[9px] text-outline opacity-50 font-bold uppercase tracking-widest">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
