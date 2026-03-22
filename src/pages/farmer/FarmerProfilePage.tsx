import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  ShieldCheck, 
  Award, 
  Sprout, 
  Lock, 
  ShieldAlert, 
  Star, 
  ShoppingBag, 
  TrendingUp,
  Save,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

const FarmerProfilePage: React.FC = () => {
  const [profilePic] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop');

  return (
    <div className="space-y-10 pb-32 animate-in fade-in duration-700">
      <header className="mb-12">
        <h1 className="text-5xl font-serif-display text-primary">Mon Profil</h1>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* IDENTITE & COORDONNEES */}
        <div className="lg:col-span-8 space-y-10">
          
          <div className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm border border-outline-variant/10 flex flex-col md:flex-row gap-10 items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-6 z-10">
              <div className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-primary/20">
                  <img src={profilePic} alt="Photo de profil" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Camera size={40} className="text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-outline-variant/10 hover:scale-110 transition-transform">
                   <Edit3 size={20} className="text-primary" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-serif-display text-on-surface">Kader Traoré</h2>
                <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest mt-3">Agriculteur Certifié</span>
              </div>
            </div>

            {/* Forms Section */}
            <div className="flex-1 space-y-8 w-full z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">Prénom(s)</label>
                  <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 rounded-2xl px-5 py-4 font-bold text-sm transition-all" defaultValue="Kader" type="text" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">Nom</label>
                  <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 rounded-2xl px-5 py-4 font-bold text-sm transition-all" defaultValue="Traoré" type="text" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">Email (Vérifié)</label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 font-bold text-sm text-on-surface-variant/50" defaultValue="kader.t@email.com" disabled type="email" />
                    <Mail size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">Téléphone</label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 rounded-2xl px-5 py-4 font-bold text-sm transition-all" defaultValue="+226 70 12 34 56" type="tel" />
                    <Phone size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-outline" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">À propos (Bio Professionnelle)</label>
                <textarea className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 rounded-[2rem] px-6 py-5 font-medium text-sm transition-all resize-none" defaultValue="Producteur de céréales (Maïs, Sorgho) basé dans les Hauts-Bassins avec plus de 10 ans d'expérience." rows={4}></textarea>
              </div>
              <div className="flex justify-end pt-4">
                <button className="bg-primary text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 hover:-translate-y-1 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                  <Save size={18} /> Mettre à jour mon profil
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm border border-outline-variant/10">
            <h3 className="text-2xl font-serif-display text-on-surface mb-10 flex items-center gap-4">
              <Award size={28} className="text-primary" />
              Capacités & Certifications
            </h3>
            <div className="space-y-10">
              <div>
                <label className="text-[10px] font-black text-outline uppercase tracking-widest block mb-5">Taille de l'exploitation agricole</label>
                <div className="flex flex-wrap gap-4">
                   {['< 1 Ha', '1 - 5 Ha', '5 - 10 Ha', '> 10 Ha'].map((size) => (
                      <button 
                        key={size}
                        className={`px-8 py-3 rounded-2xl border-2 font-bold text-sm transition-all active:scale-95 ${size === '1 - 5 Ha' ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5' : 'border-outline-variant/30 text-outline hover:border-primary hover:text-primary'}`}
                      >
                        {size}
                      </button>
                   ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">Cultures principales (Mots-clés)</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 rounded-2xl px-6 py-4 font-bold text-sm transition-all" defaultValue="Maïs, Sorgho, Mil" placeholder="Séparez par des virgules" type="text" />
                  <Sprout size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR: SECURITE ET STATS */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-primary rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000">
              <ShieldAlert size={120} />
            </div>
            <h3 className="text-2xl font-serif-display mb-10 relative z-10 flex items-center gap-3">
              <Lock size={24} className="text-primary-container" />
              Sécurité
            </h3>
            <div className="space-y-8 relative z-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-container mb-2">Mot de passe</p>
                <p className="text-sm font-medium opacity-90">Dernière modification : <br/> Il y a 3 mois</p>
                <button className="mt-4 text-primary-container text-sm font-black hover:underline underline-offset-4 decoration-2">Modifier</button>
              </div>
              <div className="w-full h-px bg-white/10"></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-container mb-2">Authentification 2FA</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm font-bold opacity-70 italic">Désactivée</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-lg after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm border border-outline-variant/10 border-t-[12px] border-t-tertiary">
            <h3 className="text-[10px] font-black text-outline uppercase tracking-[0.3em] mb-10 text-center">Score de confiance</h3>
            <div className="space-y-6">
              {[
                { label: 'Produits', value: '12', icon: ShoppingBag, color: 'text-primary' },
                { label: 'Ventes', value: '45', icon: TrendingUp, color: 'text-secondary' },
                { label: 'Note', value: '4.8', icon: Star, color: 'text-tertiary', isStar: true },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-5 bg-surface-container-low/30 rounded-2xl hover:bg-surface-container-low transition-all group">
                  <div className="flex items-center gap-4 text-on-surface-variant">
                    <stat.icon className={`${stat.color} group-hover:scale-110 transition-transform`} size={20} />
                    <span className="font-bold text-sm">{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface">
                     <span className="font-mono font-black text-xl">{stat.value}</span>
                     {stat.isStar && <Star size={14} fill="currentColor" className="text-tertiary" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal sub-component for edit icon
const Edit3: React.FC<{ size?: number, className?: string }> = ({ size = 20, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

export default FarmerProfilePage;
