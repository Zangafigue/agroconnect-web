import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Sliders, 
  Save, 
  RefreshCcw,
  Lock,
  Eye,
  Zap,
  Server,
  Cloud,
  Layers,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { useThemeStore } from '../../store/themeStore';
import api from '../../api/axios';

const AdminSettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [infraLoading, setInfraLoading] = useState<string | null>(null);
  const { theme, setTheme } = useThemeStore();
  
  const [settings, setSettings] = useState({
    commission: '3.00',
    minWithdrawal: '5000',
    twoFA: true,
    kycAuto: false,
    maintenance: false,
    notifications: true
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Backend dev to implement PATCH /admin/settings
      await api.patch('/admin/settings', settings);
      toast.success('Paramètres système mis à jour.');
    } catch (error) {
      toast.error('Endpoint backend manquant. Paramètres modifiés localement.');
    } finally {
      setLoading(false);
    }
  };

  const handleInfraAction = async (action: string, label: string) => {
    setInfraLoading(action);
    try {
      // TODO: Backend dev to implement POST /admin/infra/{action}
      await api.post(`/admin/infra/${action}`);
      toast.success(`${label} effectué avec succès.`);
    } catch (error) {
      toast.error(`Le backend ne gère pas encore l'action: ${label}`);
    } finally {
      setInfraLoading(null);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Configuration Système</h1>
          <p className="text-[14px] text-[var(--text-secondary)] max-w-xl">
            Gérez les protocoles commerciaux, la sécurité et l'infrastructure de la plateforme.
          </p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-2 px-4 py-2 bg-[var(--green-600)]/10 text-[var(--green-600)] rounded-xl text-[10px] font-bold uppercase tracking-widest border border-[var(--green-600)]/20">
              <span className="w-2 h-2 rounded-full bg-[var(--green-600)] animate-pulse"></span>
              Cluster Ouagadougou-01 Online
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Appearance Section */}
          <Card className="p-8">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
              <Monitor size={20} className="text-[var(--text-accent)]" />
              Apparence & Interface
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button 
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all text-left ${theme === 'light' ? 'border-[var(--text-accent)] bg-[var(--bg-subtle)]' : 'border-[var(--border-light)] bg-white hover:border-[var(--text-accent)]/30'}`}
               >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'light' ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
                     <Sun size={24} />
                  </div>
                  <div>
                     <p className="font-bold text-[var(--text-primary)]">Mode Clair</p>
                     <p className="text-[11px] text-[var(--text-secondary)]">Interface lumineuse et aérée</p>
                  </div>
               </button>
               <button 
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all text-left ${theme === 'dark' ? 'border-[var(--text-accent)] bg-[#1a1d24]' : 'border-[var(--border-light)] bg-white hover:border-[var(--text-accent)]/30'}`}
               >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
                     <Moon size={24} />
                  </div>
                  <div>
                     <p className="font-bold text-[var(--text-primary)]">Mode Sombre</p>
                     <p className="text-[11px] text-[var(--text-secondary)]">Confort visuel en basse lumière</p>
                  </div>
               </button>
            </div>
          </Card>

          {/* Commercial protocol */}
          <Card className="p-8">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
              <Sliders size={20} className="text-[var(--text-accent)]" />
              Protocoles Commerciaux
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-6 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border-light)] shadow-inner group">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="text-[14px] font-bold text-[var(--text-primary)] mb-1">Commission Plateforme</h4>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed italic">Prélèvement automatique sur chaque transaction finalisée.</p>
                    </div>
                    <div className="relative">
                       <Input 
                          value={settings.commission}
                          onChange={(e) => setSettings({...settings, commission: e.target.value})}
                          className="font-mono font-bold text-lg text-center pr-12"
                       />
                       <span className="absolute right-4 top-[34px] font-bold text-[var(--text-muted)]">%</span>
                    </div>
                  </div>
               </div>
               <div className="p-6 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border-light)] shadow-inner group">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="text-[14px] font-bold text-[var(--text-primary)] mb-1">Seuil de Retrait</h4>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed italic">Montant minimal requis pour une demande de virement.</p>
                    </div>
                    <div className="relative">
                       <Input 
                          value={settings.minWithdrawal}
                          onChange={(e) => setSettings({...settings, minWithdrawal: e.target.value})}
                          className="font-mono font-bold text-lg text-center pr-16"
                       />
                       <span className="absolute right-4 top-[34px] font-bold text-[var(--text-muted)]">FCFA</span>
                    </div>
                  </div>
               </div>
            </div>
          </Card>

          {/* Security & Compliance */}
          <Card className="p-8">
             <h3 className="text-lg font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
               <Lock size={20} className="text-[var(--text-accent)]" />
               Sécurité & Gouvernance
             </h3>
             <div className="divide-y divide-[var(--border-light)] bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border-light)] overflow-hidden">
                {[
                  { id: 'twoFA', label: "Authentification 2FA", desc: "Exiger le 2FA pour tous les accès administrateurs.", enabled: settings.twoFA, icon: Shield },
                  { id: 'kycAuto', label: "Vérification KYC Auto", desc: "Validation automatique des dossiers par intelligence artificielle.", enabled: settings.kycAuto, icon: Eye },
                  { id: 'maintenance', label: "Mode Maintenance", desc: "Suspendre l'accès public pour la maintenance technique.", enabled: settings.maintenance, icon: Zap },
                ].map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setSettings({...settings, [s.id as any]: !s.enabled})}
                    className="flex items-center justify-between p-6 hover:bg-[var(--bg-muted)]/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${s.enabled ? 'bg-[var(--text-accent)] text-white shadow-lg shadow-[var(--text-accent)]/20' : 'bg-white text-[var(--text-muted)] border border-[var(--border-light)]'}`}>
                          <s.icon size={18} />
                       </div>
                       <div>
                          <p className="text-[13px] font-bold text-[var(--text-primary)]">{s.label}</p>
                          <p className="text-[10px] text-[var(--text-muted)] font-medium italic opacity-70 leading-none mt-1">{s.desc}</p>
                       </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${s.enabled ? 'bg-[var(--text-accent)]' : 'bg-[var(--gray-300)]'}`}>
                       <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${s.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-8">
           {/* Infrastructure Card */}
           <Card className={`${theme === 'dark' ? 'bg-[#111827]' : 'bg-[var(--text-accent)]'} p-8 text-white relative overflow-hidden border-none border-0 transition-colors duration-500`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
              <h3 className="text-lg font-bold mb-8 flex items-center gap-3 relative z-10">
                 <Server size={20} className="text-white" />
                 Infrastructure
              </h3>
              <div className="space-y-4 relative z-10">
                 <Button 
                    variant="ghost" 
                    fullWidth 
                    className="bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white justify-between"
                    isLoading={infraLoading === 'cache'}
                    onClick={() => handleInfraAction('cache', 'Vider le cache RAM')}
                 >
                    <div className="flex items-center gap-3">
                       <RefreshCcw size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">Vider le cache RAM</span>
                    </div>
                    <ChevronRight size={14} />
                 </Button>
                 <Button 
                    variant="ghost" 
                    fullWidth 
                    className="bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white justify-between"
                    isLoading={infraLoading === 'backup'}
                    onClick={() => handleInfraAction('backup', 'Sauvegarde Cloud')}
                 >
                    <div className="flex items-center gap-3">
                       <Cloud size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">Sauvegarde Cloud</span>
                    </div>
                    <ChevronRight size={14} />
                 </Button>
                 <Button 
                    variant="danger" 
                    fullWidth 
                    className="bg-red-500/20 border border-red-500/30 text-red-100 hover:bg-red-500 hover:text-white justify-between"
                    isLoading={infraLoading === 'reboot'}
                    onClick={() => handleInfraAction('reboot', 'Redémarrage des services')}
                 >
                    <div className="flex items-center gap-3">
                       <Zap size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">Reboot Services</span>
                    </div>
                    <ChevronRight size={14} />
                 </Button>
              </div>
              
              <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-3 mb-3">
                    <Database size={14} className="text-white/60" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Statut Nœud</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Node-AC-452</span>
                    <span className="text-[10px] font-black text-white uppercase">Sain</span>
                 </div>
              </div>
           </Card>

           {/* Save Action */}
           <div className="space-y-4">
              <Button 
                fullWidth 
                size="lg" 
                className="h-16 text-[12px] font-black uppercase tracking-[0.3em] shadow-xl shadow-[var(--text-accent)]/20"
                isLoading={loading}
                onClick={handleSave}
                icon={<ShieldCheck size={20} />}
              >
                Appliquer les Paramètres
              </Button>
              <p className="text-center text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest opacity-40 italic">
                 Dernière modification : {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
