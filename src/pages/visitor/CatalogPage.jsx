import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useProductStore } from '../../store/productStore';
import { getSellerName, getSellerInitials } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

export default function CatalogPage() {
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const displayProducts = products;

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen border-t-0 p-0">
      <VisitorHeader />

      <main className="pt-24 pb-20 max-w-screen-2xl mx-auto px-8">
        <section className="bg-[#f8faf8] p-6 mb-12 rounded-xl flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[52px]">
            <input className="w-full h-full pl-6 pr-36 bg-surface-container-lowest outline-none rounded-xl text-on-surface shadow-sm focus:ring-2 focus:ring-primary transition-all placeholder:text-outline" placeholder="Rechercher un produit..." type="text"/>
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-8 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-all flex items-center gap-2">
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
              {loading ? (
                <div className="col-span-full py-20 text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-on-surface-variant font-bold">Chargement des produits...</p>
                </div>
              ) : displayProducts.length > 0 ? (
                displayProducts.map((product, index) => (
                  <div key={`catalog-prod-${product.id || product._id || index}`} className="bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group border border-outline-variant/10 flex flex-col h-full cursor-pointer" onClick={() => navigate(`/catalog/${product.id || product._id}`)}>
                    <div className="relative h-[180px] overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={product.name} src={product.image}/>
                      <div className="absolute top-3 left-3 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold tracking-tighter rounded-full uppercase">Disponible</div>
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-lg">favorite</span>
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                          {getSellerInitials(product.seller)}
                        </div>
                        <span className="text-xs text-outline font-medium">{getSellerName(product.seller)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-on-surface leading-tight mb-2 flex-1">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-xl font-mono font-bold text-primary">{formatFCFA(product.price)}</span>
                        <span className="text-xs font-mono text-primary"> / {product.unit}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-outline mb-6">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {product.location}
                      </div>
                      <button className="w-full py-2.5 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all">Voir les détails</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/30">
                  <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">inventory_2</span>
                  <p className="text-on-surface-variant font-bold text-xl">Aucun produit trouvé</p>
                  <p className="text-outline">Essayez de modifier vos filtres ou de revenir plus tard.</p>
                </div>
              )}
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

      <VisitorFooter />
    </div>
  );
}
