import React, { useState } from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  MessageSquare, 
  XCircle, 
  Search,
  ArrowRight,
  Filter
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import Input from '../../components/shared/Input';

const BuyerOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const orders = [
    { id: 'CMD-045', product: 'Maïs sec de Bobo', qty: '10 sacs (500kg)', producer: 'Amadou Kaboré', total: 50000, date: '24 Oct. 2024', status: 'PENDING' },
    { id: 'CMD-042', product: 'Oignons Galmi', qty: '2 sacs (100kg)', producer: 'Zalissa Traoré', total: 30000, date: '20 Oct. 2024', status: 'SHIPPED' },
    { id: 'CMD-040', product: 'Pommes de terre', qty: '50kg', producer: 'Saliou Diallo', total: 15000, date: '15 Oct. 2024', status: 'DELIVERED' }
  ];

  const columns = [
    {
      header: 'Référence',
      accessor: (o: any) => (
        <span className="font-bold text-[var(--text-primary)]">#{o.id}</span>
      ),
      isMono: true
    },
    {
      header: 'Produit & Quantité',
      accessor: (o: any) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[var(--text-primary)]">{o.product}</span>
          <span className="text-[11px] text-[var(--text-secondary)]">{o.qty}</span>
        </div>
      )
    },
    {
      header: 'Producteur',
      accessor: (o: any) => <span className="text-[13px]">{o.producer}</span>
    },
    {
      header: 'Total',
      accessor: (o: any) => (
        <span className="font-bold font-mono text-[var(--text-primary)]">{formatFCFA(o.total)}</span>
      )
    },
    {
      header: 'Date',
      accessor: (o: any) => <span className="text-[12px] text-[var(--text-secondary)]">{o.date}</span>
    },
    {
      header: 'Statut',
      accessor: (o: any) => <StatusBadge status={o.status} />,
      className: 'text-center'
    },
    {
      header: '',
      accessor: (o: any) => (
        <div className="flex justify-end gap-2">
           <Button variant="ghost" size="sm" className="p-1.5"><MessageSquare size={14} /></Button>
           <Button variant="ghost" size="sm" className="p-1.5"><ArrowRight size={14} /></Button>
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
    <div className="space-y-8 pb-12 font-body">
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

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[var(--border-light)] flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--bg-muted)]/10">
           <div className="flex-1 w-full md:max-w-md">
              <Input 
                placeholder="Rechercher par référence ou produit..." 
                icon={<Search size={16} />}
                className="py-2"
              />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" icon={<Filter size={14} />}>Filtres avancés</Button>
           </div>
        </div>
        <DataTable 
          columns={columns} 
          data={orders} 
          onRowClick={() => {}}
          emptyMessage="Aucune commande correspondante."
        />
      </Card>
    </div>
  );
};

export default BuyerOrdersPage;
