import React from 'react';
import { useAuthStore } from '../../store/authStore';

export default function MessagingPage() {
  const { user } = useAuthStore();
  const userInitials = user?.name ? user.name.substring(0, 2).toUpperCase() : 'US';

  return (
    <div className="bg-[#ebffe5] min-h-[calc(100vh-4rem)] flex flex-col font-['Plus_Jakarta_Sans'] text-[#0c200d]">
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        {/* COLONNE GAUCHE: Liste des conversations */}
        <aside className="w-[320px] lg:w-[360px] bg-white border-r border-[#bdcaba]/30 flex flex-col z-10">
          <div className="p-6 bg-white border-b border-[#bdcaba]/20">
            <h1 className="font-['DM_Serif_Display'] text-3xl mb-4 text-[#0c200d]">Messages</h1>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7b6c]">search</span>
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#e1fbdc]/50 border-none rounded-xl focus:ring-2 focus:ring-[#006b2c]/20 text-sm font-medium outline-none transition-all" 
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Active Conversation */}
            <div className="relative flex items-center p-4 bg-[#e1fbdc]/40 border-l-4 border-[#006b2c] cursor-pointer transition-colors hover:bg-[#e1fbdc]/60">
              <div className="w-12 h-12 rounded-full bg-[#2e6a41] flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 shadow-inner">
                FT
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[#0c200d] truncate">Fatima T.</h3>
                  <span className="text-[10px] font-bold text-[#6e7b6c] uppercase tracking-wider">2h</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#3e4a3d] truncate pr-2 font-medium">Je peux vous proposer 4 500 FCFA/sac</p>
                  <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">2</span>
                </div>
                <span className="text-[10px] font-bold text-[#2e6a41] uppercase tracking-tighter mt-1 block">Acheteur</span>
              </div>
            </div>

            {/* Inactive Conversations */}
            <div className="flex items-center p-4 hover:bg-[#f8faf8] cursor-pointer transition-colors border-l-4 border-transparent border-b border-[#bdcaba]/10">
              <div className="w-12 h-12 rounded-full bg-[#b1f2be] flex-shrink-0 flex items-center justify-center text-[#00210d] font-bold mr-3 shadow-inner">
                IS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[#0c200d] truncate">Ibrahim S.</h3>
                  <span className="text-[10px] font-medium text-[#6e7b6c] uppercase tracking-wider">Hier</span>
                </div>
                <p className="text-sm text-[#6e7b6c] truncate font-medium">Quand serez-vous disponible ?</p>
                <span className="text-[10px] font-bold text-[#2e6a41] uppercase tracking-tighter mt-1 block">Acheteur</span>
              </div>
            </div>

            <div className="flex items-center p-4 hover:bg-[#f8faf8] cursor-pointer transition-colors border-l-4 border-transparent border-b border-[#bdcaba]/10">
              <div className="w-12 h-12 rounded-full bg-[#006b2c] flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 shadow-inner">
                MD
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[#0c200d] truncate">Moussa D.</h3>
                  <span className="text-[10px] font-medium text-[#6e7b6c] uppercase tracking-wider">2j</span>
                </div>
                <p className="text-sm text-[#6e7b6c] truncate font-medium">Le stock est prêt à être collecté</p>
                <span className="text-[10px] font-bold text-[#006b2c] uppercase tracking-tighter mt-1 block">Producteur</span>
              </div>
            </div>
          </div>
        </aside>

        {/* COLONNE DROITE: Chat Area */}
        <section className="flex-1 bg-[#e1fbdc]/20 flex flex-col relative w-full border-l border-white/50">
          {/* Chat Header */}
          <header className="h-[88px] px-8 bg-white flex justify-between items-center border-b border-[#bdcaba]/30 z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2e6a41] flex items-center justify-center text-white font-bold text-sm shadow-inner">
                FT
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#0c200d] leading-tight">Fatima T.</h2>
                <span className="text-[10px] font-bold text-[#2e6a41] uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006b2c] animate-pulse"></span>
                  Acheteur • En ligne
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#f8faf8] p-1.5 rounded-xl border border-[#bdcaba]/20">
              <button className="w-10 h-10 flex items-center justify-center text-[#006b2c] hover:bg-[#e1fbdc] rounded-lg transition-all active:scale-95">
                <span className="material-symbols-outlined">call</span>
              </button>
              <div className="w-px h-6 bg-[#bdcaba]/30"></div>
              <button className="w-10 h-10 flex items-center justify-center text-[#6e7b6c] hover:bg-[#e1fbdc] rounded-lg transition-all active:scale-95">
                <span className="material-symbols-outlined">info</span>
              </button>
            </div>
          </header>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23006b2c\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}>
            <div className="flex justify-center my-2">
              <span className="px-4 py-1.5 rounded-full bg-white border border-[#bdcaba]/30 text-[#6e7b6c] text-[10px] font-bold uppercase tracking-widest shadow-sm">Aujourd'hui</span>
            </div>

            {/* Received Message */}
            <div className="flex flex-col items-start max-w-[75%] md:max-w-[60%]">
              <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-[#bdcaba]/20 relative">
                <p className="text-[#3e4a3d] font-medium leading-relaxed">Bonjour, concernant votre annonce pour le maïs sec, je souhaiterais discuter du prix pour un gros volume.</p>
                <div className="flex justify-end items-center gap-1 mt-2">
                  <span className="text-[10px] text-[#6e7b6c] font-['DM_Mono'] font-bold">10:34</span>
                </div>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex flex-col items-end self-end max-w-[75%] md:max-w-[60%]">
              <div className="bg-[#006b2c] text-white p-4 rounded-2xl rounded-tr-sm shadow-md relative">
                <p className="font-medium leading-relaxed">Bonjour Fatima, je vous écoute pour votre proposition.</p>
                <div className="flex justify-end items-center gap-1 mt-2 text-white/70">
                  <span className="text-[10px] font-['DM_Mono'] font-bold">10:36</span>
                  <span className="material-symbols-outlined text-[14px]">done_all</span>
                </div>
              </div>
            </div>

            {/* Pricing Offer Card (Bulle Offre) */}
            <div className="flex flex-col items-start max-w-[420px] w-full">
              <div className="bg-white border-2 border-[#006b2c] p-6 rounded-2xl rounded-tl-sm shadow-lg w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="material-symbols-outlined text-6xl text-[#006b2c]">payments</span>
                </div>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <span className="material-symbols-outlined text-[#984300] bg-[#ffdbca] p-1.5 rounded-lg">payments</span>
                  <h4 className="font-['DM_Serif_Display'] text-xl text-[#0c200d]">Offre de prix</h4>
                </div>
                <div className="mb-6 space-y-2 relative z-10">
                  <div className="flex justify-between items-baseline bg-[#f8faf8] p-3 rounded-lg border border-[#bdcaba]/20">
                    <span className="text-sm font-bold text-[#6e7b6c]">Prix Unitaire</span>
                    <span className="font-['DM_Mono'] font-bold text-[#006b2c] text-lg">4 500 FCFA / sac</span>
                  </div>
                  <div className="flex justify-between items-baseline p-3 bg-[#e1fbdc]/50 rounded-lg border border-[#006b2c]/20">
                    <span className="text-sm font-bold text-[#0c200d]">Total (100 sacs)</span>
                    <span className="font-['DM_Mono'] font-bold text-[#0c200d] text-xl">450 000 FCFA</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 relative z-10">
                  <button className="flex items-center justify-center gap-2 py-2.5 bg-[#006b2c] text-white rounded-xl font-bold text-sm hover:bg-[#00873a] active:scale-95 transition-all shadow-md shadow-[#006b2c]/20">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Accepter
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border-2 border-[#ba1a1a] text-[#ba1a1a] rounded-xl font-bold text-sm hover:bg-[#ffdad6]/50 active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    Refuser
                  </button>
                </div>
              </div>
              <div className="flex gap-1 ml-2 mt-1">
                <span className="text-[10px] text-[#6e7b6c] font-['DM_Mono'] font-bold">10:42</span>
              </div>
            </div>
          </div>

          {/* Chat Footer */}
          <footer className="p-6 bg-white border-t border-[#bdcaba]/30 z-10">
            <div className="flex items-center gap-3 bg-[#f8faf8] p-2 pr-3 rounded-2xl border border-[#bdcaba]/40 focus-within:border-[#006b2c] focus-within:ring-2 focus-within:ring-[#006b2c]/10 transition-all shadow-sm">
              <button className="w-10 h-10 flex items-center justify-center text-[#984300] bg-[#ffdbca]/50 hover:bg-[#ffdbca] rounded-xl transition-all">
                <span className="material-symbols-outlined text-[20px]">attach_money</span>
              </button>
              <input 
                type="text"
                placeholder="Écrire un message..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-[#0c200d] px-2 outline-none" 
              />
              <button className="flex items-center justify-center w-12 h-12 bg-[#006b2c] text-white rounded-xl hover:bg-[#00873a] active:scale-95 transition-all shadow-md shadow-[#006b2c]/20">
                <span className="material-symbols-outlined text-[20px] ml-1">send</span>
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
