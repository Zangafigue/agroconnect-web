import React, { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, Tag, ShoppingCart, ArrowRight } from 'lucide-react';
import api from '../../api/axios';
import ProductCard from '../../components/shared/ProductCard';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedLocation, setSelectedLocation] = useState('Toutes');
  const [priceRange, setPriceRange] = useState(100000);

  const categories = ['Toutes', 'Légumes', 'Fruits', 'Tubercules', 'Céréales', 'Élevage', 'Transformés'];
  const locations = ['Toutes', 'Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora', 'Kaya', 'Dédougou'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        const data = response.data;
        setProducts(Array.isArray(data) ? data : (data.products || []));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || p.category === selectedCategory;
    const matchesLocation = selectedLocation === 'Toutes' || p.city === selectedLocation;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const formatFCFA = (val: number) => new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-body">
      <VisitorHeader />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-20">
            <h1 className="text-6xl font-display text-[var(--gray-900)] mb-6 tracking-tight">Le Marché du Faso</h1>
            <p className="text-xl text-[var(--gray-501)] max-w-2xl leading-relaxed">
              Explorez les meilleurs produits de nos terroirs, en direct des producteurs locaux sans intermédiaire.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-32 space-y-12">
                <div>
                  <div className="flex items-center gap-3 mb-10 text-[var(--gray-900)]">
                    <SlidersHorizontal size={24} />
                    <h2 className="font-bold uppercase tracking-[0.2em] text-xs">Filtres Premium</h2>
                  </div>
                  
                  <div className="space-y-12">
                    {/* Category Filter */}
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gray-400)] mb-6 flex items-center gap-2">
                        <Tag size={16} className="text-[var(--green-600)]" /> Catégories
                      </h3>
                      <div className="flex flex-wrap gap-2 lg:flex-row lg:gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all border ${
                              selectedCategory === cat 
                              ? 'bg-black text-white border-black shadow-xl shadow-black/10 scale-105' 
                              : 'bg-white text-[var(--gray-501)] border-[var(--gray-200)] hover:border-[var(--gray-900)] hover:text-[var(--gray-900)]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div className="pt-10 border-t border-[var(--gray-100)]">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gray-400)] mb-6 flex items-center gap-3">
                        <MapPin size={16} className="text-[var(--green-600)]" /> Régions du Faso
                      </h3>
                      <div className="flex flex-wrap gap-2">
                         {locations.map((loc) => (
                           <button
                             key={loc}
                             onClick={() => setSelectedLocation(loc)}
                             className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                               selectedLocation === loc 
                               ? 'bg-[var(--green-600)] text-white border-[var(--green-600)] shadow-lg shadow-[var(--green-600)]/10' 
                               : 'bg-white text-[var(--gray-501)] border-[var(--gray-200)] hover:border-[var(--green-600)]'
                             }`}
                           >
                             {loc}
                           </button>
                         ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="pt-10 border-t border-[var(--gray-100)]">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gray-400)]">Budget (FCFA)</h3>
                        <span className="text-[10px] font-black text-[var(--green-600)] bg-[var(--green-600)]/5 px-3 py-1.5 rounded-full border border-[var(--green-600)]/10">{formatFCFA(priceRange)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="200000" 
                        step="5000"
                        className="w-full h-1 bg-[var(--gray-200)] rounded-lg appearance-none cursor-pointer accent-black" 
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-grow">
              {/* Search Bar */}
              <div className="relative mb-12 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--gray-400)] group-focus-within:text-[var(--gray-900)] transition-colors" size={24} />
                <input 
                  type="text"
                  placeholder="Rechercher une denrée, un producteur..."
                  className="w-full pl-16 pr-6 py-6 bg-white border border-[var(--gray-200)] rounded-[2rem] text-lg outline-none focus:ring-4 focus:ring-[var(--gray-900)]/5 focus:border-[var(--gray-900)] transition-all shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[1,2,3,4,5,6].map(n => (
                    <div key={n} className="bg-white rounded-[2rem] h-[450px] animate-pulse border border-[var(--gray-100)]" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-[var(--gray-100)]">
                  <div className="w-24 h-24 bg-[var(--gray-50)] rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShoppingCart size={40} className="text-[var(--gray-300)]" />
                  </div>
                  <h3 className="text-3xl font-display text-[var(--gray-900)] mb-4">Aucun produit trouvé</h3>
                  <p className="text-[var(--gray-501)] mb-10 max-w-sm mx-auto">
                    Ajustez vos filtres ou essayez une recherche différente pour explorer le marché.
                  </p>
                  <button 
                    onClick={() => { setSelectedCategory('Toutes'); setSelectedLocation('Toutes'); setSearch(''); setPriceRange(100000); }}
                    className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl"
                  >
                    Réinitialiser les filtres
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
