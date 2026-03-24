import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  MessageSquare, 
  Search,
  Heart,
  ArrowRight,
  TrendingUp,
  Package
} from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';

const BuyerDashboard: React.FC = () => {
  const recentOrders = [
    { id: '#B-882', product: 'Pommes de terre', qty: '50kg', status: 'SHIPPED', price: 25000, date: '21 Mars' },
    { id: '#B-881', product: 'Oignons Galmi', qty: '2 sacs', status: 'CONFIRMED', price: 30000, date: '20 Mars' }
  ];

  const columns = [
    {
      header: 'Commande',
      accessor: (o: any) => (
        <span className="font-bold text-[var(--text-primary)]">{o.id}</span>
      ),
      isMono: true
    },
    {
      header: 'Produit',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium">{o.product}</span>
          <span className="text-[11px] text-[var(--text-muted)]">{o.qty}</span>
        </div>
      )
    },
    {
      header: 'Total',
      accessor: (o: any) => (
        <span className="font-bold text-[var(--text-primary)] font-mono">{o.price.toLocaleString()} F</span>
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
        <Button variant="ghost" size="sm" className="p-1">
          <ArrowRight size={16} />
        </Button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Espace Acheteur</h1>
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
        <Card className="flex items-center gap-4 py-6">
           <div className="w-10 h-10 rounded-xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center">
              <ShoppingCart size={20} />
           </div>
           <div>
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Commandes Actives</p>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">2 en cours</h3>
           </div>
        </Card>
        <Card className="flex items-center gap-4 py-6">
           <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
              <Heart size={20} />
           </div>
           <div>
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Favoris</p>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">12 produits</h3>
           </div>
        </Card>
        <Card className="flex items-center gap-4 py-6">
           <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <MessageSquare size={20} />
           </div>
           <div>
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Messages</p>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">5 non lus</h3>
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
             data={recentOrders} 
             onRowClick={() => {}}
             emptyMessage="Aucun achat récent."
           />
        </div>

        {/* Sidebar / Filters */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-[14px] font-bold text-[var(--text-primary)] mb-4 uppercase tracking-widest">Catégories d'intérêt</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Céréales', 'Légumes', 'Fruits', 'Bétail'].map((cat) => (
                <button key={cat} className="px-3 py-2 bg-[var(--bg-muted)] rounded-lg text-[12px] font-medium text-[var(--text-secondary)] hover:bg-[var(--text-accent)]/10 hover:text-[var(--text-accent)] transition-all">
                  {cat}
                </button>
              ))}
            </div>
            <Link to="/buyer/marketplace" className="block mt-4 text-center text-[11px] font-bold text-[var(--text-accent)] uppercase tracking-widest hover:underline">
              Voir tout le catalogue
            </Link>
          </Card>

          <Card className="bg-[var(--bg-muted)]/50 border-dashed p-6 border-t-4 border-t-[var(--text-accent)]">
            <div className="flex items-center gap-2 mb-3">
               <TrendingUp size={18} className="text-[var(--text-accent)]" />
               <h3 className="text-[14px] font-bold text-[var(--text-primary)]">Offre Flash</h3>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-4">
              -10% sur les commandes groupées de maïs cette semaine !
            </p>
            <Button variant="secondary" size="md" className="w-full">
               En profiter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
