import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function VisitorHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Marché', path: '/catalog' },
    { name: 'Producteurs', path: '/farmers' },
    { name: 'Transporteurs', path: '/transporters' },
    { name: 'Actualités', path: '/news' },
  ];

  return (
    <header className="bg-surface-container-lowest/80 backdrop-blur-md dark:bg-slate-950/80 shadow-sm dark:shadow-none docked full-width top-0 sticky z-50 border-b border-outline-variant/10">
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold font-headline text-primary dark:text-green-400 flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="tracking-tight">AgroConnect BF</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 font-headline text-sm font-medium tracking-tight">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary font-bold border-b-2 border-primary pb-1' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/login')} 
            className="px-5 py-2 text-primary font-bold active:scale-95 transition-transform hover:bg-primary/5 rounded-xl"
          >
            Connexion
          </button>
          <button 
            onClick={() => navigate('/register')} 
            className="px-6 py-2 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20 hover:brightness-110"
          >
            S'inscrire
          </button>
        </div>
      </nav>
    </header>
  );
}
