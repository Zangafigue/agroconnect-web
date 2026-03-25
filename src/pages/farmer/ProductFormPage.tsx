import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  Package, 
  Camera, 
  Plus, 
  Sprout, 
  Leaf, 
  Nut, 
  Tag, 
  MapPin, 
  UploadCloud,
  ArrowRight,
  Info,
  CheckCircle,
  Truck
} from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import LocationPicker from '../../components/shared/LocationPicker';
import { useProductStore } from '../../store/productStore';
import toast from 'react-hot-toast';

const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const isEditing = !!id;
  const { products, createProduct, updateProduct, fetchProductById } = useProductStore() as any;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Céréales');
  const [coords, setCoords] = useState({ lat: 12.3641, lng: -1.5330 });
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'Kilogramme (kg)',
    quantity: '',
    region: 'Bobo-Dioulasso',
    address: ''
  });

  React.useEffect(() => {
    if (isEditing && id) {
      // 1. Try to find the product in the local store cache first to avoid network errors
      const cachedProduct = products?.find((p: any) => p._id === id);
      
      const populateForm = (product: any) => {
        if (!product) return;
        setFormData({
          name: product.title || product.name || '',
          description: product.description || '',
          price: product.price?.toString() || '',
          unit: product.unit || 'Kilogramme (kg)',
          quantity: product.inventory?.toString() || product.quantity?.toString() || '',
          // Use precise nullish coalescing to prevent undefined values creeping into React state
          region: (product.location ? product.location.split(',')[0]?.trim() : '') || 'Bobo-Dioulasso',
          address: (product.location ? product.location.split(',')[1]?.trim() : '') || ''
        });
        setCategory(product.category || 'Céréales');
      };

      if (cachedProduct) {
        populateForm(cachedProduct);
      } else {
        // 2. Fallback to fetching it directly if not in cache (e.g direct URL visit)
        fetchProductById(id).then(populateForm).catch(console.error);
      }
    }
  }, [id, fetchProductById, isEditing, products]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray].slice(0, 4)); // Max 4 photos
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.quantity) {
      return toast.error("Veuillez remplir les champs obligatoires (Nom, Prix, Quantité).");
    }
    
    setLoading(true);
    const toastId = toast.loading("Publication de l'annonce...");
    
    try {
      const submitData = new FormData();
      submitData.append('title', formData.name);
      submitData.append('description', formData.description);
      submitData.append('category', category);
      submitData.append('price', formData.price);
      submitData.append('unit', formData.unit);
      submitData.append('inventory', formData.quantity);
      submitData.append('location', `${formData.region}, ${formData.address}`);
      
      images.forEach(img => {
        submitData.append('images', img);
      });

      if (isEditing) {
        await updateProduct(id, submitData);
        toast.success("Annonce modifiée avec succès !", { id: toastId });
      } else {
        await createProduct(submitData);
        toast.success("Annonce publiée avec succès !", { id: toastId });
      }
      navigate('/farmer/products');
    } catch (error) {
       toast.error("Erreur lors de l'enregistrement.", { id: toastId });
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-700 font-body">
      {/* Breadcrumb & Header */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]/60">
          <Link className="hover:text-[var(--text-accent)] transition-colors" to="/farmer/products">Catalogue</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--text-secondary)]">{isEditing ? 'Modification' : 'Référencement'}</span>
        </nav>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display text-[var(--text-primary)] tracking-tight mb-2">
              {isEditing ? "Modifier l'Annonce" : "Mise en Vente Directe"}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Capturez les détails de votre récolte pour une visibilité maximale.</p>
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Photos */}
          <Card className="p-8 group">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2">
                  <Camera size={18} className="text-[var(--text-accent)]" /> 
                  <h3 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Présentation visuelle</h3>
               </div>
               <span className="text-[10px] text-[var(--text-secondary)] italic font-medium">Min. 2 photos recommandées</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="aspect-square bg-[var(--bg-muted)] border-2 border-dashed border-[var(--border-light)] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--text-accent)]/40 hover:bg-[var(--text-accent)]/5 transition-all group/upload relative overflow-hidden">
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                <UploadCloud size={32} className="text-[var(--text-secondary)]/50 group-hover/upload:text-[var(--text-accent)] group-hover/upload:-translate-y-1 transition-all duration-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]/50 mt-3 group-hover/upload:text-[var(--text-accent)] transition-colors">Photos</span>
                <div className="absolute inset-0 bg-[var(--text-accent)]/5 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
              </label>
              
              {images.map((file, i) => (
                <div key={i} className="aspect-square bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-2xl relative overflow-hidden group/item">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity hover:scale-110">
                    <Plus size={14} className="rotate-45" />
                  </button>
                </div>
              ))}
              
              {[...Array(Math.max(0, 3 - images.length))].map((_, i) => (
                <label key={`empty-${i}`} className="aspect-square bg-[var(--bg-muted)] border-2 border-dashed border-[var(--border-light)] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--text-accent)]/20 transition-all group/item">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <Plus size={24} className="text-[var(--text-secondary)]/30 group-hover/item:text-[var(--text-accent)]/40 transition-colors" />
                </label>
              ))}
            </div>
          </Card>

          {/* Details */}
          <Card className="p-8 space-y-10">
            <div className="grid grid-cols-1 gap-8">
              <Input 
                label="Nom commercial du produit" 
                placeholder="Ex: Maïs Blanc de Bagré - Récolte 2024" 
                className="text-lg font-bold"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-1">Spécifications & Qualités</label>
                <textarea 
                  rows={5}
                  className="w-full bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-2xl px-5 py-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--text-accent)] transition-all resize-none font-medium placeholder:text-[var(--text-secondary)]/50"
                  placeholder="Précisez les variétés, le taux d'humidité, les méthodes de culture (bio, raisonnée), le conditionnement..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-1">Filière d'excellence</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Céréales', icon: Sprout },
                  { label: 'Maraîchage', icon: Leaf },
                  { label: 'Oléagineux', icon: Nut }
                ].map((cat) => (
                  <button 
                    key={cat.label}
                    onClick={() => setCategory(cat.label)}
                    className={`px-5 py-3 rounded-2xl border text-[11px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all ${category === cat.label ? 'border-[var(--text-accent)] bg-[var(--text-accent)]/10 text-[var(--text-accent)] shadow-lg shadow-[var(--text-accent)]/5' : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--text-accent)]/30'}`}
                  >
                    <cat.icon size={14} className={category === cat.label ? 'animate-bounce' : ''} /> {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Logistics */}
          <Card className="p-8 space-y-8">
            <div className="flex items-center gap-2">
               <Package size={18} className="text-[var(--text-accent)]" /> 
               <h3 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[.2em]">Commercialisation & Stocks</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input label="Prix unitaire (FCFA)" type="number" placeholder="0" icon={<Tag size={16} />} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[.2em] ml-1">Unité de mesure</label>
                 <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="h-[48px] w-full px-5 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-2xl text-sm font-bold text-[var(--text-primary)] outline-none focus:border-[var(--text-accent)] transition-all appearance-none cursor-pointer">
                    <option value="Kilogramme (kg)">Kilogramme (kg)</option>
                    <option value="Sac (50kg)">Sac (50kg)</option>
                    <option value="Sac (100kg)">Sac (100kg)</option>
                    <option value="Tonne (T)">Tonne (T)</option>
                    <option value="Caisse / Plateau">Caisse / Plateau</option>
                 </select>
              </div>
              <Input label="Disponibilité Totale" type="number" placeholder="Quantité" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
            </div>

            <div className="p-4 bg-[var(--text-accent)]/5 rounded-2xl flex gap-3 border border-[var(--text-accent)]/10">
               <Info size={18} className="text-[var(--text-accent)] shrink-0 rotate-180" />
               <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Le prix affiché aux clients inclura une commission de service de 3% pour la maintenance de la plateforme et la garantie de paiement.
               </p>
            </div>
          </Card>
        </div>

        {/* Localisation & Actions */}
        <div className="space-y-6">
          <Card className="p-8 space-y-8">
            <div className="flex items-center gap-2">
               <MapPin size={18} className="text-[var(--text-accent)]" /> 
               <h3 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[.2em]">Logistique de Collecte</h3>
            </div>
            
            <div className="space-y-6">
               <Input label="Région / Ville" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} />
               <Input label="Adresse Exacte de Collecte" placeholder="Indications pour le transporteur..." icon={<Truck size={16} />} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
               
               <LocationPicker
                  className="h-56 w-full"
                  initialPosition={{ lat: 12.3641, lng: -1.5330 }}
                  onChange={(pos) => {
                    setCoords(pos);
                  }}
                />
                <p className="text-[10px] text-[var(--text-secondary)] font-medium mt-2 text-center">
                  📍 Cliquez sur la carte pour placer votre point de collecte — Lat: {coords.lat.toFixed(4)}, Lng: {coords.lng.toFixed(4)}
                </p>
            </div>
          </Card>

          <Card className="p-8 space-y-8 border-none bg-black dark:bg-[#111827] text-white shadow-2xl relative overflow-hidden transition-colors duration-500">
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <div className="space-y-1">
                     <h4 className="text-lg font-display font-bold">Mise en Ligne</h4>
                     <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Disponibilité Immédiate</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" defaultChecked />
                     <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--text-accent)]"></div>
                   </label>
                </div>

                <div className="space-y-3">
                   <Button 
                     variant="primary" 
                     size="lg" 
                     className="w-full flex justify-between group shadow-xl shadow-[var(--text-accent)]/20"
                     onClick={handleSubmit}
                     disabled={loading}
                   >
                     <span className="font-bold">{loading ? "Enregistrement..." : (isEditing ? "Enregistrer les modifications" : "Publier l'Annonce")}</span>
                     <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </Button>
                   <Button 
                     variant="ghost" 
                     size="md" 
                     className="w-full text-white/60 hover:text-white font-bold"
                     onClick={() => navigate(-1)}
                   >
                     Annuler & Retourner
                   </Button>
                </div>
             </div>
             <Leaf size={120} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12" />
          </Card>

          <div className="p-6 bg-[var(--bg-surface)] rounded-3xl flex items-start gap-4 border border-[var(--border-light)]">
             <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1a1d24] flex items-center justify-center text-[var(--text-accent)] shrink-0 shadow-sm">
                <CheckCircle size={20} />
             </div>
             <div className="space-y-1">
                <p className="text-[12px] font-bold text-[var(--text-primary)]">Vérification AgroConnect</p>
                <p className="text-[10px] text-[var(--text-secondary)] font-medium leading-relaxed">
                   Votre annonce sera examinée par nos experts sous 2h pour garantir la qualité de la plateforme.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;
