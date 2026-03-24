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
import farmersHero from '../../assets/images/farmers-hero.png';

const FarmersLandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const benefits = [
    {
      title: "Visibilité Directe",
      desc: "Vendez vos récoltes à des milliers d'acheteurs sans intermédiaires gourmands.",
      icon: Eye
    },
    {
      title: "Meilleurs Prix",
      desc: "Fixez vos prix en fonction des tendances réelles du marché national.",
      icon: TrendingUp
    },
    {
      title: "Sécurité Garantie",
      desc: "Transactions protégées et paiements instantanés via Mobile Money.",
      icon: ShieldCheck
    },
    {
      title: "Outils de Gestion",
      desc: "Suivez vos ventes et vos stocks directement depuis votre smartphone.",
      icon: Smartphone
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <VisitorHeader theme="dark" />
      
      <main>
        {/* Hero Section */}
        <section 
          className="pt-40 pb-32 bg-cover bg-center text-white overflow-hidden relative"
          style={{ backgroundImage: `url(${farmersHero})` }}
        >
          <div className="absolute inset-0 bg-green-900/70"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 border border-white/10">
              PROGRAMME PRODUCTEURS CERTIFIÉS
            </span>
            <h1 className="text-6xl md:text-9xl font-serif-display mb-8 leading-[0.9] tracking-tight">
              Semez aujourd'hui,<br/><span className="italic text-primary">Vendez demain.</span>
            </h1>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Rejoignez l'élite agricole du pays. Une plateforme pensée pour simplifier votre commerce et sécuriser vos revenus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-primary transition-all text-lg flex items-center justify-center gap-2"
                >
                  Ouvrir ma boutique gratuite <ArrowRight size={20} />
                </button>
            </div>
          </div>
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-5xl opacity-20 pointer-events-none">
             <Sprout size={400} className="mx-auto" strokeWidth={0.5} />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-32 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-10 bg-[#f9fafb] rounded-[2rem] border border-gray-100 hover:border-green-600 transition-all group shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all shadow-xl">
                   <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-newsreader italic">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-32 bg-green-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20 relative z-10">
            <div className="flex-1">
              <h2 className="text-5xl font-serif-display mb-10 tracking-tight leading-[1.1]">La fin des intermédiaires <span className="italic text-green-400">gourmands</span>.</h2>
              <p className="text-lg text-white/70 mb-12 font-light leading-relaxed">
                Traditionnellement, le producteur ne reçoit qu'une fraction du prix final. Avec AgroConnect, nous inversons la tendance.
              </p>
              <div className="space-y-6">
                {[
                    "Ventes directes sans commission cachée",
                    "Paiement sécurisé avant enlèvement",
                    "Assistance logistique intégrée",
                    "Accès privilégié aux intrants"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <CheckCircle2 className="text-green-400" size={24} />
                        <span className="font-bold text-white">{item}</span>
                    </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
                <div className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden relative">
                    <img 
                        src="https://images.unsplash.com/photo-1595066117564-9686035987a0?auto=format&fit=crop&q=80&w=800" 
                        alt="Success story" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-black/5">
                        <p className="text-sm font-newsreader italic mb-4">"AgroConnect a doublé mes bénéfices en une seule saison de maïs. C'est le futur de l'agriculture."</p>
                        <p className="font-bold text-xs uppercase tracking-widest text-[#14532d]">— Moussa Z., Producteur à Banfora</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-serif-display mb-10 tracking-tight">Prêt à rejoindre la <span className="text-primary">révolution</span> ?</h2>
                <p className="text-xl text-gray-500 mb-14 max-w-2xl mx-auto font-light">
                    L'inscription est gratuite et ne prend que 2 minutes. Nos agents sont là pour vous accompagner.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button 
                        onClick={() => navigate('/register')}
                        className="px-12 py-5 bg-black text-white font-bold rounded-2xl hover:bg-primary shadow-xl transition-all text-lg"
                    >
                        Créer mon compte
                    </button>
                    <button 
                        onClick={() => navigate('/catalog')}
                        className="px-12 py-5 border border-gray-200 text-black font-bold rounded-2xl hover:border-black transition-all text-lg"
                    >
                        Explorer le marché
                    </button>
                </div>
            </div>
        </section>
      </main>
      
      <VisitorFooter />
    </div>
  );
};

export default FarmersLandingPage;
