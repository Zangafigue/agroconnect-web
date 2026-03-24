import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  BadgeCheck, 
  Camera, 
  ShieldAlert, 
  Lock, 
  Bell, 
  ChevronRight,
  Database,
  CheckCircle2,
  Calendar,
  Activity,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminProfilePage: React.FC = () => {
  const { user, logout, updateProfile, uploadPicture } = useAuthStore() as any;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    city: user?.city || '',
    address: user?.address || ''
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profil mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      await uploadPicture(file);
      toast.success('Photo mise à jour');
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
    } finally {
      setLoading(false);
    }
  };

  // Simulation de données admin avancées (à brancher sur le backend plus tard si nécessaire)
  const adminAccess = [
    { label: 'Accès Système', value: 'Racine (Root)', status: 'Sécurisé', color: 'text-[var(--green-600)]' },
    { label: 'Niveau d\'Audit', value: 'Complet', status: 'Actif', color: 'text-blue-500' },
    { label: 'Dernière Connexion', value: new Date().toLocaleDateString('fr-FR'), status: 'Récent', color: 'text-[var(--text-muted)]' },
  ];

  return (
    <div className="pb-20 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-body">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight leading-none mb-3">
            Profil Administrateur
          </h2>
          <p className="text-[var(--text-muted)] font-medium italic text-sm max-w-xl">
            Gestion du compte souverain, paramètres de sécurité et audit des accès plateforme.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-4 bg-[var(--green-600)] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--green-700)] transition-all shadow-lg flex items-center gap-2"
            >
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-8 py-4 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-accent)] hover:bg-[var(--bg-muted)] transition-all shadow-sm"
            >
              Éditer le Profil
            </button>
          )}
          {isEditing && (
            <button 
              onClick={() => setIsEditing(false)}
              className="px-6 py-4 bg-white border border-[var(--border-light)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--bg-muted)]"
            >
              Annuler
            </button>
          )}
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-500/5 group"
          >
            <LogOut size={22} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Identity & Access */}
        <div className="lg:col-span-4 space-y-10">
          {/* Identity Card */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-12 shadow-sm border border-[var(--border-light)] relative overflow-hidden group text-center flex flex-col items-center">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[var(--text-accent)]/5 to-transparent"></div>
            
            <div className="relative mb-8 pt-6">
              <div className="w-36 h-36 rounded-[3.5rem] bg-[var(--bg-muted)] text-[var(--text-accent)] flex items-center justify-center text-6xl font-black shadow-2xl ring-8 ring-white group-hover:rotate-6 transition-all duration-700 border border-[var(--border-light)] overflow-hidden">
                {user?.profilePicture ? (
                  <img src={`${import.meta.env.VITE_API_URL}${user.profilePicture}`} className="w-full h-full object-cover" alt="Portrait" />
                ) : (
                  (user?.firstName || 'A').charAt(0).toUpperCase()
                )}
              </div>
              <label 
                className={`absolute bottom-0 right-0 p-4 bg-[var(--text-accent)] text-white rounded-2xl shadow-xl ring-4 ring-white hover:scale-110 transition-transform active:scale-95 cursor-pointer ${loading ? 'animate-spin opacity-50' : ''}`}
                htmlFor="avatar-upload"
              >
                <Camera size={20} />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </label>
            </div>

            <h3 className="font-display text-2xl font-bold text-[var(--text-accent)] uppercase tracking-tight mb-2">
              {user?.firstName} {user?.lastName || 'Admin'}
            </h3>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[var(--gray-900)] text-white rounded-full text-[9px] font-black uppercase tracking-widest mb-10 shadow-lg">
              <ShieldCheck size={14} className="text-[var(--green-600)]" /> Privilèges ROOT
            </div>

            <div className="w-full space-y-4">
               {adminAccess.map((access, i) => (
                 <div key={i} className="flex justify-between items-center p-5 rounded-3xl bg-[var(--bg-muted)]/30 border border-[var(--border-light)] shadow-inner">
                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">{access.label}</span>
                    <span className={`text-[11px] font-bold ${access.color}`}>{access.value}</span>
                 </div>
               ))}
            </div>
          </section>

          {/* Quick Security Sync */}
          <section className="bg-[var(--text-accent)] rounded-[3rem] p-10 shadow-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
            <h4 className="font-display text-lg font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
               <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Lock size={16} />
               </div>
               Sécurité & 2FA
            </h4>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/60 font-medium uppercase tracking-widest">Double Authentification</span>
                <span className="text-[10px] font-black text-[var(--green-600)] bg-[var(--green-600)]/10 px-3 py-1 rounded-full uppercase tracking-widest">Activé</span>
              </div>
              <button className="w-full py-4 bg-white text-[var(--text-accent)] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg active:scale-95">
                Changer le Mot de Passe
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Details & Audit */}
        <div className="lg:col-span-8 space-y-10">
          {/* User Information */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-12 shadow-sm border border-[var(--border-light)]">
             <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-[var(--green-600)]/10 text-[var(--green-600)] flex items-center justify-center shadow-inner">
                   <User size={24} />
                </div>
                <h3 className="font-display text-3xl text-[var(--text-accent)] tracking-tight uppercase italic leading-none">Informations de Base</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 opacity-50">Prénom</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-6 bg-white border border-[var(--border-light)] rounded-[2rem] shadow-inner font-bold text-sm outline-none focus:border-[var(--green-600)]"
                    />
                  ) : (
                    <div className="flex items-center gap-4 p-6 bg-[var(--bg-muted)]/30 border border-[var(--border-light)] rounded-[2rem] shadow-inner font-mono text-[var(--text-accent)] font-bold">
                      {user?.firstName || '---'}
                    </div>
                  )}
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 opacity-50">Nom</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-6 bg-white border border-[var(--border-light)] rounded-[2rem] shadow-inner font-bold text-sm outline-none focus:border-[var(--green-600)]"
                    />
                  ) : (
                    <div className="flex items-center gap-4 p-6 bg-[var(--bg-muted)]/30 border border-[var(--border-light)] rounded-[2rem] shadow-inner font-mono text-[var(--text-accent)] font-bold">
                      {user?.lastName || '---'}
                    </div>
                  )}
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 opacity-50">Adresse E-mail Officielle</label>
                  <div className="flex items-center gap-4 p-6 bg-[var(--bg-muted)]/30 border border-[var(--border-light)] rounded-[2rem] shadow-inner font-mono text-[var(--text-accent)] font-bold opacity-60">
                    <Mail size={18} className="text-[var(--text-muted)]" />
                    {user?.email || 'admin@agroconnect.bf'}
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 opacity-50">Liaison Téléphonique</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-6 bg-white border border-[var(--border-light)] rounded-[2rem] shadow-inner font-bold text-sm outline-none focus:border-[var(--green-600)]"
                    />
                  ) : (
                    <div className="flex items-center gap-4 p-6 bg-[var(--bg-muted)]/30 border border-[var(--border-light)] rounded-[2rem] shadow-inner font-mono text-[var(--text-accent)] font-bold">
                      <Phone size={18} className="text-[var(--text-muted)]" />
                      {user?.phone || '+226 -- -- -- --'}
                    </div>
                  )}
               </div>
             </div>

             <div className="mt-12 p-8 bg-amber-500/[0.03] rounded-[2.5rem] border border-amber-500/10 flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                   <ShieldAlert size={24} />
                </div>
                <div>
                   <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] mb-2 leading-none">Note de Sécurité</h5>
                   <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed italic opacity-80 pt-1 border-t border-amber-500/10 mt-3 uppercase tracking-tighter">
                     Votre compte dispose de privilèges élevés. Toute action sur la base de données de production est enregistrée dans le journal d'audit centralisé immuable. <strong>Utilisez ces accès avec discernement.</strong>
                   </p>
                </div>
             </div>
          </section>

          {/* Account Integrity Timeline */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-12 shadow-sm border border-[var(--border-light)] relative overflow-hidden flex flex-col min-h-[400px]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--green-600)]/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
             
             <div className="flex items-center justify-between mb-16 relative z-10">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center shadow-inner">
                      <Activity size={24} />
                   </div>
                   <h3 className="font-display text-3xl text-[var(--text-accent)] tracking-tight uppercase italic leading-none">Audit Track</h3>
                </div>
                <button className="px-6 py-3 bg-[var(--bg-muted)] text-[var(--text-muted)] text-[9px] font-black rounded-2xl uppercase tracking-widest hover:bg-[var(--text-accent)] hover:text-white transition-all shadow-sm">
                   Exporter le Log
                </button>
             </div>

             <div className="relative space-y-12 before:absolute before:inset-y-0 before:left-[19px] before:w-[3px] before:bg-[var(--bg-muted)] before:rounded-full relative z-10 font-body">
                {[
                  { title: 'Connexion Admin Autorisée', detail: 'Localisation: Ouagadougou, BF (Session Active)', time: 'À l\'instant', icon: ShieldCheck, color: 'var(--green-600)' },
                  { title: 'Arbitrage Litige #LTG-882', detail: 'Décision: Remboursement total validé', time: 'Hier, 14:15', icon: CheckCircle2, color: 'var(--text-accent)' },
                  { title: 'Update Système Core', detail: 'Migration schéma database (Production)', time: '12 Oct 2023', icon: Database, color: 'var(--text-muted)' },
                  { title: 'Création de Compte Admin Secours', detail: 'UID: #ADMIN-002 (Accès restreint)', time: '05 Oct 2023', icon: BadgeCheck, color: 'var(--text-accent)' }
                ].map((log, i) => (
                  <div key={i} className="relative pl-14 group">
                    <div className={`absolute left-0 w-10 h-10 rounded-2xl bg-white shadow-xl border border-[var(--border-light)] flex items-center justify-center z-10 group-hover:scale-125 group-hover:bg-[var(--gray-900)] group-hover:text-white transition-all duration-700`} style={{ color: log.color }}>
                      <log.icon size={18} />
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-[var(--text-accent)] uppercase tracking-tight group-hover:text-[var(--green-600)] transition-colors">{log.title}</p>
                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest opacity-60 font-body">{log.detail}</p>
                      </div>
                      <span className="font-mono text-[9px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] bg-[var(--bg-muted)]/50 px-3 py-1.5 rounded-xl shadow-inner border border-[var(--border-light)]">{log.time}</span>
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

export default AdminProfilePage;
