<<<<<<< Updated upstream
// TODO: À implémenter par Membre 3
=======
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import { getSellerName } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

>>>>>>> Stashed changes
export default function AdminOrdersPage() {
  const { orders, loading, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const displayOrders = orders.length > 0 ? orders : [
    {
      id: "CMD-2035",
      date: "Aujourd'hui, 10:23",
      buyer: "Fatima T.",
      buyerLocation: "Ouagadougou",
      seller: "Amadou K.",
      sellerLocation: "Bobo-Dioulasso",
      amount: 125000,
      status: "EN ATTENTE"
    },
    {
      id: "045",
      date: "Hier, 15:40",
      buyer: "Saliou D.",
      buyerLocation: "Koudougou",
      seller: "Coop Nord",
      sellerLocation: "Ouahigouya",
      amount: 85000,
      status: "EN TRANSIT"
    },
    {
      id: "CMD-2033",
      date: "12 Oct 2023",
      buyer: "Awa Koné",
      buyerLocation: "Banfora",
      seller: "Ferme Yac",
      sellerLocation: "Sindou",
      amount: 45500,
      status: "LIVRÉE"
    },
    {
        id: "CMD-2031",
        date: "10 Oct 2023",
        buyer: "Moussa Z.",
        buyerLocation: "Dori",
        seller: "Groupement Sud",
        sellerLocation: "Gaoua",
        amount: 320000,
        status: "LITIGE"
      }
  ];
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🌾</div>
        <h1 className="text-2xl font-bold text-gray-800">AdminOrdersPage</h1>
        <p className="text-gray-500 mt-2">Page en cours de développement</p>
      </div>
<<<<<<< Updated upstream
=======

      {/* Toolbar Section */}
      <section className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-outline-variant/10 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              type="text" 
              placeholder="Rechercher par référence, acheteur, vendeur..." 
              className="w-full border border-outline-variant/30 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-surface-container-low/50 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="border border-outline-variant/30 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/10 bg-surface-container-low/50 outline-none">
            <option>Tous les statuts</option>
            <option>En attente</option>
            <option>Confirmée</option>
            <option>En transit</option>
            <option>Livrée</option>
            <option>Annulée</option>
          </select>
          <input type="date" className="border border-outline-variant/30 rounded-xl text-sm py-2 px-4 focus:ring-2 focus:ring-primary/10 bg-surface-container-low/50 outline-none text-outline" />
          <button className="bg-surface-container-high text-on-surface hover:bg-surface-variant px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Plus de filtres
          </button>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-surface-container-high/50">
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Référence</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Acheteur</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Vendeur</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider text-right">Montant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-on-surface-variant font-bold">Chargement des commandes...</p>
                  </td>
                </tr>
              ) : displayOrders.map((order) => (
                <tr key={order.id} className={`hover:bg-surface-container-low/30 transition-colors ${order.status === 'LITIGE' ? 'bg-error/5' : ''}`}>
                  <td className="px-6 py-5">
                    <Link to={`/admin/orders/${order.id}`} className={`font-mono font-bold hover:underline flex items-center gap-1 ${order.status === 'LITIGE' ? 'text-error' : 'text-primary'}`}>
                      {order.status === 'LITIGE' && <span className="material-symbols-outlined text-sm">warning</span>}
                      #{order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface">{order.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">{getSellerName(order.buyer)}</span>
                      <span className="text-[10px] text-outline">{order.buyerLocation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">{getSellerName(order.seller)}</span>
                      <span className="text-[10px] text-outline">{order.sellerLocation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="font-mono font-medium text-on-surface">{formatFCFA(order.amount)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      order.status === 'LIVRÉE' ? 'bg-primary/10 text-primary' : 
                      order.status === 'EN TRANSIT' ? 'bg-tertiary-fixed/40 text-tertiary' : 
                      order.status === 'LITIGE' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high text-outline'
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link to={`/admin/orders/${order.id}`} className={`p-2 transition-colors inline-block ${order.status === 'LITIGE' ? 'text-error hover:bg-error/10 rounded-lg' : 'text-outline hover:text-primary'}`} title={order.status === 'LITIGE' ? 'Voir Litige' : 'Détails'}>
                      <span className="material-symbols-outlined text-lg">{order.status === 'LITIGE' ? 'gavel' : 'visibility'}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-lowest">
          <p className="text-xs text-outline">Affichage de <span className="font-bold text-on-surface">1 - 10</span> sur <span className="font-bold text-on-surface">1,204</span> commandes</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container text-xs font-bold transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container text-xs font-bold transition-colors">3</button>
            <span className="px-1 text-outline">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container text-xs font-bold transition-colors">121</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
>>>>>>> Stashed changes
    </div>
  );
}
