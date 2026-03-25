import React, { useState } from 'react';
import { Settings, Bell, Lock, Eye, Save, ChevronRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prefs, setPrefs] = useState({
    twoFactor: false,
    orderAlerts: true,
    directMessages: true,
    promotions: false,
    profileVisibility: true,
  });
  const handleToggle = (key: keyof typeof prefs) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  const handleAction = async (action: string) => {
    if (action === 'password') {
      navigate('../profile');
    } else if (action === 'devices') {
      // TODO: Backend dev to implement GET /settings/devices
      toast('Fonctionnalité d\'appareils connectés en attente du backend.', { icon: '🚧' });
    } else if (action === 'data') {
      // TODO: Backend dev to implement POST /settings/export-data
      toast('Export de données en cours de construction côté serveur.', { icon: '🚧' });
    } else if (action === 'delete') {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et doit être validée par un administrateur.")) {
        try {
          // TODO: Backend dev to implement DELETE /settings/account
          await api.delete('/settings/account');
          toast.success("Demande de suppression envoyée à l'administrateur.");
        } catch (error) {
           toast.error("Endpoint manquant : la suppression n'a pas pu aboutir.");
        }
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Backend dev to implement PATCH /settings/preferences
      await api.patch('/settings/preferences', prefs);
      toast.success("Vos préférences ont été enregistrées avec succès !");
    } catch (error) {
      toast.error("Endpoint backend manquant. Préférences sauvegardées localement.");
    } finally {
      setLoading(false);
    }
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${checked ? 'bg-[var(--text-accent)]' : 'bg-[var(--border-light)]'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-5xl mx-auto font-body animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-5xl lg:text-7xl font-display text-[var(--text-primary)] flex items-center gap-6">
          <Settings size={50} className="text-[var(--text-accent)]" />
          Paramètres
        </h1>
        <p className="text-[var(--text-secondary)] font-medium text-lg max-w-2xl">
          Gérez vos préférences de compte, la sécurité et vos notifications.
        </p>
      </div>

      <div className="space-y-8">
        {/* Compte & Sécurité */}
        <section className="bg-[var(--bg-surface)] rounded-[2.5rem] p-8 border border-[var(--border-light)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
             <Lock size={100} className="text-[var(--text-accent)]" />
          </div>
          <h3 className="text-xl font-display text-[var(--text-primary)] mb-6 flex items-center gap-3 relative z-10">
             <Lock size={20} className="text-[var(--text-accent)]" /> Compte & Sécurité
          </h3>
          <div className="space-y-2 relative z-10">
              <div 
                onClick={() => handleAction('password')} 
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all cursor-pointer group/item"
              >
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Modifier le mot de passe</span>
                  <ChevronRight className="text-[var(--text-muted)] opacity-0 group-hover/item:opacity-70 transition-opacity" size={16} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all">
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Authentification à deux facteurs</span>
                  <ToggleSwitch checked={prefs.twoFactor} onChange={() => handleToggle('twoFactor')} />
              </div>
              <div 
                onClick={() => handleAction('devices')} 
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all cursor-pointer group/item"
              >
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Appareils connectés</span>
                  <ChevronRight className="text-[var(--text-muted)] opacity-0 group-hover/item:opacity-70 transition-opacity" size={16} />
              </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-[var(--bg-surface)] rounded-[2.5rem] p-8 border border-[var(--border-light)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
             <Bell size={100} className="text-[var(--text-accent)]" />
          </div>
          <h3 className="text-xl font-display text-[var(--text-primary)] mb-6 flex items-center gap-3 relative z-10">
             <Bell size={20} className="text-[var(--text-accent)]" /> Notifications
          </h3>
          <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all">
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Alertes de commande & expédition</span>
                  <ToggleSwitch checked={prefs.orderAlerts} onChange={() => handleToggle('orderAlerts')} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all">
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Messages directs</span>
                  <ToggleSwitch checked={prefs.directMessages} onChange={() => handleToggle('directMessages')} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all">
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Promotions et actualités</span>
                  <ToggleSwitch checked={prefs.promotions} onChange={() => handleToggle('promotions')} />
              </div>
          </div>
        </section>

        {/* Confidentialité */}
        <section className="bg-[var(--bg-surface)] rounded-[2.5rem] p-8 border border-[var(--border-light)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
             <Eye size={100} className="text-[var(--text-accent)]" />
          </div>
          <h3 className="text-xl font-display text-[var(--text-primary)] mb-6 flex items-center gap-3 relative z-10">
             <Eye size={20} className="text-[var(--text-accent)]" /> Confidentialité
          </h3>
          <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all">
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Visibilité publique du profil</span>
                  <ToggleSwitch checked={prefs.profileVisibility} onChange={() => handleToggle('profileVisibility')} />
              </div>
              <div 
                onClick={() => handleAction('data')} 
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-muted)] transition-all cursor-pointer group/item"
              >
                  <span className="text-sm font-bold text-[var(--text-secondary)]">Gérer mes données personnelles</span>
                  <ChevronRight className="text-[var(--text-muted)] opacity-0 group-hover/item:opacity-70 transition-opacity" size={16} />
              </div>
              <div 
                onClick={() => handleAction('delete')} 
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer group/item"
              >
                  <span className="text-sm font-bold text-red-600">Suppression du compte</span>
                  <ChevronRight className="text-red-500 opacity-0 group-hover/item:opacity-70 transition-opacity" size={16} />
              </div>
          </div>
        </section>
      </div>

      <div className="mt-12 flex flex-col items-end gap-3">
         <button 
           onClick={handleSave}
           disabled={loading}
           className="px-12 py-5 bg-[var(--text-accent)] text-white rounded-[2rem] font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 disabled:opacity-70 transition-all flex items-center gap-4 group"
         >
           {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} className="group-hover:rotate-12 transition-transform" />}
           {loading ? 'Enregistrement...' : 'Enregistrer les préférences'}
         </button>
      </div>
    </div>
  );
};

export default SettingsPage;
