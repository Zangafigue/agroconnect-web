import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../api/axios';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore() as any;
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info/Init, 2: OTP & New Password, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRequestOTP = async () => {
    setLoading(true);
    setError('');
    try {
      // Typically /auth/resend-otp works if the account exists and can receive OTP for verification or reset
      await api.post('/auth/resend-otp', { email: user?.email });
      setStep(2);
      toast.success('Code OTP envoyé !', { position: 'top-center' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du code.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Les mots de passe ne correspondent pas.');
    }
    if (password.length < 6) {
      return setError('Le mot de passe doit faire au moins 6 caractères.');
    }
    if (otp.length < 6) {
      return setError('Veuillez entrer le code OTP complet.');
    }

    setLoading(true);
    setError('');
    try {
      await api.post('/auth/reset-password', { otp, newPassword: password });
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation (OTP invalide).');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    logout();
    window.location.href = '/login';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--bg-surface)] w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {step !== 3 && (
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {step === 1 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-[var(--bg-muted)] text-[var(--text-primary)] rounded-full flex items-center justify-center mx-auto border border-[var(--border-light)]">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">Modifier mon mot de passe</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Pour des raisons de sécurité, un code de vérification vous sera envoyé par email à <strong>{user?.email}</strong>.
              </p>
            </div>
            
            {error && <p className="text-sm text-red-600 font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

            <Button 
              variant="primary" 
              className="w-full justify-center" 
              onClick={handleRequestOTP}
              disabled={loading}
              icon={loading ? <RefreshCw className="animate-spin" size={18} /> : undefined}
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le code OTP'}
            </Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">Entrez le code</h3>
              <p className="text-sm text-[var(--text-secondary)]">Vérifiez votre boîte mail ({user?.email}) et définissez votre nouveau mot de passe.</p>
            </div>

            {error && <p className="text-sm text-red-600 font-bold bg-red-50 p-3 rounded-lg text-center flex items-center justify-center gap-2"><AlertCircle size={16}/> {error}</p>}

            <Input 
              label="Code OTP (6 chiffres)" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Ex: 123456"
              maxLength={6}
              required
            />
            
            <div className="space-y-2 relative">
               <Input 
                 label="Nouveau mot de passe" 
                 type={showPassword ? "text" : "password"}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
               </button>
            </div>

            <div className="space-y-2 relative">
               <Input 
                 label="Confirmer le mot de passe" 
                 type={showPassword ? "text" : "password"}
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
               />
            </div>

            <Button 
              type="submit"
              variant="primary" 
              className="w-full justify-center" 
              disabled={loading || otp.length < 6 || password.length < 6}
              icon={loading ? <RefreshCw className="animate-spin" size={18} /> : <Lock size={18} />}
            >
              {loading ? 'Validation...' : 'Valider et réinitialiser'}
            </Button>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-4 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">Mot de passe modifié !</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Votre mot de passe a été mis à jour avec succès. Par mesure de sécurité, vous allez être déconnecté afin de vous reconnecter avec vos nouveaux identifiants.
              </p>
            </div>
            
            <Button variant="primary" className="w-full justify-center" onClick={handleFinish}>
              Se reconnecter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
