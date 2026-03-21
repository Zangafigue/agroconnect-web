import React from 'react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { CheckCircle2, ShoppingBag, Truck, CreditCard } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <VisitorHeader />
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-4">Comment ça marche ?</h1>
            <p className="text-on-surface-variant text-lg">AgroConnect simplifie le commerce agricole pour tous les acteurs.</p>
          </div>

          <div className="space-y-12">
            {[
              { title: 'Inscrivez-vous', desc: 'Créez votre profil en tant qu\'Acheteur, Agriculteur ou Transporteur.', icon: CheckCircle2 },
              { title: 'Publiez ou Recherchez', desc: 'Les agriculteurs listent leurs produits. Les acheteurs parcourent le catalogue.', icon: ShoppingBag },
              { title: 'Négociez et Payez', desc: 'Échangez sur la messagerie et sécurisez votre transaction par Mobile Money.', icon: CreditCard },
              { title: 'Livraison Suivie', desc: 'Un transporteur prend en charge la marchandise et vous livre en toute sécurité.', icon: Truck },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start p-8 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-primary/20">
                   <step.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{idx + 1}. {step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default HowItWorksPage;
