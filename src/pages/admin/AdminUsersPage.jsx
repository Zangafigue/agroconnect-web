<<<<<<< Updated upstream
export default function AdminUsersPage() { return <div className="p-8">Admin Users (En construction)</div>; }
=======
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

export default function AdminUsersPage() {
  const { users, loading, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const displayUsers = users.length > 0 ? users : [
    {
      id: 1,
      name: "Fatima Traoré",
      email: "fatima.t@agro.bf",
      role: "Acheteur",
      status: "Actif",
      date: "12 oct. 2023",
      canSell: false,
      canBuy: true
    },
    {
      id: 2,
      name: "Amadou Kaboré",
      email: "a.kabore@farma.bf",
      role: "Agriculteur",
      status: "Actif",
      date: "25 sept. 2023",
      canSell: true,
      canBuy: true
    },
    {
      id: 3,
      name: "Koné Dramane",
      email: "k.dramane@trans.bf",
      role: "Transporteur",
      status: "Actif",
      date: "02 nov. 2023",
      canSell: false,
      canBuy: true
    }
  ];
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-on-surface-variant font-bold">Chargement des utilisateurs...</p>
                  </td>
                </tr>
              ) : displayUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-surface-container-low/30 transition-colors ${user.status === 'Suspendu' ? 'opacity-70 bg-surface-container-highest/20' : ''}`}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${
                        user.role === 'Acheteur' ? 'bg-secondary' : 
                        user.role === 'Agriculteur' ? 'bg-primary' : 'bg-tertiary'
                      }`}>
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{user.name}</p>
                        <p className="text-xs text-outline">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase border ${
                      user.role === 'Acheteur' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                      user.role === 'Agriculteur' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>{user.role}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`material-symbols-outlined text-lg ${user.canSell ? 'text-primary' : 'text-error opacity-80'}`} 
                          style={user.canSell ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {user.canSell ? 'check_circle' : 'close'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`material-symbols-outlined text-lg ${user.canBuy ? 'text-primary' : 'text-error opacity-80'}`} 
                          style={user.canBuy ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {user.canBuy ? 'check_circle' : 'close'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`flex items-center gap-1.5 font-bold text-xs ${user.status === 'Actif' ? 'text-primary' : 'text-error'}`}>
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Actif' ? 'bg-primary ' + (user.status === 'Actif' ? 'animate-pulse' : '') : 'bg-error'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-mono text-outline">{user.date}</td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <Link to={`/admin/users/${user.id}`} className="p-2 text-outline hover:text-primary transition-colors inline-block"><span className="material-symbols-outlined">visibility</span></Link>
                    <button className={`p-2 transition-colors ${user.status === 'Suspendu' ? 'text-primary hover:text-primary-container' : 'text-outline hover:text-error'}`}>
                      <span className="material-symbols-outlined">{user.status === 'Suspendu' ? 'check_circle' : 'block'}</span>
                    </button>
                  </td>
                </tr>
              ))}
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
>>>>>>> Stashed changes
