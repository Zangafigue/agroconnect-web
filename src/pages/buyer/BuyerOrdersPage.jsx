import React from 'react';

export default function BuyerOrdersPage() {
  return (
    <div className="flex-1 p-8 md:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-['DM_Serif_Display'] text-[#0c200d] mb-2">Mes Commandes</h1>
        <p className="text-[#3e4a3d] opacity-80">Suivez l'état de vos approvisionnements en temps réel.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto items-center gap-8 mb-10 border-b border-[#bdcaba] border-opacity-20 pb-4">
        <button className="text-[#006b2c] font-bold border-b-2 border-[#006b2c] absolute -bottom-[17px]">
          En attente (2)
        </button>
        <button className="text-[#3e4a3d] hover:text-[#006b2c] transition-colors ml-32">
          Confirmées
        </button>
        <button className="text-[#3e4a3d] hover:text-[#006b2c] transition-colors">
          En livraison
        </button>
        <button className="text-[#3e4a3d] hover:text-[#006b2c] transition-colors">
          Historique
        </button>
      </div>

      {/* Orders Grid/List */}
      <div className="space-y-6">
        {/* Order Card 1 */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 border-l-4 border-[#fcd34d]">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-mono text-xs text-[#3e4a3d] uppercase tracking-wider">Commande #045</span>
                <h3 className="text-2xl font-['Newsreader'] font-bold text-[#0c200d] mt-1">Maïs sec</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ffdbca] text-[#763300] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                EN ATTENTE
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Quantité</p>
                <p className="font-semibold">10 sacs</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Vendeur</p>
                <p className="font-semibold">Amadou Kaboré</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Montant Total</p>
                <p className="font-mono font-bold text-[#006b2c]">50 000 FCFA</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Date</p>
                <p className="font-semibold">24 Oct. 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-[#ebffe5] rounded-lg">
              <span className="material-symbols-outlined text-[#984300] text-lg">info</span>
              <p className="text-sm italic text-[#3e4a3d]">"En attente de confirmation du vendeur..."</p>
            </div>
          </div>
          
          <div className="flex md:flex-col justify-end gap-3 min-w-[180px]">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#006b2c] text-[#006b2c] hover:bg-[#e1fbdc] transition-all text-sm font-semibold">
              <span className="material-symbols-outlined text-sm">chat</span>
              Contacter
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] hover:bg-opacity-20 transition-all text-sm font-semibold">
              Annuler
            </button>
          </div>
        </div>

        {/* Order Card 2 */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 border-l-4 border-[#fcd34d]">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-mono text-xs text-[#3e4a3d] uppercase tracking-wider">Commande #042</span>
                <h3 className="text-2xl font-['Newsreader'] font-bold text-[#0c200d] mt-1">Sorgho Blanc Premium</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ffdbca] text-[#763300] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                EN ATTENTE
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Quantité</p>
                <p className="font-semibold">25 sacs</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Vendeur</p>
                <p className="font-semibold">Coopérative Faso-Kadi</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Montant Total</p>
                <p className="font-mono font-bold text-[#006b2c]">137 500 FCFA</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3e4a3d] opacity-60">Date</p>
                <p className="font-semibold">23 Oct. 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-[#ebffe5] rounded-lg">
              <span className="material-symbols-outlined text-[#984300] text-lg">info</span>
              <p className="text-sm italic text-[#3e4a3d]">"En attente de confirmation du vendeur..."</p>
            </div>
          </div>
          
          <div className="flex md:flex-col justify-end gap-3 min-w-[180px]">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#006b2c] text-[#006b2c] hover:bg-[#e1fbdc] transition-all text-sm font-semibold">
              <span className="material-symbols-outlined text-sm">chat</span>
              Contacter
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] hover:bg-opacity-20 transition-all text-sm font-semibold">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
