import React, { useEffect } from 'react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useProducerStore } from '../../store/producerStore';

export default function ProducersPage() {
  const { producers, loading, fetchProducers } = useProducerStore();

  useEffect(() => {
    fetchProducers();
  }, [fetchProducers]);

  const displayProducers = producers;

  return (
    <div className="min-h-screen bg-surface">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-serif-display text-primary mb-6">Nos Producteurs Certifiés</h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Rencontrez les hommes et les femmes qui nourrissent le Burkina Faso. Chaque producteur sur notre plateforme est rigoureusement vérifié pour garantir la qualité et l'authenticité.
          </p>
        </section>

        {/* Filters & Search */}
        <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm mb-12 flex flex-wrap gap-4 items-center justify-between border border-outline-variant/10">
          <div className="flex flex-wrap gap-4">
            <select className="bg-surface-container-low border-0 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary outline-none min-w-[180px]">
              <option>Toutes les régions</option>
              <option>Centre (Ouaga)</option>
              <option>Hauts-Bassins (Bobo)</option>
              <option>Nord (Ouahigouya)</option>
              <option>Sahel (Dori)</option>
            </select>
            <select className="bg-surface-container-low border-0 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary outline-none min-w-[180px]">
              <option>Toutes les spécialités</option>
              <option>Céréales</option>
              <option>Légumes</option>
              <option>Fruits</option>
            </select>
          </div>
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Rechercher un producteur..." 
              className="w-full bg-surface-container-low border-0 rounded-xl px-12 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          </div>
        </section>

        {/* Producers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             <div className="col-span-full py-20 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-on-surface-variant font-bold">Chargement des producteurs...</p>
             </div>
          ) : displayProducers.length > 0 ? (
            displayProducers.map((producer) => (
              <div key={producer.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden group hover:shadow-xl transition-all border border-outline-variant/5 flex flex-col justify-between">
                <div className="h-48 relative overflow-hidden">
                  <img src={producer.image} alt={producer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-bold">{producer.rating}</span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1 block">{producer.type}</span>
                    <h3 className="text-2xl font-serif-display text-on-surface mb-1">{producer.name}</h3>
                    <div className="flex items-center gap-2 text-outline font-medium text-xs">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {producer.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-8 mt-auto">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {producer.specialty}
                    </span>
                    <span className="px-3 py-1 bg-secondary-container/30 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Vérifié
                    </span>
                  </div>
                  <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl active:scale-[0.98] transition-all shadow-lg shadow-primary/20 hover:brightness-110 flex items-center justify-center gap-2">
                    Voir le profil complet
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/30">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">groups</span>
                <p className="text-on-surface-variant font-bold text-xl">Aucun producteur trouvé</p>
                <p className="text-outline">Revenez plus tard pour découvrir nos nouveaux partenaires.</p>
            </div>
          )}
        </div>
      </main>
      <VisitorFooter />
    </div>
  );
}
