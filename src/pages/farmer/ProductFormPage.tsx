import React from 'react';
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
  CheckCircle2, 
  X,
  UploadCloud
} from 'lucide-react';

const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-40 animate-in fade-in duration-700">
      <nav className="flex items-center gap-3 mb-6 text-outline text-xs font-black uppercase tracking-widest">
        <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/farmer/products">
           <Package size={14} /> Mes produits
        </Link>
        <ChevronRight size={12} />
        <span className="text-on-surface">Nouveau produit</span>
      </nav>

      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[3rem] text-primary flex items-center gap-5 font-serif-display leading-tight">
            <span>📦</span> Nouveau produit
          </h2>
          <p className="text-on-surface-variant mt-2 font-medium text-lg">Mettez en vente vos récoltes et gérez vos stocks en temps réel.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[3rem] p-12 shadow-sm">
        <form className="space-y-16">
          {/* Photos Section */}
          <section>
            <div className="mb-8">
              <h3 className="text-2xl font-serif-display text-on-surface mb-2">Photos du produit</h3>
              <p className="text-sm text-outline font-medium">Ajoutez jusqu'à 4 photos. Une photo de qualité augmente vos chances de vente.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="aspect-square bg-primary/5 border-4 border-dashed border-primary/20 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-all group shadow-inner">
                <UploadCloud size={40} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Principale</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-surface-container-low border-4 border-dashed border-outline-variant/20 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high transition-all group">
                  <Plus size={32} className="text-outline group-hover:rotate-90 transition-transform" />
                </div>
              ))}
            </div>
          </section>

          {/* Informations Générales */}
          <section className="space-y-10">
            <h3 className="text-2xl font-serif-display text-on-surface pb-4 border-b border-outline-variant/10">Détails techniques</h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Nom commercial du produit</label>
                <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 rounded-2xl px-6 py-5 font-bold text-lg transition-all" placeholder="Ex: Maïs blanc de Bobo" type="text" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Description détaillée</label>
                <textarea className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 rounded-[2rem] px-8 py-6 font-medium text-base transition-all resize-none" placeholder="Décrivez la qualité, le mode de production..." rows={5}></textarea>
              </div>
            </div>
            <div className="space-y-5">
              <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2 block">Catégorie de produit</label>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'Céréales', icon: Sprout, active: true },
                  { label: 'Légumes', icon: Leaf },
                  { label: 'Fruits', icon: Nut }
                ].map((cat) => (
                  <button 
                    key={cat.label}
                    className={`px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all active:scale-95 ${cat.active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-surface-container-low text-outline hover:bg-surface-container-high'}`} 
                    type="button"
                  >
                    <cat.icon size={18} /> {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Prix & Quantité */}
          <section className="space-y-10">
            <h3 className="text-2xl font-serif-display text-on-surface pb-4 border-b border-outline-variant/10">Logistique & Prix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Prix unitaire</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-5 font-mono text-2xl font-black text-on-surface transition-all shadow-inner" placeholder="0.00" type="number" />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-outline group-focus-within:text-primary">FCFA</span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Unité de mesure</label>
                <select className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-5 font-bold text-sm transition-all shadow-inner cursor-pointer appearance-none">
                  <option>Kilogramme (kg)</option>
                  <option>Sac (50kg)</option>
                  <option>Sac (100kg)</option>
                  <option>Tonne</option>
                  <option>Litre</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Stock total</label>
                <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-5 font-mono text-2xl font-black text-on-surface transition-all shadow-inner" placeholder="Ex: 500" type="number" />
              </div>
            </div>
          </section>

          {/* Localisation */}
          <section className="space-y-10">
            <h3 className="text-2xl font-serif-display text-on-surface pb-4 border-b border-outline-variant/10">Localisation du stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Ville / Localité</label>
                <div className="relative">
                   <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-5 font-bold text-sm transition-all" type="text" defaultValue="Bobo-Dioulasso" />
                   <MapPin size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Adresse de collecte précise</label>
                <input className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-5 font-bold text-sm transition-all" placeholder="Quartier, N° de rue..." type="text" />
              </div>
            </div>
            <div className="w-full h-[300px] rounded-[2.5rem] bg-surface-container-high/30 border border-outline-variant/10 relative overflow-hidden flex flex-col items-center justify-center text-center p-10 group">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                 <MapPin size={32} />
              </div>
              <p className="text-on-surface-variant font-black uppercase tracking-widest text-[10px] mb-2">Carte Interactive</p>
              <p className="text-outline text-xs max-w-xs font-medium">L'intégration Leaflet sera activée automatiquement après validation du produit.</p>
            </div>
          </section>

          {/* Disponibilité Flash */}
          <section className="p-10 bg-primary/5 rounded-[3rem] border-2 border-primary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group hover:bg-primary/10 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-primary shadow-xl group-hover:rotate-12 transition-transform">
                <Tag size={28} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-on-surface">Mise en vente immédiate</h4>
                <p className="text-xs text-outline font-black uppercase tracking-widest mt-1">Rendre l'annonce visible aux acheteurs dès maintenant</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer scale-125">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </section>
        </form>
      </div>

      <footer className="fixed bottom-0 left-64 right-0 bg-white/80 backdrop-blur-2xl px-16 py-6 flex justify-between items-center border-t border-outline-variant/10 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] z-50">
        <button onClick={() => navigate(-1)} className="px-10 py-4 text-outline hover:text-on-surface font-black text-xs uppercase tracking-[0.2em] transition-all">Annuler</button>
        <button className="px-14 py-4 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3">
          <Plus size={18} /> Publier la récolte
        </button>
      </footer>
    </div>
  );
};

export default ProductFormPage;
