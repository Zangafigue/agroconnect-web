import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Key } from 'lucide-react';
import VisitorFooter from '../../components/shared/VisitorFooter';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getPasswordScore = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
  };
  const pwScore = getPasswordScore(password);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col">
       <header className="flex flex-col items-center justify-center w-full py-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <Key size={20} />
          </div>
          <span className="text-primary font-serif-display text-2xl tracking-tight">AgroConnect BF</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[480px]">
          {!success ? (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl shadow-primary/5">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif-display text-on-surface mb-3">Nouveau mot de passe</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Entrez le code à 6 chiffres reçu dans votre boîte mail.
                </p>
              </div>

              {error && (
                <div className="mb-8 bg-error-container text-on-error-container p-4 rounded-2xl flex items-center gap-3 text-sm">
                  <AlertCircle size={20} />
                  <span className="font-bold">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-outline pl-1">Code de vérification</label>
                  <div className="flex justify-between gap-2">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                        className="w-12 h-16 text-center text-2xl font-bold bg-surface-container-low border-2 border-transparent rounded-xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all font-mono"
                        maxLength={1}
                        placeholder="•"
                        type="text"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-outline pl-1">Nouveau mot de passe</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                      <input 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface outline-none" 
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"} 
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-outline pl-1">Confirmer le mot de passe</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                      <input 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface outline-none" 
                        placeholder="••••••••" 
                        type="password" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={loading || code.join('').length !== 6 || pwScore < 3 || password !== confirmPassword} 
                  className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary-container hover:text-on-primary-container shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]" 
                  type="submit"
                >
                  {loading ? 'Mise à jour...' : 'Réinitialiser mon mot de passe'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-primary/20 text-center shadow-2xl shadow-primary/5 relative overflow-hidden">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-serif-display text-on-surface mb-2">Mot de passe modifié !</h3>
              <p className="text-sm text-on-surface-variant mb-10">Sécurité mise à jour avec succès. Redirection vers la connexion...</p>
              <Link className="inline-flex items-center gap-2 text-primary font-bold hover:underline group" to="/login">
                Se connecter maintenant
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default ResetPasswordPage;
