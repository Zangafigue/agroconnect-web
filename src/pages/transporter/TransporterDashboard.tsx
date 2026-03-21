import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Map as MapIcon, 
  Navigation, 
  Wallet, 
  ArrowRight, 
  Clock,
  CheckCircle,
  Calendar
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';

export default function TransporterDashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif-display text-4xl text-on-surface mb-2 tracking-tight">Espace Transporteur</h1>
          <p className="text-outline font-medium opacity-80">Optimisez vos trajets et boostez vos revenus.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/transporter/missions" 
            className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Navigation className="w-5 h-5" />
            Trouver des Missions
          </Link>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Livraisons en cours" 
          value={3} 
          icon={Truck} 
          color="primary"
        />
        <StatCard 
          title="Total Livré" 
          value={158} 
          icon={CheckCircle} 
          color="secondary"
        />
        <StatCard 
          title="Missions dispos" 
          value={12} 
          icon={MapIcon} 
          color="tertiary"
        />
        <StatCard 
          title="Gains ce mois" 
          value="450 000 F" 
          icon={Wallet} 
          color="primary-container"
        />
      </section>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Deliveries (Left 2/3) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-on-surface">Livraisons Actives</h2>
            <Link to="/transporter/deliveries" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[ 
              { id: '#TR-45', from: 'Bobo Dioulasso', to: 'Ouagadougou', load: '10T Maïs', status: 'En route', ETA: '2h' },
              { id: '#TR-46', from: 'Koudougou', to: 'Banfora', load: '5T Oignons', status: 'Chargement', ETA: 'Demain' }
            ].map((delivery) => (
              <div key={delivery.id} className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors rounded-3xl p-6 border border-outline-variant/10 flex flex-col md:flex-row items-center gap-6 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-outline-variant/10 shadow-sm font-mono font-black text-primary text-sm">
                  {delivery.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-on-surface">{delivery.from}</span>
                    <ArrowRight className="w-3 h-3 text-outline opacity-40" />
                    <span className="font-bold text-on-surface">{delivery.to}</span>
                  </div>
                  <p className="text-xs text-outline font-medium">{delivery.load} • <span className="text-primary font-bold">{delivery.status}</span></p>
                </div>
                <div className="text-center md:text-right px-6 border-x border-outline-variant/10 hidden md:block">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" /> E.T.A
                  </p>
                  <p className="font-mono font-black text-on-surface">{delivery.ETA}</p>
                </div>
                <Link to="/transporter/deliveries" className="w-full md:w-auto px-6 py-3 bg-white text-primary border border-primary/20 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
                  Suivre
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Calendar / Availability (Right 1/3) */}
        <section className="space-y-8">
           <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10">
             <h3 className="text-sm font-black text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
               <Calendar className="w-4 h-4 text-primary" /> Disponibilité
             </h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center p-3 bg-primary/5 rounded-xl border border-primary/10">
                 <span className="text-xs font-bold text-on-surface">Ouagadougou</span>
                 <span className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full">AUJOURD'HUI</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                 <span className="text-xs font-bold text-outline">Bobo Dioulasso</span>
                 <span className="text-[8px] font-black text-outline uppercase tracking-widest pl-2">Demain</span>
               </div>
             </div>
             <button className="w-full mt-6 py-3 border border-primary text-primary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/5 transition-all">
               Modifier le planning
             </button>
           </div>

           <div className="bg-secondary-container/10 rounded-[2.5rem] p-8 border border-secondary-container/10">
             <h3 className="text-xl font-serif-display text-on-secondary-container mb-4">Bonus Fidélité</h3>
             <p className="text-sm text-on-secondary-container/70 mb-4 font-medium leading-relaxed">
               Effectuez encore 5 livraisons ce mois-ci pour débloquer votre bonus de **15 000 F**.
             </p>
             <div className="w-full h-2 bg-secondary-container/20 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-secondary"></div>
             </div>
             <p className="text-[10px] font-bold text-secondary mt-2 text-right uppercase tracking-[2px]">67% complété</p>
           </div>
        </section>

      </div>
    </div>
  );
}
