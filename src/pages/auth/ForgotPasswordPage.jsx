import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Assuming this endpoint exists or will exist in your backend
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
      startCountdown();
    } catch (err) {
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
    handleSubmit(new Event('submit'));
  };

  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col items-center">
      <header className="flex flex-col items-center justify-center w-full py-12 mb-8">
        <Link to="/" className="text-4xl font-serif text-primary antialiased tracking-tight" style={{fontFamily: "'DM Serif Display', serif"}}>
          AgroLink
        </Link>
      </header>

      <main className="w-full max-w-[440px] px-6 py-4 flex flex-col gap-8">
        {!success ? (
          <section className="bg-surface-container-lowest rounded-[16px] p-10 border border-outline-variant/10 shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#fef3c7] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl text-[#d97706]">lock_reset</span>
              </div>
              <h2 className="font-serif text-3xl text-on-surface mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>Mot de passe oublié</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                Entrez votre email et nous vous enverrons un lien de réinitialisation.
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-error-container text-on-error-container p-4 rounded-xl flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-outline" htmlFor="email">Email *</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" 
                  id="email" 
                  type="email"
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="agronome@exemple.bf" 
                />
              </div>
              <button disabled={loading || !email} className="w-full py-4 bg-primary disabled:opacity-70 disabled:cursor-not-allowed text-on-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] duration-200" type="submit">
                {loading ? 'Envoi...' : 'Envoyer le lien'}
                {!loading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-center">
              <Link className="text-outline text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors" to="/login">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Retour à la connexion
              </Link>
            </div>
          </section>
        ) : (
          <section className="bg-surface-container-lowest rounded-[16px] p-10 border border-outline-variant/10 shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl text-secondary">mail_outline</span>
              </div>
              <h2 className="font-serif text-3xl text-on-surface mb-3" style={{fontFamily: "'DM Serif Display', serif"}}>Email envoyé !</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                Vérifiez votre boîte mail. Si l'adresse correspond à un compte, vous recevrez un lien sous peu.
              </p>
              
              <div className="w-full bg-surface-container-low p-4 rounded-lg flex items-center justify-center gap-3 mb-8">
                <span className="font-mono text-xs text-secondary font-bold tracking-widest uppercase">Renvoi possible dans</span>
                <span className="font-mono text-primary font-bold">{countdown}s</span>
              </div>
              
              <button onClick={handleResend} disabled={countdown > 0} className="text-primary disabled:text-outline disabled:no-underline disabled:cursor-not-allowed text-sm font-bold underline underline-offset-4 hover:opacity-80 transition-opacity">
                Renvoyer l'email
              </button>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-center">
              <Link className="text-outline text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors" to="/login">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Retour à la connexion
              </Link>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-auto w-full py-6 flex justify-center gap-8 px-4 bg-transparent border-t border-outline-variant/10">
        <span className="font-sans text-xs uppercase tracking-widest text-slate-500">© 2024 L'Agronome Éditorial.</span>
        <div className="flex gap-6">
          <Link className="font-sans text-xs uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors underline-offset-4 hover:underline" to="#">Assistance</Link>
          <Link className="font-sans text-xs uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors underline-offset-4 hover:underline" to="#">Confidentialité</Link>
        </div>
      </footer>
    </div>
  );
}
