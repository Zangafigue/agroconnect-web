import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Wallet,
  ArrowUpRight,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  Truck
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-700">
      {/* KPI Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Utilisateurs', value: '1 122', trend: '+8 ce mois', icon: Users, color: 'primary' },
          { label: 'Produits actifs', value: '847', icon: Package, color: 'secondary' },
          { label: 'Commandes', value: '1 204', icon: ShoppingBag, color: 'tertiary' },
          { label: "Volume d'affaires", value: '42.5M FCFA', trend: '+12%', icon: TrendingUp, color: 'primary-container' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${kpi.color}/10 text-${kpi.color} group-hover:bg-${kpi.color} group-hover:text-white transition-colors`}>
                <kpi.icon size={24} />
              </div>
              {kpi.trend && (
                <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 bg-primary/5 px-2 py-1 rounded-full">
                  <TrendingUp size={10} /> {kpi.trend}
                </span>
              )}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold mb-1">{kpi.label}</p>
            <h3 className="font-serif-display text-3xl text-on-surface">{kpi.value}</h3>
          </div>
        ))}
      </section>

      {/* Alerts Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/disputes" className="group bg-error-container/20 p-5 rounded-3xl flex items-center gap-5 border border-error/10 hover:bg-error-container/30 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h4 className="font-bold text-on-error-container text-base">12 litiges ouverts</h4>
            <p className="text-xs text-on-error-container/70">Action immédiate recommandée</p>
          </div>
        </Link>
        <Link to="/admin/users" className="group bg-surface-container-high p-5 rounded-3xl flex items-center gap-5 border border-outline-variant/10 hover:bg-white transition-all">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-bold text-on-surface text-base">5 comptes à vérifier</h4>
            <p className="text-xs text-outline">Nouveaux agriculteurs inscrits</p>
          </div>
        </Link>
        <Link to="/admin/payments" className="group bg-tertiary-fixed/20 p-5 rounded-3xl flex items-center gap-5 border border-tertiary/10 hover:bg-tertiary-fixed/30 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
            <Wallet size={28} />
          </div>
          <div>
            <h4 className="font-bold text-on-tertiary-fixed-variant text-base">8 retraits en attente</h4>
            <p className="text-xs text-on-tertiary-fixed-variant/70">Validation Orange Money</p>
          </div>
        </Link>
      </section>

      {/* Analytics Bento */}
      <section className="grid grid-cols-12 gap-6">
        {/* Order Chart */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="font-serif-display text-2xl text-on-surface mb-1">Commandes</h3>
              <p className="text-xs text-outline">Activité des 7 derniers jours</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-outline">
                <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
                <span>Volume</span>
              </div>
              <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><MoreHorizontal size={20} /></button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[45, 60, 85, 55, 70, 95, 80].map((h, i) => (
              <div key={i} className="flex-1 group relative flex flex-col items-center">
                <div className={`w-full rounded-t-xl transition-all duration-500 ease-out group-hover:opacity-80 ${i === 6 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-primary/20'}`} style={{ height: `${h}%` }}></div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none mb-2 font-bold whitespace-nowrap">
                  {Math.round(h * 3.1)} CMD
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] uppercase tracking-widest text-outline font-bold border-t border-outline-variant/5 pt-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 flex flex-col">
          <h3 className="font-serif-display text-2xl text-on-surface mb-10">Communauté</h3>
          <div className="flex-1 flex items-center justify-center relative scale-110">
            <svg className="w-48 h-48 -rotate-90">
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#f0fdf4" strokeWidth="24"></circle>
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#00c853" strokeDasharray="502" strokeDashoffset="150" strokeLinecap="round" strokeWidth="24"></circle>
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#fb8c00" strokeDasharray="502" strokeDashoffset="400" strokeLinecap="round" strokeWidth="16"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-serif-display font-bold text-on-surface">1.1K+</span>
              <span className="text-[10px] text-outline uppercase tracking-widest font-bold">Acteurs</span>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {[
              { label: 'Agriculteurs', value: '70%', color: 'bg-[#00c853]' },
              { label: 'Acheteurs', value: '20%', color: 'bg-[#fb8c00]' },
              { label: 'Transporteurs', value: '10%', color: 'bg-outline' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 ${item.color} rounded-full`}></span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className="font-mono font-bold text-on-surface">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Orders */}
      <section className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 overflow-hidden">
        <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="font-serif-display text-2xl text-on-surface">Dernières commandes</h3>
          <Link to="/admin/orders" className="flex items-center gap-1.5 text-sm text-primary font-bold hover:gap-2 transition-all">
            Voir tout le flux <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-[10px] uppercase tracking-widest text-outline">
                <th className="p-6 font-bold">Référence</th>
                <th className="p-6 font-bold">Produit</th>
                <th className="p-6 font-bold">Client</th>
                <th className="p-6 font-bold">Montant</th>
                <th className="p-6 font-bold text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant/5">
              {[
                { ref: '#CMD-2024-089', prod: 'Oignon rouge (100kg)', user: 'S. Traoré', price: '85 000 F', status: 'Confirmée', color: 'primary' },
                { ref: '#CMD-2024-090', prod: 'Tomate locale (25kg)', user: 'Hotel des Arts', price: '12 500 F', status: 'En Transit', color: 'tertiary' },
                { ref: '#CMD-2024-091', prod: 'Maïs blanc (500kg)', user: 'Agro-Poul', price: '115 000 F', status: 'Libéré', color: 'primary' },
                { ref: '#CMD-2024-092', prod: 'Beurre Karité (5L)', user: 'M. Konaté', price: '25 000 F', status: 'Confirmée', color: 'primary' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="p-6 font-mono font-bold text-outline text-xs">{row.ref}</td>
                  <td className="p-6 font-headline font-bold text-on-surface">{row.prod}</td>
                  <td className="p-6 text-on-surface-variant font-medium">{row.user}</td>
                  <td className="p-6 font-serif-display text-lg">{row.price}</td>
                  <td className="p-6">
                    <div className={`flex items-center justify-center gap-2 bg-${row.color}/10 text-${row.color} px-4 py-1.5 rounded-full text-[10px] font-bold uppercase`}>
                      <div className={`w-1.5 h-1.5 bg-${row.color} rounded-full animate-pulse`}></div>
                      {row.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
