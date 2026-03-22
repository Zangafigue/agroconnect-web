import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Facebook, Twitter, Instagram, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const VisitorFooter: React.FC = () => {
  return (
    <footer className="bg-[var(--section-footer-bg)] border-t border-white/5 pt-20 pb-12 mt-20 relative overflow-hidden text-[var(--text-inverse)]">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--green-600)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Mission */}
          <div className="space-y-6">
             <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[var(--green-600)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--green-600)]/20 group-hover:rotate-6 transition-transform">
                <span className="text-white font-bold text-xl font-display">A</span>
              </div>
              <span className="text-2xl font-display text-[var(--text-inverse)] tracking-tight">AgroConnect <span className="text-[var(--green-600)]">BF</span></span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-body italic">
              "Faciliter les échanges agricoles pour un Burkina Faso autosuffisant et prospère. La technologie au service du terroir."
            </p>
            <div className="flex space-x-5 pt-2">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <div key={i} className="p-2.5 bg-white/5 rounded-xl text-white/40 hover:text-[var(--green-600)] hover:bg-white transition-all cursor-pointer shadow-sm border border-white/10">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.15em] text-xs">Écosystème</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/catalog" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all flex items-center gap-2">Marché Global <ExternalLink size={12} className="opacity-30" /></Link></li>
              <li><Link to="/farmers" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all flex items-center gap-2">Espace Producteurs</Link></li>
              <li><Link to="/transporters" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all flex items-center gap-2">Espace Transporteurs</Link></li>
              <li><Link to="/producers" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all flex items-center gap-2">Annuaire Certifié</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.15em] text-xs">À Propos</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/how-it-works" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all">Comment ça marche</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all">Qui sommes-nous</Link></li>
              <li><Link to="/news" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all">Actualités & Presse</Link></li>
              <li><Link to="/register" className="text-white/60 hover:text-[var(--green-600)] hover:underline transition-all">Devenir Partenaire</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.15em] text-xs">Veille Technologique</h4>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Recevez les cours du marché et les alertes météo en temps réel.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="votre@email.bf"
                style={{
                  backgroundColor: 'var(--newsletter-input-bg)',
                  borderColor: 'var(--newsletter-input-border)',
                  color: 'var(--newsletter-input-text)'
                }}
                className="border rounded-2xl px-5 py-3 text-sm w-full outline-none focus:ring-4 focus:ring-[var(--green-600)]/10 transition-all shadow-inner"
              />
              <button className="bg-[var(--green-600)] text-white p-3.5 rounded-2xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-[var(--green-600)]/20">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-white/40 font-medium">
            <span>© 2024 AgroConnect BF.</span>
            <span className="hidden md:block opacity-30">|</span>
            <span>Precision Agriculture for Burkina Faso.</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
            <Link to="/privacy" className="hover:text-[var(--green-600)] transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-[var(--green-600)] transition-colors">Mentions Légales</Link>
            <Link to="/cookies" className="hover:text-[var(--green-600)] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default VisitorFooter;
