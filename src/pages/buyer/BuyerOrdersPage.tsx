import React, { useState } from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  History, 
  MessageSquare, 
  XCircle, 
  Info,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const BuyerOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="flex-1 p-8 md:p-16 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-6xl font-serif-display text-on-surface mb-3 leading-tight">Mes Commandes</h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">Suivez l'état de vos approvisionnements en temps réel et gérez vos réceptions.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto items-center gap-10 mb-12 border-b border-outline-variant/20 pb-0.5 hide-scrollbar">
        {[
          { id: 'pending', label: 'En attente', count: 2, icon: Clock },
          { id: 'confirmed', label: 'Confirmées', count: 0, icon: CheckCircle2 },
          { id: 'shipping', label: 'En livraison', count: 0, icon: Truck },
          { id: 'history', label: 'Historique', count: 0, icon: History }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 flex items-center gap-3 font-bold border-b-4 transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-primary border-primary' : 'text-outline hover:text-primary border-transparent opacity-60'}`}
          >
            <tab.icon size={20} />
            <span>{tab.label} {tab.count > 0 && `(${tab.count})`}</span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="space-y-8">
        {/* Order Card 1 */}
        <article className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border-l-[12px] border-l-tertiary shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden ring-1 ring-outline-variant/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col xl:flex-row gap-10">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-mono text-[10px] font-black text-outline uppercase tracking-[0.2em]">Réf #CMD-045</span>
                  <h3 className="text-3xl font-serif-display text-on-surface mt-2 group-hover:text-primary transition-colors">Maïs sec de Bobo</h3>
                </div>
                <div className="px-5 py-2 rounded-full bg-tertiary-fixed/20 text-tertiary text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border border-tertiary/10">
                  <Clock size={16} />
                  EN ATTENTE
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 bg-surface-container-low/30 p-6 rounded-2xl border border-outline-variant/5">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black tracking-[0.1em] text-outline">Quantité</p>
                  <p className="font-black text-on-surface">10 sacs (500kg)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black tracking-[0.1em] text-outline">Producteur</p>
                  <p className="font-bold text-on-surface">Amadou Kaboré</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black tracking-[0.1em] text-outline">Total Net</p>
                  <p className="font-mono font-black text-xl text-primary">{formatFCFA(50000)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black tracking-[0.1em] text-outline">Date Commande</p>
                  <p className="font-bold text-on-surface">24 Oct. 2024</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                <Info className="text-primary mt-0.5 shrink-0" size={20} />
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed italic">
                  "Votre commande est en attente de confirmation par le producteur. Vous recevrez une notification dès qu'un transporteur sera assigné."
                </p>
              </div>
            </div>
            
            <div className="flex flex-row xl:flex-col justify-end gap-4 min-w-[220px]">
              <button className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white border-2 border-primary text-primary hover:bg-primary/5 transition-all text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/5 active:scale-95">
                <MessageSquare size={18} />
                Contacter
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-error/20 text-error hover:bg-error/5 transition-all text-sm font-black uppercase tracking-widest active:scale-95">
                <XCircle size={18} />
                Annuler
              </button>
            </div>
          </div>
        </article>

        {/* Similar cards would repeat - Simplified for migration */}
      </div>
    </div>
  );
};

export default BuyerOrdersPage;
