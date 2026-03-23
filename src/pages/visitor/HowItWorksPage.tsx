import React from 'react';
import { 
  PersonAdd, 
  MessageSquare, 
  Wallet, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      title: "Inscription & Profil",
      description: "Créez votre compte en choisissant votre rôle (Agriculteur, Acheteur ou Transporteur). Complétez votre profil pour instaurer la confiance.",
      icon: PersonAdd,
      color: "text-primary bg-primary/10"
    },
    {
      title: "Marché & Négociation",
      description: "Explorez le catalogue ou publiez vos produits. Utilisez notre messagerie sécurisée pour discuter des détails et négocier les prix.",
      icon: MessageSquare,
      color: "text-secondary bg-secondary/10"
    },
    {
      title: "Paiement Sécurisé",
      description: "Effectuez vos transactions via Mobile Money ou virement. Les fonds sont bloqués sur un compte tiers jusqu'à la confirmation de livraison.",
      icon: Wallet,
      color: "text-tertiary bg-tertiary/10"
    },
    {
      title: "Livraison & Notation",
      description: "Suivez votre cargaison en temps réel. Une fois reçue, confirmez la livraison pour libérer les fonds et notez votre partenaire.",
      icon: Truck,
      color: "text-primary bg-primary/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary-container selection:text-on-primary-container font-body">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <section className="mb-32 text-center animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 inline-block shadow-sm">
            PROCESSUS AGROCONNECT BF
          </span>
          <h1 className="text-5xl md:text-7xl font-serif-display text-on-surface mb-10 tracking-tight leading-[1.1]">
            Comment fonctionne <br/> <span className="text-primary italic">la plateforme ?</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-newsreader italic">
            "Notre plateforme simplifie les échanges agricoles au Burkina Faso en utilisant la technologie pour sécuriser chaque étape de la transaction, du champ à l'assiette."
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative items-start mb-40">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 bg-outline-variant/20 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center shadow-xl mb-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 border border-white/50 backdrop-blur-sm`}>
                <step.icon size={40} />
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col items-center">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">Étape {index + 1}</span>
                <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">{step.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Roles Details Section */}
        <section className="space-y-24">
          <h2 className="text-4xl md:text-5xl font-serif-display text-center text-on-surface mb-20 tracking-tight">Chaque acteur a son importance</h2>
          <div className="space-y-20">
            {/* Buyer */}
            <div className="bg-surface-container-low rounded-[4rem] p-10 md:p-16 flex flex-col lg:flex-row gap-16 items-center hover:bg-white hover:shadow-2xl transition-all border border-outline-variant/10">
              <div className="flex-1">
                <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-black tracking-widest uppercase mb-8 inline-block shadow-inner">ACHETEURS</span>
                <h3 className="text-4xl font-serif-display mb-8 text-on-surface">Accédez aux meilleurs produits du terroir</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Recherche multicritère par région, type de produit ou certification.</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Paiements sécurisés garantissant le remboursement intégral en cas de litige.</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Historique complet d'achat et facturation automatisée conforme.</p>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl"></div>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdyL79Apw0VTsvR4lzRkLAFe-XmOtFg29Bjirft9Tp5GbIshX-L-LpuH9Xpl8Or1nyJoT8L4T3sZ8dd6PVqyJqC-ofucdt6EdOa-s7cijtC36IlHpj1nugKisDOdUpy50ZHTnQTAsYp-Zmi5hVsiG-SHFMsDT8ctl2yHgZIZmTLtjYSZb9sFQuwbm_xCV5SohlbZUCsu0tZZV3dJuZhasMOYuuP4itzaaA0lTWBFObjVxRPyAEXEZZnWA8CwdWpbDEnYfoeYQN18g" 
                  className="relative rounded-[3rem] w-full h-[400px] object-cover shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-700" 
                  alt="Acheteur utilisant AgroConnect" 
                />
              </div>
            </div>

            {/* Farmer */}
            <div className="bg-surface-container-low rounded-[4rem] p-10 md:p-16 flex flex-col lg:flex-row-reverse gap-16 items-center hover:bg-white hover:shadow-2xl transition-all border border-outline-variant/10">
              <div className="flex-1">
                <span className="px-5 py-2 bg-green-100 text-green-800 rounded-full text-xs font-black tracking-widest uppercase mb-8 inline-block shadow-inner">AGRICULTEURS</span>
                <h3 className="text-4xl font-serif-display mb-8 text-on-surface">Élargissez votre marché et sécurisez vos revenus</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-green-600 mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Visibilité nationale immédiate sans intermédiaires physiques gourmands.</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-green-600 mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Gestion simple des stocks et des commandes via smartphone, même hors ligne.</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-green-600 mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Paiement garanti une fois la marchandise expédiée et réceptionnée.</p>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="absolute -inset-4 bg-green-500/5 rounded-[3rem] blur-2xl"></div>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOQbG8JDIK6vGUzBVqMEJ5zI6FC5ZhkVPnuqse0S7hCdxf2U1SSB1q3xTEZgDscGi3iG8HpJs0BFs99pmHUMXpLtkAOmMDnkvx6Ig1iGKkQ-FennHKWjN08QNs7jiDlzHtwQublD0HE7ntsHeYVnog2-QUB6Z8wssfeG_2tQ6Tr6yz5PaJnxFQLeLu0U2qjwW5m5S2uceFEn_uCOPn3NKAMarBkeewhCEL47SaG9t49jm7uRzdyL74SRQZ7WvEhK129gkC_5Fqi1M" 
                  className="relative rounded-[3rem] w-full h-[400px] object-cover shadow-2xl -skew-x-1 hover:skew-x-0 transition-transform duration-700" 
                  alt="Agriculteur certifié" 
                />
              </div>
            </div>

            {/* Transporter */}
            <div className="bg-surface-container-low rounded-[4rem] p-10 md:p-16 flex flex-col lg:flex-row gap-16 items-center hover:bg-white hover:shadow-2xl transition-all border border-outline-variant/10">
              <div className="flex-1">
                <span className="px-5 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-black tracking-widest uppercase mb-8 inline-block shadow-inner">TRANSPORTEURS</span>
                <h3 className="text-4xl font-serif-display mb-8 text-on-surface">Rentabilisez vos camions pour chaque kilomètre</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-secondary mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Accès direct aux besoins de transport consolidés partout au Burkina.</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-secondary mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Paiement automatique dès la confirmation de réception digitale.</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <CheckCircle2 size={24} className="text-secondary mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-on-surface-variant text-lg">Réduction drastique des kilomètres parcourus à vide.</p>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="absolute -inset-4 bg-secondary/5 rounded-[3rem] blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800" 
                  className="relative rounded-[3rem] w-full h-[400px] object-cover shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-700" 
                  alt="Transport logistique" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Start CTA */}
        <section className="mt-40 text-center pb-20">
           <div className="bg-primary text-white rounded-[5rem] p-16 md:p-24 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-150 transition-transform duration-1000"></div>
              <h2 className="text-4xl md:text-6xl font-serif-display mb-10 relative z-10 leading-tight">Envie de rejoindre <br/> la révolution ?</h2>
              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                 <button className="px-12 py-5 bg-white text-primary font-bold rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all text-xl">
                    Créer mon compte gratuit
                 </button>
                 <button className="px-12 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 active:scale-95 transition-all text-xl">
                    Plus de détails
                 </button>
              </div>
           </div>
        </section>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default HowItWorksPage;
