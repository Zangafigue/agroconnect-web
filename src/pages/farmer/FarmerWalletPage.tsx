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
  const { orders, fetchUserOrders, loading } = useOrderStore() as any;
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('OM');

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

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
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.status === 'DELIVERED' ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
            <Plus size={14} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-on-surface">#{tx._id?.slice(-8).toUpperCase()}</span>
            <span className="text-[10px] text-on-surface-variant font-mono uppercase">Vente de stock</span>
          </div>
        </div>
      )
    },
    {
      header: 'Date',
      accessor: (tx: any) => (
        <span className="text-sm font-medium text-on-surface-variant">
          {format(new Date(tx.createdAt), 'dd MMM yyyy', { locale: fr })}
        </span>
      )
    },
    {
      header: 'Montant Net',
      accessor: (tx: any) => (
        <span className="font-mono font-bold text-on-surface">
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
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif-display text-on-surface tracking-tight mb-2">Mon Trésor Agricole</h1>
          <p className="text-sm text-on-surface-variant font-medium">Suivez vos revenus en temps réel et gérez vos extractions de fonds.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-on-surface text-surface rounded-2xl border border-outline-variant/10 shadow-xl">
           <ShieldCheck size={18} className="text-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Fonds Sécurisés</span>
        </div>
      </header>

      {/* Main Balances */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-8 bg-on-surface text-surface border-none relative overflow-hidden group col-span-1 md:col-span-2">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/10 rounded-2xl">
                   <Wallet size={24} className="text-primary" />
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Solde Dispo</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-5xl font-mono font-bold tracking-tighter">{formatFCFA(availableBalance)}</h3>
                <p className="text-[10px] font-bold text-green-400 flex items-center gap-1.5">
                   <Zap size={12} className="fill-current" />
                   RÉACTIF POUR TRANSFERT IMMÉDIAT
                </p>
              </div>
           </div>
           <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        </Card>

        <Card className="p-8 bg-surface-container border-outline-variant/5 flex flex-col justify-between">
           <div className="flex items-center justify-between opacity-60">
             <div className="p-3 bg-on-surface/5 rounded-2xl">
                <Clock size={24} className="text-on-surface" />
             </div>
             <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">En Séquestre</span>
           </div>
           <div className="space-y-1">
             <h3 className="text-3xl font-mono font-bold text-on-surface/60">{formatFCFA(escrowBalance)}</h3>
             <p className="text-[10px] font-bold text-on-surface-variant italic opacity-60">Libéré après validation client</p>
           </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ledger Section */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-serif-display font-bold text-on-surface">Registre de Trésorerie</h2>
            <Button variant="ghost" size="sm" className="font-bold text-primary flex gap-2">
               <Download size={16} /> Exporter XLS
            </Button>
          </div>
          <Card className="p-0 overflow-hidden">
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
           <Card className="p-8 bg-surface-container border-none shadow-xl xl:sticky xl:top-8">
              <div className="space-y-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                       <ArrowUpRight size={20} />
                    </div>
                    <div>
                       <h3 className="text-lg font-serif-display font-bold">Transfert Express</h3>
                       <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Vers votre numéro lié</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <Input 
                      label="Montant à transférer"
                      type="number"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      placeholder="50 000"
                      className="text-2xl font-mono font-bold"
                    />

                    <div className="space-y-3">
                       <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">Opérateur de réception</p>
                       <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => setSelectedMethod('OM')}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'OM' ? 'border-primary bg-primary/5' : 'border-outline-variant/10 bg-surface hover:border-primary/30'}`}
                          >
                             <div className="w-10 h-10 bg-[#FF6600] rounded-xl flex items-center justify-center font-black text-white text-xs shadow-md shadow-orange-500/20">OM</div>
                             <span className="text-[10px] font-black uppercase text-on-surface tracking-widest">Orange</span>
                          </button>
                          <button 
                            onClick={() => setSelectedMethod('MOOV')}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'MOOV' ? 'border-primary bg-primary/5' : 'border-outline-variant/10 bg-surface hover:border-primary/30'}`}
                          >
                             <div className="w-10 h-10 bg-[#004A99] rounded-xl flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20">MOOV</div>
                             <span className="text-[10px] font-black uppercase text-on-surface tracking-widest">Moov</span>
                          </button>
                       </div>
                    </div>

                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full font-bold shadow-2xl shadow-primary/20 flex justify-between py-6"
                      onClick={handleWithdraw}
                    >
                      <span>Initier le transfert</span>
                      <ArrowRight size={20} />
                    </Button>
                    <div className="flex items-center justify-center gap-2 opacity-40">
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
