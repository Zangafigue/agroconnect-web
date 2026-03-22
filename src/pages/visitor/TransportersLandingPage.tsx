import React from 'react';
import { useNavigate } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { 
  Truck, 
  Wallet, 
  Map as RouteIcon, 
  LayoutDashboard, 
  ArrowRight, 
  BadgeCheck, 
  Milestone,
  CheckCircle2,
  FileText
} from 'lucide-react';

const TransportersLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Flux de Cargo Constant",
      desc: "Accédez à des milliers de demandes de transport de produits agricoles chaque jour.",
      icon: Truck
    },
    {
      title: "Paiement Rapide",
      desc: "Plus besoin d'attendre des semaines. Soyez payé dès que la livraison est confirmée par l'acheteur.",
      icon: Wallet
    },
    {
      title: "Optimisation des Trajets",
      desc: "Trouvez des chargements pour vos trajets retours et évitez de rouler à vide via notre bourse de fret.",
      icon: RouteIcon
    },
    {
      title: "Gestion Digitale",
      desc: "Suivez vos missions, vos factures et vos performances de livraison depuis votre espace dédié.",
      icon: LayoutDashboard
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <VisitorHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-32 bg-[#0c200d] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-5 py-2 bg-primary/20 backdrop-blur-md text-primary-fixed text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-10 border border-primary/30">
                RESEAU DE LOGISTIQUE CERTIFIÉ
              </span>
              <h1 className="text-5xl md:text-8xl font-serif-display mb-10 tracking-tight leading-[0.9]">
                Rentabilisez vos camions avec <span className="text-primary-fixed">AgroConnect</span>
              </h1>
              <p className="text-2xl text-white/70 mb-14 font-body leading-relaxed max-w-2xl italic font-newsreader">
                "Rejoignez le réseau de logistique leader au Burkina Faso. Connectez-vous aux producteurs et sécurisez votre carnet de route pour chaque saison."
              </p>
              <button 
                onClick={() => navigate('/register')}
                className="px-12 py-5 bg-primary text-white font-bold rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all text-lg flex items-center gap-3"
              >
                Rejoindre le réseau logistique <ArrowRight size={24} />
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-5 pointer-events-none flex items-center justify-center">
             <Milestone size={600} strokeWidth={0.5} />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-32 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 px-4">
            <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-6">Optimisez votre logistique</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">Nous simplifions la mise en relation entre le besoin de transport immédiat et vos capacités logistiques disponibles.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-10 bg-white rounded-[3rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-10 group-hover:bg-secondary group-hover:text-white transition-all shadow-inner">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-headline">{benefit.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Flow */}
        <section className="py-32 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-serif-display mb-12 text-on-surface">Comment devenir transporteur agréé ?</h2>
              <div className="space-y-8">
                {[
                  { title: "Création du compte", desc: "Inscrivez-vous et fournissez les détails de transport de votre entreprise.", icon: BadgeCheck },
                  { title: "Validation des véhicules", desc: "Soumettez vos cartes grises et certifications pour garantir la sécurité du fret.", icon: FileText },
                  { title: "Offres de missions", desc: "Consultez les missions disponibles, proposez des devis et commencez à rouler.", icon: CheckCircle2 },
                ].map((step, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-outline-variant/10 flex items-start gap-6 group hover:translate-x-2 transition-all">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 font-bold group-hover:bg-primary group-hover:text-white transition-all">
                      {i+1}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 flex items-center gap-3">
                        {step.title}
                      </h4>
                      <p className="text-on-surface-variant leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
               <div className="bg-secondary/10 rounded-[4rem] p-16 md:p-20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                  <div className="relative z-10 text-center lg:text-left">
                    <BadgeCheck size={80} className="text-secondary mb-8 mx-auto lg:mx-0 animate-pulse" />
                    <h3 className="text-3xl font-serif-display mb-6 text-on-surface">Prêt à démarrer ?</h3>
                    <p className="text-lg text-on-surface-variant mb-12 leading-relaxed">
                      "Rejoignez AgroConnect BF et participez activement au désenclavement des zones de production agricole du Burkina Faso."
                    </p>
                    <button 
                      onClick={() => navigate('/register')}
                      className="w-full py-5 bg-secondary text-white font-bold rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all text-xl"
                    >
                      Soumettre mon dossier
                    </button>
                  </div>
               </div>
               {/* Decorative floating icon */}
               <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-secondary/10 hidden md:block">
                  <Truck size={48} className="text-secondary" />
               </div>
            </div>
          </div>
        </section>
      </main>
      
      <VisitorFooter />
    </div>
  );
};

export default TransportersLandingPage;
