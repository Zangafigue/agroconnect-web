import React from 'react';
import { Link } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';

export default function FarmersLandingPage() {
  const benefits = [
    {
      title: "Visibilité Nationale",
      desc: "Vendez vos produits à des acheteurs partout au Burkina Faso sans intermédiaires.",
      icon: "visibility"
    },
    {
      title: "Prix Justes",
      desc: "Accédez aux cours du marché en temps réel et négociez au meilleur prix.",
      icon: "trending_up"
    },
    {
      title: "Paiement Sécurisé",
      desc: "Recevez vos fonds directement sur votre compte Mobile Money une fois la livraison validée.",
      icon: "lock"
    },
    {
      title: "Gestion Simplifiée",
      desc: "Gérez vos stocks, vos commandes et vos revenus depuis votre smartphone.",
      icon: "smartphone"
    }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <VisitorHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-[#14532d] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-serif-display mb-6">Faites grandir votre exploitation avec AgroConnect</h1>
              <p className="text-xl text-white/80 mb-10 font-body">
                Rejoignez la première plateforme numérique dédiée aux producteurs du Burkina. Vendez plus, plus vite et en toute sécurité.
              </p>
              <Link to="/register" className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-white/90 transition-all inline-block">
                Ouvrir ma boutique gratuite
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none">
            <span className="material-symbols-outlined text-[30rem] leading-none">agriculture</span>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif-display text-on-surface mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Nous mettons la technologie au service de votre travail acharné pour maximiser vos profits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-headline">{benefit.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works for Farmers */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1595066117564-9686035987a0?auto=format&fit=crop&q=80&w=800" 
                alt="Agriculteur utilisant un smartphone" 
                className="rounded-[3rem] shadow-2xl skew-y-3"
              />
            </div>
            <div className="flex-1 order-1 md:order-2">
              <h2 className="text-4xl font-serif-display mb-8">C'est simple comme bonjour</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-bold mb-1">Inscrivez-vous</h4>
                    <p className="text-sm text-on-surface-variant">Créez votre profil en 2 minutes avec votre numéro de téléphone.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-bold mb-1">Publiez vos produits</h4>
                    <p className="text-sm text-on-surface-variant">Prenez une photo de votre récolte, fixez votre prix et publiez.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Validez les ventes</h4>
                    <p className="text-sm text-on-surface-variant">Acceptez les offres des acheteurs et préparez la livraison.</p>
                  </div>
                </div>
              </div>
              <Link to="/register" className="mt-12 inline-block text-primary font-bold hover:underline">
                Commencer maintenant &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Preview or CTA */}
        <section className="py-24 text-center">
            <div className="max-w-3xl mx-auto px-8">
                <h2 className="text-4xl font-serif-display mb-6">Prêt à transformer votre activité ?</h2>
                <p className="text-on-surface-variant mb-10">Des centaines de producteurs nous font déjà confiance pour écouler leur production.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg">Créer un compte Producteur</Link>
                    <Link to="/how-it-works" className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-xl">Voir la FAQ</Link>
                </div>
            </div>
        </section>
      </main>
      
      <VisitorFooter />
    </div>
  );
}
