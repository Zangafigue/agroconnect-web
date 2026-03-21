import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { useUserStore } from '../../store/userStore';
import { useOrderStore } from '../../store/orderStore';
import { formatFCFA } from '../../utils/currency';

export default function AdminDashboard() {
  const { products, fetchProducts } = useProductStore();
  const { users, fetchUsers } = useUserStore();
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, [fetchProducts, fetchUsers, fetchOrders]);

  const latestOrders = orders.length > 0 ? orders.slice(0, 5) : [
    { id: "CMD-2024-089", product: "Oignon rouge (100kg)", buyer: "S. Traoré - Ouaga", amount: 85000, status: "CONFIRMÉE" },
    { id: "CMD-2024-090", product: "Tomate locale (25kg)", buyer: "Hotel des Arts", amount: 12500, status: "EN TRANSIT" },
    { id: "CMD-2024-091", product: "Maïs blanc (500kg)", buyer: "Agro-Poul", amount: 115000, status: "LIBÉRÉ" }
  ];
  return (
    <div className="space-y-12 pb-12">
      {/* KPI Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary">
          <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Utilisateurs</p>
          <div className="flex items-end justify-between">
            <h3 className="font-mono text-3xl font-medium">{users.length > 0 ? users.length.toLocaleString() : '1 122'}</h3>
            <span className="text-xs text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +8 ce mois
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-secondary">
          <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Produits actifs</p>
          <div className="flex items-end justify-between">
            <h3 className="font-mono text-3xl font-medium">{products.length > 0 ? products.length.toLocaleString() : '847'}</h3>
            <span className="material-symbols-outlined text-secondary opacity-30 text-4xl">inventory_2</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-tertiary">
          <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Commandes</p>
          <div className="flex items-end justify-between">
            <h3 className="font-mono text-3xl font-medium">{orders.length > 0 ? orders.length.toLocaleString() : '1 204'}</h3>
            <span className="material-symbols-outlined text-tertiary opacity-30 text-4xl">shopping_basket</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary-container">
          <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Volume d'affaires</p>
          <div className="flex items-end justify-between">
            <h3 className="font-mono text-xl xl:text-2xl font-medium">42.5M FCFA</h3>
            <span className="text-xs text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +12%
            </span>
          </div>
        </div>
      </section>

      {/* Alerts Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/disputes" className="bg-error-container/40 p-4 rounded-xl flex items-center gap-4 transition-transform hover:scale-[1.01] cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>report_problem</span>
          </div>
          <div>
            <h4 className="font-bold text-on-error-container text-sm">12 litiges ouverts</h4>
            <p className="text-xs text-on-error-container/70">Nécessite une action immédiate</p>
          </div>
        </Link>
        <Link to="/admin/users" className="bg-surface-container-high p-4 rounded-xl flex items-center gap-4 transition-transform hover:scale-[1.01] cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface text-sm">5 comptes à vérifier</h4>
            <p className="text-xs text-outline">Nouveaux agriculteurs inscrits</p>
          </div>
        </Link>
        <Link to="/admin/payments" className="bg-tertiary-fixed/30 p-4 rounded-xl flex items-center gap-4 transition-transform hover:scale-[1.01] cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          </div>
          <div>
            <h4 className="font-bold text-on-tertiary-fixed-variant text-sm">8 retraits en attente</h4>
            <p className="text-xs text-on-tertiary-fixed-variant/70">Validation des paiements OM</p>
          </div>
        </Link>
      </section>

      {/* Analytics Bento */}
      <section className="grid grid-cols-12 gap-6">
        {/* Order Chart */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-headline text-2xl text-on-surface">Commandes — 7 derniers jours</h3>
            <div className="flex items-center gap-2 text-xs text-outline">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <span>Volume quotidien</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            <div className="flex-1 bg-surface-container-low rounded-t-lg relative group transition-all hover:bg-primary-container h-[45%]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">142</div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-t-lg relative group transition-all hover:bg-primary-container h-[60%]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">185</div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-t-lg relative group transition-all hover:bg-primary-container h-[85%]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">260</div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-t-lg relative group transition-all hover:bg-primary-container h-[55%]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">170</div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-t-lg relative group transition-all hover:bg-primary-container h-[70%]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">215</div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-t-lg relative group transition-all hover:bg-primary-container h-[95%]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">294</div>
            </div>
            <div className="flex-1 bg-primary rounded-t-lg relative group h-[80%]">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">245</div>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] uppercase tracking-tighter text-outline font-bold">
            <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest p-8 rounded-xl flex flex-col">
          <h3 className="font-headline text-2xl text-on-surface mb-8">Répartition utilisateurs</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <svg className="w-48 h-48 -rotate-90">
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#e1fbdc" strokeWidth="20"></circle>
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#006b2c" strokeDasharray="502" strokeDashoffset="150" strokeLinecap="round" strokeWidth="20"></circle>
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#984300" strokeDasharray="502" strokeDashoffset="400" strokeLinecap="round" strokeWidth="20"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-mono font-bold">1.1K</span>
              <span className="text-[10px] text-outline uppercase font-bold">Total</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                <span className="text-sm">Agriculteurs</span>
              </div>
              <span className="font-mono font-bold">70%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-tertiary rounded-full"></span>
                <span className="text-sm">Acheteurs</span>
              </div>
              <span className="font-mono font-bold">20%</span>
            </div>
            <div className="flex items-center justify-between opacity-40">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-outline rounded-full"></span>
                <span className="text-sm">Transporteurs</span>
              </div>
              <span className="font-mono font-bold">10%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tables Layout */}
      <section className="grid grid-cols-12 gap-8">
        {/* Latest Orders */}
        <div className="col-span-12 xl:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl text-on-surface">Dernières commandes</h3>
            <Link to="/admin/orders" className="text-sm text-primary font-bold hover:underline">Voir tout</Link>
          </div>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-[10px] uppercase tracking-widest text-outline">
                  <th className="p-4">Référence</th>
                  <th className="p-4">Produit</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Montant</th>
                  <th className="p-4">Statut</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-surface-container-low">
                {latestOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 font-mono font-medium">#{order.id}</td>
                    <td className="p-4">{order.product || 'Produit Divers'}</td>
                    <td className="p-4">{order.buyer || order.client}</td>
                    <td className="p-4 font-mono">{formatFCFA(order.amount)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'CONFIRMÉE' || order.status === 'LIBÉRÉ' ? 'bg-primary/10 text-primary' : 
                        order.status === 'EN TRANSIT' ? 'bg-tertiary-fixed/40 text-tertiary' : 'bg-surface-container-high text-outline'
                      }`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Disputes */}
        <div className="col-span-12 xl:col-span-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl text-on-surface">Derniers litiges</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono font-bold text-outline">#LIT-452</span>
                <span className="bg-error/10 text-error px-2 py-0.5 rounded text-[10px] font-bold">URGENT</span>
              </div>
              <h4 className="text-sm font-bold mb-1">Produit non conforme</h4>
              <p className="text-xs text-outline mb-3 line-clamp-1">Livraison d'oignons altérés reçue à Ouagadougou.</p>
              <div className="flex items-center justify-between pt-3 border-t border-surface-container-low">
                <span className="text-[10px] text-outline">Il y a 2 heures</span>
                <Link to="/admin/disputes/LIT-452" className="text-[10px] font-bold text-primary uppercase">Gérer</Link>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono font-bold text-outline">#LIT-451</span>
                <span className="bg-secondary-container text-secondary px-2 py-0.5 rounded text-[10px] font-bold">OUVERT</span>
              </div>
              <h4 className="text-sm font-bold mb-1">Retard de livraison</h4>
              <p className="text-xs text-outline mb-3 line-clamp-1">Camion bloqué sur l'axe Bobo-Ouaga.</p>
              <div className="flex items-center justify-between pt-3 border-t border-surface-container-low">
                <span className="text-[10px] text-outline">Il y a 5 heures</span>
                <Link to="/admin/disputes/LIT-451" className="text-[10px] font-bold text-primary uppercase">Gérer</Link>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono font-bold text-outline">#LIT-450</span>
                <span className="bg-secondary-container text-secondary px-2 py-0.5 rounded text-[10px] font-bold">OUVERT</span>
              </div>
              <h4 className="text-sm font-bold mb-1">Défaut de paiement</h4>
              <p className="text-xs text-outline mb-3 line-clamp-1">Problème lors du transfert Orange Money.</p>
              <div className="flex items-center justify-between pt-3 border-t border-surface-container-low">
                <span className="text-[10px] text-outline">Hier, 18:45</span>
                <Link to="/admin/disputes/LIT-450" className="text-[10px] font-bold text-primary uppercase">Gérer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
