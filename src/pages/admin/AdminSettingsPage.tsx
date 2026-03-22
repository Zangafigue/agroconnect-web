import React from 'react';
import { Settings, Shield, Bell, Database, Globe, Sliders, Save, RefreshCcw } from 'lucide-react';

const AdminSettingsPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-serif-display text-on-surface mb-2">Configuration Système</h2>
          <p className="text-on-surface-variant max-w-lg italic">
            Ajustez les paramètres globaux, les commissions et les niveaux de sécurité de la plateforme.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
            <h3 className="font-serif-display text-2xl font-bold mb-8 text-on-surface flex items-center gap-3">
              <Sliders size={24} className="text-primary" /> Paramètres Commerciaux
            </h3>
            <div className="space-y-8">
               <div className="flex items-center justify-between p-6 rounded-3xl bg-surface-container-low/30 border border-outline-variant/5 group hover:border-primary/20 transition-all">
                  <div>
                    <h4 className="font-bold text-on-surface">Commission Plateforme</h4>
                    <p className="text-xs text-outline italic">Prélèvement sur chaque vente finalisée</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <input type="text" defaultValue="3" className="w-16 p-3 bg-white border border-outline-variant/30 rounded-xl text-center font-mono font-bold text-primary focus:ring-4 focus:ring-primary/10 outline-none" />
                     <span className="font-bold text-outline">%</span>
                  </div>
               </div>
               <div className="flex items-center justify-between p-6 rounded-3xl bg-surface-container-low/30 border border-outline-variant/5 group hover:border-primary/20 transition-all">
                  <div>
                    <h4 className="font-bold text-on-surface">Seuil de retrait minimum</h4>
                    <p className="text-xs text-outline italic">Montant minimal pour un décaissement</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <input type="text" defaultValue="5000" className="w-28 p-3 bg-white border border-outline-variant/30 rounded-xl text-center font-mono font-bold text-primary focus:ring-4 focus:ring-primary/10 outline-none" />
                     <span className="font-bold text-outline">F</span>
                  </div>
               </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
             <h3 className="font-serif-display text-2xl font-bold mb-8 text-on-surface flex items-center gap-3">
               <Shield size={24} className="text-primary" /> Sécurité & Accès
             </h3>
             <div className="space-y-4">
                {[
                  { label: "Double authentification (2FA) obligatoire admins", desc: "Renforce la sécurité des comptes critiques", enabled: true },
                  { label: "Vérification KYC automatique", desc: "Utilise l'IA pour valider les pièces d'identité", enabled: false },
                  { label: "Maintenance Mode", desc: "Désactive temporairement le site pour le public", enabled: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-2xl hover:bg-surface-container-low transition-all">
                    <div className="pr-12">
                      <p className="font-bold text-on-surface text-sm uppercase tracking-tight">{s.label}</p>
                      <p className="text-xs text-outline italic mt-1">{s.desc}</p>
                    </div>
                    <button className={`w-14 h-8 rounded-full p-1 transition-all ${s.enabled ? 'bg-primary justify-end' : 'bg-outline-variant/30 justify-start'} flex items-center`}>
                      <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <div className="space-y-8">
           <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-serif-display text-xl font-bold mb-6 text-on-surface">Actions de maintenance</h3>
              <div className="space-y-3">
                 <button className="w-full py-4 bg-surface-container-high rounded-2xl text-xs font-bold text-on-surface flex items-center justify-center gap-2 hover:bg-white transition-all border border-outline-variant/10">
                   <RefreshCcw size={16} /> Vider le cache Redis
                 </button>
                 <button className="w-full py-4 bg-surface-container-high rounded-2xl text-xs font-bold text-on-surface flex items-center justify-center gap-2 hover:bg-white transition-all border border-outline-variant/10">
                   <Database size={16} /> Sauvegarde BDD
                 </button>
              </div>
           </section>

           <div className="px-8 pb-8 flex flex-col gap-4">
              <button className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <Save size={20} /> Enregistrer
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
