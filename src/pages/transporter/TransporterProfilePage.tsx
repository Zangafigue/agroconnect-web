import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { 
  User, 
  Truck, 
  Star, 
  Wallet, 
  ShieldCheck, 
  Navigation, 
  ChevronRight, 
  Camera, 
  Award,
  Settings2,
  ShoppingCart,
  Save,
  LogOut,
  Zap
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import toast from 'react-hot-toast';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Avatar from '../../components/shared/Avatar';

const TransporterProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuthStore() as any;
  const [loading, setLoading] = useState(false);
  const [canBuy, setCanBuy] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Koné Dramane',
    phone: user?.phone || '+226 70 00 00 00',
    email: user?.email || 'd.kone@email.bf',
    vehicle: user?.vehicle || 'Camionnette 2T',
    zone: user?.zone || 'Rayon de 200km autour de Ouagadougou'
  });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (updateProfile) {
         await updateProfile(formData);
      }
      toast.success('Profil mis à jour !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const { uploadPicture } = useAuthStore.getState() as any;
      if (uploadPicture) {
         await uploadPicture(file);
      }
      toast.success('Photo mise à jour !');
    } catch (error) {
      toast.error('Erreur lors de l\'upload de la photo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-body max-w-7xl mx-auto">
      <header className="mb-4">
         <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Mon Profil</h1>
         <p className="text-[14px] text-[var(--text-secondary)]">Gérez vos informations personnelles et vos paramètres de transporteur.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN (Profile Card & Wallet Summary) */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="flex flex-col items-center text-center p-8">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-[var(--bg-muted)] flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" />
                ) : (
                  <span className="text-3xl font-display font-bold text-[var(--text-primary)]">
                     {formData.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <input 
                type="file" 
                id="transporter-avatar" 
                className="hidden" 
                accept="image/*" 
                onChange={handlePictureUpload} 
              />
              <button 
                onClick={() => document.getElementById('transporter-avatar')?.click()}
                className="absolute bottom-0 right-0 p-2 bg-[var(--text-accent)] text-white rounded-full shadow-md hover:scale-105 transition-transform border-2 border-white"
              >
                 <Camera size={14} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              {formData.name}
            </h2>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--text-accent)]/10 text-[var(--text-accent)] rounded-lg text-[10px] font-bold uppercase tracking-widest mb-6">
              <Truck size={12} />
              Transporteur Partenaire
            </div>
            
            <div className="w-full pt-6 border-t border-[var(--border-light)] flex justify-center gap-8">
               <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                     <Star size={16} className="text-[var(--text-accent)] fill-[var(--text-accent)]" />
                     <span className="text-xl font-bold text-[var(--text-primary)]">4.8</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Note globale</p>
               </div>
               <div className="text-center border-l border-[var(--border-light)] pl-8">
                  <div className="flex items-center justify-center gap-1 mb-1">
                     <Award size={16} className="text-[var(--text-accent)]" />
                     <span className="text-xl font-bold text-[var(--text-primary)]">12</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Avis vérifiés</p>
               </div>
            </div>
            
            <div className="w-full mt-8 space-y-3">
              <Button variant="secondary" size="md" className="w-full justify-center text-[11px]" icon={<Award size={14} />}>
                Gérer mes badges
              </Button>
              <Button variant="ghost" size="md" className="w-full justify-center text-red-600 hover:bg-red-50 hover:text-red-700 text-[11px]" icon={<LogOut size={14} />}>
                 Déconnexion
              </Button>
            </div>
          </Card>

          <Card className="p-8 border-t-4 border-[var(--text-accent)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[14px] uppercase tracking-widest text-[var(--text-primary)]">Portefeuille</h3>
              <Wallet size={20} className="text-[var(--text-secondary)]" />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Fonds disponibles</p>
                <p className="text-3xl font-mono font-bold text-[var(--text-accent)]">{formatFCFA(145000)}</p>
              </div>
              <div className="bg-[var(--bg-muted)]/50 rounded-xl p-4 border border-[var(--border-light)]">
                <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                   <ShieldCheck size={12} className="text-orange-500" /> Sous séquestre
                </p>
                <p className="text-xl font-mono font-bold text-[var(--text-primary)]">{formatFCFA(28500)}</p>
              </div>
              <Button variant="secondary" size="sm" className="w-full justify-center" onClick={() => window.location.href='/transporter/wallet'} icon={<ChevronRight size={14} />} iconPosition="right">
                Détails financiers
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN (Forms) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Identité */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[var(--bg-muted)] rounded-lg text-[var(--text-secondary)]">
                <User size={20} />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Identité & Coordonnées</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input 
                  label="Prénom et Nom" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
               />
               <div>
                  <label className="block text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                     Adresse Email
                     <span className="ml-2 inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight">
                        <ShieldCheck size={10} /> Vérifié
                     </span>
                  </label>
                  <input 
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] focus:border-[var(--text-accent)] rounded-lg px-4 py-2.5 text-[14px] text-[var(--text-primary)] focus:outline-none transition-colors"
                  />
               </div>
               <Input 
                  label="Téléphone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
               />
               <Input 
                  label="Véhicule Principal" 
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
               />
               <div className="md:col-span-2">
                  <Input 
                     label="Zone d'intervention habituelle" 
                     name="zone"
                     value={formData.zone}
                     onChange={handleChange}
                  />
               </div>
            </div>
          </Card>

          {/* Configuration */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[var(--bg-muted)] rounded-lg text-[var(--text-secondary)]">
                <Settings2 size={20} />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Configuration</h3>
            </div>
            
            <div 
               className={`p-6 rounded-xl border transition-colors cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${canBuy ? 'bg-[var(--text-accent)]/5 border-[var(--text-accent)]' : 'bg-[var(--bg-muted)]/50 border-[var(--border-light)] hover:border-[var(--text-secondary)]'}`}
               onClick={() => setCanBuy(!canBuy)}
            >
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <ShoppingCart size={18} className={canBuy ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'} />
                  <h4 className="font-bold text-[14px] text-[var(--text-primary)]">Activer le profil Acheteur</h4>
                </div>
                <p className="text-[12px] text-[var(--text-secondary)] max-w-sm">
                   Activez cette option pour accéder au catalogue et passer des commandes de marchandises.
                </p>
              </div>
              
              {/* Toggle Switch */}
              <button 
                type="button"
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${canBuy ? 'bg-[var(--text-accent)]' : 'bg-[var(--border-light)]'}`}
                role="switch"
                aria-checked={canBuy}
                onClick={(e) => { e.stopPropagation(); setCanBuy(!canBuy); }}
              >
                <span className="sr-only">Activer config acheteur</span>
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${canBuy ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="md">Annuler</Button>
            <Button 
               variant="primary" 
               size="md" 
               onClick={handleUpdate}
               disabled={loading}
               icon={loading ? <Zap size={16} className="animate-spin" /> : <Save size={16} />}
            >
               {loading ? 'Mise à jour...' : 'Enregistrer les modifications'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransporterProfilePage;
