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
  Cpu,
  Server,
  Cloud
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    commission: '3.00',
    minWithdrawal: '5000',
    twoFA: true,
    kycAuto: false,
    maintenance: false
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulation d'API
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    toast.success('Protocoles mis à jour avec succès.', {
      style: {
        borderRadius: '1.5rem',
        background: 'var(--gray-900)',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    });
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-body">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight leading-none mb-3">
            Configuration Système
          </h2>
          <p className="text-[var(--text-muted)] font-medium italic text-sm max-w-xl">
            Gouvernance souveraine des protocoles, des commissions et des infrastructures critiques de la plateforme.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-6 py-3 bg-[var(--green-600)]/10 text-[var(--green-600)] rounded-full text-[9px] font-black uppercase tracking-widest border border-[var(--green-600)]/20 animate-pulse">
              <Server size={14} /> Cluster Ouagadougou-01 : OK
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Commercial protocol */}
          <section className="bg-[var(--bg-surface)] rounded-[3.5rem] p-12 shadow-sm border border-[var(--border-light)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--green-600)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="font-display text-2xl font-black mb-10 text-[var(--text-accent)] flex items-center gap-4 uppercase italic">
              <Sliders size={24} className="text-[var(--green-600)]" /> Protocoles Commerciaux
            </h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-8 rounded-[2rem] bg-[var(--bg-muted)]/30 border border-transparent hover:border-[var(--green-600)]/20 transition-all group shadow-inner">
                  <div>
                    <h4 className="font-display font-bold text-[var(--text-accent)] text-lg uppercase tracking-tight">Commission Plateforme</h4>
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest opacity-40 italic">Prélèvement sur chaque vente finalisée</p>
                  </div>
                  <div className="flex items-center gap-4 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-light)] shadow-sm">
                     <input
                      type="text"
                      value={settings.commission}
                      onChange={(e) => setSettings({...settings, commission: e.target.value})}
                      className="w-20 p-3 bg-transparent text-center font-mono font-black text-[var(--text-accent)] text-lg outline-none"
                     />
                     <span className="font-black text-[var(--text-muted)] opacity-30 text-xs pr-4">%</span>
                  </div>
               </div>
               <div className="flex items-center justify-between p-8 rounded-[2rem] bg-[var(--bg-muted)]/30 border border-transparent hover:border-[var(--green-600)]/20 transition-all group shadow-inner">
                  <div>
                    <h4 className="font-display font-bold text-[var(--text-accent)] text-lg uppercase tracking-tight">Seuil de retrait minimum</h4>
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest opacity-40 italic">Montant minimal pour un décaissement</p>
                  </div>
                  <div className="flex items-center gap-4 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-light)] shadow-sm">
                     <input
                      type="text"
                      value={settings.minWithdrawal}
                      onChange={(e) => setSettings({...settings, minWithdrawal: e.target.value})}
                      className="w-32 p-3 bg-transparent text-center font-mono font-black text-[var(--text-accent)] text-lg outline-none"
                     />
                     <span className="font-black text-[var(--text-muted)] opacity-30 text-xs pr-4">FCFA</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Security constraints */}
          <section className="bg-[var(--bg-surface)] rounded-[3.5rem] p-12 shadow-sm border border-[var(--border-light)] relative overflow-hidden group">
             <h3 className="font-display text-2xl font-black mb-10 text-[var(--text-accent)] flex items-center gap-4 uppercase italic">
               <Lock size={24} className="text-[var(--green-600)]" /> Sécurité & Conformité
             </h3>
             <div className="space-y-4 font-body">
                {[
                  { id: 'twoFA', label: "Double authentification (2FA) obligatoire admins", desc: "Renforce la sécurité des comptes critiques", enabled: settings.twoFA, icon: Shield },
                  { id: 'kycAuto', label: "Vérification KYC automatique", desc: "Utilise l'IA pour valider les pièces d'identité", enabled: settings.kycAuto, icon: Eye },
                  { id: 'maintenance', label: "Maintenance Mode", desc: "Désactive temporairement le site pour le public", enabled: settings.maintenance, icon: Zap },
                ].map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setSettings({...settings, [s.id as any]: !s.enabled})}
                    className="flex items-center justify-between p-8 rounded-[2rem] hover:bg-[var(--bg-muted)] transition-all border border-transparent hover:border-[var(--border-light)] group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.enabled ? 'bg-[var(--green-600)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
                          <s.icon size={22} />
                       </div>
                       <div>
                          <p className="font-display font-black text-[var(--text-accent)] text-xs uppercase tracking-widest">{s.label}</p>
                          <p className="text-[10px] text-[var(--text-muted)] font-medium italic opacity-60 mt-1">{s.desc}</p>
                       </div>
                    </div>
                    <button className={`w-16 h-9 rounded-full p-1.5 transition-all duration-500 shadow-inner ${s.enabled ? 'bg-[var(--green-600)]' : 'bg-[var(--gray-300)]'}`}>
                      <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform ${s.enabled ? 'translate-x-7' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-10">
           <section className="bg-[var(--gray-900)] rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
              <h3 className="font-display text-xl font-black mb-8 text-white uppercase italic flex items-center gap-3">
                 <Cpu size={20} className="text-[var(--green-600)]" /> Infrastructure
              </h3>
              <div className="space-y-4 relative z-10">
                 <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-white/60 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 hover:text-white transition-all shadow-inner">
                   <RefreshCcw size={16} /> Flush Cache RAM
                 </button>
                 <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-white/60 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 hover:text-white transition-all shadow-inner">
                   <Cloud size={16} /> Sync Backup Cloud
                 </button>
                 <button className="w-full py-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all shadow-lg">
                    Reboot Services
                 </button>
              </div>
           </section>

           <div className="px-4">
              <button 
                onClick={handleSave}
                disabled={loading}
                className="w-full py-6 bg-[var(--green-600)] text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl shadow-[var(--green-600)]/40 hover:scale-[1.02] active:scale-[0.98] transition-all group disabled:opacity-50"
              >
                {loading ? <RefreshCcw size={20} className="animate-spin" /> : <Save size={20} className="group-hover:rotate-12 transition-transform" />} 
                {loading ? 'Traitement...' : 'Sceller la Config'}
              </button>
              <p className="text-center text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-6 opacity-40 italic">Dernière mise à jour par l'Administrateur Racine : 22 Mars 2026</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
