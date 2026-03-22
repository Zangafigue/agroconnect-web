import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  MoreHorizontal, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  UserX,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const AdminUsersPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-serif-display text-on-surface mb-2">Gestion des Utilisateurs</h2>
          <p className="text-on-surface-variant max-w-lg">
            Administrez les comptes de la plateforme : validation des profils et gestion des accès.
          </p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg shadow-primary/10">
          <UserPlus size={18} /> Inviter un collaborateur
        </button>
      </div>

      {/* Toolbar Section */}
      <section className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher par nom, email ou téléphone..." 
              className="w-full border border-outline-variant/30 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-surface-container-low/30 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none border border-outline-variant/30 rounded-2xl text-sm py-3 pl-4 pr-10 focus:ring-4 focus:ring-primary/10 bg-surface-container-low/30 outline-none cursor-pointer">
              <option>Tous les rôles</option>
              <option>Acheteur</option>
              <option>Agriculteur</option>
              <option>Transporteur</option>
            </select>
            <Filter size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          </div>
          <button className="bg-surface-container-high text-on-surface px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-white transition-all border border-outline-variant/10">
            <Download size={18} /> Exporter
          </button>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low/30 text-[10px] uppercase tracking-[0.15em] text-outline font-bold border-b border-outline-variant/5">
                <th className="px-8 py-5">Utilisateur</th>
                <th className="px-8 py-5">Rôle</th>
                <th className="px-8 py-5 text-center">Activités</th>
                <th className="px-8 py-5">Statut</th>
                <th className="px-8 py-5">Inscription</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {[
                { name: 'Fatima Traoré', email: 'fatima.t@agro.bf', role: 'Acheteur', color: 'blue', canSell: false, canBuy: true, status: 'Actif', date: '12 oct. 2023' },
                { name: 'Amadou Kaboré', email: 'a.kabore@farma.bf', role: 'Agriculteur', color: 'emerald', canSell: true, canBuy: true, status: 'Actif', date: '25 sept. 2023' },
                { name: 'Koné Dramane', email: 'k.dramane@trans.bf', role: 'Transporteur', color: 'orange', canSell: false, canBuy: true, status: 'Actif', date: '02 nov. 2023' },
                { name: 'Moussa Diallo', email: 'm.diallo@email.bf', role: 'Acheteur', color: 'slate', canSell: false, canBuy: true, status: 'Suspendu', date: '15 août 2023' },
              ].map((user, i) => (
                <tr key={i} className={`hover:bg-surface-container-low/20 transition-colors group ${user.status === 'Suspendu' ? 'opacity-60 bg-surface-container-highest/10' : ''}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shadow-inner`}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface">{user.name}</p>
                        <p className="text-xs text-outline font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 bg-${user.color}-500/10 text-${user.color}-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-${user.color}-500/20`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <div title="Ventes" className={`p-1.5 rounded-lg ${user.canSell ? 'bg-primary/10 text-primary' : 'bg-outline/5 text-outline/30'}`}>
                        <CheckCircle2 size={16} />
                      </div>
                      <div title="Achats" className={`p-1.5 rounded-lg ${user.canBuy ? 'bg-primary/10 text-primary' : 'bg-outline/5 text-outline/30'}`}>
                        <CheckCircle2 size={16} />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-2 font-bold text-xs ${user.status === 'Actif' ? 'text-primary' : 'text-error'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Actif' ? 'bg-primary animate-pulse' : 'bg-error'}`}></div>
                      {user.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-mono text-outline">{user.date}</td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-1">
                        <Link to={`/admin/users/${i+1}`} className="p-2.5 text-outline hover:text-primary hover:bg-primary/5 rounded-xl transition-all" title="Voir détails">
                          <Eye size={20} />
                        </Link>
                        <button className="p-2.5 text-outline hover:text-error hover:bg-error/5 rounded-xl transition-all" title={user.status === 'Actif' ? 'Suspendre' : 'Réactiver'}>
                          {user.status === 'Actif' ? <UserX size={20} /> : <CheckCircle2 size={20} />}
                        </button>
                        <button className="p-2.5 text-outline hover:bg-surface-container rounded-xl transition-all">
                          <MoreHorizontal size={20} />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/10 bg-surface-container-lowest">
          <p className="text-xs text-outline font-medium italic">Affichage de <span className="font-bold text-on-surface not-italic">1 - 10</span> sur <span className="font-bold text-on-surface not-italic">482</span> utilisateurs</p>
          <div className="flex items-center gap-1.5">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-outline hover:bg-surface-container transition-all disabled:opacity-30" disabled>
              <ChevronLeft size={20} />
            </button>
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${p === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-surface-container text-outline'}`}>
                {p}
              </button>
            ))}
            <span className="px-2 text-outline font-bold">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold text-outline hover:bg-surface-container transition-all">48</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-outline hover:bg-surface-container transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminUsersPage;
