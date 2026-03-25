import React, { useEffect } from 'react';
import {
  Wallet, ArrowUpRight, Lock, CheckCircle2, History, ShieldCheck, User, Download
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import DataTable from '../../components/shared/DataTable';
import { useAuthStore } from '../../store/authStore';
import { useTransporterStore } from '../../store/transporterStore';

const TransporterWalletPage: React.FC = () => {
  const { user } = useAuthStore() as any;
  const { deliveries, fetchDeliveries } = useTransporterStore() as any;

  useEffect(() => { fetchDeliveries(); }, []);

  const walletBalance = user?.walletBalance || 0;
  const walletPending = user?.walletPending || 0;

  // Build transaction list from completed deliveries
  const transactions = deliveries
    .filter((d: any) => ['DELIVERED', 'COMPLETED'].includes(d.status))
    .map((d: any) => ({
      id: `#${(d._id || d.id)?.slice(-6).toUpperCase()}`,
      buyer: d.buyer ? `${d.buyer.firstName || ''} ${d.buyer.lastName || ''}`.trim() : '—',
      amount: d.amount || d.price || 0,
      date: d.updatedAt ? new Date(d.updatedAt).toLocaleDateString('fr-FR') : '—',
      method: 'Solde Balance',
    }));

  const transactionColumns = [
    {
      header: 'Transaction',
      accessor: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          <div>
            <p className="font-bold text-[var(--text-primary)] text-[13px]">Paiement mission {row.id}</p>
            <p className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1 mt-0.5">
              <User size={11} /> {row.buyer}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Méthode',
      accessor: (row: any) => (
        <span className="px-2 py-1 bg-[var(--bg-muted)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest rounded">
          {row.method}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: (row: any) => (
        <span className="text-[12px] text-[var(--text-secondary)]">{row.date}</span>
      ),
    },
    {
      header: 'Montant',
      accessor: (row: any) => (
        <span className="font-mono font-bold text-[15px] text-green-600">+{formatFCFA(row.amount)}</span>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight mb-1">Finance</h1>
        <p className="text-[14px] text-[var(--text-secondary)]">Gérez vos revenus, commissions et retraits.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-7 border-t-4 border-[var(--text-accent)] overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Wallet size={120} className="text-[var(--text-accent)]" />
          </div>
          <div className="relative z-10 flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-[var(--text-accent)]/10 rounded-lg text-[var(--text-accent)]">
              <CheckCircle2 size={15} />
            </div>
            <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Solde disponible</span>
          </div>
          <div className="relative z-10 space-y-1">
            <p className="text-4xl font-mono font-bold text-[var(--text-accent)] tracking-tight">{formatFCFA(walletBalance)}</p>
            <p className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Prêt pour le retrait</p>
          </div>
        </Card>

        <Card className="p-7 border-t-4 border-[var(--border-light)] overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Lock size={120} className="text-[var(--text-secondary)]" />
          </div>
          <div className="relative z-10 flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-[var(--bg-muted)] rounded-lg text-[var(--text-secondary)]">
              <ShieldCheck size={15} />
            </div>
            <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">En attente</span>
          </div>
          <div className="relative z-10 space-y-3">
            <p className="text-4xl font-mono font-bold text-[var(--text-primary)] opacity-80 tracking-tight">{formatFCFA(walletPending)}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-muted)]/50 rounded-lg border border-[var(--border-light)]">
              <ShieldCheck size={12} className="text-[var(--text-secondary)]" />
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Fonds sécurisés par escrow</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Withdraw CTA */}
      <Card className="p-6 bg-[var(--bg-muted)]/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Transférer mes fonds</h3>
          <p className="text-[13px] text-[var(--text-secondary)]">Choisissez votre mode de retrait (Mobile Money ou virement).</p>
        </div>
        <Button variant="primary" size="md" className="w-full md:w-auto" icon={<ArrowUpRight size={16} />} iconPosition="right">
          Retirer les fonds
        </Button>
      </Card>

      {/* Transaction History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] flex items-center gap-2">
            <History size={18} className="text-[var(--text-accent)]" /> Historique récent
          </h2>
          <Button variant="ghost" size="sm" icon={<Download size={13} />}>Télécharger (PDF)</Button>
        </div>
        <Card className="p-0 overflow-hidden">
          <DataTable
            columns={transactionColumns}
            data={transactions}
            emptyMessage="Aucune transaction pour le moment. Effectuez des livraisons pour voir votre historique."
          />
        </Card>
      </div>
    </div>
  );
};

export default TransporterWalletPage;
