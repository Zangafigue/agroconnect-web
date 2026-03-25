import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Truck, 
  MapPin, 
  Star, 
  Clock, 
  ArrowRight, 
  Box,
  Navigation,
  Info
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';

const BuyerOffersPage: React.FC = () => {
  const navigate = useNavigate();

  const offers = [
    { id: 1, name: 'Koné Dramane', rating: 4.8, phrase: 'Départ demain matin, trajet direct.', price: 15000, type: 'Camion 5T', time: '06:00', role: 'TRANSPORTER' },
    { id: 2, name: 'Sana Souleymane', rating: 4.5, phrase: 'Expert trajets courts et fragiles.', price: 12500, type: 'Pick-up 2T', time: 'Flexible', role: 'TRANSPORTER', tag: 'Économique' },
    { id: 3, name: 'Ouattara Express', rating: 4.9, phrase: 'Service express avec suivi GPS.', price: 18000, type: 'Camion Frigo 10T', time: 'Quotidien', role: 'TRANSPORTER', tag: 'Premium' }
  ];

  return (
    <div className="space-y-8 pb-12 font-body animate-in fade-in duration-700">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
        <span className="hover:text-[var(--text-accent)] cursor-pointer transition-colors" onClick={() => navigate('/buyer/orders')}>Commandes</span>
        <ChevronRight size={12} />
        <span className="text-[var(--text-primary)]">Logistique</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Offres de Transport</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Choisissez le transporteur idéal pour votre commande <span className="font-mono font-bold text-[var(--text-accent)]">#CMD-043</span>
          </p>
        </div>
        <Card className="px-4 py-2 bg-[var(--text-accent)]/10 border-none flex items-center gap-3">
          <Truck size={18} className="text-[var(--text-accent)]" />
          <span className="text-[12px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Bobo <ArrowRight size={12} className="inline mx-1 text-[var(--text-secondary)]" /> Ouaga
          </span>
        </Card>
      </header>

      {/* Journey Map Preview (Minimalist) */}
      <Card className="p-0 overflow-hidden relative group border-[var(--border-light)] shadow-sm">
         <div className="h-48 bg-[var(--bg-muted)] relative">
            <img 
               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
               alt="Carte" 
               className="w-full h-full object-cover opacity-20 dark:opacity-40 filter grayscale group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity duration-1000 mix-blend-multiply dark:mix-blend-screen" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-[var(--text-accent)] shadow-[0_0_15px_rgba(var(--text-accent-rgb),0.5)]"></div>
                  <div className="h-0.5 w-32 bg-dashed border-t border-[var(--text-accent)]/50"></div>
                  <Navigation size={20} className="text-[var(--text-accent)] rotate-90" />
                  <div className="h-0.5 w-32 bg-dashed border-t border-[var(--text-accent)]/50"></div>
                  <MapPin size={20} className="text-red-500 shadow-lg" />
               </div>
            </div>
            <div className="absolute top-4 left-4 bg-[var(--bg-surface)]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--border-light)] shadow-sm flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
               <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">Optimisation de trajet active</span>
            </div>
         </div>
      </Card>

      {/* Offers List */}
      <div className="space-y-4">
         <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2 px-2">
            <Info size={14} className="text-[var(--text-accent)]" /> 
            <span className="text-[var(--text-primary)] font-black">{offers.length}</span> transporteurs disponibles
         </h3>
         
         <div className="grid grid-cols-1 gap-4">
            {offers.map((offer) => (
               <Card key={offer.id} className="p-6 group border-[var(--border-light)] hover:border-[var(--text-accent)]/50 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                     <div className="flex-shrink-0 flex flex-col items-center">
                        <Avatar name={offer.name} role={offer.role} size="lg" />
                        <div className="flex items-center gap-1 mt-3 bg-amber-500/10 px-2 py-0.5 rounded-full text-amber-500 border border-amber-500/20">
                           <Star size={10} fill="currentColor" />
                           <span className="text-[11px] font-bold">{offer.rating}</span>
                        </div>
                     </div>

                     <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                           {offer.tag && (
                              <span className={`inline-block mb-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${offer.tag === 'Premium' ? 'bg-[var(--text-accent)]/10 text-[var(--text-accent)] border border-[var(--text-accent)]/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                 {offer.tag}
                              </span>
                           )}
                           <h4 className="text-xl font-bold text-[var(--text-primary)]">{offer.name}</h4>
                           <p className="text-[13px] text-[var(--text-secondary)] italic leading-relaxed">"{offer.phrase}"</p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                           <div className="px-3 py-1.5 bg-[var(--bg-muted)] rounded-lg flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wide border border-[var(--border-light)]">
                              <Clock size={14} className="text-[var(--text-accent)]" />
                              {offer.time}
                           </div>
                           <div className="px-3 py-1.5 bg-[var(--bg-muted)] rounded-lg flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wide border border-[var(--border-light)]">
                              <Box size={14} className="text-[var(--text-accent)]" />
                              {offer.type}
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto md:border-l border-[var(--border-light)] md:pl-8">
                        <div className="text-center md:text-right">
                           <span className="font-mono text-2xl font-bold text-[var(--text-accent)] block">{formatFCFA(offer.price)}</span>
                           <span className="text-[10px] font-bold text-[var(--text-secondary)]/60 uppercase tracking-wider">TTC • Assurance incluse</span>
                        </div>
                        <Button variant="primary" size="lg" className="w-full md:w-auto shadow-lg shadow-[var(--text-accent)]/20" icon={<ChevronRight size={18} />} iconPosition="right">
                           Réserver
                        </Button>
                     </div>
                  </div>
               </Card>
            ))}
         </div>
      </div>
    </div>
  );
};

export default BuyerOffersPage;
