import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import orderService from '../../services/orderService';
import { 
  ChevronRight, 
  CheckCircle2, 
  Star, 
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
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';
import { getSellerName, getSellerInitials } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchProductById, loading, products } = useProductStore() as any;
  const { token } = useAuthStore() as any;
  const [product, setProduct] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await fetchProductById(id);
        if (data) setProduct(data);
      }
    };
    loadProduct();
  }, [id, fetchProductById]);

  const handleOrderCreation = async () => {
     setOrderLoading(true);
     try {
        const payload = {
           items: [{ product: product._id || product.id, quantity: 1, price: product.price }],
           seller: product.seller?._id || product.seller || product.farmer?._id || product.farmer,
           totalAmount: product.price,
           status: 'PENDING'
        };
        await orderService.createOrder(payload);
        toast.success("Commande envoyée au producteur !");
        navigate('/buyer/orders');
     } catch (err) {
        toast.error("Erreur lors de la commande.");
     } finally {
        setOrderLoading(false);
     }
  };

  const similarProducts = Array.isArray(products)
    ? products
        .filter((p: any) => p.category === product?.category && (p._id || p.id) !== (product?._id || product?.id))
        .slice(0, 4)
    : [];

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-[var(--text-accent)]" size={64} />
        <p className="text-[var(--text-secondary)] font-bold text-xl font-display animate-pulse">Déterrage des infos du produit...</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-page)] text-[var(--text-primary)] font-body antialiased min-h-screen">
      {token ? (
        <header className="px-6 lg:px-12 py-6 flex sticky top-0 z-50 justify-between items-center bg-[var(--bg-surface)]/80 backdrop-blur-xl border-b border-[var(--border-light)] shadow-sm">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[var(--text-accent)] flex items-center justify-center text-white font-display font-black text-xl">
               A
             </div>
             <div>
               <h2 className="font-display font-bold text-lg tracking-tight text-[var(--text-primary)] leading-none mb-1">Aperçu Catalogue</h2>
               <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-black">Mode Connecté</p>
             </div>
           </div>
           <button onClick={() => navigate(-1)} className="px-5 py-2.5 bg-[var(--bg-muted)] hover:bg-[var(--border-light)] text-[var(--text-primary)] font-bold rounded-xl transition-colors text-sm">
             Fermer l'aperçu
           </button>
        </header>
      ) : (
        <VisitorHeader />
      )}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-24">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-12 bg-[var(--bg-muted)] w-fit px-5 py-3 rounded-2xl border border-[var(--border-light)]">
          <button className="hover:text-[var(--text-accent)] transition-colors font-bold" onClick={() => navigate(-1)}>Retour</button>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-[var(--text-accent)] font-bold">{product.category}</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16">
          {/* Main Visual Sub-Page */}
          <div className="space-y-10">
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl bg-[var(--bg-surface)] border border-[var(--border-light)]">
              <img 
                alt={product.name} 
                className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110" 
                src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80'}
              />
              <div className="absolute top-8 left-8 flex gap-3">
                <span className="bg-[var(--bg-surface)]/90 backdrop-blur-md text-[var(--text-accent)] px-5 py-2 rounded-2xl text-xs font-black tracking-widest uppercase shadow-xl border border-[var(--border-light)]">
                  {product.category || 'Céréales'}
                </span>
                <span className="bg-[var(--text-accent)]/90 backdrop-blur-md text-white px-5 py-2 rounded-2xl text-xs font-black tracking-widest flex items-center gap-2 shadow-xl">
                  <CheckCircle2 size={16} /> DISPONIBLE
                </span>
              </div>
            </div>

            <div className="bg-[var(--bg-surface)] p-10 rounded-[3rem] border border-[var(--border-light)] shadow-sm">
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3 text-[var(--text-primary)]">
                    <Info size={24} className="text-[var(--text-accent)]" /> Description détaillée
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg font-medium">
                   {product.description || "Produit de qualité supérieure cultivé avec soin au Burkina Faso. Garanti frais et conforme aux standards de qualité exigeants de la plateforme AgroConnect BF. Ce lot a été vérifié par nos agents de zone pour garantir traçabilité et conformité."}
                </p>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
                   <div className="bg-[var(--bg-muted)] p-6 rounded-3xl text-center border border-[var(--border-light)] hover:border-[var(--text-accent)]/30 transition-colors">
                      <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider mb-2">Origine</p>
                      <p className="font-bold text-[var(--text-primary)]">{product.location?.split(',')[0] || product.city || 'Bobo-Dioulasso'}</p>
                   </div>
                   <div className="bg-[var(--bg-muted)] p-6 rounded-3xl text-center border border-[var(--border-light)] hover:border-[var(--text-accent)]/30 transition-colors">
                      <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider mb-2">Certifié</p>
                      <CheckCircle2 className="mx-auto text-[var(--text-accent)]" size={24} />
                   </div>
                   <div className="bg-[var(--bg-muted)] p-6 rounded-3xl text-center border border-[var(--border-light)] hover:border-[var(--text-accent)]/30 transition-colors">
                      <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider mb-2">Récolte</p>
                      <p className="font-bold text-[var(--text-primary)]">Récente</p>
                   </div>
                </div>
            </div>
          </div>
          
          {/* Action Sidebar */}
          <div className="flex flex-col space-y-8">
            <div className="bg-[var(--bg-surface)] p-10 rounded-[3.5rem] border border-[var(--border-light)] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--text-accent)]/5 rounded-full -mr-16 -mt-16"></div>
               
               <div className="mb-8 relative z-10">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-mono font-black text-[var(--text-accent)]">{formatFCFA(product.price)}</span>
                    <span className="text-[var(--text-secondary)] text-xl font-medium">/ {product.unit || 'Kg'}</span>
                  </div>
                  <div className="flex items-center gap-3 py-3 px-5 bg-[var(--bg-muted)] text-[var(--text-secondary)] rounded-2xl w-fit border border-[var(--border-light)] font-bold text-sm">
                    <ShoppingBag size={18} className="text-[var(--text-accent)]" />
                    Stock : {product.quantity || product.inventory || product.stock || '10+'} unités
                  </div>
               </div>

               {/* Seller Card */}
               <div className="bg-[var(--bg-muted)] p-6 rounded-[2rem] border border-[var(--border-light)] mb-8 flex items-center gap-5 hover:border-[var(--text-accent)]/30 transition-all group relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform shadow-sm">
                    {getSellerInitials(product.seller)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[var(--text-primary)] text-lg">{getSellerName(product.seller)}</h3>
                      <div className="flex items-center gap-1 text-sm font-black text-[var(--text-accent)]">
                        <Star size={14} fill="currentColor" />
                        4.8
                      </div>
                    </div>
                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1">
                       <MapPin size={10} /> {product.location?.split(',')[0] || product.city || 'Bobo-Dioulasso'}
                    </p>
                  </div>
               </div>

               {/* CTA Card */}
               <div className="bg-[var(--text-accent)]/5 rounded-[2.5rem] p-8 border border-[var(--text-accent)]/10 relative z-10">
                  <h4 className="font-bold text-xl mb-3 text-[var(--text-primary)]">Intéressé ?</h4>
                  <p className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed font-medium italic">"Connectez-vous pour négocier ce lot ou contacter directement le producteur certifié."</p>
                  <div className="flex flex-col gap-4">
                    {!token ? (
                      <>
                        <button 
                          onClick={() => navigate('/register')} 
                          className="w-full bg-[var(--text-accent)] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[var(--text-accent)]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          <UserPlus size={22} /> S'inscrire
                        </button>
                        <button 
                          onClick={() => navigate('/login')} 
                          className="w-full border-2 border-[var(--border-light)] text-[var(--text-primary)] py-4 rounded-2xl font-bold hover:bg-[var(--bg-muted)] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          <LogIn size={22} /> Se connecter
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={handleOrderCreation} 
                          disabled={orderLoading}
                          className="w-full bg-[var(--text-accent)] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[var(--text-accent)]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          {orderLoading ? <Loader2 className="animate-spin" size={22} /> : <ShoppingBag size={22} />}
                          {orderLoading ? 'Création...' : 'Commander (Sans paiement direct)'}
                        </button>
                        <button 
                          onClick={() => {
                            const sellerId = product?.seller?._id || product?.seller || product?.farmer?._id || product?.farmer;
                            const productId = product?._id || product?.id;
                            const params = new URLSearchParams();
                            if (sellerId) params.set('recipientId', sellerId);
                            if (productId) params.set('productId', productId);
                            navigate(`/buyer/messages?${params.toString()}`);
                          }} 
                          className="w-full bg-[var(--bg-muted)] text-[var(--text-primary)] py-4 rounded-2xl font-bold border border-[var(--border-light)] hover:bg-[var(--border-light)] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          Discuter avec le Vendeur
                        </button>
                      </>
                    )}
                  </div>
               </div>
            </div>
            
            <div className="bg-[var(--bg-surface)] p-8 rounded-[2.5rem] border border-[var(--border-light)] shadow-sm">
               <h4 className="font-bold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                  <ShieldCheck size={20} className="text-[var(--text-accent)]" /> Protection AgroConnect
               </h4>
               <ul className="space-y-3 text-sm text-[var(--text-secondary)] font-medium">
                  <li className="flex items-start gap-2">
                     <CheckCircle2 size={16} className="text-[var(--text-accent)] shrink-0 mt-0.5" />
                     Paiement sécurisé via Escrow
                  </li>
                  <li className="flex items-start gap-2">
                     <CheckCircle2 size={16} className="text-[var(--text-accent)] shrink-0 mt-0.5" />
                     Qualité vérifiée sur le terrain
                  </li>
                  <li className="flex items-start gap-2">
                     <CheckCircle2 size={16} className="text-[var(--text-accent)] shrink-0 mt-0.5" />
                     Litiges gérés par nos modérateurs
                  </li>
               </ul>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)]">Recommandations</h2>
            <Link to="/catalog" className="text-[var(--text-accent)] font-bold hover:gap-3 transition-all flex items-center gap-2">
              Tout le catalogue <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.length > 0 ? (
              similarProducts.map((p: any) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-[var(--bg-muted)] rounded-3xl border border-[var(--border-light)] border-dashed">
                <p className="text-[var(--text-secondary)] font-medium">Aucun autre produit similaire pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {!token && <VisitorFooter />}
    </div>
  );
};

export default ProductDetailPage;
