import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Camera, 
  Lock, 
  LogOut,
  ShieldAlert,
  Save,
  X,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Avatar from '../../components/shared/Avatar';
import LogoutModal from '../../components/shared/LogoutModal';

const AdminProfilePage: React.FC = () => {
  const { user, logout, updateProfile, uploadPicture, updatePassword } = useAuthStore() as any;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profil mis à jour avec succès');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('Les nouveaux mots de passe ne correspondent pas');
    }

    setLoading(true);
    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Mot de passe mis à jour avec succès');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Téléchargement de la photo...');
    try {
      await uploadPicture(file);
      toast.success('Photo de profil mise à jour', { id: toastId });
    } catch (error: any) {
      toast.error('Erreur lors du téléchargement', { id: toastId });
    }
  };

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Profil Administrateur</h1>
          <p className="text-[14px] text-[var(--text-secondary)] max-w-xl">
            Gérez vos informations personnelles et vos paramètres de sécurité.
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(false)}
                icon={<X size={16} />}
              >
                Annuler
              </Button>
              <Button 
                onClick={handleSaveProfile}
                isLoading={loading}
                icon={<Save size={16} />}
              >
                Enregistrer
              </Button>
            </>
          ) : (
            <Button 
              variant="secondary" 
              onClick={() => setIsEditing(true)}
              icon={<User size={16} />}
            >
              Éditer le profil
            </Button>
          )}
          <Button 
            variant="danger" 
            onClick={() => setShowLogoutModal(true)}
            icon={<LogOut size={16} />}
          >
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="text-center p-8">
             <div className="relative inline-block mb-6">
                <Avatar 
                  name={`${user?.firstName} ${user?.lastName}`}
                  role="ADMIN"
                  size="xl"
                  image={user?.profilePicture}
                  className="mx-auto shadow-lg ring-4 ring-[var(--bg-surface)]"
                />
                <label 
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 p-2 bg-[var(--text-accent)] text-white rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform border-2 border-[var(--bg-surface)]"
                >
                  <Camera size={16} />
                  <input 
                    id="photo-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handlePhotoUpload}
                  />
                </label>
             </div>
             
             <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
               {user?.firstName} {user?.lastName}
             </h2>
             <p className="text-[12px] font-medium text-[var(--text-muted)] uppercase tracking-widest mb-4">
               {user?.role || 'ADMINISTRATEUR'}
             </p>
             
             <div className="py-2 px-4 bg-[var(--bg-subtle)] rounded-full inline-flex items-center gap-2 border border-[var(--text-accent)]/10">
                <ShieldCheck size={14} className="text-[var(--text-accent)]" />
                <span className="text-[10px] font-bold text-[var(--text-accent)] uppercase tracking-wider">Accès Système Complet</span>
             </div>
          </Card>

          <Card className="p-6 bg-[var(--bg-subtle)] border-dashed border-2">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
                   <ShieldAlert size={20} />
                </div>
                <div className="space-y-1">
                   <h4 className="text-[13px] font-bold text-[var(--text-primary)]">Note de Sécurité</h4>
                   <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                     Votre compte dispose de privilèges élevés. Toute action critique est enregistrée dans le journal d'audit.
                   </p>
                </div>
             </div>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <User size={20} className="text-[var(--text-accent)]" />
              Informations Personnelles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                readOnly={!isEditing}
                placeholder="Votre prénom"
              />
              <Input 
                label="Nom"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                readOnly={!isEditing}
                placeholder="Votre nom"
              />
              <Input 
                label="Adresse E-mail"
                value={formData.email}
                readOnly
                icon={<Mail size={16} />}
              />
              <Input 
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                readOnly={!isEditing}
                icon={<Phone size={16} />}
                placeholder="Ex: +226 70 00 00 00"
              />
            </div>
          </Card>

          <Card className="p-8 overflow-hidden relative">
            {!isChangingPassword ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[var(--bg-subtle)] rounded-xl text-[var(--text-accent)]">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Mot de Passe</h3>
                    <p className="text-[12px] text-[var(--text-secondary)]">Sécurisez votre compte en mettant régulièrement à jour votre mot de passe.</p>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={() => setIsChangingPassword(true)}
                  icon={<KeyRound size={16} />}
                >
                  Changer
                </Button>
              </div>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-lg font-bold text-[var(--text-primary)]">Changer de Mot de Passe</h3>
                   <button type="button" onClick={() => setIsChangingPassword(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                     <X size={20} />
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input 
                    type="password"
                    label="Ancien mot de passe"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  />
                  <Input 
                    type="password"
                    label="Nouveau mot de passe"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                  <Input 
                    type="password"
                    label="Confirmer le nouveau"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                   <Button variant="ghost" onClick={() => setIsChangingPassword(false)}>Annuler</Button>
                   <Button type="submit" isLoading={loading} icon={<CheckCircle2 size={16} />}>Confirmer le changement</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => { logout(); navigate('/login'); }}
      />
    </div>
  );
};

export default AdminProfilePage;
