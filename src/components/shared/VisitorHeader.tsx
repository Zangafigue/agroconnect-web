import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

const VisitorHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Marché', path: '/catalog' },
    { name: 'Producteurs', path: '/producers' },
    { name: 'Blog', path: '/news' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif-display text-primary tracking-tight">AgroConnect BF</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-bold text-primary px-4 py-2 rounded-xl hover:bg-primary/5 transition-colors"
            >
              Connexion
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-sm font-bold bg-primary text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              S'inscrire
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-on-surface-variant p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-outline-variant/30 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-on-surface-variant'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <button
              onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
              className="w-full text-center py-2.5 font-bold text-primary border border-primary rounded-xl"
            >
              Connexion
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigate('/register'); }}
              className="w-full text-center py-2.5 font-bold bg-primary text-white rounded-xl"
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
