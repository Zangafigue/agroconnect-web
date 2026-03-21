import React from 'react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

const NewsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <VisitorHeader />
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-serif-display text-on-surface mb-2">Actualités Agricoles</h1>
            <p className="text-on-surface-variant">Restez informé des tendances du marché et des conseils de culture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-outline-variant/20 hover:shadow-xl transition-all">
                <div className="md:w-1/3 h-48 md:h-auto bg-primary/5 relative">
                   <div className="absolute inset-0 flex items-center justify-center text-primary/20 italic">Image News</div>
                </div>
                <div className="p-8 flex-1">
                  <div className="flex items-center gap-2 text-xs text-outline mb-4">
                    <Calendar size={14} /> <span>21 Mars 2024</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold">Conseils</span>
                  </div>
                  <h2 className="text-2xl font-bold font-headline mb-4 group-hover:text-primary transition-colors">Comment optimiser votre récolte de maïs cette saison</h2>
                  <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">
                    Découvrez les meilleures pratiques pour garantir une production abondante malgré les variations climatiques.
                  </p>
                  <button className="flex items-center gap-2 text-primary font-bold hover:underline">
                    Lire la suite <ArrowRight size={18} />
                  </button>
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

export default NewsPage;
