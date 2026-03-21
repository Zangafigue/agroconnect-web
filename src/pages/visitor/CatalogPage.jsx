import { Link, useNavigate } from 'react-router-dom';

export default function CatalogPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen border-t-0 p-0">
      <nav className="fixed top-0 w-full z-50 bg-emerald-50/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <Link to="/" className="text-2xl font-serif font-black text-emerald-800 dark:text-emerald-400 italic">AgroConnect BF</Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/catalog" className="text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 font-bold pb-1">Market</Link>
            <Link to="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Producers</Link>
            <Link to="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">How it works</Link>
            <Link to="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">News</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/login')} className="px-5 py-2 text-emerald-800 font-semibold hover:bg-emerald-100/50 rounded-lg transition-all active:scale-95 duration-150">Connexion</button>
            <button onClick={() => navigate('/register')} className="px-5 py-2 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 duration-150">S'inscrire</button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 max-w-screen-2xl mx-auto px-8">
        <section className="bg-[#f8faf8] p-6 mb-12 rounded-xl flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[52px]">
            <input className="w-full h-full pl-6 pr-36 bg-surface-container-lowest outline-none rounded-xl text-on-surface shadow-sm focus:ring-2 focus:ring-primary transition-all placeholder:text-outline" placeholder="Rechercher un produit..." type="text"/>
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-8 bg-[#16a34a] text-white font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">search</span>
              Rechercher
            </button>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-[260px] flex-shrink-0">
            <div className="lg:sticky lg:top-28 space-y-10">
              <div>
                <h2 className="font-headline text-3xl font-bold text-on-surface mb-6">Filtres</h2>
                
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Catégories</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 ring-0 outline-none" type="checkbox"/>
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors">Céréales</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 ring-0 outline-none" type="checkbox"/>
                      <span className="text-on-surface font-semibold">Légumes</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 ring-0 outline-none" type="checkbox"/>
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors">Fruits</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 ring-0 outline-none" type="checkbox"/>
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors">Tubercules</span>
                    </label>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Localisation</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 border-outline-variant text-primary focus:ring-primary/20 outline-none" name="loc" type="radio"/>
                      <span className="text-on-surface-variant">Ouagadougou</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input defaultChecked className="w-5 h-5 border-outline-variant text-primary focus:ring-primary/20 outline-none" name="loc" type="radio"/>
                      <span className="text-on-surface font-semibold">Bobo-Dioulasso</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 border-outline-variant text-primary focus:ring-primary/20 outline-none" name="loc" type="radio"/>
                      <span className="text-on-surface-variant">Koudougou</span>
                    </label>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Prix (FCFA)</h3>
                  <input className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" type="range"/>
                  <div className="flex justify-between mt-2 text-xs font-mono text-outline">
                    <span>0</span>
                    <span>50 000+</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Disponibilité</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" value=""/>
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className="ms-3 text-sm font-medium text-on-surface">En stock uniquement</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div onClick={() => navigate('/catalog/1')} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer border border-transparent hover:border-surface-variant">
                <div className="relative h-[180px] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Frais épis de maïs jaune sur étal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwfLGFKyso6X9spuQRF_-Gt5U32IjM7UMFVBM9mQZFeNM74NCb5lgzjFrE1JACT6BB4ZJqBFJFCKtRkLszCg-A4oQnhQN6q6Blb5wuFwjlbwOhy3GQtFu1Q51J_8NtnzWZZwrpSAcc2VOZORJsHH-zL02n4LAY3fhcInsr8HLR5M8Y9FTWTHvXq18esyakkOJMyu5a2aEwqilUJb-GfH0gNgpVQg60SVguFeshWsxWeWGeVhDbrn6hdd0qGVpeBL1g-rP2tWPmWL0"/>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold tracking-tighter rounded-full">DISPONIBLE</div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">MK</div>
                    <span className="text-xs text-outline font-medium">Moussa Kaboré</span>
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface leading-tight mb-2">Maïs Blanc de Saison</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-mono font-bold text-primary">5 000</span>
                    <span className="text-xs font-mono text-primary">FCFA / Sac</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-outline mb-6">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Bobo-Dioulasso
                  </div>
                  <button className="w-full py-2.5 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all">Voir les détails</button>
                </div>
              </div>

              <div onClick={() => navigate('/catalog/2')} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer border border-transparent hover:border-surface-variant">
                <div className="relative h-[180px] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Grappe de tomates rouges mûres" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdyL79Apw0VTsvR4lzRkLAFe-XmOtFg29Bjirft9Tp5GbIshX-L-LpuH9Xpl8Or1nyJoT8L4T3sZ8dd6PVqyJqC-ofucdt6EdOa-s7cijtC36IlHpj1nugKisDOdUpy50ZHTnQTAsYp-Zmi5hVsiG-SHFMsDT8ctl2yHgZIZmTLtjYSZb9sFQuwbm_xCV5SohlbZUCsu0tZZV3dJuZhasMOYuuP4itzaaA0lTWBFObjVxRPyAEXEZZnWA8CwdWpbDEnYfoeYQN18g"/>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold tracking-tighter rounded-full">DISPONIBLE</div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-white">AS</div>
                    <span className="text-xs text-outline font-medium">Alizeta Sawadogo</span>
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface leading-tight mb-2">Tomates Cerises Bio</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-mono font-bold text-primary">2 500</span>
                    <span className="text-xs font-mono text-primary">FCFA / Cagette</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-outline mb-6">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Loumbila
                  </div>
                  <button className="w-full py-2.5 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all">Voir les détails</button>
                </div>
              </div>

              <div onClick={() => navigate('/catalog/3')} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer border border-transparent hover:border-surface-variant">
                <div className="relative h-[180px] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Tas de pommes de terre terreuses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzEHJXajWuYyZti0i0y0mBmxH97pnZpjwdhwMF-VOpydT7OQQQxuae1Lkas7aIdbR-JG95CjgdIBwzAJSTbsMdNMpW-PR161S2IuahGa_6-Y6nw0lxopQ4iA25NZYrOdIZUFaDePrKhqMf2B1JFo3GeqXeeMjhETY1r6Zw9FlpTM01zZxOutW1GJ9YE80rSuFLTz-dpjlJGrD-JURiCpjZgSqO2-CFr1kTuD-A66vpFtWClWInh53M6XHKoLr_EgxmXJcmwUxdZS8"/>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold tracking-tighter rounded-full">DISPONIBLE</div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-tertiary flex items-center justify-center text-[10px] font-bold text-white">ID</div>
                    <span className="text-xs text-outline font-medium">Issa Diallo</span>
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface leading-tight mb-2">Pommes de Terre Grosse Taille</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-mono font-bold text-primary">7 500</span>
                    <span className="text-xs font-mono text-primary">FCFA / Filet</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-outline mb-6">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Bobo-Dioulasso
                  </div>
                  <button className="w-full py-2.5 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all">Voir les détails</button>
                </div>
              </div>

              <div onClick={() => navigate('/catalog/4')} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer border border-transparent hover:border-surface-variant">
                <div className="relative h-[180px] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Carottes fraîches" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZp0VJ4oMeVSv-Y29LLCj-5Ea4JvPOR6FNcRpeOrht_UsxxCuHuYaS1p708U_Hs7_Co_TERzm79YcbnbzY5hR83MKCvxQtiEZpaHcqdpycMFsTuY4dtz-dhRaa4uUK9-P2YpMlwcPaH_xXXPhOYOK71P7hqtBV8nT82GJ5ix7oIunsTGV79sT09PQGRYvpUOti_rgOzwvt3YdgZayExNohFpJVEuiOUCIp-ujqGCHVZiON9q582ryk8B56GI9IofVEFB5ncblTY7c"/>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold tracking-tighter rounded-full">DISPONIBLE</div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">YK</div>
                    <span className="text-xs text-outline font-medium">Yacouba Koné</span>
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface leading-tight mb-2">Carottes de Plaine</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-mono font-bold text-primary">3 000</span>
                    <span className="text-xs font-mono text-primary">FCFA / Botte</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-outline mb-6">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Banfora
                  </div>
                  <button className="w-full py-2.5 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all">Voir les détails</button>
                </div>
              </div>

            </div>

            <div className="mt-16 flex justify-center items-center gap-2">
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant text-outline hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold shadow-md">1</button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">2</button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">3</button>
              <span className="px-2 text-outline">...</span>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">12</button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant text-outline hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-emerald-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 gap-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-serif text-lg font-bold text-emerald-900 dark:text-emerald-100 italic">AgroConnect BF</div>
            <p className="font-sans text-sm tracking-wide text-zinc-600 dark:text-zinc-400">© 2024 AgroConnect BF. L'Agronome Éditorial.</p>
          </div>
          <div className="flex gap-8">
            <Link to="#" className="font-sans text-sm tracking-wide text-zinc-500 hover:text-emerald-600 transition-opacity duration-200 hover:underline decoration-emerald-500 underline-offset-4">Contact</Link>
            <Link to="#" className="font-sans text-sm tracking-wide text-zinc-500 hover:text-emerald-600 transition-opacity duration-200 hover:underline decoration-emerald-500 underline-offset-4">Mentions Légales</Link>
            <Link to="#" className="font-sans text-sm tracking-wide text-zinc-500 hover:text-emerald-600 transition-opacity duration-200 hover:underline decoration-emerald-500 underline-offset-4">Partenaires</Link>
            <Link to="#" className="font-sans text-sm tracking-wide text-zinc-500 hover:text-emerald-600 transition-opacity duration-200 hover:underline decoration-emerald-500 underline-offset-4">Aide</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
