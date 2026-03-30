import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Mail, ArrowLeft, ArrowRight, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import VisitorFooter from '../../components/shared/VisitorFooter';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      navigate('/reset-password', { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la demande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-body flex flex-col">
      <header className="flex flex-col items-center justify-center w-full py-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[var(--text-accent)] text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
             <Lock size={24} />
          </div>
          <span className="text-[var(--text-primary)] font-display text-3xl tracking-tight">AgroConnect BF</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-[480px]">
          <div className="bg-[var(--bg-surface)] rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-[var(--text-primary)]/5 border border-[var(--border-light)]">
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
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] transition-colors" size={20} />
                    <input 
                      className="w-full pl-14 pr-4 py-5 bg-[var(--bg-muted)] border border-transparent rounded-[1.5rem] focus:ring-2 focus:ring-[var(--text-accent)] focus:bg-[var(--bg-surface)] transition-all text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none font-medium" 
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
        </div>
      </main>

      <div className="py-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-bold uppercase tracking-widest">
           <ShieldCheck size={16} className="text-[var(--text-accent)]" />
           Sécurité AgroConnect
        </div>
      </div>
      <VisitorFooter />
    </div>
  );
};

export default ForgotPasswordPage;
