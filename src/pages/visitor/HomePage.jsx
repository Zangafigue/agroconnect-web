import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useProductStore } from '../../store/productStore';
import { getSellerName, getSellerInitials } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

export default function HomePage() {
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useProductStore();
  const [activeHowItWorks, setActiveHowItWorks] = useState('buyers');

  const howItWorksContent = {
    buyers: [
      { id: 1, title: 'Exploration', desc: 'Naviguez par filière ou région pour trouver les produits dont vous avez besoin.', icon: '1' },
      { id: 2, title: 'Négociation', desc: 'Discutez des quantités et des prix directement sur notre messagerie sécurisée.', icon: '2' },
      { id: 3, title: 'Paiement', desc: 'Effectuez votre transaction via Mobile Money ou virement, les fonds sont sécurisés.', icon: '3' },
      { id: 4, title: 'Réception', desc: 'Suivez votre commande jusqu\'à la livraison finale par nos partenaires logistiques.', icon: '4' }
    ],
    farmers: [
      { id: 1, title: 'Inscription', desc: 'Créez votre profil certifié et mettez en avant votre savoir-faire agricole.', icon: '1' },
      { id: 2, title: 'Publication', desc: 'Listez vos récoltes en quelques clics avec photos et prix du jour.', icon: '2' },
      { id: 3, title: 'Vente Directe', desc: 'Recevez des offres d\'achat et discutez en direct avec vos clients.', icon: '3' },
      { id: 4, title: 'Expédition', desc: 'Remettez vos produits aux transporteurs certifiés pour une livraison sécurisée.', icon: '4' }
    ],
    transporters: [
      { id: 1, title: 'Certification', desc: 'Enregistrez vos véhicules et rejoignez notre réseau de logistique agréé.', icon: '1' },
      { id: 2, title: 'Missions', desc: 'Trouvez des opportunités de transport de fret agricole partout au pays.', icon: '2' },
      { id: 3, title: 'Livraison', desc: 'Optimisez vos trajets et assurez le transport sécurisé des produits.', icon: '3' },
      { id: 4, title: 'Paiement Rapide', desc: 'Soyez payé immédiatement après la confirmation de réception par le client.', icon: '4' }
    ]
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  return (
    <>
      <VisitorHeader />

      <section className="h-[580px] bg-hero-field relative flex items-center" data-alt="Vaste champ agricole au Burkina Faso sous un lever de soleil ocre">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <span className="text-primary-fixed bg-primary-container/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] mb-6 inline-block uppercase">
              AGRI-TECH BURKINA FASO
            </span>
            <h1 className="text-5xl md:text-7xl font-serif-display text-white mb-6 leading-[1.1]">
              L'excellence agricole du Burkina Faso, à portée de clic
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-xl font-body leading-relaxed">
              Connectez-vous directement aux producteurs certifiés et transformez la chaîne d'approvisionnement agricole.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog" className="px-8 py-4 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg hover:bg-primary-container">
                Explorer le marché
              </Link>
              <Link to="/register" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl active:scale-95 transition-transform hover:bg-white hover:text-primary transition-colors">
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-serif-display text-on-surface mb-4">Nos Filières Stratégiques</h2>
            <div className="w-24 h-1.5 bg-tertiary-container rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#14532d] p-10 rounded-xl flex flex-col justify-between group hover:shadow-xl transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="grass">grass</span>
                <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-white mb-2 tracking-tight">CÉRÉALES</h3>
                <p className="text-white/70 font-body text-sm">Maïs, Sorgho, Mil et Riz de qualité supérieure récoltés localement.</p>
              </div>
            </div>
            <div className="border-2 border-primary/10 bg-white p-10 rounded-xl flex flex-col justify-between group hover:border-primary transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="nutrition">nutrition</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-on-surface mb-2 tracking-tight">LÉGUMES</h3>
                <p className="text-on-surface-variant font-body text-sm">Produits maraîchers frais direct des périmètres irrigués.</p>
              </div>
            </div>
            <div className="border-2 border-primary/10 bg-white p-10 rounded-xl flex flex-col justify-between group hover:border-primary transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="eco">eco</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-on-surface mb-2 tracking-tight">FRUITS</h3>
                <p className="text-on-surface-variant font-body text-sm">Mangues, Agrumes et Papayes gorgés de soleil du Sud-Ouest.</p>
              </div>
            </div>
            <div className="border-2 border-primary/10 bg-white p-10 rounded-xl flex flex-col justify-between group hover:border-primary transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="agriculture">agriculture</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-on-surface mb-2 tracking-tight">TUBERCULES</h3>
                <p className="text-on-surface-variant font-body text-sm">Igname, Manioc et Patate douce du terroir burkinabè.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif-display text-on-surface mb-2">Produits Vedettes</h2>
              <p className="text-on-surface-variant font-body">Les meilleures offres disponibles en ce moment</p>
            </div>
            <Link to="/catalog" className="text-primary font-bold flex items-center gap-2 group underline-offset-4 hover:underline">
              Tout voir <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-on-surface-variant font-bold">Chargement des produits...</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div 
                  key={`home-prod-${product.id || product._id || index}`} 
                  className="bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-outline-variant/5 cursor-pointer flex flex-col justify-between"
                  onClick={() => navigate(`/catalog/${product.id || product._id}`)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Vedette</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-on-surface font-headline">{product.name}</h3>
                      <span className="font-mono text-primary font-bold text-lg">{formatFCFA(product.price)}/{product.unit}</span>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10 mt-auto">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                        {getSellerInitials(product.seller)}
                      </div>
                      <span className="text-sm font-medium text-on-surface-variant">{getSellerName(product.seller)} — {product.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <div className="col-span-full py-12 text-center bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/30">
                    <p className="text-on-surface-variant font-bold">Aucun produit vedette disponible</p>
                </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#14532d] py-24 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif-display mb-4">Pourquoi Choisir AgroConnect BF ?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Nous digitalisons la confiance pour bâtir une agriculture burkinabè résiliente et prospère.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="handshake">handshake</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Connexion Directe</h3>
              <p className="text-white/60 text-sm leading-relaxed">Éliminez les intermédiaires inutiles. Traitez directement avec ceux qui cultivent la terre.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="account_balance_wallet">account_balance_wallet</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Négociation Équitable</h3>
              <p className="text-white/60 text-sm leading-relaxed">Transparence totale sur les prix du marché pour une rémunération juste des producteurs.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="local_shipping">local_shipping</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Logistique Fiable</h3>
              <p className="text-white/60 text-sm leading-relaxed">Réseau de transporteurs certifiés pour garantir la fraîcheur et la sécurité de vos produits.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif-display text-on-surface mb-8">Comment ça marche ?</h2>
            <div className="inline-flex p-1 bg-surface-container-high rounded-xl font-label text-sm">
              <button 
                onClick={() => setActiveHowItWorks('buyers')}
                className={`px-6 py-2 rounded-lg transition-all ${activeHowItWorks === 'buyers' ? 'bg-white text-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Acheteurs
              </button>
              <button 
                onClick={() => setActiveHowItWorks('farmers')}
                className={`px-6 py-2 rounded-lg transition-all ${activeHowItWorks === 'farmers' ? 'bg-white text-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Producteurs
              </button>
              <button 
                onClick={() => setActiveHowItWorks('transporters')}
                className={`px-6 py-2 rounded-lg transition-all ${activeHowItWorks === 'transporters' ? 'bg-white text-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Transporteurs
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorksContent[activeHowItWorks].map((step) => (
              <div key={step.id} className="relative group">
                <div className="text-8xl font-serif-display text-primary/10 absolute -top-4 -left-4 group-hover:text-primary/20 transition-colors">{step.icon}</div>
                <div className="relative pt-12">
                  <h4 className="text-xl font-bold mb-2 font-headline">{step.title}</h4>
                  <p className="text-on-surface-variant text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to={activeHowItWorks === 'buyers' ? '/catalog' : activeHowItWorks === 'farmers' ? '/farmers' : '/transporters'}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-all group"
            >
              En savoir plus sur l'espace {activeHowItWorks === 'buyers' ? 'Acheteur' : activeHowItWorks === 'farmers' ? 'Producteur' : 'Transporteur'}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-[#f0fdf4] rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary/5 rounded-full -ml-24 -mb-24"></div>
            <h2 className="text-4xl md:text-5xl font-serif-display text-primary mb-6 relative z-10">Rejoignez 1 200 acteurs agricoles</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 font-body relative z-10">Faites partie de la révolution agricole digitale au Burkina Faso. Créez votre compte gratuitement aujourd'hui.</p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link to="/register" className="px-10 py-4 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg">S'inscrire gratuitement</Link>
              <Link to="/catalog" className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-xl active:scale-95 transition-transform hover:bg-primary/5">Consulter le marché</Link>
            </div>
          </div>
        </div>
      </section>

      <VisitorFooter />
    </>
  );
}
