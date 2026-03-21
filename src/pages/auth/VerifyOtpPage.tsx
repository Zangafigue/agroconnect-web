import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck, ArrowRight, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
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
      // Update local state isVerified
      if (user) {
        setAuth(useAuthStore.getState().token, { ...user, isVerified: true });
      }
      setTimeout(() => {
        navigate(user?.role === 'ADMIN' ? '/admin' : `/${user?.role?.toLowerCase()}/dashboard`);
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
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col">
       <header className="flex flex-col items-center justify-center w-full py-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <ShieldCheck size={20} />
          </div>
          <span className="text-primary font-serif-display text-2xl tracking-tight">AgroConnect BF</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-[460px]">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl shadow-primary/5 text-center">
            {success ? (
               <div className="animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-serif-display text-on-surface mb-3">Compte vérifié !</h2>
                  <p className="text-sm text-on-surface-variant mb-6">Félicitations, votre espace AgroConnect est maintenant actif.</p>
                  <p className="text-xs text-outline italic">Redirection immédiate...</p>
               </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                   <ShieldCheck size={32} />
                </div>
                <h2 className="text-3xl font-serif-display text-on-surface mb-3">Vérification</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                  Nous avons envoyé un code de sécurité à <span className="font-bold text-on-surface">{user?.email || 'votre email'}</span>.
                </p>

                {error && (
                  <div className="mb-8 bg-error-container text-on-error-container p-4 rounded-2xl flex items-center gap-3 text-sm text-left">
                    <AlertCircle size={20} />
                    <span className="font-bold">{error}</span>
                  </div>
                )}

                <form onSubmit={handleVerify} className="space-y-8">
                  <div className="flex justify-between gap-2 md:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                        className="w-full h-16 text-center text-3xl font-bold bg-surface-container-low border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-mono"
                        maxLength={1}
                        placeholder="-"
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    ))}
                  </div>

                  <button 
                    disabled={loading || otp.join('').length < 6}
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]" 
                    type="submit"
                  >
                    {loading ? 'Vérification...' : 'Confirmer le code'}
                    {!loading && <ArrowRight size={20} />}
                  </button>
                </form>

                <div className="mt-10 pt-8 border-t border-outline-variant/10">
                   <p className="text-sm text-on-surface-variant mb-4">Vous n'avez pas reçu le code ?</p>
                   <button 
                     onClick={handleResend}
                     disabled={resending || countdown > 0}
                     className="flex items-center gap-2 mx-auto text-primary font-bold hover:underline disabled:text-outline disabled:no-underline transition-all"
                   >
                     {resending ? <RefreshCw size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                     {countdown > 0 ? `Renvoyer dans ${countdown}s` : 'Renvoyer un nouveau code'}
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
