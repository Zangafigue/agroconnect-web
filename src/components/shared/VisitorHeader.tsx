import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Home, Sprout, Truck, Newspaper, Info } from 'lucide-react';

const VisitorHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Marché', path: '/catalog', icon: ShoppingBag },
    { name: 'Producteurs', path: '/farmers', icon: Sprout },
    { name: 'Transporteurs', path: '/transporters', icon: Truck },
    { name: 'À Propos', path: '/about', icon: Info },
    { name: 'Actualités', path: '/news', icon: Newspaper },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl font-serif-display">A</span>
            </div>
            <span className="text-2xl font-serif-display text-primary tracking-tight hidden sm:block">AgroConnect BF</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-all px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary flex items-center gap-2 ${
                  isActive(link.path) ? 'text-primary bg-primary/5' : 'text-on-surface-variant'
                }`}
              >
                <link.icon size={16} className={`${isActive(link.path) ? 'opacity-100' : 'opacity-50'}`} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-bold text-primary px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"
            >
              Connexion
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-sm font-bold bg-primary text-white px-7 py-3 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
            >
              S'inscrire
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-on-surface-variant p-2 bg-surface-container-high rounded-xl"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-outline-variant/30 px-4 pt-4 pb-8 space-y-2 animate-in slide-in-from-top duration-300 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                isActive(link.path) ? 'bg-primary/10 text-primary shadow-inner' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
               <link.icon size={20} className={`${isActive(link.path) ? 'opacity-100' : 'opacity-40'}`} />
              {link.name}
            </Link>
          ))}
          <div className="pt-6 flex flex-col space-y-3">
            <button
              onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
              className="w-full text-center py-3.5 font-bold text-primary border-2 border-primary/20 rounded-2xl hover:bg-primary/5 transition-all"
            >
              Connexion
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigate('/register'); }}
              className="w-full text-center py-4 font-bold bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              S'inscrire
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default VisitorHeader;
