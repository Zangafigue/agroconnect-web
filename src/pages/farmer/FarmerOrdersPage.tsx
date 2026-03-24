import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight,
  Package,
  TrendingUp,
  Download,
  Filter,
  Users
} from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { formatFCFA } from '../../utils/currency';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';
import Avatar from '../../components/shared/Avatar';

const FarmerOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, fetchUserOrders, loading } = useOrderStore() as any;
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const filteredOrders = (orders || []).filter((o: any) => {
    const matchesFilter = filter === 'all' || o.status === filter;
    const matchesSearch = (o._id || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (o.buyer?.firstName || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const columns = [
    {
      header: 'Commande',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-on-surface">#{o._id?.slice(-8).toUpperCase()}</span>
          <span className="text-[10px] text-on-surface-variant font-mono uppercase">
            {o.createdAt ? format(new Date(o.createdAt), 'dd MMM yyyy', { locale: fr }) : '-'}
          </span>
        </div>
      ),
      isMono: true
    },
    {
      header: 'Acheteur',
      accessor: (o: any) => (
        <div className="flex items-center gap-3">
           <Avatar name={o.buyer?.firstName || 'P'} size="sm" role="BUYER" />
           <span className="text-[13px] font-bold text-on-surface">{o.buyer?.firstName || 'Partenaire'}</span>
        </div>
      )
    },
    {
      header: 'Produit(s)',
      accessor: (o: any) => (
        <span className="text-[12px] text-on-surface-variant font-medium truncate max-w-[180px] block">
          {o.items?.[0]?.product?.name || 'Lot agricole'} {o.items?.length > 1 ? `(+${o.items.length - 1})` : ''}
        </span>
      )
    },
    {
      header: 'Total Net',
      accessor: (o: any) => (
        <span className="font-mono font-bold text-primary">{formatFCFA(o.totalAmount || 0)}</span>
      ),
      isMono: true
    },
    {
      header: 'État',
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

  const pendingOrders = (orders || []).filter((o: any) => ['PENDING', 'CONFIRMED'].includes(o.status));
  const totalVolume = (orders || []).reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif-display text-on-surface tracking-tight mb-2">Ventes & Expéditions</h1>
          <p className="text-sm text-on-surface-variant font-medium">Suivez l'acheminement de vos produits vers vos clients.</p>
        </div>
        <Button variant="secondary" size="md" icon={<Download size={18} />}>
          Exporter XLS
        </Button>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-5 p-6 border-l-4 border-l-orange-500">
           <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
              <Package size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">À expédier</p>
              <h3 className="text-xl font-bold text-on-surface">{pendingOrders.length} commandes en attente</h3>
           </div>
        </Card>
        
        <Card className="flex items-center gap-5 p-6 border-l-4 border-l-primary">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <TrendingUp size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Chiffre d'affaires</p>
              <h3 className="text-xl font-bold text-on-surface">{formatFCFA(totalVolume)}</h3>
           </div>
        </Card>

        <Card className="bg-surface-container-low border-dashed border-2 flex items-center gap-5 p-6">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-surface-container flex items-center justify-center shadow-sm overflow-hidden">
                    <Avatar name={`U${i}`} size="sm" role="BUYER" />
                 </div>
               ))}
               <div className="w-10 h-10 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center text-[10px] font-bold z-10 shadow-sm">
                  +12
               </div>
            </div>
            <div>
               <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Base Clients</p>
               <h3 className="text-sm font-bold text-on-surface">Clients récurrents</h3>
            </div>
        </Card>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input 
            placeholder="Rechercher par n° de commande ou nom client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
            className="bg-white border-outline-variant/20 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-2xl border border-outline-variant/10 text-on-surface-variant">
            <Filter size={14} className="opacity-50" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none cursor-pointer pr-4"
            >
              <option value="all">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="CONFIRMED">Confirmées</option>
              <option value="SHIPPED">Expédiées</option>
              <option value="DELIVERED">Livrées</option>
              <option value="CANCELLED">Annulées</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="space-y-4">
        <DataTable 
          columns={columns} 
          data={filteredOrders} 
          isLoading={loading}
          onRowClick={(o: any) => navigate(`/farmer/orders/${o._id}`)}
          emptyMessage="Aucune commande trouvée dans votre historique."
        />
      </div>

    </div>
  );
};

export default FarmerOrdersPage;
