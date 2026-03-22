import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Eye, 
  Edit3, 
  Trash2, 
  RefreshCw,
  ShoppingBasket
} from 'lucide-react';

const FarmerProductsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-700">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif-display text-[2.5rem] leading-tight text-on-background">📦 Mes produits</h1>
          <p className="text-outline font-medium mt-2">Gérez votre catalogue de récoltes et surveillez vos stocks en temps réel.</p>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl overflow-hidden shadow-inner">
          <button className="px-6 py-2 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/10 transition-all">Tous (8)</button>
          <button className="px-6 py-2 rounded-xl text-on-surface-variant text-sm font-bold hover:bg-surface-container-high transition-all">Disponibles (6)</button>
          <button className="px-6 py-2 rounded-xl text-on-surface-variant text-sm font-bold hover:bg-surface-container-high transition-all">Indisponibles (1)</button>
          <button className="px-6 py-2 rounded-xl text-on-surface-variant text-sm font-bold hover:bg-surface-container-high transition-all">Rupture (1)</button>
        </div>
        <Link to="/farmer/products/new" className="bg-primary hover:brightness-110 text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 font-bold transition-all shadow-xl shadow-primary/20 active:scale-95">
          <PlusCircle size={20} />
          <span>Ajouter un produit</span>
        </Link>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* VARIANTE 1: DISPONIBLE */}
        <article className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/10 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
          <div className="relative h-[220px] overflow-hidden">
            <img alt="Maïs sec" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80" />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
              <CheckCircle2 size={14} />
              <span>Disponible</span>
            </div>
          </div>
          <div className="p-8 space-y-5">
            <div>
              <h3 className="font-bold text-xl text-on-surface group-hover:text-primary transition-colors">Maïs sec (Gros grains)</h3>
              <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-widest">Céréales</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-black text-2xl text-primary">5 000 FCFA</span>
              <span className="text-outline text-sm font-bold">/ sac</span>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-on-surface-variant text-sm font-bold">
                <Package className="text-primary-container" size={18} />
                <span>Stock : <strong className="text-on-surface font-black">500 kg · 50 sacs</strong></span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant text-sm font-medium">
                <MapPin className="text-tertiary" size={18} />
                <span>Bobo-Dioulasso</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/5 bg-surface-container-low/20">
            <button className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-all"><Eye size={20} /></button>
            <Link to={`/farmer/products/1/edit`} className="p-3 text-on-surface-variant hover:bg-white rounded-xl transition-all shadow-sm"><Edit3 size={20} /></Link>
            <button className="p-3 text-error hover:bg-error/10 rounded-xl transition-all"><Trash2 size={20} /></button>
          </div>
        </article>

        {/* VARIANTE 2: RUPTURE */}
        <article className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/10 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
          <div className="relative h-[220px] overflow-hidden grayscale">
            <img alt="Sorgho" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80" />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-error/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
              <AlertCircle size={14} />
              <span>Rupture de stock</span>
            </div>
          </div>
          <div className="p-8 space-y-5">
            <div>
              <h3 className="font-bold text-xl text-on-surface">Sorgho blanc</h3>
              <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-widest">Céréales</span>
            </div>
            <div className="flex items-baseline gap-1 opacity-50">
              <span className="font-mono font-black text-2xl text-primary">6 500 FCFA</span>
              <span className="text-outline text-sm font-bold">/ sac</span>
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-error text-sm font-black uppercase tracking-tight">
                <Package size={18} />
                <span>Stock épuisé : 0 kg</span>
              </div>
              <button className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-black text-sm flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-95">
                <RefreshCw size={18} />
                Réapprovisionner
              </button>
            </div>
          </div>
        </article>
      </div>

    </div>
  );
};

export default FarmerProductsPage;
