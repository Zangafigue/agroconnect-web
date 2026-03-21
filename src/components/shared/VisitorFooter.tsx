import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Facebook, Twitter, Instagram } from 'lucide-react';

const VisitorFooter: React.FC = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <span className="text-2xl font-serif-display text-primary block">AgroConnect BF</span>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Faciliter les échanges agricoles pour un Burkina Faso autosuffisant et prospère. La plateforme digitale au service des producteurs.
            </p>
            <div className="flex space-x-4 pt-2">
              <Facebook className="text-outline cursor-pointer hover:text-primary transition-colors" size={20} />
              <Twitter className="text-outline cursor-pointer hover:text-primary transition-colors" size={20} />
              <Instagram className="text-outline cursor-pointer hover:text-primary transition-colors" size={20} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Plateforme</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog" className="text-on-surface-variant hover:text-primary transition-colors">Marché</Link></li>
              <li><Link to="/producers" className="text-on-surface-variant hover:text-primary transition-colors">Annuaire Producteurs</Link></li>
              <li><Link to="/how-it-works" className="text-on-surface-variant hover:text-primary transition-colors">Comment ça marche</Link></li>
              <li><Link to="/news" className="text-on-surface-variant hover:text-primary transition-colors">Actualités</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Conditions d'utilisation</Link></li>
              <li><Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">Confidentialité</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-on-surface-variant text-sm mb-4">Abonnez-vous pour recevoir les cours du marché en temps réel.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-white dark:bg-slate-900 border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-white p-2.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-outline text-xs">
            © 2024 AgroConnect BF. Plateforme de précision agricole pour le Burkina Faso.
          </p>
          <div className="flex space-x-6 text-xs text-outline">
            <span>Ouagadougou, Burkina Faso</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Système Opérationnel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default VisitorFooter;
