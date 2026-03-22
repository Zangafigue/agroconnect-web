import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Package, 
  User, 
  Phone, 
  FileText, 
  Download, 
  Lock, 
  Gavel, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Weight
} from 'lucide-react';

const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="pb-12 max-w-7x animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 w-full">
        <div className="flex items-center gap-6">
          <Link to="/admin/orders" className="p-3 bg-surface-container-high rounded-2xl text-outline hover:text-primary transition-all border border-outline-variant/10 shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h2 className="font-serif-display font-bold text-3xl tracking-tight text-on-surface">Commande <span className="font-mono text-primary">#{id || '045'}</span></h2>
              <span className="px-4 py-1.5 bg-tertiary/10 text-tertiary rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-tertiary/20">
                EN TRANSIT
              </span>
            </div>
            <p className="text-xs text-outline font-medium italic mt-1">Passée le 23 Octobre 2023 à 16:45</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-sm font-bold text-on-surface hover:bg-white transition-all shadow-sm flex items-center gap-2">
             <Download size={18} /> BL & Facture
           </button>
           <button className="px-6 py-3 bg-error text-white rounded-2xl text-sm font-bold hover:bg-error/90 transition-all shadow-lg shadow-error/10 flex items-center gap-2">
             <AlertTriangle size={18} /> Suspendre
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLONNE GAUCHE (70%) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Acteurs Card */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
            <h3 className="font-serif-display text-2xl font-bold mb-8 text-on-surface flex items-center gap-3">
              <User size={24} className="text-primary" />
              Acteurs de la transaction
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                { label: 'Acheteur', name: 'Fatima T.', phone: '+226 70 00 00 00', id: '1', initials: 'FT', color: 'blue' },
                { label: 'Vendeur', name: 'Amadou K.', phone: '+226 75 11 11 11', id: '2', initials: 'AK', color: 'emerald' },
                { label: 'Transporteur', name: 'Koné D.', phone: '+226 78 22 22 22', id: '3', initials: 'KD', color: 'orange' }
              ].map((actor, idx) => (
                <div key={idx} className="relative group">
                   <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-surface-container-low/30 border border-outline-variant/5 group-hover:bg-white group-hover:shadow-lg transition-all">
                      <div className={`w-16 h-16 rounded-2xl bg-${actor.color}-500/10 text-${actor.color}-600 flex items-center justify-center text-xl font-bold mb-4 shadow-inner ring-4 ring-white`}>
                        {actor.initials}
                      </div>
                      <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1">{actor.label}</p>
                      <p className="font-headline font-bold text-on-surface text-base">{actor.name}</p>
                      <p className="text-xs text-outline font-medium mb-4">{actor.phone}</p>
                      <Link to={`/admin/users/${actor.id}`} className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        Détails <ChevronRight size={14} />
                      </Link>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tracking Card */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-sm border border-outline-variant/10">
            <div className="p-10 border-b border-outline-variant/5">
              <h3 className="font-serif-display text-2xl font-bold text-on-surface flex items-center gap-3">
                <MapPin size={24} className="text-primary" />
                Suivi de l'itinéraire
              </h3>
            </div>
            <div className="relative h-80 bg-surface-container-high group">
              <img className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200&h=600" alt="Carte Satellite" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-2xl text-center min-w-[280px]">
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-3">Trajet en cours</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="font-headline font-bold text-on-surface text-lg">Koudougou</span>
                  <div className="flex flex-col items-center">
                    <TrendingUp size={20} className="text-primary animate-bounce mb-1" />
                    <div className="h-px w-20 bg-primary/20 relative">
                       <div className="absolute top-0 left-0 h-full bg-primary animate-progress-flow w-1/2"></div>
                    </div>
                  </div>
                  <span className="font-headline font-bold text-on-surface text-lg">Ouagadougou</span>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface-container-low/50 grid grid-cols-3 gap-6">
              {[
                { label: 'Distance', val: '102 km', icon: MapPin },
                { label: 'Temps Estimé', val: '1h 45m', icon: Clock },
                { label: 'Charge Utile', val: '500 kg', icon: Weight }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary mb-2">
                    <stat.icon size={20} />
                  </div>
                  <p className="text-[10px] text-outline uppercase font-bold tracking-widest">{stat.label}</p>
                  <p className="font-mono font-bold text-on-surface text-sm">{stat.val}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Activity Log */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
            <h3 className="font-serif-display text-2xl font-bold mb-10 text-on-surface flex items-center gap-3">
              <FileText size={24} className="text-primary" />
              Journal d'activité
            </h3>
            <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-outline-variant/10">
              {[
                { title: "Départ de l'entrepôt", desc: "Transporteur Koné D. a quitté Koudougou", time: "24 Oct 2023 — 08:30", icon: Truck, active: true },
                { title: "Paiement confirmé", desc: "Le montant a été sécurisé sur le séquestre", time: "23 Oct 2023 — 17:15", icon: ShieldCheck, active: false },
                { title: "Commande créée", desc: "Acheteur Fatima T. a validé son panier", time: "23 Oct 2023 — 16:45", icon: Package, active: false }
              ].map((log, i) => (
                <div key={i} className="relative flex items-start gap-8 pl-14">
                  <div className={`absolute left-0 w-10 h-10 rounded-2xl flex items-center justify-center z-10 border-4 border-white shadow-lg transition-all ${log.active ? 'bg-primary text-white scale-110' : 'bg-surface-container-high text-outline opacity-50'}`}>
                    <log.icon size={18} />
                  </div>
                  <div className={log.active ? '' : 'opacity-60'}>
                    <p className="font-headline font-bold text-on-surface text-lg">{log.title}</p>
                    <p className="text-sm text-outline font-medium">{log.desc}</p>
                    <p className="font-mono text-[10px] mt-2 text-primary uppercase font-bold tracking-widest flex items-center gap-1.5">
                       <Clock size={12} /> {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLONNE DROITE (30%) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Financial Summary */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col h-fit">
            <div className="p-8 bg-primary/5 border-b border-primary/10">
              <h3 className="font-serif-display text-xl font-bold text-on-surface">Résumé financier</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center text-sm border-b border-outline-variant/5 pb-4">
                <span className="text-outline font-medium">Sous-total Produits</span>
                <span className="font-serif-display font-bold text-on-surface text-lg">70 000 F</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-outline-variant/5 pb-4">
                <span className="text-outline font-medium">Frais de Livraison</span>
                <span className="font-serif-display font-bold text-on-surface text-lg">15 000 F</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-6 border-b border-outline-variant/10 border-dashed">
                <span className="text-outline font-medium flex items-center gap-1">
                   Plateforme (3%) <AlertTriangle size={12} className="text-tertiary" />
                </span>
                <span className="font-serif-display font-bold text-tertiary text-lg">-2 100 F</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex flex-col">
                  <span className="font-bold text-on-surface text-base uppercase tracking-tighter">Total Net</span>
                  <span className="text-[10px] text-outline font-bold uppercase tracking-widest italic">A décaisser</span>
                </div>
                <span className="font-serif-display font-bold text-4xl text-primary animate-pulse">85 000 <span className="text-xs">F</span></span>
              </div>
            </div>
            <div className="px-8 pb-10 flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-4 p-4 bg-tertiary/10 rounded-2xl border border-tertiary/10 group">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-tertiary group-hover:rotate-12 transition-transform">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest opacity-70">Statut des fonds</p>
                  <p className="text-base font-bold text-on-surface tracking-tight uppercase">SÉQUESTRE BLOQUÉ</p>
                </div>
              </div>
              <Link to={`/admin/disputes/LTG-451`} className="w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.97]">
                <Gavel size={22} />
                Arbitrer un litige
              </Link>
            </div>
          </section>

          {/* Documents Card */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10">
            <h3 className="font-serif-display text-lg font-bold mb-6 text-on-surface flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Documents joints
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Facture_045.pdf', size: '1.2 MB', type: 'PDF' },
                { name: 'Bon_Livraison.pdf', size: '0.8 MB', type: 'PDF' }
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low/30 hover:bg-white hover:shadow-md cursor-pointer transition-all border border-transparent hover:border-outline-variant/10 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                     <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{doc.name}</p>
                    <p className="text-[10px] text-outline font-mono"> {doc.type} • {doc.size}</p>
                  </div>
                  <Download size={18} className="text-outline group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
