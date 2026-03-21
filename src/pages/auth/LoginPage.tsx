import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Leaf, Tractor, Wheat } from 'lucide-react';
import VisitorFooter from '../../components/shared/VisitorFooter';

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
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col">
      <main className="flex-grow flex flex-col md:flex-row">
        {/* LEFT COLUMN - Visual/Premium */}
        <section className="hidden md:flex md:w-[40%] bg-surface-container-low p-12 flex-col justify-between items-start sticky top-0 h-screen overflow-hidden">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Leaf size={24} />
            </div>
            <span className="text-primary font-serif-display text-2xl tracking-tight">AgroConnect BF</span>
          </Link>
          
          <div className="w-full flex flex-col gap-10 items-center relative py-20">
            {/* Visual Cards */}
            <div className="w-full max-w-[320px] bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-outline-variant/20 -rotate-2 hover:rotate-0 transition-all duration-500 z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-xl text-primary">
                  <Wheat size={24} />
                </div>
                <span className="text-[10px] font-bold py-1 px-3 bg-primary text-white rounded-full">CERTIFIÉ</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-1">Maïs Blanc Premium</h4>
              <p className="text-xs text-outline mb-6">Bobo-Dioulasso • 100 sacs disp.</p>
              <div className="flex justify-between items-baseline">
                <span className="text-primary font-bold text-2xl">18 500 <span className="text-xs uppercase">FCFA</span></span>
                <span className="text-[10px] text-outline uppercase font-bold tracking-widest">Le sac</span>
              </div>
            </div>

            <div className="w-full max-w-[320px] bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-outline-variant/20 rotate-3 translate-x-12 hover:rotate-0 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-xl text-primary">
                  <Tractor size={24} />
                </div>
                <span className="text-[10px] font-bold py-1 px-3 bg-secondary-container text-on-secondary-container rounded-full">EN TRANSIT</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-1">Logistique Sécurisée</h4>
              <p className="text-xs text-outline mb-6">Suivi GPS • Livraison 48h</p>
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>)}
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-[10px] flex items-center justify-center text-white font-bold">+12</div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center gap-3 text-primary bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-outline-variant/10">
              <ShieldCheck size={20} />
              <p className="font-medium text-sm">
                Plus de 1 200 acteurs agricoles nous font confiance.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN - Form */}
        <section className="flex-1 flex flex-col p-8 md:p-12 lg:p-20 justify-center relative">
          <div className="absolute top-10 right-10 text-sm">
            <span className="text-on-surface-variant">Pas encore inscrit ? </span>
            <Link to="/register" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">Créer un compte</Link>
          </div>
          
          <div className="max-w-[420px] w-full mx-auto">
            <header className="mb-10 text-center md:text-left">
              <h2 className="text-4xl font-serif-display text-on-surface mb-3">Bon retour !</h2>
              <p className="text-on-surface-variant">Connectez-vous pour gérer vos activités sur AgroConnect BF.</p>
            </header>

            {error && (
              <div className="mb-8 bg-error-container text-on-error-container p-4 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top">
                <AlertCircle size={20} />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-widest pl-1" htmlFor="email">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:border-primary/20 transition-all text-on-surface placeholder:text-outline/40 outline-none" 
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
                  <label className="text-xs font-bold text-outline uppercase tracking-widest" htmlFor="password">Mot de passe</label>
                  <Link to="/forgot-password" university-none className="text-xs text-primary hover:underline font-bold">Oublié ?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    className="w-full pl-12 pr-12 py-4 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:border-primary/20 transition-all text-on-surface placeholder:text-outline/40 outline-none" 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors" 
                    type="button"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 group hover:bg-primary-container hover:text-on-primary-container shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-4" 
                type="submit"
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {notVerifiedError && (
              <div className="mt-8 p-5 bg-warning-container text-on-warning-container rounded-2xl border border-warning/20 flex flex-col gap-3">
                <div className="flex items-center gap-2 font-bold">
                   <AlertCircle size={20} />
                   <span>Vérification requise</span>
                </div>
                <p className="text-sm opacity-90">Votre email n'est pas encore vérifié. Veuillez entrer le code reçu.</p>
                <button onClick={() => navigate('/verify-otp')} className="w-full py-2 bg-on-warning-container text-white rounded-xl font-bold text-sm">
                  Vérifier maintenant
                </button>
              </div>
            )}

            <div className="relative my-12">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/20"></div></div>
               <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em] text-outline">
                 <span className="px-4 bg-background">OU</span>
               </div>
            </div>

            <div className="text-center text-xs text-outline font-medium flex items-center justify-center gap-2">
               <ShieldCheck size={14} className="text-primary" />
               Connexion 256-bit SSL sécurisée
            </div>
          </div>
        </section>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default LoginPage;
