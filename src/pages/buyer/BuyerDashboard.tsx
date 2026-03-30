import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  MessageSquare,
  Search,
  Heart,
  ArrowRight,
  TrendingUp,
  Package,
  Leaf,
  Tractor
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useBuyerStore } from '../../store/buyerStore';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';

const BuyerDashboard: React.FC = () => {
  const { user, setShowUpgradeModal } = useAuthStore() as any;
  const { stats, activeOrders, loading, fetchDashboardData } = useBuyerStore() as any;

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const columns = [
    {
      header: 'Commande',
      accessor: (o: any) => (
        <span className="font-bold text-[var(--text-primary)]">#{o.id || o._id?.slice(-8).toUpperCase()}</span>
      ),
      isMono: true
    },
    {
      header: 'Produit',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[var(--text-primary)]">{o.product || o.items?.[0]?.product?.name || 'Produit inconnu'}</span>
          <span className="text-[11px] text-[var(--text-secondary)]">{o.qty || '1 Lot'}</span>
        </div>
      )
    },
    {
      header: 'Total',
      accessor: (o: any) => (
        <span className="font-bold text-[var(--text-primary)] font-mono">{(o.price || o.amount || o.totalAmount || 0).toLocaleString()} F</span>
      ),
      className: 'text-right'
    },
    {
      header: 'Statut',
      accessor: (o: any) => (
        <StatusBadge status={o.status} />
      ),
      className: 'text-center'
    },
    {
      header: '',
      accessor: () => (
        <Button variant="ghost" size="sm" className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-accent)]">
          <ArrowRight size={16} />
        </Button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-body animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-[var(--text-accent)] uppercase tracking-[0.25em] mb-2">Espace Acheteur</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--text-primary)] tracking-tight mb-2">
            Bonjour, {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Partenaire'} 👋
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Trouvez les meilleurs produits frais au prix juste.</p>
        </div>
        <div>
          <Link to="/buyer/marketplace">
            <Button variant="primary" size="md" icon={<Search size={18} />}>
              Explorer le Marché
            </Button>
          </Link>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4 py-6 hover:border-[var(--text-accent)]/30 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center">
            <ShoppingCart size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Commandes Actives</p>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{stats?.activeOrdersCount || 0} en cours</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 py-6 hover:border-red-500/30 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <Heart size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Favoris</p>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{stats?.favoritesCount || 0} produits</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 py-6 hover:border-blue-500/30 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <MessageSquare size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Messages</p>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{stats?.unreadMessages || 0} non lus</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Purchases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[16px] font-bold text-[var(--text-primary)]">Derniers Achats</h2>
            <Link to="/buyer/orders">
              <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">Historique</Button>
            </Link>
          </div>
          <DataTable
            columns={columns}
            data={activeOrders || []}
            isLoading={loading}
            onRowClick={() => { }}
            emptyMessage="Aucun achat récent. Vos commandes en cours s'afficheront ici."
          />
        </div>

        {/* Sidebar / Filters */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[var(--text-primary)] mb-4 uppercase tracking-widest">Catégories d'intérêt</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Céréales', 'Légumes', 'Fruits', 'Tubercules'].map((cat) => (
                <button key={cat} className="px-3 py-2 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-lg text-[12px] font-medium text-[var(--text-secondary)] hover:bg-[var(--text-accent)]/10 hover:border-[var(--text-accent)]/30 hover:text-[var(--text-accent)] transition-all">
                  {cat}
                </button>
              ))}
            </div>
            <Link to="/buyer/marketplace" className="block mt-4 text-center text-[11px] font-bold text-[var(--text-accent)] uppercase tracking-widest hover:underline">
              Voir tout le catalogue
            </Link>
          </Card>

{/* Offre Flash currently hidden - awaiting backend dynamic offers */}

          <Card className="p-6 border-l-4 border-l-[var(--green-500)] shadow-sm bg-[var(--bg-surface)]">
            <h3 className="text-[14px] font-bold text-[var(--text-primary)] mb-4 uppercase tracking-widest flex items-center gap-2">
              <Leaf size={16} className="text-[var(--green-600)]" /> Extensions
            </h3>
            <p className="text-[12px] text-[var(--text-secondary)] mb-4 leading-relaxed">
              Vous êtes producteur agricole ou chauffeur de transport ? Activez ces fonctionnalités pour développer votre activité sur AgroConnect.
            </p>
            <div className="space-y-3">
              <Button onClick={() => setShowUpgradeModal(true)} variant="secondary" size="sm" className="w-full flex justify-start pl-4 group border border-[var(--border-light)] hover:border-[var(--green-600)]/30 transition-all font-bold" icon={<Leaf size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--green-600)] transition-colors" />}>
                Devenir Producteur
              </Button>
              <Button onClick={() => setShowUpgradeModal(true)} variant="secondary" size="sm" className="w-full flex justify-start pl-4 group border border-[var(--border-light)] hover:border-blue-500/30 transition-all font-bold" icon={<Tractor size={16} className="text-[var(--text-secondary)] group-hover:text-blue-500 transition-colors" />}>
                Devenir Livreur
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
