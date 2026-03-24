import React, { useEffect, useState } from 'react';
import { 
  Wallet, 
  Landmark, 
  Download, 
  Search,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { formatFCFA } from '../../utils/currency';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';

const AdminPaymentsPage: React.FC = () => {
  const { payments, fetchPayments, stats, fetchStats, loading } = useAdminStore() as any;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, [fetchPayments, fetchStats]);

  const filteredPayments = (payments || []).filter((tx: any) => {
    const searchLower = searchTerm.toLowerCase();
    return (tx._id || '').toLowerCase().includes(searchLower) || 
           (tx.description || '').toLowerCase().includes(searchLower) ||
           (tx.recipient || '').toLowerCase().includes(searchLower);
  });

  const columns = [
    {
      header: 'Référence',
      accessor: (tx: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--text-primary)]">#{tx._id?.slice(-8).toUpperCase()}</span>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">TX-ID</span>
        </div>
      ),
      isMono: true
    },
    {
      header: 'Nature / Bénéficiaire',
      accessor: (tx: any) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'REFUND' || tx.type === 'DEBIT' ? 'bg-red-500/10 text-red-500' : 'bg-[var(--text-accent)]/10 text-[var(--text-accent)]'}`}>
            <span className="material-symbols-outlined text-[18px]">
              {tx.type === 'REFUND' || tx.type === 'DEBIT' ? 'arrow_outward' : 'arrow_downward'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-medium">{tx.description || 'Transfert de fonds'}</span>
            <span className="text-[11px] text-[var(--text-muted)]">{tx.recipient || 'Partenaire Agro'}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Horodatage',
      accessor: (tx: any) => (
        <div className="flex flex-col">
          <span className="text-[12px] font-medium">{tx.createdAt ? format(new Date(tx.createdAt), 'dd MMM yyyy', { locale: fr }) : '-'}</span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">{tx.createdAt ? format(new Date(tx.createdAt), 'HH:mm', { locale: fr }) : '-'}</span>
        </div>
      ),
      isMono: true
    },
    {
      header: 'Montant Net',
      accessor: (tx: any) => (
        <span className={`font-bold ${tx.type === 'REFUND' || tx.type === 'DEBIT' ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>
          {tx.type === 'REFUND' || tx.type === 'DEBIT' ? '-' : '+'}{formatFCFA(tx.amount || 0)}
        </span>
      ),
      isMono: true,
      className: 'text-right'
    },
    {
      header: 'Statut',
      accessor: (tx: any) => (
        <StatusBadge status={tx.status || 'EN ATTENTE'} />
      ),
      className: 'text-center'
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono">Synchronisation du Grand Livre...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Flux Financiers</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Supervision souveraine des transactions et séquestres.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="md" icon={<Download size={16} />}>
            Télécharger XLS
          </Button>
        </div>
      </header>

      {/* Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <p className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Séquestre (Escrow)</p>
            <div className="w-8 h-8 rounded-lg bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center">
              <Wallet size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-1">{formatFCFA(stats?.escrowBalance || 0)}</h3>
            <span className="text-[10px] text-[var(--text-accent)] font-bold uppercase tracking-widest">Fonds Sécurisés</span>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-40">
           <div className="flex justify-between items-start">
            <p className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Revenus Net</p>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-1">{formatFCFA(stats?.netRevenue || 0)}</h3>
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">+12.4% ce mois</span>
          </div>
        </Card>

        <Card className="bg-[var(--text-primary)] text-white border-none flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[11px] text-white/60 font-bold uppercase tracking-wider">Prochain Décaissement</p>
            <h3 className="text-2xl font-bold mt-2">{formatFCFA(stats?.nextPayout || 0)}</h3>
          </div>
          <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20 relative z-10">
            Accélérer virement
          </Button>
          <div className="absolute -bottom-6 -right-6 text-white/5 group-hover:scale-110 transition-transform">
             <Landmark size={120} />
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input 
            placeholder="Rechercher une transaction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <Button variant="secondary" size="md" icon={<span className="material-symbols-outlined">filter_list</span>}>Filtres</Button>
        </div>
      </Card>

      {/* Table */}
      <DataTable 
        columns={columns} 
        data={filteredPayments} 
        isLoading={loading}
        emptyMessage="Aucune transaction répertoriée."
      />

      {/* Audit Banner */}
      <Card className="bg-[var(--bg-muted)]/30 border-dashed border-2 flex flex-col md:flex-row items-center gap-6 p-8">
         <div className="w-12 h-12 rounded-xl bg-[var(--text-secondary)]/10 flex items-center justify-center text-[var(--text-secondary)]">
            <ShieldCheck size={24} />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-[16px] font-bold text-[var(--text-primary)] mb-1">Integrité Comptable</h4>
            <p className="text-[13px] text-[var(--text-secondary)] max-w-3xl">
              Les transactions sont certifiées par le réseau AgroConnect. Le grand livre est synchronisé toutes les 6 heures au niveau national.
            </p>
         </div>
         <Button variant="secondary" size="md" icon={<ArrowRight size={16} />} iconPosition="right">Lancer audit</Button>
      </Card>
    </div>
  );
};

export default AdminPaymentsPage;
