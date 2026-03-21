import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-2">Gestion des Commandes</h2>
          <p className="text-on-surface-variant max-w-lg">
            Supervisez l'ensemble des transactions, le statut des livraisons et les paiements bloqués sur la plateforme.
          </p>
        </div>
      </div>

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
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-5">
                  <Link to="/admin/orders/CMD-2035" className="font-mono font-bold text-primary hover:underline">#CMD-2035</Link>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface">Aujourd'hui, 10:23</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Fatima T.</span>
                    <span className="text-[10px] text-outline">Ouagadougou</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Amadou K.</span>
                    <span className="text-[10px] text-outline">Bobo-Dioulasso</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="font-mono font-medium text-on-surface">125 000 <span className="text-[10px] text-outline">F</span></span>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-surface-container-high text-outline text-[10px] font-bold rounded-full uppercase tracking-wider">EN ATTENTE</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <Link to="/admin/orders/CMD-2035" className="p-2 text-outline hover:text-primary transition-colors inline-block" title="Détails">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </Link>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-5">
                  <Link to="/admin/orders/045" className="font-mono font-bold text-primary hover:underline">#CMD-045</Link>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface">Hier, 15:40</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Saliou D.</span>
                    <span className="text-[10px] text-outline">Koudougou</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Coop Nord</span>
                    <span className="text-[10px] text-outline">Ouahigouya</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="font-mono font-medium text-on-surface">85 000 <span className="text-[10px] text-outline">F</span></span>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-tertiary-fixed/40 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-wider">EN TRANSIT</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <Link to="/admin/orders/045" className="p-2 text-outline hover:text-primary transition-colors inline-block" title="Détails">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </Link>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-5">
                  <Link to="/admin/orders/CMD-2033" className="font-mono font-bold text-outline hover:text-primary hover:underline">#CMD-2033</Link>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface">12 Oct 2023</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Awa Koné</span>
                    <span className="text-[10px] text-outline">Banfora</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Ferme Yac</span>
                    <span className="text-[10px] text-outline">Sindou</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="font-mono font-medium text-on-surface">45 500 <span className="text-[10px] text-outline">F</span></span>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">LIVRÉE</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <Link to="/admin/orders/CMD-2033" className="p-2 text-outline hover:text-primary transition-colors inline-block" title="Détails">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </Link>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors bg-error/5">
                <td className="px-6 py-5">
                  <Link to="/admin/orders/CMD-2031" className="font-mono font-bold text-error hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    #CMD-2031
                  </Link>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface">10 Oct 2023</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Moussa Z.</span>
                    <span className="text-[10px] text-outline">Dori</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">Groupement Sud</span>
                    <span className="text-[10px] text-outline">Gaoua</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="font-mono font-medium text-on-surface">320 000 <span className="text-[10px] text-outline">F</span></span>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full uppercase tracking-wider">LITIGE</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <Link to="/admin/orders/CMD-2031" className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors inline-block" title="Voir Litige">
                    <span className="material-symbols-outlined text-lg">gavel</span>
                  </Link>
                </td>
              </tr>
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
    </div>
  );
}
