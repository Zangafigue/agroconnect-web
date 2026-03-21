import React from 'react';

export default function TransporterWalletPage() {
  return (
    <div className="pt-8 px-12 pb-12 w-full max-w-5xl mx-auto min-h-[calc(100vh-4rem)]">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-['Newsreader'] font-bold text-[#002109] mb-2">💰 Mon Portefeuille</h1>
        <p className="text-[#3e4a3d] font-medium opacity-80">
          Gérez vos revenus de transport et vos retraits en toute sécurité.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Available Balance */}
        <div className="bg-white border-2 border-[#006b2c] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-8xl text-[#006b2c]">account_balance_wallet</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#006b2c]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm font-bold text-[#006b2c] uppercase tracking-widest">Disponible</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-['DM_Mono'] font-bold text-[#006b2c]">25 000</span>
              <span className="text-xl font-bold text-[#006b2c] opacity-80">FCFA</span>
            </div>
          </div>
        </div>

        {/* Pending Balance */}
        <div className="bg-[#fef3c7] border-2 border-[#f59e0b] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:scale-110 transition-transform duration-500 text-[#92400e]">
            <span className="material-symbols-outlined text-8xl">lock</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#b45309]">lock</span>
              <span className="text-sm font-bold text-[#b45309] uppercase tracking-widest">En attente</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-['DM_Mono'] font-bold text-[#92400e]">37 500</span>
              <span className="text-xl font-bold text-[#92400e] opacity-80">FCFA</span>
            </div>
            <p className="text-sm text-[#92400e]/80 font-bold bg-[#fde68a]/50 p-2 rounded inline-block border border-[#f59e0b]/20">
              Libéré automatiquement à chaque livraison confirmée.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-[#006b2c] hover:bg-[#00873a] text-white py-5 rounded-xl text-lg font-bold shadow-lg shadow-[#006b2c]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mb-16">
        <span className="material-symbols-outlined text-2xl">payments</span>
        Retirer mes fonds
      </button>

      {/* Transactions Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-['Newsreader'] font-bold text-[#002109]">Historique des transactions</h2>
          <span className="px-4 py-1.5 bg-[#e1fbdc] text-[#006b2c] text-xs font-bold rounded-full uppercase tracking-tighter border border-[#006b2c]/20">
            Livraisons Terminées
          </span>
        </div>

        {/* List Content (No Borders as per Design System) */}
        <div className="space-y-3">
          {[
            { id: '#041', name: 'Fatima T.', amount: '+10 000 FCFA', date: 'Hier, 14:30' },
            { id: '#039', name: 'Moussa B.', amount: '+7 500 FCFA', date: '12 Oct 2023' },
            { id: '#038', name: "Société Graine d'Or", amount: '+15 000 FCFA', date: '10 Oct 2023' }
          ].map((tx, idx) => (
            <div key={idx} className="flex items-center bg-white border border-[#bdcaba]/20 p-5 rounded-xl hover:shadow-md transition-all group cursor-default">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e1fbdc] text-[#006b2c] mr-5">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0c200d] text-base mb-1">Livraison {tx.id}</h4>
                <p className="text-sm text-[#3e4a3d] font-medium">Acheteur : {tx.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-['DM_Mono'] font-bold text-[#006b2c] mb-1">{tx.amount}</p>
                <p className="text-xs text-[#6e7b6c] font-bold">{tx.date}</p>
              </div>
            </div>
          ))}

          {/* Empty state/footer for lists */}
          <div className="py-8 text-center mt-4">
            <p className="text-sm text-[#6e7b6c] font-bold bg-[#f8faf8] inline-block px-6 py-2 rounded-full border border-[#bdcaba]/20">
              Affichage des 3 dernières livraisons terminées
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
