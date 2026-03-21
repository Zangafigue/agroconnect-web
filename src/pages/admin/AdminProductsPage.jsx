<<<<<<< Updated upstream
// TODO: À implémenter par Membre 3
=======
import React, { useEffect } from 'react';
import { useProductStore } from '../../store/productStore';
import { getSellerName, getSellerInitials } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

>>>>>>> Stashed changes
export default function AdminProductsPage() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const displayProducts = products.length > 0 ? products : [
    {
      id: 1,
      name: "Maïs sec",
      description: "Grains de qualité supérieure",
      seller: "Amadou K.",
      category: "Céréales",
      price: 24500,
      unit: "sac",
      stock: 120,
      status: "Disponible",
      date: "12 Oct 2023",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD28ynd0gkOfXukecP9mCGrdpjwpJ4yVUkZShhAvgigQe3NBPZv5hGvHHdx_Yc14lD-EbwS327Jhe9LUl11SADg0wNjZOs92HUv0Zaw-euLQhfuCy6ixZPEOOIpONEb_4KeepKRV1PJnDzuz5npztO74rejrQbVeI4ukyhNSf8o96gh9Bte_fm0SI1PGWcK3z7okx6JBWGVZoxCV_gNhVeb5NO3Pd0DI0rd6M4Yc26QVfu7VzxuVteTjgUdLloQ5d6Hi9jlpUPpzts"
    },
    {
        id: 2,
        name: "Oignons",
        description: "Variété rouge locale",
        seller: "Fatima T.",
        category: "Légumes",
        price: 15000,
        unit: "cagette",
        stock: 45,
        status: "Suspendu",
        date: "10 Oct 2023",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWbiGoEnlWn3m16suQRs8nbwIAleuVR1pRtUUYyW5DkhTg4QwOauslxm3FOyfq54xsdpEVvIg89qZKeKe1e_79D3daseYsEyZY39m8OkL9fskHuE0iRaKtJTqluyGdVq_f1CwsVx2-JZF_J0bJ5sFL056DN-m7yFHqq7BSVqhsCphGWvCqeSwH2DfOUJ1C8ZjumYrFMEuva5EEyFIZcbipZU1LOVBiBRCTa4aRCrgIWdHE3ruUKscbARLmVE0S4KmhNE39z1lnnrw"
    }
  ];
  return (
<<<<<<< Updated upstream
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🌾</div>
        <h1 className="text-2xl font-bold text-gray-800">AdminProductsPage</h1>
        <p className="text-gray-500 mt-2">Page en cours de développement</p>
=======
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-2">Catalogue des Produits</h2>
          <p className="text-on-surface-variant max-w-lg">
            Gérez l'inventaire global, modérez les publications des vendeurs et suivez les niveaux de stock à travers le Burkina Faso.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Catégorie</label>
            <select className="bg-surface-container-lowest border-none rounded-lg text-sm px-4 py-2.5 shadow-sm min-w-[140px] focus:ring-2 focus:ring-primary/10">
              <option>Toutes</option>
              <option>Céréales</option>
              <option>Légumes</option>
              <option>Fruits</option>
              <option>Tubercules</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Vendeur</label>
            <select className="bg-surface-container-lowest border-none rounded-lg text-sm px-4 py-2.5 shadow-sm min-w-[140px] focus:ring-2 focus:ring-primary/10">
              <option>Tous les vendeurs</option>
              <option>Amadou K.</option>
              <option>Fatima T.</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Statut</label>
            <select className="bg-surface-container-lowest border-none rounded-lg text-sm px-4 py-2.5 shadow-sm min-w-[140px] focus:ring-2 focus:ring-primary/10">
              <option>Tous les statuts</option>
              <option>Disponible</option>
              <option>En Rupture</option>
              <option>Suspendu</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-surface-container-high text-outline">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">Produit</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">Vendeur</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">Catégorie</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">Prix</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-center whitespace-nowrap">Stock</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">Statut</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/50">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-20 text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-on-surface-variant font-bold">Chargement des produits...</p>
                  </td>
                </tr>
              ) : displayProducts.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                        <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{product.name}</p>
                        <p className="text-xs text-outline">{product.description || product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                        {getSellerInitials(product.seller, 2)}
                      </div>
                      <span className="text-sm font-medium">{getSellerName(product.seller)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      product.category === 'Céréales' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                    }`}>{product.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-mono font-medium text-on-surface">{formatFCFA(product.price)}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold">{product.stock} {product.unit}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      product.status === 'Disponible' ? 'bg-primary/10 text-primary' : 
                      product.status === 'Suspendu' ? 'bg-error/10 text-error' : 'bg-surface-container-highest text-on-surface-variant'
                    }`}>{product.status || (product.stock > 0 ? 'Disponible' : 'Rupture')}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-outline">{product.date || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-outline transition-colors" title="Détails">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-error/10 text-error/60 hover:text-error transition-colors" title={product.status === 'Suspendu' ? 'Restaurer' : 'Suspendre'}>
                        <span className="material-symbols-outlined text-lg">{product.status === 'Suspendu' ? 'restore' : 'block'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="px-6 py-4 bg-surface-container-highest/30 flex items-center justify-between border-t border-surface-container-high">
            <span className="text-xs text-outline">Affichage de 1-3 sur 42 produits</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-outline cursor-not-allowed">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white shadow-sm text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-outline text-xs font-bold hover:bg-surface-container-low transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-outline text-xs font-bold hover:bg-surface-container-low transition-colors">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-outline hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
