import React from 'react';
import { MessageSquare, Search, Send, User, Clock, Phone, Info } from 'lucide-react';

const MessagingPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col font-body animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-10 shrink-0">
        <h1 className="text-5xl lg:text-7xl font-display text-[var(--text-primary)] flex items-center gap-6">
          <MessageSquare size={50} className="text-[var(--text-accent)]" />
          Messages
        </h1>
        <p className="text-[var(--text-secondary)] font-medium text-lg max-w-2xl">
          Coordonnez vos transactions et livraisons en direct.
        </p>
      </div>

      <div className="flex-1 bg-[var(--bg-surface)] rounded-[3rem] shadow-sm border border-[var(--border-light)] overflow-hidden flex divide-x divide-[var(--border-light)]">
        <aside className="w-80 flex flex-col bg-[var(--bg-muted)]/30">
          <div className="p-6 border-b border-[var(--border-light)]">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl text-xs font-bold border border-[var(--border-light)] focus:outline-none focus:border-[var(--text-accent)] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--text-accent)] transition-colors" size={16} />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-8 opacity-40">
             <p className="text-[10px] font-black uppercase tracking-widest text-center text-[var(--text-secondary)]">Aucune conversation active</p>
          </div>
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6 bg-[var(--bg-surface)]">
           <div className="w-24 h-24 bg-[var(--text-accent)]/5 rounded-[2rem] flex items-center justify-center text-[var(--text-accent)]/30">
              <MessageSquare size={48} />
           </div>
           <div>
              <h3 className="text-xl font-display text-[var(--text-primary)]">Messagerie sécurisée</h3>
              <p className="text-sm font-medium text-[var(--text-secondary)] max-w-xs mt-2 mx-auto">Vos échanges sont cryptés et protégés. Sélectionnez une conversation pour commencer.</p>
           </div>
        </main>
      </div>
    </div>
  );
};

export default MessagingPage;
