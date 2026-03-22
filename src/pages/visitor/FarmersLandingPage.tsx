import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  BadgeCheck 
} from 'lucide-react';

const FarmersLandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const benefits = [
    {
      title: "Visibilité Nationale",
      desc: "Vendez vos produits à des acheteurs partout au Burkina Faso sans intermédiaires.",
      icon: Eye
    },
    {
      title: "Prix Justes",
      desc: "Accédez aux cours du marché en temps réel et négociez au meilleur prix.",
      icon: TrendingUp
    },
    {
      title: "Paiement Sécurisé",
      desc: "Recevez vos fonds directement sur votre compte Mobile Money une fois la livraison validée.",
      icon: ShieldCheck
    },
    {
      title: "Gestion Simplifiée",
      desc: "Gérez vos stocks, vos commandes et vos revenus depuis votre smartphone.",
      icon: Smartphone
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <VisitorHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 bg-[#14532d] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-0"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
                ESPACE PRODUCTEURS CERTIFIÉS
              </span>
              <h1 className="text-5xl md:text-7xl font-serif-display mb-8 leading-[1.1]">
                Faites grandir votre exploitation avec <span className="text-primary-fixed">AgroConnect</span>
              </h1>
              <p className="text-xl text-white/80 mb-12 font-body max-w-2xl leading-relaxed">
                Rejoignez la première plateforme numérique dédiée aux producteurs du Burkina. Vendez plus, plus vite et en toute sécurité, directement aux acheteurs.
              </p>
              <button 
                onClick={() => navigate('/register')}
                className="px-10 py-5 bg-white text-primary font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg flex items-center gap-2"
              >
                Ouvrir ma boutique gratuite <ArrowRight size={22} />
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none flex items-center justify-center">
            <Sprout size={500} strokeWidth={0.5} />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-32 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-6">Pourquoi nous rejoindre ?</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg font-newsreader italic">"Nous mettons la technologie au service de votre travail acharné pour maximiser vos profits."</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-10 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                   <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 font-headline">{benefit.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works for Farmers */}
        <section className="py-32 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1595066117564-9686035987a0?auto=format&fit=crop&q=80&w=800" 
                alt="Agriculteur utilisant un smartphone" 
                className="relative rounded-[4rem] shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-primary/10 animate-bounce">
                 <BadgeCheck className="text-primary" size={48} />
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-serif-display mb-10 text-on-surface">C'est simple comme bonjour</h2>
              <div className="space-y-10">
                <div className="flex gap-8 group">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 font-bold group-hover:bg-primary group-hover:text-white transition-all">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Inscrivez-vous</h4>
                    <p className="text-on-surface-variant leading-relaxed">Créez votre profil en 2 minutes avec votre numéro de téléphone. Pas de paperasse inutile.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 font-bold group-hover:bg-primary group-hover:text-white transition-all">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Publiez vos produits</h4>
                    <p className="text-on-surface-variant leading-relaxed">Prenez une photo de votre récolte, fixez votre prix et publiez. Votre offre est visible immédiatement.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 font-bold group-hover:bg-primary group-hover:text-white transition-all">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Validez les ventes</h4>
                    <p className="text-on-surface-variant leading-relaxed">Acceptez les offres des acheteurs, discutez sur le chat intégré et préparez la livraison.</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/register')}
                className="mt-16 inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all text-lg group underline underline-offset-8"
              >
                Commencer maintenant <ArrowRight size={24} className="group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-primary text-white rounded-[4rem] p-16 md:p-24 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <h2 className="text-4xl md:text-6xl font-serif-display mb-10 relative z-10">Prêt à transformer votre activité ?</h2>
                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto relative z-10">Des centaines de producteurs du Faso nous font déjà confiance. Ne restez pas en marge de la révolution.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                        <button 
                          onClick={() => navigate('/register')}
                          className="px-12 py-5 bg-white text-primary font-bold rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all text-lg"
                        >
                          Créer mon compte Producteur
                        </button>
                        <button 
                          onClick={() => navigate('/catalog')}
                          className="px-12 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 active:scale-95 transition-all text-lg"
                        >
                          Visiter le marché
                        </button>
                    </div>
                </div>
            </div>
        </section>
      </main>
      
      <VisitorFooter />
    </div>
  );
};

export default FarmersLandingPage;
