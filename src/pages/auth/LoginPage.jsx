import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notVerifiedError, setNotVerifiedError] = useState(false);

  const handleLogin = async (e) => {
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
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants incorrects ou erreur réseau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body bg-[#f8faf8] text-on-surface antialiased">
      <main className="min-h-screen flex flex-col md:flex-row">
        {/* LEFT COLUMN */}
        <section className="hidden md:flex md:w-[40%] bg-[#f0fdf4] p-12 flex-col justify-between items-start sticky top-0 h-screen">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">potted_plant</span>
            <Link to="/" className="text-primary font-semibold text-2xl tracking-tight">AgroConnect BF</Link>
          </div>
          
          <div className="w-full flex flex-col gap-6 items-center">
            <div className="w-full max-w-[320px] bg-surface-container-lowest p-5 rounded-xl shadow-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-surface-container-low p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">agriculture</span>
                </div>
                <span className="text-[10px] font-mono font-bold py-1 px-2 bg-primary-fixed text-on-primary-fixed rounded-full">CONFIRMÉE</span>
              </div>
              <h4 className="font-headline text-lg font-semibold text-on-surface">Maïs jaune séché</h4>
              <p className="text-xs text-outline mb-4">Provenance: Hauts-Bassins</p>
              <div className="flex justify-between items-baseline">
                <span className="text-primary font-mono text-xl font-medium">18 500 FCFA</span>
                <span className="text-[10px] text-outline uppercase tracking-wider">Le sac (100kg)</span>
              </div>
            </div>

            <div className="w-full max-w-[320px] bg-surface-container-lowest p-5 rounded-xl shadow-sm transform rotate-3 translate-x-8 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-surface-container-low p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">nutrition</span>
                </div>
                <span className="text-[10px] font-mono font-bold py-1 px-2 bg-secondary-container text-on-secondary-container rounded-full">ACTIF</span>
              </div>
              <h4 className="font-headline text-lg font-semibold text-on-surface">Tomates Cerises</h4>
              <p className="text-xs text-outline mb-4">Producteur: Coopérative Faso</p>
              <div className="flex justify-between items-baseline">
                <span className="text-primary font-mono text-xl font-medium">4 500 FCFA</span>
                <span className="text-[10px] text-outline uppercase tracking-wider">Cagette (20kg)</span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="text-[#14532d] font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              Plus de 1 200 acteurs agricoles vous font confiance.
            </p>
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <section className="flex-1 flex flex-col p-8 md:p-12 lg:p-16 justify-center bg-[#f8faf8] relative">
          <div className="absolute top-8 right-8 text-sm">
            <span className="text-outline">Pas encore de compte ? </span>
            <Link to="/register" className="text-primary font-bold hover:underline">S'inscrire</Link>
          </div>
          
          <div className="max-w-[400px] w-full mx-auto">
            <header className="mb-8">
              <h2 className="text-[2rem] font-semibold text-[#111827] leading-tight mb-2">Se connecter</h2>
              <p className="text-sm text-[#6b7280]">Accédez à votre espace personnel et gérez vos activités.</p>
            </header>

            {error && (
              <div className="mb-6 bg-error-container text-on-error-container p-4 rounded-xl flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="email">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline/50" 
                    id="email" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.bf" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="password">Mot de passe</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">lock</span>
                  </div>
                  <input 
                    className="w-full pl-10 pr-12 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline/50" 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors" type="button">
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <div className="text-right">
                  <Link to="/forgot-password" className="text-[13px] text-primary hover:underline font-medium">Mot de passe oublié ?</Link>
                </div>
              </div>

              <button disabled={loading} className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex justify-center items-center gap-2 group hover:bg-primary-container disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-2" type="submit">
                {loading ? 'Connexion en cours...' : 'Se connecter'}
                {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>
            </form>

            {notVerifiedError && (
              <div className="mt-8 flex items-center gap-3 bg-[#fef3c7] border border-[#fcd34d] p-4 rounded-xl animate-pulse-subtle">
                <span className="material-symbols-outlined text-[#92400e]" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                <div className="flex-1">
                  <p className="text-sm text-[#92400e] leading-tight">Votre email n'est pas encore vérifié.</p>
                  <button onClick={() => navigate('/verify-otp')} className="text-[13px] text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all mt-1">
                    Vérifier maintenant <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            <div className="relative mt-12 mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e7eb]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-[#f8faf8] text-[#6b7280] uppercase tracking-widest font-medium">ou</span>
              </div>
            </div>

            <footer className="text-center mt-8">
              <p className="text-[13px] text-[#6b7280] flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-sm">encrypted</span>
                Connexion sécurisée — Vos données sont protégées
              </p>
            </footer>
          </div>
        </section>
      </main>
      <footer className="bg-surface-container-low border-t border-outline-variant/15 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-lg font-bold text-primary">AgroConnect BF</span>
            <p className="font-headline italic text-xs text-outline">© 2024 AgroConnect BF. L'excellence agronomique au service du Burkina Faso.</p>
          </div>
          <nav className="flex gap-6">
            <Link to="#" className="font-headline italic text-xs text-outline hover:text-tertiary transition-colors">Conditions Générales</Link>
            <Link to="#" className="font-headline italic text-xs text-outline hover:text-tertiary transition-colors">Confidentialité</Link>
            <Link to="#" className="font-headline italic text-xs text-outline hover:text-tertiary transition-colors">Support Technique</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
