import React from 'react';

export default function FarmerWalletPage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-serif text-on-surface tracking-tight" style={{fontFamily: "'DM Serif Display', serif"}}>💰 Mon Portefeuille</h1>
          <p className="text-on-surface-variant font-medium">Gérez vos revenus et vos retraits en toute sécurité.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card Disponible */}
        <div className="bg-surface-container-lowest p-8 rounded-xl border-l-8 border-primary shadow-sm group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider text-xs">Solde Disponible</span>
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-bold text-on-surface">185 000</span>
            <span className="text-xl font-bold text-primary">FCFA</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+12% vs mois dernier</span>
          </div>
        </div>

        {/* Card En Attente */}
        <div className="bg-surface-container-lowest p-8 rounded-xl border-l-8 border-tertiary shadow-sm group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider text-xs">En attente de libération</span>
            <div className="bg-tertiary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-tertiary">pending_actions</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-bold text-on-surface">37 500</span>
            <span className="text-xl font-bold text-tertiary">FCFA</span>
          </div>
          <p className="mt-4 text-on-surface-variant text-sm italic">Libération prévue sous 48h après confirmation de livraison.</p>
        </div>

      </div>

      {/* Main Layout with Asymmetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Transactions Section */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-on-surface font-serif" style={{fontFamily: "'DM Serif Display', serif"}}>Historique des transactions</h2>
            <button className="text-primary font-bold text-sm hover:underline">Voir tout</button>
          </div>
          <div className="space-y-4">
            
            {/* Transaction 1 */}
            <div className="bg-surface-container-low p-5 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">FT</div>
                <div>
                  <h4 className="font-bold text-on-surface">Livraison #035</h4>
                  <p className="text-sm text-on-surface-variant">Fatima T. • Hier, 14:20</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-primary text-lg">+242 500 FCFA</span>
                <div className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter mt-1 inline-block">CONFIRMÉE</div>
              </div>
            </div>

            {/* Transaction 2 */}
            <div className="bg-surface-container-low p-5 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold">L</div>
                <div>
                  <h4 className="font-bold text-on-surface">Livraison #041</h4>
                  <p className="text-sm text-on-surface-variant">Coopérative Nord • 12 Oct, 09:15</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-tertiary text-lg">+67 900 FCFA</span>
                <div className="text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter mt-1 inline-block">EN ATTENTE</div>
              </div>
            </div>

            {/* Transaction 3 */}
            <div className="bg-surface-container-low p-5 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors opacity-80">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-outline flex items-center justify-center text-white font-bold">R</div>
                <div>
                  <h4 className="font-bold text-on-surface">Retrait fonds</h4>
                  <p className="text-sm text-on-surface-variant">Orange Money • 10 Oct, 18:00</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-on-surface text-lg">-150 000 FCFA</span>
                <div className="text-[10px] bg-outline-variant text-on-surface-variant px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter mt-1 inline-block">TERMINÉ</div>
              </div>
            </div>

          </div>
        </div>

        {/* Retirer Widget (Fixed Position Simulation) */}
        <div className="lg:col-span-5 relative">
          <div className="bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/20 p-8 sticky top-28">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-on-surface font-serif" style={{fontFamily: "'DM Serif Display', serif"}}>Retirer mes fonds</h3>
            </div>
            
            <div className="mb-8 p-4 bg-primary/5 rounded-lg flex items-center justify-between">
              <span className="text-sm font-semibold text-on-surface-variant">Solde à retirer</span>
              <span className="font-mono font-bold text-primary text-xl">185 000 FCFA</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Montant du retrait</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-low border-none rounded-lg p-4 font-mono text-lg focus:ring-2 focus:ring-primary transition-all" placeholder="0.00" type="number" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">FCFA</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-on-surface mb-3">Méthode de réception</label>
                <div className="grid grid-cols-1 gap-3">
                  {/* Option OM */}
                  <label className="relative flex items-center p-4 rounded-lg border-2 border-primary bg-primary/5 cursor-pointer group">
                    <input type="radio" name="method" className="hidden" defaultChecked />
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FF6600] flex items-center justify-center text-white font-black text-xs">OM</div>
                      <div>
                        <p className="font-bold text-on-surface">Orange Money</p>
                        <p className="text-xs text-on-surface-variant">+226 76 XX XX 89</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </label>
                  
                  {/* Option MOOV */}
                  <label className="relative flex items-center p-4 rounded-lg border-2 border-transparent bg-surface-container-low hover:border-outline-variant cursor-pointer group">
                    <input type="radio" name="method" className="hidden" />
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#004A99] flex items-center justify-center text-white font-black text-xs">MOOV</div>
                      <div>
                        <p className="font-bold text-on-surface">Moov Money</p>
                        <p className="text-xs text-on-surface-variant">Non configuré</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all">
                Confirmer le retrait
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
