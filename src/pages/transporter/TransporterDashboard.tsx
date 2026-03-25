import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Map as MapIcon, 
  Navigation, 
  ArrowRight, 
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';
import { useAuthStore } from '../../store/authStore';
import { useTransporterStore } from '../../store/transporterStore';
import { formatFCFA } from '../../utils/currency';

export default function TransporterDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore() as any;
  const { missions, deliveries, fetchMissions, fetchDeliveries, missionsLoading, deliveriesLoading } = useTransporterStore() as any;

  useEffect(() => {
    fetchMissions();
    fetchDeliveries();
  }, []);

  const pendingDeliveries = deliveries.filter((d: any) => d.status === 'IN_PROGRESS' || d.status === 'ASSIGNED');
  const completedDeliveries = deliveries.filter((d: any) => d.status === 'DELIVERED' || d.status === 'COMPLETED');
  const totalEarned = completedDeliveries.reduce((sum: number, d: any) => sum + (d.amount || d.price || 0), 0);

  const deliveryColumns = [
    {
      header: 'Réf.',
      accessor: (d: any) => <span className="font-mono font-bold text-[var(--text-primary)]">#{(d._id || d.id)?.slice(-6).toUpperCase()}</span>,
    },
    {
      header: 'Trajet',
      accessor: (d: any) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[var(--text-primary)]">{d.pickupCity || d.from || '—'}</span>
          <span className="text-[11px] text-[var(--text-muted)]">→ {d.deliveryCity || d.to || '—'}</span>
        </div>
      ),
    },
    {
      header: 'Montant',
      accessor: (d: any) => (
        <span className="font-mono font-bold text-[var(--text-primary)]">{formatFCFA(d.amount || d.price || 0)}</span>
      ),
      className: 'text-right',
    },
    {
      header: 'Statut',
      accessor: (d: any) => <StatusBadge status={d.status} />,
      className: 'text-center',
    },
    {
      header: '',
      accessor: (d: any) => (
        <Button variant="ghost" size="sm" className="p-1" onClick={() => navigate(`/transporter/deliveries`)}>
          <ArrowRight size={16} />
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight mb-1">
            Bonjour, {user?.firstName} 👋
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            {user?.vehicleType || 'Transporteur'} • {user?.city || 'Burkina Faso'}
          </p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Navigation size={18} />}
          onClick={() => navigate('/transporter/missions')}
        >
          Trouver des Missions
        </Button>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="w-9 h-9 rounded-xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center mb-3">
            <Truck size={18} />
          </div>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">En cours</p>
          <p className="text-2xl font-mono font-bold text-[var(--text-primary)]">
            {deliveriesLoading ? '...' : pendingDeliveries.length}
          </p>
        </Card>
        <Card className="p-5">
          <div className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-3">
            <CheckCircle size={18} />
          </div>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Livré</p>
          <p className="text-2xl font-mono font-bold text-[var(--text-primary)]">
            {deliveriesLoading ? '...' : completedDeliveries.length}
          </p>
        </Card>
        <Card className="p-5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <MapIcon size={18} />
          </div>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Missions dispo</p>
          <p className="text-2xl font-mono font-bold text-[var(--text-primary)]">
            {missionsLoading ? '...' : missions.length}
          </p>
        </Card>
        <Card className="p-5">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
            <Package size={18} />
          </div>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Total gagné</p>
          <p className="text-xl font-mono font-bold text-[var(--text-primary)]">
            {deliveriesLoading ? '...' : formatFCFA(user?.totalEarned || totalEarned)}
          </p>
        </Card>
      </section>

      {/* Recent Deliveries */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-[var(--text-primary)]">Livraisons récentes</h2>
          <Link to="/transporter/deliveries">
            <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">Voir tout</Button>
          </Link>
        </div>
        {deliveriesLoading ? (
          <Card className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[var(--text-muted)] text-[13px]">Chargement...</p>
          </Card>
        ) : deliveries.length === 0 ? (
          <Card className="p-12 text-center">
            <Truck size={40} className="mx-auto mb-4 text-[var(--text-muted)] opacity-30" />
            <p className="text-[var(--text-muted)] font-medium">Aucune livraison pour le moment.</p>
            <div className="mt-4">
              <Button variant="primary" size="sm" onClick={() => navigate('/transporter/missions')}>
                Parcourir les missions
              </Button>
            </div>
          </Card>
        ) : (
          <DataTable
            columns={deliveryColumns}
            data={deliveries.slice(0, 5)}
            onRowClick={() => navigate('/transporter/deliveries')}
            emptyMessage="Aucune livraison."
          />
        )}
      </section>

      {/* Available Missions Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-bold text-[var(--text-primary)]">Missions disponibles</h2>
            {missions.length > 0 && (
              <span className="px-2 py-0.5 bg-[var(--text-accent)] text-white text-[10px] font-bold rounded-full">
                {missionsLoading ? '...' : missions.length}
              </span>
            )}
          </div>
          <Link to="/transporter/missions">
            <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">Voir tout</Button>
          </Link>
        </div>

        {missionsLoading ? (
          <Card className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[var(--text-muted)] text-[13px]">Chargement des missions...</p>
          </Card>
        ) : missions.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle size={40} className="mx-auto mb-4 text-[var(--text-muted)] opacity-30" />
            <p className="text-[var(--text-muted)] font-medium">Aucune mission disponible actuellement.</p>
            <p className="text-[13px] text-[var(--text-muted)] mt-1">Revenez bientôt — de nouvelles opportunités sont publiées chaque jour.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {missions.slice(0, 3).map((m: any) => (
              <Card key={m._id || m.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/transporter/missions')}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                      {m.product?.category || m.category || 'Produit agricole'}
                    </span>
                    <h3 className="font-bold text-[var(--text-primary)] mt-0.5">{m.product?.name || m.title || 'Mission de transport'}</h3>
                  </div>
                  <span className="text-[var(--text-accent)] font-mono font-bold text-[15px]">
                    {formatFCFA(m.transportCost || m.budget || 0)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-[12px] text-[var(--text-secondary)]">
                  <span>📦 {m.quantity || '—'} {m.unit || ''}</span>
                  <span>📍 {m.seller?.city || m.pickupCity || '—'} → {m.buyer?.city || m.deliveryCity || '—'}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <StatusBadge status={m.status || 'PENDING'} />
                  <Button variant="primary" size="sm" onClick={(e: any) => { e.stopPropagation(); navigate('/transporter/missions'); }}>
                    Postuler
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
