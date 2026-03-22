import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { 
  User, 
  MapPin, 
  Award, 
  ShoppingBag, 
  Heart, 
  Edit3, 
  Plus, 
  Home, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  Bell,
  Phone,
  Mail,
  Zap
} from 'lucide-react';

const BuyerProfilePage: React.FC = () => {
  const { user } = useAuthStore() as any;
  
  return (
    <div className="max-w-7xl mx-auto p-8 md:p-16 mb-32 space-y-12 animate-in fade-in duration-700">
      {/* Header Profile */}
      <div className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-12 border border-outline-variant/10 hover:shadow-2xl transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
        
        <div className="relative group">
          <div className="w-40 h-40 rounded-[2.5rem] bg-primary/10 text-primary flex items-center justify-center font-black text-6xl shadow-inner border-8 border-white">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'FT'}
          </div>
          <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all ring-4 ring-white">
            <Edit3 size={20} />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 bg-tertiary-fixed/30 text-tertiary px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-2 border border-tertiary/10 shadow-sm">
            <Award size={14} />
            Acheteur Premium
          </div>
          <h1 className="text-5xl font-serif-display text-on-surface leading-tight">{user?.name || 'Fatima Traoré'}</h1>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-4 text-on-surface-variant font-medium">
            <MapPin size={18} className="text-tertiary" />
            <span>Ouagadougou, Secteur 15</span>
          </div>
          <div className="flex gap-6 mt-8 justify-center md:justify-start">
            <div className="bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10 group hover:bg-primary/10 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-black mb-1">Commandes</p>
              <p className="font-mono text-3xl text-primary font-black">24</p>
            </div>
            <div className="bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10 group hover:bg-primary/10 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-black mb-1">Favoris</p>
              <p className="font-mono text-3xl text-primary font-black">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Informations Personnelles */}
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10 space-y-10">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-serif-display text-on-surface flex items-center gap-4">
                <User size={28} className="text-primary" />
                Détails du compte
              </h2>
              <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Modifier</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Nom complet', val: user?.name || 'Fatima Traoré', icon: User },
                { label: 'Email', val: user?.email || 'fatima.t@example.com', icon: Mail },
                { label: 'Téléphone', val: '+226 70 12 34 56', icon: Phone },
                { label: "Type d'acheteur", val: 'Grossiste Certifié', icon: Zap }
              ].map((field) => (
                <div key={field.label} className="space-y-3">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">{field.label}</label>
                  <div className="relative group">
                    <p className="text-on-surface font-bold p-5 bg-surface-container-low/40 rounded-2xl border border-outline-variant/5 shadow-inner group-hover:bg-white transition-all">{field.val}</p>
                    <field.icon size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-outline group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adresses de Livraison */}
          <div className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif-display text-on-surface flex items-center gap-4">
                <Zap size={28} className="text-tertiary" />
                Adresses de Livraison
              </h2>
              <button className="flex items-center gap-2 bg-primary/5 text-primary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg shadow-primary/5">
                <Plus size={16} /> Ajouter
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] border-2 border-primary bg-primary/5 flex justify-between items-center shadow-xl shadow-primary/5 relative group">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform">
                    <Home size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-on-surface text-lg">Dépôt Principal</h3>
                      <span className="bg-primary text-white text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest">Défaut</span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium mt-1">Ouagadougou, Secteur 15</p>
                    <p className="text-outline text-xs mt-1 font-medium">Près du grand marché de Pissy</p>
                  </div>
                </div>
                <button className="p-3 text-outline hover:text-primary rounded-xl transition-all">
                  <Edit3 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR: SECURITE & PREFERENCES */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-error-container/20 rounded-[3rem] p-10 shadow-sm border border-error/10 overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-1000">
                <ShieldCheck size={100} className="text-error" />
             </div>
            <h2 className="text-2xl font-serif-display text-on-surface flex items-center gap-3 mb-10 relative z-10">
              <Lock size={24} className="text-error" />
              Sécurité
            </h2>
            <div className="space-y-8 relative z-10">
              <button className="w-full flex items-center justify-between p-6 rounded-[1.5rem] bg-white hover:shadow-xl border border-error/5 group transition-all active:scale-95">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center">
                    <Lock size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-on-surface text-sm">Mot de passe</p>
                    <p className="text-[10px] text-outline font-medium uppercase tracking-widest mt-1">Modifié il y a 2 mois</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-outline group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-[3rem] p-10 shadow-sm border border-outline-variant/10">
            <h2 className="text-2xl font-serif-display text-on-surface flex items-center gap-3 mb-10">
              <Bell size={24} className="text-primary" />
              Préférences
            </h2>
            <div className="space-y-10">
              {[
                { label: 'Email', sub: 'Reçus de commandes et promos', active: true },
                { label: 'SMS / GSM', sub: 'Alertes livraisons urgentes', active: true },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="font-black text-on-surface text-sm group-hover:text-primary transition-colors">{pref.label}</p>
                    <p className="text-[10px] text-outline font-black uppercase tracking-widest">{pref.sub}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer scale-110">
                    <input type="checkbox" className="sr-only peer" defaultChecked={pref.active} />
                    <div className="w-11 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfilePage;
