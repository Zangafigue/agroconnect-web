import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Truck, 
  MapPin, 
  Star, 
  Clock, 
  Info, 
  ArrowRight, 
  ShieldCheck, 
  Box,
  Navigation
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const BuyerOffersPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8 md:p-16 mb-32 w-full max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Breadcrumb */}
      <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline flex items-center gap-2">
        <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/buyer/orders')}>Mes Commandes</span>
        <ChevronRight size={12} />
        <span className="text-primary">Offres de transport</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-12">
        <div>
          <h1 className="font-serif-display text-5xl lg:text-6xl text-on-surface leading-tight mb-4">Logistique</h1>
          <p className="text-on-surface-variant font-medium text-lg">
            Sélectionnez le transporteur idéal pour votre <span className="font-mono text-primary font-black">commande #CMD-043</span>
          </p>
        </div>
        <div className="bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10 flex items-center gap-4 shadow-sm">
          <Truck size={20} className="text-primary" />
          <span className="font-mono text-sm font-black text-on-surface">Bobo-Dioulasso <ArrowRight size={14} className="inline text-outline mx-2" /> Ouagadougou</span>
        </div>
      </div>

      {/* Map View Section */}
      <section className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl border border-outline-variant/10 relative group">
        <div className="h-[300px] w-full bg-surface-container-high relative">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
            alt="Trajet" 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          <div className="absolute top-8 left-8 backdrop-blur-xl bg-white/80 px-6 py-3 rounded-2xl border border-white shadow-2xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Calcul d'itinéraire optimal</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-6">
              <div className="w-6 h-6 rounded-full bg-primary border-4 border-white shadow-2xl"></div>
              <div className="h-1.5 w-64 bg-primary/20 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-2/3 shadow-[0_0_20px_rgba(var(--primary),0.5)]"></div>
              </div>
              <div className="w-6 h-6 rounded-full bg-tertiary border-4 border-white shadow-2xl"></div>
            </div>
          </div>
          
          <button className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl hover:scale-110 transition-all text-primary">
             <Navigation size={24} />
          </button>
        </div>
      </section>

      {/* Delivery Offers List */}
      <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-outline mb-10 flex items-center gap-3">
         <Info size={14} className="text-primary" /> 3 transporteurs disponibles
      </h2>
      
      <div className="space-y-8">
        {[
          { id: 1, name: 'Koné Dramane', init: 'KD', rating: '4.8', phrase: 'Je pars demain matin', price: 15000, color: 'primary', meta: 'Camion 5T', time: '06:00' },
          { id: 2, name: 'Sana Souleymane', init: 'SS', rating: '4.5', phrase: 'Expert en trajets courts', price: 12500, color: 'tertiary', meta: 'Pick-up 2T', time: 'Flexible', deal: 'Moins cher' },
          { id: 3, name: 'Ouattara Transport', init: 'OT', rating: '4.9', phrase: 'Service Premium Garanti', price: 18000, color: 'primary', meta: 'Camion Frigo 10T', time: 'Quotidien', deal: 'Mieux noté' }
        ].map((offer) => (
          <article key={offer.id} className="group bg-surface-container-lowest p-8 rounded-[2.5rem] flex flex-col xl:flex-row items-center gap-10 transition-all hover:shadow-2xl hover:-translate-y-2 border border-outline-variant/10 relative overflow-hidden">
            {offer.deal && (
              <div className={`absolute top-0 left-10 px-4 py-1.5 rounded-b-xl text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${offer.deal === 'Mieux noté' ? 'bg-primary' : 'bg-tertiary'}`}>
                {offer.deal}
              </div>
            )}
            
            <div className="flex-shrink-0 relative">
              <div className={`w-20 h-20 rounded-[1.5rem] bg-${offer.color}/10 text-${offer.color} flex items-center justify-center font-serif-display text-3xl shadow-inner`}>
                {offer.init}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg border border-outline-variant/5">
                 <div className="flex items-center gap-1 text-[10px] font-black text-tertiary">
                   <Star size={12} className="fill-current" />
                   {offer.rating}
                 </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div>
                <h3 className="text-2xl font-serif-display text-on-surface group-hover:text-primary transition-colors">{offer.name}</h3>
                <p className="text-sm font-medium text-on-surface-variant italic mt-1">"{offer.phrase}"</p>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-outline uppercase tracking-widest bg-surface-container-low px-4 py-2 rounded-xl">
                  <Clock size={14} className="text-primary" />
                  Départ {offer.time}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-outline uppercase tracking-widest bg-surface-container-low px-4 py-2 rounded-xl">
                  <Box size={14} className="text-primary" />
                  {offer.meta}
                </div>
              </div>
            </div>

            <div className="text-right flex flex-col items-center xl:items-end gap-5 w-full xl:w-auto">
              <div>
                <span className="font-mono text-3xl font-black text-primary block">{formatFCFA(offer.price)}</span>
                <span className="text-[9px] font-black text-outline uppercase tracking-widest">TTC • Assurance incluse</span>
              </div>
              <button className="w-full xl:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[.2em] shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
                Réserver ce trajet <ChevronRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BuyerOffersPage;
