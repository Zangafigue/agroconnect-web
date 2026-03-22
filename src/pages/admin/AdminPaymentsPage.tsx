import React from 'react';
import { Wallet, Landmark, TrendingUp, History, Download, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminPaymentsPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-serif-display text-on-surface mb-2">Gestion des Flux Financiers</h2>
          <p className="text-on-surface-variant max-w-lg italic">
            Supervisez les transactions, les commissions de plateforme et les décaissements.
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all">
          <Download size={18} /> Rapport Financier
        </button>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-3">En séquestre (Escrow)</p>
            <h3 className="font-serif-display text-4xl text-on-surface">4 250 000 <span className="text-sm">F</span></h3>
            <div className="mt-4 flex items-center gap-2 text-primary font-bold text-xs bg-primary/5 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck size={14} /> Fonds sécurisés
            </div>
          </div>
          <Wallet size={120} className="absolute -bottom-6 -right-6 text-primary/5 group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-3">Commissions perçues</p>
            <h3 className="font-serif-display text-4xl text-on-surface">127 500 <span className="text-sm">F</span></h3>
            <div className="mt-4 flex items-center gap-2 text-tertiary font-bold text-xs bg-tertiary/5 px-3 py-1.5 rounded-full w-fit">
              <TrendingUp size={14} /> +8% ce mois
            </div>
          </div>
          <Landmark size={120} className="absolute -bottom-6 -right-6 text-tertiary/5 group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm flex flex-col justify-center gap-4 bg-primary/5 border-primary/10">
           <h4 className="font-serif-display text-xl text-on-surface">Prochain Versement</h4>
           <div className="flex items-center justify-between">
              <span className="text-outline text-sm italic">Prévu le 25 Mars</span>
              <span className="font-mono font-bold text-primary">850 000 F</span>
           </div>
           <button className="w-full py-3 bg-white text-primary border border-primary/20 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
             Accélérer le virement
           </button>
        </div>
      </div>

      {/* Transactions Placeholder */}
      <section className="bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/10 p-10 text-center shadow-sm">
         <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-6 text-outline">
            <History size={32} />
         </div>
         <h3 className="font-serif-display text-2xl mb-2 text-on-surface">Historique Transactionnel</h3>
         <p className="text-on-surface-variant max-w-sm mx-auto mb-8 italic">Le grand livre comptable détaillé sera disponible une fois la synchronisation avec le processeur de paiement finalisée.</p>
         <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-surface-container-high rounded-2xl text-xs font-bold text-on-surface-variant flex items-center gap-2">
              <ShieldCheck size={16} /> Audit Logs
            </button>
         </div>
      </section>
    </div>
  );
};

export default AdminPaymentsPage;
