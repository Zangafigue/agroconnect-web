import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Gavel, 
  Timer, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  TrendingDown,
  BarChart3,
  ShieldCheck,
  Eye,
  MessageSquareWarning
} from 'lucide-react';

const AdminDisputesPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-serif-display text-4xl flex items-center gap-4 text-on-surface mb-2">
            <span className="p-3 bg-error/10 text-error rounded-2xl shadow-inner">
              <MessageSquareWarning size={32} />
            </span>
            Gestion des Litiges
          </h1>
          <p className="text-on-surface-variant max-w-lg italic">
            Arbitrage et résolution des différends pour une marketplace transparente et sécurisée.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
            <input 
              className="w-[350px] pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm transition-all outline-none shadow-sm" 
              placeholder="Référence litige, commande, utilisateur..." 
              type="text" 
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs M3 Style */}
      <div className="flex items-center gap-2 p-1.5 bg-surface-container-high/30 rounded-2xl border border-outline-variant/10 w-fit">
        {[
          { label: 'Tous', count: null, active: false },
          { label: 'Ouverts', count: 12, active: true, color: 'error' },
          { label: 'En cours', count: 3, active: false, color: 'tertiary' },
          { label: 'Résolus', count: 47, active: false, color: 'primary' }
        ].map((tab) => (
          <button 
            key={tab.label}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${tab.active ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-on-surface'}`}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${tab.active ? 'bg-primary text-white' : 'bg-surface-container-high text-outline'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Data Table Section */}
      <div className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-surface-container-low/30 text-[10px] uppercase tracking-[0.15em] text-outline font-bold border-b border-outline-variant/5">
                <th className="px-8 py-5">Identifiant</th>
                <th className="px-8 py-5">Parties impliquées</th>
                <th className="px-8 py-5">Commande associées</th>
                <th className="px-8 py-5">Motif</th>
                <th className="px-8 py-5">Ancienneté</th>
                <th className="px-8 py-5">Statut</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {[
                { id: 'LTG-882', compl: 'Moussa T.', def: 'Saliou D.', cmd: 'CMD-2034', reason: 'Qualité produit', time: '2j', status: 'OUVERT', color: 'error', icon: Timer },
                { id: 'LTG-881', compl: 'Awa Koné', def: 'Coop Faso', cmd: 'CMD-1988', reason: 'Retard livraison', time: '3j', status: 'EN COURS', color: 'tertiary', icon: Clock },
                { id: 'LTG-879', compl: 'Jean Zongo', def: 'Yacouba S.', cmd: 'CMD-2012', reason: 'Quantité incorrecte', time: '4j', status: 'RÉSOLU', color: 'primary', icon: CheckCircle2 },
                { id: 'LTG-875', compl: 'Fatou S.', def: 'Coop Nord', cmd: 'CMD-1850', reason: 'Non-conformité', time: '7j', status: 'OUVERT', color: 'error', icon: Timer },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/20 transition-colors group">
                  <td className="px-8 py-6 font-mono font-bold text-primary text-sm">#{row.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">{row.compl}</span>
                        <span className="text-[10px] text-outline uppercase tracking-wider">Plaignant</span>
                      </div>
                      <div className="w-4 h-[1px] bg-outline-variant"></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-outline">{row.def}</span>
                        <span className="text-[10px] text-outline/50 uppercase tracking-wider italic">Défendeur</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Link to={`/admin/orders/${row.cmd}`} className="font-mono text-xs text-primary font-bold hover:underline bg-primary/5 px-2 py-1 rounded-lg">#{row.cmd}</Link>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-on-surface-variant italic">"{row.reason}"</td>
                  <td className={`px-8 py-6 text-sm font-bold flex items-center gap-1.5 ${row.color === 'error' ? 'text-error animate-pulse' : 'text-outline'}`}>
                    <row.icon size={14} /> {row.time}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${row.color}/10 text-${row.color} border border-${row.color}/20 shadow-inner`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link to={`/admin/disputes/${row.id}`} className="bg-primary text-white text-[10px] uppercase font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg shadow-primary/10 inline-flex items-center gap-2">
                       <Gavel size={14} /> Arbitrer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Bento Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm group hover:border-primary/30 transition-all">
          <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-3">Délai de résolution</p>
          <div className="flex items-end justify-between">
            <h3 className="font-serif-display text-4xl text-on-surface">4.2 <span className="text-lg">jours</span></h3>
            <div className="flex flex-col items-end">
               <span className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full mb-1">
                 <TrendingDown size={14} /> -12%
               </span>
               <p className="text-[10px] text-outline italic">ce mois-ci</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm group hover:border-secondary/30 transition-all">
          <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-3">Taux de litiges</p>
          <div className="flex items-end justify-between">
            <h3 className="font-serif-display text-4xl text-on-surface">1.8%</h3>
            <div className="flex flex-col items-end">
               <BarChart3 size={24} className="text-secondary opacity-40 mb-2" />
               <p className="text-[10px] text-outline text-right">sur 2 450 transactions</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:border-tertiary/30 transition-all">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-3">Catégorie critique</p>
            <h3 className="font-serif-display text-2xl text-on-surface mt-1">Qualité Produit</h3>
            <p className="text-xs font-bold text-tertiary mt-2 bg-tertiary/5 px-2 py-1 rounded-lg w-fit italic">45% des cas récents</p>
          </div>
          <ShieldCheck size={120} className="absolute -bottom-6 -right-6 text-tertiary/5 group-hover:text-tertiary/10 group-hover:scale-110 transition-all duration-700" />
        </div>
      </div>
    </div>
  );
};

export default AdminDisputesPage;
