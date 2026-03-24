import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { useUserStore } from '../../store/userStore';
import { useOrderStore } from '../../store/orderStore';
import { useAdminStore } from '../../store/adminStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore() as any;
  const { users, fetchUsers } = useUserStore() as any;
  const { orders, fetchOrders } = useOrderStore() as any;
  const { stats, fetchStats, loading } = useAdminStore() as any;

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
    fetchStats();
  }, [fetchProducts, fetchUsers, fetchOrders, fetchStats]);

  const openDisputesCount = stats?.openDisputes || 0;
  const pendingKycCount = stats?.pendingKyc || users?.filter((u: any) => u.role === 'PRODUCER' && !u.isVerified).length || 0;
  const pendingPaymentsCount = stats?.pendingWithdrawals || 0;

  const kpis = [
    { label: 'Utilisateurs', value: (stats?.totalUsers || users.length).toLocaleString(), icon: <Users size={20} />, color: 'var(--text-accent)' },
    { label: 'Produits actifs', value: (stats?.totalProducts || products.length).toLocaleString(), icon: <Package size={20} />, color: 'var(--text-secondary)' },
    { label: 'Commandes', value: (stats?.totalOrders || orders.length).toLocaleString(), icon: <ShoppingBag size={20} />, color: 'var(--text-accent)' },
    { label: "Volume d'affaires", value: formatFCFA(stats?.totalVolume || 0), icon: <TrendingUp size={20} />, color: 'var(--text-accent)' },
  ];

  const recentOrders = orders.slice(0, 5);

  const columns = [
    { 
      header: 'Identifiant', 
      accessor: (item: any) => <span className="text-[12px] font-bold">#{item._id?.slice(-8).toUpperCase()}</span>,
      isMono: true 
    },
    { 
      header: 'Produit', 
      accessor: (item: any) => <span className="font-semibold">{item.product?.name || item.items?.[0]?.product?.name || 'Lot agro'}</span>
    },
    { 
      header: 'Acheteur', 
      accessor: (item: any) => <span>{item.buyer?.name || 'Client Externe'}</span>
    },
    { 
      header: 'Montant', 
      accessor: (item: any) => <span>{formatFCFA(item.totalAmount || 0)}</span>,
      isMono: true
    },
    { 
      header: 'Statut', 
      accessor: (item: any) => <StatusBadge status={item.status} />,
      className: 'text-right'
    }
  ];

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
           <div className="w-10 h-10 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">Chargement du dashboard...</p>
        </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Centre de Commande</h1>
          <p className="text-[14px] text-[var(--text-secondary)] max-w-lg">Surveillance en temps réel de l'écosystème AgroConnect.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="md" 
            icon={<span className="material-symbols-outlined">download</span>}
          >
            Exporter Rapport
          </Button>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} hoverable className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-md bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-secondary)]">
                {kpi.icon}
              </div>
              <span className="material-symbols-outlined text-[16px] text-[var(--text-muted)] cursor-help">info</span>
            </div>
            <div>
              <p className="text-[12px] text-[var(--text-secondary)] font-medium mb-1 uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{kpi.value}</h3>
            </div>
          </Card>
        ))}
      </section>

      {/* Highlights / Alerts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-[var(--btn-danger-text)] bg-[var(--badge-dispute-bg)]/30">
          <Link to="/admin/disputes" className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--btn-danger-text)] shadow-sm">
                  <span className="material-symbols-outlined">report</span>
               </div>
               <div>
                  <h4 className="text-[16px] font-bold text-[var(--text-primary)]">{openDisputesCount} litiges ouverts</h4>
                  <p className="text-[12px] text-[var(--text-secondary)]">Arbitrage prioritaire requis</p>
               </div>
            </div>
            <span className="material-symbols-outlined text-[var(--text-muted)] group-hover:translate-x-1 transition-transform">chevron_right</span>
          </Link>
        </Card>

        <Card className="border-l-4 border-l-[var(--text-accent)]">
          <Link to="/admin/users" className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--text-accent)] shadow-sm">
                  <span className="material-symbols-outlined">verified_user</span>
               </div>
               <div>
                  <h4 className="text-[16px] font-bold text-[var(--text-primary)]">{pendingKycCount} dossiers KYC</h4>
                  <p className="text-[12px] text-[var(--text-secondary)]">Vérifications en attente</p>
               </div>
            </div>
            <span className="material-symbols-outlined text-[var(--text-muted)] group-hover:translate-x-1 transition-transform">chevron_right</span>
          </Link>
        </Card>

        <Card className="border-l-4 border-l-[var(--badge-held-text)]">
          <Link to="/admin/payments" className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--badge-held-text)] shadow-sm">
                  <span className="material-symbols-outlined">payments</span>
               </div>
               <div>
                  <h4 className="text-[16px] font-bold text-[var(--text-primary)]">{pendingPaymentsCount} retraits</h4>
                  <p className="text-[12px] text-[var(--text-secondary)]">Demandes de paiement</p>
               </div>
            </div>
            <span className="material-symbols-outlined text-[var(--text-muted)] group-hover:translate-x-1 transition-transform">chevron_right</span>
          </Link>
        </Card>
      </section>

      {/* Main Grid: Flow & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow Chart Container */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[18px] font-bold text-[var(--text-primary)]">Flux Opérationnel</h3>
            <div className="flex gap-2">
              <span className="text-[11px] font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--text-accent)]"></span> Commandes
              </span>
            </div>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {(() => {
              const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
              const orderCounts = new Array(7).fill(0);
              orders.forEach((o: any) => {
                const day = new Date(o.createdAt).getDay();
                const index = day === 0 ? 6 : day - 1;
                orderCounts[index]++;
              });
              const maxCount = Math.max(...orderCounts, 2);
              return days.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group gap-3 h-full justify-end">
                  <div className="text-[10px] font-mono text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                    {orderCounts[i]}
                  </div>
                  <div 
                    className={`w-full max-w-[32px] rounded-t-sm transition-all duration-500 ${orderCounts[i] > 0 ? 'bg-[var(--text-accent)]/80 hover:bg-[var(--text-accent)]' : 'bg-[var(--bg-muted)]'}`} 
                    style={{ height: `${(orderCounts[i] / maxCount) * 100}%`, minHeight: '4px' }}
                  ></div>
                  <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-tighter">{d}</span>
                </div>
              ));
            })()}
          </div>
        </Card>

        {/* Sociometry / Network distribution */}
        <Card>
          <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Réseau</h3>
          <div className="space-y-4">
             {(() => {
              const rolesMap: any = { 
                'PRODUCER': { label: 'Producteurs', icon: 'agriculture', color: 'bg-[var(--text-accent)]' }, 
                'BUYER': { label: 'Acheteurs', icon: 'person', color: 'bg-blue-500' }, 
                'TRANSPORTER': { label: 'Logistique', icon: 'local_shipping', color: 'bg-amber-500' } 
              };
              const statsArray = stats?.roleStats || [];
              const total = statsArray.reduce((acc: number, s: any) => acc + s.count, 0) || 1;
              
              return ['PRODUCER', 'BUYER', 'TRANSPORTER'].map((role) => {
                const s = statsArray.find((st: any) => st._id === role);
                const count = s?.count || 0;
                const percent = Math.round((count / total) * 100);
                const info = rolesMap[role];
                
                return (
                  <div key={role} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[13px]">
                       <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-[16px] ${role === 'PRODUCER' ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'}`}>{info.icon}</span>
                          <span className="font-medium text-[var(--text-secondary)]">{info.label}</span>
                       </div>
                       <span className="font-mono text-[var(--text-primary)]">{count}</span>
                    </div>
                    <div className="w-full h-1 bg-[var(--bg-muted)] rounded-full overflow-hidden">
                       <div className={`h-full ${info.color} transition-all duration-700`} style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--border-light)] flex justify-between items-center">
             <span className="text-[12px] text-[var(--text-muted)] font-medium">Total actifs</span>
             <span className="text-[18px] font-bold text-[var(--text-primary)]">{users.length}</span>
          </div>
        </Card>
      </section>

      {/* Recent Activity Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[18px] font-bold text-[var(--text-primary)]">Registre Global</h3>
          <Link to="/admin/orders">
            <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">Voir tout</Button>
          </Link>
        </div>
        <DataTable 
          columns={columns} 
          data={recentOrders} 
          onRowClick={(item: any) => navigate(`/admin/orders/${item._id}`)}
          emptyMessage="Aucune transaction récente."
        />
      </section>
    </div>
  );
};

export default AdminDashboard;
