import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShoppingCart, 
  CheckCircle, 
  Wallet, 
  ArrowRight, 
  ExternalLink,
  Plus
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';

export default function FarmerDashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif-display text-4xl text-on-surface mb-2 tracking-tight">Tableau de bord</h1>
          <p className="text-outline font-medium opacity-80">Ravi de vous revoir ! Voici un aperçu de votre activité.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/farmer/products/new" 
            className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nouveau Produit
          </Link>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Produits en ligne" 
          value={8} 
          icon={ShoppingBag} 
          color="primary"
          trend={{ value: '12%', isUp: true }}
        />
        <StatCard 
          title="Commandes en cours" 
          value={3} 
          icon={ShoppingCart} 
          color="tertiary"
        />
        <StatCard 
          title="Ventes livrées" 
          value={24} 
          icon={CheckCircle} 
          color="secondary"
        />
        <StatCard 
          title="Total Portefeuille" 
          value="185 000 F" 
          icon={Wallet} 
          color="primary-container"
        />
      </section>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Urgent Orders (Left 2/3) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-3">
              Commandes à traiter
              <span className="bg-error text-on-error text-[10px] font-black px-2 py-0.5 rounded-full">3 NOUVELLES</span>
            </h2>
            <Link to="/farmer/orders" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[ 
              { id: '#045', product: 'Maïs sec', qty: '100 sacs', buyer: 'Fatima Traoré', price: '500 000 F', net: '485 000 F' },
              { id: '#046', product: 'Sorgho blanc', qty: '45 sacs', buyer: 'Idrissa Sawadogo', price: '225 000 F', net: '218 250 F' }
            ].map((order) => (
              <div key={order.id} className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors rounded-3xl p-6 border border-outline-variant/10 flex flex-col md:flex-row items-center gap-6 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-outline-variant/10 shadow-sm font-mono font-black text-primary text-sm">
                  {order.id}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-on-surface text-lg">{order.product}</h3>
                  <p className="text-sm text-outline font-medium">{order.qty} • <span className="text-primary/70">{order.buyer}</span></p>
                </div>
                <div className="text-center md:text-right px-6 border-x border-outline-variant/10 hidden md:block">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Prix Net</p>
                  <p className="font-mono font-black text-on-surface">{order.net}</p>
                </div>
                <Link to="/farmer/orders" className="w-full md:w-auto px-6 py-3 bg-white text-primary border border-primary/20 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
                  Gérer
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions & Tips (Right 1/3) */}
        <section className="space-y-8">
           <div className="bg-primary-container/20 rounded-[2.5rem] p-8 border border-primary-container/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
             <h3 className="text-xl font-serif-display text-on-primary-fixed-variant mb-4">Conseil du jour</h3>
             <p className="text-sm text-on-primary-fixed-variant opacity-80 leading-relaxed mb-6 font-medium">
               "Les prix du maïs sont en hausse de 5% cette semaine dans votre région. C'est le bon moment pour récolter !"
             </p>
             <button className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
               En savoir plus <ArrowRight className="w-4 h-4" />
             </button>
           </div>

           <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10">
             <h3 className="text-sm font-black text-on-surface uppercase tracking-widest mb-6">Activités Récentes</h3>
             <div className="space-y-6">
               {[
                 { label: 'Produit validé', desc: 'Maïs Jaune a été approuvé', time: 'il y a 2h', color: 'bg-green-500' },
                 { label: "New Message", desc: "D'Idrissa S.", time: "il y a 5h", color: "bg-blue-500" },
                 { label: 'Paiement reçu', desc: 'Commande #042', time: 'Hier', color: 'bg-amber-500' }
               ].map((act, i) => (
                 <div key={i} className="flex gap-4">
                   <div className="relative">
                     <div className={`w-2 h-2 rounded-full ${act.color} mt-1.5`}></div>
                     {i < 2 && <div className="absolute top-4 left-[3px] w-[1.5px] h-full bg-outline-variant/30"></div>}
                   </div>
                   <div>
                     <p className="text-xs font-bold text-on-surface">{act.label}</p>
                     <p className="text-[10px] text-outline font-medium">{act.desc} • {act.time}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </section>

      </div>
    </div>
  );
}
