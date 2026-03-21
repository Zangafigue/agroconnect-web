import React from 'react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Inscription & Profil",
      description: "Créez votre compte en choisissant votre rôle (Agriculteur, Acheteur ou Transporteur). Complétez votre profil pour instaurer la confiance.",
      icon: "person_add",
      color: "bg-primary"
    },
    {
      title: "Marché & Négociation",
      description: "Explorez le catalogue ou publiez vos produits. Utilisez notre messagerie sécurisée pour discuter des détails et négocier les prix.",
      icon: "chat",
      color: "bg-secondary"
    },
    {
      title: "Paiement Sécurisé",
      description: "Effectuez vos transactions via Mobile Money ou virement. Les fonds sont bloqués sur un compte tiers jusqu'à la confirmation de livraison.",
      icon: "account_balance_wallet",
      color: "bg-tertiary"
    },
    {
      title: "Livraison & Notation",
      description: "Suivez votre cargaison en temps réel. Une fois reçue, confirmez la livraison pour libérer les fonds et notez votre partenaire.",
      icon: "local_shipping",
      color: "bg-primary-container"
    }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <section className="mb-20 text-center">
          <h1 className="text-5xl font-serif-display text-primary mb-6">Comment fonctionne AgroConnect BF ?</h1>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto font-body leading-relaxed">
            Notre plateforme simplifie les échanges agricoles au Burkina Faso en utilisant la technologie pour sécuriser chaque étape de la transaction, du champ à l'assiette.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative items-start">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 bg-outline-variant/30 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center text-white shadow-xl mb-8 group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-3 block">Étape {index + 1}</span>
                <h3 className="text-xl font-bold mb-4 font-headline text-on-surface">{step.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Roles Details Section */}
        <section className="mt-32">
          <h2 className="text-4xl font-serif-display text-center text-on-surface mb-16">Chaque acteur a son importance</h2>
          <div className="space-y-12">
            {/* Buyer */}
            <div className="bg-surface-container-low rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Acheteurs</span>
                <h3 className="text-3xl font-serif-display mb-6">Accédez aux meilleurs produits du terroir</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Recherche multicritère par région, produit ou certification.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Paiements sécurisés garantissant le remboursement en cas de litige.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Historique d'achat et facturation automatisée.</p>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full h-[300px] bg-blue-200 rounded-2xl overflow-hidden shadow-2xl skew-x-1 hover:skew-x-0 transition-transform">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdyL79Apw0VTsvR4lzRkLAFe-XmOtFg29Bjirft9Tp5GbIshX-L-LpuH9Xpl8Or1nyJoT8L4T3sZ8dd6PVqyJqC-ofucdt6EdOa-s7cijtC36IlHpj1nugKisDOdUpy50ZHTnQTAsYp-Zmi5hVsiG-SHFMsDT8ctl2yHgZIZmTLtjYSZb9sFQuwbm_xCV5SohlbZUCsu0tZZV3dJuZhasMOYuuP4itzaaA0lTWBFObjVxRPyAEXEZZnWA8CwdWpbDEnYfoeYQN18g" className="w-full h-full object-cover" alt="Acheteur" />
              </div>
            </div>

            {/* Farmer */}
            <div className="bg-surface-container-low rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="flex-1">
                <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Agriculteurs</span>
                <h3 className="text-3xl font-serif-display mb-6">Élargissez votre marché et sécurisez vos revenus</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-green-600 mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Visibilité nationale sans intermédiaires physiques.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-green-600 mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Gestion simple des stocks et des commandes via mobile.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-green-600 mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Paiement garanti une fois la marchandise expédiée et reçue.</p>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full h-[300px] bg-green-200 rounded-2xl overflow-hidden shadow-2xl -skew-x-1 hover:skew-x-0 transition-transform">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOQbG8JDIK6vGUzBVqMEJ5zI6FC5ZhkVPnuqse0S7hCdxf2U1SSB1q3xTEZgDscGi3iG8HpJs0BFs99pmHUMXpLtkAOmMDnkvx6Ig1iGKkQ-FennHKWjN08QNs7jiDlzHtwQublD0HE7ntsHeYVnog2-QUB6Z8wssfeG_2tQ6Tr6yz5PaJnxFQLeLu0U2qjwW5m5S2uceFEn_uCOPn3NKAMarBkeewhCEL47SaG9t49jm7uRzdyL74SRQZ7WvEhK129gkC_5Fqi1M" className="w-full h-full object-cover" alt="Agriculteur" />
              </div>
            </div>

            {/* Transporter */}
            <div className="bg-surface-container-low rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <span className="px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Transporteurs</span>
                <h3 className="text-3xl font-serif-display mb-6">Optimisez vos camions et sécurisez vos missions</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-orange-600 mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Accès direct aux besoins de transport partout au pays.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-orange-600 mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Paiement garanti par la plateforme dès confirmation de réception.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-orange-600 mt-1">check_circle</span>
                    <p className="text-on-surface-variant">Réduction des kilomètres parcourus à vide.</p>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full h-[300px] bg-orange-200 rounded-2xl overflow-hidden shadow-2xl skew-x-1 hover:skew-x-0 transition-transform">
                <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Transporteur" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <VisitorFooter />
    </div>
  );
}
