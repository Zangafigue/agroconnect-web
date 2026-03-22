import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Loader2, SlidersHorizontal, MapPin, Tag, ArrowRight } from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import ProductCard from '../../components/shared/ProductCard';
import { useProductStore } from '../../store/productStore';
import { formatFCFA } from '../../utils/currency';

const CatalogPage: React.FC = () => {
  const { products, loading, fetchProducts } = useProductStore() as any;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedLocation, setSelectedLocation] = useState('Toutes');
  const [priceRange, setPriceRange] = useState(50000);

  const categories = ['Toutes', 'Céréales', 'Légumes', 'Fruits', 'Élevage', 'Tubercules', 'Autres'];
  const locations = ['Toutes', 'Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Banfora', 'Ouahigouya'];

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || p.category === selectedCategory;
    const matchesLocation = selectedLocation === 'Toutes' || p.location === selectedLocation || p.city === selectedLocation;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background font-body selection:bg-primary-container selection:text-on-primary-container">
      <VisitorHeader />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero/Search Section */}
          <section className="bg-surface-container-high/50 p-8 md:p-12 mb-16 rounded-[3rem] border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-4">Le Marché National</h1>
              <p className="text-on-surface-variant max-w-2xl mb-10 text-lg font-newsreader italic">"Accédez aux pépites de notre terroir, directement depuis l'exploitation."</p>
              
              <div className="relative w-full max-w-3xl group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={24} />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un produit (Maïs, Tomates, Oignons...)"
                  className="w-full pl-14 pr-40 py-5 bg-white rounded-2xl border-none shadow-xl focus:ring-4 focus:ring-primary/10 transition-all outline-none text-on-surface"
                />
                <button className="absolute right-2 top-2 bottom-2 px-8 bg-primary text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all">
                  Rechercher
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-32 space-y-12">
                <div>
                  <div className="flex items-center gap-3 mb-8 text-primary">
                    <SlidersHorizontal size={24} />
                    <h2 className="font-bold uppercase tracking-[0.2em] text-xs">Affinage</h2>
                  </div>
                  
                  <div className="space-y-10">
                    {/* Category Filter */}
                    <div>
                      <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2">
                        <Tag size={16} className="text-primary" /> Catégories
                      </h3>
                      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                              selectedCategory === cat 
                              ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                              : 'bg-surface-container-low text-on-surface-variant hover:bg-white border border-transparent hover:border-primary/20'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div className="pt-8 border-t border-outline-variant/10">
                      <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2">
                        <MapPin size={16} className="text-primary" /> Villes du Faso
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                         {locations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => setSelectedLocation(loc)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                              selectedLocation === loc 
                              ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
                              : 'bg-surface-container-low text-on-surface-variant hover:bg-white'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="pt-8 border-t border-outline-variant/10">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-on-surface">Budget (FCFA)</h3>
                        <span className="text-xs font-mono font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">{formatFCFA(priceRange)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="500" 
                        max="100000" 
                        step="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" 
                      />
                      <div className="flex justify-between mt-3 text-[10px] font-bold text-outline">
                        <span>500 F</span>
                        <span>100K+ F</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-10">
                 <p className="text-on-surface-variant font-medium text-sm">
                   <span className="text-primary font-bold">{filteredProducts.length}</span> produits correspondent à vos critères
                 </p>
                 <div className="flex items-center gap-2 text-xs font-bold text-outline">
                   Trier par : 
                   <select className="bg-transparent border-none focus:ring-0 text-primary cursor-pointer">
                     <option>Plus récents</option>
                     <option>Prix croissant</option>
                     <option>Prix décroissant</option>
                   </select>
                 </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-outline-variant/10 shadow-inner">
                  <Loader2 className="animate-spin text-primary mb-6" size={56} />
                  <p className="text-on-surface-variant font-bold text-xl font-headline animate-pulse">Symphonie du marché en cours...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {filteredProducts.map((product: any) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  <div className="mt-20 flex justify-center items-center gap-4">
                    <button className="p-4 bg-surface-container-high rounded-2xl text-outline hover:text-primary transition-all hover:bg-white shadow-sm disabled:opacity-30" disabled>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="w-14 h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 scale-110">1</button>
                    <button className="w-14 h-14 bg-white text-on-surface font-bold rounded-2xl hover:bg-surface-container-low transition-all border border-outline-variant/10">2</button>
                    <button className="p-4 bg-surface-container-high rounded-2xl text-outline hover:text-primary transition-all hover:bg-white shadow-sm">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-primary/5 text-on-surface-variant px-8">
                   <div className="w-24 h-24 bg-primary/5 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                      <Search size={48} />
                   </div>
                   <h3 className="text-3xl font-serif-display mb-4 text-on-surface">Aucune trouvaille pour le moment</h3>
                   <p className="mb-10 text-on-surface-variant/70 max-w-md mx-auto leading-relaxed italic font-newsreader">"Le marché est vaste, mais vos critères sont peut-être trop précis. Tentez d'élargir votre horizon !"</p>
                   <button 
                    onClick={() => { setSelectedCategory('Toutes'); setSelectedLocation('Toutes'); setSearch(''); setPriceRange(100000); }}
                    className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
                   >
                     Réinitialiser tout <ArrowRight size={20} />
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <VisitorFooter />
    </div>
  );
};

export default CatalogPage;
