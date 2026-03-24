import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import VisitorFooter from '../../components/shared/VisitorFooter';
import loginBg from '../../assets/images/login-bg.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth) as any;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notVerifiedError, setNotVerifiedError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotVerifiedError(false);
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      
      setAuth(access_token, user);

      if (user.isVerified === false) {
        setNotVerifiedError(true);
        return;
      }

      switch (user.role) {
        case 'FARMER': navigate('/farmer/dashboard'); break;
        case 'BUYER': navigate('/buyer/dashboard'); break;
        case 'TRANSPORTER': navigate('/transporter/dashboard'); break;
        case 'ADMIN': navigate('/admin'); break;
        default: navigate('/'); break;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants incorrects ou erreur réseau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-body flex flex-col">
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* LEFT COLUMN - Background Image */}
        <section className="hidden lg:flex lg:w-1/2 bg-[var(--gray-900)] p-12 flex-col justify-between items-start sticky top-0 h-screen overflow-hidden relative">
          <img src={loginBg} alt="Background login" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-[var(--gray-900)]/40 to-transparent"></div>
          
          <Link to="/" className="flex items-center gap-3 relative z-10 group">
            <div className="w-12 h-12 bg-[var(--bg-surface)] text-[var(--section-why-bg)] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Leaf size={28} />
            </div>
            <span className="text-white font-display text-3xl tracking-tight">AgroConnect <span className="text-[var(--green-600)]">BF</span></span>
          </Link>

            <div className="flex-grow"></div>

          <div className="relative z-10 w-full">
            <p className="text-white/60 text-sm font-medium flex items-center gap-2">
              <span className="w-8 h-px bg-white/20"></span>
              Propulsé par la vision d'un Burkina Faso prospère
            </p>
          </div>
        </section>

        {/* RIGHT COLUMN - Form */}
        <section className="flex-1 flex flex-col p-8 md:p-12 lg:p-24 justify-center bg-white relative">
          <div className="absolute top-10 right-10 flex items-center gap-4 text-sm font-medium">
            <span className="text-[var(--text-secondary)]">Pas encore membre ?</span>
            <Link to="/register" className="px-6 py-2.5 rounded-xl border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all font-bold">
              Créer un compte
            </Link>
          </div>

          <div className="max-w-[440px] w-full mx-auto">
            <header className="mb-12">
              <h2 className="text-5xl font-display text-[var(--text-primary)] mb-4 tracking-tight">Bonjour.</h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">Entrez vos identifiants pour accéder à votre espace sécurisé.</p>
            </header>

            {error && (
              <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] pl-1" htmlFor="email">Adresse E-mail</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[var(--gray-400)] group-focus-within:text-[var(--text-primary)] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    className="w-full pl-14 pr-4 py-5 bg-[var(--bg-muted)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-white focus:border-[var(--border-light)] transition-all text-[var(--text-primary)] placeholder:text-[var(--gray-400)] outline-none font-medium" 
                    id="email" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@domaine.bf" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end pl-1">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em]" htmlFor="password">Mot de passe</label>
                  <Link to="/forgot-password" className="text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-widest transition-colors">Oublié ?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[var(--gray-400)] group-focus-within:text-[var(--text-primary)] transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    className="w-full pl-14 pr-14 py-5 bg-[var(--bg-muted)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-white focus:border-[var(--border-light)] transition-all text-[var(--text-primary)] placeholder:text-[var(--gray-400)] outline-none font-medium" 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-[var(--gray-400)] hover:text-[var(--text-primary)] transition-colors" 
                    type="button"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-[var(--text-primary)] text-white py-5 rounded-2xl font-bold flex justify-center items-center gap-3 group hover:shadow-2xl hover:bg-black active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-8 shadow-xl shadow-[var(--text-primary)]/10" 
                type="submit"
              >
                {loading ? 'Vérification...' : 'Se connecter'}
                {!loading && <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-16 flex items-center gap-4 text-[var(--gray-400)]">
               <div className="flex-grow h-px bg-[var(--gray-200)]"></div>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Confiance & Sécurité</span>
               <div className="flex-grow h-px bg-[var(--gray-200)]"></div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="p-4 bg-[var(--bg-muted)] rounded-2xl border border-[var(--border-light)]/50 flex items-center gap-3">
                  <ShieldCheck size={18} className="text-[var(--green-600)]" />
                  <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-tight">SSL 256-bit</span>
               </div>
               <div className="p-4 bg-[var(--bg-muted)] rounded-2xl border border-[var(--gray-200)]/50 flex items-center gap-3">
                  <Lock size={18} className="text-[var(--green-600)]" />
                  <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-tight">RGPD Burkina</span>
               </div>
            </div>
          </div>
        </section>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default LoginPage;
