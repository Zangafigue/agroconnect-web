import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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
  AlertTriangle,
  ExternalLink,
  Edit3,
  Ban,
  MoreVertical,
  ChevronRight,
  Star,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { formatFCFA } from '../../utils/currency';

const AdminUserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser: user, fetchUserById, updateUserStatus, updateUser, loading } = useUserStore() as any;
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    if (id) {
      fetchUserById(id).then((data: any) => {
        if (data) {
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            city: data.city || data.address?.city || '',
            address: data.address?.full || data.address || ''
          });
        }
      });
    }
  }, [id, fetchUserById]);

  const handleEditSave = async () => {
    if (!id) return;
    setSaving(true);
    try {
      await updateUser(id, formData);
      setIsEditing(false);
      toast.success('Informations mises à jour');
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !user) {
    return <div className="p-20 text-center text-[var(--text-muted)] font-black uppercase tracking-widest animate-pulse">Chargement du dossier confidentiel...</div>;
  }

  if (!user && !loading) {
    return (
      <div className="p-20 text-center">
        <p className="text-[var(--text-muted)] font-bold mb-4">Utilisateur introuvable.</p>
        <Link to="/admin/users" className="text-[var(--green-600)] font-black uppercase tracking-widest border-b-2 border-[var(--green-600)]">Retour à l'annuaire</Link>
      </div>
    );
  }

  const handleToggleStatus = async () => {
    if (user) {
      await updateUserStatus(user._id, !user.isActive);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'Administrateur';
      case 'FARMER': return 'Producteur Certifié';
      case 'BUYER': return 'Acheteur Agréé';
      case 'TRANSPORTER': return 'Partenaire Logistique';
      default: return role;
    }
  };

  return (
    <div className="pb-12 space-y-10 animate-in fade-in duration-700 font-body">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-4 bg-[var(--bg-surface)] rounded-2xl text-[var(--text-muted)] hover:text-[var(--green-600)] transition-all border border-[var(--border-light)] shadow-sm hover:shadow-md">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text-accent)] uppercase">Fiche Acteur <span className="font-mono text-[var(--green-600)]">#{user?._id?.slice(-5).toUpperCase()}</span></h2>
              <span className={`px-5 py-2 ${user?.isActive !== false ? 'bg-[var(--green-600)]/10 text-[var(--green-600)]' : 'bg-red-500/10 text-red-500'} rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-current/10 flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full ${user?.isActive !== false ? 'bg-[var(--green-600)] animate-pulse' : 'bg-red-500'}`}></span>
                {user?.isActive !== false ? 'OPÉRATIONNEL' : 'SUSPENDU'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {isEditing ? (
            <>
              <button 
                onClick={handleEditSave}
                disabled={saving}
                className="flex-1 md:flex-none px-7 py-4 bg-[var(--green-600)] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[var(--green-700)] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 md:flex-none px-7 py-4 bg-white border border-[var(--border-light)] rounded-2xl text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition-all"
              >
                Annuler
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex-1 md:flex-none px-7 py-4 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl text-xs font-black uppercase tracking-widest text-[var(--text-accent)] hover:bg-[var(--bg-muted)] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Edit3 size={18} /> Rectifier
            </button>
          )}
          <button 
            onClick={handleToggleStatus}
            className={`flex-1 md:flex-none px-7 py-4 ${user?.isActive !== false ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white' : 'bg-[var(--green-600)]/10 text-[var(--green-600)] border-[var(--green-600)]/20 hover:bg-[var(--green-600)] hover:text-white'} rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-current/5 flex items-center justify-center gap-2`}
          >
            {user?.isActive !== false ? <Ban size={18} /> : <CheckCircle2 size={18} />}
            {user?.isActive !== false ? 'Restreindre' : 'Réactiver'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Profile & Identity */}
        <div className="lg:col-span-4 space-y-8">
          {/* Identity Card */}
          <section className="bg-[var(--bg-surface)] rounded-[2.5rem] p-12 shadow-sm border border-[var(--border-light)] text-center flex flex-col items-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-br from-[var(--green-600)]/5 to-transparent"></div>
            <div className="relative mb-8 pt-4">
               <div className="w-32 h-32 rounded-[3rem] bg-[var(--bg-muted)] text-[var(--text-accent)] flex items-center justify-center text-5xl font-black shadow-2xl ring-8 ring-white group-hover:rotate-3 transition-transform duration-700 border border-[var(--border-light)]">
                {(user?.firstName || user?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 p-3 bg-[var(--green-600)] text-white rounded-2xl shadow-xl ring-4 ring-white">
                <BadgeCheck size={24} fill="currentColor" />
              </div>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="bg-white border border-[var(--border-light)] rounded-xl px-3 py-1 text-sm font-bold w-full"
                />
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="bg-white border border-[var(--border-light)] rounded-xl px-3 py-1 text-sm font-bold w-full"
                />
              </div>
            ) : (
              <h3 className="font-display text-2xl font-bold text-[var(--text-accent)] uppercase tracking-tight">{user?.firstName} {user?.lastName}</h3>
            )}
            {isEditing ? (
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-2 bg-white border border-[var(--border-light)] rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest w-full"
              />
            ) : (
              <p className="text-sm text-[var(--text-muted)] font-black uppercase tracking-widest mb-8 opacity-60">{user?.email}</p>
            )}
            
            <div className="inline-flex items-center px-6 py-2.5 bg-[var(--gray-900)] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg mb-10">
              {getRoleLabel(user?.role || '')}
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-[var(--bg-muted)]/50 p-5 rounded-[2rem] border border-[var(--border-light)] shadow-inner">
                <p className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-[0.2em] mb-1.5 opacity-50">Membre depuis</p>
                <p className="font-mono text-xs font-black text-[var(--text-accent)]">{new Date(user?.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="bg-[var(--bg-muted)]/50 p-5 rounded-[2rem] border border-[var(--border-light)] shadow-inner">
                <p className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-[0.2em] mb-1.5 opacity-50">Localisation</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="bg-white border border-[var(--border-light)] rounded-xl px-2 py-1 text-[10px] font-black w-full"
                  />
                ) : (
                  <p className="font-mono text-xs font-black text-[var(--text-accent)]">{user?.city || user?.address?.city || 'Ouagadougou'}</p>
                )}
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="bg-[var(--bg-surface)] rounded-[2.5rem] p-10 shadow-sm border border-[var(--border-light)]">
            <h4 className="font-display text-lg font-bold text-[var(--text-accent)] mb-8 flex items-center gap-3 uppercase tracking-tight">
               <div className="w-8 h-8 rounded-xl bg-[var(--green-600)]/10 flex items-center justify-center text-[var(--green-600)]">
                  <Phone size={16} />
               </div>
               Canaux de Contact
            </h4>
            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-[var(--bg-muted)] rounded-2xl text-[var(--text-muted)] flex items-center justify-center group-hover:bg-[var(--green-600)] group-hover:text-white transition-all shadow-sm">
                   <Phone size={20} />
                </div>
                <div>
                  <p className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-[0.2em] leading-none mb-1.5 opacity-50">Mobile Principal</p>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white border border-[var(--border-light)] rounded-xl px-3 py-1 text-sm font-mono font-black"
                    />
                  ) : (
                    <p className="font-mono text-sm font-black text-[var(--text-accent)]">{user?.phone || '+226 -- -- -- --'}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-[var(--bg-muted)] rounded-2xl text-[var(--text-muted)] flex items-center justify-center group-hover:bg-[var(--green-600)] group-hover:text-white transition-all shadow-sm">
                   <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-[0.2em] leading-none mb-1.5 opacity-50">Zone de chalandise</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="bg-white border border-[var(--border-light)] rounded-xl px-3 py-1 text-sm font-black w-full"
                    />
                  ) : (
                    <p className="text-sm font-black text-[var(--text-accent)]">{user?.address || user?.address?.full || 'Détails non renseignés'}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Verification Status */}
          <section className="bg-[var(--bg-surface)] rounded-[2.5rem] p-10 shadow-sm border border-[var(--border-light)] relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--green-600)]/5 blur-3xl rounded-full"></div>
            <h4 className="font-display text-lg font-bold text-[var(--text-accent)] mb-8 flex items-center gap-3 uppercase tracking-tight">
               <div className="w-8 h-8 rounded-xl bg-[var(--green-600)]/10 flex items-center justify-center text-[var(--green-600)]">
                  <ShieldCheck size={16} />
               </div>
               Validation KYC / Sécurité
            </h4>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-5 rounded-3xl bg-[var(--bg-muted)]/50 border border-[var(--border-light)] shadow-inner">
                <div className="flex items-center gap-4">
                  <ShieldCheck size={20} className="text-[var(--green-600)]" />
                  <span className="text-xs font-black text-[var(--text-accent)] uppercase tracking-widest">Identité Vérifiée</span>
                </div>
                <span className={`text-[9px] font-black ${user?.isVerified ? 'text-[var(--green-600)]' : 'text-orange-500'} italic uppercase tracking-widest`}>
                  {user?.isVerified ? 'CONFORME' : 'EN ATTENTE'}
                </span>
              </div>
              <div className="flex justify-between items-center p-5 rounded-3xl bg-[var(--bg-muted)]/50 border border-[var(--border-light)] shadow-inner opacity-50">
                <div className="flex items-center gap-4">
                  <BadgeCheck size={20} className="text-[var(--text-muted)]" />
                  <span className="text-xs font-black text-[var(--text-accent)] uppercase tracking-widest">Compte Pro</span>
                </div>
                <span className="text-[9px] font-black text-[var(--text-muted)] italic uppercase tracking-widest text-right">VERSION<br/>STANDARD</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Activity & Analytics */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Metrics Bento */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--bg-surface)] p-9 rounded-[2.5rem] border-l-8 border-[var(--green-600)] shadow-sm border border-[var(--border-light)] group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--green-600)]/5 blur-2xl"></div>
              <p className="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-[0.3em] mb-4 opacity-70">Volume d'affaires</p>
              <h3 className="font-display text-3xl font-bold text-[var(--text-accent)] tracking-tighter">1.2M <span className="text-xs text-[var(--text-muted)] font-black uppercase opacity-60">FCFA</span></h3>
              <div className="mt-4 flex items-center gap-2 text-[var(--green-600)] bg-[var(--green-600)]/10 px-3 py-1.5 rounded-full w-fit">
                 <Activity size={14} /> 
                 <span className="text-[10px] font-black uppercase tracking-widest">+24% Flux</span>
              </div>
            </div>
            <div className="bg-[var(--bg-surface)] p-9 rounded-[2.5rem] border-l-8 border-[var(--gray-900)] shadow-sm border border-[var(--border-light)] group hover:-translate-y-2 transition-all duration-500">
               <p className="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-[0.3em] mb-4 opacity-70">Opérations Totales</p>
              <h3 className="font-display text-4xl font-bold text-[var(--text-accent)] tracking-tighter">124</h3>
              <div className="mt-4 flex items-center gap-2 text-[var(--text-accent)] bg-[var(--bg-muted)] px-3 py-1.5 rounded-full w-fit">
                 <ShoppingBag size={14} /> 
                 <span className="text-[10px] font-black uppercase tracking-widest">98% Succès</span>
              </div>
            </div>
            <div className="bg-[var(--bg-surface)] p-9 rounded-[2.5rem] border-l-8 border-red-500 shadow-sm border border-[var(--border-light)] group hover:-translate-y-2 transition-all duration-500">
              <p className="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-[0.3em] mb-4 opacity-70">Litiges Actifs</p>
              <div className="flex items-end justify-between">
                <h3 className="font-display text-4xl font-bold text-red-600 tracking-tighter">1</h3>
                <span className="px-4 py-1.5 bg-red-500 text-white text-[9px] font-black rounded-xl mb-1 border border-red-600/10 uppercase tracking-widest shadow-md shadow-red-500/10">OUVERT</span>
              </div>
              <button className="text-[10px] text-red-600 font-black uppercase tracking-widest mt-6 italic hover:underline flex items-center gap-1">
                Visualiser l'incident #LTG-882 <ChevronRight size={12} />
              </button>
            </div>
          </section>

          {/* Recent Orders Table (Simplified) */}
          <section className="bg-[var(--bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--border-light)] overflow-hidden">
            <div className="p-10 border-b border-[var(--border-light)] flex justify-between items-center bg-[var(--bg-muted)]/10">
              <div>
                <h3 className="font-display text-2xl font-bold text-[var(--text-accent)] uppercase tracking-tight">Journal Transactionnel</h3>
                <p className="text-xs text-[var(--text-muted)] font-black uppercase tracking-widest opacity-50">Flux récent de l'acteur</p>
              </div>
              <Link to="/admin/orders" className="px-6 py-3 bg-white border border-[var(--border-light)] rounded-2xl text-[var(--green-600)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--green-600)] hover:text-white transition-all shadow-sm active:scale-95">
                Extraire tout le flux
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[var(--bg-muted)]/30 text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-black border-b border-[var(--border-light)]">
                    <th className="px-10 py-5">Référence</th>
                    <th className="px-10 py-5">Horizon temporel</th>
                    <th className="px-10 py-5">État de l'ordre</th>
                    <th className="px-10 py-5 text-right">Valeur brute</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)]">
                  {[
                    { ref: 'CMD-2035', date: "Aujourd'hui, 10:23", status: 'EN ATTENTE', color: 'var(--text-muted)', amount: 125000 },
                    { ref: 'CMD-045', date: 'Hier, 15:40', status: 'EN TRANSIT', color: 'var(--gray-400)', amount: 85000 },
                    { ref: 'CMD-2033', date: '12 Oct 2023', status: 'LIVRÉE', color: 'var(--green-600)', amount: 45500 },
                  ].map((order, i) => (
                    <tr key={order.ref} className="hover:bg-[var(--bg-muted)]/30 transition-all group">
                      <td className="px-10 py-6">
                        <span className="font-mono font-black text-[var(--green-600)] text-sm group-hover:underline">#{order.ref}</span>
                      </td>
                      <td className="px-10 py-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-80">{order.date}</td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: order.color }}></div>
                           <span className="text-[10px] font-black text-[var(--text-accent)] uppercase tracking-widest">
                             {order.status}
                           </span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <p className="font-display text-xl text-[var(--text-accent)] tracking-tighter">{formatFCFA(order.amount)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Activity Timeline (M3 Style) */}
          <section className="bg-[var(--bg-surface)] rounded-[2.5rem] p-12 shadow-sm border border-[var(--border-light)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--green-600)]/5 blur-[100px] rounded-full"></div>
            <h3 className="font-display text-xl font-bold text-[var(--text-accent)] mb-12 flex items-center gap-4 uppercase tracking-tight relative z-10">
               <div className="w-10 h-10 rounded-2xl bg-[var(--green-600)]/10 flex items-center justify-center text-[var(--green-600)]">
                  <Activity size={24} />
               </div>
               Piste d'Audit du Compte
            </h3>
            <div className="relative space-y-12 before:absolute before:inset-y-0 before:left-[19px] before:w-[3px] before:bg-[var(--bg-muted)] before:rounded-full relative z-10">
              {[
                { title: 'Connexion Autorisée', detail: 'IP: 197.231.xx.xx (Ouagadougou Central)', time: '10:45 AM', icon: ShieldCheck, color: 'var(--green-600)' },
                { title: 'Émission de Commande #CMD-2035', detail: 'Valeur: 125 000 FCFA - Oignon Galiat', time: '10:23 AM', icon: ShoppingBag, color: 'var(--gray-900)' },
                { title: 'Révision des Paramètres de Livraison', detail: 'Actualisation coordonnées GPS (Ouaga 2000)', time: 'Hier, 18:30', icon: Edit3, color: 'var(--text-muted)' },
                { title: 'Signalement de Litige #LTG-882', detail: 'Motif: Dépréciation qualité transport', time: 'Hier, 14:15', icon: AlertTriangle, color: 'red' }
              ].map((log, i) => (
                <div key={i} className="relative pl-14 group">
                  <div className={`absolute left-0 w-10 h-10 rounded-2xl bg-white shadow-xl border border-[var(--border-light)] flex items-center justify-center z-10 group-hover:scale-125 group-hover:bg-[var(--gray-900)] group-hover:text-white transition-all duration-700`} style={{ color: log.color }}>
                    <log.icon size={18} />
                  </div>
                  <div className="flex justify-between items-start animate-in slide-in-from-left duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                    <div>
                      <p className="text-sm font-black text-[var(--text-accent)] uppercase tracking-tight group-hover:text-[var(--green-600)] transition-colors">{log.title}</p>
                      <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1 opacity-60">{log.detail}</p>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] bg-[var(--bg-muted)] px-3 py-1 rounded-lg shadow-inner">{log.time}</span>
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
