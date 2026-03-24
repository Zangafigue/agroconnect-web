import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Gavel, 
  Scale,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useDisputeStore } from '../../store/disputeStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';

const AdminDisputesPage: React.FC = () => {
  const navigate = useNavigate();
  const { disputes, fetchDisputes, loading } = useDisputeStore() as any;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('ALL');

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  const filteredDisputes = (disputes || []).filter((d: any) => {
    const matchesSearch = (d.reason || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (d._id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = filterTab === 'ALL' || d.status === filterTab;
    return matchesSearch && matchesTab;
  });

  const columns = [
    {
      header: 'Litige',
      accessor: (d: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--text-primary)]">#{d._id?.slice(-6).toUpperCase()}</span>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">
            {d.createdAt ? format(new Date(d.createdAt), 'dd MMM yyyy', { locale: fr }) : 'Récent'}
          </span>
        </div>
      ),
      isMono: true
    },
    {
      header: 'Protagonistes',
      accessor: (d: any) => (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium">{d.buyer?.name || 'Acheteur'}</span>
            <span className="text-[10px] text-[var(--btn-danger-text)] font-semibold uppercase tracking-tighter">Réclamant</span>
          </div>
          <Scale size={14} className="text-[var(--text-muted)] opacity-50" />
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-[var(--text-secondary)]">{d.seller?.name || 'Vendeur'}</span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-tighter">Défense</span>
          </div>
        </div>
      )
    },
    {
      header: 'Commande',
      accessor: (d: any) => (
        <span className="text-[12px] font-mono font-bold text-[var(--text-primary)] bg-[var(--bg-muted)] px-2 py-1 rounded border border-[var(--border-light)]">
          CMD-{d.order?.slice(-6).toUpperCase() || '??????'}
        </span>
      ),
      isMono: true
    },
    {
      header: 'Motif',
      accessor: (d: any) => (
        <p className="text-[12px] text-[var(--text-secondary)] italic max-w-[200px] truncate">
          "{d.reason || 'Non spécifié'}"
        </p>
      )
    },
    {
      header: 'Statut',
      accessor: (d: any) => (
        <StatusBadge status={d.status} />
      )
    },
    {
      header: '',
      accessor: (d: any) => (
        <div className="flex justify-end pr-2">
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Gavel size={14} />}
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/disputes/${d._id}`); }}
          >
            Arbitrer
          </Button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  const tabs = [
    { id: 'ALL', label: 'Tout', count: (disputes || []).length },
    { id: 'OUVERT', label: 'Alertes', count: (disputes || []).filter((d:any) => d.status === 'OUVERT').length },
    { id: 'EN COURS', label: 'Arbitrage', count: (disputes || []).filter((d:any) => d.status === 'EN COURS').length },
    { id: 'RÉSOLU', label: 'Apaisés', count: (disputes || []).filter((d:any) => d.status === 'RÉSOLU').length }
  ];

  return (
    <div className="space-y-6 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Tribunal des Litiges</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Arbitrage souverain et médiation des différends.</p>
        </div>
        <div className="flex gap-2">
          <Input 
            placeholder="Rechercher litige..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={16} />}
            className="w-[250px]"
          />
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[var(--bg-muted)]/50 rounded-[var(--radius-md)] w-fit border border-[var(--border-light)]">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            className={`
              px-4 py-1.5 rounded-[var(--radius-sm)] text-[12px] font-medium transition-all flex items-center gap-2
              ${filterTab === tab.id 
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm border border-[var(--border-light)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
            `}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${filterTab === tab.id ? 'bg-[var(--text-accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable 
        columns={columns} 
        data={filteredDisputes} 
        isLoading={loading}
        onRowClick={(d: any) => navigate(`/admin/disputes/${d._id}`)}
        emptyMessage="Le tribunal est vide."
      />

      {/* Stats Bento Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <Card className="flex flex-col justify-between h-32">
          <p className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Résolution moyenne</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">3.8 j</h3>
            <span className="text-[10px] text-[var(--text-accent)] font-bold bg-[var(--text-accent)]/10 px-2 py-0.5 rounded">-15%</span>
          </div>
        </Card>
        
        <Card className="bg-[var(--text-primary)] text-white border-none flex flex-col justify-between h-32">
          <p className="text-[11px] text-white/60 font-bold uppercase tracking-wider">Indice de Confiance</p>
           <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold">96.2%</h3>
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/20 border border-white/30"></div>)}
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-32 border-l-4 border-l-orange-400">
           <p className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Vigilance Logistique</p>
           <div className="space-y-1">
              <h4 className="text-[14px] font-bold text-[var(--text-primary)]">Axe Bobo-Ouaga</h4>
              <p className="text-[10px] text-orange-600 font-bold uppercase">Zone sous surveillance</p>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDisputesPage;
