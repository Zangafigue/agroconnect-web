import React, { useState } from 'react';

export default function FarmerProfilePage() {
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop');

  return (
    <div className="space-y-8 pb-32">
      <header className="mb-10">
        <h1 className="text-5xl font-serif text-primary" style={{fontFamily: "'DM Serif Display', serif"}}>Mon Profil</h1>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* IDENTITE & COORDONNEES */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-primary/20">
                  <img src={profilePic} alt="Photo de profil" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-primary rounded-full border-2 border-surface-container-lowest"></div>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-on-surface font-serif" style={{fontFamily: "'DM Serif Display', serif"}}>Kader Traoré</h2>
                <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">Agriculteur</p>
              </div>
            </div>

            {/* Forms Section */}
            <div className="flex-1 space-y-6 w-full z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block">Prénom(s)</label>
                  <input className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-all" defaultValue="Kader" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block">Nom</label>
                  <input className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-all" defaultValue="Traoré" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block">Email</label>
                  <input className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-all text-on-surface-variant" defaultValue="kader.t@email.com" disabled type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block">Téléphone</label>
                  <input className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-all" defaultValue="+226 70 12 34 56" type="tel" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider block">À propos (Bio)</label>
                <textarea className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-all resize-none" defaultValue="Producteur de céréales (Maïs, Sorgho) basé dans les Hauts-Bassins avec plus de 10 ans d'expérience." rows="3"></textarea>
              </div>
              <div className="flex justify-end pt-2">
                <button className="bg-primary text-white font-bold py-2.5 px-6 xl:px-8 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide">
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/20">
            <h3 className="text-xl font-bold text-on-surface font-serif mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              Capacités & Certifications
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-3">Taille de l'exploitation</label>
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2 rounded-full border-2 border-outline-variant text-on-surface-variant text-sm font-semibold hover:border-primary hover:text-primary transition-colors focus:ring-0">&lt; 1 Ha</button>
                  <button className="px-5 py-2 rounded-full border-2 border-primary bg-primary/10 text-primary text-sm font-bold shadow-sm transition-colors focus:ring-0">1 - 5 Ha</button>
                  <button className="px-5 py-2 rounded-full border-2 border-outline-variant text-on-surface-variant text-sm font-semibold hover:border-primary hover:text-primary transition-colors focus:ring-0">5 - 10 Ha</button>
                  <button className="px-5 py-2 rounded-full border-2 border-outline-variant text-on-surface-variant text-sm font-semibold hover:border-primary hover:text-primary transition-colors focus:ring-0">&gt; 10 Ha</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-3">Cultures principales</label>
                <input className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-all" defaultValue="Maïs, Sorgho, Mil" placeholder="Séparez par des virgules" type="text" />
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR: SECURITE ET STATS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#1a361a] rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[100px]">shield_person</span>
            </div>
            <h3 className="text-xl font-bold font-serif mb-6 relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">lock</span>
              Sécurité du compte
            </h3>
            <div className="space-y-5 relative z-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#a3bfa3] mb-1">Mot de passe</p>
                <p className="text-sm font-medium">Dernière modification : Il y a 3 mois</p>
                <button className="mt-2 text-secondary text-sm font-bold hover:underline">Changer le mot de passe</button>
              </div>
              <div className="w-full h-px bg-white/10"></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#a3bfa3] mb-1">Authentification à 2 facteurs</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-medium opacity-80">Non activée</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/20 border-t-8 border-t-tertiary">
            <h3 className="text-sm font-bold text-outline uppercase tracking-wider mb-6">Aperçu du compte</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined">inventory_2</span>
                  <span className="font-medium text-sm">Produits publiés</span>
                </div>
                <span className="font-mono font-bold text-lg text-primary">12</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  <span className="font-medium text-sm">Ventes réalisées</span>
                </div>
                <span className="font-mono font-bold text-lg text-primary">45</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined">star</span>
                  <span className="font-medium text-sm">Note moyenne</span>
                </div>
                <div className="flex items-center gap-1 text-tertiary">
                  <span className="font-mono font-bold text-lg">4.8</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
