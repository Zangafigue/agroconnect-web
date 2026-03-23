import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  Loader2, 
  BadgeCheck, 
  Filter,
  Users2
} from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useProducerStore } from '../../store/producerStore';

const ProducersPage: React.FC = () => {
  const { producers, loading, fetchProducers } = useProducerStore() as any;
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Toutes les régions');

  useEffect(() => {
    fetchProducers();
  }, [fetchProducers]);

  const filteredProducers = producers.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.specialty?.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'Toutes les régions' || p.location?.includes(selectedRegion);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <section className="mb-24 text-center animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 inline-block shadow-sm">
            NOTRE RÉSEAU DE CONFIANCE
          </span>
          <h1 className="text-5xl md:text-8xl font-serif-display text-on-surface mb-8 tracking-tighter leading-[0.9]">
            Nos Producteurs <span className="text-primary italic">Certifiés</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto font-newsreader leading-relaxed italic">
            "Rencontrez les hommes et les femmes qui nourrissent le Burkina Faso. Chaque partenaire est rigoureusement vérifié pour garantir qualité et authenticité."
          </p>
        </section>

        {/* Filters & Search */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm mb-20 flex flex-col md:flex-row gap-6 items-center justify-between border border-outline-variant/10">
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-surface-container-low border-none rounded-2xl pl-12 pr-8 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 outline-none min-w-[220px] appearance-none"
                >
                  <option>Toutes les régions</option>
                  <option>Hauts-Bassins</option>
                  <option>Centre</option>
                  <option>Nord</option>
                  <option>Boucle du Mouhoun</option>
                  <option>Cascades</option>
                  <option>Sud-Ouest</option>
                </select>
            </div>
          </div>
          <div className="relative flex-1 max-w-xl w-full group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={24} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un producteur ou une spécialité..." 
              className="w-full bg-surface-container-low border-none rounded-2xl pl-16 pr-6 py-4.5 text-sm font-medium focus:ring-2 focus:ring-primary outline-none shadow-inner"
            />
          </div>
        </section>

        {/* Producers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading ? (
             <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border border-outline-variant/10 shadow-inner">
                <Loader2 className="animate-spin text-primary mx-auto mb-6" size={56} />
                <p className="text-on-surface-variant font-bold text-xl font-headline animate-pulse">Rassemblement de la communauté...</p>
             </div>
          ) : filteredProducers.length > 0 ? (
            filteredProducers.map((producer: any) => (
              <div key={producer._id || producer.id} className="bg-white rounded-[3.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 flex flex-col justify-between">
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={producer.image || "https://images.unsplash.com/photo-1595066117564-9686035987a0?auto=format&fit=crop&q=80&w=800"} 
                    alt={producer.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-primary/5">
                    <Star className="text-amber-500" size={16} fill="currentColor" />
                    <span className="text-sm font-black">{producer.rating || '4.5'}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 flex gap-2">
                     <span className="bg-secondary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <BadgeCheck size={14} /> VÉRIFIÉ
                     </span>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col text-center sm:text-left">
                  <div className="mb-8">
                    <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-3 block px-3 py-1 bg-primary/5 w-fit rounded-lg mx-auto sm:mx-0">
                      {producer.type || "PRODUCTEUR"}
                    </span>
                    <h3 className="text-3xl font-serif-display text-on-surface mb-2 tracking-tight">{producer.name}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-outline-variant font-bold text-xs uppercase tracking-widest">
                      <MapPin size={14} className="text-primary" />
                      {producer.location || producer.city || "Burkina Faso"}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-10 mt-auto">
                    <span className="px-4 py-2 bg-surface-container-low text-on-surface-variant text-[11px] font-black rounded-xl uppercase tracking-wider border border-outline-variant/10">
                      {producer.specialty || "Polyculture"}
                    </span>
                    <span className="px-4 py-2 bg-surface-container-low text-on-surface-variant text-[11px] font-black rounded-xl uppercase tracking-wider border border-outline-variant/10">
                      {producer.experience || "5+ ans"}
                    </span>
                  </div>
                  <button className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg group/btn">
                    Voir le profil complet
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-primary/5 px-8">
                <Users2 className="text-outline-variant mx-auto mb-8" size={80} />
                <h3 className="text-3xl font-serif-display text-on-surface mb-4">La brousse est calme ici</h3>
                <p className="text-on-surface-variant font-medium max-w-md mx-auto italic font-newsreader leading-relaxed">"Nous n'avons pas trouvé de producteur correspondant exactement à votre recherche. Peut-être est-il temps d'élargir votre zone ?"</p>
                <button 
                  onClick={() => { setSearch(''); setSelectedRegion('Toutes les régions'); }}
                  className="mt-10 text-primary font-black uppercase text-xs tracking-[0.2em] underline underline-offset-8"
                >
                   Réinitialiser les filtres
                </button>
            </div>
          )}
        </div>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default ProducersPage;
