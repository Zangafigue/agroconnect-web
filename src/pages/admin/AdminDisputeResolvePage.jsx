import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AdminDisputeResolvePage() {
  const { id } = useParams();

  return (
    <div className="pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Link to="/admin/disputes" className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            ← Retour à la liste
          </Link>
          <div className="h-6 w-[1px] bg-outline-variant/30"></div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-on-surface font-headline">
              Litige <span className="font-mono">#{id || 'L012'}</span> — Résolution
            </h2>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold tracking-wider">
              EN COURS D'EXAMEN
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 max-w-[1440px]">
        {/* LEFT COLUMN (63%) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Card: Informations sur l'incident */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">info</span>
              <h3 className="text-lg font-bold font-serif-display">Informations sur l'incident</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline mb-1 font-bold">Plaignant</p>
                <p className="font-medium text-on-surface">Fatima T.</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline mb-1 font-bold">Défendeur</p>
                <p className="font-medium text-on-surface">Koné D.</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-widest text-outline mb-1 font-bold">Motif du litige</p>
                <p className="text-primary font-bold">Non livraison</p>
              </div>
              <div className="col-span-2 bg-surface-container-low/50 p-6 rounded-xl border border-outline-variant/20 relative">
                <span className="material-symbols-outlined absolute top-4 left-4 text-outline/20 text-4xl leading-none">format_quote</span>
                <p className="text-sm leading-relaxed text-on-surface-variant italic font-headline text-lg pl-8 relative z-10">
                  "J'attends ma livraison depuis 3 jours. Le transporteur ne répond plus à mes appels alors que le chargement de maïs de 2 tonnes a été validé au hangar."
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-widest text-outline mb-3 font-bold">Preuves soumises</p>
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-surface-container-high border border-outline-variant/30 flex items-center justify-center cursor-zoom-in hover:opacity-90 transition-opacity">
                    <img className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMQLkxigQbLHZNdc7pOzlVgRgrTXfV4snRql8TLYBynogBIeRaacOJcmOFSrmPfsArlQmEygOx3tnQFM8kW8KTqLb4CeJaNKMRLqw1mpeOnI8HggOiiN9gFShKfEatNnoyxGtTX3KbNgq00K-6_MgdgakrG2chAGiMoTanennqmPg-syTitlrHwj6DTE1ew_T6t9yLJ9MQs4ewt6Welronw10xq7-3jWnCkTvK5slQmovZAt-4T-PfpM8pZXTXZQQGl5kB-IK4SUE" alt="Preuve commande" />
                  </div>
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-surface-container-high border border-outline-variant/30 flex items-center justify-center cursor-zoom-in hover:opacity-90 transition-opacity">
                    <img className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqLxbR2TWMqpD4sek0MSR3Aq6HPCvfqD5HXftZnJEpgvrOdod4XFlKqyIwfv6Q96vQHJtyOnHEQsnZ_Gl1AmKVXdPZsO7NXsBG5xbkVpXvk8Lf5-fvFhIcj27DlWSr_8nMtXR7yuP-rjpRp0YC4kMCs1hQ2vgS-T3aEeP02SfDZ25fO_iEViz8G28GOGEEJzIuTeSyA3zka_2Zu4JdQZutjnKFYIExaSlH-TpEzczREKO-zEGRK3uBmIIF_A-uS-YoVA2DWpCsQvg" alt="Preuve lieu" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Card: Échanges récents */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">chat</span>
              <h3 className="text-lg font-bold font-serif-display">Échanges récents</h3>
            </div>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4">
              <div className="flex flex-col items-start max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-secondary">FATIMA T. (Acheteur)</span>
                  <span className="text-[9px] text-outline font-mono">15:10</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed text-on-surface">
                  Bonjour, je n'ai toujours pas de nouvelles pour ma cargaison de maïs. Le chauffeur est-il en route ?
                </div>
              </div>
              <div className="flex flex-col items-end ml-auto max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] text-outline font-mono">16:45</span>
                  <span className="text-[10px] font-bold text-tertiary">KONÉ D. (Transporteur)</span>
                </div>
                <div className="bg-primary/10 text-primary-fixed-dim p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed text-on-surface">
                  J'ai eu une panne moteur à 20km de Bobo. Mon téléphone n'avait plus de batterie. Je cherche une solution.
                </div>
              </div>
              <div className="flex flex-col items-start max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-secondary">FATIMA T. (Acheteur)</span>
                  <span className="text-[9px] text-outline font-mono">18:00</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed text-on-surface">
                  C'est la troisième fois ce mois-ci que vous avez un problème technique. J'ai des clients qui attendent sur le marché. Je demande le remboursement immédiat.
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (37%) */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Card: Profils des parties */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">groups</span>
              <h3 className="text-lg font-bold font-serif-display">Profils des parties</h3>
            </div>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-surface-container-low/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold shadow-sm">FT</div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Fatima Traoré</h4>
                  <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Acheteur Certifié</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-amber-500 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-mono font-bold">4.8</span>
                    <span className="text-[10px] text-outline">(124 transactions)</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-low/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-white font-bold shadow-sm">KD</div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Koné Drissa</h4>
                  <p className="text-[10px] text-tertiary font-semibold uppercase tracking-wider">Transporteur</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-amber-500 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-mono font-bold">3.2</span>
                    <span className="text-[10px] text-outline">(45 transactions)</span>
                  </div>
                  <p className="text-[10px] text-error font-bold mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    2 LITIGES EN COURS
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Card: Prendre une décision */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">gavel</span>
              <h3 className="text-lg font-bold font-serif-display">Prendre une décision</h3>
            </div>
            <div className="space-y-4">
              <label className="group relative flex items-center gap-4 p-4 rounded-lg border border-outline-variant hover:border-primary transition-all cursor-pointer bg-white">
                <input type="radio" name="decision" className="w-4 h-4 text-primary focus:ring-primary border-outline-variant accent-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Rembourser l'acheteur</span>
                  <span className="text-[10px] text-outline">Annulation totale de la transaction</span>
                </div>
              </label>
              <label className="group relative flex items-center gap-4 p-4 rounded-lg border border-outline-variant hover:border-primary transition-all cursor-pointer bg-white">
                <input type="radio" name="decision" className="w-4 h-4 text-primary focus:ring-primary border-outline-variant accent-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Libérer les fonds</span>
                  <span className="text-[10px] text-outline">Paiement intégral du transporteur</span>
                </div>
              </label>
              <label className="group relative flex items-center gap-4 p-4 rounded-lg border border-outline-variant hover:border-primary transition-all cursor-pointer bg-white">
                <input type="radio" name="decision" className="w-4 h-4 text-primary focus:ring-primary border-outline-variant accent-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Remboursement partiel</span>
                  <span className="text-[10px] text-outline">Pénalité de 50% sur les frais</span>
                </div>
              </label>
              <div className="pt-4">
                <label className="text-[10px] uppercase tracking-widest text-outline mb-2 block font-bold">Note de résolution</label>
                <textarea 
                  className="w-full h-32 bg-surface-container-low border-0 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary transition-all text-on-surface outline-none" 
                  placeholder="Justifiez votre décision ici..."
                ></textarea>
              </div>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                Résoudre le litige
              </button>
            </div>
          </section>

          <div className="p-4 bg-primary/10 rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined text-primary">security</span>
            <p className="text-[11px] leading-relaxed text-on-primary-container">
              <strong>Protocole de sécurité :</strong> Une fois la résolution validée, les fonds seront automatiquement transférés et cette décision sera irréversible. Les parties seront notifiées par SMS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
