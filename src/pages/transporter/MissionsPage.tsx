import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, MapPin, Clock, Weight, ArrowRight, Flag, 
  Tag, X, Send, Zap, Navigation, Info, Filter, AlertCircle
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import { useTransporterStore } from '../../store/transporterStore';
import { useAuthStore } from '../../store/authStore';

const MissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore() as any;
  const { missions, missionsLoading, fetchMissions, submitOffer } = useTransporterStore() as any;

  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerComment, setOfferComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => { fetchMissions(); }, []);

  const handleSubmitOffer = async () => {
    if (!selectedMission || !offerAmount) return;
    setSubmitting(true);
    try {
      await submitOffer(selectedMission._id || selectedMission.id, {
        amount: Number(offerAmount),
        comment: offerComment,
        transporterId: user?._id,
      });
      setSelectedMission(null);
      setOfferAmount('');
      setOfferComment('');
      fetchMissions();
    } catch {
      // toast handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  const filters = [
    { id: 'all', label: 'Toutes', icon: Zap },
    { id: 'urgent', label: 'Urgent', icon: AlertCircle },
    { id: 'short', label: '< 100 km', icon: MapPin },
    { id: 'medium', label: '100-300 km', icon: Navigation },
  ];

  const filteredMissions = missions.filter((m: any) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'urgent') return m.isUrgent || m.urgent;
    if (activeFilter === 'short') return (m.distance || 0) < 100;
    if (activeFilter === 'medium') { const d = m.distance || 0; return d >= 100 && d <= 300; }
    return true;
  });

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight">Missions</h1>
          {!missionsLoading && missions.length > 0 && (
            <span className="px-3 py-1 bg-[var(--text-accent)] text-white text-[11px] font-bold rounded-full relative">
              {missions.length} disponibles
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--text-accent)]/70 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[var(--text-accent)]" />
              </span>
            </span>
          )}
        </div>
        <Button variant="secondary" size="md" icon={<Filter size={16} />} onClick={() => fetchMissions()}>
          Actualiser
        </Button>
      </header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-[12px] uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeFilter === f.id 
                ? 'bg-[var(--text-accent)] text-white shadow-md' 
                : 'bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
            }`}
          >
            <f.icon size={13} /> {f.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {missionsLoading ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-48 animate-pulse bg-[var(--bg-muted)]" />
          ))}
        </div>
      ) : filteredMissions.length === 0 ? (
        <Card className="p-16 text-center">
          <Truck size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-20" />
          <h3 className="font-bold text-[var(--text-primary)] mb-2">Aucune mission disponible</h3>
          <p className="text-[13px] text-[var(--text-muted)] max-w-sm mx-auto">
            Il n'y a pas de missions correspondant à vos critères pour le moment. Revenez bientôt.
          </p>
          <div className="mt-6">
            <Button variant="secondary" size="sm" onClick={() => { setActiveFilter('all'); fetchMissions(); }}>
              Voir toutes les missions
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredMissions.map((mission: any) => {
            const isUrgent = mission.isUrgent || mission.urgent;
            const id = mission._id || mission.id;
            return (
              <Card key={id} className={`p-0 overflow-hidden group ${isUrgent ? 'border-2 border-red-200' : ''}`}>
                <div className={`p-5 border-b flex justify-between items-start ${isUrgent ? 'bg-red-50 border-red-100' : 'border-[var(--border-light)]'}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {isUrgent && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest rounded animate-pulse">Urgent</span>
                      )}
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">#{id?.slice(-6).toUpperCase()}</span>
                    </div>
                    <h3 className={`text-lg font-bold ${isUrgent ? 'text-red-950' : 'text-[var(--text-primary)]'}`}>
                      Transport — {mission.product?.name || mission.title || 'Produit agricole'}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Budget</p>
                    <p className={`text-xl font-mono font-bold ${isUrgent ? 'text-red-600' : 'text-[var(--text-accent)]'}`}>
                      {formatFCFA(mission.transportCost || mission.budget || 0)}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-[13px]">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className={isUrgent ? 'text-red-500 mt-0.5 shrink-0' : 'text-[var(--text-accent)] mt-0.5 shrink-0'} />
                      <div>
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-0.5">Départ</p>
                        <p className="font-medium text-[var(--text-primary)]">{mission.seller?.city || mission.pickupCity || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Flag size={15} className={isUrgent ? 'text-red-500 mt-0.5 shrink-0' : 'text-[var(--text-accent)] mt-0.5 shrink-0'} />
                      <div>
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-0.5">Destination</p>
                        <p className="font-medium text-[var(--text-primary)]">{mission.buyer?.city || mission.deliveryCity || '—'}</p>
                      </div>
                    </div>
                    {(mission.quantity || mission.weight) && (
                      <div className="flex items-center gap-2">
                        <Weight size={13} className="text-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)]">{mission.quantity} {mission.unit || 'kg'}</span>
                      </div>
                    )}
                    {mission.distance && (
                      <div className="flex items-center gap-2">
                        <Navigation size={13} className="text-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)]">{mission.distance} km</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
                    <StatusBadge status={mission.status || 'PENDING'} />
                    <div className="flex gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => navigate('/transporter/missions')}
                      >
                        Détails
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        className={isUrgent ? 'bg-red-600 hover:bg-red-700' : ''}
                        icon={<Tag size={14} />}
                        onClick={() => setSelectedMission(mission)}
                      >
                        Offre
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Offer Submission Modal */}
      {selectedMission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-[var(--border-light)] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Soumettre une offre</h2>
              <button onClick={() => setSelectedMission(null)} className="p-2 hover:bg-[var(--bg-muted)] rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-4 bg-[var(--text-accent)]/5 rounded-xl border border-[var(--text-accent)]/10 text-[13px]">
                <p className="font-bold text-[var(--text-primary)] mb-1">{selectedMission.product?.name || 'Mission'}</p>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span>{selectedMission.seller?.city || '—'}</span>
                  <ArrowRight size={12} />
                  <span>{selectedMission.buyer?.city || '—'}</span>
                </div>
                <p className="mt-1 font-mono font-bold text-[var(--text-accent)]">
                  Budget: {formatFCFA(selectedMission.transportCost || selectedMission.budget || 0)}
                </p>
              </div>

              <Input
                label="Votre tarif (FCFA)"
                type="number"
                placeholder="Ex: 25000"
                value={offerAmount}
                onChange={(e: any) => setOfferAmount(e.target.value)}
              />

              <div className="flex items-start gap-2 text-[11px] font-medium text-[var(--text-secondary)] p-3 bg-[var(--bg-muted)] rounded-xl">
                <Info size={13} className="shrink-0 mt-0.5" />
                <span>Une offre compétitive et accompagnée d'un commentaire professionnel augmente vos chances d'être sélectionné.</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Commentaire (optionnel)</label>
                <textarea
                  className="w-full bg-[var(--bg-muted)] border border-[var(--border-light)] focus:border-[var(--text-accent)] rounded-xl px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Précisez votre véhicule, disponibilité, expérience..."
                  value={offerComment}
                  onChange={(e) => setOfferComment(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 border-t border-[var(--border-light)] flex justify-end gap-3">
              <Button variant="ghost" size="md" onClick={() => setSelectedMission(null)}>Annuler</Button>
              <Button 
                variant="primary" 
                size="md" 
                icon={<Send size={15} />} 
                onClick={handleSubmitOffer}
                isLoading={submitting}
                disabled={!offerAmount || submitting}
              >
                Envoyer
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;
