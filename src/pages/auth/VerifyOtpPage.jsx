import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const { user, token, updateUser } = useAuthStore();
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMode, setSuccessMode] = useState(false);

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    }
    if (user?.isVerified) {
      redirectByRole(user.role);
    }
  }, [token, user, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const intervalId = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [resendTimer]);

  const redirectByRole = (role) => {
    switch (role) {
      case 'FARMER': navigate('/farmer/dashboard'); break;
      case 'BUYER': navigate('/buyer/dashboard'); break;
      case 'TRANSPORTER': navigate('/transporter/dashboard'); break;
      case 'ADMIN': navigate('/admin'); break;
      default: navigate('/'); break;
    }
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    const otp = code.join('');
    
    if (otp.length !== 6) {
      setError('Code incomplet.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-otp', { otp });
      updateUser({ isVerified: true });
      setSuccessMode(true);
      setTimeout(() => redirectByRole(user.role), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Code incorrect ou expiré.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setError('');
    try {
       await api.post('/auth/resend-otp');
       setCanResend(false);
       setResendTimer(30);
       setTimeLeft(600);
    } catch(err) {
       setError(err.response?.data?.message || 'Erreur lors du renvoi du code.');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] font-body text-on-surface flex flex-col items-center justify-center p-6 selection:bg-primary/20">
      <header className="w-full max-w-[480px] mb-8 flex items-center justify-between">
        <Link to="/login" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium text-sm">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Retour
        </Link>
        <Link to="/" className="font-headline text-2xl text-primary font-black tracking-tight" style={{fontFamily: "'DM Serif Display', serif"}}>AgroConnect BF</Link>
        <div className="w-12"></div>
      </header>

      {!successMode ? (
        <main className="w-full max-w-[480px] bg-white rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] p-8 flex flex-col items-center text-center">
          <div className="w-[72px] h-[72px] bg-[#f0fdf4] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[32px] text-primary">mail</span>
          </div>
          
          <h2 className="text-on-surface font-semibold text-2xl mb-3 tracking-tight">Vérifiez votre email</h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            Nous avons envoyé un code à 6 chiffres à <br/>
            <span className="text-primary font-bold">{user?.email}</span>
          </p>

          <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
            <div className="flex gap-2 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`w-[52px] h-[60px] border-2 rounded-[10px] text-center font-mono text-xl font-semibold text-on-surface focus:ring-0 transition-all outline-none ${error ? 'border-error bg-error-container text-on-error-container focus:border-error' : 'border-outline-variant focus:border-primary'}`}
                  maxLength="1"
                  placeholder="-"
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            <div className="w-full flex flex-col gap-3 mb-8 items-center">
              {error && (
                <div className="flex items-center gap-2 text-error text-sm font-medium">
                  <span className="material-symbols-outlined text-base">error</span>
                  {error}
                </div>
              )}
              <div className="flex items-center gap-2 text-outline text-sm">
                <span className="material-symbols-outlined text-base">schedule</span>
                Expire dans {formatTime(timeLeft)}
              </div>
            </div>

            <button disabled={loading || timeLeft <= 0 || code.join('').length !== 6} type="submit" className="w-full py-4 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-primary-container disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] mb-6">
              {loading ? "Vérification..." : "Vérifier mon code"}
            </button>
          </form>

          <p className="text-on-surface-variant text-sm flex items-center gap-1">
            Vous n'avez pas reçu le code? 
            {canResend ? (
              <button type="button" onClick={handleResendCode} className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1 flex items-center gap-1">
                Renvoyer un code
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <span className="text-outline font-medium ml-1">Attendez {resendTimer}s</span>
            )}
          </p>
        </main>
      ) : (
        <main className="w-full max-w-[480px] bg-white rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          </div>
          <h3 className="text-on-surface font-semibold text-xl mb-4">Email vérifié!</h3>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-outline mt-4">Redirection vers votre espace...</p>
        </main>
      )}

      <footer className="mt-8 text-outline text-xs text-center max-w-[480px]">
        © 2024 AgroConnect BF. Pour votre sécurité, ne partagez jamais votre code de vérification avec des tiers.
      </footer>
    </div>
  );
}
