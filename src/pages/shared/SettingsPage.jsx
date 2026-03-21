import React from 'react';
import { useAuthStore } from '../../store/authStore';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#ebffe5] min-h-[calc(100vh-4rem)] text-[#0c200d] font-['Plus_Jakarta_Sans'] flex">
      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 transition-all">
        <div className="max-w-[700px] mx-auto pb-12">
          <h1 className="font-['DM_Serif_Display'] text-5xl text-[#0c200d] mb-12 tracking-tight flex items-center gap-4">
            <span className="text-4xl">⚙️</span> Paramètres
          </h1>
          
          <div className="space-y-10">
            {/* Section: Apparence */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6e7b6c] mb-4 ml-1">Apparence</h3>
              <div className="bg-white rounded-2xl shadow-sm border border-[#bdcaba]/20 overflow-hidden">
                <div className="flex items-center justify-between p-5 hover:bg-[#f8faf8] transition-colors cursor-pointer border-b border-[#bdcaba]/10 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e1fbdc]/50 flex items-center justify-center text-[#006b2c] group-hover:scale-105 transition-transform border border-[#006b2c]/10">
                      <span className="material-symbols-outlined">dark_mode</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0c200d]">Mode sombre</p>
                      <p className="text-sm font-medium text-[#6e7b6c]">Désactivé</p>
                    </div>
                  </div>
                  {/* Custom Toggle (Off) */}
                  <div className="w-14 h-7 bg-[#bdcaba]/50 rounded-full relative p-1 cursor-pointer hover:bg-[#bdcaba]/70 transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute left-1"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-5 hover:bg-[#f8faf8] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e1fbdc]/50 flex items-center justify-center text-[#006b2c] group-hover:scale-105 transition-transform border border-[#006b2c]/10">
                      <span className="material-symbols-outlined">translate</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0c200d]">Langue</p>
                      <p className="text-sm font-medium text-[#6e7b6c]">Français</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#6e7b6c] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
              </div>
            </section>

            {/* Section: Notifications */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6e7b6c] mb-4 ml-1">Notifications push (App ou Email)</h3>
              <div className="bg-white rounded-2xl shadow-sm border border-[#bdcaba]/20 overflow-hidden">
                
                <div className="flex items-center justify-between p-5 border-b border-[#bdcaba]/10 hover:bg-[#f8faf8] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <span className="material-symbols-outlined">assignment</span>
                    </div>
                    <p className="font-bold text-[#0c200d]">Activité sur mes produits/missions</p>
                  </div>
                  {/* Custom Toggle (On) */}
                  <div className="w-14 h-7 bg-[#006b2c] rounded-full relative p-1 cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute right-1"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-5 border-b border-[#bdcaba]/10 hover:bg-[#f8faf8] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#fff8e1] text-[#f59e0b] border border-[#fef3c7] flex items-center justify-center">
                      <span className="material-symbols-outlined">local_offer</span>
                    </div>
                    <p className="font-bold text-[#0c200d]">Nouvelles offres (prix, livraison)</p>
                  </div>
                  {/* Custom Toggle (On) */}
                  <div className="w-14 h-7 bg-[#006b2c] rounded-full relative p-1 cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute right-1"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 border-b border-[#bdcaba]/10 hover:bg-[#f8faf8] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e1fbdc] text-[#006b2c] border border-[#b1f2be] flex items-center justify-center">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <p className="font-bold text-[#0c200d]">Nouveaux messages</p>
                  </div>
                  {/* Custom Toggle (On) */}
                  <div className="w-14 h-7 bg-[#006b2c] rounded-full relative p-1 cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute right-1"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 hover:bg-[#f8faf8] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <p className="font-bold text-[#0c200d]">Paiements et portefeuille</p>
                  </div>
                  {/* Custom Toggle (Off) */}
                  <div className="w-14 h-7 bg-[#bdcaba]/50 rounded-full relative p-1 cursor-pointer hover:bg-[#bdcaba]/70 transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute left-1"></div>
                  </div>
                </div>

              </div>
            </section>

            {/* Section: Sécurité */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6e7b6c] mb-4 ml-1">Sécurité de la plateforme</h3>
              <div className="bg-white rounded-2xl shadow-sm border border-[#bdcaba]/20 overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-[#bdcaba]/10 cursor-pointer hover:bg-[#f8faf8] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e1fbdc]/30 flex items-center justify-center text-[#006b2c] border border-transparent group-hover:border-[#006b2c]/10">
                      <span className="material-symbols-outlined">lock_reset</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0c200d]">Changer mot de passe</p>
                      <p className="text-xs font-medium text-[#6e7b6c] mt-0.5">Dernière modification il y a 3 mois</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#6e7b6c] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
                <div className="flex items-center justify-between p-5 hover:bg-[#f8faf8] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e1fbdc]/30 flex items-center justify-center text-[#006b2c]">
                      <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0c200d]">Email vérifié</p>
                      <p className="font-['DM_Mono'] text-sm mt-0.5 text-[#3e4a3d] font-bold">{user?.email || 'contact@agriculteur.bf'}</p>
                    </div>
                  </div>
                  <span className="bg-[#e1fbdc] text-[#005320] px-4 py-1.5 rounded-full text-xs font-bold border border-[#006b2c]/20 uppercase tracking-widest shadow-sm">Actif</span>
                </div>
              </div>
            </section>

            {/* Section: Support & Légal */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6e7b6c] mb-4 ml-1">Support & Légal</h3>
              <div className="bg-white rounded-2xl shadow-sm border border-[#bdcaba]/20 overflow-hidden">
                <div className="p-5 border-b border-[#bdcaba]/10 flex justify-between items-center cursor-pointer hover:bg-[#f8faf8] transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#6e7b6c] group-hover:text-[#006b2c]">contact_support</span>
                    <span className="font-bold text-[#0c200d]">Centre d'aide en ligne</span>
                  </div>
                  <span className="material-symbols-outlined text-[#6e7b6c] text-sm">launch</span>
                </div>
                <div className="p-5 border-b border-[#bdcaba]/10 flex justify-between items-center cursor-pointer hover:bg-[#f8faf8] transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#6e7b6c] group-hover:text-[#006b2c]">policy</span>
                    <span className="font-bold text-[#0c200d]">Conditions d'Utilisation (CGU)</span>
                  </div>
                  <span className="material-symbols-outlined text-[#6e7b6c] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
                <div className="p-5 border-b border-[#bdcaba]/10 flex justify-between items-center cursor-pointer hover:bg-[#f8faf8] transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#6e7b6c] group-hover:text-[#006b2c]">privacy_tip</span>
                    <span className="font-bold text-[#0c200d]">Politique de Confidentialité</span>
                  </div>
                  <span className="material-symbols-outlined text-[#6e7b6c] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
                <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-[#ffdad6]/20 transition-colors group bg-white">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#ba1a1a]">report_problem</span>
                    <span className="font-bold text-[#ba1a1a]">Signaler un problème technique</span>
                  </div>
                  <span className="material-symbols-outlined text-[#ba1a1a] opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all text-sm">open_in_new</span>
                </div>
              </div>
            </section>

            <button 
              onClick={handleLogout}
              className="w-full bg-white border-2 border-[#ba1a1a] text-[#ba1a1a] font-bold py-4 rounded-2xl hover:bg-[#ba1a1a] hover:text-white transition-all uppercase tracking-widest mt-12 flex items-center justify-center gap-3 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">logout</span>
              Déconnexion du compte
            </button>
            <p className="text-center text-[#6e7b6c] text-xs font-bold mt-4 uppercase tracking-widest">AgroConnect BF — Version 1.0.0</p>
          </div>
        </div>
      </main>

      {/* Right Sub-panel (Language Selection Widget) */}
      <aside className="hidden lg:flex w-80 bg-white border-l border-[#bdcaba]/30 p-8 flex-col gap-8 rounded-tl-3xl shadow-[-4px_0_24px_rgba(12,32,13,0.02)] min-h-[calc(100vh-4rem)]">
        <div>
          <h4 className="font-['DM_Serif_Display'] text-2xl mb-3 text-[#0c200d]">Choisir la langue</h4>
          <p className="text-sm text-[#3e4a3d] font-medium leading-relaxed">Personnalisez votre interface avec la langue de votre choix.</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#e1fbdc]/40 text-[#006b2c] rounded-2xl border-2 border-[#006b2c] cursor-pointer shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-sm">🇫🇷</span>
              <span className="font-bold">Français</span>
            </div>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-[#f8faf8] border-2 border-transparent hover:border-[#bdcaba]/30 rounded-2xl cursor-pointer transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-2xl opacity-70 group-hover:opacity-100 drop-shadow-sm">🇺🇸</span>
              <span className="font-bold text-[#0c200d]">English</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#f8faf8] border border-[#bdcaba]/20 rounded-2xl cursor-not-allowed opacity-60">
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-sm grayscale">🇧🇫</span>
              <span className="font-bold text-[#6e7b6c]">Mooré</span>
            </div>
            <span className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-tighter bg-[#bdcaba]/30 px-2 py-1 rounded shadow-inner">Bientôt</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#f8faf8] border border-[#bdcaba]/20 rounded-2xl cursor-not-allowed opacity-60">
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-sm grayscale">🇧🇫</span>
              <span className="font-bold text-[#6e7b6c]">Dioula</span>
            </div>
            <span className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-tighter bg-[#bdcaba]/30 px-2 py-1 rounded shadow-inner">Bientôt</span>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-b from-[#e1fbdc]/50 to-white rounded-3xl border border-[#006b2c]/10 flex flex-col items-center text-center shadow-inner">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#006b2c] mb-4 shadow-sm border border-[#006b2c]/10">
            <span className="material-symbols-outlined text-3xl">translate</span>
          </div>
          <p className="text-[10px] font-bold text-[#006b2c] uppercase tracking-widest mb-2 border-b border-[#006b2c]/20 pb-2 w-full">Traduction collaborative</p>
          <p className="text-xs text-[#3e4a3d] font-medium leading-relaxed mb-4">Vous souhaitez aider à traduire l'app dans une langue locale Africaine ?</p>
          <button className="text-[#006b2c] text-xs font-bold underline hover:no-underline hover:text-[#00873a] transition-colors bg-white px-4 py-2 rounded-full border border-[#006b2c]/20 shadow-sm hover:shadow active:scale-95">Rejoindre l'équipe</button>
        </div>
      </aside>
    </div>
  );
}
