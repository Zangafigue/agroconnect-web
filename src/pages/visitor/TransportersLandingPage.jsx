import React from 'react';
import { Link } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';

export default function TransportersLandingPage() {
  const benefits = [
    {
      title: "Flux de Cargo Constant",
      desc: "Accédez à des milliers de demandes de transport de produits agricoles chaque jour.",
      icon: "local_shipping"
    },
    {
      title: "Paiement Rapide",
      desc: "Plus besoin d'attendre des semaines. Soyez payé dès que la livraison est confirmée.",
      icon: "payments"
    },
    {
      title: "Optimisation des Trajets",
      desc: "Trouvez des chargements pour vos trajets retours et évitez de rouler à vide.",
      icon: "route"
    },
    {
      title: "Gestion Digitale",
      desc: "Suivez vos missions, vos factures et vos performances depuis votre espace dédié.",
      icon: "dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <VisitorHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-[#0c200d] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-serif-display mb-6">Rentabilisez vos camions avec AgroConnect</h1>
              <p className="text-xl text-white/80 mb-10 font-body">
                Rejoignez le réseau de logistique leader au Burkina Faso. Connectez-vous aux producteurs et sécurisez votre carnet de route.
              </p>
              <Link to="/register" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all inline-block">
                Rejoindre le réseau logistique
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none flex items-center justify-center">
             <span className="material-symbols-outlined text-[40rem] leading-none">distance</span>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif-display text-on-surface mb-4">Optimisez votre logistique</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Nous simplifions la mise en relation entre le besoin de transport et vos capacités logistiques.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-8 bg-surface-container-high rounded-3xl border border-outline-variant/5 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-headline">{benefit.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Flow */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif-display mb-8">Comment devenir transporteur agréé ?</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                  <h4 className="font-bold flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                    Création du compte
                  </h4>
                  <p className="text-sm text-on-surface-variant">Inscrivez-vous et fournissez les détails de votre entreprise de transport.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                  <h4 className="font-bold flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                    Validation des véhicules
                  </h4>
                  <p className="text-sm text-on-surface-variant">Soumettez vos cartes grises et certifications pour garantir la sécurité du fret.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                  <h4 className="font-bold flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                    Offres de missions
                  </h4>
                  <p className="text-sm text-on-surface-variant">Consultez les missions disponibles, faites vos offres et commencez à rouler.</p>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 rounded-[3rem] p-12 relative">
               <div className="material-symbols-outlined text-primary text-[10rem] opacity-20 absolute top-4 right-4 animate-pulse">check_circle</div>
               <h3 className="text-2xl font-bold mb-4">Prêt à démarrer ?</h3>
               <p className="text-on-surface-variant mb-8 leading-relaxed">Rejoignez AgroConnect BF et participez au désenclavement des zones de production agricole.</p>
               <Link to="/register" className="block w-full text-center py-4 bg-primary text-white font-bold rounded-xl shadow-lg">Soumettre mon dossier</Link>
            </div>
          </div>
        </section>
      </main>
      
      <VisitorFooter />
    </div>
  );
}
