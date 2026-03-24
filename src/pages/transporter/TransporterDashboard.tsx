import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Map as MapIcon, 
  Navigation, 
  Wallet, 
  ArrowRight, 
  Clock,
  CheckCircle,
  Calendar,
  AlertCircle
} from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import StatusBadge from '../../components/shared/StatusBadge';

export default function TransporterDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12 font-body max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Espace Transporteur</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Gérez vos expéditions, suivez vos trajets et optimisez vos revenus.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            size="lg" 
            icon={<Navigation size={18} />}
            onClick={() => navigate('/transporter/missions')}
          >
            Trouver des Missions
          </Button>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center">
                 <Truck size={20} />
              </div>
           </div>
           <div>
              <p className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Livraisons en cours</p>
              <p className="text-3xl font-mono font-bold text-[var(--text-primary)]">3</p>
           </div>
        </Card>
        
        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                 <CheckCircle size={20} />
              </div>
           </div>
           <div>
              <p className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Total Livré</p>
              <p className="text-3xl font-mono font-bold text-[var(--text-primary)]">158</p>
           </div>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                 <MapIcon size={20} />
              </div>
           </div>
           <div>
              <p className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Missions Dispos</p>
              <p className="text-3xl font-mono font-bold text-[var(--text-primary)]">12</p>
           </div>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                 <Wallet size={20} />
              </div>
           </div>
           <div>
              <p className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Gains ce mois</p>
              <p className="text-3xl font-mono font-bold text-[var(--text-primary)]">450k</p>
           </div>
        </Card>
      </section>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Deliveries (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Livraisons Actives</h2>
            <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />} iconPosition="right" onClick={() => navigate('/transporter/deliveries')}>
              Voir tout
            </Button>
          </div>

          <div className="space-y-4">
            {[ 
              { id: 'TR-045', from: 'Bobo Dioulasso', to: 'Ouagadougou', load: '10T Maïs', status: 'SHIPPED', ETA: '2h' },
              { id: 'TR-046', from: 'Koudougou', to: 'Banfora', load: '5T Oignons', status: 'PENDING', ETA: 'Demain' }
            ].map((delivery) => (
              <Card key={delivery.id} className="p-4 hover:border-[var(--text-accent)] transition-all flex flex-col md:flex-row items-center gap-6 group">
                <div className="w-16 h-16 bg-[var(--bg-muted)] text-[var(--text-primary)] rounded-xl flex flex-col items-center justify-center shadow-inner">
                   <div className="text-[10px] font-bold text-[var(--text-secondary)] leading-none mb-1">REF</div>
                   <div className="font-mono font-bold text-sm tracking-tighter leading-none">{delivery.id}</div>
                </div>
                
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full text-center md:text-left">
                   <div>
                     <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                       <span className="font-bold text-[14px] text-[var(--text-primary)]">{delivery.from}</span>
                       <ArrowRight size={14} className="text-[var(--text-muted)]" />
                       <span className="font-bold text-[14px] text-[var(--text-primary)]">{delivery.to}</span>
                     </div>
                     <p className="text-[12px] text-[var(--text-secondary)] font-bold uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                        <Truck size={12} /> {delivery.load}
                     </p>
                   </div>
                   
                   <div className="flex items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-[var(--border-light)] pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                      <div className="text-left">
                         <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1 mb-1">
                           <Clock size={12} /> E.T.A
                         </p>
                         <p className="font-mono font-bold text-[14px]">{delivery.ETA}</p>
                      </div>
                      <StatusBadge status={delivery.status} />
                   </div>
                </div>
                
                <Button variant="secondary" size="md" className="w-full md:w-auto mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity absolute md:relative right-4 md:right-auto md:flex">
                   Suivre
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-red-50/50 border-red-100 flex items-start gap-4">
             <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
             <div>
                <h4 className="text-[13px] font-bold text-red-700 mb-1">Alerte Météo: Axe Bobo-Ouaga</h4>
                <p className="text-[12px] text-red-600/80 leading-relaxed">De fortes pluies sont signalées sur l'axe principal. Prévoyez des retards et roulez prudemment pour la livraison TR-045.</p>
             </div>
          </Card>
        </div>

        {/* Calendar / Availability (Right 1/3) */}
        <div className="space-y-6">
           <Card className="p-8 space-y-6">
             <h3 className="text-[14px] font-bold text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2 border-l-4 border-[var(--text-accent)] pl-3">
               <Calendar size={16} className="text-[var(--text-accent)]" /> 
               Disponibilité
             </h3>
             
             <div className="space-y-3">
               <div className="flex justify-between items-center p-3 rounded-lg border-2 border-[var(--text-accent)] bg-[var(--text-accent)]/5 shadow-sm">
                 <span className="text-[13px] font-bold text-[var(--text-primary)]">Ouagadougou</span>
                 <span className="bg-[var(--text-accent)] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded">Aujourd'hui</span>
               </div>
               <div className="flex justify-between items-center p-3 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-light)]">
                 <span className="text-[13px] font-bold text-[var(--text-secondary)]">Bobo Dioulasso</span>
                 <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Demain</span>
               </div>
             </div>
             
             <Button variant="secondary" size="md" className="w-full justify-center text-[11px]">
               Modifier le planning
             </Button>
           </Card>

           <Card className="p-8 bg-[var(--text-accent)] text-white shadow-xl shadow-[var(--text-accent-rgb)]/20 border-none group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Wallet size={80} />
             </div>
             
             <div className="relative z-10">
                <h3 className="text-xl font-display mb-3">Bonus Fidélité</h3>
                <p className="text-[13px] text-white/90 mb-6 leading-relaxed">
                  Encore <span className="font-bold underline decoration-2 underline-offset-4 decoration-white/50">5 livraisons</span> ce mois-ci pour débloquer votre prime de 15 000 F !
                </p>
                
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                   <div className="w-2/3 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase text-white/80">
                   <span>En cours</span>
                   <span>67%</span>
                </div>
             </div>
           </Card>
        </div>

      </div>
    </div>
  );
}
