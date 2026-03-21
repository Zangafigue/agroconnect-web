import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function TransporterProfilePage() {
  const { user } = useAuthStore();
  const [canBuy, setCanBuy] = useState(false);

  return (
    <div className="pt-8 px-12 pb-12 w-full max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-12 gap-8 mt-4">
        {/* LEFT COLUMN (Profile Card) - 35% equivalent */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <section className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center text-center border border-[#bdcaba]/20">
            <div className="w-20 h-20 rounded-full bg-[#fef3c7] text-[#92400e] flex items-center justify-center text-2xl font-bold mb-4 shadow-inner border-[3px] border-white ring-4 ring-[#e1fbdc]">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'KD'}
            </div>
            <h2 className="text-2xl font-bold text-[#0c200d] font-['Newsreader'] mb-1">
              {user?.name || 'Koné Dramane'}
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#006b2c]/10 text-[#006b2c] rounded-full text-xs font-bold mb-6 border border-[#006b2c]/20">
              <span className="material-symbols-outlined text-sm">local_shipping</span>
              Transporteur
            </div>
            
            <div className="w-full pt-6 border-t border-[#bdcaba]/20">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 bg-[#fff8e1] px-3 py-1 rounded-full border border-[#ffe082]">
                  <span className="material-symbols-outlined text-[#f59e0b] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-xl font-bold text-[#0c200d]">4.2</span>
                  <span className="text-[#6e7b6c] text-sm font-medium">/ 5</span>
                </div>
                <p className="text-sm text-[#6e7b6c] font-medium mt-2">(12 avis vérifiés)</p>
              </div>
            </div>
            
            <div className="w-full mt-8 space-y-3">
              <button className="w-full py-3 bg-[#006b2c] text-white rounded-xl font-bold text-sm hover:bg-[#00873a] active:scale-95 transition-all shadow-md">
                Modifier la photo
              </button>
              <button className="w-full py-3 bg-[#e1fbdc] text-[#005320] rounded-xl font-bold text-sm hover:bg-[#d6efd0] transition-all border border-[#006b2c]/10">
                Voir les badges
              </button>
            </div>
          </section>

          {/* Portefeuille Résumé */}
          <section className="bg-[#f8faf8] rounded-xl p-6 border border-[#bdcaba]/20 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0c200d]">Portefeuille</h3>
              <span className="material-symbols-outlined text-[#6e7b6c]">account_balance_wallet</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#6e7b6c] uppercase tracking-wider font-bold mb-1">Disponible</p>
                <p className="text-2xl font-bold font-['DM_Mono'] text-[#006b2c]">145.000 FCFA</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-[#bdcaba]/30">
                <p className="text-xs text-[#6e7b6c] mb-1 font-medium">En attente de libération</p>
                <p className="text-lg font-bold font-['DM_Mono'] text-[#984300]">28.500 FCFA</p>
              </div>
              <a href="/transporter/wallet" className="block text-center text-sm font-bold text-[#006b2c] hover:text-[#00873a] hover:underline pt-2 transition-colors">
                Voir l'historique complet
              </a>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - 65% equivalent */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Section Mes informations */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#bdcaba]/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#e1fbdc] flex items-center justify-center border border-[#006b2c]/10">
                <span className="material-symbols-outlined text-[#006b2c]">person</span>
              </div>
              <h3 className="text-xl font-bold text-[#0c200d]">Mes informations</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6e7b6c] uppercase px-1">Prénom</label>
                <div className="px-4 py-3 bg-[#f8faf8] rounded-xl text-[#0c200d] font-bold border border-[#bdcaba]/30">
                  {user?.name ? user.name.split(' ')[0] : 'Dramane'}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6e7b6c] uppercase px-1">Nom</label>
                <div className="px-4 py-3 bg-[#f8faf8] rounded-xl text-[#0c200d] font-bold border border-[#bdcaba]/30">
                  {user?.name ? user.name.split(' ').slice(1).join(' ') || 'Koné' : 'Koné'}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6e7b6c] uppercase px-1">Email</label>
                <div className="px-4 py-3 bg-[#f8faf8] rounded-xl text-[#0c200d] font-bold flex items-center justify-between border border-[#bdcaba]/30">
                  <span>{user?.email || 'd.kone@email.bf'}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-[#e1fbdc] text-[#006b2c] px-2 py-0.5 rounded-full font-bold uppercase border border-[#006b2c]/20">
                    Vérifié
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6e7b6c] uppercase px-1">Téléphone</label>
                <div className="px-4 py-3 bg-[#f8faf8] rounded-xl text-[#0c200d] font-bold border border-[#bdcaba]/30">
                  +226 70 00 00 00
                </div>
              </div>
              <div className="space-y-1.5 break-inside-avoid">
                <label className="text-xs font-bold text-[#6e7b6c] uppercase px-1">Véhicule</label>
                <div className="px-4 py-3 bg-[#f8faf8] rounded-xl text-[#0c200d] font-bold flex items-center gap-2 border border-[#bdcaba]/30">
                  <span className="material-symbols-outlined text-[#6e7b6c] text-[18px]">local_shipping</span>
                  Camionnette 2 tonnes
                </div>
              </div>
              <div className="space-y-1.5 break-inside-avoid">
                <label className="text-xs font-bold text-[#6e7b6c] uppercase px-1">Zone de couverture</label>
                <div className="px-4 py-3 bg-[#f8faf8] rounded-xl text-[#0c200d] font-bold flex items-center gap-2 border border-[#bdcaba]/30">
                  <span className="material-symbols-outlined text-[#6e7b6c] text-[18px]">location_on</span>
                  Ouagadougou et environs
                </div>
              </div>
            </div>
          </div>

          {/* Section Mes capacités */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#bdcaba]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#fff8e1] flex items-center justify-center border border-[#ffe082]">
                <span className="material-symbols-outlined text-[#f59e0b]">settings_accessibility</span>
              </div>
              <h3 className="text-xl font-bold text-[#0c200d]">Mes capacités</h3>
            </div>
            
            <div className="bg-[#f8faf8] rounded-2xl p-6 flex items-center justify-between border border-[#bdcaba]/30 hover:border-[#006b2c]/30 transition-colors cursor-pointer" onClick={() => setCanBuy(!canBuy)}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006b2c]">shopping_cart</span>
                  <h4 className="font-bold text-[#0c200d]">Je peux aussi acheter des produits</h4>
                </div>
                <p className="text-sm text-[#6e7b6c] font-medium">Activez pour accéder au catalogue et passer des commandes.</p>
              </div>
              
              {/* Toggle Switch */}
              <button 
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ring-2 ring-[#006b2c]/20 ring-offset-2 ${canBuy ? 'bg-[#006b2c]' : 'bg-[#bdcaba]'}`}
                onClick={(e) => { e.stopPropagation(); setCanBuy(!canBuy); }}
              >
                <span className={`${canBuy ? 'translate-x-6' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm`}></span>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-8 py-3 text-[#6e7b6c] font-bold hover:text-[#ba1a1a] hover:bg-[#ffdad6]/30 rounded-xl transition-colors">
              Annuler
            </button>
            <button className="px-10 py-3 bg-[#006b2c] text-white rounded-xl font-bold shadow-md hover:bg-[#00873a] hover:shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
