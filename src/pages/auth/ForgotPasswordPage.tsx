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
    <div className="min-h-screen bg-[var(--bg-page)] font-body flex flex-col">
      <header className="flex flex-col items-center justify-center w-full py-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[var(--section-why-bg)] text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
             <Lock size={24} />
          </div>
          <span className="text-[var(--text-primary)] font-display text-3xl tracking-tight">AgroConnect BF</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-[480px]">
          {!success ? (
            <div className="bg-[var(--bg-surface)] rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-[var(--gray-900)]/5 border border-[var(--border-light)]">
              <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-3xl bg-[var(--bg-muted)] text-[var(--text-primary)] flex items-center justify-center mx-auto mb-8 border border-[var(--border-light)]">
                  <Lock size={36} />
                </div>
                <h2 className="text-4xl font-display text-[var(--text-primary)] mb-4 tracking-tight">Accès perdu ?</h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  Pas de panique. Entrez votre email pour réinitialiser votre accès sécurisé.
                </p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3 text-sm">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="font-bold">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 text-left">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] pl-1" htmlFor="email">E-mail de récupération</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gray-400)] group-focus-within:text-[var(--text-primary)] transition-colors" size={20} />
                    <input 
                      className="w-full pl-14 pr-4 py-5 bg-[var(--bg-muted)] border border-transparent rounded-[1.5rem] focus:ring-2 focus:ring-[var(--gray-900)] focus:bg-[var(--bg-surface)] transition-all text-[var(--text-primary)] placeholder:text-[var(--gray-400)] outline-none font-medium" 
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
                  className="w-full py-5 bg-[var(--text-primary)] text-white font-bold rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-black shadow-xl shadow-[var(--text-primary)]/10 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]" 
                  type="submit"
                >
                  {loading ? 'Traitement...' : 'Réinitialiser le mot de passe'}
                  {!loading && <ArrowRight size={20} />}
                </button>
              </form>

              <div className="mt-12 pt-10 border-t border-[var(--border-light)] flex justify-center">
                <Link className="text-[var(--text-secondary)] text-sm font-bold flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors group" to="/login">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Retour à la connexion
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--bg-surface)] rounded-[3rem] p-12 shadow-2xl shadow-[var(--gray-900)]/5 border border-[var(--border-light)] text-center">
              <div className="w-20 h-20 rounded-3xl bg-[var(--green-600)]/10 text-[var(--green-600)] flex items-center justify-center mx-auto mb-8 animate-in zoom-in">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-display text-[var(--text-primary)] mb-4 tracking-tight">Consultez votre boîte.</h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                Un lien de réinitialisation a été envoyé à votre adresse e-mail.
              </p>
              
              <div className="w-full bg-[var(--bg-muted)] p-5 rounded-2xl flex items-center justify-between gap-4 mb-10 border border-[var(--border-light)]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)]">Nouvel envoi possible</span>
                <span className="font-mono text-[var(--text-primary)] font-black text-xl">{countdown}s</span>
              </div>
              
              <button 
                onClick={handleResend} 
                disabled={countdown > 0} 
                className="text-[var(--text-primary)] disabled:text-[var(--gray-400)] text-sm font-bold hover:underline underline-offset-8 transition-all"
              >
                Renvoyer le lien de récupération
              </button>

              <div className="mt-12 pt-10 border-t border-[var(--border-light)] flex justify-center">
                <Link className="text-[var(--text-secondary)] text-sm font-bold flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors" to="/login">
                  <ArrowLeft size={18} />
                  Retour à la connexion
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="py-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-sm text-[var(--gray-400)] font-bold uppercase tracking-widest">
           <ShieldCheck size={16} className="text-[var(--green-600)]" />
           Sécurité AgroConnect
        </div>
      </div>
      <VisitorFooter />
    </div>
  );
};

export default ForgotPasswordPage;
