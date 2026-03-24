import React from 'react';
import { MessageSquare, Send, Phone, Info, Search } from 'lucide-react';
import Card from '../../components/shared/Card';
import Avatar from '../../components/shared/Avatar';

const TransporterMessagesPage: React.FC = () => {
  return (
    <div className="pt-12 px-8 md:px-16 w-full max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col font-body">
      <header className="mb-6 shrink-0">
        <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Messagerie</h1>
        <p className="text-[14px] text-[var(--text-secondary)]">Échangez avec les agriculteurs et les acheteurs pour coordonner vos livraisons.</p>
      </header>

      <Card className="flex-1 overflow-hidden flex flex-col md:flex-row p-0 border border-[var(--border-light)] mb-8">
        
        {/* Sidebar: Chat List */}
        <aside className="w-full md:w-80 flex flex-col border-b md:border-b-0 md:border-r border-[var(--border-light)] bg-[var(--bg-muted)]/30">
          <div className="p-4 border-b border-[var(--border-light)]">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--border-light)] rounded-lg text-[13px] focus:outline-none focus:border-[var(--text-accent)] transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {[
              { name: 'Amadou K.', role: 'FARMER', last: 'Le chargement est prêt.', time: '14:30', active: true, unread: 2 },
              { name: 'Fatima T.', role: 'BUYER', last: 'Merci pour la livraison !', time: 'Hier', active: false },
              { name: 'AgroGroup BF', role: 'BUYER', last: 'Offre acceptée pour #045', time: 'Lun', active: false }
            ].map((chat, i) => (
              <div 
                 key={i} 
                 className={`p-4 flex gap-3 cursor-pointer transition-all border-l-4 ${chat.active ? 'bg-white border-[var(--text-accent)]' : 'border-transparent hover:bg-white'}`}
              >
                <Avatar name={chat.name} role={chat.role as any} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-[14px] text-[var(--text-primary)] truncate">{chat.name}</p>
                    <span className={`text-[10px] font-bold ${chat.active ? 'text-[var(--text-accent)]' : 'text-[var(--text-muted)]'}`}>{chat.time}</span>
                  </div>
                  <p className={`text-[12px] truncate ${chat.active ? 'font-bold text-[var(--text-primary)]' : 'font-medium text-[var(--text-secondary)]'}`}>
                     {chat.last}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main: Chat View */}
        <main className="flex-1 flex flex-col bg-[var(--bg-surface)]">
           {/* Chat Header */}
           <header className="px-6 py-4 border-b border-[var(--border-light)] flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                 <Avatar name="Amadou K." role="FARMER" size="lg" />
                 <div>
                    <h3 className="text-[16px] font-bold text-[var(--text-primary)]">Amadou K.</h3>
                    <p className="text-[11px] font-bold text-green-600 flex items-center gap-1.5 uppercase tracking-wider">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> En ligne
                    </p>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button className="p-2.5 text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors">
                    <Phone size={18} />
                 </button>
                 <button className="p-2.5 text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors">
                    <Info size={18} />
                 </button>
              </div>
           </header>

           {/* Messages List Area */}
           <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[var(--bg-muted)]/10">
              <div className="text-center">
                 <span className="px-3 py-1 bg-[var(--bg-muted)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest rounded">Aujourd'hui</span>
              </div>
              
              {/* Message In */}
              <div className="flex gap-3 max-w-[85%]">
                 <Avatar name="Amadou K." role="FARMER" size="sm" />
                 <div className="p-4 bg-white rounded-2xl rounded-tl-sm border border-[var(--border-light)] shadow-sm">
                    <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">Bonjour ! J'ai fini de préparer les sacs de maïs. Vous pouvez passer vers 16h ?</p>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mt-2 text-right">14:15</p>
                 </div>
              </div>

              {/* Message Out */}
              <div className="flex flex-row-reverse gap-3 max-w-[85%] ml-auto">
                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white shrink-0">KD</div>
                 <div className="p-4 bg-[var(--text-accent)] text-white rounded-2xl rounded-tr-sm shadow-sm">
                    <p className="text-[14px] leading-relaxed">C'est noté Amadou. Je suis à 20km de votre position. Je serai là à l'heure.</p>
                    <p className="text-[10px] font-bold text-white/70 uppercase mt-2 text-right">14:28</p>
                 </div>
              </div>
              
              {/* Message In */}
              <div className="flex gap-3 max-w-[85%]">
                 <Avatar name="Amadou K." role="FARMER" size="sm" />
                 <div className="p-4 bg-white rounded-2xl rounded-tl-sm border border-[var(--border-light)] shadow-sm">
                    <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">Parfait, à tout à l'heure.</p>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mt-2 text-right">14:30</p>
                 </div>
              </div>
           </div>

           {/* Input Area */}
           <footer className="p-4 bg-white border-t border-[var(--border-light)]">
              <div className="relative flex items-center">
                 <input 
                   type="text" 
                   placeholder="Écrivez votre message..." 
                   className="w-full pl-4 pr-16 py-3 bg-[var(--bg-muted)]/50 focus:bg-white border border-transparent focus:border-[var(--text-accent)] rounded-xl text-[14px] text-[var(--text-primary)] focus:outline-none transition-colors"
                 />
                 <button className="absolute right-2 p-2 bg-[var(--text-accent)] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    <Send size={18} />
                 </button>
              </div>
           </footer>
        </main>
      </Card>
    </div>
  );
};

export default TransporterMessagesPage;
