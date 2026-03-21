import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, MapPin, ShieldCheck, Truck, 
  MessageSquare, User, Tag, Share2, Heart, 
  Loader2, BadgeCheck 
} from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  images: string[];
  city: string;
  address: string;
  available: boolean;
  seller: {
    _id: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Erreur détails produit:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <VisitorHeader />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <VisitorHeader />
        <div className="flex-grow flex flex-col items-center justify-center gap-6 p-4">
           <h2 className="text-2xl font-bold">Produit introuvable</h2>
           <button onClick={() => navigate('/catalog')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold">
             Retour au catalogue
           </button>
        </div>
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col">
      <VisitorHeader />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs / Back Button */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-bold"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Retour aux résultats
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery Portion */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-surface-container-low border border-outline-variant/20 shadow-lg">
                <img 
                  src={product.images?.[activeImage] || defaultImage} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {product.images?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-24 rounded-2xl flex-shrink-0 overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/30'
                    }`}
                  >
                    <img src={img} alt="Miniature" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Portion */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
                 <div className="flex items-center gap-1 text-on-surface-variant text-xs font-medium">
                    <MapPin size={14} className="text-primary" />
                    <span>{product.city}, Burkina Faso</span>
                 </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif-display leading-tight mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-3xl font-bold text-primary">{product.price.toLocaleString()}</span>
                <span className="text-lg font-bold text-primary uppercase">FCFA</span>
                <span className="text-outline">/ {product.unit}</span>
              </div>

              <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-outline mb-4">Description</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                 <button className="flex-1 px-8 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                   <MessageSquare size={20} />
                   Contacter le vendeur
                 </button>
                 <button className="px-8 py-5 bg-white dark:bg-slate-900 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                   <Truck size={20} />
                   Calculer livraison
                 </button>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-outline-variant/20">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary">
                      <User size={24} />
                   </div>
                   <div>
                      <div className="flex items-center gap-1">
                        <p className="font-bold text-sm">{product.seller?.firstName} {product.seller?.lastName}</p>
                        <BadgeCheck size={14} className="text-primary fill-primary/10" />
                      </div>
                      <p className="text-[10px] text-outline uppercase font-bold tracking-[0.1em]">Producteur Vérifié</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-3 rounded-full hover:bg-surface-container-high transition-colors text-outline">
                      <Heart size={20} />
                   </button>
                   <button className="p-3 rounded-full hover:bg-surface-container-high transition-colors text-outline">
                      <Share2 size={20} />
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="mt-20 p-8 bg-surface-container-highest rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border border-outline-variant/10">
            <div className="flex items-center gap-4">
               <ShieldCheck className="text-primary" size={40} />
               <div>
                 <h4 className="font-bold text-lg">Achat Sécurisé</h4>
                 <p className="text-sm text-on-surface-variant">Vos fonds sont protégés par le système Escrow AgroConnect jusqu'à la livraison.</p>
               </div>
            </div>
            <Link to="/how-it-works" className="text-primary font-bold hover:underline">En savoir plus</Link>
          </div>
        </div>
      </main>

      <VisitorFooter />
    </div>
  );
};

export default ProductDetailPage;
