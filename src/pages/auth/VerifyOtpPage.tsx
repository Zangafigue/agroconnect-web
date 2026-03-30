import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck, ArrowRight, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getUserRole, getRoleSlug } from '../../utils/auth';
import VisitorFooter from '../../components/shared/VisitorFooter';

const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user) as any;
  const setAuth = useAuthStore((state) => state.setAuth) as any;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) return setError('Veuillez entrer le code complet.');

    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp', { email: user?.email, otp: code });
      setSuccess(true);
      if (user) {
        setAuth(useAuthStore.getState().token, { ...user, isVerified: true });
      }
      setTimeout(() => {
        const updatedUser = useAuthStore.getState().user;
        const resolved = getUserRole(updatedUser || user);
        if (resolved === 'ADMIN') navigate('/admin');
        else navigate(`/${getRoleSlug(resolved)}/dashboard`);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Code invalide ou expiré.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setResending(true);
    try {
      await api.post('/auth/resend-otp', { email: user?.email });
      setCountdown(60);
      setError('');
    } catch (err: any) {
      setError("Erreur lors du renvoi du code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-body flex flex-col">
       <header className="flex flex-col items-center justify-center w-full py-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[var(--text-accent)] text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
             <ShieldCheck size={24} />
          </div>
          <span className="text-[var(--text-primary)] font-display text-3xl tracking-tight">AgroConnect BF</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-[500px]">
          <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-[var(--text-primary)]/5 border border-[var(--border-light)] text-center relative overflow-hidden">
            {success ? (
               <div className="animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-[var(--text-accent)]/10 text-[var(--text-accent)] rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={56} />
                  </div>
                  <h2 className="text-4xl font-display text-[var(--text-primary)] mb-4">Code vérifié.</h2>
                  <p className="text-lg text-[var(--text-secondary)] mb-10">Votre compte est désormais actif. Préparation de votre espace de travail...</p>
                  <RefreshCw size={24} className="animate-spin text-[var(--text-accent)] mx-auto" />
               </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-3xl bg-[var(--bg-muted)] text-[var(--text-primary)] flex items-center justify-center mx-auto mb-8 border border-[var(--border-light)]">
                   <ShieldCheck size={36} />
                </div>
                <h2 className="text-4xl font-display text-[var(--text-primary)] mb-4 tracking-tight">Sécurité.</h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                  Nous avons envoyé un code de sécurité à <span className="font-bold text-[var(--text-primary)]">{user?.email || 'votre email'}</span>.
                </p>

                {error && (
                  <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3 text-sm text-left animate-in shake">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="font-bold">{error}</span>
                  </div>
                )}

                <form onSubmit={handleVerify} className="space-y-10">
                  <div className="flex justify-between gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el as HTMLInputElement; }}
                        className="w-full h-16 text-center text-3xl font-bold bg-[var(--bg-muted)] border-2 border-transparent rounded-2xl focus:border-[var(--gray-900)] focus:bg-white focus:ring-4 focus:ring-[var(--text-accent)]/5 outline-none transition-all font-mono text-[var(--text-primary)]"
                        maxLength={1}
                        placeholder="•"
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    ))}
                  </div>

                  <button 
                    disabled={loading || otp.join('').length < 6}
                    className="w-full py-5 bg-[var(--text-accent)] text-white font-bold rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-black shadow-xl shadow-[var(--text-accent)]/10 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]" 
                    type="submit"
                  >
                    {loading ? 'Vérification...' : 'Confirmer l\'accès'}
                    {!loading && <ArrowRight size={22} />}
                  </button>
                </form>

                <div className="mt-12 pt-10 border-t border-[var(--border-light)]">
                   <p className="text-sm text-[var(--text-secondary)] mb-6">Code non reçu ?</p>
                   <button 
                     onClick={handleResend}
                     disabled={resending || countdown > 0}
                     className="flex items-center gap-3 mx-auto text-[var(--text-primary)] font-black uppercase text-[10px] tracking-[0.2em] hover:text-[var(--text-accent)] disabled:text-[var(--text-muted)] transition-all"
                   >
                     {resending ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                     {countdown > 0 ? (
                       <span className="flex items-center gap-2">
                         Nouveau code dans <span className="text-red-600 font-mono text-lg">{countdown}s</span>
                       </span>
                     ) : 'Renvoyer un code'}
                   </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default VerifyOtpPage;
