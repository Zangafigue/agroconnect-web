import React, { useState } from 'react';

export default function MissionsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="pt-8 px-12 pb-12 w-full max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] relative">
      {/* Page Header */}
      <div className="flex items-baseline space-x-4 mb-8">
        <h1 className="text-4xl font-['Newsreader'] font-extrabold text-[#0c200d] tracking-tight">🚛 Missions disponibles</h1>
        <span className="px-3 py-1 bg-[#006b2c] text-white text-sm font-bold rounded-full">3</span>
      </div>

      {/* Horizontal Filter Scroll */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-6 mb-8 scrollbar-hide">
        <button className="flex-shrink-0 px-6 py-2 bg-[#006b2c] text-white rounded-full font-bold text-sm flex items-center space-x-2">
          <span>Toutes</span>
          <span className="material-symbols-outlined text-sm">check</span>
        </button>
        <button className="flex-shrink-0 px-6 py-2 bg-[#e1fbdc] text-[#3e4a3d] hover:bg-[#d6efd0] transition-colors rounded-full font-medium text-sm">
          &lt; 100 km
        </button>
        <button className="flex-shrink-0 px-6 py-2 bg-[#e1fbdc] text-[#3e4a3d] hover:bg-[#d6efd0] transition-colors rounded-full font-medium text-sm">
          100-300 km
        </button>
        <button className="flex-shrink-0 px-6 py-2 bg-[#e1fbdc] text-[#3e4a3d] hover:bg-[#d6efd0] transition-colors rounded-full font-medium text-sm">
          &gt; 300 km
        </button>
        <button className="flex-shrink-0 px-6 py-2 bg-[#e1fbdc] text-[#3e4a3d] hover:bg-[#d6efd0] transition-colors rounded-full font-medium text-sm">
          Céréales
        </button>
        <button className="flex-shrink-0 px-6 py-2 bg-[#e1fbdc] text-[#3e4a3d] hover:bg-[#d6efd0] transition-colors rounded-full font-medium text-sm">
          Légumes
        </button>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CARD 1: Full Option */}
        <article className="bg-white rounded-xl shadow-sm overflow-hidden group border border-transparent hover:border-[#006b2c]/10 transition-all duration-300">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-['DM_Mono'] text-xs text-[#6e7b6c] tracking-tighter uppercase mb-1 block">Ref: #BF-9928-LOG</span>
                <h3 className="text-xl font-['Newsreader'] font-bold text-[#0c200d]">Transport de Maïs Premium</h3>
              </div>
              <span className="text-xs font-['DM_Mono'] bg-[#dcf5d6] px-2 py-1 rounded font-bold text-[#006b2c]">24 OCT 2024</span>
            </div>

            {/* Mini Map Mockup */}
            <div className="relative h-[200px] bg-[#e1fbdc]/50 rounded-lg mb-6 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4YwIizwPZVCS_HbVwAp5cbJ7OFtcFT71u11IhiFq1rv1CM1_EsZoAXt_DllrbrEHma0Cm8VZE1Q5QlsXtlXDcV6tpeGCN49H6Mm30jOSvyo5SOFnLZUayAwVeFd4FWPLuTnS1zguDqZFE5OGKjBosNGmlo081B2wrKwJTXSOBytbeg7QrI5GI4EHl3982SMU7hZQX6CeMwOBc71SMP4z3Tw5dxHl10WvGZLKqWmm7_umNiumq53OPyNgj1QlNPhuDzAHk3A23WF8" 
                alt="Map Mockup" 
                className="w-full h-full object-cover opacity-60 mix-blend-multiply" 
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="bg-white px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-[#006b2c]"></div>
                    <span className="text-[10px] font-bold">BOBO-DIOULASSO</span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-[#984300]"></div>
                    <span className="text-[10px] font-bold">OUAGADOUGOU</span>
                  </div>
                </div>
                <div className="h-[2px] bg-[#006b2c]/30 w-full relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#006b2c] rounded-full ring-4 ring-white"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#984300] rounded-full ring-4 ring-white"></div>
                </div>
              </div>
            </div>

            {/* Trip Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="px-3 py-1 bg-[#d6efd0] rounded-full flex items-center space-x-2">
                <span className="material-symbols-outlined text-[18px]">straighten</span>
                <span className="text-xs font-bold text-[#0c200d]">360 km</span>
              </div>
              <div className="px-3 py-1 bg-[#d6efd0] rounded-full flex items-center space-x-2">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="text-xs font-bold text-[#0c200d]">4h30</span>
              </div>
              <div className="px-3 py-1 bg-[#d6efd0] rounded-full flex items-center space-x-2">
                <span className="material-symbols-outlined text-[18px]">weight</span>
                <span className="text-xs font-bold text-[#0c200d]">500 kg</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#006b2c] mt-1 text-xl">location_on</span>
                <div>
                  <p className="text-[10px] text-[#6e7b6c] uppercase font-bold tracking-widest">Collecte</p>
                  <p className="text-sm font-medium">Zone Industrielle, Bobo - Demain, 08:00</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#984300] mt-1 text-xl">flag</span>
                <div>
                  <p className="text-[10px] text-[#6e7b6c] uppercase font-bold tracking-widest">Livraison</p>
                  <p className="text-sm font-medium">Marché de Sankariaré, Ouaga - Demain, 14:00</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 border border-[#bdcaba] text-[#0c200d] hover:bg-[#e1fbdc]/50 transition-all rounded-xl text-sm font-bold flex items-center justify-center space-x-2">
                <span className="material-symbols-outlined text-[18px]">help_outline</span>
                <span>Poser une question</span>
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="py-3 bg-[#006b2c] text-white hover:bg-[#00873a] transition-all rounded-xl text-sm font-bold flex items-center justify-center space-x-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">local_offer</span>
                <span>Faire une offre</span>
              </button>
            </div>
          </div>
        </article>

        {/* CARD 2: Prominent Action Urgent */}
        <article className="bg-[#fffbfa] rounded-xl shadow-sm overflow-hidden border-2 border-[#ba1a1a]/30 flex flex-col justify-between group">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-['DM_Mono'] text-xs text-[#6e7b6c] tracking-tighter uppercase mb-1 block">Ref: #BF-1042-LOG</span>
                <h3 className="text-xl font-['Newsreader'] font-bold text-[#0c200d] leading-tight">Convoi de Tomates Fraîches<br/>Koudougou Express</h3>
              </div>
              <div className="bg-[#ffdad6] text-[#93000a] px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">URGENT</div>
            </div>

            <div className="bg-[#ffdad6]/20 rounded-lg p-5 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6e7b6c] font-medium">Poids total</span>
                <span className="text-sm font-bold font-['DM_Mono']">1.2 TONNES</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6e7b6c] font-medium">Type de véhicule</span>
                <span className="text-sm font-bold font-['DM_Mono']">Camionnette Frigo</span>
              </div>
              <div className="h-[1px] bg-[#bdcaba] opacity-30"></div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[#6e7b6c] font-medium">Budget estimé</span>
                <span className="text-lg font-bold font-['DM_Mono'] text-[#93000a]">125.000 FCFA</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-[#dcf5d6] bg-white rounded-lg mb-6">
              <div className="w-10 h-10 bg-[#e1fbdc] rounded-full flex items-center justify-center text-[#006b2c] font-bold">AG</div>
              <div>
                <p className="text-xs text-[#6e7b6c]">Client certifié</p>
                <p className="text-sm font-bold">AgroGroup Burkina</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="m-6 mt-0 py-5 bg-[#ba1a1a] text-white hover:bg-[#93000a] shadow-lg shadow-[#ba1a1a]/20 transition-all rounded-xl text-lg font-bold flex items-center justify-center space-x-3 active:scale-95"
          >
            <span>POSTULER MAINTENANT</span>
            <span className="material-symbols-outlined">trending_flat</span>
          </button>
        </article>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c200d]/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-[600px] rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-[#bdcaba]/20">
              <h2 className="text-2xl font-['Newsreader'] font-bold text-[#0c200d]">Soumettre une offre · #045</h2>
              <button onClick={() => setShowModal(false)} className="text-[#6e7b6c] hover:text-[#ba1a1a] transition-colors p-2 rounded-full hover:bg-gray-100">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {/* Mission Summary Card */}
              <div className="bg-[#e1fbdc]/50 p-5 rounded-xl mb-8 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-[#6e7b6c] font-bold mb-1">Trajet</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#0c200d]">Bobo</span>
                      <span className="material-symbols-outlined text-[#6e7b6c] text-sm">trending_flat</span>
                      <span className="font-bold text-[#0c200d]">Ouaga</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-[#6e7b6c] font-bold mb-1">Distance</span>
                    <p className="font-['DM_Mono'] text-sm font-bold">360 km</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-[#bdcaba]/30">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#6e7b6c] text-lg">weight</span>
                    <span className="text-sm font-bold">500 kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#6e7b6c] text-lg">calendar_today</span>
                    <span className="text-sm font-bold">14 Oct. 2024</span>
                  </div>
                </div>
              </div>

              {/* Input Section: Tariff */}
              <div className="space-y-2 mb-6">
                <label className="block text-sm font-bold text-[#3e4a3d]">Votre tarif de livraison</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    className="w-full bg-[#f8faf8] border border-[#bdcaba] rounded-lg px-4 py-4 font-['DM_Mono'] text-xl focus:ring-2 focus:ring-[#006b2c] focus:border-transparent transition-all outline-none" 
                    placeholder="Ex: 15 000" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-['DM_Mono'] text-[#6e7b6c] font-bold">FCFA</div>
                </div>
                <p className="text-xs text-[#006b2c] font-medium flex items-center gap-1 mt-2">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Fourchette conseillée : <span className="font-['DM_Mono'] px-1 font-bold">12 000 - 18 000</span> FCFA
                </p>
              </div>

              {/* Input Section: Message */}
              <div className="space-y-2 mb-2">
                <label className="block text-sm font-bold text-[#3e4a3d]">Note à l'attention de l'acheteur (Optionnel)</label>
                <textarea 
                  className="w-full bg-[#f8faf8] border border-[#bdcaba] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006b2c] focus:border-transparent transition-all outline-none resize-none" 
                  placeholder="Précisez vos conditions ou votre disponibilité exacte..." 
                  rows="3"
                ></textarea>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-8 py-5 bg-[#f8faf8] flex items-center justify-end gap-4 border-t border-[#bdcaba]/20">
              <button onClick={() => setShowModal(false)} className="px-6 py-2.5 text-sm font-bold text-[#ba1a1a] hover:bg-[#ffdad6]/50 transition-colors rounded-lg">
                Annuler
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="px-8 py-2.5 bg-[#006b2c] text-white text-sm font-bold rounded-lg hover:bg-[#00873a] transition-all shadow-md active:scale-95 flex gap-2 items-center"
              >
                <span className="material-symbols-outlined text-[18px]">send</span> Envoyer mon offre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
