import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  Gavel, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Package
} from 'lucide-react';

const AdminOrdersPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-serif-display text-on-surface mb-2">Gestion des Commandes</h2>
          <p className="text-on-surface-variant max-w-lg">
            Supervisez le flux transactionnel, les livraisons et résolvez les blocages de paiement.
          </p>
        </div>
      </div>

      {/* Toolbar Section */}
      <section className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="flex-1 min-w-[300px]">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Référence, acheteur, vendeur..." 
              className="w-full border border-outline-variant/30 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-surface-container-low/30 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select className="appearance-none border border-outline-variant/30 rounded-2xl text-sm py-3 pl-4 pr-10 focus:ring-4 focus:ring-primary/10 bg-surface-container-low/30 outline-none cursor-pointer">
              <option>Tous les statuts</option>
              <option>En attente</option>
              <option>Confirmée</option>
              <option>En transit</option>
              <option>Livrée</option>
              <option>Litige</option>
            </select>
            <Filter size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          </div>
          <div className="relative">
             <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
             <input type="date" className="border border-outline-variant/30 rounded-2xl text-xs py-3 pl-12 pr-4 focus:ring-4 focus:ring-primary/10 bg-surface-container-low/30 outline-none text-outline cursor-pointer" />
          </div>
          <button className="bg-surface-container-high text-on-surface px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-white transition-all border border-outline-variant/10">
            <Filter size={18} /> Filtres avancés
          </button>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-surface-container-low/30 text-[10px] uppercase tracking-[0.15em] text-outline font-bold border-b border-outline-variant/5">
                <th className="px-8 py-5">Référence</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Intervenants</th>
                <th className="px-8 py-5 text-right">Montant Total</th>
                <th className="px-8 py-5">Statut</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {[
                { ref: 'CMD-2035', date: "Aujourd'hui, 10:23", buyer: 'Fatima T.', bLoc: 'Ouaga', seller: 'Amadou K.', sLoc: 'Bobo', price: '125 000', status: 'En Attente', color: 'outline', icon: Clock },
                { ref: 'CMD-045', date: 'Hier, 15:40', buyer: 'Saliou D.', bLoc: 'Koudougou', seller: 'Coop Nord', sLoc: 'Ouahigouya', price: '85 000', status: 'En Transit', color: 'tertiary', icon: Truck },
                { ref: 'CMD-2033', date: '12 Oct 2023', buyer: 'Awa Koné', bLoc: 'Banfora', seller: 'Ferme Yac', sLoc: 'Sindou', price: '45 500', status: 'Livrée', color: 'primary', icon: CheckCircle2 },
                { ref: 'CMD-2031', date: '10 Oct 2023', buyer: 'Moussa Z.', bLoc: 'Dori', seller: 'Groupement Sud', sLoc: 'Gaoua', price: '320 000', status: 'Litige', color: 'error', icon: AlertTriangle, urgent: true },
              ].map((order, i) => (
                <tr key={i} className={`hover:bg-surface-container-low/20 transition-colors group ${order.urgent ? 'bg-error/5' : ''}`}>
                  <td className="px-8 py-6">
                    <Link to={`/admin/orders/${order.ref}`} className={`font-mono font-bold flex items-center gap-2 hover:underline ${order.urgent ? 'text-error' : 'text-primary'}`}>
                      {order.urgent && <AlertTriangle size={14} className="animate-pulse" />}
                      #{order.ref}
                    </Link>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-on-surface-variant flex items-center gap-1.5 italic">
                       <Clock size={14} className="text-outline" /> {order.date}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">{order.buyer}</span>
                        <span className="text-[10px] text-outline uppercase tracking-wider">{order.bLoc}</span>
                      </div>
                      <div className="h-4 w-px bg-outline-variant/30"></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">{order.seller}</span>
                        <span className="text-[10px] text-outline uppercase tracking-wider">{order.sLoc}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="font-serif-display text-lg text-on-surface">{order.price} <span className="text-[10px] text-outline font-body">F</span></span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${order.color}/10 text-${order.color} border border-${order.color}/20 shadow-sm`}>
                      <order.icon size={12} />
                      {order.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin/orders/${order.ref}`} className="p-2.5 text-outline hover:text-primary hover:bg-primary/5 rounded-xl transition-all" title="Détails">
                        <Eye size={20} />
                      </Link>
                      {order.status === 'Litige' ? (
                        <Link to={`/admin/disputes/${order.ref}`} className="p-2.5 text-error hover:bg-error/10 rounded-xl transition-all" title="Gérer le litige">
                          <Gavel size={20} />
                        </Link>
                      ) : (
                        <button className="p-2.5 text-outline hover:bg-surface-container rounded-xl transition-all">
                          <MoreVertical size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/10 bg-surface-container-lowest">
          <p className="text-xs text-outline font-medium italic">Affichage de <span className="font-bold text-on-surface not-italic">1 - 10</span> sur <span className="font-bold text-on-surface not-italic">1 204</span> commandes</p>
          <div className="flex items-center gap-1.5">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-outline border border-outline-variant/30 cursor-not-allowed opacity-30">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 text-xs font-bold transition-all">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container text-outline text-xs font-bold transition-all border border-outline-variant/10">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container text-outline transition-all border border-outline-variant/10">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminOrdersPage;
