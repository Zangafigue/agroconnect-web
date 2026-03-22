import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface VisitorHeaderProps {
  theme?: 'light' | 'dark'; // 'light' means the parent page top is light (text should be dark). 'dark' means parent page top is dark (text should be light).
}

const VisitorHeader: React.FC<VisitorHeaderProps> = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user) as any;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Le Marché', path: '/catalog' },
    { name: 'Producteurs', path: '/farmers' },
    { name: 'Transporteurs', path: '/transporters' },
    { name: 'Actualités', path: '/news' },
    { name: 'Notre Vision', path: '/#vision' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
      ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-[var(--gray-200)] shadow-sm' 
      : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[var(--section-why-bg)] text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Leaf size={28} />
          </div>
          <span className={`font-display text-2xl tracking-tight transition-colors ${
            isScrolled 
            ? 'text-[var(--gray-900)]' 
            : theme === 'dark' ? 'text-white' : 'text-[var(--gray-900)]'
          }`}>
            AgroConnect <span className="text-[var(--green-600)]">BF</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                isScrolled 
                ? 'text-[var(--gray-501)] hover:text-[var(--gray-900)]' 
                : theme === 'dark' 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-[var(--gray-501)] hover:text-[var(--gray-900)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link 
                to="/login" 
                className={`hidden sm:block px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  isScrolled 
                  ? 'text-[var(--gray-900)] hover:bg-[var(--gray-50)]' 
                  : theme === 'dark'
                    ? 'text-white hover:bg-white/10'
                    : 'text-[var(--gray-900)] hover:bg-[var(--gray-50)]'
                }`}
              >
                Connexion
              </Link>
              <Link 
                to="/register" 
                className={`px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all ${
                  isScrolled
                  ? 'bg-[var(--gray-900)] text-white hover:bg-black'
                  : theme === 'dark'
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-[var(--gray-900)] text-white hover:bg-black'
                }`}
              >
                Commencer
              </Link>
            </>
          ) : (
            <Link 
              to={user.role === 'ADMIN' ? '/admin' : `/${user.role?.toLowerCase()}/dashboard`}
              className="px-8 py-3 bg-[var(--green-600)] text-white rounded-xl font-bold text-sm shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
            >
              Mon Dashboard
              <ArrowRight size={18} />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-3 rounded-xl transition-all ${
              isScrolled 
              ? 'bg-[var(--gray-50)] text-[var(--gray-900)]' 
              : theme === 'dark' 
                ? 'bg-white/10 text-white backdrop-blur-md' 
                : 'bg-[var(--gray-50)] text-[var(--gray-900)]'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--gray-200)] p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold text-[var(--gray-900)] py-2 border-b border-[var(--gray-50)] last:border-0"
              >
                {link.name}
              </Link>
            ))}
          </div>
          {!user && (
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="py-4 text-center font-bold text-[var(--gray-900)] bg-[var(--gray-50)] rounded-2xl"
              >
                Connexion
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsMenuOpen(false)}
                className="py-4 text-center font-bold text-white bg-[var(--gray-900)] rounded-2xl"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default VisitorHeader;
