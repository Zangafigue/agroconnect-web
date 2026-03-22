import React from 'react';
import { Wallet, TrendingUp, History, Download, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const WalletPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-12">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface flex items-center gap-6">
          <Wallet size={50} className="text-primary" />
          Portefeuille
        </h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Visualisez votre solde, vos gains et vos transactions financières passées.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-primary/5 p-12 rounded-[3.5rem] border border-primary/10 shadow-sm group">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Solde de ma balance</h3>
            <p className="text-6xl font-mono font-black text-primary tracking-tight group-hover:scale-105 transition-transform duration-500">{formatFCFA(45200)}</p>
            <div className="mt-10 flex gap-4">
               <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">Retirer</button>
               <button className="flex-1 py-4 bg-white text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest border border-primary/10 active:scale-95 transition-all">Détails</button>
            </div>
         </div>
         
         <div className="bg-surface-container-lowest p-10 rounded-[3rem] border border-outline-variant/10 flex flex-col justify-center gap-6">
            <div className="flex items-center justify-between">
               <span className="text-sm font-bold text-on-surface-variant">Prochaine libération de fonds</span>
               <span className="font-mono font-black text-tertiary">12/05/2024</span>
            </div>
            <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
               <div className="h-full bg-tertiary w-3/4"></div>
            </div>
            <p className="text-xs font-medium text-outline flex items-center gap-2 italic">
               <ShieldCheck size={14} className="text-tertiary" /> 75% du processus de vérification de livraison complété.
            </p>
         </div>
      </div>
    </div>
  );
};

export default WalletPage;
