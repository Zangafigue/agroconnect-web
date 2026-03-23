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
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body">
      <VisitorHeader />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[680px] bg-hero-field flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary/95 text-white text-[10px] font-bold tracking-[0.2em] rounded-full uppercase mb-8 shadow-xl">
                L'AGRI-TECH AU BURKINA FASO
              </span>
              <h1 className="text-5xl md:text-7xl font-serif-display text-white mb-8 leading-[1.1]">
                L'excellence agricole burkinabè, <span className="text-primary-fixed">en direct</span>.
              </h1>
              <p className="text-xl text-white/95 mb-12 max-w-xl font-body leading-relaxed">
                Connectez-vous directement aux producteurs certifiés du Burkina Faso. Négociez au juste prix et sécurisez votre approvisionnement.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="px-10 py-4.5 bg-primary text-white font-bold rounded-2xl hover:bg-white hover:text-primary shadow-2xl transition-all flex items-center gap-3 group active:scale-95"
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

        {/* Categories / Filières Section */}
        <section className="py-32 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-6">Nos Filières Stratégiques</h2>
              <div className="w-24 h-2 bg-primary/20 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { title: 'CÉRÉALES', icon: Leaf, desc: 'Maïs, Sorgho, Mil et Riz de qualité supérieure récoltés localement.', color: 'bg-primary', light: false },
                 { title: 'LÉGUMES', icon: Zap, desc: 'Produits maraîchers frais direct des périmètres irrigués.', color: 'bg-white', light: true },
                 { title: 'FRUITS', icon: Grape, desc: 'Mangues, Agrumes et Papayes gorgés de soleil du Sud-Ouest.', color: 'bg-white', light: true },
                 { title: 'TUBERCULES', icon: Sprout, desc: 'Igname, Manioc et Patate douce du terroir burkinabè.', color: 'bg-white', light: true },
               ].map((cat, i) => (
                 <div key={i} className={`p-10 rounded-[2.5rem] flex flex-col justify-between group transition-all h-[320px] ${cat.light ? 'border-2 border-primary/10 hover:border-primary bg-white' : 'bg-primary text-white shadow-xl shadow-primary/10'}`}>
                    <div className="flex justify-between items-start">
                      <div className={`p-4 rounded-2xl ${cat.light ? 'bg-primary/10 text-primary' : 'bg-white/10 text-white'}`}>
                        <cat.icon size={36} />
                      </div>
                      <ArrowRight className={`${cat.light ? 'text-outline-variant group-hover:text-primary' : 'text-white/30'} -rotate-45 group-hover:rotate-0 transition-all`} size={32} />
                    </div>
                    <div>
                      <h3 className={`text-4xl font-serif-display mb-3 tracking-tight ${cat.light ? 'text-on-surface' : 'text-white'}`}>{cat.title}</h3>
                      <p className={`text-sm leading-relaxed ${cat.light ? 'text-on-surface-variant' : 'text-white/70'}`}>{cat.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-3">Offres Vedettes</h2>
                <p className="text-primary font-bold uppercase tracking-widest text-xs">Le meilleur du Burkina Faso en exclusivité</p>
              </div>
              <button 
                onClick={() => navigate('/catalog')}
                className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all underline underline-offset-8"
              >
                Tout voir sur le marché <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loading ? (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-outline-variant/10 shadow-inner">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-on-surface-variant font-bold text-xl font-headline">Collecte des pépites du terroir...</p>
                </div>
              ) : featuredProducts.length > 0 ? (
                <>
                  {featuredProducts.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                  <div className="bg-primary/5 rounded-[2.5rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-12 text-center min-h-[450px]">
                    <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                        <ShoppingBag size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 font-headline">Exposez vos récoltes</h3>
                    <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">Producteurs burkinabè, rejoignez plus de 800 vendeurs déjà actifs.</p>
                    <button onClick={() => navigate('/register')} className="px-8 py-3 bg-white text-primary font-bold rounded-xl shadow-md border border-primary/10 flex items-center gap-2 hover:scale-105 transition-all">
                      S'inscrire comme vendeur <ArrowRight size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="col-span-full py-20 text-center bg-surface-container-low rounded-[2rem] border-2 border-dashed border-outline-variant/30">
                    <p className="text-on-surface-variant font-bold">Zéro produit vedette pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-32 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
             <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary-fixed rounded-full blur-[80px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center mb-24 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif-display mb-6">Pourquoi AgroConnect BF ?</h2>
              <p className="text-white/70 text-lg leading-relaxed italic font-newsreader">"Nous digitalisons la confiance pour bâtir une agriculture burkinabè résiliente et prospère."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {[
                { title: 'Connexion Directe', desc: 'Éliminez les intermédiaires inutiles. Traitez directement avec ceux qui cultivent la terre.', icon: Handshake },
                { title: 'Négociation Équitable', desc: 'Transparence totale sur les prix du marché pour une rémunération juste des producteurs.', icon: Wallet },
                { title: 'Logistique Fiable', desc: 'Réseau de transporteurs certifiés pour garantir la fraîcheur et la sécurité de vos produits.', icon: Truck },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-10 border border-white/20 group-hover:rotate-6 group-hover:bg-white group-hover:text-primary transition-all shadow-xl">
                    <item.icon size={44} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-headline">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works with Tabs */}
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-12">Comment ça marche ?</h2>
            
            <div className="inline-flex p-1.5 bg-surface-container-high rounded-2xl mb-16 shadow-inner">
              {[
                { id: 'buyers', label: 'Acheteurs' },
                { id: 'farmers', label: 'Producteurs' },
                { id: 'transporters', label: 'Transporteurs' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveHowItWorks(tab.id as any)}
                  className={`px-8 py-3 rounded-xl transition-all text-sm font-bold ${activeHowItWorks === tab.id ? 'bg-white text-primary shadow-lg' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {howItWorksContent[activeHowItWorks].map((step, i) => (
                <div key={step.id} className="relative group text-left p-8 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-white/20 hover:bg-white transition-all shadow-sm hover:shadow-xl">
                  <div className="text-7xl font-serif-display text-primary/10 absolute -top-4 -right-4 group-hover:text-primary/20 transition-colors">{i + 1}</div>
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <step.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 font-headline">{step.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#f0fdf4] dark:bg-slate-900 border-4 border-primary/5 rounded-[3.5rem] p-16 md:p-24 text-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/5 rounded-full -ml-32 -mb-32 blur-2xl"></div>
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-serif-display text-primary mb-10 leading-tight">Rejoignez 1 200 acteurs <br/>agricoles déjà actifs</h2>
                 <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-16 leading-relaxed font-body italic">"Faites partie de la révolution agricole digitale au Burkina Faso. Créez votre compte gratuitement aujourd'hui."</p>
                 <div className="flex flex-wrap justify-center gap-6">
                    <button onClick={() => navigate('/register')} className="px-12 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-lg">S'inscrire gratuitement</button>
                    <button onClick={() => navigate('/catalog')} className="px-12 py-5 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-white active:scale-95 transition-all text-lg">Consulter le marché</button>
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
