import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2,
  Package,
  Filter
} from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';
import toast from 'react-hot-toast';

const FarmerProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, fetchUserProducts, deleteProduct, loading } = useProductStore() as any;
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUserProducts();
  }, [fetchUserProducts]);

  const filteredProducts = (products || []).filter((p: any) => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Voulez-vous vraiment retirer ce produit de la vente ?')) {
      try {
        await deleteProduct(id);
        toast.success('Produit retiré avec succès');
      } catch (error) {
        toast.error('Erreur lors du retrait du produit');
      }
    }
  };

  const columns = [
    {
      header: 'Produit',
      accessor: (p: any) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--bg-muted)] overflow-hidden border border-[var(--border-light)] shadow-sm">
            <img 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              src={p.images?.[0] || 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&q=80'} 
              alt={p.name} 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[var(--text-primary)] line-clamp-1">{p.name}</span>
            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">{p.category || 'Céréales'}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Prix (P.U)',
      accessor: (p: any) => (
        <span className="font-mono font-bold text-[var(--text-primary)]">{formatFCFA(p.price)}</span>
      ),
      isMono: true
    },
    {
      header: 'Stock Restant',
      accessor: (p: any) => (
        <div className="flex flex-col">
          <span className="font-mono font-bold text-[var(--text-primary)] text-sm">
            {p.stock} <span className="text-[10px] text-[var(--text-secondary)] font-medium">{p.unit || 'Kg'}</span>
          </span>
          {p.stock <= 10 && p.stock > 0 && (
            <span className="text-[9px] font-black text-orange-600 uppercase tracking-tighter mt-0.5">Stock Critique</span>
          )}
        </div>
      )
    },
    {
      header: 'Visibilité',
      accessor: (p: any) => (
        <StatusBadge status={p.status === 'active' ? 'PUBLIÉ' : p.status === 'out_of_stock' ? 'RUPTURE' : 'ARCHIVÉ'} />
      )
    },
    {
      header: '',
      accessor: (p: any) => (
        <div className="flex justify-end gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Eye size={16} />}
            onClick={(e) => { e.stopPropagation(); navigate(`/catalog/${p._id}`); }}
            title="Voir"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Edit3 size={16} />}
            onClick={(e) => { e.stopPropagation(); navigate(`/farmer/products/${p._id}/edit`); }}
            title="Modifier"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Trash2 size={16} />}
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={(e) => { e.stopPropagation(); handleDelete(p._id); }}
            title="Supprimer"
          />
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-display text-[var(--text-primary)] tracking-tight mb-2">Mon Catalogue</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Gérez vos stocks et maintenez votre inventaire à jour.</p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/farmer/products/new')}
        >
          Référencer un produit
        </Button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input 
            placeholder="Rechercher une variété, un lot..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
            className="bg-white dark:bg-[#1a1d24] border-[var(--border-light)] shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-muted)] rounded-2xl border border-[var(--border-light)] text-[var(--text-secondary)]">
            <Filter size={14} className="opacity-50" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none cursor-pointer pr-4"
            >
              <option value="all">Tous les produits</option>
              <option value="active">En ligne</option>
              <option value="inactive">Hors-ligne</option>
              <option value="out_of_stock">Rupture</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[.2em]">
            Total : <span className="text-[var(--text-accent)]">{(filteredProducts || []).length} lots identifiés</span>
          </p>
        </div>
        <DataTable 
          columns={columns} 
          data={filteredProducts} 
          isLoading={loading}
          onRowClick={(p: any) => navigate(`/farmer/products/${p._id}/edit`)}
          emptyMessage="Votre catalogue est vide. Commencez par ajouter votre première récolte."
        />
      </section>

      {/* Bento Insight Card */}
      <Card className="bg-[var(--bg-muted)] border-dashed border-2 flex flex-col md:flex-row items-center gap-8 p-10 group overflow-hidden relative">
         <div className="w-16 h-16 rounded-[2rem] bg-[var(--text-accent)]/10 flex items-center justify-center text-[var(--text-accent)] shrink-0 transition-transform group-hover:rotate-12 duration-500">
            <Package size={32} />
         </div>
         <div className="flex-1 text-center md:text-left relative z-10">
            <h4 className="text-lg font-display font-bold text-[var(--text-primary)] mb-2">Opportunité de vente</h4>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed italic">
              "Votre **Maïs Jaune** génère un fort intérêt cette semaine avec plus de 150 consultations. Envisagez une légère augmentation de prix ou un lot groupé pour maximiser vos revenus."
            </p>
         </div>
         <Button variant="secondary" size="md" className="relative z-10 font-bold">
            Optimiser mes prix
         </Button>
         <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--text-accent)]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[var(--text-accent)]/10 transition-colors"></div>
      </Card>
    </div>
  );
};

export default FarmerProductsPage;
