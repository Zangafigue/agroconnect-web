import React from 'react';
import { MessageSquare, Search, Send, User, Clock, Phone, Info } from 'lucide-react';

const MessagingPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-10 shrink-0">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface flex items-center gap-6 text-primary">
          <MessageSquare size={50} />
          Messages
        </h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Coordonnez vos transactions et livraisons en direct.
        </p>
      </div>

      <div className="flex-1 bg-surface-container-lowest rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden flex divide-x divide-outline-variant/10">
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
          <div className="flex-1 flex items-center justify-center p-8 opacity-40">
             <p className="text-[10px] font-black uppercase tracking-widest text-center">Aucune conversation active</p>
          </div>
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
           <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary/30">
              <MessageSquare size={48} />
           </div>
           <div>
              <h3 className="text-xl font-serif-display text-on-surface">Messagerie sécurisée</h3>
              <p className="text-sm font-medium text-on-surface-variant max-w-xs mt-2 mx-auto">Vos échanges sont cryptés et protégés. Sélectionnez une conversation pour commencer.</p>
           </div>
        </main>
      </div>
    </div>
  );
};

export default MessagingPage;
