import React from 'react';

export default function BuyerOffersPage() {
  return (
    <div className="flex-1 p-8 md:p-12 mb-20 overflow-y-auto w-full max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-4 text-xs tracking-wide text-[#6e7b6c] uppercase flex items-center gap-2 font-label">
        <span className="hover:text-[#006b2c] transition-colors cursor-pointer">Mes Commandes</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-[#006b2c] font-bold">Offres</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
        <div>
          <h1 className="font-['DM_Serif_Display'] text-5xl text-[#0c200d] leading-tight mb-2">Offres de livraison</h1>
          <p className="text-[#3e4a3d]">
            Sélectionnez le transporteur idéal pour votre <span className="font-mono text-[#006b2c] font-bold">commande #043</span>
          </p>
        </div>
        <div className="bg-[#d6efd0] px-4 py-2 rounded-xl border border-[#bdcaba]/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#006b2c]">local_shipping</span>
          <span className="font-mono text-sm">Bobo-Dioulasso <span className="text-[#6e7b6c]">→</span> Ouagadougou</span>
        </div>
      </div>

      {/* Map View Section */}
      <section className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-[#bdcaba]/10 relative">
        <div className="h-[220px] w-full bg-zinc-200">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxQ03jG5jGvFc0fMLO9ARMzx42QaHRMPjO9OVHblChqzgmH0tdJZs-VzotZLfL6NvF_02S3WZ4d80iCP8RzRAhEOFwLNhJYpZA0e35pM6xu_-Lm3yiujinsFWNG3Y-DCQHB0JVLcLoiA78DGh-dwVJoyN-tPoeDKkw6CZvnJIYrUemE9qopC4Qw-IM-AHON1_wmpnsgw52lGve43BfDMPwgF4eQcwrU3zTjAa-r9vjia5_nS_ZsA89y9HD1P4zFBOmnCExlbhOV88" 
            alt="Trajet" 
            className="w-full h-full object-cover grayscale-[0.5] opacity-80" 
          />
          {/* Overlays for map feel */}
          <div className="absolute top-4 left-4 backdrop-blur-md bg-[#ebffe5]/70 px-4 py-2 rounded-lg border border-white/40 text-xs font-bold uppercase tracking-wider">
            Trajet Temps Réel
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-[#006b2c] border-4 border-white shadow-lg"></div>
              <div className="h-1 w-48 bg-[#006b2c]/30 border-t border-dashed border-[#006b2c]"></div>
              <div className="w-4 h-4 rounded-full bg-[#984300] border-4 border-white shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Offers List */}
      <div className="space-y-6">
        {/* Card 1: Koné Dramane */}
        <article className="group bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-[#00873a]/20">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-[#006b2c] flex items-center justify-center text-white font-['DM_Serif_Display'] text-2xl">KD</div>
          </div>
          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-center gap-3">
              <h3 className="font-['DM_Serif_Display'] text-xl text-[#0c200d]">Koné Dramane</h3>
              <div className="flex items-center bg-[#e1fbdc] px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-sm text-[#984300] fill-current">star</span>
                <span className="text-xs font-bold ml-1">4.6</span>
              </div>
            </div>
            <p className="text-[#3e4a3d] italic text-sm">"Je pars demain matin"</p>
            <div className="flex gap-4 text-xs text-[#6e7b6c] uppercase tracking-widest font-label">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Départ 06:00</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">inventory_2</span> Camion 5T</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-3 w-full md:w-auto">
            <span className="font-mono text-2xl font-bold text-[#006b2c]">15 000 FCFA</span>
            <button className="w-full md:w-auto bg-[#006b2c] text-white px-6 py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 hover:bg-[#00873a]">
              Choisir ce transporteur
            </button>
          </div>
        </article>

        {/* Card 2: Sana Souleymane [Moins cher] */}
        <article className="group bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-xl hover:-translate-y-1 border-2 border-[#00873a]/10">
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-xl bg-[#2e6a41] flex items-center justify-center text-white font-['DM_Serif_Display'] text-2xl">SS</div>
            <div className="absolute -top-3 -left-3 bg-[#984300] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm uppercase tracking-tighter">💰 Moins cher</div>
          </div>
          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-center gap-3">
              <h3 className="font-['DM_Serif_Display'] text-xl text-[#0c200d]">Sana Souleymane</h3>
              <div className="flex items-center bg-[#e1fbdc] px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-sm text-[#984300] fill-current">star</span>
                <span className="text-xs font-bold ml-1">4.2</span>
              </div>
            </div>
            <p className="text-[#3e4a3d] italic text-sm">"Expert en trajet court"</p>
            <div className="flex gap-4 text-xs text-[#6e7b6c] uppercase tracking-widest font-label">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Départ Flexible</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">inventory_2</span> Pick-up 2T</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-3 w-full md:w-auto">
            <span className="font-mono text-2xl font-bold text-[#006b2c]">12 500 FCFA</span>
            <button className="w-full md:w-auto bg-[#006b2c] text-white px-6 py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 hover:bg-[#00873a]">
              Choisir ce transporteur
            </button>
          </div>
        </article>

        {/* Card 3: Ouattara Transport [Mieux noté] */}
        <article className="group bg-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-[#00873a]/20">
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-xl bg-[#984300] flex items-center justify-center text-white font-['DM_Serif_Display'] text-2xl">OT</div>
            <div className="absolute -top-3 -left-3 bg-[#006b2c] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm uppercase tracking-tighter">⭐ Mieux noté</div>
          </div>
          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-center gap-3">
              <h3 className="font-['DM_Serif_Display'] text-xl text-[#0c200d]">Ouattara Transport</h3>
              <div className="flex items-center bg-[#e1fbdc] px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-sm text-[#984300] fill-current">star</span>
                <span className="text-xs font-bold ml-1">4.9</span>
              </div>
            </div>
            <p className="text-[#3e4a3d] italic text-sm">"Service Premium Garanti"</p>
            <div className="flex gap-4 text-xs text-[#6e7b6c] uppercase tracking-widest font-label">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Départ Quotidien</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">inventory_2</span> Camion Frigo 10T</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-3 w-full md:w-auto">
            <span className="font-mono text-2xl font-bold text-[#006b2c]">18 000 FCFA</span>
            <button className="w-full md:w-auto bg-[#006b2c] text-white px-6 py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 hover:bg-[#00873a]">
              Choisir ce transporteur
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
