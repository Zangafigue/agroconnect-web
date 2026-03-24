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
  Zap
} from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import Input from '../../components/shared/Input';

const BuyerProfilePage: React.FC = () => {
  const { user } = useAuthStore() as any;
  
  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Profile Header Card */}
      <Card className="p-8 border-none shadow-sm ring-1 ring-[var(--border-light)] bg-[var(--bg-surface)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--text-accent)]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="relative group">
              <Avatar name={user?.name || 'Fatima Traoré'} role="BUYER" size="xl" />
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--text-accent)] text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all ring-4 ring-white">
                <Edit3 size={18} />
              </button>
           </div>
           
           <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-amber-100">
                <Award size={14} /> Acheteur Premium
              </div>
              <h1 className="text-4xl font-display text-[var(--text-primary)] tracking-tight">{user?.name || 'Fatima Traoré'}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--text-secondary)] text-[14px]">
                <MapPin size={16} className="text-[var(--text-accent)]" />
                <span>Ouagadougou, Burkina Faso</span>
              </div>
              
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                 <div className="bg-[var(--bg-muted)]/50 px-4 py-3 rounded-xl border border-[var(--border-light)]">
                   <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Commandes</p>
                   <p className="text-2xl font-mono font-bold text-[var(--text-primary)]">24</p>
                 </div>
                 <div className="bg-[var(--bg-muted)]/50 px-4 py-3 rounded-xl border border-[var(--border-light)]">
                   <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Favoris</p>
                   <p className="text-2xl font-mono font-bold text-[var(--text-primary)]">12</p>
                 </div>
              </div>
           </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 space-y-8">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                <User size={20} className="text-[var(--text-accent)]" />
                Détails du compte
              </h2>
              <Button variant="ghost" size="sm">Modifier</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input label="Nom complet" defaultValue={user?.name || 'Fatima Traoré'} icon={<User size={16} />} />
               <Input label="Email" defaultValue={user?.email || 'fatima.t@example.com'} icon={<Mail size={16} />} />
               <Input label="Téléphone" defaultValue="+226 70 12 34 56" icon={<Phone size={16} />} />
               <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-[var(--text-secondary)]">Type d'acheteur</label>
                  <div className="h-[42px] px-4 bg-[var(--bg-muted)] rounded-[var(--radius-md)] flex items-center justify-between text-[14px] font-medium text-[var(--text-primary)]">
                     <span>Grossiste Certifié</span>
                     <Zap size={16} className="text-amber-500" />
                  </div>
               </div>
            </div>
          </Card>

          <Card className="p-8 space-y-6">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                 <MapPin size={20} className="text-[var(--text-accent)]" />
                 Adresses de Livraison
              </h2>
              <Button variant="secondary" size="sm" icon={<Plus size={14} />}>Ajouter</Button>
            </div>
            
            <div className="p-6 rounded-2xl border-2 border-[var(--text-accent)] bg-[var(--text-accent)]/5 flex justify-between items-center group">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[var(--text-accent)] shadow-sm">
                     <Home size={24} />
                  </div>
                  <div>
                     <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[var(--text-primary)] text-[15px]">Dépôt Principal</h3>
                        <span className="bg-[var(--text-accent)] text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Défaut</span>
                     </div>
                     <p className="text-[13px] text-[var(--text-secondary)]">Secteur 15, Ouagadougou</p>
                  </div>
               </div>
               <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-colors">
                  <Edit3 size={18} />
               </button>
            </div>
          </Card>
        </div>

        {/* Right Column: Security & Preferences */}
        <div className="space-y-8">
           <Card className="p-8 bg-red-50/30 border-dashed border-red-200">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-3 mb-6">
                <Lock size={20} className="text-red-500" />
                Sécurité
              </h2>
              <Button variant="ghost" size="md" className="w-full justify-between bg-white shadow-sm hover:shadow-md ring-1 ring-red-100" icon={<ChevronRight size={16} />} iconPosition="right">
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-red-500" />
                    <div className="text-left">
                       <p className="text-[13px] font-bold">Mot de passe</p>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Dernier changement: 2 mois</p>
                    </div>
                 </div>
              </Button>
           </Card>

           <Card className="p-8 space-y-8">
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
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{pref.sub}</p>
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
    </div>
  );
};

export default BuyerProfilePage;
