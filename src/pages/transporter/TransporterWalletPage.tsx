import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  Lock, 
  CheckCircle2, 
  Clock, 
  ArrowDownLeft, 
  CreditCard, 
  Smartphone, 
  History,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  User
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const TransporterWalletPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto min-h-screen animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-3 mb-12">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface flex items-center gap-6">
          <Wallet size={50} className="text-primary" />
          Finance
        </h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Gérez vos revenus de transport, suivez vos commissions et effectuez vos retraits en toute sécurité.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Available Balance */}
        <div className="bg-surface-container-lowest border-l-[12px] border-primary p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Wallet size={150} className="text-primary" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                 <CheckCircle2 size={18} />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Solde disponible</span>
            </div>
            <div className="space-y-1">
              <p className="text-6xl font-mono font-black text-primary tracking-tight">{formatFCFA(25000)}</p>
              <p className="text-xs font-bold text-outline uppercase tracking-widest mt-4">Prêt pour le retrait immediat</p>
            </div>
          </div>
        </div>

        {/* Pending Balance */}
        <div className="bg-surface-container-lowest border-l-[12px] border-tertiary p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden grayscale hover:grayscale-0">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Lock size={150} className="text-tertiary" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-tertiary/10 rounded-xl text-tertiary">
                 <Clock size={18} />
              </div>
              <span className="text-[10px] font-black text-tertiary uppercase tracking-[0.2em]">En attente de libération</span>
            </div>
            <div className="space-y-4">
              <p className="text-5xl font-mono font-black text-on-surface tracking-tight opacity-80">{formatFCFA(37500)}</p>
              <div className="px-6 py-3 bg-tertiary/5 rounded-2xl border border-tertiary/10 inline-flex items-center gap-3">
                 <ShieldCheck size={16} className="text-tertiary" />
                 <span className="text-[10px] font-black text-tertiary uppercase tracking-widest">Fonds sécurisés par escrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action M3 */}
      <div className="bg-surface-container-low rounded-[3rem] p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-10 border border-outline-variant/5 shadow-inner">
         <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif-display text-on-surface">Transférer mes fonds</h3>
            <p className="text-sm font-medium text-on-surface-variant max-w-sm">Choisissez votre mode de retrait préféré (Orange Money, Moov, ou Virement).</p>
         </div>
         <button className="w-full md:w-auto px-16 py-6 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 group">
           Retirer les fonds <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </button>
      </div>

      {/* Transactions History */}
      <section>
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl font-serif-display text-on-surface flex items-center gap-4">
             <History size={32} className="text-primary" /> Historique récent
          </h2>
          <div className="h-px flex-1 bg-outline-variant/20"></div>
          <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline underline-offset-4">Voir Tout</button>
        </div>

        <div className="space-y-6">
          {[
            { id: '#041', buyer: 'Fatima T.', amount: 10000, date: 'Hier, 14:30', method: 'Orange Money' },
            { id: '#039', buyer: 'Moussa B.', amount: 7500, date: '12 Oct 2023', method: 'Solde Balance' },
            { id: '#038', buyer: "Société Graine d'Or", amount: 15000, date: '10 Oct 2023', method: 'Virement' }
          ].map((tx, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10 hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-full bg-primary/5 -skew-x-12 translate-x-16 group-hover:translate-x-12 transition-transform"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h4 className="text-lg font-black text-on-surface flex items-center justify-center md:justify-start gap-3">
                  Paiement mission {tx.id}
                  <span className="text-[8px] font-black bg-surface-container-low px-3 py-1 rounded-full text-outline tracking-tight">{tx.method}</span>
                </h4>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-on-surface-variant italic opacity-80">
                   <User size={14} className="text-outline" /> Acheteur: {tx.buyer}
                </div>
              </div>

              <div className="text-center md:text-right space-y-1 relative z-10 shrink-0">
                <p className="text-2xl font-mono font-black text-primary">{formatFCFA(tx.amount)}</p>
                <p className="text-[10px] font-black text-outline uppercase tracking-widest">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 bg-surface-container-low/20 rounded-[3rem] border border-outline-variant/10 flex flex-col items-center gap-4 border-dashed">
           <p className="text-xs font-black text-outline uppercase tracking-[0.2em] text-center">
              Relevé financier généré automatiquement
           </p>
           <button className="px-8 py-3 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/10 hover:bg-primary/5 transition-colors shadow-sm">
              Télécharger mon rapport annuel (PDF)
           </button>
        </div>
      </section>
    </div>
  );
};

export default TransporterWalletPage;
