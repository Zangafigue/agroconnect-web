import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  ArrowRight,
  Package,
  ShoppingCart,
  CheckCircle,
  Wallet,
  Zap,
  MessageSquare,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useFarmerStore } from '../../store/farmerStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';
import Avatar from '../../components/shared/Avatar';

const FarmerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore() as any;
  const { stats, activeOrders, loading, fetchDashboardData } = useFarmerStore() as any;

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Derived stats from the new backend map
  const statsMapping = [
    { label: "Produits Actifs", value: stats?.productsListed || 0, icon: <Package size={20} />, trend: "Catalogue" },
    { label: "Commandes Flux", value: stats?.activeOrders || 0, icon: <ShoppingCart size={20} />, trend: "Actives" },
    { label: "Alertes Avis", value: stats?.pendingReviews || 0, icon: <CheckCircle size={20} />, trend: "Nouveaux" },
    { label: "Revenu Estimé", value: stats?.totalSales ? formatFCFA(stats.totalSales).replace('FCFA', '') : 0, icon: <Wallet size={20} />, trend: "CFA" },
  ];

  const columns = [
    {
      header: 'Commande',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--text-primary)]">#{o.id || o._id?.slice(-6).toUpperCase()}</span>
          <span className="text-[11px] text-[var(--text-secondary)] font-medium">{new Date(o.date || o.createdAt).toLocaleDateString()}</span>
        </div>
      ),
      isMono: true
    },
    {
      header: 'Client',
      accessor: (o: any) => (
        <div className="flex items-center gap-2">
          <Avatar name={o.buyer?.firstName || o.buyer || 'Partenaire'} size="sm" role="BUYER" />
          <span className="text-[13px] font-medium text-[var(--text-primary)]">{o.buyer?.firstName || o.buyer || 'Partenaire'}</span>
        </div>
      )
    },
    {
      header: 'Montant',
      accessor: (o: any) => (
        <span className="font-bold text-[var(--text-primary)]">{formatFCFA(o.totalAmount || o.amount || 0)}</span>
      ),
      isMono: true
    },
    {
      header: 'Statut',
      accessor: (o: any) => (
        <StatusBadge status={o.status} />
      )
    },
    {
      header: '',
      accessor: (o: any) => (
        <Button 
          variant="ghost" 
          size="sm" 
          icon={<ArrowRight size={16} />}
          onClick={(e) => { e.stopPropagation(); navigate(`/farmer/orders/${o._id || o.id}`); }}
        />
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold text-[var(--text-accent)] uppercase tracking-[0.25em] mb-2">Espace Agriculteur</p>
          <h1 className="text-4xl md:text-5xl font-display text-[var(--text-primary)] tracking-tight mb-2">
            Bonjour, {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Partenaire'} 👋
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">
            Voici l'état de votre exploitation aujourd'hui.
          </p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/farmer/products/new')}
        >
          Nouveau Produit
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsMapping.map((stat, i) => (
          <Card key={i} className="group hover:border-[var(--text-accent)]/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">{stat.label}</span>
              <div className="p-2 bg-[var(--bg-muted)] rounded-xl text-[var(--text-secondary)] group-hover:text-[var(--text-accent)] transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-mono font-bold text-[var(--text-primary)]">{stat.value}</h3>
              <span className="text-[10px] font-bold text-[var(--text-accent)] bg-[var(--text-accent)]/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Urgent Orders Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[var(--text-accent)]" />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Commandes à traiter</h2>
            </div>
            <Link to="/farmer/orders" className="text-xs font-bold text-[var(--text-accent)] hover:underline flex items-center gap-1 transition-all">
              Voir tout le carnet <ArrowRight size={14} />
            </Link>
          </div>
          <DataTable 
            columns={columns} 
            data={activeOrders?.slice(0, 5) || []} 
            isLoading={loading}
            emptyMessage="Aucune commande en attente pour le moment."
            onRowClick={(o: any) => navigate(`/farmer/orders/${o._id || o.id}`)}
          />
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[var(--text-accent)] text-white border-none relative overflow-hidden group p-8">
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-3">Conseil de saison</h3>
                <p className="text-sm text-white/80 leading-relaxed italic">
                  "Optimisez vos rendements {user?.address?.city ? `dans la région de ${user.address.city}` : 'cette saison'} en suivant les recommandations de notre IA agronomique."
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white border-white/20 hover:bg-white/10 w-full font-bold"
              >
                Analyse agro-météo
              </Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp size={18} className="text-[var(--text-accent)]" />
              <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[.2em]">Flux d'activité</h3>
            </div>
            <div className="space-y-6">
               <div className="text-center py-6">
                  <Package size={24} className="mx-auto text-[var(--border-light)] mb-3" />
                  <p className="text-xs text-[var(--text-secondary)]">Votre journal d'activité s'affichera ici une fois connecté au réseau.</p>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
