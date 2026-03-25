import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  CheckCircle2, 
  Handshake, 
  Wallet,
  Globe,
  Zap,
  Sprout,
  Grape
} from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import ProductCard from '../../components/shared/ProductCard';
import { useProductStore } from '../../store/productStore';

import cerealesImg from '../../assets/images/products/cereales.png';
import legumesImg from '../../assets/images/products/legumes.png';
import fruitsImg from '../../assets/images/products/fruits.png';
import tuberculesImg from '../../assets/images/products/tubercules.png';

import whyBg from '../../assets/images/why-bg.png';
import ctaBg from '../../assets/images/cta-bg.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useProductStore() as any;
  const [activeHowItWorks, setActiveHowItWorks] = useState<'buyers' | 'farmers' | 'transporters'>('buyers');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  const categories = [
    { title: 'CÉRÉALES', icon: Leaf, image: cerealesImg, desc: 'Maïs, Sorgho, Mil et Riz de qualité supérieure.', filter: 'Céréales' },
    { title: 'MARAÎCHAGE', icon: Zap, image: legumesImg, desc: 'Produits maraîchers frais direct des périmètres irrigués.', filter: 'Légumes' },
    { title: 'FRUITS', icon: Grape, image: fruitsImg, desc: 'Mangues, Agrumes et Papayes gorgés de soleil.', filter: 'Fruits' },
    { title: 'TUBERCULES', icon: Sprout, image: tuberculesImg, desc: 'Igname, Manioc et Patate douce du terroir.', filter: 'Tubercules' },
  ];

  const howItWorksContent = {
    buyers: [
      { id: 1, title: 'Exploration', desc: 'Naviguez par filière ou région pour trouver les produits dont vous avez besoin.', icon: ShoppingBag },
      { id: 2, title: 'Négociation', desc: 'Discutez des quantités et des prix directement sur notre messagerie sécurisée.', icon: Handshake },
      { id: 3, title: 'Paiement', desc: 'Effectuez votre transaction via Mobile Money ou virement, les fonds sont sécurisés.', icon: Wallet },
      { id: 4, title: 'Réception', desc: 'Suivez votre commande jusqu\'à la livraison finale par nos partenaires logistiques.', icon: CheckCircle2 }
    ],
    farmers: [
      { id: 1, title: 'Inscription', desc: 'Créez votre profil certifié et mettez en avant votre savoir-faire agricole.', icon: ShieldCheck },
      { id: 2, title: 'Publication', desc: 'Listez vos récoltes en quelques clics avec photos et prix du jour.', icon: Sprout },
      { id: 3, title: 'Vente Directe', desc: 'Recevez des offres d\'achat et discutez en direct avec vos clients.', icon: Wallet },
      { id: 4, title: 'Expédition', desc: 'Remettez vos produits aux transporteurs certifiés pour une livraison sécurisée.', icon: Truck }
    ],
    transporters: [
      { id: 1, title: 'Certification', desc: 'Enregistrez vos véhicules et rejoignez notre réseau de logistique agréé.', icon: Truck },
      { id: 2, title: 'Missions', desc: 'Trouvez des opportunités de transport de fret agricole partout au pays.', icon: Globe },
      { id: 3, title: 'Livraison', desc: 'Optimisez vos trajets et assurez le transport sécurisé des produits.', icon: CheckCircle2 },
      { id: 4, title: 'Paiement Rapide', desc: 'Soyez payé immédiatement après la confirmation de réception par le client.', icon: Wallet }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body overflow-x-hidden selection:bg-primary selection:text-white">
      <VisitorHeader theme="dark" />

      <main className="flex-grow pt-0">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[700px] bg-hero-field flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-1000 pt-24 md:pt-16">
              <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-black tracking-[0.3em] rounded-full uppercase mb-8 shadow-2xl border border-white/10">
                L'AGRI-TECH AU BURKINA FASO
              </span>
              <h1 className="text-6xl md:text-8xl font-serif-display text-white mb-8 leading-[1.05] tracking-tight">
                L'Excellence Agricole, <span className="text-[#16a34a] italic">sans filtre</span>.
              </h1>
              <p className="text-xl text-white/80 mb-12 max-w-xl font-body leading-relaxed font-medium">
                Connectez-vous directement aux producteurs certifiés du Burkina Faso. Négociez au juste prix et sécurisez votre approvisionnement.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-green-600 hover:shadow-[0_20px_40px_rgba(22,163,74,0.3)] shadow-2xl transition-all flex items-center gap-3 group active:scale-95"
                >
                  Explorer le marché
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all active:scale-95"
                >
                  Devenir partenaire
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories / Filières Section - Marquee */}
        <section className="py-24 bg-surface relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-primary"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nos Filières Stratégiques</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-serif-display text-on-surface">L'Essentiel du Terroir</h2>
          </div>
          
          <div className="relative group/marquee">
            <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] gap-8 px-4">
              {[...categories, ...categories].map((cat, i) => (
                <div 
                  key={i} 
                  className="relative w-[420px] h-[600px] rounded-[3.5rem] overflow-hidden group/card shrink-0 cursor-pointer transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-2xl border border-outline-variant/10"
                >
                  {/* Image Background */}
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/90 group-hover/card:to-black/80 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-500">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                          <cat.icon size={28} />
                        </div>
                        <div className="p-3 bg-white text-on-surface rounded-full shadow-lg">
                           <ArrowRight size={20} className="-rotate-45" />
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        <h3 className="text-4xl font-serif-display text-white tracking-tight">{cat.title}</h3>
                        <p className="text-white/70 text-sm whitespace-normal leading-relaxed font-medium">
                           {cat.desc}
                        </p>
                        
                        {/* Action Button - Shows on Hover */}
                        <div className="pt-6 transform translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 delay-100">
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               navigate(`/catalog?category=${cat.filter}`);
                             }}
                             className="w-full bg-green-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-green-700 transition-all flex items-center justify-center gap-3 shadow-2xl"
                           >
                             Découvrir cette filière
                             <ArrowRight size={14} />
                           </button>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Vignettes for marquee fade effect */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-32 bg-[var(--bg-page)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-3 tracking-tight">Offres Vedettes</h2>
                <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Le meilleur du Burkina Faso en exclusivité</p>
              </div>
              <button 
                onClick={() => navigate('/catalog')}
                className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] hover:gap-3 transition-all underline underline-offset-8"
              >
                Explorer tout le marché <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loading ? (
                <div className="col-span-full py-32 text-center bg-muted rounded-[3rem] border border-outline-variant/10 shadow-inner">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-on-surface-variant font-black uppercase tracking-widest text-xs">Collecte des pépites du terroir...</p>
                </div>
              ) : featuredProducts.length > 0 ? (
                <>
                  {featuredProducts.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                  <div className="bg-primary/5 rounded-[3rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-12 text-center min-h-[450px] group transition-all hover:bg-primary/10">
                    <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                        <ShoppingBag size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 font-display">Exposez vos récoltes</h3>
                    <p className="text-on-surface-variant text-sm mb-8 leading-relaxed font-medium">Rejoignez plus de 800 vendeurs déjà actifs sur la plateforme.</p>
                    <button onClick={() => navigate('/register')} className="px-8 py-4 bg-white text-primary font-black uppercase tracking-widest text-[10px] rounded-xl shadow-md border border-primary/10 flex items-center gap-2 hover:scale-105 transition-all">
                      S'inscrire comme vendeur <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="col-span-full py-20 text-center bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant/30">
                    <p className="text-on-surface-variant font-bold">Aucun produit en vedette pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section 
          className="py-32 bg-cover bg-center text-white overflow-hidden relative"
          style={{ backgroundImage: `url(${whyBg})` }}
        >
          <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <div className="text-center mb-24 max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-[10px] font-black tracking-[0.3em] rounded-full uppercase mb-6 border border-white/20">Notre Engagement</span>
              <h2 className="text-4xl md:text-7xl font-serif-display mb-6 tracking-tight">Pourquoi AgroConnect ?</h2>
              <p className="text-white/70 text-lg leading-relaxed italic font-newsreader">"Nous digitalisons la confiance pour bâtir une agriculture burkinabè résiliente et prospère."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
              {[
                { title: 'Connexion Directe', desc: 'Éliminez les intermédiaires inutiles. Traitez directement avec ceux qui cultivent la terre.', icon: Handshake },
                { title: 'Négociation Équitable', desc: 'Transparence totale sur les prix du marché pour une rémunération juste des producteurs.', icon: Wallet },
                { title: 'Logistique Fiable', desc: 'Réseau de transporteurs certifiés pour garantir la fraîcheur et la sécurité de vos produits.', icon: Truck },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mb-10 text-primary group-hover:rotate-6 group-hover:scale-110 transition-all shadow-2xl">
                    <item.icon size={44} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-display">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-[var(--bg-page)] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
             <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
             <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary rounded-full blur-[80px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-serif-display text-on-surface mb-16 tracking-tighter leading-[0.9]">
               Comment ça <span className="text-primary italic">marche ?</span>
            </h2>
            
            <div className="inline-flex p-1.5 bg-surface rounded-2xl mb-20 shadow-xl border border-outline-variant/10">
              {[
                { id: 'buyers', label: 'Acheteurs' },
                { id: 'farmers', label: 'Producteurs' },
                { id: 'transporters', label: 'Transporteurs' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveHowItWorks(tab.id as any)}
                  className={`px-8 py-3 rounded-xl transition-all text-sm font-black uppercase tracking-widest ${activeHowItWorks === tab.id ? 'bg-primary text-white shadow-lg scale-105' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {howItWorksContent[activeHowItWorks].map((step, i) => (
                <div 
                  key={`${activeHowItWorks}-${step.id}`} 
                  className="relative group text-left p-12 bg-white rounded-[4rem] border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="text-9xl font-serif-display text-primary/5 absolute -top-10 -right-4 group-hover:text-primary/10 transition-all duration-700 pointer-events-none select-none">
                    {i + 1}
                  </div>
                  <div className="w-20 h-20 bg-primary/5 text-primary rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                    <step.icon size={36} />
                  </div>
                  <h4 className="text-2xl font-bold mb-6 font-display tracking-tight text-on-surface group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-on-surface-variant text-base leading-relaxed font-newsreader italic">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div 
              className="bg-cover bg-center rounded-[4rem] p-16 md:p-32 text-center shadow-2xl relative overflow-hidden"
              style={{ backgroundImage: `url(${ctaBg})` }}
            >
               <div className="absolute inset-0 bg-green-900/60 transition-colors group-hover:bg-green-900/40"></div>
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-7xl font-serif-display text-white mb-10 leading-[1.1] tracking-tight">Façonnez l'Avenir Agricole <br className="hidden md:block"/> du Burkina Faso</h2>
                 <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-16 leading-relaxed font-newsreader italic">"Rejoignez plus de 1 200 acteurs déjà engagés dans la transformation digitale."</p>
                 <div className="flex flex-wrap justify-center gap-6">
                    <button 
                      onClick={() => navigate('/register')} 
                      className="px-12 py-5 bg-white text-primary font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl hover:bg-muted hover:scale-105 active:scale-95 transition-all"
                    >
                      S'inscrire gratuitement
                    </button>
                    <button 
                      onClick={() => navigate('/catalog')} 
                      className="px-12 py-5 border border-white/30 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 active:scale-95 transition-all"
                    >
                      Consulter le marché
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      <VisitorFooter />
    </div>
  );
};

export default HomePage;
