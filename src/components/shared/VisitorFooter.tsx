import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Facebook, Twitter, Instagram, MapPin, Mail, Phone, ExternalLink, Leaf } from 'lucide-react';

const VisitorFooter: React.FC = () => {
  return (
    <footer className="bg-[var(--section-footer-bg)] pt-24 pb-12 relative overflow-hidden text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand & Mission */}
          <div className="space-y-8">
             <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:rotate-6 transition-transform">
                <Leaf size={28} className="text-white" />
              </div>
              <span className="text-2xl font-serif-display text-white tracking-tight">AgroConnect <span className="text-primary italic">BF</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed font-medium italic">
              "Faciliter les échanges agricoles pour un Burkina Faso autosuffisant et prospère. La technologie au service du terroir."
            </p>
            <div className="flex space-x-4 pt-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-green-400 hover:bg-white/10 hover:scale-110 transition-all cursor-pointer border border-white/10">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-black text-white/30 mb-10 uppercase tracking-[0.3em] text-[10px]">Écosystème</h4>
            <ul className="space-y-5 text-sm font-bold">
              <li><Link to="/catalog" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all flex items-center gap-2">Marché Global <ExternalLink size={12} className="opacity-30" /></Link></li>
              <li><Link to="/farmers" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all flex items-center gap-2">Espace Producteurs</Link></li>
              <li><Link to="/transporters" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all flex items-center gap-2">Espace Transporteurs</Link></li>
              <li><Link to="/producers" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all flex items-center gap-2">Annuaire Certifié</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-white/30 mb-10 uppercase tracking-[0.3em] text-[10px]">Plateforme</h4>
            <ul className="space-y-5 text-sm font-bold">
              <li><Link to="/how-it-works" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all">Comment ça marche</Link></li>
              <li><Link to="/about" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all">Qui sommes-nous</Link></li>
              <li><Link to="/news" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all">Actualités & Presse</Link></li>
              <li><Link to="/register" className="text-white/40 hover:text-green-400 hover:translate-x-1 hover:underline decoration-green-400/30 underline-offset-8 transition-all">Devenir Partenaire</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-black text-white mb-10 uppercase tracking-[0.3em] text-[10px]">Veille Marché</h4>
            <p className="text-white/40 text-sm mb-8 leading-relaxed font-medium">
              Recevez les cours du marché et les alertes météo en temps réel.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="votre@email.bf"
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm w-full outline-none focus:ring-4 focus:ring-primary/20 transition-all text-white placeholder:text-white/20"
              />
              <button className="bg-primary text-white p-4 rounded-2xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-xl shadow-primary/20">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <span>© 2024 AgroConnect BF.</span>
            <span className="hidden md:block opacity-30">|</span>
            <span>Digital Agriculture ecosystem.</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <Link to="/privacy" className="hover:text-primary transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Légal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default VisitorFooter;
