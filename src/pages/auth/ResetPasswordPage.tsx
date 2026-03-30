import React, { useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Key, Mail } from 'lucide-react';
import VisitorFooter from '../../components/shared/VisitorFooter';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(() => location.state?.email || '');
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
    if (!email) return setError('Veuillez renseigner votre adresse e-mail.');
    if (otp.length !== 6) return setError('Code de vérification incomplet.');
    if (password !== confirmPassword) return setError('Les mots de passe ne correspondent pas.');
    if (pwScore < 3) return setError('Le mot de passe est trop faible.');

    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword: password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-body flex flex-col">
       <header className="flex flex-col items-center justify-center w-full py-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[var(--text-accent)] text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
             <Key size={24} />
          </div>
          <span className="text-[var(--text-primary)] font-display text-3xl tracking-tight">AgroConnect BF</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-[500px]">
          {!success ? (
            <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-[var(--text-primary)]/5 border border-[var(--border-light)]">
              <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-3xl bg-[var(--bg-muted)] text-[var(--text-primary)] flex items-center justify-center mx-auto mb-8 border border-[var(--border-light)]">
                  <Key size={36} />
                </div>
                <h2 className="text-4xl font-display text-[var(--text-primary)] mb-4 tracking-tight">Nouveau code.</h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  Entrez le code à 6 chiffres reçu par mail et définissez votre nouveau mot de passe.
                </p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3 text-sm animate-in shake">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="font-bold">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] pl-1 block">Adresse E-mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] transition-colors" size={20} />
                    <input 
                      required 
                      value={email}
                      readOnly={!!location.state?.email}
                      onChange={(e) => !location.state?.email && setEmail(e.target.value)}
                      className={`w-full pl-14 pr-4 py-5 bg-[var(--bg-muted)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] transition-all text-[var(--text-primary)] outline-none font-medium ${location.state?.email ? 'opacity-70 cursor-not-allowed' : 'focus:bg-white'}`}
                      placeholder="votre@email.com" 
                      type="email" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] pl-1 text-center block">Code de vérification (6 chiffres)</label>
                  <div className="flex justify-between gap-3">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { if (el) inputRefs.current[index] = el; }}
                        className="w-full h-16 text-center text-3xl font-bold bg-[var(--bg-muted)] border-2 border-transparent rounded-2xl focus:border-[var(--gray-900)] focus:bg-white focus:ring-4 focus:ring-[var(--text-accent)]/5 outline-none transition-all font-mono text-[var(--text-primary)]"
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
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] pl-1">Nouveau mot de passe</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] transition-colors" size={20} />
                      <input 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-14 pr-14 py-5 bg-[var(--bg-muted)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-white transition-all text-[var(--text-primary)] outline-none font-medium" 
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"} 
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] pl-1">Confirmer le mot de passe</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] transition-colors" size={20} />
                      <input 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-14 pr-12 py-5 bg-[var(--bg-muted)] border border-transparent rounded-2xl focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-white transition-all text-[var(--text-primary)] outline-none font-medium" 
                        placeholder="••••••••" 
                        type="password" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={loading || !email || code.join('').length !== 6 || pwScore < 3 || password !== confirmPassword} 
                  className="w-full bg-[var(--text-accent)] text-white font-bold py-5 rounded-[1.5rem] hover:bg-black shadow-xl shadow-[var(--text-accent)]/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-3" 
                  type="submit"
                >
                  {loading ? 'Mise à jour...' : 'Réinitialiser mon mot de passe'}
                  {!loading && <ArrowRight size={22} />}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-12 border border-[var(--text-accent)]/20 text-center shadow-2xl shadow-[var(--text-primary)]/5 relative overflow-hidden">
              <div className="w-24 h-24 bg-[var(--text-accent)]/10 text-[var(--text-accent)] rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in">
                <CheckCircle2 size={56} />
              </div>
              <h3 className="text-4xl font-display text-[var(--text-primary)] mb-4">Bravo !</h3>
              <p className="text-lg text-[var(--text-secondary)] mb-12">Votre mot de passe a été modifié. Redirection sécurisée dans quelques secondes...</p>
              <Link className="inline-flex items-center gap-3 text-[var(--text-primary)] font-bold hover:underline decoration-2 underline-offset-8 group" to="/login">
                Se connecter maintenant
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
