import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function TransporterDashboard() {
  const { user } = useAuthStore();
  const userName = user?.name ? user.name.split(' ')[0] : 'Koné';

  return (
    <div className="p-8 max-w-[1200px] mx-auto min-h-screen pb-12">
      {/* Welcome Section */}
      <header className="mb-12 mt-6">
        <h1 className="font-['DM_Serif_Display'] text-[2.5rem] leading-tight text-[#0c200d] mb-2">
          Bonjour, {userName} 👋
        </h1>
        <p className="text-[#6e7b6c] text-lg font-['Plus_Jakarta_Sans']">
          2 nouvelles missions disponibles dans votre zone.
        </p>
      </header>

      {/* KPI Grid (Bento Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { icon: 'local_shipping', label: 'Missions dispo', value: '3', color: 'text-[#006b2c]' },
          { icon: 'check_circle', label: 'Livraisons', value: '12', color: 'text-[#006b2c]' },
          { icon: 'pending_actions', label: 'Offres en attente', value: '2', color: 'text-[#984300]' },
          { icon: 'payments', label: 'En attente', value: '37 500', unit: 'FCFA', color: 'text-[#00873a]' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-[#bdcaba]/10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`material-symbols-outlined ${kpi.color}`}>{kpi.icon}</span>
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-medium opacity-70 uppercase tracking-wider">{kpi.label}</span>
            </div>
            <p className="font-['DM_Mono'] text-[28px] font-bold text-[#0c200d]">
              {kpi.value} {kpi.unit && <span className="text-sm font-medium">{kpi.unit}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Section: Livraison en cours */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-['Newsreader'] tracking-tight">Livraison en cours</h2>
          <span className="px-3 py-1 bg-[#dbeafe] text-[#1d4ed8] text-[10px] font-bold uppercase rounded-full tracking-widest">
            🚚 EN ROUTE
          </span>
        </div>
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <p className="font-['DM_Mono'] text-sm font-bold text-[#1d4ed8]">Commande #041</p>
            <p className="text-xs text-[#1d4ed8]/70">Dernière actualisation : il y a 5 min</p>
          </div>
          
          {/* Simulated Map Component */}
          <div className="relative h-[220px] rounded-xl bg-slate-200 overflow-hidden shadow-inner group">
            <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 to-transparent"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOvvhgNFkNo16Vt_sXlxkL7OmXwnWa2IvK_crisjawbtNTp6tDlYePlpBr6zbnbIz-JPTfYLFio5bFpsMrcIJlmRp0tZPm7WSJYGnbWk70uPnGxSXgkVVL1BBffYbaA01XSP25uUJEjJwanwngxOf9ctF3I_N347IOlTjm2O1ZidYWorHKyaUmvT7sCZxdGDBv06rIDlANzUORGxsApNcx55FOFvB4VfRba94TdwfHrRnyIljoQBeV0avQJH-6T2tI31rsJRsAn0s" 
              alt="Carte stylisée" 
              className="w-full h-full object-cover grayscale-[0.2]" 
            />
            {/* Route visualization */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="w-full h-1 bg-white/50 relative">
                <div className="absolute top-0 left-0 h-full w-2/3 bg-blue-500"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-[#006b2c] border-4 border-white rounded-full shadow-lg" title="Koudougou"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-[#ba1a1a] border-4 border-white rounded-full shadow-lg" title="Ouagadougou"></div>
                <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 bg-blue-600 p-1.5 rounded-lg shadow-xl ring-2 ring-white">
                  <span className="material-symbols-outlined text-white text-xs">local_shipping</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 bg-[#f0fdf4]/50 p-4 rounded-xl border border-[#006b2c]/10">
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#006b2c] text-sm">straighten</span>
              <span className="font-['DM_Mono'] text-sm font-bold">100 km</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-x border-[#bdcaba]/30">
              <span className="material-symbols-outlined text-[#006b2c] text-sm">schedule</span>
              <span className="font-['DM_Mono'] text-sm font-bold">1h30</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#006b2c] text-sm">eco</span>
              <span className="font-['DM_Mono'] text-sm font-bold">200 kg</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="flex-1 py-3 px-6 rounded-xl text-[#006b2c] font-bold border border-[#006b2c]/20 hover:bg-[#006b2c]/5 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">chat</span> Contacter
            </button>
            <button className="flex-[1.5] py-3 px-6 rounded-xl bg-[#16a34a] text-white font-bold hover:bg-[#15803d] transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span> Mettre à jour le statut
            </button>
          </div>
        </div>
      </section>

      {/* Grids for Missions and Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section: Missions disponibles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold font-['Newsreader'] tracking-tight">Missions disponibles</h2>
              <span className="w-6 h-6 flex items-center justify-center bg-[#006b2c] text-white text-[10px] font-bold rounded-full">3</span>
            </div>
            <Link to="/transporter/missions" className="text-[#16a34a] text-sm font-bold hover:underline flex items-center gap-1">
              Voir toutes <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
          <div className="space-y-4">
            {/* Mission Card 1 */}
            <div className="bg-white p-5 rounded-xl border border-[#bdcaba]/10 shadow-sm hover:translate-x-1 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <span className="font-['DM_Mono'] text-xs font-bold text-[#006b2c]">#045</span>
                <div className="flex items-center gap-1 text-[10px] bg-[#b1f2be]/30 px-2 py-0.5 rounded text-[#2e6a41] font-bold uppercase">
                  <span className="material-symbols-outlined text-[10px]">group</span> 2 offres
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#006b2c] shrink-0"></span>
                <span className="font-bold text-sm">Bobo-Dioulasso</span>
                <span className="material-symbols-outlined text-xs opacity-30">trending_flat</span>
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] shrink-0"></span>
                <span className="font-bold text-sm">Ouagadougou</span>
              </div>
              <div className="flex gap-4 text-xs text-[#3e4a3d] mb-5">
                <span className="flex items-center gap-1 font-['DM_Mono']"><span className="material-symbols-outlined text-xs">distance</span> ~360 km</span>
                <span className="flex items-center gap-1 font-['DM_Mono']"><span className="material-symbols-outlined text-xs">inventory</span> 500 kg Maïs</span>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-[#16a34a] text-white text-sm font-bold hover:bg-[#15803d] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">description</span> Faire une offre
              </button>
            </div>
            {/* Mission Card 2 */}
            <div className="bg-white p-5 rounded-xl border border-[#bdcaba]/10 shadow-sm hover:translate-x-1 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <span className="font-['DM_Mono'] text-xs font-bold text-[#006b2c]">#048</span>
                <div className="flex items-center gap-1 text-[10px] bg-[#b1f2be]/30 px-2 py-0.5 rounded text-[#2e6a41] font-bold uppercase">
                  <span className="material-symbols-outlined text-[10px]">group</span> 0 offres
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#006b2c] shrink-0"></span>
                <span className="font-bold text-sm">Banfora</span>
                <span className="material-symbols-outlined text-xs opacity-30">trending_flat</span>
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] shrink-0"></span>
                <span className="font-bold text-sm">Koudougou</span>
              </div>
              <div className="flex gap-4 text-xs text-[#3e4a3d] mb-5">
                <span className="flex items-center gap-1 font-['DM_Mono']"><span className="material-symbols-outlined text-xs">distance</span> ~180 km</span>
                <span className="flex items-center gap-1 font-['DM_Mono']"><span className="material-symbols-outlined text-xs">inventory</span> 1 200 kg Coton</span>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-[#16a34a] text-white text-sm font-bold hover:bg-[#15803d] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">description</span> Faire une offre
              </button>
            </div>
          </div>
        </section>

        {/* Section: Mes offres en attente */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-['Newsreader'] tracking-tight">Mes offres en attente</h2>
            <Link to="/transporter/offers" className="text-[#16a34a] text-sm font-bold hover:underline flex items-center gap-1">
              Toutes mes offres <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { id: '039', amount: '45 000' },
              { id: '040', amount: '12 500' }
            ].map((offer, idx) => (
              <div key={idx} className="bg-white flex items-center justify-between p-4 rounded-xl border border-[#bdcaba]/10 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#ffdbca] flex items-center justify-center text-[#331200]">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Commande #{offer.id}</p>
                    <p className="font-['DM_Mono'] text-sm text-[#006b2c] font-bold">{offer.amount} FCFA</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-[#ffdbca] text-[#331200] text-[9px] font-bold uppercase rounded-lg tracking-wider">⏳ EN ATTENTE</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
