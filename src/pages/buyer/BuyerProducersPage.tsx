import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  MessageSquare,
  Phone,
  BadgeCheck,
  Filter,
  Users2,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useProducerStore } from '../../store/producerStore';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';

const BuyerProducersPage: React.FC = () => {
  const navigate = useNavigate();
  const { producers, loading, fetchProducers } = useProducerStore() as any;
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Toutes les régions');

  useEffect(() => {
    fetchProducers();
  }, [fetchProducers]);

  const filteredProducers = (producers || []).filter((p: any) => {
    const name = p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim();
    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty?.toLowerCase().includes(search.toLowerCase());
    const matchesRegion =
      selectedRegion === 'Toutes les régions' ||
      (p.location || p.city || '').includes(selectedRegion);
    return matchesSearch && matchesRegion;
  });

  const getProducerName = (p: any) =>
    p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Producteur';

  const getInitials = (p: any) => {
    const name = getProducerName(p);
    return name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
  };

  const handleContact = (producer: any) => {
    const id = producer._id || producer.id;
    navigate(`/buyer/messages?recipientId=${id}`);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 font-body">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-display text-[var(--text-primary)] tracking-tight">
          Nos Producteurs
          <span className="text-[var(--text-accent)] italic"> Certifiés</span>
        </h1>
        <p className="text-sm text-[var(--text-secondary)] font-medium max-w-2xl">
          Rencontrez les agriculteurs partenaires de la plateforme. Contactez-les directement pour négocier un lot ou obtenir leurs coordonnées.
        </p>
      </header>

      {/* Search & Filter bar */}
      <Card className="p-5 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input
            placeholder="Rechercher un producteur ou une spécialité..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>
        <div className="md:w-56 w-full relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-accent)] z-10 pointer-events-none" size={15} />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="h-[46px] w-full pl-10 pr-4 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-[var(--radius-md)] text-sm font-bold text-[var(--text-primary)] outline-none focus:border-[var(--text-accent)] transition-all appearance-none cursor-pointer"
          >
            {['Toutes les régions', 'Hauts-Bassins', 'Centre', 'Nord', 'Boucle du Mouhoun', 'Cascades', 'Sud-Ouest'].map(r => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Count */}
      <p className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-1">
        {filteredProducers.length} producteur{filteredProducers.length !== 1 ? 's' : ''} trouvé{filteredProducers.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-72 bg-[var(--bg-muted)] rounded-[var(--radius-lg)]" />
          ))}
        </div>
      ) : filteredProducers.length === 0 ? (
        <Card className="p-16 text-center border-dashed">
          <Users2 size={56} className="mx-auto mb-5 text-[var(--text-secondary)] opacity-20" />
          <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-2">Aucun producteur trouvé</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Essayez de modifier vos filtres.</p>
          <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setSelectedRegion('Toutes les régions'); }}>
            Réinitialiser les filtres
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducers.map((producer: any) => {
            const name = getProducerName(producer);
            const id = producer._id || producer.id;
            return (
              <Card
                key={id}
                className="overflow-hidden group flex flex-col border-[var(--border-light)] hover:border-[var(--text-accent)]/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image or avatar banner */}
                <div className="relative h-44 bg-gradient-to-br from-[var(--text-accent)]/10 to-[var(--bg-muted)] overflow-hidden">
                  {producer.image || producer.profilePicture ? (
                    <img
                      src={producer.image || producer.profilePicture}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-display font-black text-[var(--text-accent)]/20">
                        {getInitials(producer)}
                      </span>
                    </div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[var(--text-accent)]/90 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <BadgeCheck size={11} /> Vérifié
                    </span>
                  </div>
                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-[var(--bg-surface)]/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md border border-[var(--border-light)]">
                    <Star size={13} className="text-amber-500" fill="currentColor" />
                    <span className="text-xs font-black text-[var(--text-primary)]">{producer.rating || '4.5'}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="text-[9px] font-black text-[var(--text-accent)] tracking-widest uppercase bg-[var(--text-accent)]/5 px-2 py-0.5 rounded-lg">
                      {producer.type || producer.specialty || 'Producteur'}
                    </span>
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mt-2 leading-tight">{name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 mt-1">
                      <MapPin size={11} className="text-[var(--text-accent)] shrink-0" />
                      {producer.location || producer.city || 'Burkina Faso'}
                    </p>
                  </div>

                  {/* Tags */}
                  {(producer.specialty || producer.experience) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {producer.specialty && (
                        <span className="px-3 py-1 bg-[var(--bg-muted)] text-[var(--text-secondary)] text-[10px] font-bold rounded-lg border border-[var(--border-light)]">
                          {producer.specialty}
                        </span>
                      )}
                      {producer.experience && (
                        <span className="px-3 py-1 bg-[var(--bg-muted)] text-[var(--text-secondary)] text-[10px] font-bold rounded-lg border border-[var(--border-light)]">
                          {producer.experience}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Contact info (phone) if available */}
                  {(producer.phone || producer.phoneNumber) && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-[var(--bg-muted)]/60 rounded-xl border border-[var(--border-light)]">
                      <Phone size={13} className="text-[var(--text-accent)] shrink-0" />
                      <a
                        href={`tel:${producer.phone || producer.phoneNumber}`}
                        className="text-xs font-bold text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors"
                      >
                        {producer.phone || producer.phoneNumber}
                      </a>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center"
                      icon={<MessageSquare size={15} />}
                      onClick={() => handleContact(producer)}
                    >
                      Envoyer un message
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center text-[var(--text-secondary)]"
                      icon={<ArrowRight size={14} />}
                      iconPosition="right"
                      onClick={() => navigate(`/catalog?farmer=${id}`)}
                    >
                      Voir ses produits
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BuyerProducersPage;
