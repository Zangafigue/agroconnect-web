import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Weight, 
  ArrowRight, 
  Flag, 
  HelpCircle, 
  Tag, 
  X,
  Send,
  Zap,
  Star,
  Navigation,
  ShieldCheck,
  Info,
  Filter
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Avatar from '../../components/shared/Avatar';

const MissionsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Toutes les missions', icon: Zap },
    { id: 'short', label: '< 100 km', icon: MapPin },
    { id: 'medium', label: '100-300 km', icon: Navigation },
    { id: 'cereals', label: 'Céréales', icon: Tag },
    { id: 'fresh', label: 'Frais', icon: Star }
  ];

  return (
    <div className="space-y-8 pb-12 font-body max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight">Missions</h1>
          <div className="px-3 py-1 bg-[var(--text-accent)] text-white text-[12px] font-bold rounded-lg relative">
             2 Nouvelles
             <span className="absolute -top-1 -right-1 flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[var(--text-accent)]"></span>
             </span>
          </div>
        </div>
        <Button variant="secondary" size="md" icon={<Filter size={16} />}>Filtres avancés</Button>
      </header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar">
         {filters.map((f) => (
            <button
               key={f.id}
               onClick={() => setActiveFilter(f.id)}
               className={`flex-shrink-0 px-4 py-2 rounded-lg font-bold text-[12px] uppercase tracking-wider flex items-center gap-2 transition-all ${activeFilter === f.id ? 'bg-[var(--text-accent)] text-white shadow-md' : 'bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'}`}
            >
               <f.icon size={14} /> {f.label}
            </button>
         ))}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Urgent Mission Card */}
        <Card className="p-0 overflow-hidden group border-2 border-red-200">
           <div className="bg-red-50 p-6 border-b border-red-100 flex justify-between items-start">
              <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest rounded animate-pulse">Urgent</span>
                    <span className="text-[10px] font-mono text-red-800/60 uppercase">Réf: #LOG-9930</span>
                 </div>
                 <h3 className="text-2xl font-bold text-red-950">Convoi Tomates <br/>Koudougou Express</h3>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-bold text-red-800/60 uppercase tracking-widest mb-1">Budget Max</p>
                 <p className="text-2xl font-mono font-bold text-red-600">{formatFCFA(125000)}</p>
              </div>
           </div>
           
           <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                 <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                       <MapPin size={18} className="text-red-500" />
                       <div>
                          <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Départ immédiat</p>
                          <p className="text-[14px] font-bold text-[var(--text-primary)]">Ferme pilote, Koudougou</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <Flag size={18} className="text-red-500" />
                       <div>
                          <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Livraison attendue</p>
                          <p className="text-[14px] font-bold text-[var(--text-primary)]">Marché Rood Woko, Ouagadougou</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 shrink-0 auto-rows-max">
                    <div className="p-3 bg-[var(--bg-muted)] rounded-lg text-center">
                       <Weight size={14} className="mx-auto mb-1 text-[var(--text-secondary)]" />
                       <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Poids</p>
                       <p className="text-[13px] font-mono font-bold">1.2 T</p>
                    </div>
                    <div className="p-3 bg-[var(--bg-muted)] rounded-lg text-center">
                       <Navigation size={14} className="mx-auto mb-1 text-[var(--text-secondary)]" />
                       <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Dist.</p>
                       <p className="text-[13px] font-mono font-bold">100 km</p>
                    </div>
                    <div className="p-3 bg-[var(--bg-muted)] rounded-lg text-center col-span-2">
                       <Truck size={14} className="mx-auto mb-1 text-red-500" />
                       <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Véhicule requis</p>
                       <p className="text-[12px] font-bold text-red-700">Fourgon Frigo</p>
                    </div>
                 </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-light)] flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Avatar name="AgroGroup" role="BUYER" size="md" />
                    <div>
                       <div className="flex items-center gap-1 text-[var(--text-accent)] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                          <ShieldCheck size={12} /> Client Vérifié
                       </div>
                       <p className="text-[13px] font-bold text-[var(--text-primary)]">AgroGroup Burkina</p>
                    </div>
                 </div>
                 <Button variant="primary" size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => setShowModal(true)} icon={<ArrowRight size={16} />} iconPosition="right">
                    Postuler
                 </Button>
              </div>
           </div>
        </Card>

        {/* Standard Mission Card */}
        <Card className="p-0 overflow-hidden group">
           <div className="p-6 border-b border-[var(--border-light)] flex justify-between items-start">
              <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[var(--bg-muted)] text-[var(--text-secondary)] text-[9px] font-bold uppercase tracking-widest rounded">Standard</span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Réf: #LOG-9928</span>
                 </div>
                 <h3 className="text-2xl font-bold text-[var(--text-primary)]">Transport Maïs blanc</h3>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Budget estimé</p>
                 <p className="text-2xl font-mono font-bold text-[var(--text-accent)]">{formatFCFA(45000)}</p>
              </div>
           </div>
           
           <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                 <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                       <MapPin size={18} className="text-[var(--text-accent)]" />
                       <div>
                          <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Demain, 08:00</p>
                          <p className="text-[14px] font-bold text-[var(--text-primary)]">Zone Industrielle, Bobo</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <Flag size={18} className="text-[var(--text-accent)]" />
                       <div>
                          <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Demain, 14:00</p>
                          <p className="text-[14px] font-bold text-[var(--text-primary)]">Grand Marché, Ouaga</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 shrink-0 auto-rows-max">
                    <div className="p-3 bg-[var(--bg-muted)] rounded-lg text-center">
                       <Weight size={14} className="mx-auto mb-1 text-[var(--text-secondary)]" />
                       <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Poids</p>
                       <p className="text-[13px] font-mono font-bold">500 kg</p>
                    </div>
                    <div className="p-3 bg-[var(--bg-muted)] rounded-lg text-center">
                       <Navigation size={14} className="mx-auto mb-1 text-[var(--text-secondary)]" />
                       <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Dist.</p>
                       <p className="text-[13px] font-mono font-bold">360 km</p>
                    </div>
                 </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-light)] flex gap-3">
                 <Button variant="secondary" size="md" className="flex-1 justify-center" icon={<HelpCircle size={16} />}>
                    Question
                 </Button>
                 <Button variant="primary" size="md" className="flex-1 justify-center" onClick={() => setShowModal(true)} icon={<Tag size={16} />}>
                    Faire une offre
                 </Button>
              </div>
           </div>
        </Card>

      </div>

      {/* Offer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-surface)]/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg p-0 overflow-hidden shadow-2xl scale-in">
             <div className="p-6 border-b border-[var(--border-light)] flex justify-between items-center">
                <h2 className="text-2xl font-display text-[var(--text-primary)]">Soumettre une offre</h2>
                <button onClick={() => setShowModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2 bg-[var(--bg-muted)] rounded-lg">
                   <X size={20} />
                </button>
             </div>
             
             <div className="p-6 space-y-6">
                <div className="p-4 bg-[var(--text-accent)]/5 rounded-xl border border-[var(--text-accent)]/10 flex flex-col gap-4">
                   <div className="flex justify-between items-start">
                      <div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1 block">Trajet</span>
                         <div className="flex items-center gap-2 font-bold text-[var(--text-primary)]">
                            Bobo <ArrowRight size={14} className="text-[var(--text-accent)]" /> Ouaga
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1 block">Distance</span>
                         <span className="font-mono font-bold text-[var(--text-primary)]">360 km</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <Input 
                      label="Votre tarif (FCFA)" 
                      type="number" 
                      placeholder="Ex: 15000" 
                      className="font-mono text-xl py-3"
                   />
                   <div className="flex items-start gap-2 text-[11px] font-medium text-[var(--text-secondary)] p-3 bg-[var(--bg-muted)] rounded-lg">
                      <Info size={14} className="shrink-0 mt-0.5" />
                      Moyenne constatée sur ce trajet: 14 000 FCFA. Une offre compétitive augmente vos chances.
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Commentaire (optionnel)</label>
                   <textarea 
                      className="w-full bg-[var(--bg-muted)] border border-[var(--border-light)] focus:border-[var(--text-accent)] rounded-xl px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Précisez votre véhicule ou disponibilité..."
                   ></textarea>
                </div>
             </div>

             <div className="p-6 border-t border-[var(--border-light)] bg-[var(--bg-muted)]/50 flex justify-end gap-3">
                <Button variant="ghost" size="md" onClick={() => setShowModal(false)}>Annuler</Button>
                <Button variant="primary" size="md" icon={<Send size={16} />} onClick={() => setShowModal(false)}>Envoyer l'offre</Button>
             </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;
