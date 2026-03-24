import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';

const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Tous');

  const products = [
    { id: 1, name: 'Maïs Blanc Local', price: 450, unit: 'kg', location: 'Bobo-Dioulasso', producer: 'Amadou Kaboré', rating: 4.9, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80' },
    { id: 2, name: 'Oignons Galmi', price: 15000, unit: 'sac', location: 'Ouahigouya', producer: 'Zalissa Traoré', rating: 4.8, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80' },
    { id: 3, name: 'Tomates Fraîches', price: 500, unit: 'panier', location: 'Loumbila', producer: 'Jean Sawadogo', rating: 4.7, image: 'https://images.unsplash.com/photo-1546097759-47bcd932a392?w=600&q=80' }
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Search & Hero */}
      <section className="space-y-6">
        <h1 className="font-display text-5xl text-[var(--text-primary)] tracking-tight leading-[1.1]">
          Le Marché des <br /><span className="text-[var(--text-accent)] italic">Producteurs Locaux</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
             <Input 
               placeholder="Rechercher des produits, céréales..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               icon={<Search size={20} />}
               className="py-4"
             />
          </div>
          <div className="md:w-64">
             <div className="relative group">
                <select className="w-full h-[46px] px-10 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-md)] text-[14px] font-medium outline-none focus:border-[var(--input-border-focus)] transition-all appearance-none">
                  <option>Toutes régions</option>
                  <option>Ouagadougou</option>
                  <option>Bobo-Dioulasso</option>
                </select>
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
             </div>
          </div>
          <Button variant="primary" size="lg" className="px-12">
            Explorer
          </Button>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <Card className="p-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4 flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[var(--text-accent)]" />
              Catégories
            </h4>
            <div className="space-y-1">
              {['Tous', 'Céréales', 'Légumes', 'Fruits', 'Bétail'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${category === cat ? 'bg-[var(--text-accent)]/10 text-[var(--text-accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Card>
          
          <Card className="p-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4">Budget (FCFA)</h4>
            <input type="range" className="w-full accent-[var(--text-accent)] h-1.5 bg-[var(--bg-muted)] rounded-full appearance-none cursor-pointer" />
            <div className="flex justify-between mt-3 text-[10px] font-bold text-[var(--text-secondary)] uppercase">
               <span>0</span>
               <span>50k+</span>
            </div>
          </Card>

          <Card className="p-6 bg-[var(--bg-muted)]/30 border-dashed">
             <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Stock immédiat</span>
                <div className="relative inline-flex items-center">
                   <input type="checkbox" defaultChecked className="sr-only peer" />
                   <div className="w-9 h-5 bg-[var(--border-light)] rounded-full peer peer-checked:bg-[var(--text-accent)] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </div>
             </label>
          </Card>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center px-2">
            <p className="text-[12px] text-[var(--text-secondary)]">Affichage de <span className="text-[var(--text-primary)] font-bold">1-12</span> sur 48 produits</p>
            <div className="flex items-center gap-2">
               <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Trier:</span>
               <select className="bg-transparent border-none text-[12px] font-bold text-[var(--text-accent)] uppercase tracking-widest focus:ring-0 cursor-pointer outline-none">
                  <option>Nouveautés</option>
                  <option>Prix bas</option>
               </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {products.map((p) => (
                <Card key={p.id} className="overflow-hidden group flex flex-col h-full border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-[var(--border-light)]">
                   <div className="relative h-48 overflow-hidden bg-[var(--bg-muted)]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                         <span className="bg-white/90 backdrop-blur-md text-[var(--text-primary)] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Eco-Certifié</span>
                      </div>
                      <button className="absolute top-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-md rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-red-500 hover:bg-white transition-all shadow-sm">
                         <Heart size={18} />
                      </button>
                   </div>
                   <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-4">
                         <div className="flex-1 pr-2">
                            <h3 className="font-bold text-[16px] text-[var(--text-primary)] leading-tight mb-1 group-hover:text-[var(--text-accent)] transition-colors">{p.name}</h3>
                            <p className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1"><MapPin size={10} /> {p.location}</p>
                         </div>
                         <div className="text-right">
                            <span className="font-mono font-bold text-[var(--text-primary)] text-[18px]">{p.price} F</span>
                            <span className="text-[10px] text-[var(--text-secondary)] block">/ {p.unit}</span>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-6 p-2 bg-[var(--bg-muted)]/50 rounded-lg">
                         <div className="w-7 h-7 rounded-md bg-[var(--text-accent)]/10 text-[var(--text-accent)] flex items-center justify-center font-bold text-[10px]">
                            {p.producer.charAt(0)}
                         </div>
                         <div className="flex-1">
                            <p className="text-[11px] text-[var(--text-primary)] font-medium leading-none">{p.producer}</p>
                            <div className="flex items-center gap-1 text-[10px] text-amber-500">
                               <Star size={8} fill="currentColor" />
                               <span className="font-bold">{p.rating}</span>
                            </div>
                         </div>
                      </div>

                      <div className="mt-auto">
                        <Link to={`/buyer/marketplace/product/${p.id}`}>
                           <Button variant="secondary" size="md" className="w-full justify-center group/btn" icon={<ShoppingBag size={16} />} iconPosition="right">
                              Commander
                           </Button>
                        </Link>
                      </div>
                   </div>
                </Card>
             ))}
          </div>

          {/* Pagination */}
          <nav className="flex items-center justify-center gap-2 pt-8">
            <Button variant="ghost" size="sm" className="p-2"><ChevronLeft size={20} /></Button>
            <Button variant="primary" size="sm" className="w-10 h-10">1</Button>
            <Button variant="ghost" size="sm" className="w-10 h-10">2</Button>
            <span className="text-[var(--text-muted)] px-2">...</span>
            <Button variant="ghost" size="sm" className="w-10 h-10">8</Button>
            <Button variant="ghost" size="sm" className="p-2"><ChevronRight size={20} /></Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
