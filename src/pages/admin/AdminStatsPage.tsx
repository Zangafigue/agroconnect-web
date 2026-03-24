import React, { useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Truck, 
  PieChart, 
  Download,
  Calendar,
  ChevronDown,
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Layers
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { useUserStore } from '../../store/userStore';
import { useOrderStore } from '../../store/orderStore';
import { formatFCFA } from '../../utils/currency';

const AdminStatsPage: React.FC = () => {
  const { stats, fetchStats, loading } = useAdminStore() as any;
  const { users } = useUserStore() as any;
  const { orders } = useOrderStore() as any;

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-pulse">
           <div className="w-12 h-12 border-4 border-[var(--green-600)] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] italic font-mono">Calcul des Modèles Prédictifs...</p>
        </div>
     );
  }

  const analyticsKpis = [
    { label: "Volume d'Affaires", val: formatFCFA(stats?.totalVolume || 0), delta: stats?.volumeDelta || '0%', icon: 'payments', color: 'text-[var(--green-600)]', bg: 'bg-[var(--green-600)]/10' },
    { label: 'Taux de Rétention', val: stats?.retentionRate || '0%', delta: stats?.retentionDelta || '0%', icon: 'group', color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
    { label: 'Panier Moyen', val: formatFCFA(stats?.averageBasket || 0), delta: stats?.basketDelta || '0%', icon: 'shopping_basket', color: 'text-amber-600', bg: 'bg-amber-500/10' },
    { label: 'Efficacité Logistique', val: stats?.logisticEfficiency || '0%', delta: stats?.logisticDelta || '0%', icon: 'local_shipping', color: 'text-[var(--green-600)]', bg: 'bg-[var(--green-600)]/10' },
  ];

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
        <div>
          <h1 className="font-headline font-bold text-5xl text-[var(--text-primary)] tracking-tight mb-2">Intelligence Analytique</h1>
          <p className="text-sm text-[var(--text-muted)] font-medium max-w-xl">
            Exploration multidimensionnelle des indicateurs de performance et de la santé macro-économique d'AgroConnect.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[var(--bg-muted)] transition-all shadow-sm group">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Trimestre Q1 2026
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-[var(--text-primary)] text-white rounded-xl shadow-lg hover:brightness-110 transition-all">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {analyticsKpis.map((kpi, i) => (
          <div key={i} className="bg-[var(--bg-surface)] p-10 rounded-[3rem] border border-[var(--border-light)] shadow-sm relative group overflow-hidden hover:shadow-xl transition-all">
             <div className="flex justify-between items-start mb-10 relative z-10 transition-transform group-hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-white transition-all duration-500 shadow-inner`}>
                  <span className="material-symbols-outlined text-3xl">{kpi.icon}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${kpi.delta.startsWith('+') ? 'bg-[var(--green-600)]/5 text-[var(--green-600)] border-[var(--green-600)]/20' : 'bg-red-500/5 text-red-600 border-red-500/20'}`}>
                   <span className="material-symbols-outlined text-xs">
                     {kpi.delta.startsWith('+') ? 'trending_up' : 'trending_down'}
                   </span>
                   {kpi.delta}
                </div>
             </div>
             <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-2 italic">{kpi.label}</p>
             <h3 className="font-headline text-4xl font-bold text-[var(--text-primary)] tracking-tight italic group-hover:scale-105 transition-transform origin-left">{kpi.val}</h3>
             <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[var(--text-primary)] opacity-[0.03] text-[150px] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
               {kpi.icon}
             </span>
          </div>
        ))}
      </div>

      {/* Deep Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Growth Multi-line Chart Placeholder */}
        <div className="lg:col-span-8 bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-light)] p-12 shadow-sm relative overflow-hidden group min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-16 relative z-10">
            <div>
               <h3 className="font-headline text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight italic">Dynamique de Croissance</h3>
               <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-[0.2em] opacity-40 italic max-w-sm">Corrélation entre les inscriptions et les volumes nationaux.</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-[var(--bg-muted)]/50 rounded-2xl border border-[var(--border-light)]">
               <button className="px-5 py-2 bg-white shadow-sm border border-[var(--border-light)] rounded-xl text-[9px] font-bold uppercase tracking-widest text-[var(--text-primary)]">Hebdo</button>
               <button className="px-5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">Mensuel</button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end gap-10 relative z-10 font-mono">
             {/* Abstract Chart Bars */}
             <div className="flex items-end justify-between h-64 gap-5 px-4 border-b border-[var(--border-light)] pb-4">
                {[30, 45, 25, 60, 80, 55, 90, 70, 40, 65, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col gap-1.5 items-center group/bar">
                     <div className="w-full flex flex-col-reverse justify-start">
                        <div 
                          className={`w-full rounded-t-xl transition-all duration-1000 shadow-sm ${i % 2 === 0 ? 'bg-[var(--green-600)] opacity-80' : 'bg-[var(--text-primary)] opacity-20'}`} 
                          style={{ height: `${h}%` }}
                        ></div>
                     </div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-40 px-4 italic">
                {['Jan', 'Féb', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'].map(m => <span key={m}>{m}</span>)}
             </div>
          </div>
          
          <span className="material-symbols-outlined absolute top-10 right-10 opacity-[0.03] text-[200px] group-hover:rotate-6 transition-transform pointer-events-none text-[var(--text-primary)]">
            query_stats
          </span>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-light)] p-12 shadow-sm flex flex-col">
           <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shadow-inner">
                 <span className="material-symbols-outlined text-2xl">layers</span>
              </div>
              <h3 className="font-headline text-3xl font-bold text-[var(--text-primary)] tracking-tight italic leading-none">Secteurs</h3>
           </div>
           <div className="space-y-10 flex-1">
              {[
                { label: 'Céréales & Grains', val: 45, color: 'bg-[var(--green-600)]' },
                { label: 'Maraîchage', val: 30, color: 'bg-amber-500' },
                { label: 'Tubecules & Racines', val: 15, color: 'bg-[var(--text-primary)]' },
                { label: 'Fruits Saisonniers', val: 10, color: 'bg-[var(--text-muted)]' }
              ].map((cat, i) => (
                <div key={i} className="space-y-4 group">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest italic font-sans transition-transform group-hover:translate-x-1">
                    <span className="text-[var(--text-primary)]">{cat.label}</span>
                    <span className="text-[var(--text-muted)] opacity-60 font-mono text-xs">{cat.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--bg-muted)] rounded-full overflow-hidden shadow-inner translate-y-1">
                    <div 
                      className={`${cat.color} h-full rounded-full transition-all duration-1000 shadow-sm opacity-80`} 
                      style={{ width: `${cat.val}%` }} 
                    />
                  </div>
                </div>
              ))}
           </div>
           
           <button className="mt-14 w-full py-5 bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--text-primary)] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">description</span>
              Rapport Sectoriel
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsPage;
