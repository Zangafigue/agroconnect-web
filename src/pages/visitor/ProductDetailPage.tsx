import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Package, 
  UserPlus, 
  LogIn, 
  ArrowRight, 
  Loader2,
  MapPin,
  Tag,
  Info,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import ProductCard from '../../components/shared/ProductCard';
import { useProductStore } from '../../store/productStore';
import { getSellerName, getSellerInitials } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchProductById, loading, products } = useProductStore() as any;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await fetchProductById(id);
        if (data) setProduct(data);
      }
    };
    loadProduct();
  }, [id, fetchProductById]);

  const similarProducts = Array.isArray(products)
    ? products
        .filter((p: any) => p.category === product?.category && (p._id || p.id) !== (product?._id || product?.id))
        .slice(0, 4)
    : [];

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-primary" size={64} />
        <p className="text-on-surface-variant font-bold text-xl font-headline animate-pulse">Déterrage des infos du produit...</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <VisitorHeader />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-outline mb-12 bg-surface-container-low w-fit px-4 py-2 rounded-full border border-outline-variant/10">
          <Link className="hover:text-primary transition-colors font-bold" to="/catalog">Catalogue</Link>
          <ChevronRight size={14} className="text-outline-variant" />
          <span className="text-primary font-bold">{product.category}</span>
          <ChevronRight size={14} className="text-outline-variant" />
          <span className="text-on-background font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16">
          {/* Main Visual Sub-Page */}
          <div className="space-y-10">
            <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl">
              <img 
                alt={product.name} 
                className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110" 
                src={product.image || product.images?.[0]}
              />
              <div className="absolute top-8 left-8 flex gap-3">
                <span className="bg-white/90 backdrop-blur-md text-primary px-5 py-2 rounded-2xl text-xs font-black tracking-widest uppercase shadow-xl border border-primary/10">
                  {product.category}
                </span>
                <span className="bg-green-500/90 backdrop-blur-md text-white px-5 py-2 rounded-2xl text-xs font-black tracking-widest flex items-center gap-2 shadow-xl">
                  <CheckCircle2 size={16} /> DISPONIBLE
                </span>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm">
                <h2 className="text-2xl font-serif-display mb-6 flex items-center gap-3">
                    <Info size={24} className="text-primary" /> Description détaillée
                </h2>
                <p className="text-on-surface-variant leading-relaxed text-lg font-body">
                   {product.description || "Produit de qualité supérieure cultivé avec soin au Burkina Faso. Garanti frais et conforme aux standards de qualité exigeants de la plateforme AgroConnect BF. Ce lot a été vérifié par nos agents de zone pour garantir traçabilité et conformité."}
                </p>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
                   <div className="bg-surface-container-low p-6 rounded-3xl text-center border border-outline-variant/5">
                      <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-2">Origine</p>
                      <p className="font-bold text-on-surface">{product.location || product.city}</p>
                   </div>
                   <div className="bg-surface-container-low p-6 rounded-3xl text-center border border-outline-variant/5">
                      <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-2">Certifié</p>
                      <CheckCircle2 className="mx-auto text-primary" size={24} />
                   </div>
                   <div className="bg-surface-container-low p-6 rounded-3xl text-center border border-outline-variant/5">
                      <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-2">Récolte</p>
                      <p className="font-bold text-on-surface">Récente</p>
                   </div>
                </div>
            </div>
          </div>
          
          {/* Action Sidebar */}
          <div className="flex flex-col space-y-10">
            <div className="bg-white p-10 rounded-[3.5rem] border-2 border-primary/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
               
               <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-mono font-black text-primary">{formatFCFA(product.price)}</span>
                    <span className="text-outline-variant text-xl font-medium">/ {product.unit}</span>
                  </div>
                  <div className="flex items-center gap-3 py-3 px-5 bg-green-50 text-green-700 rounded-2xl w-fit border border-green-100 font-bold text-sm">
                    <ShoppingBag size={18} />
                    Stock : {product.stock || '10+'} unités
                  </div>
               </div>

               {/* Seller Card */}
               <div className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 mb-8 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform">
                    {getSellerInitials(product.seller)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-on-surface text-lg">{getSellerName(product.seller)}</h3>
                      <div className="flex items-center gap-1 text-sm font-black text-tertiary">
                        <Star size={14} fill="currentColor" />
                        4.8
                      </div>
                    </div>
                    <p className="text-xs font-bold text-outline-variant uppercase tracking-widest flex items-center gap-1">
                       <MapPin size={10} /> {product.location || product.city}
                    </p>
                  </div>
               </div>

               {/* CTA Card */}
               <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                  <h4 className="font-bold text-xl mb-3 text-on-surface">Intéressé ?</h4>
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed font-newsreader italic">"Connectez-vous pour négocier ce lot ou contacter directement le producteur certifié."</p>
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => navigate('/register')} 
                      className="w-full bg-primary text-white py-4.5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                      <UserPlus size={22} /> S'inscrire
                    </button>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="w-full border-2 border-primary/20 text-primary py-4.5 rounded-2xl font-bold hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                      <LogIn size={22} /> Se connecter
                    </button>
                  </div>
               </div>
            </div>
            
            <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20">
               <h4 className="font-bold mb-4 flex items-center gap-2 text-secondary">
                  <ShieldCheck size={20} /> Protection AgroConnect
               </h4>
               <ul className="space-y-3 text-sm text-on-surface-variant font-medium">
                  <li className="flex items-start gap-2">
                     <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                     Paiement sécurisé via Escrow
                  </li>
                  <li className="flex items-start gap-2">
                     <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                     Qualité vérifiée sur le terrain
                  </li>
                  <li className="flex items-start gap-2">
                     <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                     Litiges gérés par nos modérateurs
                  </li>
               </ul>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-serif-display text-on-surface">Produits similaires</h2>
            <Link to="/catalog" className="text-primary font-bold hover:gap-3 transition-all flex items-center gap-2 underline underline-offset-4">
              Tout le catalogue <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {similarProducts.length > 0 ? (
              similarProducts.map((p: any) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant/30">
                <p className="text-on-surface-variant font-medium">L'algorithme de recommandation n'a rien trouvé d'autre pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <VisitorFooter />
    </div>
  );
};

export default ProductDetailPage;
