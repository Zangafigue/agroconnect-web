import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6e7b6c] mb-10">
        <Link to="/buyer/marketplace" className="hover:text-[#006b2c] transition-colors">Marché</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="hover:text-[#006b2c] transition-colors cursor-pointer">Céréales</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#0c200d] font-medium">Maïs sec</span>
      </nav>

      {/* Product Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-12 items-start">
        {/* LEFT COLUMN: IMAGES */}
        <section className="space-y-6">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#e1fbdc]">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCux-YXrKVaFTBYFpjhKT2EkSkS83kzwKCjESmaRbvB1nXaQHXEhyCLCRsyLvf9arwN10oSG3UFq08rUM72WvI_myBZFq_rjkn4Uuh8tjXVmVSKl5zLgrQqEyFDtwqfTqYEUl-VPAEm8q7KVfvryFXnVsjrpjtGUWh9tOhlF4xlDcOyNnet5eKvWMt31IGRb3HFl640rrJ6elDhr8fUgrEEh7nXszmaposn1zYU7n4a50Rv4iQDiVjk2gH2pdC2ukinl1hsapyFb0Y" alt="Maïs sec" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-[#ffdbca] text-[#331200] text-[10px] font-bold rounded-full uppercase tracking-wider">Céréales</span>
              <span className="px-3 py-1 bg-[#006b2c] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">DISPONIBLE</span>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              'AB6AXuCRoadC7j-zl7p5QIuPgodMGBv8bOelUa7un_yr2PP4h7FoHxt24LX7ja5Qb2OROIkWJ62ByQ9Zt7D81Vnr3Y632EhdRprmqjnqYfDTkN844CwxjhIrNxdfFuJB0L24OHFFwsqnobCQpUkafpcKGie3JTmxgP9D1I2m4z_Hw68f5yAGSfOk64Cnz5ViRiUvoDDCElkostD29I8Q585zHCOHAXAb6gjNOy5Id08T3olVtxi7wOkY-7_JUqPMpf98ae_y2wcU-2r1GDA',
              'AB6AXuBVmoyCPz4rJe_ddtDOWd0MfTWBLQIOzyVBnX70djxabtWlYQ_PXohcV6p4P_sgl9S2xm4b4XWik_vLSXWmia2MJh5lMs5B9N8oL5XSUMu1eRMZTNs2KNBRQjI6f5r3DHYeDhftnGTlYAYx6xNaxYbCCZzbTrguWH3rRAWCnHCR9EnzF8kfWI3uhO0aH-aW369hug2_bLKrz5kk_eyeKWQWWBxcwYqVFvT0piL9zgL0YAAvu_NhNd8c1CyMtztPLV0ZR0Klrk4nGpg',
              'AB6AXuBxmciXWC3ZhXHLZ74NKBKeSk7MU6r_CVGs8gzSaOVwCQSrmmaD7nut5CkHV6VbTeTclyVS5BWPTfOyno952v6aKWV6gj9WEhN-niCgNeQao3Jh3jIjaOBZwiR1p3hSjLmH6k2CqY2eZ65XI-MFsQKYk55bLkjqRB8HnqVEyL4DSGyvGqvFd5QV2bS9rmsTsCTQkQsAXiG2T5ocOvqMxR6vefKCKD4pcLtkUwxAM_WPhOMYZX5yRlbbl-IEUeZ69HQWDiEx4lE9gUA',
              'AB6AXuC0HGiALM8mrKYROurOOavHfYu6J2m81Gd7Iyadgijz2wvmvwAcVvGlT7vUFuyjZIvYPjc5bhgEeAvC1Dpz5dqdEn2gIlW6EngTRIsHislo-w3HkGg_ZVUBqfmUgWJ61MO6Ylgp-0NCwAfVMVqhOkMfg8CLfx7TNTMVJX2P4dxjy8W__Yx_sQrEbf-opS6-PzO9rVOv_rMvajZ3I8QaTtsEOlocdXT1mvCO1iyKB6pL3ZHVgLgphdgYzHeO2QwykE0eBLcW4Ahpkyw'
            ].map((img, idx) => (
              <button key={idx} className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 ${idx === 0 ? 'border-[#006b2c] ring-2 ring-[#006b2c]/20' : 'border-[#bdcaba] hover:border-[#006b2c] transition-colors'}`}>
                <img src={`https://lh3.googleusercontent.com/aida-public/${img}`} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Description & Specifics */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-['DM_Serif_Display'] text-[#0c200d]">Description du produit</h2>
            <p className="text-[#3e4a3d] leading-relaxed text-lg font-body">
              Notre maïs jaune est cultivé dans la région des Hauts-Bassins selon des méthodes traditionnelles garantissant une teneur nutritionnelle élevée. Séché naturellement au soleil, ce grain est idéal pour la transformation industrielle ou la consommation directe.
            </p>
            <ul className="grid grid-cols-2 gap-4">
              {[
                'Variété : Maïs Jaune Local',
                'Récolte : Janvier 2025',
                'Humidité : < 12%',
                'Conditionnement : Sacs 100kg'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-[#3e4a3d]">
                  <span className="material-symbols-outlined text-[#006b2c]">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-['DM_Serif_Display'] text-[#0c200d]">Provenance</h2>
            <div className="h-[220px] rounded-xl overflow-hidden bg-[#d6efd0] relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5E0Y1xemAaNDeXRjb2uzAgfTOj1regFbuAp2bQKDt-7-S_eERnclUvLOfDAtnWYm5PGdiTnXQLdqmr1Tgkio5WzEAGePjGhjreKYuJv6drF0bYDC3fJCzSmnJnOY20cSX_XlVpSHoZQmvt_vBT4yq0E6ZYwlqrhz9obUcObelqtjkZwm5NcmQqmIykWZi9WM60AnQUr6hsH2xpeEFGgR7eooRMi6yTrjcu1AxizqO6hpq3gNBbwE9xTH9xJsd554UVwvEun6TGts" alt="Bobo-Dioulasso" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <span className="material-symbols-outlined text-[#006b2c] text-3xl fill-current">location_on</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                Bobo-Dioulasso, Burkina Faso
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: INFO & CTA */}
        <aside className="sticky top-28 space-y-8">
          <div>
            <h1 className="text-4xl font-['DM_Serif_Display'] text-[#0c200d] leading-tight mb-4">Maïs sec de qualité supérieure</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-mono font-medium text-[#006b2c]">5 000 FCFA</span>
              <span className="text-[#3e4a3d] text-lg">/ sac (100kg)</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#006b2c] font-medium">
              <span className="material-symbols-outlined">inventory_2</span>
              <span>Stock disponible : 500 kg (50 sacs)</span>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bdcaba]/30 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#984300] flex items-center justify-center text-white font-bold text-lg">
              AK
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[#0c200d] text-lg font-bold">Amadou Kaboré</h3>
                <div className="flex items-center text-amber-600 gap-1">
                  <span className="material-symbols-outlined text-sm fill-current">star</span>
                  <span className="text-sm font-bold">4.8</span>
                </div>
              </div>
              <p className="text-[#3e4a3d] text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                Bobo-Dioulasso
              </p>
            </div>
          </div>

          {/* Order Zone */}
          <div className="bg-[#f0fdf4] border border-[#006b2c]/20 rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-[#006b2c] flex items-center gap-2">
              <span className="material-symbols-outlined fill-current">shopping_bag</span>
              Commander ce produit
            </h3>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#3e4a3d]">Quantité à commander</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border border-[#006b2c] rounded-lg px-2 py-1">
                  <button className="p-2 text-[#006b2c] hover:bg-[#00873a]/10 rounded-md">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <div className="px-6 font-mono text-lg font-bold">10 sacs</div>
                  <button className="p-2 text-[#006b2c] hover:bg-[#00873a]/10 rounded-md">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              <p className="text-[#6e7b6c] text-sm italic font-medium">
                = 1 000 kg · Total estimé : <span className="font-mono text-[#0c200d]">50 000 FCFA</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#3e4a3d]">Budget livraison estimé (Optionnel)</label>
              <div className="relative">
                <input type="text" className="w-full bg-white border-[#bdcaba] rounded-lg px-4 py-3 text-[#0c200d] font-mono focus:ring-[#006b2c] focus:border-[#006b2c]" placeholder="Entrez un montant" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e7b6c] font-medium">FCFA</span>
              </div>
              <p className="text-xs text-[#6e7b6c] leading-relaxed flex items-start gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Aidez le transporteur à évaluer vos besoins pour une proposition plus rapide.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Link to="/buyer/payment" className="w-full bg-[#006b2c] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-[#00873a] transition-all shadow-md active:scale-95">
                <span className="material-symbols-outlined">shopping_cart</span>
                Commander maintenant
              </Link>
              <button className="w-full border-2 border-[#006b2c] text-[#006b2c] py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-[#006b2c]/5 transition-all active:scale-95">
                <span className="material-symbols-outlined">forum</span>
                Négocier le prix
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* SIMILAR PRODUCTS SECTION */}
      <section className="mt-24">
        <h2 className="text-3xl font-['DM_Serif_Display'] mb-8">Produits similaires dans la région</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: 'AB6AXuASejqY5UwuTWWrPYrtVq1xmzYDjBRtWc2saNVjM3E_eOljpFK4lleURLRXcKJ5Ml0BLY9sDd1Am0R1bwiitGvGHcl_Qu87stfHKOtMmjhRMeOmLbRyF1CDmU7viCFdpf6d_W5awACwzApJ00w7AuEaskewvLUq39N9iK9Db_gyUDHMtorHAy_OL0vrxhKZqGbnnIjWEb21VqtoRALa0AF9_6_Jma2jbNpWbZlAIo0A46z2RbUG-MYmfVYvrvoWSMMmQdO-SgDcEWw', title: 'Sorgho Blanc Premium', price: '4 200', loc: 'Banfora' },
            { img: 'AB6AXuChI8t67pqMDWZbsyg_7RjNAuS3r6xp-04VIOCQt2xiZjLLRE2hziVNvADRROi1bvYevUrkSbBZ8X_o4KSa4zeL5z4eQVf_ydqt-IqEWXhZSd6q5p9-pwZi71N2fNgHCbu6K0OppEXwjAIw4s55zm-n2brFajKP4Hnvl1jdEWqvGhdmeQd0434umkhzDcDjbOeRMEI6Cpx7uQbzvqzG8gcLRAqZmHgk71h-9Y8cS9bxoeG-WPsOhNX2shnEPraHW3jPTOS2T0334JE', title: 'Maïs Blanc Local', price: '5 500', loc: 'Bobo-Dioulasso' },
            { img: 'AB6AXuD3-FRpE9SfYNL2mdzLrIkZBlc1_Ck7kLBRbH4Ndb5_MFO9KMyMMXetZ0itHtX3fxjz1W0eUJaJNmsEhPe-b63vzi6-feyDD9tA0S_KIHRd-vmsRtO3jvgm2XMFLmdUgNTRl8hLPd_bnEmxeNxIkMx2blhmfW5A-gW3t4H-5pm_KPxmqnfID3y2GdIs_zCls9y-kKOKjnscxU3ZXcL6RnGN5rrV6sR3BbS79Eu3yBc261xJ0GBEyNyL3wPSUKIlpuV4rbZH2bmKEaM', title: 'Petit Mil du Nord', price: '6 000', loc: 'Dédougou' },
            { img: 'AB6AXuAgTWYBOR1h6smMVmV8adk-3oMmnm5sPpeJECloGScuac6DyB2BClnphwtmLaFiXoKkd31MEF8NdJZiE9E4MyGl5LotbYlUZrbOF8l-wX7dCtZKuFye79hk4Y-uVT2DH9UuDL65ALz2xBKRikMoedmTb7xx7aor70CA1BMJQyPdffvji8WsfVWWFv72vw5nx4LRyWOMWHqUA8VyIcZFHBkaPipFdZs9f5krDNjPvhf7k_NEinwWKsmK7H3Ss3FUIcSCFjerlK2jP8I', title: 'Fonio Décortiqué', price: '8 500', loc: 'Orodara' },
          ].map((prod, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden border border-transparent hover:border-[#006b2c]/20 hover:shadow-lg transition-all group">
              <div className="h-48 relative overflow-hidden">
                <img src={`https://lh3.googleusercontent.com/aida-public/${prod.img}`} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-bold text-[#0c200d]">{prod.title}</h4>
                <div className="font-mono text-[#006b2c] font-bold">{prod.price} FCFA <span className="text-[10px] text-[#6e7b6c]">/sac</span></div>
                <p className="text-xs text-[#bdcaba] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  {prod.loc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
