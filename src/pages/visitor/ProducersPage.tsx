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
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Header Section */}
        <section className="mb-20">
          <h1 className="text-6xl md:text-8xl font-serif-display mb-6 tracking-tight leading-[0.9]">
            Nos Producteurs <span className="text-[var(--green-600)] italic">Engagés</span>
          </h1>
          <p className="text-xl text-[var(--gray-600)] max-w-2xl font-light">
            Découvrez les acteurs du changement qui nourrissent notre nation avec passion et savoir-faire.
          </p>
        </section>

        {/* Filters & Search */}
        <section className="flex flex-col md:flex-row gap-4 mb-16 items-center">
            <div className="flex-1 w-full relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un producteur..." 
                  className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-base focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                {['Toutes les régions', 'Centre', 'Hauts-Bassins', 'Nord', 'Boucle du Mouhoun'].map(region => (
                    <button
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                            selectedRegion === region 
                            ? 'bg-[var(--green-600)] text-white' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                        }`}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </section>

        {/* Producers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             <div className="col-span-full py-32 text-center">
                <Loader2 className="animate-spin text-[var(--green-600)] mx-auto mb-4" size={48} />
                <p className="text-gray-500 font-medium">Chargement du réseau...</p>
             </div>
          ) : filteredProducers.length > 0 ? (
            filteredProducers.map((producer: any) => (
              <div key={producer._id || producer.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col group">
                <div className="h-64 relative overflow-hidden bg-gray-100">
                  <img 
                    src={producer.image || "https://images.unsplash.com/photo-1595066117564-9686035987a0?auto=format&fit=crop&q=80&w=800"} 
                    alt={producer.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-black/5">
                    <Star className="text-amber-500" size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{producer.rating || '4.8'}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                     <span className="bg-[var(--green-600)] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                        <BadgeCheck size={12} /> CERTIFIÉ
                     </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black mb-1">{producer.name}</h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium uppercase tracking-wider">
                      <MapPin size={14} />
                      {producer.location || producer.city || "Burkina Faso"}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-100 uppercase tracking-tight">
                      {producer.specialty || "Polyculture"}
                    </span>
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-100 uppercase tracking-tight">
                      {producer.experience || "5+ ans"}
                    </span>
                  </div>
                  <button className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-[var(--green-700)] transition-all flex items-center justify-center gap-2 group/btn mt-auto">
                    Voir le profil
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 px-8">
                <Users2 className="text-gray-300 mx-auto mb-6" size={64} />
                <h3 className="text-2xl font-serif-display text-black mb-2">Aucun producteur trouvé</h3>
                <p className="text-gray-500 max-w-sm mx-auto italic font-newsreader">Nous n'avons pas trouvé de producteur correspondant à vos critères.</p>
                <button 
                  onClick={() => { setSearch(''); setSelectedRegion('Toutes les régions'); }}
                  className="mt-8 text-black font-bold text-sm underline underline-offset-4"
                >
                   Réinitialiser
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
