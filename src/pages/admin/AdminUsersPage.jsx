import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminUsersPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-2">Gestion des Utilisateurs</h2>
          <p className="text-on-surface-variant max-w-lg">
            Gérez tous les comptes de la plateforme (Agriculteurs, Acheteurs, Transporteurs).
          </p>
        </div>
      </div>

      {/* Toolbar Section */}
      <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur, un email..." 
              className="w-full border border-outline-variant/30 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-surface-container-low/50 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="border border-outline-variant/30 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/10 bg-surface-container-low/50 outline-none">
            <option>Tous les rôles</option>
            <option>Acheteur</option>
            <option>Agriculteur</option>
            <option>Transporteur</option>
          </select>
          <select className="border border-outline-variant/30 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/10 bg-surface-container-low/50 outline-none">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>Suspendu</option>
          </select>
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-sm">download</span>
            Exporter CSV
          </button>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-surface-container-high/50">
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider text-center">Peut vendre</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider text-center">Peut acheter</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Inscription</th>
                <th className="px-6 py-4 text-[11px] font-bold text-outline uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold shadow-sm">FT</div>
                    <div>
                      <p className="font-bold text-on-surface">Fatima Traoré</p>
                      <p className="text-xs text-outline">fatima.t@agro.bf</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-full uppercase">Acheteur</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-error text-lg opacity-80">close</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Actif
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-mono text-outline">12 oct. 2023</td>
                <td className="px-6 py-5 text-right space-x-2">
                  <Link to="/admin/users/1" className="p-2 text-outline hover:text-primary transition-colors inline-block"><span className="material-symbols-outlined">visibility</span></Link>
                  <button className="p-2 text-outline hover:text-error transition-colors"><span className="material-symbols-outlined">block</span></button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow-sm">AK</div>
                    <div>
                      <p className="font-bold text-on-surface">Amadou Kaboré</p>
                      <p className="text-xs text-outline">a.kabore@farma.bf</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full uppercase">Agriculteur</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Actif
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-mono text-outline">25 sept. 2023</td>
                <td className="px-6 py-5 text-right space-x-2">
                  <Link to="/admin/users/2" className="p-2 text-outline hover:text-primary transition-colors inline-block"><span className="material-symbols-outlined">visibility</span></Link>
                  <button className="p-2 text-outline hover:text-error transition-colors"><span className="material-symbols-outlined">block</span></button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white text-sm font-bold shadow-sm">KD</div>
                    <div>
                      <p className="font-bold text-on-surface">Koné Dramane</p>
                      <p className="text-xs text-outline">k.dramane@trans.bf</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold rounded-full uppercase">Transporteur</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-error text-lg opacity-80">close</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Actif
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-mono text-outline">02 nov. 2023</td>
                <td className="px-6 py-5 text-right space-x-2">
                  <Link to="/admin/users/3" className="p-2 text-outline hover:text-primary transition-colors inline-block"><span className="material-symbols-outlined">visibility</span></Link>
                  <button className="p-2 text-outline hover:text-error transition-colors"><span className="material-symbols-outlined">block</span></button>
                </td>
              </tr>
              {/* Row 4 (Suspended) */}
              <tr className="hover:bg-surface-container-low/30 transition-colors opacity-70 bg-surface-container-highest/20">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-outline/20 flex items-center justify-center text-outline text-sm font-bold">MD</div>
                    <div>
                      <p className="font-bold text-on-surface-variant">Moussa Diallo</p>
                      <p className="text-xs text-outline">m.diallo@email.bf</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-outline/10 text-outline border border-outline/20 text-[10px] font-bold rounded-full uppercase">Acheteur</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-outline text-lg">close</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="material-symbols-outlined text-outline text-lg">check_circle</span>
                </td>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-1.5 text-error font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    Suspendu
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-mono text-outline">15 août 2023</td>
                <td className="px-6 py-5 text-right space-x-2">
                  <Link to="/admin/users/4" className="p-2 text-outline hover:text-primary transition-colors inline-block"><span className="material-symbols-outlined">visibility</span></Link>
                  <button className="p-2 text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined">check_circle</span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-lowest">
          <p className="text-xs text-outline">Affichage de <span className="font-bold text-on-surface">1 - 10</span> sur <span className="font-bold text-on-surface">482</span> utilisateurs</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container text-xs font-bold transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container text-xs font-bold transition-colors">3</button>
            <span className="px-1 text-outline">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container text-xs font-bold transition-colors">48</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
