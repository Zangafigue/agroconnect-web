import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { Mail, ArrowLeft, ArrowRight, Lock, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import VisitorFooter from '../../components/shared/VisitorFooter';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
      startCountdown();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la demande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setCountdown(59);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    handleSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col">
      <header className="flex flex-col items-center justify-center w-full py-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <Lock size={20} />
          </div>
          <span className="text-primary font-serif-display text-2xl tracking-tight">AgroConnect BF</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[460px]">
          {!success ? (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl shadow-primary/5">
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Lock size={32} />
                </div>
                <h2 className="text-3xl font-serif-display text-on-surface mb-3">Mot de passe oublié ?</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Pas de panique. Entrez votre email et nous vous enverrons un lien pour réinitialiser votre compte.
                </p>
              </div>

              {error && (
                <div className="mb-8 bg-error-container text-on-error-container p-4 rounded-2xl flex items-center gap-3 text-sm">
                  <AlertCircle size={20} />
                  <span className="font-bold">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-outline pl-1" htmlFor="email">Email de récupération</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-transparent rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface placeholder:text-outline-variant/50 outline-none" 
                      id="email" 
                      type="email"
                      required 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="agronome@exemple.bf" 
                    />
                  </div>
                </div>
                <button 
                  disabled={loading || !email} 
                  className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]" 
                  type="submit"
                >
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                  {!loading && <ArrowRight size={20} />}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-outline-variant/10 flex justify-center">
                <Link className="text-outline text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors group" to="/login">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Retour à la connexion
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl shadow-primary/5 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-3xl font-serif-display text-on-surface mb-3">Vérifiez vos emails</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                Si l'adresse correspond à un compte, vous recevrez un lien de réinitialisation dans quelques instants.
              </p>
              
              <div className="w-full bg-surface-container-low p-4 rounded-2xl flex items-center justify-center gap-3 mb-8">
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Renvoi possible dans</span>
                <span className="font-mono text-primary font-bold">{countdown}s</span>
              </div>
              
              <button 
                onClick={handleResend} 
                disabled={countdown > 0} 
                className="text-primary disabled:text-outline text-sm font-bold hover:underline transition-all"
              >
                Renvoyer l'email de récupération
              </button>

              <div className="mt-10 pt-8 border-t border-outline-variant/10 flex justify-center">
                <Link className="text-outline text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors" to="/login">
                  <ArrowLeft size={18} />
                  Retour à la connexion
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="py-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-outline font-medium">
           <ShieldCheck size={14} className="text-primary" />
           Sécurisé par AgroConnect BF
        </div>
      </div>
      <VisitorFooter />
    </div>
  );
};

export default ForgotPasswordPage;
