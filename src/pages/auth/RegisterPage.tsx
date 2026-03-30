import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, 
  Leaf, ArrowRight, CheckCircle2, ShoppingCart, Tractor, 
  AlertCircle, ChevronRight 
} from 'lucide-react';
import VisitorFooter from '../../components/shared/VisitorFooter';

import registerBg from '../../assets/images/register-bg.png';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth) as any;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [cguAccepted, setCguAccepted] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getPasswordScore = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
  };
  const pwScore = getPasswordScore(formData.password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return setError('Veuillez entrer une adresse e-mail valide.');
    
    if (pwScore < 3) return setError('Votre mot de passe est trop faible. Veuillez respecter les critères.');
    if (!cguAccepted) return setError('Vous devez accepter les conditions pour continuer.');

    setLoading(true);
    try {
      const response = await api.post('/auth/register', { ...formData });
      const { access_token, user } = response.data;
      setAuth(access_token, user);
      navigate('/verify-otp');
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-body flex flex-col">
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* LEFT COLUMN - Background Image */}
        <section className="hidden lg:flex lg:w-[40%] bg-[var(--gray-900)] p-12 flex-col justify-between sticky top-0 h-screen overflow-hidden relative">
          <img src={registerBg} alt="Background register" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-[var(--gray-900)]/40 to-transparent"></div>
          
          <Link to="/" className="flex items-center gap-3 relative z-10 group">
             <div className="w-12 h-12 bg-[var(--bg-surface)] text-[var(--section-why-bg)] rounded-xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                <Leaf size={28} />
             </div>
             <span className="text-white font-display text-3xl font-bold tracking-tight">AgroConnect BF</span>
          </Link>
          
          <div className="relative z-10 flex flex-col justify-center flex-grow max-w-lg">
            <h2 className="font-display text-white text-5xl leading-tight mb-8">
              L'agriculture <br/><span className="text-[var(--green-600)]">Burkinabè</span> de précision.
            </h2>
            
            <div className="space-y-6">
              {[
                "Accès direct aux producteurs locaux",
                "Logistique certifiée et sécurisée",
                "Paiements garantis par AgroConnect"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 bg-[var(--bg-surface)]/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                   <div className="w-6 h-6 rounded-full bg-[var(--green-600)] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-white" size={14} />
                   </div>
                   <span className="text-white font-medium text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="bg-[var(--bg-surface)]/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <p className="text-white/80 italic mb-6 leading-relaxed text-sm font-body">
                "Plus qu'une plateforme, c'est l'avenir de notre souveraineté alimentaire que nous bâtissons ensemble."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--green-600)] flex items-center justify-center font-bold text-white shadow-lg text-sm">IK</div>
                <div>
                  <p className="text-white font-bold text-sm">Ibrahim K.</p>
                  <p className="text-[var(--green-600)] text-[10px] uppercase font-bold tracking-widest">Fondateur AgroConnect</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN - Form */}
        <section className="flex-1 p-8 md:p-12 lg:p-20 bg-[var(--bg-surface)]">
          <div className="flex justify-end mb-16">
            <p className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-3">
              Déjà membre ? 
              <Link to="/login" className="px-6 py-2.5 rounded-xl border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--gray-50)] transition-all font-bold ml-2">Se connecter</Link>
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl font-display text-[var(--text-primary)] mb-4 tracking-tight">Rejoignez-nous.</h2>
              <p className="text-[var(--text-secondary)] text-lg">Inscrivez-vous pour rejoindre l'écosystème AgroConnect.</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3 text-sm">
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-bold">{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-10">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] pl-1">Prénom</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gray-400)] group-focus-within:text-[var(--text-primary)] transition-colors" size={18} />
                      <input 
                        required 
                        value={formData.firstName} 
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                        className="w-full pl-14 pr-4 py-4 bg-[var(--gray-50)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-[var(--bg-surface)] transition-all outline-none font-medium text-[var(--text-primary)]" 
                        placeholder="Jean" 
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] pl-1">Nom</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gray-400)] group-focus-within:text-[var(--text-primary)] transition-colors" size={18} />
                      <input 
                        required 
                        value={formData.lastName} 
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                        className="w-full pl-14 pr-4 py-4 bg-[var(--gray-50)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-[var(--bg-surface)] transition-all outline-none font-medium text-[var(--text-primary)]" 
                        placeholder="Ouédraogo" 
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] pl-1">Adresse e-mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gray-400)] group-focus-within:text-[var(--text-primary)] transition-colors" size={18} />
                    <input 
                      required 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      className="w-full pl-14 pr-4 py-4 bg-[var(--gray-50)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-[var(--bg-surface)] transition-all outline-none font-medium text-[var(--text-primary)]" 
                      placeholder="jean.oued@exemple.bf" 
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] pl-1">Mot de passe</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gray-400)] group-focus-within:text-[var(--text-primary)] transition-colors" size={18} />
                    <input 
                      required 
                      value={formData.password} 
                      onChange={(e) => setFormData({...formData, password: e.target.value})} 
                      className="w-full pl-14 pr-14 py-4 bg-[var(--gray-50)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-[var(--bg-surface)] transition-all outline-none font-medium text-[var(--text-primary)]" 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"}
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--gray-400)] hover:text-[var(--text-primary)] transition-colors" type="button">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  <div className="pt-3 px-1">
                    <div className="flex gap-2 h-1.5 mb-3">
                      {[1,2,3,4].map(s => (
                        <div key={s} className={`flex-1 rounded-full transition-all duration-700 ${pwScore >= s ? (pwScore <= 2 ? 'bg-red-500' : (pwScore === 3 ? 'bg-yellow-500' : 'bg-[var(--green-600)]')) : 'bg-[var(--gray-200)]'}`}></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-[10px] font-bold text-[var(--gray-400)] uppercase tracking-wider">
                      <div className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-[var(--green-600)]' : ''}`}>
                         <CheckCircle2 size={12} fill={formData.password.length >= 8 ? "currentColor" : "none"} /> 8+ caractères
                      </div>
                      <div className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-[var(--green-600)]' : ''}`}>
                         <CheckCircle2 size={12} fill={/[A-Z]/.test(formData.password) ? "currentColor" : "none"} /> Une majuscule
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[var(--gray-50)] p-6 rounded-2xl border border-[var(--border-light)]/50">
                <input 
                  checked={cguAccepted} 
                  onChange={(e) => setCguAccepted(e.target.checked)} 
                  className="mt-1 w-5 h-5 rounded-lg border-[var(--border-light)] text-[var(--text-primary)] focus:ring-[var(--gray-900)] transition-all cursor-pointer" 
                  id="cgu" 
                  type="checkbox"
                />
                <label className="text-xs leading-relaxed text-[var(--text-secondary)] cursor-pointer select-none" htmlFor="cgu">
                  J'accepte les <Link to="#" className="text-[var(--text-primary)] font-bold underline decoration-2 underline-offset-4">Conditions Générales</Link> et la politique de confidentialité d'AgroConnect BF.
                </label>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-[var(--text-primary)] text-white py-5 rounded-2xl font-bold flex justify-center items-center gap-3 group hover:shadow-2xl hover:bg-black active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-xl shadow-[var(--text-primary)]/10" 
                type="submit"
              >
                {loading ? 'Création de votre espace...' : 'Créer mon compte'}
                {!loading && <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>
        </section>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default RegisterPage;
