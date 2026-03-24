import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Eye, 
  MoreVertical,
  Trash2,
  Database
} from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';

const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, updateProductStatus, deleteProduct, loading } = useProductStore() as any;
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.seller?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Révoquer définitivement ce produit du catalogue national ?')) {
      await deleteProduct(id);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await updateProductStatus(id, newStatus);
  };

  const columns = [
    {
      header: 'Produit',
      accessor: (p: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--bg-muted)] overflow-hidden border border-[var(--border-light)]">
            <img 
              className="w-full h-full object-cover" 
              src={p.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'} 
              alt={p.name} 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[var(--text-primary)]">{p.name}</span>
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-tighter">{p.unit || 'KG / UNITÉ'}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Vendeur',
      accessor: (p: any) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium">{p.seller?.name || 'Anonyme'}</span>
          <span className="text-[10px] text-[var(--text-accent)] font-bold uppercase tracking-wider">Certifié</span>
        </div>
      )
    },
    {
      header: 'Catégorie',
      accessor: (p: any) => (
        <span className="text-[12px] px-2 py-0.5 bg-[var(--bg-muted)] rounded-full text-[var(--text-secondary)] border border-[var(--border-light)]">
          {p.category}
        </span>
      )
    },
    {
      header: 'Prix (P.U)',
      accessor: (p: any) => (
        <span className="font-bold">{formatFCFA(p.price)}</span>
      ),
      isMono: true
    },
    {
      header: 'Dispo',
      accessor: (p: any) => (
        <div className="flex flex-col items-center">
          <span className={`text-[13px] font-mono ${p.stock <= 0 ? 'text-[var(--btn-danger-text)]' : ''}`}>
             {p.stock}
          </span>
          {p.stock <= 10 && p.stock > 0 && <span className="text-[8px] font-bold text-orange-500 uppercase">Bas</span>}
        </div>
      ),
      className: 'text-center'
    },
    {
      header: 'Statut',
      accessor: (p: any) => (
        <StatusBadge status={p.available && !p.hidden ? 'PUBLIÉ' : 'REDUIT'} />
      )
    },
    {
      header: '',
      accessor: (p: any) => (
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 min-w-0"
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/products/${p._id}`); }}
          >
            <Eye size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 min-w-0"
            onClick={(e) => { e.stopPropagation(); handleToggleStatus(p._id, p.available ? 'active' : 'inactive'); }}
          >
            <span className="material-symbols-outlined text-[18px]">
              {p.available && !p.hidden ? 'visibility_off' : 'visibility'}
            </span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 min-w-0 text-[var(--btn-danger-text)] hover:bg-[var(--badge-dispute-bg)]"
            onClick={(e) => { e.stopPropagation(); handleDelete(p._id); }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  const categories = Array.from(new Set(products.map((p: any) => p.category)));

  return (
    <div className="space-y-6 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Index du Catalogue</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Gérez l'offre nationale et la modération des produits.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" size="md" icon={<Database size={16} />}>
              Audit des Stocks
           </Button>
        </div>
      </header>

      {/* Toolbar */}
      <Card className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input 
            placeholder="Nom du produit ou producteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-[36px] px-3 bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] rounded-[var(--radius-md)] text-[13px] outline-none focus:border-[var(--input-border-focus)] transition-all min-w-[150px]"
          >
            <option value="ALL">Toutes catégories</option>
            {categories.map((cat: any) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-[12px] font-medium text-[var(--text-secondary)]">
            Total : <span className="text-[var(--text-primary)]">{filteredProducts.length} ressources</span>
          </p>
        </div>
        <DataTable 
          columns={columns} 
          data={filteredProducts} 
          isLoading={loading}
          onRowClick={(p: any) => navigate(`/admin/products/${p._id}`)}
          emptyMessage="Aucun produit trouvé dans le catalogue."
        />
      </section>

      {/* Analytics Insight Block */}
      <Card className="bg-[var(--bg-muted)]/30 border-dashed border-2 flex flex-col md:flex-row items-center gap-6">
         <div className="w-12 h-12 rounded-xl bg-[var(--text-accent)]/10 flex items-center justify-center text-[var(--text-accent)]">
            <Database size={24} />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-[16px] font-bold text-[var(--text-primary)] mb-1">Santé du Catalogue</h4>
            <p className="text-[13px] text-[var(--text-secondary)] max-w-3xl">
              Les stocks de céréales sont stables. Une tension est détectée sur les produits maraîchers. 
              Veuillez vérifier les cotations périodiquement.
            </p>
         </div>
         <Button variant="secondary" size="sm">Vérifier conformité</Button>
      </Card>
    </div>
  );
};

export default AdminProductsPage;
