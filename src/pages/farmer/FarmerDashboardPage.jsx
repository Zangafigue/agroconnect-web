import React from 'react';
import { Link } from 'react-router-dom';

export default function FarmerDashboardPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Welcome Section */}
      <header>
        <h1 className="font-headline text-[2rem] leading-tight text-on-surface">Tableau de bord</h1>
        <p className="text-outline font-medium">3 nouvelles commandes en attente d'action de votre part.</p>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            <span className="text-xs font-semibold text-outline tracking-wider uppercase">Produits publiés</span>
          </div>
          <div className="font-mono text-[28px] font-bold text-on-surface">8</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] border-t-4 border-tertiary">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-tertiary">shopping_cart</span>
            <span className="text-xs font-semibold text-outline tracking-wider uppercase">En attente</span>
          </div>
          <div className="font-mono text-[28px] font-bold text-on-surface">3</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-secondary">check_circle</span>
            <span className="text-xs font-semibold text-outline tracking-wider uppercase">Livrées</span>
          </div>
          <div className="font-mono text-[28px] font-bold text-on-surface">24</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary-container">account_balance_wallet</span>
            <span className="text-xs font-semibold text-outline tracking-wider uppercase">Portefeuille</span>
          </div>
          <div className="font-mono text-[28px] font-bold text-on-surface text-xl truncate">185 000 F</div>
        </div>
      </section>

      {/* Urgent Orders */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold text-on-surface">Commandes urgentes</h2>
          <span className="bg-error text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </div>
        <div className="space-y-4">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden border-l-4 border-amber-400 flex flex-col md:flex-row shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)]">
            <div className="p-6 flex-grow grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div>
                <span className="text-xs font-mono text-outline block mb-1">#045</span>
                <span className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">EN ATTENTE</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Maïs sec</h3>
                <p className="text-sm text-outline">100 sacs</p>
              </div>
              <div>
                <span className="text-xs text-outline block mb-1">Acheteur</span>
                <p className="font-medium text-on-surface">Fatima Traoré</p>
              </div>
              <div className="md:text-right">
                <span className="text-xs text-outline block mb-1">Prix Brut / Net</span>
                <p className="font-mono font-bold text-on-surface">500 000 FCFA</p>
                <p className="font-mono text-xs text-primary font-semibold">Net: 485 000 FCFA</p>
              </div>
            </div>
            <div className="bg-surface-container-low px-6 py-4 flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-outline-variant/20">
              <Link to="/farmer/orders" className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-container transition-colors">
                Gérer
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl overflow-hidden border-l-4 border-amber-400 flex flex-col md:flex-row shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)]">
            <div className="p-6 flex-grow grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div>
                <span className="text-xs font-mono text-outline block mb-1">#046</span>
                <span className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">EN ATTENTE</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Sorgho blanc</h3>
                <p className="text-sm text-outline">45 sacs</p>
              </div>
              <div>
                <span className="text-xs text-outline block mb-1">Acheteur</span>
                <p className="font-medium text-on-surface">Idrissa Sawadogo</p>
              </div>
              <div className="md:text-right">
                <span className="text-xs text-outline block mb-1">Prix Brut / Net</span>
                <p className="font-mono font-bold text-on-surface">225 000 FCFA</p>
                <p className="font-mono text-xs text-primary font-semibold">Net: 218 250 FCFA</p>
              </div>
            </div>
            <div className="bg-surface-container-low px-6 py-4 flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-outline-variant/20">
              <Link to="/farmer/orders" className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-container transition-colors">
                Gérer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Products */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-semibold text-on-surface">Mes produits récents</h2>
          <Link to="/farmer/products" className="text-primary text-sm font-bold hover:underline">Voir tout l'inventaire</Link>
        </div>
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/10">
                <th className="px-6 py-4 text-xs font-bold text-outline tracking-wider uppercase">Produit</th>
                <th className="px-6 py-4 text-xs font-bold text-outline tracking-wider uppercase">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-outline tracking-wider uppercase">Prix Unitaire</th>
                <th className="px-6 py-4 text-xs font-bold text-outline tracking-wider uppercase text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-emerald-100 flex items-center justify-center">
                      <img className="w-full h-full object-cover rounded shadow-inner" src="https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&q=80" alt="Maïs" />
                    </div>
                    <span className="font-bold text-on-surface">Maïs Jaune</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-outline">150 sacs</td>
                <td className="px-6 py-4 font-mono text-on-surface">5 000 FCFA</td>
                <td className="px-6 py-4 text-right">
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] font-black px-2 py-1 rounded uppercase">DISPONIBLE</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-emerald-100 flex items-center justify-center">
                      <img className="w-full h-full object-cover rounded shadow-inner" src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=80" alt="Sorgho" />
                    </div>
                    <span className="font-bold text-on-surface">Sorgho Blanc</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-outline">85 sacs</td>
                <td className="px-6 py-4 font-mono text-on-surface">4 500 FCFA</td>
                <td className="px-6 py-4 text-right">
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] font-black px-2 py-1 rounded uppercase">DISPONIBLE</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
