import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ShoppingBag, 
  ShoppingCart, 
  AlertTriangle, 
  CreditCard, 
  BarChart3,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Activity
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';

export default function AdminDashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif-display text-4xl text-on-surface mb-2 tracking-tight">Tableau de bord Administrateur</h1>
          <p className="text-outline font-medium opacity-80">Surveillance globale de la plateforme AgroConnect BF.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/admin/stats" 
            className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-primary rounded-2xl font-bold border border-primary/20 hover:bg-primary hover:text-white transition-all"
          >
            <BarChart3 className="w-5 h-5" />
            Rapports Complets
          </Link>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Utilisateurs" value="1 248" icon={Users} color="primary" trend={{ value: '4%', isUp: true }} />
        <StatCard title="Produits" value="3,5k" icon={ShoppingBag} color="secondary" />
        <StatCard title="Commandes" value="842" icon={ShoppingCart} color="primary-container" />
        <StatCard title="Litiges" value={2} icon={AlertTriangle} color="error" />
        <StatCard title="Volume d'affaires" value="15M F" icon={CreditCard} color="tertiary" />
        <StatCard title="Activité" value="98%" icon={Activity} color="primary" />
      </section>

      {/* Main Administrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Critical Alerts (Left 2/3) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-3">
              Alertages & Litiges
              <span className="bg-error text-on-error text-[10px] font-black px-2 py-0.5 rounded-full">2 ACTIONS REQUISES</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[ 
              { id: '#L-102', type: 'Litige Livraison', user: 'Adama B.', reason: 'Produit endommagé', impact: 'Fonds gelés (45 000 F)', level: 'Urgent' },
              { id: '#S-054', type: 'Vérification Compte', user: 'Saran M.', reason: 'Document identité expiré', impact: 'Vente suspendue', level: 'Moyen' }
            ].map((alert) => (
              <div key={alert.id} className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors rounded-3xl p-6 border border-outline-variant/10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center text-error border border-error/10">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <span className="text-xs font-black text-outline uppercase">{alert.id}</span>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${alert.level === 'Urgent' ? 'bg-error text-on-error' : 'bg-amber-100 text-amber-700'}`}>
                      {alert.level}
                    </span>
                  </div>
                  <h3 className="font-bold text-on-surface text-lg">{alert.type}</h3>
                  <p className="text-sm text-outline font-medium">{alert.user} • <span className="text-error font-bold">{alert.reason}</span></p>
                </div>
                <div className="text-center md:text-right px-6 border-x border-outline-variant/10 hidden md:block">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1 font-newsreader">{alert.impact}</p>
                </div>
                <Link to="/admin/disputes" className="w-full md:w-auto px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  Intervenir
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* System Health & Logs (Right 1/3) */}
        <section className="space-y-8">
           <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10">
             <h3 className="text-sm font-black text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-primary" /> Performance Hebdo
             </h3>
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-xs font-bold mb-2">
                     <span className="text-outline">Nouveaux Inscrits</span>
                     <span className="text-primary">+124</span>
                   </div>
                   <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs font-bold mb-2">
                     <span className="text-outline">Volume Transactions</span>
                     <span className="text-primary-container">+1.2M F</span>
                   </div>
                   <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-primary-container"></div>
                   </div>
                </div>
             </div>
           </div>

           <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
             <h3 className="text-xl font-serif-display text-primary mb-4">Système</h3>
             <div className="space-y-3">
               <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                 API Production: En ligne
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                 DB Mongodb: Connecté
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase opacity-50">
                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                 Dernier Backup: 04:00 AM
               </div>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
}
