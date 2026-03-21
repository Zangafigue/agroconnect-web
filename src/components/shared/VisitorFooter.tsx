import React from 'react';
import { Link } from 'react-router-dom';

export default function VisitorFooter() {
  return (
    <footer className="bg-[#ebffe5] dark:bg-slate-950 border-t border-[#6e7b6c]/15 dark:border-slate-800 w-full pt-16 pb-12 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-bold font-headline text-[#006b2c] dark:text-green-400 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#006b2c] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span>AgroConnect BF</span>
          </Link>
          <p className="text-[#0c200d]/80 dark:text-slate-400 text-sm font-newsreader leading-relaxed max-w-xs">
            Faciliter les échanges agricoles pour un Burkina Faso autosuffisant et prospère. La technologie au service du terroir.
          </p>
          <div className="flex gap-4">
            {/* Social Icons could go here */}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 font-label uppercase tracking-widest text-xs text-[#006b2c]">Plateforme</h4>
          <div className="flex flex-col space-y-3 text-sm font-newsreader">
            <Link to="/catalog" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Marché Global</Link>
            <Link to="/farmers" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Espace Producteurs</Link>
            <Link to="/transporters" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Espace Transporteurs</Link>
            <Link to="/producers" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Annuaire des Producteurs</Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 font-label uppercase tracking-widest text-xs text-[#006b2c]">À Propos</h4>
          <div className="flex flex-col space-y-3 text-sm font-newsreader">
            <Link to="/how-it-works" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Comment ça marche</Link>
            <Link to="/about" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Qui sommes-nous</Link>
            <Link to="/news" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Actualités</Link>
            <Link to="/register" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Devenir Partenaire</Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 font-label uppercase tracking-widest text-xs text-[#006b2c]">Contact</h4>
          <p className="text-sm text-on-surface-variant mb-4 font-newsreader">Restez informé des cours du marché et des nouvelles opportunités.</p>
          <div className="flex gap-2">
            <input 
              className="bg-surface-container-lowest border-outline-variant/20 border rounded-xl text-sm w-full focus:ring-2 focus:ring-[#006b2c] outline-none px-4 py-2" 
              placeholder="Votre email" 
              type="email"
            />
            <button className="bg-[#006b2c] text-white p-2 rounded-xl active:scale-95 transition-transform flex items-center justify-center shadow-lg shadow-green-900/20">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-[#6e7b6c]/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#0c200d]/60 dark:text-slate-500 text-xs font-newsreader">
          © 2024 AgroConnect BF. Precision Agriculture for Burkina Faso. Tous droits réservés.
        </p>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-tighter text-outline">
          <Link to="/about" className="hover:text-primary transition-colors">Confidentialité</Link>
          <Link to="/about" className="hover:text-primary transition-colors">Cookies</Link>
          <Link to="/about" className="hover:text-primary transition-colors">Mention Légales</Link>
        </div>
      </div>
    </footer>
  );
}
