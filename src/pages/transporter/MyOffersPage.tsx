import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Weight, Clock, ArrowRight, Edit3, Trash2, Navigation, Info, Package, ChevronRight, Truck
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';
import { useTransporterStore } from '../../store/transporterStore';

const MyOffersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('PENDING');
  const { offers, fetchOffers, offersLoading } = useTransporterStore() as any;

  useEffect(() => {
    fetchOffers();
  }, []);

  // Filter offers by status
  const pendingOffers = offers.filter((o: any) => o.status === 'PENDING' || !o.status);
  const acceptedOffers = offers.filter((o: any) => o.status === 'ACCEPTED');
  const rejectedOffers = offers.filter((o: any) => o.status === 'REJECTED' || o.status === 'CANCELLED');

  const getActiveList = () => {
    if (activeTab === 'PENDING') return pendingOffers;
    if (activeTab === 'ACCEPTED') return acceptedOffers;
    return rejectedOffers;
  };

  const activeOffers = getActiveList();

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
           onClick={() => setActiveTab('PENDING')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'PENDING' ? 'border-[var(--text-accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            En attente <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'PENDING' ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--bg-muted)]'}`}>{offersLoading ? '...' : pendingOffers.length}</span>
         </button>
         <button 
           onClick={() => setActiveTab('ACCEPTED')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'ACCEPTED' ? 'border-green-500 text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            Acceptées <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'ACCEPTED' ? 'bg-green-500 text-white' : 'bg-[var(--bg-muted)]'}`}>{offersLoading ? '...' : acceptedOffers.length}</span>
         </button>
         <button 
           onClick={() => setActiveTab('REJECTED')}
           className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'REJECTED' ? 'border-[var(--text-secondary)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
         >
            Refusées <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'REJECTED' ? 'bg-[var(--text-secondary)] text-white' : 'bg-[var(--bg-muted)]'}`}>{offersLoading ? '...' : rejectedOffers.length}</span>
         </button>
      </div>

      {offersLoading ? (
        <Card className="p-12 text-center">
          <div className="w-8 h-8 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[var(--text-muted)] text-[13px]">Chargement de vos offres...</p>
        </Card>
      ) : activeOffers.length === 0 ? (
        <Card className="p-16 text-center border-l-4 border-[var(--border-light)]">
          <Truck size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-20" />
          <h3 className="font-bold text-[var(--text-primary)] mb-2">Aucune offre {activeTab === 'PENDING' ? 'en attente' : activeTab === 'ACCEPTED' ? 'acceptée' : 'refusée'}</h3>
          <p className="text-[13px] text-[var(--text-muted)] max-w-sm mx-auto">
            {activeTab === 'PENDING' 
              ? "Vous n'avez soumis aucune offre actuellement en cours d'évaluation. Parcourez les missions pour en trouver !"
              : "Les offres correspondantes apparaîtront ici."}
          </p>
          <div className="mt-6">
            <Button variant="primary" size="sm" onClick={() => navigate('/transporter/missions')}>
              Parcourir les missions
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {activeOffers.map((offer: any) => {
            const id = offer._id || offer.id;
            const order = offer.order || {};
            
            if (activeTab === 'PENDING') {
              return (
                <Card key={id} className="p-0 overflow-hidden flex flex-col group border-l-4 border-[var(--text-accent)] hover:shadow-md transition-shadow">
                  <div className="p-5 border-b border-[var(--border-light)] flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 block">REF-OFFR #{id?.slice(-6).toUpperCase()}</span>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 mb-3">
                        {order.pickupCity || order.from || '—'} <ArrowRight size={16} className="text-[var(--text-muted)]" /> {order.deliveryCity || order.to || '—'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)] uppercase bg-[var(--bg-muted)] px-2 py-1 rounded">
                            <Navigation size={12} /> {order.distance ? `~${order.distance} km` : '—'}
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)] uppercase bg-[var(--bg-muted)] px-2 py-1 rounded">
                            <Weight size={12} /> {order.quantity || '—'} {order.unit || 'kg'}
                          </span>
                      </div>
                    </div>
                    <StatusBadge status="PENDING" />
                  </div>

                  <div className="p-5 bg-[var(--bg-muted)]/30 flex-1 space-y-4">
                    <div className="p-4 bg-[var(--text-accent)]/5 rounded-xl border border-[var(--text-accent)]/10">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Ma proposition tarifaire</p>
                      <p className="font-mono text-xl font-bold text-[var(--text-accent)]">{formatFCFA(offer.amount || offer.price || 0)}</p>
                    </div>
                    {offer.comment && (
                      <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-light)] text-[13px] text-[var(--text-secondary)] italic leading-relaxed">
                        "{offer.comment}"
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-muted)] mt-2">
                        <Clock size={12} /> {new Date(offer.createdAt || new Date()).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  <div className="p-4 border-t border-[var(--border-light)] flex gap-3">
                    <Button variant="ghost" size="md" className="flex-1 justify-center text-red-600 hover:text-red-700 hover:bg-red-50" icon={<Trash2 size={14} />}>Retirer l'offre</Button>
                  </div>
                </Card>
              );
            }

            if (activeTab === 'ACCEPTED') {
              return (
                <Card key={id} className="p-0 overflow-hidden flex flex-col border-l-4 border-green-500 hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-[var(--border-light)] flex justify-between items-start">
                    <div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 block">REF-OFFR #{id?.slice(-6).toUpperCase()}</span>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 mb-3">
                          {order.pickupCity || order.from || '—'} <ArrowRight size={16} className="text-[var(--text-muted)]" /> {order.deliveryCity || order.to || '—'}
                        </h3>
                        <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                          <Package size={14} /> {order.quantity || '—'} {order.unit || 'kg'} de {order.product?.name || 'Produit'}
                        </p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        Acceptée
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Tarif validé</p>
                    <p className="font-mono text-3xl font-bold text-green-600 mb-6">{formatFCFA(offer.amount || offer.price || 0)}</p>
                    
                    <div className="p-4 bg-[var(--bg-muted)]/50 rounded-xl flex items-start gap-3">
                        <Info size={16} className="text-[var(--text-accent)] shrink-0 mt-0.5" />
                        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                          L'acheteur a accepté votre offre. Vous pouvez procéder à la gestion de la mission de livraison.
                        </p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[var(--border-light)]">
                    <Button variant="primary" size="lg" className="w-full justify-center bg-green-600 border-green-600 hover:bg-green-700" onClick={() => navigate('/transporter/deliveries')} icon={<ChevronRight size={16} />} iconPosition="right">
                        Gérer la livraison
                    </Button>
                  </div>
                </Card>
              );
            }

            // REJECTED
            return (
              <Card key={id} className="p-6 flex flex-col gap-4 border border-[var(--border-light)] bg-[var(--bg-surface)] opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-1 block">#{id?.slice(-6).toUpperCase()}</span>
                    <h4 className="font-bold text-[var(--text-primary)] text-[14px]">
                      {order.pickupCity || order.from || '—'} → {order.deliveryCity || order.to || '—'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{new Date(offer.updatedAt || new Date()).toLocaleDateString('fr-FR')}</span>
                </div>
                {offer.rejectionReason && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100 italic text-[12px] text-red-800/80">
                    "{offer.rejectionReason}"
                  </div>
                )}
                <div className="pt-4 mt-auto border-t border-[var(--border-light)] flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Offre initiale</span>
                  <span className="font-mono text-[14px] font-bold text-[var(--text-secondary)] line-through">{formatFCFA(offer.amount || offer.price || 0)}</span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOffersPage;
