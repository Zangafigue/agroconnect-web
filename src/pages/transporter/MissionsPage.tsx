import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Weight, 
  ArrowRight, 
  Flag, 
  HelpCircle, 
  Tag, 
  TrendingUp, 
  X,
  Send,
  Check,
  Zap,
  Star,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const MissionsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto min-h-screen relative animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex items-center gap-6 mb-16">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface tracking-tight leading-none">Missions</h1>
        <div className="relative">
           <span className="px-6 py-2 bg-primary text-white text-lg font-black rounded-3xl shadow-xl shadow-primary/20">3</span>
           <div className="absolute inset-0 bg-primary rounded-3xl animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Horizontal Filter Scroll */}
      <div className="flex items-center gap-4 overflow-x-auto pb-8 mb-12 hide-scrollbar">
        {[
          { id: 'all', label: 'Toutes les missions', icon: Zap },
          { id: 'short', label: '< 100 km', icon: MapPin },
          { id: 'medium', label: '100-300 km', icon: Navigation },
          { id: 'cereals', label: 'Céréales', icon: Tag },
          { id: 'fresh', label: 'Légumes / Frais', icon: Star }
        ].map((filter) => (
          <button 
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex-shrink-0 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 ${activeFilter === filter.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-surface-container-low text-outline hover:bg-surface-container-high'}`}
          >
            <filter.icon size={18} />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* CARD 1: Standard Mission */}
        <article className="bg-surface-container-lowest rounded-[3rem] shadow-sm overflow-hidden group border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="p-10 relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <span className="font-mono text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-2 block">Réf: #LOG-9928</span>
                <h3 className="text-3xl font-serif-display text-on-surface group-hover:text-primary transition-colors">Transport Maïs blanc</h3>
              </div>
              <div className="bg-primary/5 text-primary px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-primary/10">
                24 OCT 2024
              </div>
            </div>

            {/* Path Visualization M3 Style */}
            <div className="relative h-[240px] bg-surface-container-low rounded-[2.5rem] mb-10 overflow-hidden border border-outline-variant/10">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
                alt="Map" 
                className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000" 
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between relative z-10">
                   <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),1)]"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Bobo</span>
                   </div>
                   <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
                      <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Ouaga</span>
                   </div>
                </div>
                
                <div className="flex items-center gap-10 px-4 relative z-10">
                   <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/60 w-full animate-pulse"></div>
                   </div>
                   <div className="text-white bg-primary p-3 rounded-2xl shadow-2xl scale-125">
                      <Truck size={20} />
                   </div>
                   <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                   </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Distance', val: '360 km', icon: Navigation },
                { label: 'Délai', val: '4h30', icon: Clock },
                { label: 'Stock', val: '500 kg', icon: Weight }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-surface-container-low/40 rounded-2xl border border-outline-variant/5 text-center group/item hover:bg-white transition-all">
                  <item.icon size={18} className="mx-auto mb-2 text-outline group-item-hover:text-primary transition-colors" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-outline mb-1">{item.label}</p>
                  <p className="font-black text-on-surface">{item.val}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 mb-12">
               <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-outline uppercase tracking-[0.2em] mb-1">Collecte Prioritaire</p>
                    <p className="text-sm font-bold text-on-surface">Zone Industrielle, Bobo • Demain, 08:00</p>
                  </div>
               </div>
               <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                     <Flag size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-outline uppercase tracking-[0.2em] mb-1">Point de déchargement</p>
                    <p className="text-sm font-bold text-on-surface">Grand Marché, Ouaga • Demain, 14:00</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="py-5 bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95">
                <HelpCircle size={18} /> Poser une question
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="py-5 bg-primary text-white shadow-2xl shadow-primary/20 hover:brightness-110 transition-all rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95"
              >
                <Tag size={18} /> Faire une offre
              </button>
            </div>
          </div>
        </article>

        {/* CARD 2: Urgent High-Visibility */}
        <article className="bg-error-container/10 rounded-[3rem] shadow-sm overflow-hidden border-4 border-error/20 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 relative">
          <div className="absolute top-10 right-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
             <Zap size={150} className="text-error" />
          </div>
          
          <div className="p-10 relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="font-mono text-[10px] font-black text-error uppercase tracking-[0.2em] mb-2 block animate-pulse">!!! MISSION URGENTE !!!</span>
                <h3 className="text-3xl font-serif-display text-on-surface leading-tight">Convoi Tomates <br/>Koudougou Express</h3>
              </div>
              <div className="bg-error text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest animate-bounce shadow-xl shadow-error/30">
                TOP PRIORITÉ
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 mb-10 space-y-6 border border-error/5 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline">Poids total estimé</span>
                <span className="text-xl font-black font-mono text-on-surface text-on-error-container">1.2 TONNES</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline">Type de convoi</span>
                <span className="text-sm font-black text-error">Camionnette Frigo Spéciale</span>
              </div>
              <div className="h-px bg-error/10 w-full"></div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline">Budget de l'acheteur</span>
                <span className="text-3xl font-black font-mono text-error">{formatFCFA(125000)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white/80 rounded-[2rem] border border-error/5 group/client">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-serif-display text-2xl shadow-lg group-hover/client:scale-110 transition-transform">
                AG
              </div>
              <div>
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                   <ShieldCheck size={12} /> Client Or Certifié
                </p>
                <p className="text-lg font-black text-on-surface">AgroGroup Burkina</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="m-10 mt-0 py-8 bg-error text-white shadow-2xl shadow-error/30 hover:brightness-110 transition-all rounded-[2rem] font-black text-lg uppercase tracking-[0.4em] flex items-center justify-center gap-6 active:scale-95 group/btn"
          >
            S'ENRÔLER <ArrowRight size={28} className="group-hover/btn:translate-x-4 transition-transform" />
          </button>
        </article>
      </div>

      {/* Modal M3 */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/60 backdrop-blur-xl px-4 p-4">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 border border-outline-variant/10">
            <div className="px-10 py-8 flex justify-between items-center border-b border-outline-variant/10 bg-white">
              <h2 className="text-3xl font-serif-display text-on-surface">Soumettre une offre</h2>
              <button onClick={() => setShowModal(false)} className="text-outline hover:text-error transition-all p-3 rounded-2xl hover:bg-error/5">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-10 py-10 space-y-12">
              <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 flex flex-col gap-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Truck size={80} className="text-primary" />
                 </div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-outline">Trajet de livraison</span>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-xl">Bobo</span>
                      <ArrowRight size={20} className="text-primary" />
                      <span className="font-black text-xl">Ouaga</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-outline">Distance</span>
                    <p className="font-mono text-xl font-black text-primary">360 km</p>
                  </div>
                </div>
                <div className="flex items-center gap-10 pt-6 border-t border-primary/10 relative z-10">
                  <div className="flex items-center gap-3 text-xs font-black text-on-surface uppercase tracking-widest">
                    <Weight size={18} className="text-primary" /> 500 kg
                  </div>
                  <div className="flex items-center gap-3 text-xs font-black text-on-surface uppercase tracking-widest">
                    <Clock size={18} className="text-primary" /> 14 Oct. 2024
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Votre tarif de prestation</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    className="w-full bg-surface-container-low focus:bg-white border-4 border-transparent focus:border-primary/20 rounded-3xl px-8 py-6 font-mono text-3xl font-black text-on-surface focus:ring-0 transition-all shadow-inner" 
                    placeholder="0.00" 
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-primary text-xl">FCFA</div>
                </div>
                <div className="p-4 bg-tertiary/5 rounded-2xl border border-tertiary/10 flex items-center gap-3 text-[10px] font-black text-tertiary uppercase tracking-widest">
                  <Info size={16} /> Fourchette conseillée : 12 000 - 18 000 FCFA
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Engagement transporteur</label>
                <textarea 
                  className="w-full bg-surface-container-low focus:bg-white border-4 border-transparent focus:border-primary/20 rounded-[2rem] px-8 py-6 text-base font-bold text-on-surface-variant focus:ring-0 transition-all resize-none shadow-inner" 
                  placeholder="Précisez votre véhicule, vos délais de chargement..." 
                  rows={4}
                ></textarea>
              </div>
            </div>

            <div className="px-10 py-8 bg-white flex items-center justify-between gap-6 border-t border-outline-variant/10">
              <button onClick={() => setShowModal(false)} className="px-8 py-4 text-xs font-black text-outline uppercase tracking-[0.2em] hover:text-error transition-all">
                Abandonner
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="px-12 py-5 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 flex gap-3 items-center group/send"
              >
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Envoyer mon offre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;
