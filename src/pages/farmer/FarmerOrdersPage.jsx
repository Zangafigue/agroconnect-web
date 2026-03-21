import React, { useState } from 'react';

export default function FarmerOrdersPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null); // 'confirm' or 'reject'
  const [refusalReason, setRefusalReason] = useState('');

  const openModal = (order, type) => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalType(null);
    setRefusalReason('');
  };

  return (
    <div className="space-y-8 pb-32">
      <header className="mb-10">
        <h1 className="text-5xl font-serif text-primary mb-2" style={{fontFamily: "'DM Serif Display', serif"}}>Mes commandes</h1>
        <p className="text-on-surface-variant font-medium">Gérez vos ventes et suivez l'état de vos expéditions en temps réel.</p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-8 mb-8 border-b border-outline-variant/30 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <button onClick={() => setActiveTab('pending')} className={`pb-4 flex items-center gap-2 font-bold border-b-2 transition-all ${activeTab === 'pending' ? 'text-primary border-primary' : 'text-on-surface-variant hover:text-primary border-transparent'}`}>
          <span className="material-symbols-outlined">pending_actions</span>
          <span>En attente (3)</span>
        </button>
        <button onClick={() => setActiveTab('confirmed')} className={`pb-4 flex items-center gap-2 font-medium transition-all border-b-2 ${activeTab === 'confirmed' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-primary border-transparent'}`}>
          <span className="material-symbols-outlined">check_circle</span>
          <span>Confirmées (2)</span>
        </button>
        <button onClick={() => setActiveTab('shipping')} className={`pb-4 flex items-center gap-2 font-medium transition-all border-b-2 ${activeTab === 'shipping' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-primary border-transparent'}`}>
          <span className="material-symbols-outlined">local_shipping</span>
          <span>En livraison (1)</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Order 1 */}
        <article className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 border-l-[4px] border-l-[#fcd34d] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-low">
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-primary">#045</span>
              <div className="px-3 py-1 bg-[#fff8e1] text-[#984300] rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" style={{fontVariationSettings: "'FILL' 1"}}>schedule</span> EN ATTENTE
              </div>
            </div>
            <time className="text-sm text-outline font-medium">il y a 2h</time>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold">FT</div>
                  <div>
                    <h3 className="font-bold text-on-surface">Fatima Traoré</h3>
                    <p className="text-xs text-secondary font-medium uppercase tracking-wider">Acheteur</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary-container">shopping_basket</span>
                  <div>
                    <p className="font-semibold text-on-surface">Maïs sec · 100 sacs · 500 kg</p>
                    <p className="text-sm">Variété locale certifiée</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-xl font-bold text-primary">500 000 FCFA</p>
                  <p className="text-xs text-outline">Net : 485 000 FCFA (−3% commission)</p>
                </div>
                <div className="flex items-start gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-tertiary">location_on</span>
                  <p className="text-sm font-medium">Ouagadougou, Secteur 15</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-surface-container-lowest border-t border-surface-container-low flex items-center justify-end gap-4">
            <button onClick={() => openModal({ id: '#045', buyer: 'Fatima Traoré', product: 'Maïs sec', qty: '100 sacs' }, 'reject')} className="px-6 py-2 border border-error text-error rounded-lg font-bold text-sm hover:bg-error-container/20 transition-all active:scale-95">
              Refuser la commande
            </button>
            <button onClick={() => openModal({ id: '#045', buyer: 'Fatima Traoré', product: 'Maïs sec', qty: '100 sacs' }, 'confirm')} className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/10">
              Confirmer la commande
            </button>
          </div>
        </article>
      </div>

      {/* CONFIRM MODAL OVERLAY */}
      {modalType === 'confirm' && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[600px] bg-surface-container-lowest rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="px-6 py-5 flex items-center justify-between border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                <h2 className="text-2xl font-semibold text-on-surface font-serif" style={{fontFamily: "'DM Serif Display', serif"}}>Confirmer la commande {selectedOrder.id}</h2>
              </div>
              <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-outline">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8">
              {/* Récapitulatif */}
              <section className="bg-surface-container-low/50 rounded-xl p-4">
                <div className="flex justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-outline font-bold">Acheteur</p>
                    <p className="font-medium text-on-surface">{selectedOrder.buyer}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-outline font-bold">Produit</p>
                    <p className="font-medium text-on-surface">{selectedOrder.product}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] uppercase tracking-wider text-outline font-bold">Quantité</p>
                    <p className="font-mono text-on-surface">{selectedOrder.qty}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-dashed border-outline-variant/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-outline">Montant total</span>
                    <span className="font-mono text-on-surface">500 000 FCFA</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-primary">Votre net estimé</span>
                    <div className="text-right">
                      <p className="font-mono text-lg font-bold text-primary">485 000 FCFA</p>
                      <p className="text-[10px] text-outline italic">après commission 3%</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Adresse de collecte */}
              <section className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary mt-1">location_on</span>
                  <div>
                    <h3 className="font-bold text-on-surface leading-tight">Adresse de collecte</h3>
                    <p className="text-xs text-outline">Le transporteur viendra collecter ici</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-outline uppercase px-1">Adresse précise *</label>
                    <input className="bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="Ex: Secteur 15" type="text" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-outline uppercase px-1">Ville *</label>
                    <input className="bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" defaultValue="Ouagadougou" type="text" />
                  </div>
                </div>
              </section>

              {/* Disponibilité */}
              <section className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-1">calendar_today</span>
                  <div>
                    <h3 className="font-bold text-on-surface leading-tight">Disponibilité</h3>
                    <p className="text-xs text-outline">Quand le stock sera-t-il prêt ?</p>
                  </div>
                </div>
                <select className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm cursor-pointer focus:ring-1 focus:ring-primary transition-all">
                  <option>Dès maintenant</option>
                  <option>Demain</option>
                  <option>Choisir une date</option>
                </select>
              </section>
            </div>

            <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/10 flex items-center justify-end gap-4">
              <button onClick={closeModal} className="px-6 py-2 text-sm font-bold text-outline hover:text-on-surface transition-colors active:scale-95 duration-150">
                Annuler
              </button>
              <button onClick={closeModal} className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 duration-150">
                <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                Publier la mission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL OVERLAY */}
      {modalType === 'reject' && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[480px] bg-surface-container-lowest shadow-2xl rounded-xl overflow-hidden">
            <div className="p-8 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-error">cancel</span>
                <h2 className="text-xl font-semibold tracking-tight text-on-surface leading-tight">Refuser la commande {selectedOrder.id} ?</h2>
              </div>
              <p className="text-on-surface-variant font-medium text-sm">
                {selectedOrder.buyer} · {selectedOrder.product} · <span className="font-mono text-xs">{selectedOrder.qty}</span>
              </p>
            </div>
            
            <div className="px-8 py-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-4">Raison du refus *</label>
              <div className="space-y-3">
                {['Stock insuffisant', 'Prix ne convient pas', 'Indisponible à cette date', 'Autre raison'].map(reason => (
                  <label key={reason} className="flex items-center p-3 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors group">
                    <input 
                      type="radio" 
                      name="refusal_reason" 
                      checked={refusalReason === reason}
                      onChange={() => setRefusalReason(reason)}
                      className="w-5 h-5 border-2 border-outline text-primary focus:ring-primary/20 bg-transparent transition-all" 
                    />
                    <span className="ml-3 text-sm font-medium text-on-surface-variant group-hover:text-on-surface">{reason}</span>
                  </label>
                ))}
              </div>
              
              {refusalReason === 'Autre raison' && (
                <div className="mt-4">
                  <textarea className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Précisez votre raison ici..." rows="3"></textarea>
                </div>
              )}

              <div className="mt-6 p-3 bg-[#fef3c7] border border-[#fcd34d] rounded-xl flex gap-3">
                <span className="material-symbols-outlined text-[#92400e] text-[20px]">warning</span>
                <p className="text-[13px] leading-snug text-[#92400e] font-medium">L'acheteur sera notifié du refus avec la raison indiquée.</p>
              </div>
            </div>

            <div className="p-8 pt-6 flex items-center justify-end gap-3">
              <button onClick={closeModal} className="px-5 py-2.5 text-sm font-bold text-outline hover:text-on-surface hover:bg-surface-container-high rounded-xl transition-all active:scale-95">Annuler</button>
              <button onClick={closeModal} className="flex items-center gap-2 px-6 py-2.5 bg-error text-white text-sm font-bold rounded-xl shadow-lg shadow-error/10 hover:brightness-110 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[18px]">close</span> Confirmer le refus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
