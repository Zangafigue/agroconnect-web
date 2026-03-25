import React, { useEffect, useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck,
  Zap,
  Download,
  Smartphone,
  Plus,
  ArrowRight,
  ChevronRight
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
import toast from 'react-hot-toast';

const FarmerWalletPage: React.FC = () => {
  const { orders, fetchOrders, loading } = useOrderStore() as any;
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('OM');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Financial calculations
  const availableBalance = (orders || [])
    .filter((o: any) => o.status === 'DELIVERED')
    .reduce((sum: number, o: any) => sum + (o.totalAmount || 0) * 0.97, 0);

  const escrowBalance = (orders || [])
    .filter((o: any) => ['CONFIRMED', 'SHIPPED'].includes(o.status))
    .reduce((sum: number, o: any) => sum + (o.totalAmount || 0) * 0.97, 0);

  const transactions = (orders || [])
    .filter((o: any) => ['CONFIRMED', 'SHIPPED', 'DELIVERED'].includes(o.status))
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleWithdraw = () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
       toast.error('Veuillez saisir un montant valide.');
       return;
    }
    if (parseFloat(withdrawalAmount) > availableBalance) {
       toast.error('Solde insuffisant.');
       return;
    }
    toast.success(`Demande de retrait de ${formatFCFA(parseFloat(withdrawalAmount))} envoyée.`);
    setWithdrawalAmount('');
  };

  const columns = [
    {
      header: 'Référence',
      accessor: (tx: any) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.status === 'DELIVERED' ? 'bg-[var(--text-accent)]/10 text-[var(--text-accent)]' : 'bg-[var(--bg-muted)] text-[var(--text-secondary)]'}`}>
            <Plus size={14} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[var(--text-primary)]">#{tx._id?.slice(-8).toUpperCase()}</span>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Vente de stock</span>
          </div>
        </div>
      )
    },
    {
      header: 'Date',
      accessor: (tx: any) => (
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {format(new Date(tx.createdAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      )
    },
    {
      header: 'Montant Net',
      accessor: (tx: any) => (
        <span className="font-mono font-bold text-[var(--text-primary)]">
          {formatFCFA(tx.totalAmount * 0.97)}
        </span>
      ),
      isMono: true
    },
    {
      header: 'Statut',
      accessor: (tx: any) => (
        <StatusBadge status={tx.status === 'DELIVERED' ? 'COMPLÉTÉ' : 'SÉQUESTRE'} />
      )
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-display text-[var(--text-primary)] tracking-tight mb-2">Mon Trésor Agricole</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Suivez vos revenus en temps réel et gérez vos extractions de fonds.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 text-white rounded-2xl border border-[var(--border-light)] shadow-xl">
           <ShieldCheck size={18} className="text-[var(--text-accent)]" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Fonds Sécurisés</span>
        </div>
      </header>

      {/* Main Balances */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-8 bg-slate-800 text-white border-none relative overflow-hidden group col-span-1 md:col-span-2 transition-colors duration-500">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/10 rounded-2xl">
                   <Wallet size={24} className="text-[var(--text-accent)]" />
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Solde Dispo</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-5xl font-mono font-bold tracking-tighter">{formatFCFA(availableBalance)}</h3>
                <p className="text-[10px] font-bold text-[var(--green-500)] flex items-center gap-1.5">
                   <Zap size={12} className="fill-current" />
                   RÉACTIF POUR TRANSFERT IMMÉDIAT
                </p>
              </div>
           </div>
           <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--text-accent)]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        </Card>

        <Card className="p-8 bg-[var(--bg-muted)] border-[var(--border-light)] flex flex-col justify-between">
           <div className="flex items-center justify-between opacity-60">
             <div className="p-3 bg-[var(--text-primary)]/5 rounded-2xl">
                <Clock size={24} className="text-[var(--text-primary)]" />
             </div>
             <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">En Séquestre</span>
           </div>
           <div className="space-y-1">
             <h3 className="text-3xl font-mono font-bold text-[var(--text-primary)]/60">{formatFCFA(escrowBalance)}</h3>
             <p className="text-[10px] font-bold text-[var(--text-secondary)] italic opacity-60">Libéré après validation client</p>
           </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ledger Section */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-display font-bold text-[var(--text-primary)]">Registre de Trésorerie</h2>
            <Button variant="ghost" size="sm" className="font-bold text-[var(--text-accent)] flex gap-2">
               <Download size={16} /> Exporter XLS
            </Button>
          </div>
          <Card className="p-0 overflow-hidden border-[var(--border-light)]">
            <DataTable 
              columns={columns} 
              data={transactions} 
              isLoading={loading}
              emptyMessage="Aucun mouvement financier répertorié."
            />
          </Card>
        </div>

        {/* Withdrawal Widget */}
        <div className="lg:col-span-12 xl:col-span-5">
           <Card className="p-8 bg-[var(--bg-muted)] border-none shadow-xl xl:sticky xl:top-8">
              <div className="space-y-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--text-accent)] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[var(--text-accent)]/20">
                       <ArrowUpRight size={20} />
                    </div>
                    <div>
                       <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">Transfert Express</h3>
                       <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-60">Vers votre numéro lié</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <Input 
                      label="Montant à transférer"
                      type="number"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      placeholder="50 000"
                      className="text-2xl font-mono font-bold bg-[var(--bg-surface)]"
                    />

                    <div className="space-y-3">
                       <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Opérateur de réception</p>
                       <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => setSelectedMethod('OM')}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'OM' ? 'border-[var(--text-accent)] bg-[var(--text-accent)]/5' : 'border-[var(--border-light)] bg-[var(--bg-surface)] hover:border-[var(--text-accent)]/30'}`}
                          >
                             <div className="w-10 h-10 bg-[#FF6600] rounded-xl flex items-center justify-center font-black text-white text-xs shadow-md shadow-orange-500/20">OM</div>
                             <span className="text-[10px] font-black uppercase text-[var(--text-primary)] tracking-widest">Orange</span>
                          </button>
                          <button 
                            onClick={() => setSelectedMethod('MOOV')}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'MOOV' ? 'border-[var(--text-accent)] bg-[var(--text-accent)]/5' : 'border-[var(--border-light)] bg-[var(--bg-surface)] hover:border-[var(--text-accent)]/30'}`}
                          >
                             <div className="w-10 h-10 bg-[#004A99] rounded-xl flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20">MOOV</div>
                             <span className="text-[10px] font-black uppercase text-[var(--text-primary)] tracking-widest">Moov</span>
                          </button>
                       </div>
                    </div>

                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full font-bold shadow-2xl shadow-[var(--text-accent)]/20 flex justify-between py-6"
                      onClick={handleWithdraw}
                    >
                      <span>Initier le transfert</span>
                      <ArrowRight size={20} />
                    </Button>
                    <div className="flex items-center justify-center gap-2 opacity-40 text-[var(--text-primary)]">
                       <ShieldCheck size={12} />
                       <span className="text-[10px] font-bold italic">Transaction cryptée et sécurisée</span>
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerWalletPage;
