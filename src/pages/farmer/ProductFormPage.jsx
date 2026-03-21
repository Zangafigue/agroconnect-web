import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductFormPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-32">
      <nav className="flex items-center gap-2 mb-4 text-outline text-[13px] font-medium">
        <Link className="hover:text-primary transition-colors" to="/farmer/products">Mes produits</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-background">Nouveau produit</span>
      </nav>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[2rem] text-primary flex items-center gap-3 font-serif" style={{fontFamily: "'DM Serif Display', serif"}}>
            <span>📦</span> Nouveau produit
          </h2>
          <p className="text-outline mt-1 font-medium">Mettez en vente vos récoltes et gérez vos stocks en temps réel.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-[#e5e7eb] rounded-2xl p-8 shadow-sm">
        <form className="space-y-12">
          {/* Photos Section */}
          <section>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-on-background">Photos du produit</h3>
              <p className="text-sm text-outline">Ajoutez jusqu'à 4 photos. Une photo de qualité augmente vos chances de vente.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-auto md:aspect-[4/1.2]">
              <div className="aspect-square md:aspect-auto bg-primary/5 border-2 border-dashed border-primary/40 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors group">
                <span className="material-symbols-outlined text-primary text-3xl mb-2 group-hover:scale-110 transition-transform">camera_alt</span>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Principale</span>
              </div>
              <div className="aspect-square md:aspect-auto bg-surface-container-low border-2 border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-outline text-2xl">add_a_photo</span>
              </div>
            </div>
          </section>

          {/* Informations Générales */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-on-background pb-2 border-b border-outline-variant/10">Informations générales</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-background uppercase tracking-tight">Nom du produit</label>
                <input className="bg-surface-container-low border-none rounded-lg p-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none" placeholder="Ex: Maïs blanc de Bobo" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-background uppercase tracking-tight">Description</label>
                <textarea className="bg-surface-container-low border-none rounded-lg p-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none resize-none" placeholder="Décrivez la qualité, le mode de production..." rows="4"></textarea>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-on-background uppercase tracking-tight">Catégorie</label>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-primary/20" type="button">
                  <span className="material-symbols-outlined text-sm">potted_plant</span> Céréales
                </button>
                <button className="px-4 py-2 bg-surface-container-low text-outline hover:bg-surface-container-high rounded-full text-sm font-medium flex items-center gap-2 transition-all" type="button">
                  <span className="material-symbols-outlined text-sm">eco</span> Légumes
                </button>
                <button className="px-4 py-2 bg-surface-container-low text-outline hover:bg-surface-container-high rounded-full text-sm font-medium flex items-center gap-2 transition-all" type="button">
                  <span className="material-symbols-outlined text-sm">nutrition</span> Fruits
                </button>
              </div>
            </div>
          </section>

          {/* Prix & Quantité */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-on-background pb-2 border-b border-outline-variant/10">Prix & Quantité</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-background uppercase tracking-tight">Prix unitaire (FCFA)</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-low border-none rounded-lg p-3 pr-16 focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none font-mono" placeholder="0.00" type="number" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-outline">FCFA</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-background uppercase tracking-tight">Unité de mesure</label>
                <select className="bg-surface-container-low border-none rounded-lg p-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none cursor-pointer">
                  <option>kg</option>
                  <option>sac (50kg)</option>
                  <option>sac (100kg)</option>
                  <option>tonne</option>
                  <option>litre</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-background uppercase tracking-tight">Quantité disponible</label>
                <input className="bg-surface-container-low border-none rounded-lg p-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none font-mono" placeholder="Ex: 500" type="number" />
              </div>
            </div>
          </section>

          {/* Localisation */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-on-background pb-2 border-b border-outline-variant/10">Localisation du stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-background uppercase tracking-tight">Ville / Localité</label>
                <input className="bg-surface-container-low border-none rounded-lg p-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none" type="text" defaultValue="Bobo-Dioulasso" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-on-background uppercase tracking-tight">Adresse précise</label>
                <input className="bg-surface-container-low border-none rounded-lg p-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none" placeholder="Quartier, N° de rue..." type="text" />
              </div>
            </div>
            <div className="w-full h-[220px] rounded-xl bg-surface-container-high relative overflow-hidden flex items-center justify-center">
              <span className="text-on-surface-variant font-medium">Carte Interactive (Intégration Leaflet à venir)</span>
            </div>
          </section>

          {/* Disponibilité */}
          <section className="p-6 bg-surface-container-low/50 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">sell</span>
              </div>
              <div>
                <h4 className="font-bold text-on-background">Produit disponible à la vente</h4>
                <p className="text-xs text-outline font-medium uppercase tracking-tight">Rendre l'annonce visible immédiatement</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </section>
        </form>
      </div>

      <footer className="fixed bottom-0 left-64 right-0 bg-surface-container-lowest/90 backdrop-blur-xl px-12 py-4 flex justify-end items-center gap-4 border-t border-outline-variant/10 shadow-2xl z-50">
        <button onClick={() => navigate(-1)} className="px-6 py-2.5 text-outline hover:text-on-background text-sm font-bold uppercase tracking-widest transition-colors">Annuler</button>
        <button className="px-8 py-2.5 bg-primary text-white rounded-lg text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/30 active:scale-95 transition-all">Publier</button>
      </footer>
    </div>
  );
}
