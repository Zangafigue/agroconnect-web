import React from 'react';
import { useAuthStore } from '../../store/authStore';

export default function BuyerProfilePage() {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 mb-20 space-y-8">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8 border border-transparent hover:border-[#00873a]/10 transition-colors">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center font-bold text-5xl shadow-inner border-4 border-white">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'FT'}
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#006b2c] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#00873a] transition-all">
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1 bg-[#ffdbca] text-[#984300] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            Acheteur Premium
          </div>
          <h1 className="text-4xl font-['DM_Serif_Display'] text-[#0c200d]">{user?.name || 'Fatima Traoré'}</h1>
          <p className="text-[#3e4a3d] flex items-center justify-center md:justify-start gap-2">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Ouagadougou, Secteur 15
          </p>
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            <div className="bg-[#e1fbdc] px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#2e6a41] font-bold">Commandes</p>
              <p className="font-mono text-xl text-[#006b2c] font-black">24</p>
            </div>
            <div className="bg-[#e1fbdc] px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#2e6a41] font-bold">Favoris</p>
              <p className="font-mono text-xl text-[#006b2c] font-black">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Informations Personnelles */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-['DM_Serif_Display'] text-[#0c200d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b2c]">person</span>
                Informations Personnelles
              </h2>
              <button className="text-[#006b2c] font-medium hover:underline text-sm">Modifier</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs text-[#6e7b6c] uppercase tracking-widest font-bold">Nom complet</label>
                <p className="text-[#0c200d] font-medium p-3 bg-[#f8faf8] rounded-lg border border-[#d0e9cb]/50">{user?.name || 'Fatima Traoré'}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#6e7b6c] uppercase tracking-widest font-bold">Email</label>
                <p className="text-[#0c200d] font-medium p-3 bg-[#f8faf8] rounded-lg border border-[#d0e9cb]/50">{user?.email || 'fatima.t@example.com'}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#6e7b6c] uppercase tracking-widest font-bold">Téléphone</label>
                <p className="text-[#0c200d] font-medium p-3 bg-[#f8faf8] rounded-lg border border-[#d0e9cb]/50">+226 70 12 34 56</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#6e7b6c] uppercase tracking-widest font-bold">Type d'acheteur</label>
                <p className="text-[#0c200d] font-medium p-3 bg-[#f8faf8] rounded-lg border border-[#d0e9cb]/50">Grossiste</p>
              </div>
            </div>
          </div>

          {/* Adresses de Livraison */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-['DM_Serif_Display'] text-[#0c200d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b2c]">local_shipping</span>
                Adresses de Livraison
              </h2>
              <button className="flex items-center gap-1 text-[#006b2c] font-medium hover:bg-[#e1fbdc] px-3 py-1.5 rounded-lg transition-colors text-sm">
                <span className="material-symbols-outlined text-sm">add</span> Ajouter
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border-2 border-[#006b2c] bg-[#e1fbdc]/30 flex justify-between items-start">
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-[#006b2c] mt-1">home</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#0c200d]">Dépôt Principal (Défaut)</h3>
                      <span className="bg-[#006b2c] text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Actif</span>
                    </div>
                    <p className="text-[#3e4a3d] text-sm mt-1">Ouagadougou, Secteur 15</p>
                    <p className="text-[#6e7b6c] text-xs mt-1">Près du grand marché de Pissy</p>
                  </div>
                </div>
                <div className="flex gap-2 text-[#6e7b6c]">
                  <button className="hover:text-[#006b2c]"><span className="material-symbols-outlined text-sm">edit</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Côté droit : Sécurité & Préférences */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ba1a1a]/10">
            <h2 className="text-xl font-['DM_Serif_Display'] text-[#0c200d] flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[#ba1a1a]">security</span>
              Sécurité
            </h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#f8faf8] border border-[#d0e9cb]/50 group transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                    <span className="material-symbols-outlined">key</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#0c200d] text-sm">Mot de passe</p>
                    <p className="text-xs text-[#6e7b6c]">Dernière modification : il y a 2 mois</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#6e7b6c] group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-['DM_Serif_Display'] text-[#0c200d] flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[#006b2c]">notifications</span>
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-semibold text-[#0c200d] text-sm">Email</p>
                  <p className="text-xs text-[#6e7b6c]">Reçus de commandes et promotions</p>
                </div>
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="block bg-[#006b2c] w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer pt-4 border-t border-[#d0e9cb]/50">
                <div>
                  <p className="font-semibold text-[#0c200d] text-sm">SMS</p>
                  <p className="text-xs text-[#6e7b6c]">Alertes de livraisons urgentes</p>
                </div>
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="block bg-[#006b2c] w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
