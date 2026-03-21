import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, ChevronLeft, ChevronRight, Loader2, SlidersHorizontal } from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import ProductCard from '../../components/shared/ProductCard';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  images: string[];
  city: string;
  seller?: { firstName: string, lastName: string };
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Toutes');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['Toutes', 'Céréales', 'Légumes', 'Fruits', 'Élevage', 'Semences', 'Autres'];

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (category !== 'Toutes') params.category = category;
      if (search) params.search = search;
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, { params });
      // The backend response might be { status: 'success', data: [...] } or just [...]
      // Based on common patterns in the backend, it often returns the array directly or in a results field.
      setProducts(response.data); 
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <VisitorHeader />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-serif-display text-on-surface mb-2">Marché AgroConnect</h1>
            <p className="text-on-surface-variant">Trouvez les meilleurs produits agricoles du Burkina Faso en direct des producteurs.</p>
          </div>

          {/* Search & Filter Bar */}
          <section className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-outline-variant/20 mb-12">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un produit (Maïs, Tomates...)"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none transition-shadow"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-6 py-3.5 bg-surface-container-high rounded-2xl flex items-center gap-2 font-bold text-on-surface hover:bg-surface-variant transition-colors md:hidden"
                >
                  <Filter size={20} /> Filtres
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3.5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                   Rechercher
                </button>
              </div>
            </form>
          </section>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 space-y-10">
              <div>
                <div className="flex items-center gap-2 mb-6 text-primary">
                   <SlidersHorizontal size={20} />
                   <h2 className="font-bold uppercase tracking-widest text-xs">Filtres</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface mb-4">Catégories</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${
                            category === cat 
                            ? 'bg-primary text-white font-bold' 
                            : 'text-on-surface-variant hover:bg-primary/5'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-outline-variant/20">
                    <h3 className="text-sm font-bold text-on-surface mb-4">Localisation</h3>
                    <select className="w-full bg-surface-container-low border-none rounded-xl text-sm p-3 focus:ring-1 focus:ring-primary">
                       <option>Toutes les villes</option>
                       <option>Ouagadougou</option>
                       <option>Bobo-Dioulasso</option>
                       <option>Koudougou</option>
                       <option>Banfora</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="animate-spin text-primary" size={48} />
                  <p className="text-on-surface-variant animate-pulse">Chargement des produits...</p>
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                  
                  {/* Pagination placeholder */}
                  <div className="mt-16 flex justify-center items-center gap-3">
                    <button className="p-3 bg-surface-container-high rounded-xl text-outline hover:text-primary transition-colors">
                      <ChevronLeft size={20} />
                    </button>
                    <button className="w-12 h-12 bg-primary text-white font-bold rounded-xl shadow-md">1</button>
                    <button className="w-12 h-12 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-variant">2</button>
                    <button className="p-3 bg-surface-container-high rounded-xl text-outline hover:text-primary transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-24 bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant/30 text-on-surface-variant">
                   <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search size={36} />
                   </div>
                   <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
                   <p className="mb-8">Essayez de modifier vos filtres ou votre recherche.</p>
                   <button 
                    onClick={() => { setCategory('Toutes'); setSearch(''); }}
                    className="text-primary font-bold hover:underline"
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
