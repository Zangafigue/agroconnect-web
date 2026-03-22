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
      title: "Charge Garantie",
      desc: "Accédez à un flux continu de demandes de transport agricole.",
      icon: Truck
    },
    {
      title: "Paiements Flash",
      desc: "Soyez payé immédiatement après confirmation de la livraison.",
      icon: Wallet
    },
    {
      title: "Zéro Km Vide",
      desc: "Optimisez vos retours avec notre bourse de fret intelligente.",
      icon: RouteIcon
    },
    {
      title: "Outils Pro",
      desc: "Gérez vos documents et factures en un clic depuis votre dashboard.",
      icon: LayoutDashboard
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <VisitorHeader theme="dark" />
      
      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-32 bg-[#0c200d] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-[var(--green-400)] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 border border-white/10">
              RÉSEAU LOGISTIQUE CERTIFIÉ
            </span>
            <h1 className="text-6xl md:text-9xl font-serif-display mb-10 tracking-tight leading-[0.9]">
              Vos camions,<br /><span className="italic text-[var(--green-400)]">Notre moteur.</span>
            </h1>
            <p className="text-xl text-white/70 mb-14 font-light leading-relaxed max-w-2xl mx-auto">
              Rejoignez le réseau logistique qui transforme le transport agricole au Burkina Faso. Plus de missions, moins d'incertitude.
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="px-12 py-5 bg-white text-black font-bold rounded-2xl hover:bg-[var(--green-400)] transition-all text-lg flex items-center justify-center gap-3 mx-auto"
            >
              Devenir partenaire <ArrowRight size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl opacity-10 pointer-events-none">
             <Milestone size={500} className="mx-auto" strokeWidth={0.5} />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-32 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-10 bg-[#f9fafb] rounded-[2rem] border border-gray-100 hover:border-black transition-all group overflow-hidden relative">
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--green-600)] transition-all shadow-xl">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-newsreader italic">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-32 bg-white border-y border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-serif-display mb-12 tracking-tight leading-[1.1]">Comment rejoindre <br/><span className="italic text-[var(--green-600)]">le convoi</span> ?</h2>
              <div className="space-y-4">
                {[
                  { title: "Profil Entreprise", desc: "Décrivez votre flotte et vos zones de prédilection.", icon: BadgeCheck },
                  { title: "Documentation", desc: "Soumettez vos titres de transport et assurances en ligne.", icon: FileText },
                  { title: "Missions", desc: "Recevez des alertes pour chaque nouveau fret disponible.", icon: CheckCircle2 },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                    <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shrink-0 font-bold text-sm">
                      {i+1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
               <div className="bg-[#14532d] rounded-[3rem] p-16 md:p-20 relative overflow-hidden text-center text-white">
                  <BadgeCheck size={80} className="text-[var(--green-400)] mb-8 mx-auto" />
                  <h3 className="text-4xl font-serif-display mb-6 leading-tight">Sécurité & Confiance</h3>
                  <p className="text-lg text-white/70 mb-12 font-light leading-relaxed">
                    "AgroConnect garantit le paiement de chaque mission effectuée. Roulez l'esprit tranquille."
                  </p>
                  <button 
                    onClick={() => navigate('/register')}
                    className="w-full py-5 bg-white text-black font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-xl"
                  >
                    Soumettre mon dossier
                  </button>
               </div>
               <div className="absolute -bottom-8 -left-8 bg-black p-6 rounded-2xl shadow-2xl hidden md:block">
                  <Truck size={40} className="text-white" />
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
