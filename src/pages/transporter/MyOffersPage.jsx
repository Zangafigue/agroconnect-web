import React from 'react';

export default function MyOffersPage() {
  return (
    <div className="pt-8 px-12 pb-12 w-full max-w-5xl mx-auto">
      <header className="mb-12">
        <div className="flex items-end gap-3 mb-2">
          <span className="material-symbols-outlined text-[#984300] text-3xl mb-1">history</span>
          <h2 className="font-['Newsreader'] text-5xl font-bold tracking-tight text-[#002109]">Mes offres</h2>
        </div>
        <p className="text-[#005320]/70 font-medium max-w-xl">
          Suivez l'état de vos propositions de transport et gérez vos engagements logistiques en temps réel.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 mb-10 border-b border-[#b1f2be]/50">
        <button className="pb-4 text-[#006b2c] font-bold border-b-2 border-[#006b2c] transition-all">
          En attente (2)
        </button>
        <button className="pb-4 text-[#005320]/60 font-medium hover:text-[#006b2c] transition-all">
          Acceptées (1)
        </button>
        <button className="pb-4 text-[#005320]/60 font-medium hover:text-[#006b2c] transition-all">
          Refusées (3)
        </button>
      </div>

      {/* Section: En attente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Card 1 */}
        <div className="bg-white border-l-4 border-[#fcd34d] rounded-xl shadow-sm p-6 flex flex-col gap-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-['DM_Mono'] text-xs text-[#006b2c]/70 tracking-tighter uppercase font-bold">REF-OFFER #045</p>
              <h3 className="text-lg font-bold text-[#0c200d]">Bobo-Dioulasso <span className="text-[#62df7d] mx-1">→</span> Ouagadougou</h3>
              <div className="flex items-center gap-3 text-sm text-[#005320]/60">
                <span className="flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-base">route</span> ~360 km</span>
                <span className="w-1 h-1 bg-[#62df7d] rounded-full"></span>
                <span className="flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-base">weight</span> 500 kg</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#ffdbca] text-[#763300] text-[10px] font-bold tracking-wider rounded-full uppercase">En attente</span>
          </div>

          <div className="bg-[#ebffe5] p-4 rounded-lg border border-[#b1f2be]/50">
            <p className="text-xs text-[#006b2c] font-bold mb-1 uppercase tracking-widest">Détails de l'offre</p>
            <p className="font-['DM_Mono'] text-2xl font-bold text-[#006b2c]">15 000 FCFA</p>
            <p className="text-sm text-[#005320]/70 mt-2 flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-base">schedule</span>
              Soumise le 24 Oct · il y a 2h
            </p>
          </div>

          <div className="italic text-sm text-[#002109]/70 pl-4 border-l-2 border-[#b1f2be] py-1 font-medium">
            "Je pars demain matin avec un camion vide, je peux charger directement au marché de fruits."
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#e1fbdc]">
            <button className="flex-1 py-2.5 rounded-lg border border-[#bdcaba] text-[#3e4a3d] font-bold text-sm hover:bg-[#f8faf8] transition-colors active:scale-95">
              Modifier
            </button>
            <button className="flex-1 py-2.5 rounded-lg text-[#ba1a1a] font-bold text-sm hover:bg-[#ffdad6]/30 border border-transparent hover:border-[#ba1a1a]/20 transition-colors active:scale-95">
              Retirer l'offre
            </button>
          </div>
        </div>

        {/* Card 2 (Empty state / Placeholder for another pending) */}
        <div className="bg-white border-l-4 border-[#fcd34d] rounded-xl shadow-sm p-6 flex flex-col gap-6 opacity-70">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-['DM_Mono'] text-xs text-[#006b2c]/70 tracking-tighter uppercase font-bold">REF-OFFER #042</p>
              <h3 className="text-lg font-bold text-[#0c200d]">Koudougou <span className="text-[#62df7d] mx-1">→</span> Dédougou</h3>
              <div className="flex items-center gap-3 text-sm text-[#005320]/60">
                <span className="flex items-center gap-1 font-medium">~150 km</span>
                <span className="w-1 h-1 bg-[#62df7d] rounded-full"></span>
                <span className="flex items-center gap-1 font-medium">1.2 T</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#ffdbca] text-[#763300] text-[10px] font-bold tracking-wider rounded-full uppercase">En attente</span>
          </div>
          <div className="flex-1 min-h-[100px] flex items-center justify-center border-2 border-dashed border-[#b1f2be] rounded-lg mt-2 bg-[#f8faf8]/50">
            <p className="text-xs text-[#006b2c]/60 italic font-medium">Détails confidentiels en attente de réponse</p>
          </div>
        </div>
      </div>

      {/* Section: Acceptées */}
      <h3 className="font-['Newsreader'] text-2xl font-bold text-[#002109] mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#006b2c]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        Acceptées
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white border-l-4 border-[#006b2c] rounded-xl shadow-sm p-6 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-['DM_Mono'] text-xs text-[#006b2c]/70 tracking-tighter uppercase font-bold">REF-OFFER #039</p>
              <h3 className="text-lg font-bold text-[#0c200d]">Banfora <span className="text-[#62df7d] mx-1">→</span> Bobo-Dioulasso</h3>
              <p className="text-sm text-[#005320]/70 font-medium">Chargement : 800 kg de Mangues</p>
            </div>
            <span className="px-3 py-1 bg-[#00873a] text-white text-[10px] font-bold tracking-wider rounded-full uppercase">Acceptée</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[#e1fbdc]">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#006b2c] tracking-wider mb-1">Montant Final</p>
              <p className="font-['DM_Mono'] text-xl font-bold text-[#006b2c]">8 500 FCFA</p>
            </div>
            <button className="bg-[#006b2c] text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#00873a] transition-all shadow-md active:scale-95">
              Voir ma livraison
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section: Refusées */}
      <h3 className="font-['Newsreader'] text-2xl font-bold text-[#002109]/50 mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#bdcaba]" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
        Refusées
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { route: 'Ouaga → Kaya', time: '20 Oct', price: '12 000', reason: "L'acheteur a choisi un autre transporteur proposant un prix plus compétitif ou un délai plus court." },
          { route: 'Fada → Ouaga', time: '18 Oct', price: '25 000', reason: "Mission annulée par l'agriculteur avant la fin des enchères." },
          { route: 'Tenkodogo → Koupéla', time: '15 Oct', price: '5 000', reason: "L'acheteur a choisi un autre transporteur affilié." }
        ].map((refused, idx) => (
          <div key={idx} className="bg-white border-l-4 border-[#bdcaba]/50 rounded-xl p-5 opacity-75 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-[#3e4a3d]/80 text-sm">{refused.route}</h4>
              <span className="px-2 py-0.5 bg-[#ba1a1a]/10 text-[#ba1a1a] text-[9px] font-bold rounded uppercase tracking-wider">Refusée</span>
            </div>
            <p className="text-xs italic text-[#3e4a3d]/70 leading-relaxed font-medium">
              {refused.reason}
            </p>
            <div className="pt-3 border-t border-[#e1fbdc] flex justify-between items-center mt-auto">
              <span className="font-['DM_Mono'] text-sm text-[#006b2c]/70 font-bold">{refused.price} FCFA</span>
              <span className="text-[10px] text-[#6e7b6c] font-bold">{refused.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
