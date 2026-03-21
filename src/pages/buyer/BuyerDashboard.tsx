import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShoppingCart, 
  MessageSquare, 
  Wallet, 
  ArrowRight, 
  Search,
  Heart
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';

export default function BuyerDashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif-display text-4xl text-on-surface mb-2 tracking-tight">Espace Acheteur</h1>
          <p className="text-outline font-medium opacity-80">Trouvez les meilleurs produits frais au prix juste.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/buyer/marketplace" 
            className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Search className="w-5 h-5" />
            Explorer le Marché
          </Link>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Commandes Actives" 
          value={2} 
          icon={ShoppingCart} 
          color="primary"
        />
        <StatCard 
          title="Produit Favoris" 
          value={12} 
          icon={Heart} 
          color="error"
        />
        <StatCard 
          title="Messages non lus" 
          value={5} 
          icon={MessageSquare} 
          color="tertiary"
        />
      </section>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders (Left 2/3) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-on-surface">Mes derniers achats</h2>
            <Link to="/buyer/orders" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Tout voir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[ 
              { id: '#B-882', product: 'Pommes de terre', qty: '50kg', status: 'En livraison', price: '25 000 F', date: '21 Mars' },
              { id: '#B-881', product: 'Oignons Galmi', qty: '2 sacs', status: 'Payé', price: '30 000 F', date: '20 Mars' }
            ].map((order) => (
              <div key={order.id} className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors rounded-3xl p-6 border border-outline-variant/10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-outline-variant/10 shadow-sm font-mono font-black text-primary text-sm">
                  {order.id}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-on-surface text-lg">{order.product}</h3>
                  <p className="text-sm text-outline font-medium">{order.qty} • <span className="text-primary-container font-bold">{order.status}</span></p>
                </div>
                <div className="text-center md:text-right px-6 border-x border-outline-variant/10 hidden md:block">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Montant</p>
                  <p className="font-mono font-black text-on-surface">{order.price}</p>
                </div>
                <Link to={`/buyer/orders`} className="w-full md:w-auto px-6 py-3 bg-white text-primary border border-primary/20 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
                  Détails
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Categories / Market Quick Filter */}
        <section className="space-y-8">
           <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10">
             <h3 className="text-sm font-black text-on-surface uppercase tracking-widest mb-6">Filtrer par catégorie</h3>
             <div className="grid grid-cols-2 gap-3">
               {['Céréales', 'Légumes', 'Fruits', 'Bétail'].map((cat) => (
                 <button key={cat} className="px-4 py-3 bg-surface-container-low rounded-2xl text-xs font-bold text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
                   {cat}
                 </button>
               ))}
             </div>
             <Link to="/buyer/marketplace" className="w-full mt-6 py-3 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all block text-center">
               Toutes les catégories
             </Link>
           </div>

           <div className="bg-tertiary-container/10 rounded-[2.5rem] p-8 border border-tertiary-container/10">
             <h3 className="text-xl font-serif-display text-on-tertiary-container mb-4">Offres Spéciales</h3>
             <p className="text-sm text-on-tertiary-container/70 mb-6 font-medium">
               Profitez de -10% sur les commandes groupées de maïs cette semaine !
             </p>
             <button className="px-6 py-2 bg-tertiary text-white rounded-xl text-xs font-bold shadow-lg shadow-tertiary/20">
               En profiter
             </button>
           </div>
        </section>

      </div>
    </div>
  );
}
