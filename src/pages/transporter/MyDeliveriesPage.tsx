import React from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  Weight, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  History,
  Navigation,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const MyDeliveriesPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto min-h-screen flex flex-col animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col gap-3 mb-12">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface flex items-center gap-6">
          <Package size={50} className="text-primary" />
          Livraisons
        </h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Suivez vos trajets en temps réel et gérez la documentation de transport.
        </p>
      </div>

      {/* Tabs M3 */}
      <div className="flex gap-12 mb-12 border-b border-outline-variant/10">
        <button className="pb-6 text-primary font-black text-xs uppercase tracking-widest border-b-4 border-primary flex items-center gap-3">
          En cours <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px]">1</span>
        </button>
        <button className="pb-6 text-outline font-black text-xs uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3 border-b-4 border-transparent opacity-60">
          Terminées <span className="bg-surface-container-low text-outline px-3 py-1 rounded-full text-[10px]">12</span>
        </button>
      </div>

      {/* Active Content */}
      <section className="space-y-12">
        {/* Active Delivery Card */}
        <div className="bg-surface-container-lowest rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden group transition-all hover:shadow-2xl">
          {/* Card Header */}
          <div className="px-10 py-6 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/5">
            <div className="flex items-center gap-5">
              <span className="font-mono font-black text-primary text-lg">#BF-041</span>
              <div className="w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
              <h2 className="font-black text-on-surface flex items-center gap-3">
                Sorgho de Koudougou 
                <ArrowRight size={18} className="text-primary" /> 
                Ouagadougou
              </h2>
            </div>
            <div className="px-6 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-primary/20">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></div>
              EN ROUTE
            </div>
          </div>

          {/* Map Visualization */}
          <div className="relative h-[250px] bg-primary/5 overflow-hidden border-b border-outline-variant/5 group-hover:bg-primary/10 transition-colors duration-1000">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <svg className="absolute inset-0 w-full h-full p-16" preserveAspectRatio="none" viewBox="0 0 800 200">
              <path d="M50,150 Q200,50 400,100 T750,50" fill="none" stroke="currentColor" className="text-primary/30" strokeDasharray="10 5" strokeWidth="4"></path>
              <circle cx="50" cy="150" className="fill-primary" r="8"></circle>
              <circle cx="750" cy="50" className="fill-tertiary" r="8"></circle>
            </svg>
            
            <div className="absolute left-[40%] top-[45%] -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-2xl shadow-2xl flex items-center justify-center animate-bounce">
              <Truck size={24} />
            </div>
            
            <div className="absolute left-16 bottom-10 bg-white shadow-xl px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-outline-variant/10">Départ: Koudougou</div>
            <div className="absolute right-16 top-10 bg-white shadow-xl px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-outline-variant/10">Arrivée: Ouagadougou</div>
          </div>

          {/* Metrics */}
          <div className="px-10 py-6 flex flex-wrap gap-8 bg-white border-b border-outline-variant/5">
            {[
              { label: 'Distance', val: '100 km', icon: Navigation },
              { label: 'Temps estimé', val: '1h30', icon: Clock },
              { label: 'Charge', val: '200 kg', icon: Weight }
            ].map((metric, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-2.5 bg-primary/5 rounded-2xl text-primary font-black text-xs border border-primary/10 uppercase tracking-widest shadow-sm">
                <metric.icon size={18} />
                {metric.val}
              </div>
            ))}
          </div>

          {/* Contacts & Earnings */}
          <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white">
            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-outline mb-6">Émetteur & Destinataire</h3>
              <div className="space-y-5">
                {[
                  { name: 'Amadou K.', role: 'PRODUCTEUR', phone: '+226 70 00 00 00', color: 'primary', initials: 'AK' },
                  { name: 'Fatima T.', role: 'ACHETEUR', phone: '+226 75 11 11 11', color: 'tertiary', initials: 'FT' }
                ].map((contact, i) => (
                  <div key={i} className="flex items-center gap-6 p-5 rounded-[2rem] hover:bg-surface-container-low transition-all border border-transparent hover:border-outline-variant/10 group/contact">
                    <div className={`w-14 h-14 rounded-2xl bg-${contact.color}/10 text-${contact.color} flex items-center justify-center font-black text-lg group-hover/contact:scale-110 transition-transform`}>
                      {contact.initials}
                    </div>
                    <div>
                      <p className="font-black text-on-surface text-lg">{contact.name}</p>
                      <p className="text-xs text-outline font-bold mt-1 flex items-center gap-2">
                        <Phone size={14} /> {contact.phone}
                      </p>
                    </div>
                    <span className={`ml-auto text-[8px] font-black px-4 py-1.5 rounded-full border border-${contact.color}/20 text-${contact.color} tracking-widest uppercase`}>
                      {contact.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end text-center lg:text-right space-y-6 p-10 bg-primary/5 rounded-[3rem] border border-primary/10 group/earn">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-2">Ma rémunération garantie</p>
                <p className="text-5xl font-mono font-black text-primary group-hover:scale-110 transition-transform duration-500">{formatFCFA(10000)}</p>
              </div>
              <div className="px-6 py-3 bg-white text-tertiary text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 border border-tertiary/10 shadow-xl shadow-tertiary/10">
                <ShieldCheck size={18} />
                Solde sous séquestre
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-10 py-8 bg-surface-container-low/50 flex flex-wrap items-center justify-end gap-6 border-t border-outline-variant/10">
            <button className="px-10 py-4 rounded-2xl border-2 border-primary text-primary font-black text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95 bg-transparent flex items-center gap-3">
              <MessageSquare size={18} />
              Messagerie
            </button>
            <button className="px-12 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3">
              <CheckCircle2 size={18} />
              Valider la livraison
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="pt-20">
           <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl font-serif-display text-on-surface">Historique des missions</h2>
              <div className="h-px flex-1 bg-outline-variant/20"></div>
           </div>

           <div className="bg-surface-container-lowest rounded-[3rem] overflow-hidden shadow-sm border border-outline-variant/10">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-surface-container-low/50 border-b border-outline-variant/10 uppercase text-[10px] font-black tracking-widest text-outline">
                          <th className="px-10 py-6">ID Mission</th>
                          <th className="px-10 py-6">Trajet Effectué</th>
                          <th className="px-10 py-6 text-right">Gain Net</th>
                          <th className="px-10 py-6 text-right">Date Clôture</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                       {[
                         { id: '#038', from: 'Bobo', to: 'Ouaga', product: 'Maïs', weight: '450 kg', gain: 15000, date: '09 mars' },
                         { id: '#035', from: 'Fada', to: 'Ouaga', product: 'Niébé', weight: '120 kg', gain: 8500, date: '05 mars' }
                       ].map((row, i) => (
                          <tr key={i} className="hover:bg-primary/5 transition-all group cursor-pointer">
                             <td className="px-10 py-8">
                                <div className="flex items-center gap-4">
                                   <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                      <CheckCircle2 size={16} />
                                   </div>
                                   <span className="font-mono font-black text-on-surface">{row.id}</span>
                                </div>
                             </td>
                             <td className="px-10 py-8">
                                <p className="font-black text-on-surface flex items-center gap-3">
                                   {row.from} <ArrowRight size={14} className="text-outline" /> {row.to}
                                </p>
                                <p className="text-[10px] text-outline font-black uppercase tracking-widest mt-1">{row.product} • {row.weight}</p>
                             </td>
                             <td className="px-10 py-8 text-right">
                                <span className="font-mono font-black text-lg text-primary">{formatFCFA(row.gain)}</span>
                             </td>
                             <td className="px-10 py-8 text-right">
                                <span className="text-xs font-black text-outline uppercase tracking-widest">{row.date}</span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-8 text-center bg-surface-container-low/20">
                 <button className="text-primary font-black text-xs uppercase tracking-[0.2em] hover:underline decoration-2 underline-offset-8 flex items-center gap-3 mx-auto">
                    Voir toutes les archives <History size={16} />
                 </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default MyDeliveriesPage;
