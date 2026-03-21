<<<<<<< Updated upstream
// TODO: À implémenter par Membre 3
=======
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDisputeStore } from '../../store/disputeStore';

>>>>>>> Stashed changes
export default function AdminDisputesPage() {
  const { disputes, loading, fetchDisputes } = useDisputeStore();

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  const displayDisputes = disputes.length > 0 ? disputes : [
    {
      id: "LTG-882",
      plaintiff: "Moussa T.",
      defendant: "Saliou D.",
      orderId: "CMD-2034",
      reason: "Qualité produit",
      duration: "2j",
      status: "OUVERT"
    },
    {
      id: "LTG-881",
      plaintiff: "Awa Koné",
      defendant: "Groupement Faso",
      orderId: "CMD-1988",
      reason: "Retard livraison",
      duration: "3j",
      status: "EN COURS"
    },
    {
      id: "LTG-879",
      plaintiff: "Jean Zongo",
      defendant: "Yacouba S.",
      orderId: "CMD-2012",
      reason: "Quantité incorrecte",
      duration: "4j",
      status: "RÉSOLU"
    },
    {
      id: "LTG-875",
      plaintiff: "Fatou S.",
      defendant: "Coop Nord",
      orderId: "CMD-1850",
      reason: "Non-conformité",
      duration: "7j",
      status: "OUVERT"
    }
  ];

  const counts = {
    all: displayDisputes.length,
    open: displayDisputes.filter(d => d.status === 'OUVERT').length,
    inProgress: displayDisputes.filter(d => d.status === 'EN COURS').length,
    resolved: displayDisputes.filter(d => d.status === 'RÉSOLU').length
  };
  return (
<<<<<<< Updated upstream
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🌾</div>
        <h1 className="text-2xl font-bold text-gray-800">AdminDisputesPage</h1>
        <p className="text-gray-500 mt-2">Page en cours de développement</p>
=======
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
        <button className="px-6 py-4 text-sm font-medium text-outline hover:text-primary transition-colors whitespace-nowrap">Tous ({counts.all})</button>
        <button className="px-6 py-4 text-sm font-bold text-primary border-b-2 border-primary relative whitespace-nowrap">
          Ouverts ({counts.open})
        </button>
        <button className="px-6 py-4 text-sm font-medium text-outline hover:text-primary transition-colors whitespace-nowrap">En cours ({counts.inProgress})</button>
        <button className="px-6 py-4 text-sm font-medium text-outline hover:text-primary transition-colors whitespace-nowrap">Résolus ({counts.resolved})</button>
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
              {loading ? (
                <tr>
                   <td colSpan="8" className="px-6 py-20 text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-on-surface-variant font-bold">Chargement des litiges...</p>
                  </td>
                </tr>
              ) : displayDisputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className={`px-6 py-4 font-mono text-sm font-bold ${dispute.status === 'RÉSOLU' ? 'text-outline' : 'text-primary'}`}>#{dispute.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-on-surface">{dispute.plaintiff}</td>
                  <td className="px-6 py-4 text-sm font-medium text-outline">{dispute.defendant}</td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <Link to={`/admin/orders/${dispute.orderId}`} className={`hover:underline ${dispute.status === 'RÉSOLU' ? 'text-outline' : 'text-primary'}`}>#{dispute.orderId}</Link>
                  </td>
                  <td className="px-6 py-4 text-sm">{dispute.reason}</td>
                  <td className={`px-6 py-4 text-sm font-bold flex items-center gap-1 ${dispute.status === 'RÉSOLU' ? 'text-outline' : 'text-error'}`}>
                    <span className="material-symbols-outlined text-[14px]">timer</span> {dispute.duration}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm border ${
                      dispute.status === 'OUVERT' ? 'bg-error/10 text-error border-error/20' : 
                      dispute.status === 'EN COURS' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-surface-container-high text-outline border-outline-variant/30'
                    }`}>
                      {dispute.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/disputes/${dispute.id}`} className={`${dispute.status === 'RÉSOLU' ? 'text-primary border-primary/20 bg-white border' : 'bg-primary text-white'} text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors shadow-sm inline-block`}>
                      {dispute.status === 'RÉSOLU' ? 'Voir' : 'Résoudre'}
                    </Link>
                  </td>
                </tr>
              ))}
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
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
