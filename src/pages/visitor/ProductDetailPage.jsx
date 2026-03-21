import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useProductStore } from '../../store/productStore';
import { getSellerName, getSellerInitials } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProductById, loading } = useProductStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      if (data) setProduct(data);
    };
    loadProduct();
  }, [id, fetchProductById]);

  const { products } = useProductStore();
  const similarProducts = Array.isArray(products)
    ? products
        .filter(p => p.category === product?.category && (p.id || p._id) !== (product?.id || product?._id))
        .slice(0, 4)
    : [];

  if (loading || !product) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen">
      <VisitorHeader />

      <main className="max-w-7xl mx-auto px-8 py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-outline mb-8">
          <Link className="hover:text-primary" to="/catalog">Catalogue</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary" to="#">{product.category}</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-background font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-[48px]">
          <div className="space-y-6">
            <div className="relative group">
              <img alt={product.name} className="w-full h-[420px] object-cover rounded-[12px]" src={product.image}/>
              <div className="absolute top-4 left-4 bg-[#fef3c7] text-[#b45309] px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                  {product.category}
              </div>
              <div className="absolute top-4 right-4 bg-[#dcfce7] text-[#15803d] px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  DISPONIBLE
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-outline uppercase tracking-widest">
              <span>Marché</span><span className="material-symbols-outlined text-[10px]">arrow_forward_ios</span><span>{product.category}</span>
            </div>
            <h1 className="font-serif-display text-[2rem] leading-tight text-on-background mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-mono text-[2rem] font-bold text-[#16a34a]">{formatFCFA(product.price)}</span>
              <span className="text-outline text-lg">/ {product.unit}</span>
            </div>
            <div className="flex items-center gap-2 text-[#16a34a] font-medium bg-[#ebffe5] border border-green-200 w-fit px-4 py-2 rounded-xl mb-8">
              <span className="material-symbols-outlined">inventory_2</span>
              <span>Stock disponible : {product.stock}</span>
            </div>
            
            <div className="bg-surface-container-low/50 rounded-[12px] p-4 mb-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-xl shrink-0">
                {getSellerInitials(product.seller)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-on-background">{getSellerName(product.seller)}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-tertiary">
                    <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    4.8
                  </div>
                </div>
                <p className="text-sm text-outline-variant">Producteur • {product.location}</p>
              </div>
            </div>
            
            <div className="bg-surface-container-highest/40 border border-[#86efac]/30 rounded-[12px] p-6">
              <h4 className="font-bold text-lg mb-2 text-on-background">Intéressé par ce produit ?</h4>
              <p className="text-on-surface-variant text-sm mb-6">Connectez-vous pour commander ce lot ou contacter directement le producteur.</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate('/register')} className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">person_add</span>
                  S'inscrire
                </button>
                <button onClick={() => navigate('/login')} className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">login</span>
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20 pt-12 border-t border-outline-variant/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-body font-semibold text-2xl mb-8 text-on-background">Description détaillée</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Produit de qualité supérieure cultivé avec soin au Burkina Faso. Garanti frais et conforme aux standards de qualité AgroConnect BF.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-body font-semibold text-2xl mb-8 text-on-background">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.length > 0 ? (
              similarProducts.map((p) => (
                <div 
                  key={p.id || p._id} 
                  onClick={() => navigate(`/catalog/${p.id || p._id}`)}
                  className="bg-surface-container-lowest border border-transparent rounded-[12px] overflow-hidden hover:shadow-xl hover:border-surface-variant transition-all duration-300 group cursor-pointer h-full flex flex-col"
                >
                  <div className="h-40 relative">
                    <img className="w-full h-full object-cover" alt={p.name} src={p.image}/>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-bold text-on-background mb-1">{p.name}</h4>
                    <p className="text-xs text-outline mb-3">{p.stock || 'Disponible'}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-mono text-primary font-bold">{formatFCFA(p.price)}</span>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/30">
                <p className="text-on-surface-variant">Aucun produit similaire trouvé</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <VisitorFooter />
    </div>
  );
}
