import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  MapPin, 
  Weight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Edit3, 
  Trash2, 
  ChevronRight,
  Navigation,
  Info
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const MyOffersPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="mb-16">
        <div className="flex items-center gap-6 mb-4">
          <div className="p-4 bg-tertiary/10 rounded-2xl text-tertiary shadow-sm">
             <History size={32} />
          </div>
          <h1 className="font-serif-display text-5xl lg:text-7xl text-on-surface tracking-tight">Mes offres</h1>
        </div>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Suivez l'état de vos propositions de transport et gérez vos engagements logistiques.
        </p>
      </header>

      {/* Tabs M3 */}
      <div className="flex gap-12 mb-12 border-b border-outline-variant/10">
        <button className="pb-6 text-primary font-black text-xs uppercase tracking-widest border-b-4 border-primary flex items-center gap-3">
          En attente <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px]">2</span>
        </button>
        <button className="pb-6 text-outline font-black text-xs uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3 border-b-4 border-transparent opacity-60">
          Acceptées <span className="bg-surface-container-low text-outline px-3 py-1 rounded-full text-[10px]">1</span>
        </button>
        <button className="pb-6 text-outline font-black text-xs uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3 border-b-4 border-transparent opacity-60">
          Refusées <span className="bg-surface-container-low text-outline px-3 py-1 rounded-full text-[10px]">3</span>
        </button>
      </div>

      {/* Section: En attente */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-24">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm p-10 flex flex-col gap-8 border-l-[12px] border-tertiary-container hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <span className="font-mono text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-2 block">REF-OFFR #045</span>
              <h3 className="text-2xl font-serif-display text-on-surface group-hover:text-primary transition-colors flex items-center gap-3">
                 Bobo <ArrowRight size={18} className="text-outline" /> Ouaga
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-outline uppercase tracking-widest bg-surface-container-low px-3 py-1.5 rounded-xl">
                  <Navigation size={14} className="text-primary" /> ~360 km
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-outline uppercase tracking-widest bg-surface-container-low px-3 py-1.5 rounded-xl">
                  <Weight size={14} className="text-primary" /> 500 kg
                </div>
              </div>
            </div>
            <div className="px-5 py-2 bg-tertiary-container text-on-tertiary-container text-[9px] font-black tracking-widest rounded-full uppercase shadow-sm">
               EN ATTENTE
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Info size={100} className="text-primary" />
            </div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Ma proposition tarifaire</p>
            <p className="font-mono text-4xl font-black text-primary">{formatFCFA(15000)}</p>
            <p className="text-xs text-on-surface-variant font-bold mt-4 flex items-center gap-2 italic">
              <Clock size={16} className="text-outline" /> Soumise il y a 2h
            </p>
          </div>

          <div className="italic text-sm text-on-surface-variant font-medium pl-6 border-l-4 border-primary/20 py-2 leading-relaxed">
            "Je pars demain matin avec un camion vide, je peux charger directement au marché de fruits."
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/10">
            <button className="flex-1 py-4 rounded-2xl border-2 border-outline-variant text-outline font-black text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-2">
              <Edit3 size={14} /> Modifier
            </button>
            <button className="flex-1 py-4 rounded-2xl text-error font-black text-[10px] uppercase tracking-widest hover:bg-error/5 border-2 border-transparent hover:border-error/20 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Trash2 size={14} /> Retirer
            </button>
          </div>
        </div>

        {/* Card Placeholder (Skeleton style) */}
        <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm p-10 flex flex-col gap-8 border-l-[12px] border-tertiary-container/30 opacity-50 grayscale">
            <div className="w-1/3 h-4 bg-outline-variant/20 rounded-full"></div>
            <div className="w-2/3 h-8 bg-outline-variant/20 rounded-full"></div>
            <div className="flex-1 min-h-[150px] border-4 border-dashed border-outline-variant/10 rounded-[2rem] flex items-center justify-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-outline">En attente de traitement...</p>
            </div>
        </div>
      </div>

      {/* Section: Acceptées */}
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-3xl font-serif-display text-on-surface flex items-center gap-4">
           <CheckCircle2 size={32} className="text-primary" /> Acceptées
        </h2>
        <div className="h-px flex-1 bg-primary/20"></div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-24">
        <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-xl p-10 flex flex-col gap-8 border-l-[12px] border-primary hover:scale-[1.02] transition-transform duration-500">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <span className="font-mono text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-2 block">REF-OFFR #039</span>
              <h3 className="text-2xl font-serif-display text-on-surface">Banfora <ArrowRight size={18} className="text-outline inline mx-2" /> Bobo</h3>
              <p className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
                 <Package size={16} /> 800 kg de Mangues
              </p>
            </div>
            <div className="px-5 py-2 bg-primary text-white text-[9px] font-black tracking-widest rounded-full uppercase shadow-xl shadow-primary/20">
               CONFIRMÉE
            </div>
          </div>
          <div className="flex items-center justify-between pt-8 border-t border-outline-variant/10">
            <div>
              <p className="text-[9px] font-black text-outline uppercase tracking-wider mb-2">Paiement Final</p>
              <p className="font-mono text-3xl font-black text-primary">{formatFCFA(8500)}</p>
            </div>
            <button onClick={() => navigate('/transporter/deliveries')} className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:brightness-110 transition-all shadow-2xl shadow-primary/30 active:scale-95">
              Suivre le colis <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Section: Refusées */}
      <div className="flex items-center gap-6 mb-12 opacity-60">
        <h2 className="text-2xl font-serif-display text-outline flex items-center gap-4">
           <XCircle size={28} /> Refusées
        </h2>
        <div className="h-px flex-1 bg-outline-variant/20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { route: 'Ouaga → Kaya', time: '20 Oct', price: 12000, reason: "Prix trop élevé par rapport à la concurrence locale." },
          { route: 'Fada → Ouaga', time: '18 Oct', price: 25000, reason: "Délai de prise en charge trop long (72h+)." },
          { route: 'Tenkodogo → Koupéla', time: '15 Oct', price: 5000, reason: "Fret déjà attribué à un partenaire habituel." }
        ].map((refused, idx) => (
          <div key={idx} className="bg-white/50 border border-outline-variant/10 rounded-[2rem] p-8 flex flex-col gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex justify-between items-start">
              <h4 className="font-black text-on-surface text-sm uppercase tracking-wider">{refused.route}</h4>
              <span className="px-3 py-1 bg-error/10 text-error text-[8px] font-black rounded-lg uppercase tracking-widest">ARCHIVE</span>
            </div>
            <p className="text-xs font-medium text-on-surface-variant leading-relaxed italic">
              "{refused.reason}"
            </p>
            <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center mt-auto">
              <span className="font-mono text-sm text-outline font-black">{formatFCFA(refused.price)}</span>
              <span className="text-[9px] text-outline font-black uppercase tracking-widest">{refused.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOffersPage;
