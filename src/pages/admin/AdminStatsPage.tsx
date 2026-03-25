import React, { useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Layers,
  Download,
  Calendar,
  ArrowUpRight,
  TrendingDown,
  PieChart,
  Activity,
  Package,
  ArrowRight
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { useUserStore } from '../../store/userStore';
import { useOrderStore } from '../../store/orderStore';
import { useProductStore } from '../../store/productStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const AdminStatsPage: React.FC = () => {
  const { stats, fetchStats, loading } = useAdminStore() as any;
  const { users, fetchUsers } = useUserStore() as any;
  const { orders, fetchOrders } = useOrderStore() as any;
  const { products, fetchProducts } = useProductStore() as any;

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, [fetchStats, fetchUsers, fetchOrders, fetchProducts]);

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
           <div className="w-10 h-10 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">Calcul des indicateurs...</p>
        </div>
     );
  }

  const kpis = [
    { 
      label: "Volume d'Affaires", 
      value: formatFCFA(stats?.totalVolume || 0), 
      delta: "+12%", 
      icon: <TrendingUp size={20} />, 
      color: 'var(--text-accent)',
      description: 'Chiffre d\'affaires total généré'
    },
    { 
      label: 'Utilisateurs Totaux', 
      value: (stats?.totalUsers || users.length).toLocaleString(), 
      delta: "+5%", 
      icon: <Users size={20} />, 
      color: 'var(--text-secondary)',
      description: 'Base utilisateur active'
    },
    { 
      label: 'Panier Moyen', 
      value: formatFCFA(stats?.totalOrders > 0 ? (stats?.totalVolume / stats?.totalOrders) : 0), 
      delta: "+3%", 
      icon: <ShoppingBag size={20} />, 
      color: 'var(--text-accent)',
      description: 'Valeur moyenne par commande'
    },
    { 
      label: 'Produits en Ligne', 
      value: (stats?.totalProducts || products.length).toLocaleString(), 
      delta: "+8%", 
      icon: <Package size={20} />, 
      color: 'var(--text-secondary)',
      description: 'Inventaire global disponible'
    },
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Analyse de Performance</h1>
          <p className="text-[14px] text-[var(--text-secondary)] max-w-xl">
            Indicateurs macro-économiques et statistiques vitales de la plateforme.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" icon={<Calendar size={16} />}>Trimestre Q1 2026</Button>
           <Button icon={<Download size={16} />}>Exporter</Button>
        </div>
      </header>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} hoverable className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]">
                {kpi.icon}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-accent)] bg-[var(--bg-subtle)] px-2 py-1 rounded-full">
                <ArrowUpRight size={10} />
                {kpi.delta}
              </div>
            </div>
            <div>
              <p className="text-[12px] text-[var(--text-secondary)] font-medium mb-1 uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{kpi.value}</h3>
              <p className="text-[10px] text-[var(--text-muted)] mt-2 italic">{kpi.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Dynamism */}
        <Card className="lg:col-span-2">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-lg font-bold text-[var(--text-primary)]">Dynamique de Croissance</h3>
                 <p className="text-[12px] text-[var(--text-secondary)]">Volume des transactions sur les 7 derniers jours.</p>
              </div>
              <div className="p-2 bg-[var(--bg-muted)] rounded-lg text-[var(--text-accent)]">
                 <Activity size={20} />
              </div>
           </div>

           <div className="h-64 flex items-end justify-between gap-3 px-2">
              {(() => {
                const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
                const volumeByDay = new Array(7).fill(0);
                orders.forEach((o: any) => {
                  const day = new Date(o.createdAt).getDay();
                  const index = day === 0 ? 6 : day - 1;
                  volumeByDay[index] += o.totalAmount || 0;
                });
                const maxVolume = Math.max(...volumeByDay, 1);
                return days.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group gap-3 h-full justify-end">
                    <div className="text-[9px] font-mono text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-surface)] px-1 shadow-sm border rounded">
                      {formatFCFA(volumeByDay[i])}
                    </div>
                    <div 
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-700 ${volumeByDay[i] > 0 ? 'bg-[var(--text-accent)]/80 hover:bg-[var(--text-accent)] shadow-lg shadow-[var(--text-accent)]/10' : 'bg-[var(--bg-muted)]'}`} 
                      style={{ height: `${(volumeByDay[i] / maxVolume) * 100}%`, minHeight: '4px' }}
                    ></div>
                    <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">{d}</span>
                  </div>
                ));
              })()}
           </div>
        </Card>

        {/* Sectors Breakdown */}
        <Card>
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Secteurs Porteurs</h3>
              <div className="p-2 bg-[var(--bg-muted)] rounded-lg text-[var(--text-secondary)]">
                 <Layers size={20} />
              </div>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Céréales & Grains', val: 45, color: 'bg-[var(--text-accent)]' },
                { label: 'Maraîchage', val: 30, color: 'bg-blue-500' },
                { label: 'Tubercules', val: 15, color: 'bg-amber-500' },
                { label: 'Volailles & Élevage', val: 10, color: 'bg-[var(--text-muted)]' }
              ].map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[12px] font-bold">
                    <span className="text-[var(--text-secondary)]">{cat.label}</span>
                    <span className="text-[var(--text-primary)]">{cat.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bg-muted)] rounded-full overflow-hidden">
                    <div 
                      className={`${cat.color} h-full rounded-full transition-all duration-1000`} 
                      style={{ width: `${cat.val}%` }} 
                    />
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-10 pt-6 border-t border-[var(--border-light)]">
              <Button variant="secondary" className="w-full justify-between" icon={<ArrowRight size={16} />} iconPosition="right">
                Analyse détaillée
              </Button>
           </div>
        </Card>
      </div>

      {/* Network Health */}
      <Card className="p-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-[var(--bg-subtle)] rounded-xl text-[var(--text-accent)] border border-[var(--text-accent)]/10">
                 <PieChart size={24} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Disparition Démographique</h3>
                  <p className="text-[13px] text-[var(--text-secondary)]">Répartition des acteurs au sein de l'écosystème.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="text-center px-4">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Acteurs</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{users.length}</p>
               </div>
               <div className="text-center px-4 border-l border-[var(--border-light)]">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Croissance</p>
                  <p className="text-xl font-bold text-[var(--green-600)]">+14.2%</p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(() => {
              const rolesMap: any = { 
                'PRODUCER': { label: 'Producteurs', icon: <BarChart3 size={18} />, color: 'var(--text-accent)', bg: 'rgba(22,163,74,0.1)' }, 
                'BUYER': { label: 'Acheteurs', icon: <Users size={18} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' }, 
                'TRANSPORTER': { label: 'Logistique', icon: <ShoppingBag size={18} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' } 
              };
              const statsArray = stats?.roleStats || [];
              const total = statsArray.reduce((acc: number, s: any) => acc + s.count, 0) || 1;
              
              return ['PRODUCER', 'BUYER', 'TRANSPORTER'].map((role) => {
                const s = statsArray.find((st: any) => st._id === role);
                const count = s?.count || 0;
                const percent = Math.round((count / total) * 100);
                const info = rolesMap[role];
                
                return (
                  <div key={role} className="p-6 rounded-2xl border border-[var(--border-light)] flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: info.bg, color: info.color }}>
                          {info.icon}
                       </div>
                       <span className="font-bold text-[15px] text-[var(--text-primary)]">{info.label}</span>
                    </div>
                    <div>
                       <div className="flex justify-between items-end mb-2">
                          <span className="text-2xl font-bold text-[var(--text-primary)]">{count}</span>
                          <span className="text-[12px] font-medium text-[var(--text-muted)]">{percent}% du réseau</span>
                       </div>
                       <div className="w-full h-2 bg-[var(--bg-muted)] rounded-full overflow-hidden">
                          <div className="h-full transition-all duration-1000 shadow-sm" style={{ width: `${percent}%`, backgroundColor: info.color }}></div>
                       </div>
                    </div>
                  </div>
                );
              });
            })()}
         </div>
      </Card>
    </div>
  );
};

export default AdminStatsPage;
