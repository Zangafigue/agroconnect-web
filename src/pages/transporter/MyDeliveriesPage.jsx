import React from 'react';

export default function MyDeliveriesPage() {
  return (
    <div className="pt-8 px-12 pb-12 w-full max-w-[1400px] mx-auto min-h-screen flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-['DM_Serif_Display'] text-[#0c200d] flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">inventory</span>
          Mes livraisons
        </h1>
        <p className="text-[#3e4a3d] font-medium opacity-80">
          Gérez vos expéditions en cours et l'historique de vos transports.
        </p>
      </div>

      {/* Custom Tabs */}
      <div className="flex gap-8 mb-8 border-b border-[#bdcaba]/20">
        <button className="pb-4 text-[#006b2c] font-bold border-b-2 border-[#006b2c] flex items-center gap-2">
          En cours <span className="bg-[#e1fbdc] text-[#005320] px-2 py-0.5 rounded-full text-xs">1</span>
        </button>
        <button className="pb-4 text-[#006b2c]/70 font-medium hover:text-[#006b2c] transition-colors flex items-center gap-2">
          Terminées <span className="bg-[#f8faf8] text-[#3e4a3d] px-2 py-0.5 rounded-full text-xs border border-[#bdcaba]/30">12</span>
        </button>
      </div>

      {/* Active Content: En Cours */}
      <section className="space-y-8">
        {/* Large Delivery Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#bdcaba]/20 overflow-hidden group transition-all">
          {/* Card Header */}
          <div className="px-8 py-5 bg-[#f8faf8] flex items-center justify-between border-b border-[#bdcaba]/20">
            <div className="flex items-center gap-4">
              <span className="font-['DM_Mono'] font-bold text-[#005320]">#041</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#bdcaba]"></span>
              <h2 className="font-bold text-lg text-[#0c200d] flex items-center gap-2">
                Sorgho · Koudougou 
                <span className="material-symbols-outlined text-[#006b2c] text-sm">arrow_forward</span> 
                Ouagadougou
              </h2>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              EN ROUTE
            </span>
          </div>

          {/* Delivery Map Mockup */}
          <div className="relative h-[220px] bg-[#e1fbdc]/30 overflow-hidden border-b border-[#bdcaba]/20">
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#006b2c22 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Simulated Route */}
            <svg className="absolute inset-0 w-full h-full p-12" preserveAspectRatio="none" viewBox="0 0 800 200">
              <path d="M50,150 Q200,50 400,100 T750,50" fill="none" stroke="#006b2c" strokeDasharray="8 4" strokeWidth="3"></path>
              <circle cx="50" cy="150" fill="#006b2c" r="6"></circle>
              <circle cx="750" cy="50" fill="#ba1a1a" r="6"></circle>
            </svg>
            
            {/* Floating Truck Indicator */}
            <div className="absolute left-[40%] top-[45%] transform -translate-x-1/2 -translate-y-1/2 bg-[#006b2c] text-white p-2 rounded-lg shadow-lg flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            
            {/* Labels */}
            <div className="absolute left-10 bottom-8 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold shadow-sm border border-[#bdcaba]/30 text-[#0c200d]">Koudougou</div>
            <div className="absolute right-10 top-8 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold shadow-sm border border-[#bdcaba]/30 text-[#0c200d]">Ouagadougou</div>
          </div>

          {/* Info Chips */}
          <div className="px-8 py-4 flex gap-4 bg-white border-b border-[#bdcaba]/20">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e1fbdc]/50 rounded-lg text-[#005320] font-bold text-sm border border-[#006b2c]/10">
              <span className="material-symbols-outlined text-lg">distance</span>
              100 km
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e1fbdc]/50 rounded-lg text-[#005320] font-bold text-sm border border-[#006b2c]/10">
              <span className="material-symbols-outlined text-lg">schedule</span>
              1h30
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e1fbdc]/50 rounded-lg text-[#005320] font-bold text-sm border border-[#006b2c]/10">
              <span className="material-symbols-outlined text-lg">weight</span>
              200 kg
            </div>
          </div>

          {/* Body Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white">
            {/* Left: Contacts */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6e7b6c] mb-4">Contacts Livraison</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f8faf8] transition-colors border border-transparent hover:border-[#bdcaba]/30">
                  <div className="w-10 h-10 rounded-full bg-[#006b2c] flex items-center justify-center text-white font-bold text-sm shadow-inner">AK</div>
                  <div>
                    <p className="font-bold text-[#0c200d]">Amadou K.</p>
                    <p className="text-xs text-[#6e7b6c] flex items-center gap-1 font-medium mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">call</span> +226 70 00 00 00
                    </p>
                  </div>
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-[#e1fbdc] text-[#005320] rounded border border-[#006b2c]/20 tracking-wider">PRODUCTEUR</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f8faf8] transition-colors border border-transparent hover:border-[#bdcaba]/30">
                  <div className="w-10 h-10 rounded-full bg-[#2e6a41] flex items-center justify-center text-white font-bold text-sm shadow-inner">FT</div>
                  <div>
                    <p className="font-bold text-[#0c200d]">Fatima T.</p>
                    <p className="text-xs text-[#6e7b6c] flex items-center gap-1 font-medium mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">call</span> +226 75 11 11 11
                    </p>
                  </div>
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-[#b1f2be] text-[#00210d] rounded border border-[#2e6a41]/20 tracking-wider">ACHETEUR</span>
                </div>
              </div>
            </div>

            {/* Right: Remuneration */}
            <div className="flex flex-col justify-center items-end text-right space-y-4 p-6 bg-[#f8faf8] rounded-xl border border-[#bdcaba]/20">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[#6e7b6c]">Ma rémunération</p>
                <p className="text-3xl font-['DM_Mono'] font-bold text-[#006b2c]">10 000 FCFA</p>
              </div>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg flex items-center gap-2 border border-purple-200 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Libérée à la livraison
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-5 bg-[#f8faf8] flex flex-wrap items-center justify-end gap-4 border-t border-[#bdcaba]/20">
            <button className="px-6 py-2.5 rounded-lg border border-[#006b2c] text-[#006b2c] font-bold hover:bg-[#e1fbdc]/50 transition-colors flex items-center gap-2 active:scale-95 bg-white">
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Envoyer un message
            </button>
            <button className="px-8 py-2.5 rounded-lg bg-[#006b2c] text-white font-bold shadow-md hover:bg-[#00873a] active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Confirmer la livraison
            </button>
          </div>
        </div>

        {/* Finished Section Title */}
        <div className="pt-10 flex items-center gap-4">
          <h2 className="text-2xl font-['DM_Serif_Display'] text-[#0c200d]">Missions terminées</h2>
          <div className="h-px flex-1 bg-[#bdcaba] opacity-30"></div>
        </div>

        {/* History Table (Bento Style/Clean) */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#bdcaba]/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8faf8] border-b border-[#bdcaba]/20">
                  <th className="px-8 py-4 text-xs font-bold text-[#6e7b6c] uppercase tracking-widest">#ID</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#6e7b6c] uppercase tracking-widest">Trajet</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#6e7b6c] uppercase tracking-widest text-right">Montant</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#6e7b6c] uppercase tracking-widest text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bdcaba]/10">
                {/* Row 1 */}
                <tr className="hover:bg-[#f8faf8]/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#006b2c]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="font-['DM_Mono'] font-bold text-[#0c200d]">#038</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-[#0c200d] flex items-center gap-1">Bobo-Dioulasso <span className="material-symbols-outlined text-[#6e7b6c] text-sm">arrow_forward</span> Ouagadougou</p>
                    <p className="text-xs text-[#6e7b6c] font-medium mt-1">Maïs · 450 kg</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="font-['DM_Mono'] font-bold text-[#006b2c] bg-[#e1fbdc]/50 px-2 py-1 rounded">+15 000 FCFA</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-sm font-bold text-[#6e7b6c]">09 mars</span>
                  </td>
                </tr>
                {/* Row 2 Mockup */}
                <tr className="hover:bg-[#f8faf8]/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#006b2c]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="font-['DM_Mono'] font-bold text-[#0c200d]">#035</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-[#0c200d] flex items-center gap-1">Fada N'Gourma <span className="material-symbols-outlined text-[#6e7b6c] text-sm">arrow_forward</span> Ouagadougou</p>
                    <p className="text-xs text-[#6e7b6c] font-medium mt-1">Niébé · 120 kg</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="font-['DM_Mono'] font-bold text-[#006b2c] bg-[#e1fbdc]/50 px-2 py-1 rounded">+8 500 FCFA</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-sm font-bold text-[#6e7b6c]">05 mars</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center bg-[#f8faf8] border-t border-[#bdcaba]/20">
            <button className="text-[#006b2c] font-bold text-sm hover:underline hover:text-[#00873a] transition-colors py-2 px-4 rounded-lg">
              Voir l'historique complet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
