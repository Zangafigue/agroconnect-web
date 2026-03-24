import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  User, 
  Tag, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  FileText,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3
} from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { formatFCFA } from '../../utils/currency';

const AdminProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedProduct, fetchProductById, updateProductStatus, deleteProduct, loading } = useProductStore() as any;

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  const handleToggleStatus = async () => {
    if (!selectedProduct) return;
    const newStatus = selectedProduct.status === 'active' ? 'inactive' : 'active';
    await updateProductStatus(selectedProduct._id, newStatus);
  };

  const handleDelete = async () => {
    if (window.confirm('Supprimer définitivement ce produit du catalogue ?')) {
      await deleteProduct(selectedProduct._id);
      navigate('/admin/products');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-pulse">
        <div className="w-16 h-16 border-4 border-[var(--green-600)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] italic">Synchronisation des données produit...</p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-20 bg-[var(--bg-muted)]/10 rounded-[3rem] border border-dashed border-[var(--border-light)]">
        <Package size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-20" />
        <h3 className="text-xl font-display font-black text-[var(--text-accent)] uppercase mb-2">Ressource Introuvable</h3>
        <p className="text-xs text-[var(--text-muted)] mb-6">Ce produit n'existe plus dans l'index national.</p>
        <button onClick={() => navigate('/admin/products')} className="px-8 py-4 bg-[var(--text-accent)] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">
           Retourner au Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-body">
      {/* Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/admin/products')}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-accent)] hover:bg-[var(--bg-muted)] transition-all shadow-sm group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] opacity-60">ID PRODUIT: {selectedProduct._id?.slice(-8).toUpperCase()}</span>
               <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${selectedProduct.status === 'active' ? 'bg-[var(--green-600)]/10 text-[var(--green-600)]' : 'bg-red-500/10 text-red-500'}`}>
                 {selectedProduct.status === 'active' ? 'PUBLIÉ' : 'SUSPENDU'}
               </span>
            </div>
            <h2 className="text-4xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight leading-none">{selectedProduct.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleToggleStatus}
            className={`flex-1 md:flex-none px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border transition-all ${selectedProduct.status === 'active' ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-[var(--green-600)]/30 text-[var(--green-600)] hover:bg-[var(--green-600)]/5'}`}
          >
            {selectedProduct.status === 'active' ? 'Mettre hors-ligne' : 'Rétablir la vente'}
          </button>
          <button 
            onClick={handleDelete}
            className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all group"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Media & Primary Info */}
        <div className="lg:col-span-2 space-y-10">
          {/* Main Visual Card */}
          <div className="bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-light)] overflow-hidden shadow-sm relative group">
             <div className="aspect-video relative overflow-hidden bg-[var(--bg-muted)]">
                <img 
                  src={selectedProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                   <div className="flex flex-wrap items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-4 rounded-[1.5rem] text-white">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Prix de base</p>
                         <p className="text-3xl font-display font-bold leading-none">{formatFCFA(selectedProduct.price)} <span className="text-sm opacity-60">/ {selectedProduct.unit}</span></p>
                      </div>
                      <div className="bg-[var(--green-600)] border border-[var(--green-600)] px-6 py-4 rounded-[1.5rem] text-white shadow-xl shadow-[var(--green-600)]/20">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Stock Disponible</p>
                         <p className="text-3xl font-display font-bold leading-none">{selectedProduct.stock} <span className="text-sm opacity-60">{selectedProduct.unit?.split('/')[0]}</span></p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-10">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-black text-[var(--green-600)] uppercase tracking-widest border border-[var(--green-600)]/10 bg-[var(--green-600)]/5 px-4 py-1.5 rounded-full w-fit">
                   <Tag size={12} />
                   <span>Classification: {selectedProduct.category}</span>
                </div>
                <h3 className="text-2xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight mb-4">Description de l'Offre</h3>
                <p className="text-[var(--text-muted)] font-medium leading-[1.8] text-lg bg-[var(--bg-muted)]/20 p-8 rounded-[2rem] border border-[var(--border-light)] italic">
                   "{selectedProduct.description || 'Aucun détail supplémentaire fourni pour cette ressource.'}"
                </p>
             </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-[var(--bg-surface)] p-8 rounded-[2.5rem] border border-[var(--border-light)] shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-accent)]">
                      <BarChart3 size={24} />
                   </div>
                   <h4 className="font-display font-black text-[var(--text-accent)] uppercase tracking-tight italic">Métriques de Performance</h4>
                </div>
                <div className="space-y-6">
                   <div className="flex justify-between items-end border-b border-dashed border-[var(--border-light)] pb-4">
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Taux de Conversion</span>
                      <span className="font-display font-black text-[var(--text-accent)] text-lg">4.2%</span>
                   </div>
                   <div className="flex justify-between items-end border-b border-dashed border-[var(--border-light)] pb-4">
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Vues cumulées</span>
                      <span className="font-display font-black text-[var(--text-accent)] text-lg">1,248</span>
                   </div>
                   <div className="flex justify-between items-end border-b border-dashed border-[var(--border-light)] pb-4">
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">En panier (Total)</span>
                      <span className="font-display font-black text-[var(--text-accent)] text-lg">12</span>
                   </div>
                </div>
             </div>

             <div className="bg-[var(--text-accent)] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <Database className="absolute -right-6 -bottom-6 text-white/5 w-40 h-40 rotate-12 group-hover:rotate-0 transition-all duration-1000" />
                <div className="flex items-center gap-4 mb-8 relative z-10">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                      <ShieldCheck size={24} />
                   </div>
                   <h4 className="font-display font-black text-white uppercase tracking-tight italic">Conformité Qualité</h4>
                </div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4 relative z-10">Dernière inspection</p>
                <div className="flex items-center gap-3 bg-white/10 p-5 rounded-2xl border border-white/5 mb-6 relative z-10">
                   <CheckCircle2 className="text-[var(--green-600)]" />
                   <div>
                      <p className="text-white text-xs font-black uppercase">VÉRIFIÉ & CERTIFIÉ</p>
                      <p className="text-white/40 text-[9px] font-medium tracking-widest uppercase">Laboratoire Central Agro - 12/2024</p>
                   </div>
                </div>
                <button className="w-full py-4 bg-white text-[var(--text-accent)] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg relative z-10 hover:bg-[var(--green-50)] transition-all">
                   Voir les Certificats
                </button>
             </div>
          </div>
        </div>

        {/* Right Column: Producer & Actions */}
        <div className="space-y-10">
          {/* Producer Card */}
          <div className="bg-[var(--bg-surface)] p-8 rounded-[2.5rem] border border-[var(--border-light)] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <span className="p-2 bg-[var(--green-600)]/10 text-[var(--green-600)] rounded-xl border border-[var(--green-600)]/20 animate-pulse">
                  <ShieldCheck size={16} />
               </span>
            </div>
            <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-8 italic">Responsable de l'Offre</h4>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-[2.5rem] bg-[var(--bg-muted)] border-4 border-white shadow-2xl mb-6 overflow-hidden">
                <img 
                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedProduct.seller?.name || 'Agro'}`} 
                   alt="Producteur"
                   className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-2xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight mb-2">{selectedProduct.seller?.name || 'Inconnu'}</h5>
              <p className="text-[10px] font-black text-[var(--green-600)] uppercase tracking-[0.2em] mb-8">Membre de la Coopérative FASO</p>
              
              <div className="w-full space-y-3 mb-8">
                 <div className="flex items-center gap-4 bg-[var(--bg-muted)]/50 p-4 rounded-2xl border border-[var(--border-light)]">
                    <MapPin className="text-[var(--text-muted)]" size={18} />
                    <div className="text-left">
                       <p className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">Localisation</p>
                       <p className="text-[10px] font-bold text-[var(--text-accent)]">Ouagadougou, Zone Artisanale</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-[var(--bg-muted)]/50 p-4 rounded-2xl border border-[var(--border-light)]">
                    <Calendar className="text-[var(--text-muted)]" size={18} />
                    <div className="text-left">
                       <p className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">Sur la plateforme depuis</p>
                       <p className="text-[10px] font-bold text-[var(--text-accent)]">Septembre 2023</p>
                    </div>
                 </div>
              </div>

              <button 
                 onClick={() => navigate(`/admin/users/${selectedProduct.seller?._id}`)}
                 className="w-full py-5 border border-[var(--border-light)] text-[var(--text-accent)] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--text-accent)] hover:text-white transition-all shadow-sm flex items-center justify-center gap-3"
              >
                 Dossier Vendeur Complet
                 <ExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Quick Actions / Audit Log */}
          <div className="bg-[var(--bg-surface)] p-8 rounded-[2.5rem] border border-[var(--border-light)] shadow-sm">
             <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-8 italic">Audit du Produit</h4>
             <div className="space-y-6">
                {[
                  { event: 'Produit listé', date: '20 Oct 2024', user: 'Système', icon: CheckCircle2, color: 'text-[var(--green-600)]' },
                  { event: 'Prix modifié (+5%)', date: '02 Nov 2024', user: 'Producteur', icon: RotateCcw, color: 'text-orange-500' },
                  { event: 'Stock mis à jour', date: '15 Nov 2024', user: 'Vendeur', icon: Package, color: 'text-blue-500' },
                  { event: 'Contrôle conformité', date: '20 Dec 2024', user: 'Admin', icon: ShieldCheck, color: 'text-[var(--text-accent)]' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                     <div className={`mt-1 w-1 px-[1px] ${idx === 3 ? 'bg-transparent' : 'bg-[var(--border-light)]'} relative flex flex-col items-center`}>
                        <div className={`w-3 h-3 rounded-full ${item.color} bg-white border-2 border-current z-10 shadow-sm transition-transform group-hover:scale-125`}></div>
                     </div>
                     <div className="flex-1 pb-6 border-b border-[var(--border-light)] last:border-0">
                        <p className="text-[10px] font-black text-[var(--text-accent)] uppercase tracking-tight mb-1">{item.event}</p>
                        <div className="flex items-center gap-3 text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest opacity-60">
                           <span>{item.date}</span>
                           <span className="w-1 h-1 bg-[var(--text-muted)] rounded-full opacity-30"></span>
                           <span>Par {item.user}</span>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-10 bg-orange-50 rounded-[2.5rem] border border-orange-100 flex items-start gap-6 relative overflow-hidden group">
             <AlertTriangle className="text-orange-500 flex-shrink-0 animate-pulse" size={32} />
             <div>
                <h5 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Vigilance Administrative</h5>
                <p className="text-[11px] font-medium text-orange-800 leading-relaxed italic opacity-80">
                   Ce produit affiche une rotation de stock anormalement élevée sur les dernières 48h. Une vérification de la qualité logistique est conseillée.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetailPage;
