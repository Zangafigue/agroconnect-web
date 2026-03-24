import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  MapPin, 
  Weight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Edit3, 
  Trash2, 
  Navigation,
  Info,
  Package,
  ChevronRight
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';

const MyOffersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="space-y-8 pb-12 font-body max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Mes Offres</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Suivez l'état de vos propositions de transport et gérez vos engagements.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-[var(--border-light)] overflow-x-auto hide-scrollbar">
         <button 
           onClick={() => setActiveTab('pending')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'pending' ? 'border-[var(--text-accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            En attente <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'pending' ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--bg-muted)]'}`}>2</span>
         </button>
         <button 
           onClick={() => setActiveTab('accepted')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'accepted' ? 'border-green-500 text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            Acceptées <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'accepted' ? 'bg-green-500 text-white' : 'bg-[var(--bg-muted)]'}`}>1</span>
         </button>
         <button 
           onClick={() => setActiveTab('rejected')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'rejected' ? 'border-[var(--text-secondary)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            Refusées <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'rejected' ? 'bg-[var(--text-secondary)] text-white' : 'bg-[var(--bg-muted)]'}`}>3</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Pending Offers */}
         {activeTab === 'pending' && (
            <>
               <Card className="p-0 overflow-hidden flex flex-col group border-l-4 border-[var(--text-accent)] hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-[var(--border-light)] flex justify-between items-start">
                     <div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 block">REF-OFFR #045</span>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 mb-3">
                           Bobo <ArrowRight size={16} className="text-[var(--text-muted)]" /> Ouaga
                        </h3>
                        <div className="flex flex-wrap gap-2">
                           <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)] uppercase bg-[var(--bg-muted)] px-2 py-1 rounded">
                              <Navigation size={12} /> ~360 km
                           </span>
                           <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)] uppercase bg-[var(--bg-muted)] px-2 py-1 rounded">
                              <Weight size={12} /> 500 kg
                           </span>
                        </div>
                     </div>
                     <StatusBadge status="PENDING" />
                  </div>

                  <div className="p-6 bg-[var(--bg-muted)]/30 flex-1 space-y-4">
                     <div className="p-4 bg-[var(--text-accent)]/5 rounded-xl border border-[var(--text-accent)]/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Ma proposition tarifaire</p>
                        <p className="font-mono text-2xl font-bold text-[var(--text-accent)]">{formatFCFA(15000)}</p>
                     </div>
                     <div className="p-4 bg-white rounded-xl border border-[var(--border-light)] text-[13px] text-[var(--text-secondary)] italic leading-relaxed">
                        "Je pars demain matin avec un camion vide, je peux charger directement au marché de fruits."
                     </div>
                     <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-muted)] mt-2">
                        <Clock size={12} /> Soumise il y a 2h
                     </div>
                  </div>

                  <div className="p-4 border-t border-[var(--border-light)] flex gap-3">
                     <Button variant="secondary" size="md" className="flex-1 justify-center" icon={<Edit3 size={14} />}>Modifier</Button>
                     <Button variant="ghost" size="md" className="flex-1 justify-center text-red-600 hover:text-red-700 hover:bg-red-50" icon={<Trash2 size={14} />}>Retirer</Button>
                  </div>
               </Card>

               {/* Placeholder / Dummy card */}
               <Card className="p-0 overflow-hidden flex flex-col border-l-4 border-[var(--border-light)] opacity-60 grayscale hidden lg:flex">
                     <div className="p-6 border-b border-[var(--border-light)] space-y-3">
                        <div className="w-24 h-3 bg-[var(--bg-muted)] rounded"></div>
                        <div className="w-48 h-6 bg-[var(--bg-muted)] rounded"></div>
                     </div>
                     <div className="p-6 flex-1 flex items-center justify-center">
                        <p className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Emplacement vide</p>
                     </div>
               </Card>
            </>
         )}

         {/* Accepted Offers */}
         {activeTab === 'accepted' && (
            <Card className="p-0 overflow-hidden flex flex-col border-l-4 border-green-500 hover:shadow-md transition-shadow">
               <div className="p-6 border-b border-[var(--border-light)] flex justify-between items-start">
                  <div>
                     <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 block">REF-OFFR #039</span>
                     <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 mb-3">
                        Banfora <ArrowRight size={16} className="text-[var(--text-muted)]" /> Bobo
                     </h3>
                     <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                        <Package size={14} /> 800 kg de Mangues
                     </p>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                     Acceptée
                  </div>
               </div>
               
               <div className="p-6 flex-1 flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Tarif validé</p>
                  <p className="font-mono text-3xl font-bold text-green-600 mb-6">{formatFCFA(8500)}</p>
                  
                  <div className="p-4 bg-[var(--bg-muted)]/50 rounded-xl flex items-start gap-3">
                     <Info size={16} className="text-[var(--text-accent)] shrink-0 mt-0.5" />
                     <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                        L'acheteur a accepté votre offre et le montant a été consigné sous séquestre. Vous pouvez procéder à la livraison.
                     </p>
                  </div>
               </div>

               <div className="p-4 border-t border-[var(--border-light)]">
                  <Button variant="primary" size="lg" className="w-full justify-center bg-green-600 hover:bg-green-700" onClick={() => navigate('/transporter/deliveries')} icon={<ChevronRight size={16} />} iconPosition="right">
                     Gérer la livraison
                  </Button>
               </div>
            </Card>
         )}

         {/* Rejected Offers */}
         {activeTab === 'rejected' && (
            <>
               {[
                 { route: 'Ouaga → Kaya', time: '20 Oct', price: 12000, reason: "Prix trop élevé par rapport à la concurrence locale." },
                 { route: 'Fada → Ouaga', time: '18 Oct', price: 25000, reason: "Délai de prise en charge trop long (72h+)." }
               ].map((offer, idx) => (
                  <Card key={idx} className="p-6 flex flex-col gap-4 border border-[var(--border-light)] bg-white opacity-80 hover:opacity-100 transition-opacity">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-[var(--text-primary)] text-[14px]">{offer.route}</h4>
                        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{offer.time}</span>
                     </div>
                     <div className="p-3 bg-red-50 rounded-lg border border-red-100 italic text-[12px] text-red-800/80">
                        "{offer.reason}"
                     </div>
                     <div className="pt-4 mt-auto border-t border-[var(--border-light)] flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Offre initiale</span>
                        <span className="font-mono text-[14px] font-bold text-[var(--text-secondary)] line-through">{formatFCFA(offer.price)}</span>
                     </div>
                  </Card>
               ))}
            </>
         )}
      </div>

    </div>
  );
};

export default MyOffersPage;
