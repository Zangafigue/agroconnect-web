import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Truck, 
  ShoppingBasket, 
  MapPin, 
  X, 
  AlertTriangle,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const FarmerOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [modalType, setModalType] = useState<'confirm' | 'reject' | null>(null);
  const [refusalReason, setRefusalReason] = useState('');

  const openModal = (order: any, type: 'confirm' | 'reject') => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalType(null);
    setRefusalReason('');
  };

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-700">
      <header className="mb-10">
        <h1 className="text-5xl font-serif-display text-primary mb-2">Mes commandes</h1>
        <p className="text-on-surface-variant font-medium">Gérez vos ventes et suivez l'état de vos expéditions en temps réel.</p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-8 mb-8 border-b border-outline-variant/30 overflow-x-auto whitespace-nowrap hide-scrollbar">
        {[
          { id: 'pending', label: 'En attente', count: 3, icon: Clock },
          { id: 'confirmed', label: 'Confirmées', count: 2, icon: CheckCircle2 },
          { id: 'shipping', label: 'En livraison', count: 1, icon: Truck }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`pb-4 flex items-center gap-2 font-bold border-b-2 transition-all ${activeTab === tab.id ? 'text-primary border-primary' : 'text-on-surface-variant hover:text-primary border-transparent opacity-60'}`}
          >
            <tab.icon size={18} />
            <span>{tab.label} ({tab.count})</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {/* Order 1 - Example */}
        <article className="bg-surface-container-lowest rounded-[2rem] shadow-sm border border-outline-variant/20 border-l-[6px] border-l-tertiary overflow-hidden hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/5 bg-surface-container-low/30">
            <div className="flex items-center gap-4">
              <span className="font-mono font-black text-primary text-lg">#045</span>
              <div className="px-4 py-1.5 bg-tertiary-fixed/20 text-tertiary rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 border border-tertiary/10">
                <Clock size={14} /> EN ATTENTE
              </div>
            </div>
            <time className="text-xs text-outline font-black uppercase tracking-widest">il y a 2h</time>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-secondary/20">FT</div>
                  <div>
                    <h3 className="font-bold text-on-surface text-xl">Fatima Traoré</h3>
                    <p className="text-xs text-secondary font-black uppercase tracking-widest opacity-70">Acheteur Certifié</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                  <ShoppingBasket className="text-primary shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-on-surface">Maïs sec · 100 sacs · 500 kg</p>
                    <p className="text-sm text-on-surface-variant">Variété locale certifiée - Récolte 2024</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 lg:border-l lg:border-outline-variant/10 lg:pl-12">
                <div className="bg-surface-container-high/20 p-5 rounded-2xl border border-outline-variant/5">
                  <p className="font-mono text-3xl font-black text-primary mb-1">{formatFCFA(500000)}</p>
                  <p className="text-[10px] text-outline font-black uppercase tracking-widest">Net : {formatFCFA(485000)} <span className="text-tertiary">(−3% commission)</span></p>
                </div>
                <div className="flex items-start gap-3 text-on-surface-variant italic">
                  <MapPin className="text-tertiary shrink-0" size={18} />
                  <p className="text-sm font-medium">Ouagadougou, Secteur 15 (Collecte en ferme)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-8 py-5 bg-surface-container-low/20 border-t border-outline-variant/10 flex flex-wrap items-center justify-end gap-5">
            <button 
              onClick={() => openModal({ id: '#045', buyer: 'Fatima Traoré', product: 'Maïs sec', qty: '100 sacs' }, 'reject')} 
              className="px-8 py-3 text-error font-bold text-sm hover:bg-error/5 rounded-xl transition-all active:scale-95"
            >
              Refuser
            </button>
            <button 
              onClick={() => openModal({ id: '#045', buyer: 'Fatima Traoré', product: 'Maïs sec', qty: '100 sacs' }, 'confirm')} 
              className="px-10 py-3.5 bg-primary text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <CheckCircle2 size={18} /> Confirmer la commande
            </button>
          </div>
        </article>
      </div>

      {/* MODALS implementation would follow - Simplified for migration check */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] p-12 max-w-md w-full shadow-2xl text-center border border-outline-variant/10">
              <div className={`w-20 h-20 rounded-[2rem] mx-auto mb-8 flex items-center justify-center ${modalType === 'confirm' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                 {modalType === 'confirm' ? <CheckCircle2 size={40} /> : <AlertTriangle size={40} />}
              </div>
              <h2 className="text-3xl font-serif-display mb-4 text-on-surface">
                 {modalType === 'confirm' ? 'Confirmer ?' : 'Refuser ?'}
              </h2>
              <p className="text-on-surface-variant mb-10 leading-relaxed font-medium">
                 Souhaitez-vous vraiment {modalType === 'confirm' ? 'accepter' : 'décliner'} cette commande de {selectedOrder?.buyer} ?
              </p>
              <div className="flex flex-col gap-4">
                 <button onClick={closeModal} className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 ${modalType === 'confirm' ? 'bg-primary shadow-primary/20' : 'bg-error shadow-error/20'}`}>
                    Oui, {modalType === 'confirm' ? 'Confirmer' : 'Refuser'}
                 </button>
                 <button onClick={closeModal} className="w-full py-4 text-outline font-bold hover:text-on-surface transition-colors">
                    Annuler
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default FarmerOrdersPage;
