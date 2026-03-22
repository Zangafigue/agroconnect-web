import React from 'react';
import { MessageSquare, Search, Send, User, Clock, Phone, Info } from 'lucide-react';

const TransporterMessagesPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-10 shrink-0">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface flex items-center gap-6">
          <MessageSquare size={50} className="text-primary" />
          Messages
        </h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Échangez avec les agriculteurs et les acheteurs pour coordonner vos livraisons.
        </p>
      </div>

      <div className="flex-1 bg-surface-container-lowest rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden flex divide-x divide-outline-variant/10">
        {/* Sidebar: Chat List */}
        <aside className="w-80 flex flex-col bg-surface-container-low/30">
          <div className="p-6 border-b border-outline-variant/10">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl text-xs font-bold border-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={16} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { name: 'Amadou K.', last: 'Le chargement est prêt.', time: '14:30', active: true, unread: 2 },
              { name: 'Fatima T.', last: 'Merci pour la livraison !', time: 'Hier', active: false },
              { name: 'AgroGroup BF', last: 'Offre acceptée pour #045', time: 'Lun', active: false }
            ].map((chat, i) => (
              <div key={i} className={`p-6 flex gap-4 cursor-pointer transition-all hover:bg-white ${chat.active ? 'bg-white shadow-sm relative' : 'opacity-70'}`}>
                {chat.active && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">
                   {chat.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-black text-on-surface text-xs truncate uppercase tracking-widest">{chat.name}</p>
                    <span className="text-[9px] font-black text-outline">{chat.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate font-medium">{chat.last}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main: Chat View */}
        <main className="flex-1 flex flex-col relative">
           {/* Chat Header */}
           <header className="px-10 py-6 border-b border-outline-variant/10 flex items-center justify-between bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-serif-display text-xl">AK</div>
                 <div>
                    <h3 className="text-lg font-black text-on-surface">Amadou K.</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div> En ligne
                    </p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <button className="p-3 bg-surface-container-low text-outline rounded-2xl hover:bg-primary/10 hover:text-primary transition-all">
                    <Phone size={20} />
                 </button>
                 <button className="p-3 bg-surface-container-low text-outline rounded-2xl hover:bg-primary/10 hover:text-primary transition-all">
                    <Info size={20} />
                 </button>
              </div>
           </header>

           {/* Messages List Area */}
           <div className="flex-1 p-10 overflow-y-auto space-y-8 bg-surface-container-low/10">
              <div className="text-center">
                 <span className="px-4 py-1.5 bg-outline-variant/10 text-outline text-[9px] font-black uppercase tracking-[0.3em] rounded-full">Aujourd'hui</span>
              </div>
              
              <div className="flex gap-4 max-w-[80%]">
                 <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0">AK</div>
                 <div className="p-5 bg-white rounded-3xl rounded-tl-none shadow-sm border border-outline-variant/5">
                    <p className="text-sm font-medium text-on-surface leading-relaxed">Bonjour ! J'ai fini de préparer les sacs de maïs. Vous pouvez passer vers 16h ?</p>
                    <p className="text-[9px] font-black text-outline uppercase mt-2 text-right">14:15</p>
                 </div>
              </div>

              <div className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto">
                 <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center text-[10px] font-black shrink-0">KD</div>
                 <div className="p-5 bg-primary text-white rounded-3xl rounded-tr-none shadow-xl shadow-primary/10">
                    <p className="text-sm font-medium leading-relaxed">C'est noté Amadou. Je suis à 20km de votre position. Je serai là à l'heure.</p>
                    <p className="text-[9px] font-black opacity-60 uppercase mt-2 text-right">14:28</p>
                 </div>
              </div>
              
              <div className="flex gap-4 max-w-[80%]">
                 <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0">AK</div>
                 <div className="p-5 bg-white rounded-3xl rounded-tl-none shadow-sm border border-outline-variant/5">
                    <p className="text-sm font-medium text-on-surface leading-relaxed">Parfait, à tout à l'heure.</p>
                    <p className="text-[9px] font-black text-outline uppercase mt-2 text-right">14:30</p>
                 </div>
              </div>
           </div>

           {/* Input Area */}
           <footer className="p-8 bg-white border-t border-outline-variant/10">
              <div className="relative group">
                 <input 
                   type="text" 
                   placeholder="Écrivez votre message..." 
                   className="w-full pl-8 pr-20 py-5 bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-[2rem] font-medium text-on-surface focus:ring-0 transition-all shadow-inner"
                 />
                 <button className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
                    <Send size={20} />
                 </button>
              </div>
           </footer>
        </main>
      </div>
    </div>
  );
};

export default TransporterMessagesPage;
