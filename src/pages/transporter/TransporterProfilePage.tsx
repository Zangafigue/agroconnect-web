import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { 
  User, 
  Truck, 
  Star, 
  Wallet, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Navigation, 
  ChevronRight, 
  Camera, 
  Award,
  Settings2,
  Bell,
  ShoppingCart,
  Save,
  LogOut
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const TransporterProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [canBuy, setCanBuy] = useState(false);

  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
        {/* LEFT COLUMN (Profile Card) */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm flex flex-col items-center text-center border border-outline-variant/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
            
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-[2.5rem] bg-tertiary/10 text-tertiary flex items-center justify-center text-4xl font-serif-display shadow-inner border-4 border-white ring-4 ring-primary/5 group-hover:scale-105 transition-transform duration-500">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'KD'}
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
                 <Camera size={18} />
              </button>
            </div>

            <h2 className="text-3xl font-serif-display text-on-surface mb-2">
              {user?.name || 'Koné Dramane'}
            </h2>
            
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest border border-primary/20 mb-10">
              <Truck size={14} />
              Transporteur Partenaire
            </div>
            
            <div className="w-full pt-8 border-t border-outline-variant/10">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 bg-tertiary/5 px-4 py-1.5 rounded-2xl border border-tertiary/10 shadow-sm">
                  <Star size={18} className="text-tertiary fill-current" />
                  <span className="text-2xl font-black text-on-surface">4.2</span>
                  <span className="text-outline text-sm font-bold">/ 5</span>
                </div>
                <p className="text-[10px] text-outline font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                   <Award size={12} className="text-tertiary" /> 12 avis vérifiés
                </p>
              </div>
            </div>
            
            <div className="w-full mt-12 space-y-4">
              <button className="w-full py-5 bg-surface-container-low text-on-surface rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-surface-container-high active:scale-95 transition-all border border-outline-variant/5">
                Gérer mes badges
              </button>
              <button className="w-full py-5 bg-error/5 text-error rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-error/10 active:scale-95 transition-all flex items-center justify-center gap-3">
                 <LogOut size={16} /> Déconnexion
              </button>
            </div>
          </section>

          {/* Portefeuille Résumé M3 */}
          <section className="bg-primary/5 rounded-[3rem] p-10 border border-primary/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="font-serif-display text-xl text-on-surface">Portefeuille</h3>
              <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                 <Wallet size={20} />
              </div>
            </div>
            <div className="space-y-8 relative z-10">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Fonds disponibles</p>
                <p className="text-4xl font-mono font-black text-primary">{formatFCFA(145000)}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-primary/10 shadow-inner group-hover:bg-white transition-colors">
                <p className="text-[9px] font-black text-outline uppercase tracking-widest mb-1">En attente de libération</p>
                <p className="text-xl font-mono font-black text-tertiary">{formatFCFA(28500)}</p>
              </div>
              <button onClick={() => window.location.href='/transporter/wallet'} className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
                Détails financiers <ChevronRight size={14} />
              </button>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 space-y-10">
          {/* Identité */}
          <div className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                <User size={24} />
              </div>
              <h3 className="text-3xl font-serif-display text-on-surface">Identité & Coordonnées</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Prénom et Nom</label>
                <div className="px-6 py-4 bg-surface-container-low rounded-2xl text-on-surface font-black text-lg border border-transparent focus-within:border-primary/20 transition-all shadow-inner">
                  {user?.name || 'Koné Dramane'}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Adresse Email</label>
                <div className="px-6 py-4 bg-surface-container-low rounded-2xl text-on-surface font-black text-lg flex items-center justify-between border border-transparent shadow-inner">
                  <span>{user?.email || 'd.kone@email.bf'}</span>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tight">
                     <ShieldCheck size={10} /> Vérifié
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Mobile</label>
                <div className="px-6 py-4 bg-surface-container-low rounded-2xl text-on-surface font-black text-lg border border-transparent shadow-inner flex items-center gap-3">
                   <Phone size={18} className="text-outline" /> +226 70 00 00 00
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Véhicule Principal</label>
                <div className="px-6 py-4 bg-surface-container-low rounded-2xl text-on-surface font-black text-lg flex items-center gap-3 border border-transparent shadow-inner">
                   <Truck size={18} className="text-outline" /> Camionnette 2T
                </div>
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Zone d'intervention habituelle</label>
                <div className="px-6 py-4 bg-surface-container-low rounded-2xl text-on-surface font-black text-lg flex items-center gap-3 border border-transparent shadow-inner">
                   <Navigation size={18} className="text-outline" /> Rayon de 200km autour de Ouagadougou
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Rôles */}
          <div className="bg-surface-container-lowest rounded-[3rem] p-10 shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <ShoppingCart size={120} className="text-primary" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/10">
                <Settings2 size={24} />
              </div>
              <h3 className="text-3xl font-serif-display text-on-surface">Configuration</h3>
            </div>
            
            <div className="bg-surface-container-low/50 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-outline-variant/5 shadow-inner hover:bg-surface-container-low transition-colors duration-500 group" onClick={() => setCanBuy(!canBuy)}>
              <div className="space-y-3 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-xl text-primary group-hover:scale-110 transition-transform">
                     <ShoppingCart size={24} />
                  </div>
                  <h4 className="text-xl font-black text-on-surface font-serif-display tracking-tight">Activer le profil Acheteur</h4>
                </div>
                <p className="text-sm font-medium text-on-surface-variant max-w-sm">Activez cette option pour accéder au catalogue et passer des commandes directement sur la plateforme.</p>
              </div>
              
              {/* Toggle Custom M3 */}
              <button 
                className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-500 shadow-inner group-hover:ring-8 ring-primary/5 ${canBuy ? 'bg-primary' : 'bg-outline-variant/30'}`}
                onClick={(e) => { e.stopPropagation(); setCanBuy(!canBuy); }}
              >
                <div className={`h-8 w-8 rounded-full bg-white shadow-2xl transition-all duration-500 flex items-center justify-center ${canBuy ? 'translate-x-11 scale-110' : 'translate-x-1 scale-90'}`}>
                   {canBuy && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
                </div>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row justify-end gap-6 pt-10">
            <button className="px-10 py-5 text-outline font-black text-[10px] uppercase tracking-widest hover:text-error transition-all active:scale-95">
              Ignorer les changements
            </button>
            <button className="px-16 py-5 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 group">
              <Save size={18} className="group-hover:rotate-12 transition-transform" /> Mettre à jour mon profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterProfilePage;
