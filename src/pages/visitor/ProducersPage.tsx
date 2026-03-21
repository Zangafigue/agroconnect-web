import React from 'react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { Users, Star, MapPin, Search } from 'lucide-react';

const ProducersPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <VisitorHeader />
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-serif-display text-on-surface mb-2">Annuaire des Producteurs</h1>
            <p className="text-on-surface-variant">Découvrez les visages derrière vos produits et soutenez l'agriculture locale.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-outline-variant/20 mb-12 flex flex-col md:flex-row gap-4">
             <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
                <input 
                  type="text" 
                  placeholder="Rechercher un producteur ou une coopérative..."
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low rounded-2xl border-none outline-none"
                />
             </div>
             <button className="px-8 py-3.5 bg-primary text-white font-bold rounded-2xl">Filtrer par région</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-outline-variant/20 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    P{i}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Producteur {i}</h3>
                    <div className="flex items-center gap-1 text-xs text-outline">
                      <MapPin size={12} /> <span>Région {i}, Burkina Faso</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                  Spécialiste en culture de maïs et sorgho depuis plus de 10 ans. Pratiques agricoles durables.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                   <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold">4.8</span>
                   </div>
                   <button className="text-primary font-bold text-sm hover:underline">Voir les produits</button>
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

export default ProducersPage;
