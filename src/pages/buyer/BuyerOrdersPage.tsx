import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  MessageSquare, 
  Search,
  ArrowRight,
  Filter,
  CreditCard
} from 'lucide-react';
import { useBuyerStore } from '../../store/buyerStore';
import orderService from '../../services/orderService';
import { formatFCFA } from '../../utils/currency';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import Input from '../../components/shared/Input';

const BuyerOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const { activeOrders, fetchDashboardData, loading } = useBuyerStore() as any;

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handlePayment = async (id: string) => {
    try {
      await orderService.payOrder(id);
      toast.success("Paiement effectué avec succès !");
      fetchDashboardData();
    } catch (error) {
      toast.error("Échec du paiement.");
    }
  };

  const filteredOrders = (activeOrders || []).filter((o: any) => {
    if (activeTab === 'ALL') return true;
    return o.status === activeTab;
  });

  const columns = [
    {
      header: 'Référence',
      accessor: (o: any) => (
        <span className="font-bold text-[var(--text-primary)]">#{o.id || o._id?.slice(-8).toUpperCase()}</span>
      ),
      isMono: true
    },
    {
      header: 'Produit & Quantité',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[var(--text-primary)]">{o.product || o.items?.[0]?.product?.name || 'Produit inconnu'}</span>
          <span className="text-[11px] text-[var(--text-secondary)]">{o.qty || '1 Lot'}</span>
        </div>
      )
    },
    {
      header: 'Producteur',
      accessor: (o: any) => <span className="text-[13px] font-medium text-[var(--text-primary)]">{o.seller || o.farmer?.firstName || 'Agriculteur'}</span>
    },
    {
      header: 'Total',
      accessor: (o: any) => (
        <span className="font-bold font-mono text-[var(--text-accent)]">{formatFCFA(o.price || o.amount || o.totalAmount || 0)}</span>
      )
    },
    {
      header: 'Date',
      accessor: (o: any) => <span className="text-[12px] text-[var(--text-secondary)] font-mono uppercase">{o.date || format(new Date(), 'dd MMM yyyy', { locale: fr })}</span>
    },
    {
      header: 'Statut',
      accessor: (o: any) => <StatusBadge status={o.status} />,
      className: 'text-center'
    },
    {
      header: '',
      accessor: (o: any) => (
        <div className="flex justify-end gap-2 items-center">
           {o.status === 'CONFIRMED' && o.transporter && (
             <Button 
               variant="primary" 
               size="sm" 
               className="text-[10px] uppercase font-bold tracking-widest bg-blue-600 hover:bg-blue-700 h-8"
               onClick={(e) => { e.stopPropagation(); handlePayment(o._id); }}
             >
               Payer
             </Button>
           )}
           <Button variant="ghost" size="sm" className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-accent)]"><MessageSquare size={14} /></Button>
           <Button variant="ghost" size="sm" className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-accent)]"><ArrowRight size={14} /></Button>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'ALL', label: 'Toutes', icon: Package },
    { id: 'PENDING', label: 'En attente', icon: Clock },
    { id: 'SHIPPED', label: 'En livraison', icon: Truck },
    { id: 'DELIVERED', label: 'Livrées', icon: CheckCircle2 }
  ];

  return (
    <div className="space-y-8 pb-12 font-body animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Mes Commandes</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Suivez l'état de vos approvisionnements et gérez vos réceptions.</p>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {tabs.map((tab) => (
           <Card 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`p-4 cursor-pointer transition-all border-b-2 ${activeTab === tab.id ? 'border-b-[var(--text-accent)] bg-[var(--text-accent)]/5' : 'border-b-transparent hover:bg-[var(--bg-muted)]/50'}`}
           >
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-secondary)]'}`}>
                    <tab.icon size={16} />
                 </div>
                 <span className={`text-[12px] font-bold uppercase tracking-wider ${activeTab === tab.id ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'}`}>
                    {tab.label}
                 </span>
              </div>
           </Card>
         ))}
      </div>

      <Card className="p-0 overflow-hidden border-[var(--border-light)]">
        <div className="p-4 border-b border-[var(--border-light)] flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--bg-muted)]/30">
           <div className="flex-1 w-full md:max-w-md">
              <Input 
                placeholder="Rechercher par référence ou produit..." 
                icon={<Search size={16} />}
                className="py-2 bg-[var(--bg-surface)] border-[var(--border-light)]"
              />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-[var(--text-secondary)] font-bold" icon={<Filter size={14} />}>Filtres avancés</Button>
           </div>
        </div>
        <DataTable 
          columns={columns} 
          data={filteredOrders} 
          isLoading={loading}
          onRowClick={() => {}}
          emptyMessage="Aucune commande correspondante."
        />
      </Card>
    </div>
  );
};

export default BuyerOrdersPage;
