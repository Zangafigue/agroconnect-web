import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  Weight, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Navigation,
  CheckCirle,
  History
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';

const MyDeliveriesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const historyColumns = [
    {
      header: 'ID Mission',
      accessor: (row: any) => (
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-secondary)]">
               <CheckCircle2 size={16} />
            </div>
            <span className="font-mono font-bold text-[var(--text-primary)]">{row.id}</span>
         </div>
      )
    },
    {
      header: 'Trajet & Chargement',
      accessor: (row: any) => (
         <div>
            <p className="font-bold text-[var(--text-primary)] text-[13px] flex items-center gap-2 mb-1">
               {row.from} <ArrowRight size={12} className="text-[var(--text-muted)]" /> {row.to}
            </p>
            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">{row.product} • {row.weight}</p>
         </div>
      )
    },
    {
      header: 'Gain Net',
      accessor: (row: any) => (
         <span className="font-mono font-bold text-[14px] text-[var(--text-primary)]">{formatFCFA(row.gain)}</span>
      )
    },
    {
      header: 'Date Clôture',
      accessor: (row: any) => (
         <span className="text-[12px] text-[var(--text-secondary)]">{row.date}</span>
      ),
      className: 'text-right'
    }
  ];

  const historyData = [
    { id: '#TR-038', from: 'Bobo', to: 'Ouaga', product: 'Maïs', weight: '450 kg', gain: 15000, date: '09 mars 2024' },
    { id: '#TR-035', from: 'Fada', to: 'Ouaga', product: 'Niébé', weight: '120 kg', gain: 8500, date: '05 mars 2024' }
  ];

  return (
    <div className="space-y-8 pb-12 font-body max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Mes Livraisons</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Suivez vos livraisons en cours et consultez votre historique.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-[var(--border-light)]">
         <button 
           onClick={() => setActiveTab('active')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 ${activeTab === 'active' ? 'border-[var(--text-accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            En cours <span className="bg-[var(--text-accent)] text-white px-2 py-0.5 rounded-full text-[10px]">1</span>
         </button>
         <button 
           onClick={() => setActiveTab('history')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 ${activeTab === 'history' ? 'border-[var(--text-accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            Terminées <span className="bg-[var(--bg-muted)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full text-[10px]">12</span>
         </button>
      </div>

      {activeTab === 'active' && (
        <Card className="p-0 overflow-hidden shadow-sm">
           <div className="p-6 bg-[var(--bg-muted)]/50 border-b border-[var(--border-light)] flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <div className="px-3 py-1 bg-white border border-[var(--border-light)] rounded-lg font-mono font-bold text-[14px] text-[var(--text-primary)] shadow-sm">
                    #TR-041
                 </div>
                 <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                    Koudougou <ArrowRight size={16} className="text-[var(--text-muted)]" /> Ouagadougou
                 </h2>
              </div>
              <StatusBadge status="SHIPPED" />
           </div>

           {/* Simple Map Visualization */}
           <div className="h-48 bg-[var(--bg-muted)] relative border-b border-[var(--border-light)] overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--text-secondary-rgb) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-full max-w-lg flex items-center gap-2 px-10">
                    <div className="w-4 h-4 rounded-full bg-[var(--text-accent)] shadow-[0_0_10px_rgba(var(--text-accent-rgb),0.5)] z-10 shrink-0"></div>
                    <div className="h-1 flex-1 bg-[var(--border-light)] rounded-full overflow-hidden shrink-[10]">
                       <div className="h-full bg-[var(--text-accent)] w-1/3 shadow-[0_0_10px_rgba(var(--text-accent-rgb),0.8)]"></div>
                    </div>
                    <div className="p-2 bg-[var(--text-accent)] text-white rounded-xl shadow-lg z-10 animate-bounce -ml-4 -mr-4 shrink-0">
                       <Truck size={20} />
                    </div>
                    <div className="h-1 flex-1 bg-[var(--border-light)] rounded-full shrink-[10]"></div>
                    <div className="w-4 h-4 rounded-full border-4 border-white bg-[var(--text-secondary)] shadow-sm z-10 shrink-0"></div>
                 </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[var(--border-light)] shadow-sm text-[10px] font-bold uppercase tracking-widest">
                 Départ: Koudougou
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[var(--border-light)] shadow-sm text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                 Arrivée: Ouagadougou
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-[var(--border-light)] divide-y md:divide-y-0 md:divide-x divide-[var(--border-light)]">
              <div className="p-6 text-center">
                 <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Cargaison</p>
                 <p className="font-bold text-[14px] text-[var(--text-primary)]">Sorgho (200 kg)</p>
              </div>
              <div className="p-6 text-center">
                 <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Distance max.</p>
                 <p className="font-bold text-[14px] text-[var(--text-primary)]">100 km</p>
              </div>
              <div className="p-6 text-center">
                 <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Temps estimé</p>
                 <p className="font-bold text-[14px] text-[var(--text-primary)]">1h30</p>
              </div>
              <div className="p-6 text-center bg-[var(--bg-muted)]/30">
                 <p className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-widest mb-1">Rémunération</p>
                 <p className="font-mono font-bold text-2xl text-[var(--text-accent)]">{formatFCFA(10000)}</p>
              </div>
           </div>

           <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[var(--bg-surface)]">
              <div>
                 <h3 className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4 border-l-4 border-[var(--border-light)] pl-3">Contacts</h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-muted)]/30">
                       <div className="flex items-center gap-3">
                          <Avatar name="Amadou K." role="FARMER" size="md" />
                          <div>
                             <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-widest">Producteur</p>
                             <p className="font-bold text-[14px]">Amadou K.</p>
                          </div>
                       </div>
                       <Button variant="ghost" size="sm" icon={<Phone size={14} className="text-[var(--text-accent)]" />}>Appeler</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-muted)]/30">
                       <div className="flex items-center gap-3">
                          <Avatar name="Fatima T." role="BUYER" size="md" />
                          <div>
                             <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-widest">Acheteuse</p>
                             <p className="font-bold text-[14px]">Fatima T.</p>
                          </div>
                       </div>
                       <Button variant="ghost" size="sm" icon={<Phone size={14} className="text-[var(--text-accent)]" />}>Appeler</Button>
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4 border-l-4 border-[var(--border-light)] pl-3">Sécurisation</h3>
                 <div className="p-6 rounded-xl border border-[var(--text-accent)]/20 bg-[var(--text-accent)]/5 flex flex-col justify-center items-center text-center h-[calc(100%-2.5rem)]">
                    <ShieldCheck size={32} className="text-[var(--text-accent)] mb-3" />
                    <p className="text-[14px] font-bold text-[var(--text-primary)] mb-1">Solde sous séquestre</p>
                    <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                       La somme de 10 000 FCFA est actuellement sécurisée. Elle sera versée sur votre portefeuille dès la validation de la livraison par l'Acheteur.
                    </p>
                 </div>
              </div>
           </div>

           <div className="p-6 bg-[var(--bg-muted)]/30 border-t border-[var(--border-light)] flex flex-wrap gap-4 justify-end">
              <Button variant="secondary" size="lg" icon={<MessageSquare size={16} />}>Messagerie</Button>
              <Button variant="primary" size="lg" icon={<CheckCircle2 size={16} />}>Valider l'arrivée</Button>
           </div>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card className="p-0 overflow-hidden">
           <DataTable 
             columns={historyColumns}
             data={historyData}
             emptyMessage="Aucun historique de livraison."
           />
           <div className="p-4 bg-[var(--bg-muted)]/30 text-center border-t border-[var(--border-light)]">
              <Button variant="ghost" size="sm" icon={<History size={14} />}>Voir toutes les archives</Button>
           </div>
        </Card>
      )}

    </div>
  );
};

export default MyDeliveriesPage;
