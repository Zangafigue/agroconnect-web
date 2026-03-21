import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Target, Truck, ArrowRight, ShieldCheck, Zap, Globe, ShoppingBag } from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import ProductCard from '../../components/shared/ProductCard';

// Temporary type for mocked products in Hero/Featured
const FEATURED_PRODUCTS = [
  {
    _id: '1',
    name: 'Maïs Blanc Premium',
    description: 'Récolte fraîche de Bobo-Dioulasso, séché naturellement au soleil.',
    price: 18500,
    unit: 'sac',
    category: 'Céréales',
    city: 'Bobo-Dioulasso',
    images: ['/home/zangafigue/.gemini/antigravity/brain/827e0c77-2634-44eb-adf7-a7c9ce45c815/burkina_maize_premium_1774107877300.png'],
  },
  {
    _id: '2',
    name: 'Tomates de Réo',
    description: 'Tomates charnues et juteuses cultivées sans pesticides chimiques.',
    price: 4200,
    unit: 'cagette',
    category: 'Légumes',
    city: 'Réo',
    images: ['/home/zangafigue/.gemini/antigravity/brain/827e0c77-2634-44eb-adf7-a7c9ce45c815/burkina_tomatoes_fresh_1774108068733.png'],
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body">
      <VisitorHeader />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[650px] bg-hero-field flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary/90 text-white text-[10px] font-bold tracking-[0.2em] rounded-full uppercase mb-6 animate-in fade-in slide-in-from-bottom duration-700">
                La Révolution Agri-Tech au Burkina Faso
              </span>
              <h1 className="text-5xl md:text-7xl font-serif-display text-white mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000">
                L'excellence agricole burkinabè, <span className="text-primary-fixed">en direct</span>.
              </h1>
              <p className="text-xl text-white/90 mb-10 max-w-xl font-body leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                Connectez-vous directement aux producteurs certifiés, négociez au juste prix et sécurisez votre approvisionnement.
              </p>
              <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-container hover:text-on-primary-container shadow-xl transition-all flex items-center gap-2 group"
                >
                  Explorer le marché
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-2xl hover:bg-white hover:text-primary transition-all"
                >
                  Devenir partenaire
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories / Filières Section */}
        <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-4">Nos Filières Stratégiques</h2>
              <div className="w-20 h-1.5 bg-primary/20 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Céréales', icon: Leaf, desc: 'Maïs, Sorgho, Mil et Riz local.' },
                { name: 'Légumes', icon: Zap, desc: 'Maraîchage frais et bio.' },
                { name: 'Fruits', icon: Globe, desc: 'Mangues et agrumes du sud.' },
                { name: 'Élevage', icon: Truck, desc: 'Bétail et produits laitiers.' },
              ].map((cat) => (
                <div key={cat.name} className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/50 hover:bg-white transition-all group flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <cat.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-headline">{cat.name}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-serif-display text-on-surface mb-2">Offres Vedettes</h2>
                <p className="text-outline font-medium uppercase tracking-widest text-xs">Produits certifiés disponibles</p>
              </div>
              <button 
                onClick={() => navigate('/catalog')}
                className="flex items-center gap-2 text-primary font-bold hover:underline"
              >
                Voir tout le marché <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              <div className="bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                 <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Votre produit ici ?</h3>
                 <p className="text-on-surface-variant text-sm mb-6">Agriculteurs, rejoignez la plateforme pour vendre vos récoltes.</p>
                 <button onClick={() => navigate('/register')} className="font-bold text-primary hover:underline flex items-center gap-1">
                   S'inscrire comme vendeur <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 px-4">
              <h2 className="text-4xl font-serif-display mb-4">La confiance digitalisée</h2>
              <p className="text-primary-fixed/80 max-w-2xl mx-auto">Pourquoi AgroConnect BF est le partenaire idéal pour votre business agricole.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: 'Qualité Certifiée', desc: 'Réseau de producteurs vérifiés sur le terrain par nos agents régionaux.', icon: ShieldCheck },
                { title: 'Paiement Sécurisé', desc: 'Système d\'escrow bloquant les fonds jusqu\'à confirmation de la livraison.', icon: ShieldCheck },
                { title: 'Logistique Intégrée', desc: 'Suivi en temps réel de vos marchandises avec nos transporteurs partenaires.', icon: Truck },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform">
                    <item.icon size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-headline">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-surface-container border border-outline-variant/30 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-5xl font-serif-display text-primary mb-8">Prêt à transformer votre chaîne d'approvisionnement ?</h2>
                 <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-12">Rejoignez plus de 1 200 acteurs du secteur agricole dès aujourd'hui.</p>
                 <div className="flex flex-wrap justify-center gap-6">
                    <button onClick={() => navigate('/register')} className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">Créer un profil gratuit</button>
                    <button onClick={() => navigate('/catalog')} className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary/5 transition-all">Parcourir le catalogue</button>
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
