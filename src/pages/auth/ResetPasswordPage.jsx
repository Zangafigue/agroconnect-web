import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Score computation
  const getPasswordScore = (pw) => {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
  };
  const pwScore = getPasswordScore(password);

  const handleCodeChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const otp = code.join('');
    if (otp.length !== 6) return setError('Code de vérification incomplet.');
    if (password !== confirmPassword) return setError('Les mots de passe ne correspondent pas.');
    if (pwScore < 3) return setError('Le mot de passe est trop faible.');

    setLoading(true);
    try {
      await api.post('/auth/reset-password', { otp, newPassword: password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-background min-h-screen flex flex-col items-center">
      <header className="flex flex-col items-center justify-center w-full py-12 mb-8 bg-transparent">
        <Link to="/" className="text-3xl tracking-tight text-primary antialiased font-serif text-4xl" style={{fontFamily: "'DM Serif Display', serif"}}>
          AgroLink
        </Link>
      </header>

      <main className="w-full max-w-[440px] px-6 pb-24 relative">
        {!success ? (
          <div className="bg-surface-container-lowest rounded-[16px] p-10 shadow-sm border border-outline-variant/10">
            <h2 className="text-3xl text-on-surface mb-3 leading-tight font-serif" style={{fontFamily: "'DM Serif Display', serif"}}>
              Nouveau mot de passe
            </h2>
            <p className="text-outline text-sm mb-10 leading-relaxed">
              Entrez le code reçu par email puis votre nouveau mot de passe.
            </p>

            {error && (
              <div className="mb-6 bg-error-container text-on-error-container p-4 rounded-xl flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-4">Code de vérification</label>
                <div className="flex justify-between gap-1">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-[52px] h-[60px] text-center text-xl border-2 border-[#e5e7eb] rounded-[10px] font-mono text-on-surface bg-surface-container-low focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      maxLength="1"
                      placeholder="•"
                      type="text"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Nouveau mot de passe</label>
                  <div className="relative">
                    <input 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 px-4 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface" 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"} 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline cursor-pointer hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  
                  <div className="mt-3 flex gap-1.5 h-1">
                    <div className={`flex-1 rounded-full ${pwScore >= 1 ? 'bg-error' : 'bg-surface-container-highest'}`}></div>
                    <div className={`flex-1 rounded-full ${pwScore >= 2 ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
                    <div className={`flex-1 rounded-full ${pwScore >= 3 ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
                    <div className={`flex-1 rounded-full ${pwScore >= 4 ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
                  </div>
                  {pwScore >= 3 && (
                    <p className="text-[10px] mt-2 text-primary font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Sécurité : Satisfaisante
                    </p>
                  )}
                </div>

                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Confirmer le mot de passe</label>
                  <div className="relative">
                    <input 
                      required 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-12 px-4 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface" 
                      placeholder="••••••••" 
                      type="password" 
                    />
                    {confirmPassword && password === confirmPassword && (
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary">check_circle</span>
                    )}
                  </div>
                  {confirmPassword && password === confirmPassword && (
                    <p className="text-[10px] mt-2 text-primary font-medium">Les mots de passe correspondent</p>
                  )}
                </div>
              </div>

              <button disabled={loading || code.join('').length !== 6 || pwScore < 3 || password !== confirmPassword} className="w-full bg-primary disabled:opacity-70 disabled:cursor-not-allowed text-on-primary font-bold py-4 rounded-xl hover:bg-primary-container transition-all shadow-md shadow-primary/10 active:scale-95 duration-200" type="submit">
                {loading ? 'Réinitialisation...' : 'Réinitialiser mon mot de passe'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-surface-container-high/60 backdrop-blur-md rounded-[16px] p-10 border border-primary/20 text-center relative z-20">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            </div>
            <h3 className="text-2xl font-serif text-on-surface mb-2" style={{fontFamily: "'DM Serif Display', serif"}}>Mot de passe réinitialisé !</h3>
            <p className="text-sm text-outline mb-8">Vous allez être redirigé vers la connexion dans 3 secondes.</p>
            <Link className="inline-flex items-center gap-2 text-primary font-bold hover:underline" to="/login">
              Se connecter maintenant
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        )}
      </main>

      <footer className="mt-auto w-full py-6 flex justify-center gap-8 px-4 bg-transparent border-t border-outline-variant/10">
        <span className="font-sans text-xs uppercase tracking-widest text-slate-500">
          © 2024 L'Agronome Éditorial. Tous droits réservés.
        </span>
        <div className="flex gap-4">
          <Link className="font-sans text-xs uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors underline-offset-4 hover:underline" to="#">Assistance</Link>
          <Link className="font-sans text-xs uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors underline-offset-4 hover:underline" to="#">Conditions</Link>
        </div>
      </footer>
    </div>
  );
}
