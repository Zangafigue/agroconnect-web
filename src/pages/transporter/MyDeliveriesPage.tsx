import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, ArrowRight, CheckCircle2, MessageSquare, Phone,
  ShieldCheck, History, Package, AlertCircle
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';
import { useTransporterStore } from '../../store/transporterStore';

const MyDeliveriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const { deliveries, deliveriesLoading, fetchDeliveries, updateDeliveryStatus } = useTransporterStore() as any;

  useEffect(() => { fetchDeliveries(); }, []);

  const activeDeliveries = deliveries.filter((d: any) => ['ASSIGNED', 'IN_PROGRESS', 'SHIPPED'].includes(d.status));
  const historyDeliveries = deliveries.filter((d: any) => ['DELIVERED', 'COMPLETED', 'CANCELLED'].includes(d.status));

  const historyColumns = [
    {
      header: 'Réf.',
      accessor: (row: any) => (
        <span className="font-mono font-bold text-[var(--text-primary)]">
          #{(row._id || row.id)?.slice(-6).toUpperCase()}
        </span>
      ),
    },
    {
      header: 'Trajet',
      accessor: (row: any) => (
        <div>
          <p className="font-bold text-[var(--text-primary)] text-[13px] flex items-center gap-2 mb-0.5">
            {row.pickupCity || row.from || '—'} <ArrowRight size={11} className="text-[var(--text-muted)]" /> {row.deliveryCity || row.to || '—'}
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">
            {row.product?.name || row.product || '—'} {row.quantity ? `• ${row.quantity} ${row.unit || 'kg'}` : ''}
          </p>
        </div>
      ),
    },
    {
      header: 'Gain',
      accessor: (row: any) => (
        <span className="font-mono font-bold text-[14px] text-[var(--text-primary)]">
          {formatFCFA(row.amount || row.price || row.gain || 0)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: (row: any) => (
        <span className="text-[12px] text-[var(--text-secondary)]">
          {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString('fr-FR') : '—'}
        </span>
      ),
      className: 'text-right',
    },
    {
      header: 'Statut',
      accessor: (row: any) => <StatusBadge status={row.status} />,
      className: 'text-center',
    },
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight mb-1">
          Mes Livraisons
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Suivez vos livraisons en cours et consultez votre historique.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[var(--border-light)]">
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'active'
              ? 'border-[var(--text-accent)] text-[var(--text-primary)]'
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          En cours
          <span className="bg-[var(--text-accent)] text-white px-2 py-0.5 rounded-full text-[10px]">
            {deliveriesLoading ? '…' : activeDeliveries.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-4 text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'history'
              ? 'border-[var(--text-accent)] text-[var(--text-primary)]'
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Terminées
          <span className="bg-[var(--bg-muted)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full text-[10px]">
            {deliveriesLoading ? '…' : historyDeliveries.length}
          </span>
        </button>
      </div>

      {/* Loading */}
      {deliveriesLoading && (
        <Card className="p-12 text-center">
          <div className="w-8 h-8 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[var(--text-muted)] text-[13px]">Chargement de vos livraisons...</p>
        </Card>
      )}

      {/* Active Deliveries */}
      {!deliveriesLoading && activeTab === 'active' && (
        <>
          {activeDeliveries.length === 0 ? (
            <Card className="p-12 text-center">
              <Truck size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-20" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Aucune livraison active</h3>
              <p className="text-[13px] text-[var(--text-muted)]">
                Postulez à des missions pour commencer à livrer.
              </p>
              <div className="mt-5">
                <Button variant="primary" size="sm" onClick={() => navigate('/transporter/missions')}>
                  Voir les missions
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {activeDeliveries.map((delivery: any) => {
                const id = delivery._id || delivery.id;
                return (
                  <Card key={id} className="p-0 overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="p-5 bg-[var(--bg-muted)]/50 border-b border-[var(--border-light)] flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-lg font-mono font-bold text-[13px] shadow-sm">
                          #{id?.slice(-6).toUpperCase()}
                        </span>
                        <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                          {delivery.pickupCity || delivery.from || '—'}
                          <ArrowRight size={14} className="text-[var(--text-muted)]" />
                          {delivery.deliveryCity || delivery.to || '—'}
                        </h2>
                      </div>
                      <StatusBadge status={delivery.status} />
                    </div>

                    {/* Progress animation */}
                    <div className="h-24 bg-[var(--bg-muted)]/30 border-b border-[var(--border-light)] flex items-center justify-center px-12">
                      <div className="w-full flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--text-accent)] shrink-0" />
                        <div className="h-1 flex-1 bg-[var(--border-light)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--text-accent)] w-1/2" />
                        </div>
                        <div className="p-1.5 bg-[var(--text-accent)] text-white rounded-lg shadow-lg animate-bounce shrink-0">
                          <Truck size={16} />
                        </div>
                        <div className="h-1 flex-1 bg-[var(--border-light)] rounded-full" />
                        <div className="w-3 h-3 rounded-full border-2 border-[var(--text-secondary)] bg-[var(--bg-surface)] shrink-0" />
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--border-light)] border-b border-[var(--border-light)]">
                      <div className="p-4 text-center">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Cargaison</p>
                        <p className="font-bold text-[13px] text-[var(--text-primary)]">
                          {delivery.product?.name || delivery.product || '—'}
                          {delivery.quantity ? ` (${delivery.quantity} ${delivery.unit || 'kg'})` : ''}
                        </p>
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Distance</p>
                        <p className="font-bold text-[13px] text-[var(--text-primary)]">{delivery.distance ? `${delivery.distance} km` : '—'}</p>
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Départ</p>
                        <p className="font-bold text-[13px] text-[var(--text-primary)]">
                          {delivery.pickupDate ? new Date(delivery.pickupDate).toLocaleDateString('fr-FR') : '—'}
                        </p>
                      </div>
                      <div className="p-4 text-center bg-[var(--bg-muted)]/30">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Rémunération</p>
                        <p className="font-mono font-bold text-lg text-[var(--text-accent)]">
                          {formatFCFA(delivery.amount || delivery.price || 0)}
                        </p>
                      </div>
                    </div>

                    {/* Contacts + Escrow */}
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Contacts</h3>
                        <div className="space-y-3">
                          {delivery.seller && (
                            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-light)]">
                              <div className="flex items-center gap-3">
                                <Avatar name={delivery.seller?.firstName || delivery.seller?.name} role="FARMER" size="sm" />
                                <div>
                                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Producteur</p>
                                  <p className="font-bold text-[13px]">{delivery.seller?.firstName} {delivery.seller?.lastName}</p>
                                </div>
                              </div>
                              {delivery.seller?.phone && (
                                <a href={`tel:${delivery.seller.phone}`}>
                                  <Button variant="ghost" size="sm" icon={<Phone size={13} className="text-[var(--text-accent)]" />}>Appeler</Button>
                                </a>
                              )}
                            </div>
                          )}
                          {delivery.buyer && (
                            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-light)]">
                              <div className="flex items-center gap-3">
                                <Avatar name={delivery.buyer?.firstName || delivery.buyer?.name} role="BUYER" size="sm" />
                                <div>
                                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Acheteur</p>
                                  <p className="font-bold text-[13px]">{delivery.buyer?.firstName} {delivery.buyer?.lastName}</p>
                                </div>
                              </div>
                              {delivery.buyer?.phone && (
                                <a href={`tel:${delivery.buyer.phone}`}>
                                  <Button variant="ghost" size="sm" icon={<Phone size={13} className="text-[var(--text-accent)]" />}>Appeler</Button>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Sécurisation</h3>
                        <div className="p-4 rounded-xl border border-[var(--text-accent)]/20 bg-[var(--text-accent)]/5 text-center h-[calc(100%-2rem)] flex flex-col justify-center">
                          <ShieldCheck size={28} className="text-[var(--text-accent)] mx-auto mb-2" />
                          <p className="text-[13px] font-bold text-[var(--text-primary)] mb-1">
                            {formatFCFA(delivery.amount || delivery.price || 0)} sous séquestre
                          </p>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                            Versé sur votre portefeuille dès validation par l'acheteur.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-[var(--border-light)] bg-[var(--bg-muted)]/30 flex flex-wrap gap-3 justify-end">
                      <Button variant="secondary" size="md" icon={<MessageSquare size={15} />} onClick={() => navigate('/transporter/messages')}>
                        Messagerie
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        icon={<CheckCircle2 size={15} />}
                        onClick={() => updateDeliveryStatus(id, 'DELIVERED')}
                      >
                        Valider l'arrivée
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* History */}
      {!deliveriesLoading && activeTab === 'history' && (
        historyDeliveries.length === 0 ? (
          <Card className="p-12 text-center">
            <History size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-20" />
            <h3 className="font-bold text-[var(--text-primary)] mb-2">Aucun historique</h3>
            <p className="text-[13px] text-[var(--text-muted)]">Vos livraisons terminées apparaîtront ici.</p>
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden">
            <DataTable
              columns={historyColumns}
              data={historyDeliveries}
              emptyMessage="Aucun historique de livraison."
            />
          </Card>
        )
      )}
    </div>
  );
};

export default MyDeliveriesPage;
