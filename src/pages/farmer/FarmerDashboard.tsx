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
import { useProductStore } from '../../store/productStore';
import { useOrderStore } from '../../store/orderStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';
import Avatar from '../../components/shared/Avatar';

const FarmerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore() as any;
  const { products, fetchUserProducts } = useProductStore() as any;
  const { orders, fetchUserOrders } = useOrderStore() as any;

  useEffect(() => {
    fetchUserProducts();
    fetchUserOrders();
  }, [fetchUserProducts, fetchUserOrders]);

  // Derived stats
  const activeProducts = (products || []).filter((p: any) => p.available && !p.hidden).length;
  const pendingOrders = (orders || []).filter((o: any) => ['PENDING', 'CONFIRMED'].includes(o.status)).length;
  const totalEarnings = (orders || [])
    .filter((o: any) => o.status === 'DELIVERED')
    .reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

  const stats = [
    { label: "Produits Actifs", value: activeProducts, icon: <Package size={20} />, trend: "Catalogue" },
    { label: "Commandes Flux", value: pendingOrders, icon: <ShoppingCart size={20} />, trend: "Urgences" },
    { label: "Ventes Totales", value: (orders || []).length, icon: <CheckCircle size={20} />, trend: "Volume" },
    { label: "Revenu Total", value: formatFCFA(totalEarnings).replace('FCFA', ''), icon: <Wallet size={20} />, trend: "CFA" },
  ];

  const urgentOrders = (orders || [])
    .filter((o: any) => ['PENDING', 'CONFIRMED'].includes(o.status))
    .slice(0, 3);

  const columns = [
    {
      header: 'Commande',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-on-surface">#{o._id?.slice(-6).toUpperCase()}</span>
          <span className="text-[11px] text-on-surface-variant font-medium">{new Date(o.createdAt).toLocaleDateString()}</span>
        </div>
      ),
      isMono: true
    },
    {
      header: 'Client',
      accessor: (o: any) => (
        <div className="flex items-center gap-2">
          <Avatar name={o.buyer?.firstName || 'P'} size="sm" role="BUYER" />
          <span className="text-[13px] font-medium">{o.buyer?.firstName || 'Partenaire'}</span>
        </div>
      )
    },
    {
      header: 'Montant',
      accessor: (o: any) => (
        <span className="font-bold">{formatFCFA(o.totalAmount || 0)}</span>
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
          onClick={(e) => { e.stopPropagation(); navigate(`/farmer/orders/${o._id}`); }}
        />
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif-display text-on-surface tracking-tight mb-2">Tableau de Bord</h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Heureux de vous revoir, <span className="text-primary font-bold">{user?.firstName || user?.name}</span>. Voici l'état de votre exploitation.
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
        {stats.map((stat, i) => (
          <Card key={i} className="group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">{stat.label}</span>
              <div className="p-2 bg-surface-container-high rounded-xl text-on-surface-variant group-hover:text-primary transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-mono font-bold text-on-surface">{stat.value}</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
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
              <Clock size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-on-surface">Commandes à traiter</h2>
            </div>
            <Link to="/farmer/orders" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 transition-all">
              Voir tout le carnet <ArrowRight size={14} />
            </Link>
          </div>
          <DataTable 
            columns={columns} 
            data={urgentOrders} 
            isLoading={false}
            emptyMessage="Aucune commande en attente pour le moment."
            onRowClick={(o: any) => navigate(`/farmer/orders/${o._id}`)}
          />
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
          <Card className="bg-primary text-white border-none relative overflow-hidden group p-8">
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-serif-display font-bold mb-3">Conseil de saison</h3>
                <p className="text-sm text-white/80 leading-relaxed font-newsreader italic">
                  "Les prévisions indiquent une hausse de l'humidité en zone Centre. Surveillez vos stocks de céréales."
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
              <TrendingUp size={18} className="text-primary" />
              <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[.2em]">Flux d'activité</h3>
            </div>
            <div className="space-y-6">
               {[
                 { label: 'Stock Approuvé', desc: 'Votre lot de Maïs a été validé', time: '12m', icon: <CheckCircle size={14} />, color: 'text-green-500' },
                 { label: "Nouveau Message", desc: "Négociation en cours (Tomates)", time: '1h', icon: <MessageSquare size={14} />, color: 'text-blue-500' },
                 { label: 'Paiement Reçu', desc: 'Commande #042 en séquestre', time: '3h', icon: <Wallet size={14} />, color: 'text-orange-500' }
               ].map((act, i) => (
                 <div key={i} className="flex gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                    <div className={`w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0 ${act.color}`}>
                       {act.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-sm font-bold text-on-surface truncate">{act.label}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono">{act.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant truncate">{act.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
