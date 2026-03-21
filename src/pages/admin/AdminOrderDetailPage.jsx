import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import { getSellerName, getSellerInitials } from '../../utils/seller';
import { formatFCFA } from '../../utils/currency';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const { orders, fetchOrders } = useOrderStore();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders();
    }
  }, [fetchOrders, orders.length]);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === id || String(o.id) === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else if (id === '045' || id === 'CMD-2035') {
       const mockOrders = [
        {
          id: '045',
          status: 'EN LIVRAISON',
          buyer: "Fatima T.",
          buyerId: '1',
          seller: "Amadou K.",
          sellerId: '2',
          transporter: "Koné D.",
          transporterId: '3',
          buyerPhone: '+226 70 00 00 00',
          sellerPhone: '+226 75 11 11 11',
          transporterPhone: '+226 78 22 22 22',
          origin: 'Koudougou',
          destination: 'Ouagadougou',
          distance: '102 km',
          estimatedTime: '1h 45m',
          weight: '500 kg',
          totalProduct: 70000,
          shipping: 15000,
          commission: 2100,
          total: 85000
        }
       ];
       setOrder(mockOrders.find(o => o.id === id));
    }
  }, [orders, id]);

  if (!order && id !== '045' && id !== 'CMD-2035') {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-on-surface-variant font-bold">Chargement de la commande...</p>
        </div>
    );
  }

  const currentOrder = order || {
      id: id,
      status: 'INCONNU',
      buyer: "N/A",
      seller: "N/A",
      total: 0
  };

  return (
    <div className="pb-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center w-full mb-8">
        <div className="flex items-center gap-6">
          <Link to="/admin/orders" className="flex items-center text-outline hover:text-primary transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="ml-2">Commandes</span>
          </Link>
          <div className="h-6 w-[1px] bg-outline-variant/30"></div>
          <div className="flex items-center gap-3">
            <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface">Commande <span className="font-mono">#{id || '045'}</span></h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                currentOrder.status === 'LIVRÉE' ? 'bg-primary/10 text-primary' : 
                currentOrder.status === 'LITIGE' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-fixed-variant'
            }`}>
              {currentOrder.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* COLONNE GAUCHE (60%) */}
        <div className="md:col-span-3 space-y-8">
          {/* Card Acteurs */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] border border-outline-variant/15">
            <h3 className="font-headline text-xl font-bold mb-6 text-on-surface">Acteurs de la transaction</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {getSellerInitials(currentOrder.buyer, 2)}
                  </div>
                  <div>
                    <p className="text-xs text-outline uppercase font-bold tracking-widest">Acheteur</p>
                    <p className="font-bold text-on-surface">{getSellerName(currentOrder.buyer)}</p>
                    <p className="text-sm text-outline">{currentOrder.buyerPhone || '+226 -- -- -- --'}</p>
                  </div>
                </div>
                <Link to={`/admin/users/${currentOrder.buyerId || '1'}`} className="text-primary text-sm font-bold hover:underline">Voir profil</Link>
              </div>
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {getSellerInitials(currentOrder.seller, 2)}
                  </div>
                  <div>
                    <p className="text-xs text-outline uppercase font-bold tracking-widest">Vendeur</p>
                    <p className="font-bold text-on-surface">{getSellerName(currentOrder.seller)}</p>
                    <p className="text-sm text-outline">{currentOrder.sellerPhone || '+226 -- -- -- --'}</p>
                  </div>
                </div>
                <Link to={`/admin/users/${currentOrder.sellerId || '2'}`} className="text-primary text-sm font-bold hover:underline">Voir profil</Link>
              </div>
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-white font-bold text-lg shadow-sm">KD</div>
                  <div>
                    <p className="text-xs text-outline uppercase font-bold tracking-widest">Transporteur</p>
                    <p className="font-bold text-on-surface">Koné D.</p>
                    <p className="text-sm text-outline">+226 78 22 22 22</p>
                  </div>
                </div>
                <Link to="/admin/users/3" className="text-primary text-sm font-bold hover:underline">Voir profil</Link>
              </div>
            </div>
          </section>

          {/* Card Carte Livraison */}
          <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] border border-outline-variant/15">
            <div className="p-8">
              <h3 className="font-headline text-xl font-bold mb-4 text-on-surface">Suivi de l'itinéraire</h3>
            </div>
            <div className="relative h-72 bg-surface-container flex items-center justify-center">
              <img className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZhSoQeElfv_TD84ntROequuz0uW8ip9ydyCSG0L2IcTa2EICDFXouX9Ra13nOTFl1s47-969H9Q9CkOA1S3u5-j4R0Rmt4VDdcufaagYV-ZZkdlrenzEKlYszjYQsjs3CM4zMd2cW0-_8oSwfdTxwk_pgw-mktUZNTYzaB879p2WmgsOnmYKXFAGdSvkLbtBQE3NpyO2MSE_EQeld316NCOIpGpQbhBbFXnW5b7n_i5dD3Fea492ygGe2fRqpFWla1muIysRYcec" alt="Carte Satellite" />
              <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg text-center">
                <p className="text-xs font-bold text-secondary uppercase tracking-widest">Trajet en cours</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-bold text-on-surface">{currentOrder.origin || 'N/A'}</span>
                  <span className="material-symbols-outlined text-primary">trending_flat</span>
                  <span className="font-bold text-on-surface">{currentOrder.destination || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-surface-container-low flex justify-around gap-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-primary">distance</span>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-bold">Distance</p>
                  <p className="font-mono font-bold text-on-surface">{currentOrder.distance || '-- km'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-bold">Temps estimé</p>
                  <p className="font-mono font-bold text-on-surface">{currentOrder.estimatedTime || '--h --m'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-primary">weight</span>
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-bold">Poids</p>
                  <p className="font-mono font-bold text-on-surface">{currentOrder.weight || '-- kg'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Card Chronologie */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] border border-outline-variant/15">
            <h3 className="font-headline text-xl font-bold mb-8 text-on-surface">Journal d'activité</h3>
            <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-surface-container-high">
              <div className="relative flex items-start gap-6 pl-12">
                <div className="absolute left-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 border-4 border-white shadow-sm">
                  <span className="material-symbols-outlined text-white text-lg">local_shipping</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Départ de l'entrepôt</p>
                  <p className="text-sm text-outline">Transporteur Koné D. a quitté Koudougou</p>
                  <p className="font-mono text-[10px] mt-1 text-primary uppercase font-bold">24 Oct 2023 — 08:30</p>
                </div>
              </div>
              <div className="relative flex items-start gap-6 pl-12">
                <div className="absolute left-0 w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center z-10 border-4 border-white shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Paiement confirmé</p>
                  <p className="text-sm text-outline">Le montant a été sécurisé par AgroConnect</p>
                  <p className="font-mono text-[10px] mt-1 text-outline uppercase font-bold">23 Oct 2023 — 17:15</p>
                </div>
              </div>
              <div className="relative flex items-start gap-6 pl-12">
                <div className="absolute left-0 w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center z-10 border-4 border-white shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-lg">inventory</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Commande créée</p>
                  <p className="text-sm text-outline">Acheteur Fatima T. a validé son panier</p>
                  <p className="font-mono text-[10px] mt-1 text-outline uppercase font-bold">23 Oct 2023 — 16:45</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* COLONNE DROITE (40%) */}
        <div className="md:col-span-2 space-y-8">
          {/* Card Résumé Financier */}
          <section className="bg-surface-container-lowest rounded-xl shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] border border-outline-variant/15 overflow-hidden">
            <div className="p-8 bg-surface-container-low/50 border-b border-outline-variant/10">
              <h3 className="font-headline text-xl font-bold text-on-surface">Résumé financier</h3>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-outline">Produits</span>
                <span className="font-mono font-medium text-on-surface">{formatFCFA(currentOrder.totalProduct)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-outline">Livraison</span>
                <span className="font-mono font-medium text-on-surface">{formatFCFA(currentOrder.shipping)}</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-4 border-b border-surface-container-high border-dashed">
                <span className="text-outline">Commission AgroConnect (3%)</span>
                <span className="font-mono font-medium text-tertiary">-{formatFCFA(currentOrder.commission)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-on-surface">Total net</span>
                <span className="font-mono font-bold text-2xl text-primary">{formatFCFA(currentOrder.total)}</span>
              </div>
            </div>
            <div className="px-8 pb-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 bg-tertiary-fixed rounded-lg border border-tertiary/10">
                <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-tertiary text-sm">lock</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Statut financier</p>
                  <p className="text-sm font-bold text-on-tertiary-fixed">RETENU</p>
                </div>
              </div>
              <Link to={`/admin/disputes/LIT-451`} className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">gavel</span>
                Gérer le litige
              </Link>
            </div>
          </section>

          {/* Infos complémentaires / Documents */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_24px_48px_-12px_rgba(12,32,13,0.06)] border border-outline-variant/15">
            <h3 className="font-headline text-lg font-bold mb-4 text-on-surface">Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
                <span className="material-symbols-outlined text-primary">description</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Facture_045.pdf</p>
                  <p className="text-[10px] text-outline uppercase font-mono">1.2 MB • PDF</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
                <span className="material-symbols-outlined text-primary">verified</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Bon_Livraison.pdf</p>
                  <p className="text-[10px] text-outline uppercase font-mono">0.8 MB • PDF</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
