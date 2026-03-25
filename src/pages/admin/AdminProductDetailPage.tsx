import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  User, 
  Tag, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Trash2, 
  ExternalLink,
  BarChart3,
  CheckCircle2,
  Ban,
  AlertTriangle,
  History
} from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';
import Avatar from '../../components/shared/Avatar';
import toast from 'react-hot-toast';

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
    try {
      await updateProductStatus(selectedProduct._id, newStatus);
      toast.success(newStatus === 'active' ? 'Produit publié' : 'Produit suspendu');
    } catch (error) {
      toast.error('Erreur lors du changement de statut');
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    if (window.confirm('Supprimer définitivement ce produit du catalogue ?')) {
      try {
        await deleteProduct(selectedProduct._id);
        toast.success('Produit supprimé');
        navigate('/admin/products');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  if (loading && !selectedProduct) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">Synchronisation des données...</p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-20">
        <Package size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-20" />
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Produit introuvable</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Cette ressource n'existe plus ou a été déplacée.</p>
        <Button onClick={() => navigate('/admin/products')}>Retour au catalogue</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/products')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-all border border-[var(--border-light)]"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] bg-[var(--bg-muted)] px-2 py-0.5 rounded uppercase tracking-wider">
                 ID: {selectedProduct._id?.slice(-8).toUpperCase()}
               </span>
               <StatusBadge status={selectedProduct.status === 'active' ? 'PUBLIÉ' : 'SUSPENDU'} />
            </div>
            <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight">{selectedProduct.name}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedProduct.status === 'active' ? 'secondary' : 'primary'}
            onClick={handleToggleStatus}
            icon={selectedProduct.status === 'active' ? <Ban size={16} /> : <CheckCircle2 size={16} />}
          >
            {selectedProduct.status === 'active' ? 'Suspendre' : 'Publier'}
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
            icon={<Trash2 size={16} />}
          >
            Supprimer
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
           {/* Visual & Core Data */}
           <Card className="overflow-hidden p-0">
              <div className="aspect-video relative bg-[var(--bg-muted)]">
                 <img 
                    src={selectedProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg flex flex-col items-center min-w-[100px]">
                       <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Prix</span>
                       <span className="text-lg font-bold text-[var(--text-primary)]">{formatFCFA(selectedProduct.price)}</span>
                    </div>
                    <div className="bg-[var(--text-accent)] text-white px-4 py-2 rounded-xl shadow-lg flex flex-col items-center min-w-[100px]">
                       <span className="text-[10px] font-bold opacity-80 uppercase">Stock</span>
                       <span className="text-lg font-bold">{selectedProduct.stock} {selectedProduct.unit?.split('/')[0]}</span>
                    </div>
                 </div>
              </div>
              <div className="p-8">
                 <div className="flex items-center gap-2 mb-4">
                    <Tag size={16} className="text-[var(--text-accent)]" />
                    <span className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{selectedProduct.category}</span>
                 </div>
                 <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Description</h3>
                 <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed italic border-l-4 border-[var(--text-accent)]/20 pl-6 py-2">
                    {selectedProduct.description || 'Aucune description détaillée disponible pour ce produit.'}
                 </p>
              </div>
           </Card>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[var(--bg-subtle)] rounded-lg text-[var(--text-accent)]">
                       <BarChart3 size={20} />
                    </div>
                    <h4 className="font-bold text-[var(--text-primary)]">Statistiques</h4>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                       <span className="text-[12px] text-[var(--text-secondary)] font-medium">Vues totales</span>
                       <span className="text-sm font-bold text-[var(--text-primary)]">1,248</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                       <span className="text-[12px] text-[var(--text-secondary)] font-medium">Taux d'achat</span>
                       <span className="text-sm font-bold text-[var(--green-600)]">4.2%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                       <span className="text-[12px] text-[var(--text-secondary)] font-medium">Dernière vente</span>
                       <span className="text-sm font-bold text-[var(--text-primary)]">Il y a 2h</span>
                    </div>
                 </div>
              </Card>

              <Card className="p-6 bg-[var(--bg-subtle)] border-dashed border-2">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white rounded-lg text-[var(--green-600)] shadow-sm">
                       <ShieldCheck size={20} />
                    </div>
                    <h4 className="font-bold text-[var(--text-primary)]">Conformité</h4>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-[var(--green-600)]/10 mb-4">
                    <CheckCircle2 size={18} className="text-[var(--green-600)]" />
                    <div>
                       <p className="text-[11px] font-bold text-[var(--text-primary)] uppercase">Produit Certifié</p>
                       <p className="text-[9px] text-[var(--text-muted)]">Validé par Labo Agro</p>
                    </div>
                 </div>
                 <Button variant="ghost" size="sm" fullWidth className="text-[11px] font-bold uppercase">Voir les certificats</Button>
              </Card>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Producer Info */}
           <Card className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <ShieldCheck size={18} className="text-[var(--green-600)]" />
              </div>
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">Vendeur Responsable</p>
              <Avatar 
                 name={selectedProduct.seller?.name || 'Agro'}
                 size="xl"
                 className="mx-auto mb-6 shadow-xl"
              />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{selectedProduct.seller?.name || 'Producteur Inconnu'}</h3>
              <p className="text-[11px] text-[var(--text-accent)] font-bold uppercase mb-8">Membre Certifié FASO</p>
              
              <div className="bg-[var(--bg-muted)]/30 p-4 rounded-xl border border-[var(--border-light)] mb-8 space-y-3">
                 <div className="flex items-center gap-3 text-left">
                    <MapPin size={14} className="text-[var(--text-muted)]" />
                    <span className="text-[12px] font-medium text-[var(--text-secondary)]">Ouagadougou, Zone Artisanale</span>
                 </div>
                 <div className="flex items-center gap-3 text-left">
                    <Calendar size={14} className="text-[var(--text-muted)]" />
                    <span className="text-[12px] font-medium text-[var(--text-secondary)]">Actif depuis sept. 2023</span>
                 </div>
              </div>

              <Button 
                variant="secondary" 
                fullWidth 
                icon={<ExternalLink size={16} />}
                onClick={() => navigate(`/admin/users/${selectedProduct.seller?._id}`)}
              >
                Dossier Vendeur
              </Button>
           </Card>

           {/* Activity Log */}
           <Card className="p-8">
              <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-8 flex items-center gap-2">
                 <History size={14} /> Audit Log
              </h4>
              <div className="space-y-6">
                 {[
                   { event: 'Produit listé', date: '20 Oct 2024', icon: CheckCircle2, color: 'text-[var(--green-600)]' },
                   { event: 'Stock mis à jour', date: '15 Nov 2024', icon: Package, color: 'text-blue-500' },
                   { event: 'Dernière revue', date: '20 Dec 2024', icon: ShieldCheck, color: 'text-[var(--text-accent)]' }
                 ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                       <div className={`mt-0.5 w-0.5 ${idx === 2 ? 'bg-transparent' : 'bg-[var(--border-light)]'} relative flex flex-col items-center`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${item.color} bg-white border-2 border-current z-10 shadow-sm`}></div>
                       </div>
                       <div className="flex-1 pb-4">
                          <p className="text-[12px] font-bold text-[var(--text-primary)]">{item.event}</p>
                          <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-tighter">{item.date}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>

           {/* Alert Area */}
           <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/10 flex items-start gap-4">
              <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
              <div>
                 <h5 className="text-[11px] font-bold text-red-600 uppercase mb-1">Zone Administrative</h5>
                 <p className="text-[11px] text-red-600/70 leading-relaxed italic">
                    Toute suspension de produit affectera les paniers clients en cours et les commandes non validées.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetailPage;
