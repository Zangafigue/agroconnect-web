import React from 'react';
import { Settings, Bell, Lock, Shield, Eye, Smartphone, Globe, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-12">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface flex items-center gap-6">
          <Settings size={50} className="text-primary" />
          Paramètres
        </h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Gérez vos préférences de compte, la sécurité et vos notifications.
        </p>
      </div>

      <div className="space-y-8">
        {[
          { title: 'Compte & Sécurité', icon: Lock, items: ['Modifier le mot de passe', 'Authentification à deux facteurs', 'Appareils connectés'] },
          { title: 'Notifications', icon: Bell, items: ['Alertes de commande', 'Messages directs', 'Promotions et actualités'] },
          { title: 'Confidentialité', icon: Eye, items: ['Visibilité du profil', 'Données personnelles', 'Suppression du compte'] }
        ].map((section, idx) => (
          <section key={idx} className="bg-surface-container-lowest rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
               <section.icon size={100} className="text-primary" />
            </div>
            <h3 className="text-xl font-serif-display text-on-surface mb-6 flex items-center gap-3 relative z-10">
               <section.icon size={20} className="text-primary" /> {section.title}
            </h3>
            <div className="space-y-2 relative z-10">
               {section.items.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer group/item">
                    <span className="text-sm font-bold text-on-surface-variant">{item}</span>
                    <Settings className="text-outline opacity-0 group-hover/item:opacity-40 transition-opacity" size={14} />
                 </div>
               ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
         <button className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-4 group">
           <Save size={18} className="group-hover:rotate-12 transition-transform" /> Enregistrer les préférences
         </button>
      </div>
    </div>
  );
};

export default SettingsPage;
