import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Truck, 
  PieChart, 
  Download,
  Calendar,
  ChevronDown
} from 'lucide-react';

const AdminStatsPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-700 font-body">
      {/* Header with Date Range */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-serif-display text-on-surface mb-2">Analytique & Performance</h2>
          <p className="text-on-surface-variant max-w-lg italic">
            Visualisez la croissance, le comportement des utilisateurs et les indicateurs clés.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-high px-6 py-3 rounded-2xl text-sm font-bold text-on-surface flex items-center gap-3 border border-outline-variant/10 cursor-pointer hover:bg-white transition-all">
            <Calendar size={18} /> Jan 2024 - Mars 2024
            <ChevronDown size={16} />
          </div>
          <button className="p-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl shadow-sm hover:bg-primary hover:text-white transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Volume d\'affaires', val: '24.5M', delta: '+15%', icon: TrendingUp, color: 'primary' },
          { label: 'Utilisateurs Actifs', val: '8.4K', delta: '+8%', icon: Users, color: 'secondary' },
          { label: 'Conversion', val: '4.2%', delta: '-2%', icon: BarChart3, color: 'tertiary' },
          { label: 'Livraisons', val: '1.2K', delta: '+12%', icon: Truck, color: 'primary' },
        ].map((kpi, i) => (
          <div key={i} className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative group hover:border-primary/20 transition-all">
            <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-4 opacity-70">{kpi.label}</p>
            <h3 className="font-serif-display text-4xl text-on-surface mb-3">{kpi.val}</h3>
            <div className={`text-[10px] font-bold px-3 py-1 rounded-full w-fit ${kpi.delta.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'} flex items-center gap-1`}>
              {kpi.delta.startsWith('+') ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
              {kpi.delta}
            </div>
            <kpi.icon size={100} className="absolute -bottom-4 -right-4 text-primary/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000" />
          </div>
        ))}
      </div>

      {/* Charts Placeholder Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/10 p-10 min-h-[400px] flex flex-col shadow-sm relative overflow-hidden group">
           <div className="flex items-center justify-between mb-10 relative z-10">
              <h3 className="font-serif-display text-2xl font-bold flex items-center gap-3">
                 <PieChart size={24} className="text-secondary" /> Courbe de croissance
              </h3>
              <div className="flex gap-2">
                 <span className="w-12 h-1 bg-primary rounded-full"></span>
                 <span className="w-12 h-1 bg-secondary rounded-full opacity-30"></span>
              </div>
           </div>
           
           <div className="flex-1 flex items-center justify-center border-2 border-dashed border-outline-variant/20 rounded-[2rem] relative z-10">
              <div className="text-center">
                 <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-4 text-outline group-hover:scale-110 transition-transform cursor-pointer">
                    <BarChart3 size={32} />
                 </div>
                 <p className="text-sm font-bold text-outline uppercase tracking-widest italic">Chargement des données temps réel...</p>
              </div>
           </div>
           
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>

        <div className="lg:col-span-4 bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/10 p-10 shadow-sm">
           <h3 className="font-serif-display text-2xl mb-8">Répartition</h3>
           <div className="space-y-6">
              {[
                { label: 'Céréales', val: '45%', color: 'bg-primary' },
                { label: 'Légumes', val: '30%', color: 'bg-secondary' },
                { label: 'Fruits', val: '15%', color: 'bg-tertiary' },
                { label: 'Autres', val: '10%', color: 'bg-outline-variant' }
              ].map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                    <span className="text-on-surface">{cat.label}</span>
                    <span className="text-outline">{cat.val}</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full w-[${cat.val}]`} />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsPage;
