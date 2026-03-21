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

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth) as any;

  const [role, setRole] = useState('');
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

    if (!role) return setError('Veuillez sélectionner un profil (Agriculteur, Acheteur ou Transporteur).');
    if (pwScore < 3) return setError('Votre mot de passe est trop faible. Veuillez respecter les critères.');
    if (!cguAccepted) return setError('Vous devez accepter les conditions pour continuer.');

    setLoading(true);
    try {
      const response = await api.post('/auth/register', { ...formData, role });
      const { access_token, user } = response.data;
      setAuth(access_token, user);
      navigate('/verify-otp');
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'FARMER', label: 'Agriculteur', desc: 'Je vends mes récoltes', icon: Leaf },
    { id: 'BUYER', label: 'Acheteur', desc: 'J’achète en volume', icon: ShoppingCart },
    { id: 'TRANSPORTER', label: 'Transporteur', desc: 'Je livre des commandes', icon: Tractor },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col">
      <main className="flex-grow flex flex-col md:flex-row">
        {/* LEFT COLUMN - Brand/Value Prop */}
        <section className="hidden md:flex md:w-[40%] bg-primary p-12 flex-col justify-between sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }}></div>
          
          <Link to="/" className="flex items-center gap-2 relative z-10 group">
             <div className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Leaf size={24} />
             </div>
             <span className="text-white font-serif-display text-2xl font-bold tracking-tight">AgroConnect BF</span>
          </Link>
          
          <div className="relative z-10 flex flex-col justify-center flex-grow max-w-lg">
            <h2 className="font-serif-display text-white text-5xl leading-tight mb-6">
              Rejoignez la révolution agricole.
            </h2>
            <p className="text-white/80 text-lg mb-12">
              Une plateforme unique pour connecter l'offre et la demande de précision au Burkina Faso.
            </p>
            
            <div className="space-y-6">
              {[
                "Catalogue de produits 100% vérifiés",
                "Paiements sécurisés via Mobile Money",
                "Suivi logistique en temps réel"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                   <CheckCircle2 className="text-white" size={20} />
                   <span className="text-white font-medium text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-white italic mb-4 leading-relaxed text-sm">
                "AgroConnect a radicalement simplifié ma façon de vendre. Plus de sécurité et plus de clients."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs shadow-inner">IK</div>
                <div>
                  <p className="text-white font-bold text-xs">Issouf K.</p>
                  <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Producteur, Bobo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN - Form */}
        <section className="flex-1 p-8 md:p-12 lg:p-16 bg-background">
          <div className="flex justify-end mb-12">
            <p className="text-sm text-on-surface-variant flex items-center gap-1">
              Déjà membre ? 
              <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1">Se connecter</Link>
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <h2 className="text-4xl font-serif-display text-on-surface mb-3">Créer mon compte</h2>
              <p className="text-on-surface-variant">Sélectionnez votre profil pour commencer.</p>
            </div>

            {error && (
              <div className="mb-8 bg-error-container text-on-error-container p-4 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top">
                <AlertCircle size={20} />
                <span className="font-bold">{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-8">
              {/* Role Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map((r) => (
                  <button 
                    key={r.id}
                    onClick={() => setRole(r.id)} 
                    type="button" 
                    className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 relative group ${
                      role === r.id 
                      ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5' 
                      : 'border-outline-variant/30 bg-white dark:bg-slate-900 text-on-surface-variant hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${role === r.id ? 'bg-primary text-white' : 'bg-surface-container-high text-outline group-hover:bg-primary/10 group-hover:text-primary'}`}>
                      <r.icon size={28} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest mb-1">{r.label}</span>
                    <span className="text-[10px] text-center opacity-60 leading-tight">{r.desc}</span>
                    {role === r.id && (
                      <div className="absolute top-2 right-2 text-primary">
                        <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-widest pl-1">Prénom</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      required 
                      value={formData.firstName} 
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" 
                      placeholder="Jean" 
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-widest pl-1">Nom</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      required 
                      value={formData.lastName} 
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" 
                      placeholder="Ouédraogo" 
                      type="text"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-widest pl-1">Adresse e-mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" 
                    placeholder="jean.oued@exemple.bf" 
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-widest pl-1">Numéro de téléphone</label>
                <div className="flex gap-3">
                  <div className="bg-surface-container-high px-4 rounded-2xl text-xs font-bold flex items-center border border-outline-variant/10">+226</div>
                  <div className="relative flex-1 group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none font-mono" 
                      placeholder="00 00 00 00" 
                      type="tel"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-widest pl-1">Mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    required 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Password Strength */}
                <div className="pt-2 px-1">
                  <div className="flex gap-1.5 h-1 mb-3">
                    {[1,2,3,4].map(s => (
                      <div key={s} className={`flex-1 rounded-full transition-all duration-500 ${pwScore >= s ? (pwScore <= 2 ? 'bg-error' : (pwScore === 3 ? 'bg-yellow-500' : 'bg-primary')) : 'bg-outline-variant/20'}`}></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-[10px] font-bold text-outline">
                    <div className={`flex items-center gap-1.5 ${formData.password.length >= 8 ? 'text-primary' : ''}`}>
                       <CheckCircle2 size={12} fill={formData.password.length >= 8 ? "currentColor" : "none"} /> 8+ caractères
                    </div>
                    <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(formData.password) ? 'text-primary' : ''}`}>
                       <CheckCircle2 size={12} fill={/[A-Z]/.test(formData.password) ? "currentColor" : "none"} /> Une majuscule
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10">
                <input 
                  checked={cguAccepted} 
                  onChange={(e) => setCguAccepted(e.target.checked)} 
                  className="mt-1 w-5 h-5 rounded-lg border-outline-variant/30 text-primary focus:ring-primary transition-all cursor-pointer" 
                  id="cgu" 
                  type="checkbox"
                />
                <label className="text-xs leading-relaxed text-on-surface-variant cursor-pointer select-none" htmlFor="cgu">
                  Je confirme avoir lu et accepté les <Link to="#" className="text-primary font-bold underline decoration-1 underline-offset-4">Conditions Générales</Link> d'utilisation de la plateforme AgroConnect BF.
                </label>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 group hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4" 
                type="submit"
              >
                {loading ? 'Création de votre espace...' : 'Créer mon compte'}
                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
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
