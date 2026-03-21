import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

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

  const getPasswordScore = (pw) => {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
  };
  const pwScore = getPasswordScore(formData.password);

  const handleRegister = async (e) => {
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
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body selection:bg-primary/20">
      <main className="min-h-screen flex flex-col md:flex-row">
        {/* LEFT COLUMN */}
        <section className="w-full md:w-1/2 bg-[#14532d] p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCE4PF1abVESVxKxTR3Wxn16TIJjLthKOdN5fJUvom427Efmet8kruTd9B5VU8ZfjBXbkoneY-QJbFsADCsmt-8WCw1y5anWNGlN01ftVDIhZZZsUo-8iEyDDX4C1MR86KN9lWF0CfUTe7teDTdXLoeUvd9_gxEdK8HG1Z_ScoUs-qxQ3J1p5pi7QaU4zR0iiA8HKffvRSbNqTYprkquT77-txoJPFSW4C1CP6vv0TK_xVddCRlx1OsOW9j1dMDQPspT-Wb6T3SXEc')"}}></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-white text-3xl">eco</span>
              <span className="text-white text-xl font-bold tracking-tight">AgroConnect BF</span>
            </Link>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center flex-grow max-w-lg">
            <h2 className="font-serif-display text-white text-5xl leading-tight mb-4">
              Rejoignez la communauté agricole du Burkina Faso
            </h2>
            <p className="text-white/70 text-lg mb-12">
              Accédez à des centaines de producteurs certifiés.
            </p>
            <div className="space-y-8 mt-8">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <span className="text-white font-medium">Catalogue de produits vérifiés</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <span className="text-white font-medium">Paiement sécurisé par escrow</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <span className="text-white font-medium">Logistique intégrée</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <p className="text-white italic mb-4 leading-relaxed">
                "Grâce à AgroConnect BF, j'ai multiplié mes ventes par 3 en 6 mois."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">AK</div>
                <div>
                  <p className="text-white font-semibold text-sm">Amadou K.</p>
                  <p className="text-white/60 text-xs">Agriculteur, Bobo-Dioulasso</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <section className="w-full md:w-1/2 bg-[#f8faf8] p-12 flex flex-col relative">
          <div className="flex justify-end mb-12">
            <p className="text-sm text-on-surface-variant">
              Déjà un compte ? 
              <Link to="/login" className="text-primary font-semibold hover:underline ml-1">Se connecter</Link>
            </p>
          </div>

          <div className="max-w-xl mx-auto w-full">
            <div className="mb-10">
              <h2 className="font-bold text-3xl text-on-surface tracking-tight mb-2">Créer mon compte</h2>
              <p className="text-on-surface-variant text-sm">Commencez votre voyage numérique au cœur de l'agriculture burkinabè.</p>
            </div>

            {error && (
              <div className="mb-6 bg-error-container text-on-error-container p-4 rounded-xl flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>error</span>
                <span>{error}</span>
              </div>
            )}

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <button onClick={() => setRole('FARMER')} type="button" className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${role === 'FARMER' ? 'border-primary bg-emerald-50 text-primary' : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/50'}`}>
                <span className="material-symbols-outlined text-3xl mb-2" style={role === 'FARMER' ? {fontVariationSettings: "'FILL' 1"} : {}}>agriculture</span>
                <span className="text-xs font-bold uppercase tracking-wider mb-1">Agriculteur</span>
                <span className="text-[10px] text-center opacity-80 leading-tight">Je vends mes récoltes</span>
              </button>
              <button onClick={() => setRole('BUYER')} type="button" className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${role === 'BUYER' ? 'border-primary bg-emerald-50 text-primary' : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/50'}`}>
                <span className="material-symbols-outlined text-3xl mb-2" style={role === 'BUYER' ? {fontVariationSettings: "'FILL' 1"} : {}}>shopping_cart</span>
                <span className="text-xs font-bold uppercase tracking-wider mb-1">Acheteur</span>
                <span className="text-[10px] text-center opacity-80 leading-tight">J'achète en volume</span>
              </button>
              <button onClick={() => setRole('TRANSPORTER')} type="button" className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${role === 'TRANSPORTER' ? 'border-primary bg-emerald-50 text-primary' : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/50'}`}>
                <span className="material-symbols-outlined text-3xl mb-2" style={role === 'TRANSPORTER' ? {fontVariationSettings: "'FILL' 1"} : {}}>local_shipping</span>
                <span className="text-xs font-bold uppercase tracking-wider mb-1">Transporteur</span>
                <span className="text-[10px] text-center opacity-80 leading-tight">Je livre des commandes</span>
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Prénom</label>
                  <input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all text-on-surface" placeholder="Entrez votre prénom" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nom</label>
                  <input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all text-on-surface" placeholder="Entrez votre nom" type="text"/>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Adresse e-mail</label>
                <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all text-on-surface" placeholder="nom@exemple.com" type="email"/>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Numéro de téléphone (Optionnel)</label>
                <div className="flex gap-2">
                  <span className="bg-surface-container-high px-4 py-3 rounded-xl text-sm flex items-center font-mono">+226</span>
                  <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all font-mono text-on-surface" placeholder="00 00 00 00" type="tel"/>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Mot de passe</label>
                <div className="relative">
                  <input required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-primary transition-all text-on-surface" placeholder="••••••••" type={showPassword ? "text" : "password"}/>
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" type="button">
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                <div className="mt-4 space-y-3">
                  <div className="flex gap-1 h-1.5">
                    <div className={`flex-1 rounded-full transition-colors ${pwScore >= 1 ? 'bg-error' : 'bg-outline-variant'}`}></div>
                    <div className={`flex-1 rounded-full transition-colors ${pwScore >= 2 ? 'bg-tertiary' : 'bg-outline-variant'}`}></div>
                    <div className={`flex-1 rounded-full transition-colors ${pwScore >= 3 ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                    <div className={`flex-1 rounded-full transition-colors ${pwScore >= 4 ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-sm ${formData.password.length >= 8 ? 'text-primary' : 'text-on-surface-variant/40'}`} style={formData.password.length >= 8 ? {fontVariationSettings: "'FILL' 1"} : {}}>
                        {formData.password.length >= 8 ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>8 caractères minimum</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-sm ${/[A-Z]/.test(formData.password) ? 'text-primary' : 'text-on-surface-variant/40'}`} style={/[A-Z]/.test(formData.password) ? {fontVariationSettings: "'FILL' 1"} : {}}>
                        {/[A-Z]/.test(formData.password) ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>Une majuscule</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-sm ${/[0-9]/.test(formData.password) ? 'text-primary' : 'text-on-surface-variant/40'}`} style={/[0-9]/.test(formData.password) ? {fontVariationSettings: "'FILL' 1"} : {}}>
                        {/[0-9]/.test(formData.password) ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>Un chiffre</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-sm ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-primary' : 'text-on-surface-variant/40'}`} style={/[^A-Za-z0-9]/.test(formData.password) ? {fontVariationSettings: "'FILL' 1"} : {}}>
                        {/[^A-Za-z0-9]/.test(formData.password) ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>Un caractère spécial</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input checked={cguAccepted} onChange={(e) => setCguAccepted(e.target.checked)} className="mt-1 rounded border-outline-variant text-primary focus:ring-primary bg-white" id="cgu" type="checkbox"/>
                <label className="text-xs leading-relaxed text-on-surface-variant cursor-pointer" htmlFor="cgu">
                  J'accepte les <Link to="#" className="text-primary font-semibold underline underline-offset-2">Conditions Générales d'Utilisation</Link> et la <Link to="#" className="text-primary font-semibold underline underline-offset-2">Politique de Confidentialité</Link>.
                </label>
              </div>

              <button disabled={loading} className="w-full bg-primary hover:bg-primary-container disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-primary/20 mt-8" type="submit">
                {loading ? 'Création en cours...' : 'Créer mon compte'}
                {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
              </button>
              
              <div className="pt-6 flex justify-center items-center gap-2 text-xs text-on-surface-variant opacity-60">
                <span className="material-symbols-outlined text-sm">lock</span>
                Vos données sont protégées par un cryptage de bout en bout.
              </div>
            </form>
          </div>
        </section>
      </main>
      
      {/* FOOTER */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 py-12">
          <div>
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">AgroConnect BF</h3>
            <p className="font-sans text-sm text-slate-500 dark:text-slate-400">© 2024 AgroConnect BF. Tous droits réservés. Soutenir l'excellence agricole au Burkina Faso.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-4">Liens Utiles</h4>
            <Link to="#" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-300 underline underline-offset-4">À propos</Link>
            <Link to="#" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-300 underline underline-offset-4">Contact</Link>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-4">Support</h4>
            <Link to="#" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-300 underline underline-offset-4">Aide</Link>
            <Link to="#" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-300 underline underline-offset-4">Confidentialité</Link>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-4">Légal</h4>
            <Link to="#" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-300 underline underline-offset-4">Mentions Légales</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
