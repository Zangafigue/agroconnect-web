import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { 
  User, 
  MapPin, 
  Award, 
  Edit3, 
  Plus, 
  Home, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  Bell,
  Phone,
  Mail,
  Zap,
  Camera
} from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import Input from '../../components/shared/Input';
import ChangePasswordModal from '../../components/shared/ChangePasswordModal';
import { useBuyerStore } from '../../store/buyerStore';
import toast from 'react-hot-toast';

const BuyerProfilePage: React.FC = () => {
  const { user, uploadPicture } = useAuthStore() as any;
  const { stats, fetchDashboardData } = useBuyerStore() as any;
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  
  const handlePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const toastId = toast.loading('Téléchargement de la photo...');
    try {
      await uploadPicture(file);
      toast.success('Photo mise à jour', { id: toastId });
    } catch (error) {
      toast.error('Erreur lors de l\'upload de la photo.', { id: toastId });
    }
  };
  
  return (
    <div className="space-y-8 pb-12 font-body animate-in fade-in duration-700">
      {/* Profile Header Card */}
      <Card className="p-8 border-[var(--border-light)] shadow-sm bg-[var(--bg-surface)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--text-accent)]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="relative group">
              <Avatar name={user?.firstName || 'Partenaire'} role="BUYER" size="xl" image={user?.avatar} className="border-4 border-[var(--bg-surface)] shadow-xl" />
              <input 
                type="file" 
                id="buyer-avatar" 
                className="hidden" 
                accept="image/*" 
                onChange={handlePictureUpload} 
              />
              <button 
                onClick={() => document.getElementById('buyer-avatar')?.click()}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--text-accent)] text-white rounded-xl flex items-center justify-center shadow-lg hover:brightness-110 active:scale-95 transition-all ring-4 ring-[var(--bg-surface)]"
              >
                <Camera size={18} />
              </button>
           </div>
           
           <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-amber-500/20">
                <Award size={14} /> Acheteur {user?.isPremium ? 'Premium' : 'Standard'}
              </div>
              <h1 className="text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Partenaire AgroConnect'}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--text-secondary)] text-[14px] font-medium">
                <MapPin size={16} className="text-[var(--text-accent)]" />
                <span>{user?.address?.city ? `${user.address.city}, ${user.address.country || 'Burkina Faso'}` : 'Veuillez renseigner votre adresse'}</span>
              </div>
              
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                 <div className="bg-[var(--bg-muted)] px-4 py-3 rounded-xl border border-[var(--border-light)]">
                   <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">Commandes</p>
                   <p className="text-2xl font-mono font-bold text-[var(--text-primary)]">{stats?.activeOrdersCount || 0}</p>
                 </div>
                 <div className="bg-[var(--bg-muted)] px-4 py-3 rounded-xl border border-[var(--border-light)]">
                   <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">Favoris</p>
                   <p className="text-2xl font-mono font-bold text-[var(--text-primary)]">{stats?.favoritesCount || 0}</p>
                 </div>
              </div>
           </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 space-y-8 border-[var(--border-light)]">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                <User size={20} className="text-[var(--text-accent)]" />
                Détails du compte
              </h2>
              <Button variant="ghost" size="sm" className="font-bold">Modifier</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input label="Nom complet" defaultValue={user?.firstName ? `${user.firstName} ${user.lastName || ''}` : ''} icon={<User size={16} />} className="bg-[var(--bg-surface)]" />
               <Input label="Email" defaultValue={user?.email || ''} icon={<Mail size={16} />} className="bg-[var(--bg-surface)]" />
               <Input label="Téléphone" defaultValue={user?.phone || ''} icon={<Phone size={16} />} className="bg-[var(--bg-surface)]" />
               <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-[var(--text-secondary)] ml-1 tracking-wide uppercase text-[10px]">Type d'acheteur</label>
                  <div className="h-[46px] px-4 bg-[var(--bg-muted)] rounded-[var(--radius-md)] flex items-center justify-between text-[14px] font-bold text-[var(--text-primary)] border border-[var(--border-light)]">
                     <span>{user?.isPremium ? 'Grossiste Certifié' : 'Acheteur Standard'}</span>
                     <Zap size={16} className="text-amber-500" />
                  </div>
               </div>
            </div>
          </Card>

          <Card className="p-8 space-y-6 border-[var(--border-light)]">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                 <MapPin size={20} className="text-[var(--text-accent)]" />
                 Adresses de Livraison
              </h2>
              <Button variant="secondary" size="sm" icon={<Plus size={14} />}>Ajouter</Button>
            </div>
            
            <div className="p-6 rounded-2xl border-2 border-[var(--text-accent)] bg-[var(--text-accent)]/5 flex justify-between items-center group">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl flex items-center justify-center text-[var(--text-accent)] shadow-sm">
                     <Home size={24} />
                  </div>
                  <div>
                     <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[var(--text-primary)] text-[15px]">Dépôt Principal</h3>
                        <span className="bg-[var(--text-accent)] text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Défaut</span>
                     </div>
                     <p className="text-[13px] text-[var(--text-secondary)] font-medium mt-0.5">{user?.address?.city ? `${user.address.street || ''} ${user.address.city}, ${user.address.country || 'Burkina Faso'}` : 'Veuillez renseigner votre adresse'}</p>
                  </div>
               </div>
               <button className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-accent)] hover:border-[var(--text-accent)]/30 transition-all">
                  <Edit3 size={18} />
               </button>
            </div>
          </Card>
        </div>

        {/* Right Column: Security & Preferences */}
        <div className="space-y-8">
           <Card className="p-8 bg-red-500/5 border-dashed border-red-500/20">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-3 mb-6">
                <Lock size={20} className="text-red-500" />
                Sécurité
              </h2>
              <Button variant="ghost" size="md" className="w-full justify-between bg-[var(--bg-surface)] shadow-sm hover:shadow-md border border-[var(--border-light)] hover:border-red-500/30" icon={<ChevronRight size={16} className="text-[var(--text-secondary)]" />} iconPosition="right" onClick={() => setIsPasswordModalOpen(true)}>
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-red-500" />
                    <div className="text-left">
                       <p className="text-[13px] font-bold text-[var(--text-primary)]">Mot de passe</p>
                       <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Modifier l'accès sécurisé</p>
                    </div>
                 </div>
              </Button>
           </Card>

           <Card className="p-8 space-y-8 border-[var(--border-light)]">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-3">
                <Bell size={20} className="text-[var(--text-accent)]" />
                Notifications
              </h2>
              <div className="space-y-6">
                 {[
                   { label: 'Alertes Email', sub: 'Reçus et promos', active: true },
                   { label: 'Alertes SMS', sub: 'Suivi de livraison', active: true }
                 ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div>
                          <p className="text-[13px] font-bold text-[var(--text-primary)]">{pref.label}</p>
                          <p className="text-[10px] text-[var(--text-secondary)] font-bold mt-0.5 uppercase tracking-widest">{pref.sub}</p>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={pref.active} />
                          <div className="w-9 h-5 bg-[var(--border-light)] rounded-full peer peer-checked:bg-[var(--text-accent)] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                       </label>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </div>
  );
};

export default BuyerProfilePage;
