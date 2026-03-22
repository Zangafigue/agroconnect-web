import React from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  ShieldAlert, 
  RotateCcw, 
  BadgeCheck, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  AlertCircle
} from 'lucide-react';

const AdminProductsPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-serif-display text-on-surface mb-2">Catalogue des Produits</h2>
          <p className="text-on-surface-variant max-w-lg">
            Gérez l'inventaire global, modérez les publications et suivez les stocks nationaux.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: 'Catégorie', options: ['Toutes', 'Céréales', 'Légumes', 'Fruits'] },
            { label: 'Statut', options: ['Tous', 'Disponible', 'En Rupture', 'Suspendu'] }
          ].map((filter) => (
            <div key={filter.label} className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline ml-1">{filter.label}</label>
              <select className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl text-sm px-4 py-2.5 shadow-sm min-w-[150px] focus:ring-4 focus:ring-primary/10 outline-none transition-all cursor-pointer">
                {filter.options.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low/30 text-[10px] uppercase tracking-[0.15em] text-outline font-bold border-b border-outline-variant/5">
                <th className="px-8 py-5">Produit</th>
                <th className="px-8 py-5">Vendeur</th>
                <th className="px-8 py-5">Catégorie</th>
                <th className="px-8 py-5">Prix</th>
                <th className="px-8 py-5 text-center">Stock</th>
                <th className="px-8 py-5">Statut</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {[
                { 
                  name: 'Maïs sec', 
                  desc: 'Grains premium', 
                  seller: 'Amadou K.', 
                  category: 'Céréales', 
                  price: '24 500', 
                  stock: '120 sac', 
                  status: 'Disponible',
                  color: 'primary',
                  img: 'https://images.unsplash.com/photo-1551733938-22ee484d0ef4?auto=format&fit=crop&q=80&w=150&h=150'
                },
                { 
                  name: 'Oignons', 
                  desc: 'Rouge local', 
                  seller: 'Fatima T.', 
                  category: 'Légumes', 
                  price: '15 000', 
                  stock: '45 cagette', 
                  status: 'Suspendu',
                  color: 'error',
                  img: 'https://images.unsplash.com/photo-1508747703725-71977713d540?auto=format&fit=crop&q=80&w=150&h=150'
                },
                { 
                  name: 'Sorgho Bio', 
                  desc: 'Récolte 2024', 
                  seller: 'Amadou K.', 
                  category: 'Céréales', 
                  price: '22 000', 
                  stock: '0 sac', 
                  status: 'En Rupture',
                  color: 'outline',
                  img: 'https://images.unsplash.com/photo-1599819177626-b50f9dd21c9b?auto=format&fit=crop&q=80&w=150&h=150'
                }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-surface-container-high overflow-hidden flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        <img className="w-full h-full object-cover" src={row.img} alt={row.name} />
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface">{row.name}</p>
                        <p className="text-[10px] text-outline font-medium uppercase tracking-wider">{row.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-bold text-on-surface-variant underline decoration-primary/30 underline-offset-4">{row.seller}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-surface-container-high text-on-surface-variant border border-outline-variant/10">{row.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-serif-display text-lg text-on-surface">{row.price} <span className="text-[10px] text-outline font-body">CFA</span></span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-sm font-bold ${row.stock.startsWith('0') ? 'text-error' : 'text-on-surface'}`}>{row.stock}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-${row.color}/10 text-${row.color} border border-${row.color}/20`}>
                       {row.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2.5 text-outline hover:text-primary hover:bg-primary/5 rounded-xl transition-all" title="Détails">
                        <Eye size={20} />
                      </button>
                      <button className={`p-2.5 rounded-xl transition-all ${row.status === 'Suspendu' ? 'text-primary hover:bg-primary/5' : 'text-error'}`} title={row.status === 'Suspendu' ? 'Rétablir' : 'Suspendre'}>
                        {row.status === 'Suspendu' ? <RotateCcw size={20} /> : <ShieldAlert size={20} />}
                      </button>
                      <button className="p-2.5 text-outline hover:bg-surface-container rounded-xl transition-all">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/10 bg-surface-container-lowest">
            <span className="text-xs text-outline italic">Affichage de <span className="font-bold text-on-surface not-italic">1 - 3</span> sur <span className="font-bold text-on-surface not-italic">42</span> produits</span>
            <div className="flex items-center gap-1.5">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-outline border border-outline-variant/30 cursor-not-allowed opacity-30">
                <ChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 text-xs font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container text-outline text-xs font-bold transition-all border border-outline-variant/10">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container text-outline transition-all border border-outline-variant/10">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
