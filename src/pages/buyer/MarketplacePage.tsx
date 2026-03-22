import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  Grass, 
  Leaf, 
  Droplets, 
  Heart, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  ShoppingBag,
  SlidersHorizontal
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pb-32 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Search & Hero */}
      <section className="mb-16 pt-10">
        <h1 className="font-serif-display text-6xl text-on-surface mb-10 leading-[1.1]">
          Le Marché des <br /><span className="text-primary italic">Producteurs Locaux</span>
        </h1>
        <div className="bg-surface-container-lowest p-3 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row gap-3 max-w-5xl border border-outline-variant/10">
          <div className="flex-1 flex items-center px-6 gap-4 bg-primary/5 rounded-[1.8rem] border border-primary/5 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="text-primary/60 group-focus-within:text-primary transition-colors" size={24} />
            <input 
              type="text" 
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface py-5 font-bold placeholder:text-outline/40 placeholder:font-medium" 
              placeholder="Rechercher des produits, céréales..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center px-6 gap-4 bg-primary/5 rounded-[1.8rem] border border-primary/5 lg:w-72 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <MapPin className="text-tertiary/60 group-focus-within:text-tertiary transition-colors" size={24} />
            <select className="w-full bg-transparent border-none focus:ring-0 text-on-surface py-5 font-bold appearance-none cursor-pointer">
              <option>Toutes régions</option>
              <option>Ouagadougou</option>
              <option>Bobo-Dioulasso</option>
              <option>Koudougou</option>
            </select>
          </div>
          <button className="bg-primary text-white px-12 py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-95">
            Explorer
          </button>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-12">
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-outline mb-8 flex items-center gap-3">
              <SlidersHorizontal size={14} className="text-primary" />
              Filtrer par catégorie
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Céréales', checked: true },
                { label: 'Légumes', checked: false },
                { label: 'Fruits', checked: false },
                { label: 'Huiles & Semences', checked: false },
              ].map((cat, idx) => (
                <label key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all cursor-pointer group border border-transparent hover:border-primary/5">
                  <input type="checkbox" defaultChecked={cat.checked} className="rounded-lg border-outline-variant/50 text-primary focus:ring-primary/20 w-6 h-6 transition-all" />
                  <span className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="p-8 bg-surface-container-low/50 rounded-[2.5rem] border border-outline-variant/10">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-outline mb-10">Budget (FCFA / kg)</h4>
            <div className="px-2">
              <input type="range" className="w-full accent-primary h-2 bg-outline-variant/20 rounded-full appearance-none cursor-pointer" />
              <div className="flex justify-between mt-4 font-mono text-[10px] font-black text-outline uppercase tracking-widest">
                <span>Min: 0</span>
                <span>Max: 50k+</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10">
             <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary mb-6">Disponibilité</h4>
             <label className="relative inline-flex items-center cursor-pointer group">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                <span className="ms-4 text-xs font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">Stock immédiat</span>
             </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <p className="text-xs text-outline font-bold uppercase tracking-widest">Affichage de <span className="text-primary">1-6</span> sur 48 produits</p>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-outline uppercase tracking-widest">Trier par:</span>
               <select className="bg-transparent border-none text-xs font-black text-primary uppercase tracking-widest focus:ring-0 cursor-pointer">
                  <option>Nouveautés</option>
                  <option>Prix Croissant</option>
                  <option>Prix Décroissant</option>
               </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
             {/* Product Cards would iterate here - Mock for structure */}
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <article key={i} className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-outline-variant/10">
                   <div className="relative h-64 overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${1551754655 + i}-cd27e38d2076?w=600&q=80`} alt="Produit" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-5 left-5">
                         <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl ring-1 ring-white/20">Disponible</span>
                      </div>
                      <button className="absolute top-5 right-5 h-12 w-12 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:bg-white shadow-lg text-outline hover:text-error group/fav">
                         <Heart size={20} className="group-hover/fav:fill-current" />
                      </button>
                   </div>
                   <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <h3 className="font-bold text-xl text-on-surface leading-tight transition-colors group-hover:text-primary">Maïs Blanc Local</h3>
                            <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mt-2">Producteur Certifié</p>
                         </div>
                         <div className="text-right">
                            <span className="font-mono font-black text-primary text-2xl">450</span>
                            <span className="text-[10px] font-bold text-outline block">FCFA / kg</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 mb-8 p-3 bg-surface-container-low/30 rounded-xl">
                         <div className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center font-black text-xs">AK</div>
                         <span className="text-xs text-on-surface-variant font-bold">Amadou Kaboré • <span className="text-tertiary">★ 4.9</span></span>
                      </div>
                      <Link to="/buyer/marketplace/product/1" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                         <ShoppingBag size={18} /> Commander
                      </Link>
                   </div>
                </article>
             ))}
          </div>

          {/* Pagination */}
          <nav className="mt-20 flex items-center justify-center gap-4">
            <button className="h-14 w-14 flex items-center justify-center rounded-2xl hover:bg-primary/10 text-outline transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20">1</button>
            <button className="h-14 w-14 flex items-center justify-center rounded-2xl border border-outline-variant/20 text-outline font-black text-lg hover:border-primary hover:text-primary transition-all">2</button>
            <span className="px-4 text-outline font-black">...</span>
            <button className="h-14 w-14 flex items-center justify-center rounded-2xl border border-outline-variant/20 text-outline font-black text-lg hover:border-primary hover:text-primary transition-all">8</button>
            <button className="h-14 w-14 flex items-center justify-center rounded-2xl hover:bg-primary/10 text-outline transition-all">
              <ChevronRight size={24} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
