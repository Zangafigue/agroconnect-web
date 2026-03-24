import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Info, 
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
  MessageSquareQuote,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  Database,
  BarChart3,
  MapPin,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useDisputeStore } from '../../store/disputeStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminDisputeResolvePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedDispute, fetchDisputeById, resolveDispute, loading } = useDisputeStore() as any;
  const [decision, setDecision] = useState('');
  const [report, setReport] = useState('');

  useEffect(() => {
    if (id) {
      fetchDisputeById(id);
    }
  }, [id, fetchDisputeById]);

  const handleResolve = async () => {
    if (!decision || !report) {
      alert('Veuillez sélectionner une décision et rédiger un court rapport d\'arbitrage.');
      return;
    }
    if (window.confirm('Confirmer cet arbitrage souverain ? Cette action est irrévocable.')) {
      await resolveDispute(selectedDispute._id, { decision, report });
      navigate('/admin/disputes');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-pulse">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] italic">Instruction du dossier en cours...</p>
      </div>
    );
  }

  if (!selectedDispute) {
    return (
      <div className="text-center py-20 bg-red-50/10 rounded-[3rem] border border-dashed border-red-100">
        <Scale size={48} className="mx-auto mb-4 text-red-300 opacity-40" />
        <h3 className="text-xl font-display font-black text-[var(--text-accent)] uppercase mb-2">Dossier de Litige Introuvable</h3>
        <p className="text-xs text-[var(--text-muted)] mb-6 font-medium">L'identifiant spécifié n'est relié à aucune procédure d'arbitrage active.</p>
        <button onClick={() => navigate('/admin/disputes')} className="px-10 py-5 bg-[var(--text-accent)] text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest">
           Retour au Tribunal
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-body">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/admin/disputes')}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-[var(--text-accent)] hover:bg-[var(--bg-muted)] transition-all shadow-sm group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] opacity-60 italic">ARBITRAGE #{selectedDispute._id?.slice(-8).toUpperCase()}</span>
               <span className={`px-4 py-1 rounded-full text-[8px] font-black tracking-widest uppercase border ${selectedDispute.status === 'OUVERT' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-[var(--green-600)]/10 text-[var(--green-600)] border-[var(--green-600)]/20'}`}>
                 {selectedDispute.status === 'OUVERT' ? 'EXAMEN EN COURS' : 'RÉSOLU'}
               </span>
            </div>
            <h2 className="text-4xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight leading-none leading-none">
              Dossier de Médiation
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* LEFT COLUMN (65%) */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          {/* Incident Details Card */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-10 shadow-sm border border-[var(--border-light)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Scale size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
               <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl shadow-inner">
                 <AlertTriangle size={24} />
               </div>
               <h3 className="text-2xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight italic">Exposé des Faits</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <div className="p-8 rounded-[2rem] bg-[var(--bg-muted)]/30 border border-[var(--border-light)]">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)] mb-4 font-black italic">Plaignant (Acheteur)</p>
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--border-light)] flex items-center justify-center font-black text-[var(--text-accent)] shadow-sm">
                       {selectedDispute.buyer?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex flex-col">
                       <span className="font-display font-black text-[var(--text-accent)] uppercase text-lg tracking-tight">{selectedDispute.buyer?.name || 'Inconnu'}</span>
                       <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest opacity-60">Réclamation Active</span>
                    </div>
                 </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-[var(--bg-muted)]/30 border border-[var(--border-light)]">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)] mb-4 font-black italic">Défendeur (Vendeur)</p>
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--border-light)] flex items-center justify-center font-black text-[var(--text-accent)] shadow-sm">
                       {selectedDispute.seller?.name?.charAt(0) || 'V'}
                    </div>
                    <div className="flex flex-col">
                       <span className="font-display font-black text-[var(--text-accent)] uppercase text-lg tracking-tight">{selectedDispute.seller?.name || 'Inconnu'}</span>
                       <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest opacity-60">Défense de l'offre</span>
                    </div>
                 </div>
              </div>

              <div className="md:col-span-2">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)] mb-4 font-black italic">Motif du Griet</p>
                 <h4 className="text-2xl font-display font-black text-red-500 uppercase tracking-tight leading-7">
                    "{selectedDispute.reason || 'Non spécifié'}"
                 </h4>
              </div>

              <div className="md:col-span-2 bg-red-500/[0.03] p-10 rounded-[2.5rem] border border-red-500/10 relative overflow-hidden group shadow-inner">
                <AlertTriangle size={100} className="absolute -bottom-6 -right-6 text-red-500/5 group-hover:text-red-500/10 transition-all duration-1000 rotate-12" />
                <p className="text-lg leading-relaxed text-[var(--text-accent)] italic font-medium relative z-10 pl-8 border-l-4 border-red-500/20">
                  {selectedDispute.description || "Aucune description détaillée n'a été fournie pour cet incident."}
                </p>
              </div>

              {selectedDispute.proofs && selectedDispute.proofs.length > 0 && (
                <div className="md:col-span-2">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)] mb-6 font-black italic">Pièces à conviction ({selectedDispute.proofs.length})</p>
                  <div className="flex flex-wrap gap-8">
                    {selectedDispute.proofs.map((proof: string, idx: number) => (
                      <div key={idx} className="relative group w-48 h-48 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl cursor-zoom-in hover:scale-110 transition-all duration-500 bg-[var(--bg-muted)]">
                        <img className="object-cover w-full h-full" src={proof} alt={`Preuve ${idx + 1}`} />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <ImageIcon className="text-white" size={32} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Chat Timeline Section */}
          <section className="bg-[var(--bg-surface)] rounded-[3rem] p-10 shadow-sm border border-[var(--border-light)]">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-[var(--text-accent)]/10 text-[var(--text-accent)] rounded-2xl shadow-inner">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-2xl font-display font-black text-[var(--text-accent)] uppercase tracking-tight italic">Conversations Cryptées</h3>
            </div>
            
            <div className="space-y-10 max-h-[600px] overflow-y-auto pr-8 custom-scrollbar">
              {selectedDispute.messages && selectedDispute.messages.length > 0 ? (
                selectedDispute.messages.map((chat: any, i: number) => (
                  <div key={i} className={`flex flex-col ${chat.senderId === selectedDispute.seller?._id ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${chat.senderId === selectedDispute.seller?._id ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[9px] font-black text-[var(--text-accent)] uppercase tracking-[0.2em]">{chat.senderId === selectedDispute.seller?._id ? 'Vendeur' : 'Acheteur'}</span>
                      <span className="w-1 h-1 bg-[var(--border-light)] rounded-full"></span>
                      <span className="text-[8px] text-[var(--text-muted)] font-black uppercase tracking-widest">{chat.timestamp ? format(new Date(chat.timestamp), 'HH:mm', { locale: fr }) : ''}</span>
                    </div>
                    <div className={`max-w-[80%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm border ${chat.senderId === selectedDispute.seller?._id 
                      ? 'bg-[var(--text-accent)] text-white rounded-tr-none border-[var(--text-accent)]/10 shadow-xl shadow-[var(--text-accent)]/10' 
                      : 'bg-[var(--bg-muted)]/30 text-[var(--text-accent)] rounded-tl-none border-[var(--border-light)]'}`}>
                      {chat.content}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 opacity-30 italic font-medium">
                   Aucun échange direct n'a été enregistré via le système de messagerie sécurisé.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (35%) */}
        <div className="col-span-12 lg:col-span-4 space-y-10">
          {/* Reputation Bento */}
          <section className="bg-[var(--bg-surface)] p-10 rounded-[3rem] border border-[var(--border-light)] shadow-sm">
            <h3 className="font-display text-xl font-black text-[var(--text-accent)] uppercase tracking-tight italic mb-10 flex items-center gap-4">
              <User size={24} className="text-red-500" />
              Historique des Parties
            </h3>
            <div className="space-y-8">
              {[
                { name: selectedDispute.buyer?.name || 'Acheteur', role: 'Plaignant', rating: '4.8/5.0', tx: '124', color: 'text-blue-500' },
                { name: selectedDispute.seller?.name || 'Vendeur', role: 'Défendeur', rating: '3.2/5.0', tx: '45', color: 'text-orange-500' }
              ].map((profile, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-[var(--bg-muted)]/20 border border-[var(--border-light)] hover:bg-white hover:shadow-2xl hover:border-transparent transition-all group relative overflow-hidden">
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--bg-muted)] border-4 border-white shadow-xl flex items-center justify-center font-black text-xl text-[var(--text-accent)]">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-[var(--text-accent)] uppercase tracking-tight leading-tight">{profile.name}</h4>
                      <p className={`text-[8px] font-black ${profile.color} uppercase tracking-[0.2em] mt-1`}>{profile.role}</p>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                     <div className="bg-white/60 p-4 rounded-2xl border border-[var(--border-light)]">
                        <p className="text-[7px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1 opacity-60">Score Trust</p>
                        <div className="flex items-center text-amber-500 text-xs font-black">
                           <Star size={10} fill="currentColor" className="mr-1" />
                           {profile.rating}
                        </div>
                     </div>
                     <div className="bg-white/60 p-4 rounded-2xl border border-[var(--border-light)]">
                        <p className="text-[7px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1 opacity-60">Fidélité</p>
                        <p className="text-xs font-black text-[var(--text-accent)]">{profile.tx} Opér.</p>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verdict Panel */}
          <section className="bg-[var(--text-accent)] p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
            <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight italic mb-8 flex items-center gap-4 relative z-10">
              <Scale size={32} className="text-red-400" />
              Arbitrage Final
            </h3>
            
            <div className="space-y-4 relative z-10">
              {[
                { id: 'REFUND', title: "Remboursement Total", sub: "Pénalité maximale vendeur", icon: RotateCcw },
                { id: 'RELEASE', title: "Validation Livraison", sub: "Libération totale des fonds", icon: CheckCircle },
                { id: 'PARTIAL', title: "Accord Transactionnel", sub: "Partage 50/50 de la valeur", icon: Scale }
              ].map((opt) => (
                <label key={opt.id} className={`group relative flex items-center gap-5 p-6 rounded-[1.8rem] border transition-all cursor-pointer shadow-sm ${decision === opt.id ? 'bg-white border-white scale-[1.05]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <input 
                    type="radio" 
                    name="decision" 
                    value={opt.id} 
                    checked={decision === opt.id}
                    onChange={(e) => setDecision(e.target.value)}
                    className="w-5 h-5 accent-[var(--text-accent)] cursor-pointer" 
                  />
                  <div className="flex flex-col">
                    <span className={`text-sm font-black uppercase tracking-tight transition-colors ${decision === opt.id ? 'text-[var(--text-accent)]' : 'text-white'}`}>{opt.title}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest opacity-40 ${decision === opt.id ? 'text-[var(--text-accent)]' : 'text-white'}`}>{opt.sub}</span>
                  </div>
                </label>
              ))}
              
              <div className="pt-8">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3 block font-black italic">Rapport du Tribunal</label>
                <textarea 
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-sm focus:ring-4 focus:ring-white/10 transition-all text-white outline-none resize-none font-medium placeholder:opacity-20 shadow-inner" 
                  placeholder="Justification légale de l'arbitrage..."
                ></textarea>
              </div>
              
              <button 
                onClick={handleResolve}
                disabled={selectedDispute.status === 'RÉSOLU'}
                className={`w-full font-black py-6 rounded-[2rem] shadow-2xl transition-all active:scale-[0.96] flex items-center justify-center gap-4 mt-8 uppercase text-[10px] tracking-[0.3em] ${selectedDispute.status === 'RÉSOLU' ? 'bg-white/10 text-white/20 cursor-not-allowed' : 'bg-white text-[var(--text-accent)] hover:shadow-white/20'}`}
              >
                <Gavel size={24} />
                Fermer le Dossier Litige
              </button>
            </div>
          </section>

          <div className="p-8 bg-red-500/10 rounded-[2.5rem] flex items-start gap-5 border border-red-500/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ShieldAlert size={32} className="text-red-500 flex-shrink-0 animate-pulse" />
            <p className="text-[11px] leading-relaxed text-[var(--text-accent)] font-medium italic relative z-10">
              Cet acte d'arbitrage souverain déclenchera immédiatement l'exécution financière. Assurez-vous d'avoir examiné toutes les pièces à conviction. <strong>L'État garantit l'impartialité de cette décision.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDisputeResolvePage;
