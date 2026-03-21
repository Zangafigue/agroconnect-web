<<<<<<< Updated upstream
export default function AdminUserDetailPage() { return <div>Admin User Detail</div>; }
=======
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const { users, fetchUsers } = useUserStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users.length]);

  useEffect(() => {
    const foundUser = users.find(u => u.id === id || String(u.id) === id);
    if (foundUser) {
      setUser(foundUser);
    } else if (id === '1' || id === '2' || id === '3') {
        const mockUsers = [
            {
              id: '1',
              name: "Fatima Traoré",
              email: "fatima.t@agro.bf",
              role: "Acheteur",
              status: "Actif",
              date: "12 Oct 2023",
              phone: "+226 70 00 00 00",
              address: "Secteur 15, Ouagadougou",
              totalSpent: "1.2M",
              ordersCount: 124,
              lastLogin: "Il y a 2h"
            },
            {
                id: '2',
                name: "Amadou Kaboré",
                email: "a.kabore@farma.bf",
                role: "Agriculteur",
                status: "Actif",
                date: "25 Sept 2023",
                phone: "+226 75 11 11 11",
                address: "Bobo-Dioulasso",
                totalSpent: "0",
                ordersCount: 45,
                lastLogin: "Hier"
            }
        ];
        setUser(mockUsers.find(u => u.id === id));
    }
  }, [users, id]);

  if (!user && id !== '1' && id !== '2' && id !== '3') {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-on-surface-variant font-bold">Chargement de l'utilisateur...</p>
        </div>
    );
  }

  const currentUser = user || {
    name: "Utilisateur Inconnu",
    email: "inconnu@agro.bf",
    role: "N/A",
    status: "Inactif",
    date: "N/A"
  };

  return (
    <div className="pb-12 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/admin/users" className="flex items-center text-outline hover:text-primary transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="ml-2">Utilisateurs</span>
          </Link>
          <div className="h-6 w-[1px] bg-outline-variant/30"></div>
          <div className="flex items-center gap-3">
            <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface">Détail Utilisateur <span className="font-mono">#{id || '1'}</span></h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
              currentUser.status === 'Actif' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${currentUser.status === 'Actif' ? 'bg-primary' : 'bg-error'}`}></span>
              {currentUser.status === 'Actif' ? 'COMPTE ACTIF' : 'COMPTE SUSPENDU'}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-high hover:bg-surface-variant text-on-surface text-sm font-bold rounded-xl transition-colors border border-outline-variant/10">
            Modifier
          </button>
          <button className="px-5 py-2.5 bg-error/10 hover:bg-error/20 text-error text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">block</span>
            Suspendre
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLONNE GAUCHE: Profil & Actions Rapides */}
        <div className="space-y-8">
          {/* Card Profil */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-4 relative">
              {currentUser.name.substring(0, 2).toUpperCase()}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-surface-container-lowest flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[12px]">verified</span>
              </div>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface">{currentUser.name}</h3>
            <p className="text-sm text-outline font-medium mt-1 mb-4">{currentUser.email}</p>
            
            <span className={`px-4 py-1.5 border text-xs font-bold rounded-full uppercase tracking-wider mb-6 ${
              currentUser.role === 'Acheteur' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
              currentUser.role === 'Agriculteur' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-700 border-orange-200'
            }`}>
              {currentUser.role}
            </span>

            <div className="w-full grid grid-cols-2 gap-4 mt-2">
              <div className="bg-surface-container-low p-4 rounded-xl text-center">
                <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1">Inscrit le</p>
                <p className="font-mono text-sm font-bold text-on-surface">{currentUser.date}</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl text-center">
                <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1">Connexion</p>
                <p className="font-mono text-sm font-bold text-on-surface">{currentUser.lastLogin || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Card Coordonnées */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h4 className="font-bold text-sm text-outline uppercase tracking-widest mb-4">Coordonnées</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
                  <span className="material-symbols-outlined text-sm">call</span>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-bold">Téléphone</p>
                  <p className="font-mono text-sm font-bold text-on-surface">{currentUser.phone || '+226 -- -- -- --'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-bold">Adresse</p>
                  <p className="text-sm font-medium text-on-surface">{currentUser.address || 'Non renseignée'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Card Sécurité */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h4 className="font-bold text-sm text-outline uppercase tracking-widest mb-4">Sécurité</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">lock</span>
                  <span className="text-sm font-bold">2FA Activé</span>
                </div>
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline text-sm">badge</span>
                  <span className="text-sm font-bold">KYC Validé</span>
                </div>
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
              </div>
            </div>
          </section>
        </div>

        {/* COLONNE DROITE: Activité et Statistiques */}
        <div className="md:col-span-2 space-y-8">
          {/* Card KPIs */}
          <section className="grid grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border-t-4 border-primary shadow-sm border-x border-b border-outline-variant/10">
              <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-2">Total Dépensé</p>
              <h3 className="font-mono text-2xl font-bold text-on-surface">{currentUser.totalSpent || '0'} <span className="text-sm text-outline">FCFA</span></h3>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border-t-4 border-secondary shadow-sm border-x border-b border-outline-variant/10">
              <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-2">Commandes</p>
              <h3 className="font-mono text-2xl font-bold text-on-surface">{currentUser.ordersCount || '0'}</h3>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border-t-4 border-tertiary shadow-sm border-x border-b border-outline-variant/10">
              <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-2">Litiges Récents</p>
              <div className="flex items-end gap-2">
                <h3 className="font-mono text-2xl font-bold text-on-surface">1</h3>
                <span className="px-2 py-0.5 rounded bg-error/10 text-error text-[10px] font-bold mb-1 w-max">OUVERT</span>
              </div>
            </div>
          </section>

          {/* Card Historique Commandes */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="font-headline text-lg font-bold text-on-surface">Historique des commandes</h3>
              <Link to="/admin/orders" className="text-primary text-sm font-bold hover:underline">Voir tout</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/30 border-b border-surface-container-high/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-wider">Référence</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-wider text-right">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link to="/admin/orders/CMD-2035" className="font-mono font-bold text-primary hover:underline">#CMD-2035</Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-outline">Aujourd'hui, 10:23</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-surface-container-high text-outline text-[10px] font-bold rounded-full uppercase tracking-wider">EN ATTENTE</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold">125 000 F</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link to="/admin/orders/045" className="font-mono font-bold text-primary hover:underline">#CMD-045</Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-outline">Hier, 15:40</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-tertiary-fixed/40 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-wider">EN TRANSIT</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold">85 000 F</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link to="/admin/orders/CMD-2033" className="font-mono text-on-surface-variant font-medium hover:underline">#CMD-2033</Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-outline">12 Oct 2023</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">LIVRÉE</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold">45 500 F</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Card Logs Activité (Simulé) */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-6">Logs d'activité récents</h3>
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-surface-container-high">
              <div className="relative pl-8">
                <div className="absolute left-0 w-6 h-6 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest z-10"></div>
                <p className="text-sm font-bold text-on-surface">Connexion réussie</p>
                <p className="text-xs text-outline font-mono mt-1">10:45 AM - IP: 197.231.xx.xx (Ouagadougou)</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 w-6 h-6 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest z-10"></div>
                <p className="text-sm font-bold text-on-surface">Création de la commande #CMD-2035</p>
                <p className="text-xs text-outline font-mono mt-1">10:23 AM</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 w-6 h-6 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest z-10"></div>
                <p className="text-sm font-bold text-on-surface">Modification du mot de passe</p>
                <p className="text-xs text-outline font-mono mt-1">Hier, 18:30</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
>>>>>>> Stashed changes
