import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  CheckCircle2, 
  Users, 
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useProductStore() as any;
  const [activeHowItWorks, setActiveHowItWorks] = useState<'buyers' | 'farmers' | 'transporters'>('buyers');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

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
    <div className="flex flex-col min-h-screen bg-[var(--bg-page)] text-[var(--text-[var(--text-accent)])] font-body">
      <VisitorHeader theme="dark" />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[680px] pt-16 bg-hero-field flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-[var(--green-600)]/95 text-white text-[10px] font-bold tracking-[0.2em] rounded-full uppercase mb-8 shadow-xl">
                L'AGRI-TECH AU BURKINA FASO
              </span>
              <h1 className="text-5xl md:text-7xl font-serif-display text-white mb-8 leading-[1.1]">
                L'excellence agricole burkinabè, <span className="text-[var(--text-accent)]">en direct</span>.
              </h1>
              <p className="text-xl text-white/95 mb-12 max-w-xl font-body leading-relaxed">
                Connectez-vous directement aux producteurs certifiés du Burkina Faso. Négociez au juste prix et sécurisez votre approvisionnement.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="px-10 py-4.5 bg-[var(--green-600)] text-[var(--text-inverse)] font-bold rounded-2xl hover:bg-[var(--bg-surface)] hover:text-[var(--text-accent)] shadow-2xl transition-all flex items-center gap-3 group active:scale-95"
                >
                  Explorer le marché
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-10 py-4.5 bg-white/10 backdrop-blur-lg border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white hover:text-on-background transition-all active:scale-95"
                >
                  Devenir partenaire
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories / Filières Section - Dynamic Marquee */}
        <section className="py-24 bg-white overflow-hidden border-b border-[var(--gray-100)]">
          <div className="mb-16 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display text-[var(--gray-900)] mb-4 tracking-tight">Nos Filières d'Excellence</h2>
            <p className="text-lg text-[var(--gray-501)]">Le Burkina regorge de trésors. Nous avons sélectionné pour vous le meilleur de chaque terroir.</p>
          </div>
          
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee flex gap-10 py-8">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="flex gap-10">
                  {[
                    { title: 'CÉRÉALES', image: cerealesImg, desc: 'Maïs, Riz et Mil de nos plaines fertiles.' },
                    { title: 'LÉGUMES', image: legumesImg, desc: 'Frais, croquants et cultivés avec soin.' },
                    { title: 'FRUITS', image: fruitsImg, desc: 'Mangues et Agrumes gorgés de soleil.' },
                    { title: 'TUBERCULES', image: tuberculesImg, desc: 'Yam, Manioc et Patates du terroir.' },
                  ].map((cat, i) => (
                    <div key={`${idx}-${i}`} className="group relative w-[600px] md:w-[850px] h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-1000 cursor-pointer">
                       <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-black/10 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                       
                       <div className="relative z-10 p-16 flex flex-col justify-end h-full">
                          <h3 className="text-sm md:text-base font-black tracking-[0.4em] text-[var(--green-400)] mb-6 uppercase drop-shadow-lg">{cat.title}</h3>
                          <h4 className="text-6xl md:text-8xl font-display text-white mb-6 leading-none tracking-tighter drop-shadow-2xl">{cat.title}</h4>
                          <p className="text-white/80 text-xl font-medium max-w-md transition-all duration-700 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 leading-relaxed">{cat.desc}</p>
                          
                          <div className="mt-12 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 translate-y-8 group-hover:translate-y-0">
                             <div className="w-16 h-16 rounded-full bg-white text-[var(--gray-900)] flex items-center justify-center shadow-2xl group-hover:bg-[var(--green-400)] group-hover:text-white transition-colors duration-500">
                               <ArrowRight size={24} />
                             </div>
                             <span className="text-white font-black text-xs md:text-sm tracking-[0.3em] uppercase">Découvrir la filière</span>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-32 bg-[var(--gray-50)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="text-5xl font-display text-[var(--gray-900)] mb-6 tracking-tight">Offres Vedettes</h2>
                <p className="text-lg text-[var(--gray-501)] leading-relaxed">Directement du champ à votre table, découvrez les pépites de nos producteurs partenaires.</p>
              </div>
              <button 
                onClick={() => navigate('/catalog')}
                className="px-10 py-5 bg-black text-white font-bold rounded-2xl hover:bg-[var(--green-600)] transition-all shadow-xl flex items-center gap-3 group"
              >
                Accéder au Marché 
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loading ? (
                <div className="col-span-full py-32 text-center bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-light)] shadow-inner">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-[var(--text-muted)] font-bold text-xl font-headline">Collecte des pépites du terroir...</p>
                </div>
              ) : featuredProducts.length > 0 ? (
                <>
                  {featuredProducts.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                  <div className="bg-[var(--bg-subtle)]/50 rounded-[2.5rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-12 text-center min-h-[450px]">
                    <div className="w-20 h-20 bg-[var(--green-600)] text-[var(--text-inverse)] rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                        <ShoppingBag size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 font-headline text-[var(--text-[var(--text-accent)])]">Exposez vos récoltes</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed">Producteurs burkinabè, rejoignez plus de 800 vendeurs déjà actifs.</p>
                    <button onClick={() => navigate('/register')} className="px-8 py-3 bg-[var(--bg-surface)] text-[var(--text-accent)] font-bold rounded-xl shadow-md border border-[var(--border-light)] flex items-center gap-2 hover:scale-105 transition-all">
                      S'inscrire comme vendeur <ArrowRight size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="col-span-full py-20 text-center bg-[var(--bg-surface)] rounded-[2rem] border-2 border-dashed border-[var(--border-light)]">
                    <p className="text-[var(--text-muted)] font-bold">Zéro produit vedette pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-40 bg-[var(--section-why-bg)] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-1/4 right-0 w-1/2 h-full bg-[var(--green-600)] rounded-full blur-[180px] -rotate-12 translate-x-24"></div>
             <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[var(--green-600)] rounded-full blur-[140px] translate-y-24 -translate-x-12 opacity-40"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-32 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-display mb-10 tracking-tight leading-[1.1]">Pourquoi<br/>AgroConnect BF ?</h2>
              <p className="text-xl text-white/70 leading-relaxed italic border-l-4 border-[var(--green-600)] pl-8 py-2">
                "Nous digitalisons la confiance pour bâtir une agriculture burkinabè résiliente et prospère."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
              {[
                { title: 'Direct Producteur', desc: 'Court-circuitez les intermédiaires. Traitez directement avec ceux qui cultivent la terre.', icon: Handshake },
                { title: 'Prix Équitable', desc: 'Une transparence totale sur les prix pour une rémunération juste et durable.', icon: Wallet },
                { title: 'Logistique Sûre', desc: 'Réseau de transporteurs certifiés garantissant fraîcheur et traçabilité.', icon: Truck },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-28 h-28 bg-white/5 backdrop-blur-3xl text-white rounded-[2.5rem] border border-white/20 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[var(--green-600)] group-hover:border-[var(--green-600)] transition-all duration-700 shadow-2xl">
                    <item.icon size={48} />
                  </div>
                  <h3 className="text-3xl font-display mb-6 tracking-tight">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed max-w-[280px] mx-auto text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works with Tabs */}
        <section className="py-32 bg-[var(--bg-page)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-4xl md:text-5xl font-serif-display text-[var(--text-[var(--text-accent)])] mb-12">Comment ça marche ?</h2>
            
            <div className="inline-flex p-1.5 bg-border/50 rounded-2xl mb-16 shadow-inner">
              {[
                { id: 'buyers', label: 'Acheteurs' },
                { id: 'farmers', label: 'Producteurs' },
                { id: 'transporters', label: 'Transporteurs' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveHowItWorks(tab.id as any)}
                  className={`px-8 py-3 rounded-xl transition-all text-sm font-bold ${activeHowItWorks === tab.id ? 'bg-[var(--bg-surface)] text-[var(--text-accent)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-accent)]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {howItWorksContent[activeHowItWorks].map((step, i) => (
                <div key={step.id} className="relative group text-left p-8 bg-[var(--bg-surface)]/50 backdrop-blur-sm rounded-[2rem] border border-[var(--border-light)] hover:bg-[var(--bg-surface)] transition-all shadow-sm hover:shadow-xl">
                  <div className="text-7xl font-serif-display text-[var(--text-accent)]/10 absolute -top-4 -right-4 group-hover:text-[var(--text-accent)]/20 transition-colors">{i + 1}</div>
                  <div className="w-14 h-14 bg-[var(--bg-subtle)] text-[var(--text-accent)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <step.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 font-headline text-[var(--text-[var(--text-accent)])]">{step.title}</h4>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[var(--section-cta-bg)] rounded-[3.5rem] p-16 md:p-24 text-center shadow-2xl relative overflow-hidden text-white border border-white/5">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--green-600)]/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--green-600)]/5 rounded-full -ml-32 -mb-32 blur-2xl"></div>
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-serif-display text-white mb-10 leading-tight">Rejoignez 1 200 acteurs <br/>agricoles déjà actifs</h2>
                 <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed font-body italic">"Faites partie de la révolution agricole digitale au Burkina Faso. Créez votre compte gratuitement aujourd'hui."</p>
                 <div className="flex flex-wrap justify-center gap-6">
                   <button onClick={() => navigate('/register')} className="px-12 py-5 bg-[var(--green-600)] text-white font-bold rounded-2xl shadow-xl hover:shadow-[var(--green-600)]/40 hover:scale-105 transition-all text-lg">
                     Créer mon compte
                   </button>
                   <button onClick={() => navigate('/catalog')} className="px-12 py-5 bg-white/10 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-lg">
                     Explorer le marché
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
