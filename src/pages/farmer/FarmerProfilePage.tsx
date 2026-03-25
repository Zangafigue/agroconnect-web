import React, { useState } from 'react';
import { 
  Camera, 
  ShieldCheck, 
  Award, 
  Lock, 
  Star, 
  TrendingUp,
  Save,
  Zap,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Avatar from '../../components/shared/Avatar';
import ChangePasswordModal from '../../components/shared/ChangePasswordModal';

const FarmerProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuthStore() as any;
  const [loading, setLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    farmSize: user?.farmSize || '5 - 10 Ha'
  });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profil mis à jour avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  const handlePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const { uploadPicture } = useAuthStore.getState() as any;
      await uploadPicture(file);
      toast.success('Photo mise à jour !');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la photo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-display text-[var(--text-primary)] tracking-tight mb-2">Mon Entreprise Agricole</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Gérez votre identité numérique et vos certifications officielles.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-[var(--text-accent)]/10 text-[var(--text-accent)] rounded-2xl border border-[var(--text-accent)]/20">
           <ShieldCheck size={18} />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Producteur Certifié</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-0 overflow-hidden group border-[var(--border-light)]">
            <div className="h-32 bg-[var(--bg-muted)] relative overflow-hidden">
               <div className="absolute inset-0 bg-[var(--text-accent)]/5 group-hover:bg-[var(--text-accent)]/10 transition-colors duration-500"></div>
               <div className="absolute -bottom-16 left-8">
                  <div className="relative group/avatar">
                    <Avatar 
                      name={formData.firstName || formData.name} 
                      role="FARMER" 
                      size="xl"
                      image={user?.avatar}
                      className="w-32 h-32 border-4 border-[var(--bg-surface)] shadow-2xl transition-transform group-hover/avatar:scale-105 duration-500"
                    />
                    <input 
                      type="file" 
                      id="avatar-upload" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handlePictureUpload} 
                    />
                    <button 
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                      className="absolute bottom-1 right-1 w-10 h-10 bg-[var(--text-accent)] text-white rounded-2xl flex items-center justify-center shadow-lg hover:brightness-110 transition-all hover:scale-110"
                    >
                      <Camera size={18} />
                    </button>
                  </div>
               </div>
            </div>
            
            <div className="pt-20 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-1">
                  <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5 font-medium">
                    <MapPin size={14} className="text-[var(--text-accent)]" /> {formData.location || 'Localisation non définie'}
                  </p>
               </div>
               <div className="flex gap-4">
                  <div className="text-center px-5 py-3 bg-[var(--bg-muted)] rounded-2xl border border-[var(--border-light)]">
                     <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1 opacity-60">Indice</p>
                     <div className="flex items-center gap-1.5 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="font-mono font-bold text-lg">4.9</span>
                     </div>
                  </div>
                  <div className="text-center px-5 py-3 bg-[var(--bg-muted)] rounded-2xl border border-[var(--border-light)]">
                     <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1 opacity-60">Volume</p>
                     <span className="font-mono font-bold text-lg text-[var(--text-primary)]">124</span>
                  </div>
               </div>
            </div>

            <div className="p-8 pt-4 border-t border-[var(--border-light)] grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="Ex: Moussa"
              />
              <Input 
                label="Nom"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                placeholder="Ex: Diallo"
              />
              <Input 
                label="Email (Sécurisé)"
                value={formData.email}
                disabled
                icon={<Mail size={16} />}
              />
              <Input 
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                icon={<Phone size={16} />}
                placeholder="+226 XX XX XX XX"
              />
              <Input 
                label="Localisation Principale"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Région, Ville, Secteur"
                className="md:col-span-2"
              />
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-1">Biographie Professionnelle</label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-2xl px-5 py-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--text-accent)] transition-all resize-none font-medium placeholder:text-[var(--text-secondary)]/30"
                  placeholder="Décrivez votre expertise, vos cultures principales, votre engagement bio..."
                />
              </div>
              <div className="md:col-span-2 flex justify-end pt-4">
                <Button 
                  variant="primary" 
                  size="md" 
                  icon={loading ? <Zap size={18} className="animate-spin" /> : <Save size={18} />}
                  onClick={handleUpdate}
                  disabled={loading}
                  className="font-bold tracking-tight shadow-xl shadow-[var(--text-accent)]/20"
                >
                  Mettre à jour mon profil
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          <Card className="p-8 border-none bg-[var(--text-primary)] text-[var(--bg-surface)] transition-colors duration-500">
            <div className="flex items-center gap-3 mb-8">
              <Lock size={20} className="text-[var(--text-accent)]" />
              <h3 className="text-lg font-display font-bold">Sécurité</h3>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 dark:border-white/5 rounded-2xl">
                <p className="text-[10px] text-white/40 uppercase font-black mb-2 tracking-widest">Compte</p>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-[var(--green-500)] font-bold">2FA Activée</span>
                   <Button variant="ghost" size="sm" className="text-white/60 p-0 h-auto hover:text-white font-bold">Gérer</Button>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="md" 
                className="w-full bg-white/5 text-white border-white/10 hover:bg-white/10 font-bold"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Changer le mot de passe
              </Button>
            </div>
          </Card>

          <Card className="p-8 border-[var(--border-light)]">
            <div className="flex items-center gap-3 mb-8">
              <Award size={20} className="text-[var(--text-accent)]" />
              <h3 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Expertise</h3>
            </div>
            <div className="space-y-8">
               <div className="space-y-4">
                  <p className="text-[11px] font-medium text-[var(--text-secondary)]">Surface d'Exploitation</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['< 5 Ha', '5 - 10 Ha', '10 - 50 Ha', '> 50 Ha'].map((size) => (
                      <button 
                        key={size}
                        onClick={() => setFormData({...formData, farmSize: size})}
                        className={`px-3 py-2 rounded-xl border text-[10px] font-black transition-all ${formData.farmSize === size ? 'border-[var(--text-accent)] bg-[var(--text-accent)]/10 text-[var(--text-accent)]' : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--text-accent)]/30'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
               </div>
               <div className="space-y-4">
                  <p className="text-[11px] font-medium text-[var(--text-secondary)]">Labels Active</p>
                  <div className="flex flex-wrap gap-2">
                     {['Céréales', 'Maraîchage', 'Bio-Sourcing'].map(tag => (
                       <span key={tag} className="px-3 py-1.5 bg-[var(--bg-muted)] rounded-lg text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest border border-[var(--border-light)]">
                         {tag}
                       </span>
                     ))}
                  </div>
               </div>
            </div>
          </Card>

          <Card className="p-8 border-dashed border-2 bg-[var(--text-accent)]/5 border-[var(--text-accent)]/20 relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-6 text-center">Fiabilité Temps Réel</p>
               <div className="flex flex-col items-center gap-2 mb-8">
                 <div className="text-5xl font-mono font-bold text-[var(--text-primary)]">98%</div>
                 <div className="flex items-center gap-1 text-[var(--text-accent)]">
                    <TrendingUp size={14} />
                    <span className="text-[10px] font-bold">+2.4% ce mois</span>
                 </div>
               </div>
               <div className="space-y-4">
                  {[
                    { label: 'Réactivité', val: '98%', color: 'bg-[var(--text-accent)]' },
                    { label: 'Complétion', val: '100%', color: 'bg-[var(--text-accent)]' }
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60 text-[var(--text-primary)]">
                          <span>{metric.label}</span>
                          <span>{metric.val}</span>
                       </div>
                       <div className="w-full bg-[var(--bg-muted)] overflow-hidden rounded-full h-1">
                          <div className={`${metric.color} h-full rounded-full transition-all duration-1000`} style={{ width: metric.val }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <Zap size={80} className="absolute -bottom-6 -right-6 text-[var(--text-accent)]/5 rotate-12" />
          </Card>
        </div>
      </div>
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </div>
  );
};

export default FarmerProfilePage;
