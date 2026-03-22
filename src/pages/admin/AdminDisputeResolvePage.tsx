import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Info, 
  ChatBubble, 
  User, 
  Star, 
  Gavel, 
  MessageSquare, 
  CheckCircle2, 
  ShieldAlert, 
  Image as ImageIcon,
  Clock,
  Send,
  Scale,
  MessageSquareWarning,
  AlertTriangle,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

const AdminDisputeResolvePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="pb-12 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-6">
          <Link to="/admin/disputes" className="p-3 bg-surface-container-high rounded-2xl text-outline hover:text-primary transition-all border border-outline-variant/10 shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-serif-display text-on-surface">
                Litige <span className="font-mono text-primary">#{id || 'L012'}</span> — Résolution
              </h2>
              <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold tracking-[0.15em] uppercase">
                EXAMEN EN COURS
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 max-w-[1600px]">
        {/* LEFT COLUMN (65%) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Incident Details */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                <Info size={24} />
              </div>
              <h3 className="text-2xl font-serif-display font-bold">Détails de l'incident</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-3xl bg-surface-container-low/30 border border-outline-variant/5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 font-bold italic">Plaignant</p>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">FT</div>
                   <p className="font-headline font-bold text-on-surface text-lg">Fatima Traoré</p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-surface-container-low/30 border border-outline-variant/5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 font-bold italic">Défendeur</p>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center font-bold">KD</div>
                   <p className="font-headline font-bold text-on-surface text-lg">Koné Drissa</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 font-bold italic">Motif déclaré</p>
                <h4 className="text-xl font-headline font-bold text-error flex items-center gap-2">
                   <AlertTriangle size={20} /> Non livraison de marchandise
                </h4>
              </div>
              <div className="md:col-span-2 bg-primary/5 p-8 rounded-3xl border border-primary/10 relative overflow-hidden group">
                <MessageSquareWarning size={80} className="absolute -bottom-4 -right-4 text-primary/5 group-hover:text-primary/10 transition-all duration-700" />
                <p className="text-base leading-relaxed text-on-surface-variant italic font-medium relative z-10 pl-4 border-l-4 border-primary/20">
                  "J'attends ma livraison depuis 3 jours. Le transporteur ne répond plus à mes appels alors que le chargement de maïs de 2 tonnes a été validé au hangar."
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-outline mb-4 font-bold italic">Pièces justificatives (2)</p>
                <div className="flex gap-6">
                  {[1, 2].map((img) => (
                    <div key={img} className="relative group w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg cursor-zoom-in hover:scale-105 transition-all">
                      <img className="object-cover w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all" src={`https://images.unsplash.com/photo-1599819177626-b50f9dd21c9b?auto=format&fit=crop&q=80&w=300&h=300`} alt="Preuve" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <ImageIcon className="text-white" size={32} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Conversation History */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-secondary/10 text-secondary rounded-2xl shadow-inner">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-2xl font-serif-display font-bold">Historique des échanges</h3>
            </div>
            <div className="space-y-8 max-h-[500px] overflow-y-auto pr-6 custom-scrollbar">
              {[
                { user: 'FATIMA T.', role: 'Acheteur', time: '15:10', msg: "Bonjour, je n'ai toujours pas de nouvelles pour ma cargaison de maïs. Le chauffeur est-il en route ?", side: 'left', color: 'secondary' },
                { user: 'KONÉ D.', role: 'Transporteur', time: '16:45', msg: "J'ai eu une panne moteur à 20km de Bobo. Mon téléphone n'avait plus de batterie. Je cherche une solution.", side: 'right', color: 'primary' },
                { user: 'FATIMA T.', role: 'Acheteur', time: '18:00', msg: "C'est la troisième fois ce mois-ci que vous avez un problème technique. J'ai des clients qui attendent sur le marché. Je demande le remboursement.", side: 'left', color: 'secondary' }
              ].map((chat, i) => (
                <div key={i} className={`flex flex-col ${chat.side === 'right' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-2 ${chat.side === 'right' ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-[10px] font-bold text-${chat.color} tracking-widest`}>{chat.user} ({chat.role})</span>
                    <span className="text-[9px] text-outline font-mono italic">{chat.time}</span>
                  </div>
                  <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm border ${chat.side === 'right' 
                    ? 'bg-primary text-white rounded-tr-none border-primary/10' 
                    : 'bg-white text-on-surface rounded-tl-none border-outline-variant/10'}`}>
                    {chat.msg}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (35%) */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Parties Summary */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10">
            <h3 className="font-serif-display text-xl font-bold mb-8 text-on-surface flex items-center gap-3">
              <User size={20} className="text-primary" />
              Réputation des parties
            </h3>
            <div className="space-y-6">
              {[
                { name: 'Fatima Traoré', role: 'Acheteur Certifié', rating: '4.8', tx: '124', initials: 'FT', color: 'secondary', alert: null },
                { name: 'Koné Drissa', role: 'Transporteur', rating: '3.2', tx: '45', initials: 'KD', color: 'tertiary', alert: '2 LITIGES EN COURS' }
              ].map((profile, i) => (
                <div key={i} className="p-6 rounded-3xl bg-surface-container-low/30 border border-outline-variant/10 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-${profile.color}/10 text-${profile.color} flex items-center justify-center font-bold text-xl shadow-inner ring-2 ring-white`}>
                      {profile.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-headline font-bold text-on-surface truncate">{profile.name}</h4>
                      <p className="text-[10px] text-outline font-bold uppercase tracking-wider">{profile.role}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-amber-500">
                          <Star size={12} fill="currentColor" />
                          <span className="text-xs font-mono font-bold ml-1">{profile.rating}</span>
                        </div>
                        <span className="text-[10px] text-outline italic">({profile.tx} tx)</span>
                      </div>
                    </div>
                  </div>
                  {profile.alert && (
                    <div className="mt-4 p-2 bg-error/5 text-error font-bold text-[10px] rounded-lg flex items-center gap-2 uppercase tracking-tight">
                       <AlertTriangle size={14} /> {profile.alert}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Decision Panel */}
          <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-xl border-2 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h3 className="font-serif-display text-xl font-bold mb-8 text-on-surface flex items-center gap-3 relative z-10">
              <Gavel size={24} className="text-primary" />
              Décision Administrative
            </h3>
            <div className="space-y-4 relative z-10">
              {[
                { id: 'refund', title: "Rembourser l'acheteur", sub: "Annulation avec pénalité vendeur", icon: RotateCcw },
                { id: 'release', title: "Libérer les fonds", sub: "Confirmation de service rendu", icon: CheckCircle },
                { id: 'partial', title: "Remboursement partiel", sub: "Litige 50/50 avec médiation", icon: Scale }
              ].map((opt) => (
                <label key={opt.id} className="group relative flex items-center gap-4 p-5 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all cursor-pointer bg-white shadow-sm hover:shadow-md">
                  <input type="radio" name="decision" value={opt.id} className="w-5 h-5 accent-primary cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{opt.title}</span>
                    <span className="text-[10px] text-outline font-medium">{opt.sub}</span>
                  </div>
                  <opt.icon size={18} className="ml-auto text-outline group-hover:text-primary opacity-20 group-hover:opacity-60 transition-all" />
                </label>
              ))}
              
              <div className="pt-6">
                <label className="text-[10px] uppercase tracking-[0.2em] text-outline mb-3 block font-bold italic">Rapport de médiation</label>
                <textarea 
                  className="w-full h-40 bg-surface-container-low/50 border border-outline-variant/20 rounded-[2rem] p-6 text-sm focus:ring-4 focus:ring-primary/10 transition-all text-on-surface outline-none resize-none font-medium" 
                  placeholder="Décrivez les motifs de votre arbitrage..."
                ></textarea>
              </div>
              
              <button className="w-full bg-primary text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-primary/30 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.96] flex items-center justify-center gap-3 mt-6">
                <CheckCircle2 size={24} />
                Valider l'arbitrage
              </button>
            </div>
          </section>

          <div className="p-6 bg-primary/10 rounded-[2rem] flex items-start gap-4 border border-primary/10 shadow-inner">
            <ShieldCheck size={28} className="text-primary flex-shrink-0" />
            <p className="text-xs leading-relaxed text-on-primary-container font-medium italic">
              Cette décision déclenchera le transfert automatique des fonds sur le portefeuille électronique de la partie gagante. <strong>Acte irrévocable.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDisputeResolvePage;
