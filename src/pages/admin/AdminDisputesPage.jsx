import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDisputesPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-headline text-4xl font-bold flex items-center gap-3 text-on-surface mb-2">
            <span className="material-symbols-outlined text-error text-4xl mt-1">report_problem</span>
            Gestion des Litiges
          </h1>
          <p className="text-on-surface-variant max-w-lg">
            Supervisez et arbitrez les différends entre les utilisateurs pour garantir des transactions saines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-[300px] pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 text-sm transition-all outline-none" 
              placeholder="Rechercher un litige, une commande..." 
              type="text" 
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center border-b border-surface-container-high overflow-x-auto">
        <button className="px-6 py-4 text-sm font-medium text-outline hover:text-primary transition-colors whitespace-nowrap">Tous</button>
        <button className="px-6 py-4 text-sm font-bold text-primary border-b-2 border-primary relative whitespace-nowrap">
          Ouverts (12)
        </button>
        <button className="px-6 py-4 text-sm font-medium text-outline hover:text-primary transition-colors whitespace-nowrap">En cours (3)</button>
        <button className="px-6 py-4 text-sm font-medium text-outline hover:text-primary transition-colors whitespace-nowrap">Résolus (47)</button>
      </div>

      {/* Main Data Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-surface-container-high/50">
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">Plaignant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">Défendeur</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">Commande</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">Raison</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">Durée</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">Statut</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-widest text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/50">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-primary font-bold">#LTG-882</td>
                <td className="px-6 py-4 text-sm font-bold text-on-surface">Moussa T.</td>
                <td className="px-6 py-4 text-sm font-medium text-outline">Saliou D.</td>
                <td className="px-6 py-4 font-mono text-xs">
                  <Link to="/admin/orders/CMD-2034" className="hover:underline text-primary">#CMD-2034</Link>
                </td>
                <td className="px-6 py-4 text-sm">Qualité produit</td>
                <td className="px-6 py-4 text-sm text-error font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">timer</span> 2j
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-error/10 text-error border border-error/20 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">OUVERT</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to="/admin/disputes/LTG-882" className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors shadow-sm inline-block">Résoudre</Link>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-primary font-bold">#LTG-881</td>
                <td className="px-6 py-4 text-sm font-bold text-on-surface">Awa Koné</td>
                <td className="px-6 py-4 text-sm font-medium text-outline">Groupement Faso</td>
                <td className="px-6 py-4 font-mono text-xs">
                  <Link to="/admin/orders/CMD-1988" className="hover:underline text-primary">#CMD-1988</Link>
                </td>
                <td className="px-6 py-4 text-sm">Retard livraison</td>
                <td className="px-6 py-4 text-sm text-error font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">timer</span> 3j
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">EN COURS</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to="/admin/disputes/LTG-881" className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors shadow-sm inline-block">Résoudre</Link>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-outline font-bold">#LTG-879</td>
                <td className="px-6 py-4 text-sm font-bold text-on-surface">Jean Zongo</td>
                <td className="px-6 py-4 text-sm font-medium text-outline">Yacouba S.</td>
                <td className="px-6 py-4 font-mono text-xs">
                  <Link to="/admin/orders/CMD-2012" className="hover:underline text-outline">#CMD-2012</Link>
                </td>
                <td className="px-6 py-4 text-sm text-outline">Quantité incorrecte</td>
                <td className="px-6 py-4 text-sm text-outline">4j</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container-high text-outline border border-outline-variant/30 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">RÉSOLU</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to="/admin/disputes/LTG-879" className="text-primary text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors inline-block border border-primary/20 bg-white">Voir</Link>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-primary font-bold">#LTG-875</td>
                <td className="px-6 py-4 text-sm font-bold text-on-surface">Fatou S.</td>
                <td className="px-6 py-4 text-sm font-medium text-outline">Coop Nord</td>
                <td className="px-6 py-4 font-mono text-xs">
                  <Link to="/admin/orders/CMD-1850" className="hover:underline text-primary">#CMD-1850</Link>
                </td>
                <td className="px-6 py-4 text-sm">Non-conformité</td>
                <td className="px-6 py-4 text-sm text-error font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">timer</span> 7j
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-error/10 text-error border border-error/20 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">OUVERT</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to="/admin/disputes/LTG-875" className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors shadow-sm inline-block">Résoudre</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-l-4 border-primary border border-outline-variant/10">
          <p className="text-[11px] font-bold text-outline uppercase tracking-widest mb-1">Délai moyen</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-serif-display text-3xl text-on-surface">4.2 jours</h3>
            <span className="text-xs font-bold text-primary flex items-center">
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
              -12% ce mois
            </span>
          </div>
        </div>
        {/* KPI 2 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-l-4 border-secondary border border-outline-variant/10">
          <p className="text-[11px] font-bold text-outline uppercase tracking-widest mb-1">Taux de litiges</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-serif-display text-3xl text-on-surface">1.8%</h3>
            <span className="text-xs font-medium text-outline">sur 2 450 commandes</span>
          </div>
        </div>
        {/* KPI 3 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-l-4 border-tertiary border border-outline-variant/10 overflow-hidden relative">
          <p className="text-[11px] font-bold text-outline uppercase tracking-widest mb-1">Catégorie principale</p>
          <div className="flex flex-col relative z-10">
            <h3 className="font-serif-display text-xl text-on-surface leading-tight mt-1">Qualité Produit</h3>
            <p className="text-xs font-bold text-tertiary mt-1">45% des cas récents</p>
          </div>
          <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-7xl text-tertiary/5 select-none pointer-events-none">analytics</span>
        </div>
      </div>
    </div>
  );
}
