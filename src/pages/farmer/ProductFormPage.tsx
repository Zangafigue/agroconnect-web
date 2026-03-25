import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Céréales');

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-700 font-body">
      {/* Breadcrumb & Header */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]/60">
          <Link className="hover:text-[var(--text-accent)] transition-colors" to="/farmer/products">Catalogue</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--text-secondary)]">Référencement</span>
        </nav>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display text-[var(--text-primary)] tracking-tight mb-2">Mise en Vente Directe</h1>
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
              <div className="aspect-square bg-[var(--bg-muted)] border-2 border-dashed border-[var(--border-light)] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--text-accent)]/40 hover:bg-[var(--text-accent)]/5 transition-all group/upload relative overflow-hidden">
                <UploadCloud size={32} className="text-[var(--text-secondary)]/50 group-hover/upload:text-[var(--text-accent)] group-hover/upload:-translate-y-1 transition-all duration-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]/50 mt-3 group-hover/upload:text-[var(--text-accent)] transition-colors">Couverture</span>
                <div className="absolute inset-0 bg-[var(--text-accent)]/5 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-[var(--bg-muted)] border-2 border-dashed border-[var(--border-light)] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--text-accent)]/20 transition-all group/item">
                  <Plus size={24} className="text-[var(--text-secondary)]/30 group-hover/item:text-[var(--text-accent)]/40 transition-colors" />
                </div>
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
              />
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-1">Spécifications & Qualités</label>
                <textarea 
                  rows={5}
                  className="w-full bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-2xl px-5 py-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--text-accent)] transition-all resize-none font-medium placeholder:text-[var(--text-secondary)]/50"
                  placeholder="Précisez les variétés, le taux d'humidité, les méthodes de culture (bio, raisonnée), le conditionnement..."
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
              <Input label="Prix unitaire (FCFA)" type="number" placeholder="0" icon={<Tag size={16} />} />
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[.2em] ml-1">Unité de mesure</label>
                 <select className="h-[48px] w-full px-5 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-2xl text-sm font-bold text-[var(--text-primary)] outline-none focus:border-[var(--text-accent)] transition-all appearance-none cursor-pointer">
                    <option>Kilogramme (kg)</option>
                    <option>Sac (50kg)</option>
                    <option>Sac (100kg)</option>
                    <option>Tonne (T)</option>
                    <option>Caisse / Plateau</option>
                 </select>
              </div>
              <Input label="Disponibilité Totale" type="number" placeholder="Quantité" />
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
               <Input label="Région / Ville" defaultValue="Bobo-Dioulasso" />
               <Input label="Adresse Exacte de Collecte" placeholder="Indications pour le transporteur..." icon={<Truck size={16} />} />
               
               <div className="aspect-video bg-[var(--bg-muted)] rounded-2xl border border-[var(--border-light)] flex flex-col items-center justify-center text-center p-6 gap-3 group/map relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1a1d24] flex items-center justify-center text-[var(--text-secondary)] shadow-sm group-hover/map:scale-110 transition-transform relative z-10">
                     <MapPin size={24} className="text-[var(--text-accent)]" />
                  </div>
                  <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest leading-relaxed relative z-10">
                     Ouvrir Maps
                  </p>
               </div>
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
                     onClick={() => navigate('/farmer/products')}
                   >
                     <span className="font-bold">Publier l'Annonce</span>
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
