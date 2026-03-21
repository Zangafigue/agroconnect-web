import React from 'react';
import { Link } from 'react-router-dom';

export default function FarmerProductsPage() {
  return (
    <div className="space-y-8 pb-32">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-[2.5rem] leading-tight text-on-background" style={{fontFamily: "'DM Serif Display', serif"}}>📦 Mes produits</h1>
          <p className="text-outline font-medium mt-2">Gérez votre catalogue de récoltes et surveillez vos stocks en temps réel.</p>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-surface-container-low p-1 rounded-full overflow-hidden">
          <button className="px-6 py-2 rounded-full bg-primary text-white text-sm font-semibold transition-all">Tous (8)</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-all">Disponibles (6)</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-all">Indisponibles (1)</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant text-sm font-medium hover:bg-surface-container-high transition-all">Rupture (1)</button>
        </div>
        <Link to="/farmer/products/new" className="bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-sm">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Ajouter un produit</span>
        </Link>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* VARIANTE 1: DISPONIBLE */}
        <article className="bg-surface-container-lowest rounded-[12px] shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] group hover:translate-y-[-4px] transition-all duration-300 relative">
          <div className="relative h-[180px] overflow-hidden rounded-t-[12px]">
            <img alt="Maïs sec" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Disponible</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-bold text-lg text-[#111827]">Maïs sec (Gros grains)</h3>
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-tighter">Céréales</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-bold text-xl text-primary">5 000 FCFA</span>
              <span className="text-outline text-sm">/ sac</span>
            </div>
            <div className="space-y-1.5 border-l-2 border-primary/20 pl-4 py-1">
              <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                <span className="material-symbols-outlined text-sm">inventory</span>
                <span>Stock : <strong>500 kg · 50 sacs</strong></span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>Bobo-Dioulasso</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-surface-container-low bg-surface-container-lowest/50 rounded-b-[12px]">
            <button className="p-2 text-primary hover:bg-primary/5 rounded-full transition-colors flex items-center justify-center"><span className="material-symbols-outlined">visibility</span></button>
            <Link to={`/farmer/products/1/edit`} className="p-2 text-on-surface-variant hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"><span className="material-symbols-outlined">edit</span></Link>
            <button className="p-2 text-error hover:bg-error/5 rounded-full transition-colors flex items-center justify-center"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </article>

        {/* VARIANTE 2: RUPTURE */}
        <article className="bg-surface-container-lowest rounded-[12px] shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] group hover:translate-y-[-4px] transition-all duration-300 relative">
          <div className="relative h-[180px] overflow-hidden rounded-t-[12px]">
            <img alt="Sorgho" className="w-full h-full object-cover grayscale-[0.3]" src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fee2e2] text-[#dc2626] text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              <span>Rupture de stock</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-bold text-lg text-[#111827]">Sorgho blanc</h3>
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-tighter">Céréales</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-bold text-xl text-primary">6 500 FCFA</span>
              <span className="text-outline text-sm">/ sac</span>
            </div>
            <div className="space-y-1.5 border-l-2 border-error/20 pl-4 py-1">
              <div className="flex items-center gap-2 text-error text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">inventory</span>
                <span>Stock épuisé : 0 kg</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>Koudougou</span>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl border border-primary text-primary text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-sm">sync</span>
              Réapprovisionner
            </button>
          </div>
        </article>
      </div>

    </div>
  );
}
