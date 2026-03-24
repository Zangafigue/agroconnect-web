import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  Lock, 
  CheckCircle2, 
  History,
  ShieldCheck,
  User,
  Download
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import DataTable from '../../components/shared/DataTable';

const TransporterWalletPage: React.FC = () => {
  const transactionColumns = [
    {
      header: 'Transaction',
      accessor: (row: any) => (
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-secondary)]">
               <CheckCircle2 size={18} className="text-green-500" />
            </div>
            <div>
               <p className="font-bold text-[var(--text-primary)] text-[14px]">
                  Paiement mission {row.id}
               </p>
               <p className="text-[11px] font-bold text-[var(--text-secondary)] flex items-center gap-1 mt-0.5">
                  <User size={12} /> Acheteur: {row.buyer}
               </p>
            </div>
         </div>
      )
    },
    {
      header: 'Méthode',
      accessor: (row: any) => (
         <span className="px-2 py-1 bg-[var(--bg-muted)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest rounded">
            {row.method}
         </span>
      )
    },
    {
      header: 'Date',
      accessor: (row: any) => (
         <span className="text-[12px] text-[var(--text-secondary)] uppercase tracking-wider">{row.date}</span>
      )
    },
    {
      header: 'Montant',
      accessor: (row: any) => (
         <span className="font-mono font-bold text-[16px] text-[var(--text-primary)]">+{formatFCFA(row.amount)}</span>
      ),
      className: 'text-right'
    }
  ];

  const transactionData = [
    { id: '#TR-041', buyer: 'Fatima T.', amount: 10000, date: 'Hier, 14:30', method: 'Orange Money' },
    { id: '#TR-039', buyer: 'Moussa B.', amount: 7500, date: '12 Oct 2024', method: 'Solde Balance' },
    { id: '#TR-038', buyer: "Société Graine d'Or", amount: 15000, date: '10 Oct 2024', method: 'Virement' }
  ];

  return (
    <div className="space-y-8 pb-12 font-body max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Finance</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Gérez vos revenus de transport, suivez vos commissions et effectuez vos retraits.</p>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-t-4 border-[var(--text-accent)] overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <Wallet size={120} className="text-[var(--text-accent)]" />
           </div>
           
           <div className="relative z-10 flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-[var(--text-accent)]/10 rounded-lg text-[var(--text-accent)]">
                 <CheckCircle2 size={16} />
              </div>
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Solde disponible</span>
           </div>
           
           <div className="relative z-10 space-y-2">
             <p className="text-5xl font-mono font-bold text-[var(--text-accent)] tracking-tight">{formatFCFA(25000)}</p>
             <p className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Prêt pour le retrait</p>
           </div>
        </Card>

        <Card className="p-8 border-t-4 border-[var(--border-light)] overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <Lock size={120} className="text-[var(--text-secondary)]" />
           </div>
           
           <div className="relative z-10 flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-[var(--bg-muted)] rounded-lg text-[var(--text-secondary)]">
                 <ShieldCheck size={16} />
              </div>
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">En attente de libération</span>
           </div>
           
           <div className="relative z-10 space-y-4">
             <p className="text-4xl font-mono font-bold text-[var(--text-primary)] opacity-80 tracking-tight">{formatFCFA(37500)}</p>
             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-muted)]/50 rounded-lg border border-[var(--border-light)]">
                <ShieldCheck size={14} className="text-[var(--text-secondary)]" />
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Fonds sécurisés par escrow</span>
             </div>
           </div>
        </Card>
      </div>

      {/* Main Action */}
      <Card className="p-8 bg-[var(--bg-muted)]/30 border border-[var(--border-light)] flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Transférer mes fonds</h3>
            <p className="text-[14px] text-[var(--text-secondary)]">Choisissez votre mode de retrait (Mobile Money ou Virement).</p>
         </div>
         <Button variant="primary" size="lg" className="w-full md:w-auto px-10" icon={<ArrowUpRight size={18} />} iconPosition="right">
           Retirer les fonds
         </Button>
      </Card>

      {/* Historique */}
      <div className="pt-8">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] flex items-center gap-3">
               <History size={24} className="text-[var(--text-accent)]" /> Historique récent
            </h2>
            <Button variant="ghost" size="sm" icon={<Download size={14} />}>Télécharger (PDF)</Button>
         </div>
         
         <Card className="p-0 overflow-hidden">
            <DataTable 
               columns={transactionColumns}
               data={transactionData}
               emptyMessage="Aucune transaction."
            />
            <div className="p-4 bg-[var(--bg-muted)]/30 text-center border-t border-[var(--border-light)]">
               <Button variant="ghost" size="sm">Voir tout l'historique</Button>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default TransporterWalletPage;
