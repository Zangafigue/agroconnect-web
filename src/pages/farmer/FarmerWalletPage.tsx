import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  ArrowRight
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const FarmerWalletPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-serif-display text-on-surface tracking-tight">💰 Mon Portefeuille</h1>
          <p className="text-on-surface-variant font-medium">Gérez vos revenus et vos retraits en toute sécurité.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Card Disponible */}
        <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border-l-[12px] border-l-primary shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden relative">
           <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-[10px]">Solde Disponible</span>
            <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Wallet size={24} />
            </div>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <span className="text-5xl font-mono font-black text-on-surface">185 000</span>
            <span className="text-2xl font-black text-primary">FCFA</span>
          </div>
          <div className="mt-6 flex items-center gap-2 text-primary text-sm font-black relative z-10">
            <TrendingUp size={16} />
            <span>+12% vs mois dernier</span>
          </div>
        </div>

        {/* Card En Attente */}
        <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border-l-[12px] border-l-tertiary shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden relative">
           <div className="absolute top-0 right-0 w-40 h-40 bg-tertiary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-[10px]">En attente de libération</span>
            <div className="bg-tertiary/10 p-4 rounded-2xl text-tertiary group-hover:bg-tertiary group-hover:text-white transition-all">
              <Clock size={24} />
            </div>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <span className="text-5xl font-mono font-black text-on-surface">37 500</span>
            <span className="text-2xl font-black text-tertiary">FCFA</span>
          </div>
          <div className="mt-6 flex items-center gap-3 text-on-surface-variant text-xs font-medium italic relative z-10">
            <AlertCircle size={14} className="text-tertiary" />
            <span>Libération sous 48h après livraison.</span>
          </div>
        </div>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Transactions Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif-display text-on-surface">Historique</h2>
            <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">Voir tout <ArrowRight size={14} /></button>
          </div>
          <div className="space-y-5">
            {[
              { label: 'Livraison #035', sub: 'Fatima T. • Hier, 14:20', val: '+242 500', status: 'CONFIRMÉE', color: 'primary', initials: 'FT' },
              { label: 'Livraison #041', sub: 'Coopérative Nord • 12 Oct', val: '+67 900', status: 'EN ATTENTE', color: 'tertiary', initials: 'CN' },
              { label: 'Retrait fonds', sub: 'Orange Money • 10 Oct', val: '-150 000', status: 'TERMINÉ', color: 'outline', initials: 'OM', isNeg: true }
            ].map((tx, i) => (
              <div key={i} className="bg-surface-container-low/40 p-6 rounded-[2rem] flex items-center justify-between hover:bg-white hover:shadow-xl transition-all border border-outline-variant/10 group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${tx.color === 'primary' ? 'bg-primary' : tx.color === 'tertiary' ? 'bg-tertiary' : 'bg-outline'} flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                    {tx.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{tx.label}</h4>
                    <p className="text-xs text-outline font-medium">{tx.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-black text-xl ${tx.isNeg ? 'text-on-surface' : tx.color === 'primary' ? 'text-primary' : 'text-tertiary'}`}>{tx.val} FCFA</span>
                  <div className={`block text-[8px] font-black uppercase tracking-widest mt-2 px-3 py-1 rounded-full text-center ${tx.color === 'primary' ? 'bg-primary/10 text-primary' : tx.color === 'tertiary' ? 'bg-tertiary/10 text-tertiary' : 'bg-outline/10 text-outline'}`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retirer Widget */}
        <div className="lg:col-span-5 relative">
          <div className="bg-surface-container-low rounded-[3rem] shadow-2xl border border-outline-variant/10 p-10 lg:sticky lg:top-32">
            <h3 className="text-2xl font-serif-display text-on-surface mb-10">Retrait de fonds</h3>
            
            <div className="mb-10 p-6 bg-white rounded-3xl border border-primary/10 flex items-center justify-between shadow-inner">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Disponible</span>
              <span className="font-mono font-black text-primary text-2xl">{formatFCFA(185000)}</span>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-4 px-2">Montant à retirer</label>
                <div className="relative group">
                  <input 
                    className="w-full bg-white border-2 border-transparent focus:border-primary/20 rounded-2xl p-5 font-mono text-2xl font-black text-on-surface focus:ring-0 transition-all shadow-sm" 
                    placeholder="0.00" 
                    type="number" 
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-outline group-focus-within:text-primary transition-colors">FCFA</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-outline uppercase tracking-widest px-2">Méthode de réception</label>
                <div className="grid grid-cols-1 gap-4">
                  {/* Option OM */}
                  <label className="relative flex items-center p-5 rounded-[1.5rem] border-2 border-primary bg-primary/5 cursor-pointer hover:shadow-lg transition-all active:scale-95 group">
                    <input type="radio" name="method" className="sr-only" defaultChecked />
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6600] flex items-center justify-center text-white font-black text-xs shadow-lg">OM</div>
                      <div>
                        <p className="font-bold text-on-surface">Orange Money</p>
                        <p className="text-[10px] font-medium text-outline">+226 76 XX XX 89</p>
                      </div>
                    </div>
                    <CheckCircle2 className="ml-auto text-primary" size={20} />
                  </label>
                  
                  {/* Option MOOV */}
                  <label className="relative flex items-center p-5 rounded-[1.5rem] border-2 border-transparent bg-white cursor-pointer hover:border-outline-variant/30 transition-all active:scale-95">
                    <input type="radio" name="method" className="sr-only" />
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#004A99] flex items-center justify-center text-white font-black text-xs shadow-lg opacity-50">MOOV</div>
                      <div>
                        <p className="font-bold text-on-surface opacity-50">Moov Money</p>
                        <p className="text-[10px] font-medium text-outline">Non configuré</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all mt-4 flex items-center justify-center gap-3">
                <ArrowUpRight size={20} /> Confirmer le retrait
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerWalletPage;
