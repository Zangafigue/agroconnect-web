import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Eye, 
  Gavel,
  ArrowRight
} from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';

const AdminOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, fetchOrders, loading } = useOrderStore() as any;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((o: any) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (o._id || '').toLowerCase().includes(searchLower) || 
                          (o.buyer?.firstName || '').toLowerCase().includes(searchLower) ||
                          (o.seller?.name || '').toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: 'Référence',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--text-primary)]">#{o._id?.slice(-8).toUpperCase()}</span>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">{new Date(o.createdAt).toLocaleDateString()}</span>
        </div>
      ),
      isMono: true
    },
    {
      header: 'Flux Transactionnel',
      accessor: (o: any) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium">{o.buyer?.firstName || 'Acheteur'}</span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-tighter">Acheteur</span>
          </div>
          <ArrowRight size={12} className="text-[var(--text-muted)]" />
          <div className="flex flex-col">
            <span className="text-[13px] font-medium">{o.seller?.name || 'Vendeur'}</span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-tighter">Vendeur</span>
          </div>
        </div>
      )
    },
    {
      header: 'Montant',
      accessor: (o: any) => (
        <span className="font-bold">{formatFCFA(o.totalAmount || o.price)}</span>
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
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 min-w-0"
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/orders/${o._id}`); }}
          >
            <Eye size={16} />
          </Button>
          {o.status === 'DISPUTED' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 min-w-0 text-[var(--btn-danger-text)] hover:bg-[var(--badge-dispute-bg)]"
              onClick={(e) => { e.stopPropagation(); navigate(`/admin/disputes/${o._id}`); }}
            >
              <Gavel size={16} />
            </Button>
          )}
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Registre des Flux</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Supervisez le flux transactionnel national et la logistique.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" size="md" icon={<Download size={16} />}>
              Exporter Rapport
           </Button>
        </div>
      </header>

      {/* Toolbar */}
      <Card className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input 
            placeholder="Référence, acheteur ou vendeur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-[36px] px-3 bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] rounded-[var(--radius-md)] text-[13px] outline-none focus:border-[var(--input-border-focus)] transition-all min-w-[150px]"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="CONFIRMED">Confirmée</option>
            <option value="SHIPPED">En route</option>
            <option value="DELIVERED">Livrée</option>
            <option value="CANCELLED">Annulée</option>
            <option value="DISPUTED">En litige</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-[12px] font-medium text-[var(--text-secondary)]">
            Total : <span className="text-[var(--text-primary)]">{filteredOrders.length} ordres</span>
          </p>
        </div>
        <DataTable 
          columns={columns} 
          data={filteredOrders} 
          isLoading={loading}
          onRowClick={(o: any) => navigate(`/admin/orders/${o._id}`)}
          emptyMessage="Aucune commande enregistrée."
        />
      </section>
    </div>
  );
};

export default AdminOrdersPage;
