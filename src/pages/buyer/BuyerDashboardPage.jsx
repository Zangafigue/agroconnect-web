import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function BuyerDashboardPage() {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 space-y-12 pb-24 lg:pb-12">
      {/* Welcome & Search */}
      <section className="max-w-4xl space-y-8">
        <h1 className="text-5xl font-['DM_Serif_Display'] text-[#0c200d] leading-tight">
          Bonjour, {user?.name || 'Acheteur'} — Que cherchez-vous aujourd'hui ?
        </h1>
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#6e7b6c]">search</span>
          </div>
          <input 
            type="text" 
            className="w-full h-[52px] pl-14 pr-6 bg-white border-none shadow-xl shadow-emerald-900/5 rounded-xl text-lg focus:ring-2 focus:ring-[#006b2c] transition-all placeholder:text-[#6e7b6c]/60" 
            placeholder="Rechercher un produit, une ville, un producteur..." 
          />
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border-l-4 border-[#006b2c] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#e1fbdc] flex items-center justify-center text-[#006b2c] group-hover:bg-[#006b2c] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">shopping_basket</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#6e7b6c]">Commandes en cours</p>
              <p className="text-2xl font-mono font-bold">05</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-l-4 border-[#bb5810] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#ffdbca] flex items-center justify-center text-[#bb5810] group-hover:bg-[#bb5810] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#6e7b6c]">En livraison</p>
              <p className="text-2xl font-mono font-bold">01</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border-l-4 border-[#2e6a41] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#b1f2be] flex items-center justify-center text-[#2e6a41] group-hover:bg-[#2e6a41] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#6e7b6c]">Livrées</p>
              <p className="text-2xl font-mono font-bold">18</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border-l-4 border-[#6e7b6c] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#dcf5d6] flex items-center justify-center text-[#0c200d] group-hover:bg-[#0c200d] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#6e7b6c]">Portefeuille</p>
              <p className="text-2xl font-mono font-bold">0 FCFA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Shipment Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-['DM_Serif_Display'] text-[#0c200d]">Livraison en cours</h2>
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start">
          {/* Map Placeholder */}
          <div className="w-full lg:w-1/3 h-40 lg:h-56 bg-zinc-200 rounded-xl overflow-hidden relative group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6RdIerqwCYKDRcOlemiwkqrYz-EA5mrjQ8aJ0XZEoJJT1pwZ3BTI0QfeWE0uMFK45EFHYxL78PdbZtGT9UB6c_3Pb7Zf0vYUW49iVvxxb4JYSkA9mP1aUUIkJanmMUHXoNu-AbkMgtuyPtFDya4CPxyzfKNlNxQDM2T_3WT1UQnMIPeHNxTL9Ty9LvF3Neob6-lCfLRCnQyzJEil4Bo6ZXuA6E7Y5xrfuJZIFsxDLbSY52E2VPGLkRUmBe8iZ1SqZBnOYsIxtNlM" 
              alt="Carte de suivi" 
              className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" 
            />
            {/* Markers Overlay */}
            <div className="absolute inset-0 p-4 pointer-events-none">
              <div className="absolute bottom-1/4 left-1/4 flex flex-col items-center">
                <span className="material-symbols-outlined text-[#006b2c] fill-current">location_on</span>
                <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">Bobo</span>
              </div>
              <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
                <span className="material-symbols-outlined text-[#ba1a1a] fill-current">location_on</span>
                <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">Ouaga</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <span className="material-symbols-outlined text-blue-600 fill-current">local_shipping</span>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wider">
                  <span className="material-symbols-outlined text-xs mr-1">local_shipping</span>
                  EN LIVRAISON
                </span>
                <p className="text-xl font-bold text-blue-900 mt-2">Koné Dramane est en route</p>
                <p className="text-blue-700/70 text-sm">Transporteur certifié AgroConnect</p>
              </div>
              <div className="flex gap-2">
                <button className="px-5 py-2.5 rounded-lg border border-blue-300 text-blue-700 hover:bg-blue-200/50 transition-colors flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-sm">chat</span> Contacter
                </button>
                <Link to="/buyer/orders" className="px-5 py-2.5 rounded-lg bg-[#006b2c] text-white hover:bg-[#00873a] transition-all flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-sm">visibility</span> Voir le détail
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/60 backdrop-blur-sm border border-white px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-lg">straighten</span>
                <span className="text-sm font-mono font-bold">360 km</span>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-white px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-lg">schedule</span>
                <span className="text-sm font-mono font-bold">~2h restant</span>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-white px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-lg">inventory_2</span>
                <span className="text-sm font-mono font-bold">500 kg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-['DM_Serif_Display'] text-[#0c200d]">Découvrez nos produits</h2>
          <Link to="/buyer/marketplace" className="text-[#006b2c] font-bold hover:underline flex items-center gap-1 group">
            Voir le catalogue
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: 'AB6AXuAQm1zyCkfvxLeGHU_O6gW-ZHJ9cUDxjvqLHhh8p9O4fHddwMyEJ9Kt3GLvKtDroAvVTk2qFKBXlLpkHbgFf_TeA5X342tpHahLaKhP_bca309PpV5IDlanOUX_oc08pEu2dNzD3bcsqwFb1TnLrrRkBCpfEKsMbd0beflRuVAi2RWmSAADF2PuUwyC_9z5iib1ECQCtOaCtQD8Pt28zUI6thXlR4XMFQFsm74wmQBm-SRvKBFHFd1nnhp0Jb84-aBh6p2dhP1ZNK0', title: 'Maïs Jaune Premium', price: 185 },
            { img: 'AB6AXuDqhgxYyenCAFQyKzWXxLpC9zl_58-0eD7X5gevDc3T1afWwNCoFv0TMX0VE8eSoym_BzMn5Dk_xYIWi7aUFPI5WNyc3hW5AplWNGcZMSkQ8PMv_gITulBROzuzZqtronJPwpAt8sBqG_TdZsW0wmjdgqDafkQuJRA0RsjSNpGFa1jSZXEgm_WKDka4NoCbC5HxfOqi7IS4zrm2H1Q2UGoPouMOu1PRoPVaXRJmFiLu5zzvwoLa6R8MSHOeBXyDQBKuF1EzE7foLcU', title: 'Tomate de Loumbila', price: 450 },
            { img: 'AB6AXuCg1zMvMXDgP_NsLrPWt51n_uakmIdUElmZ4ZDqgATdt5pYH7dnzUtYOGX2PtOW67wNu2cPbm6MxC1vtnDEYjW4P2W7V2VZUvkd9YeXmTjVYwDcIBrYcsC0V171ZkYpEEbQTMu_0qEJK01F3WJSU3BgoaskJ2JsBz45FaxCmozry0LD1bVfwLEPdgTy9Oa3MnpCmN9_ZZ7yd7poL30zyMV8aGb4E2bowSWZyZjtRGFv_tHh1HO-9pqQT6dqcH2-_4zr_I3lS01SZbs', title: 'Oignons Violets', price: 325 },
            { img: 'AB6AXuDQNCyp72HbtwfrxL6NmPPYxM4LkPBY9RVRH2rxTo74qgl9r8-nGWFrvm5kfcfPlZU8KhazkQ6fP5LAzEyME8Qtocj-aLalqIqLwqjl2QVO-2yqfEJBcZk1xn6yXocSeviayEBT7TQv5r4W8Hv2IvZ-hNDDGpK9D_mVajdnEoiob31MmP2EfiHB3oop3DmiBUptTukrjEJZm22Z7gJB_rI8iacRWV5WuETQ0c2G80DdS3VkLtjXJ29UUCqT-7NGfgRvSXL5jg_JPmQ', title: 'Sorgho Blanc', price: 210 },
          ].map((prod, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="h-40 overflow-hidden relative">
                <img src={`https://lh3.googleusercontent.com/aida-public/${prod.img}`} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {idx === 0 && <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[#006b2c]">BIO</div>}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-[#0c200d] truncate">{prod.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-mono font-bold text-[#006b2c]">{prod.price} FCFA<span className="text-[10px] font-normal text-[#6e7b6c]">/kg</span></span>
                  <button className="w-8 h-8 rounded-full bg-[#b1f2be] text-[#347047] flex items-center justify-center hover:bg-[#006b2c] hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
