import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare, Search, Send, Loader2, User, ChevronRight, Package } from 'lucide-react';
import messageService from '../../services/messageService';
import { useAuthStore } from '../../store/authStore';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Participant {
  _id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  profilePicture?: string;
}
interface Conversation {
  _id: string;
  participants: Participant[];
  lastMessage?: { content: string; createdAt: string };
  unreadCount?: number;
  product?: { _id: string; title?: string; name?: string };
  updatedAt: string;
}
interface Message {
  _id: string;
  sender: string | { _id: string };
  content: string;
  createdAt: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getParticipantName = (p: Participant) =>
  p?.name || `${p?.firstName || ''} ${p?.lastName || ''}`.trim() || 'Utilisateur';

const getInitials = (p: Participant) => {
  const name = getParticipantName(p);
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U';
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'hier';
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
};

// ─── Component ───────────────────────────────────────────────────────────────
const MessagingPage: React.FC = () => {
  const { user } = useAuthStore() as any;
  const [searchParams] = useSearchParams();
  const recipientIdParam = searchParams.get('recipientId');
  const productIdParam = searchParams.get('productId');
  const openParam = searchParams.get('open');

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [sending, setSending] = useState(false);
  const [creatingConv, setCreatingConv] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch conversations ────────────────────────────────────────────────────
  const loadConversations = useCallback(async (silent = false) => {
    if (!silent) setLoadingConvs(true);
    try {
      const data = await messageService.getConversations();
      const arr: Conversation[] = Array.isArray(data) ? data : (data?.conversations || data?.data || []);
      setConversations(arr);
      return arr;
    } catch (e) {
      console.error('loadConversations:', e);
      return [];
    } finally {
      if (!silent) setLoadingConvs(false);
    }
  }, []);

  // ── Fetch messages for a conversation ────────────────────────────────────
  const loadMessages = useCallback(async (convId: string, silent = false) => {
    if (!silent) setLoadingMsgs(true);
    try {
      const data = await messageService.getMessages(convId);
      const arr: Message[] = Array.isArray(data) ? data : (data?.messages || data?.data || []);
      setMessages(arr);
      await messageService.markAsRead(convId).catch(() => {});
    } catch (e) {
      console.error('loadMessages:', e);
    } finally {
      if (!silent) setLoadingMsgs(false);
    }
  }, []);

  // ── Select a conversation ─────────────────────────────────────────────────
  const selectConversation = useCallback(async (conv: Conversation) => {
    setActiveConv(conv);
    setMessages([]);
    await loadMessages(conv._id);
  }, [loadMessages]);

  // ── Handle ?recipientId param → create/open conversation ─────────────────
  const handleRecipientParam = useCallback(async (convs: Conversation[]) => {
    if (!recipientIdParam) return;
    // Check if conversation already exists with this recipient
    const existing = convs.find(c =>
      c.participants.some(p => (typeof p === 'object' ? p._id : p) === recipientIdParam)
    );
    if (existing) {
      selectConversation(existing);
      return;
    }
    // Create new conversation
    setCreatingConv(true);
    try {
      const payload: Record<string, string> = { recipientId: recipientIdParam };
      if (productIdParam) payload.productId = productIdParam;
      const newConv = await messageService.createConversation(payload);
      const refreshed = await loadConversations(true);
      const found = refreshed.find(c => c._id === (newConv?._id || newConv?.conversation?._id));
      if (found) selectConversation(found);
    } catch (e) {
      console.error('createConversation:', e);
    } finally {
      setCreatingConv(false);
    }
  }, [recipientIdParam, productIdParam, selectConversation, loadConversations]);

  // ── Init ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const convs = await loadConversations();
      // Auto-open via ?open=convId
      if (openParam) {
        const found = convs.find(c => c._id === openParam);
        if (found) { selectConversation(found); return; }
      }
      // Auto-open via ?recipientId
      await handleRecipientParam(convs);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Polling ───────────────────────────────────────────────────────────────
  useEffect(() => {
    pollRef.current = setInterval(async () => {
      await loadConversations(true);
      if (activeConv) await loadMessages(activeConv._id, true);
    }, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [activeConv, loadConversations, loadMessages]);

  // ── Scroll to bottom on new messages ─────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Send message ──────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!draft.trim() || !activeConv || sending) return;
    const content = draft.trim();
    setDraft('');
    setSending(true);
    // Optimistic update
    const tempMsg: Message = {
      _id: `temp-${Date.now()}`,
      sender: user?._id || '',
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempMsg]);
    try {
      await messageService.sendMessage(activeConv._id, content);
      await loadMessages(activeConv._id, true);
    } catch (e) {
      console.error('sendMessage:', e);
      setMessages(prev => prev.filter(m => m._id !== tempMsg._id));
      setDraft(content);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // ── Other participant in a conversation ───────────────────────────────────
  const getOtherParticipant = (conv: Conversation): Participant => {
    const other = conv.participants?.find(p => {
      const pid = typeof p === 'object' ? p._id : p;
      return pid !== user?._id;
    });
    return (other as Participant) || { _id: '', name: 'Utilisateur' };
  };

  const isMine = (msg: Message) => {
    const sid = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
    return sid === user?._id;
  };

  const filteredConvs = conversations.filter(c => {
    const other = getOtherParticipant(c);
    return getParticipantName(other).toLowerCase().includes(search.toLowerCase());
  });

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="pt-12 px-4 md:px-8 lg:px-16 pb-8 w-full max-w-7xl mx-auto h-[calc(100vh-5rem)] flex flex-col font-body animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6 shrink-0">
        <h1 className="text-4xl lg:text-5xl font-display text-[var(--text-primary)] flex items-center gap-4">
          <MessageSquare size={40} className="text-[var(--text-accent)]" />
          Messages
        </h1>
        <p className="text-[var(--text-secondary)] font-medium">
          Coordonnez vos transactions et livraisons en direct.
        </p>
      </div>

      {/* Main Chat UI */}
      <div className="flex-1 bg-[var(--bg-surface)] rounded-3xl shadow-sm border border-[var(--border-light)] overflow-hidden flex min-h-0">

        {/* ── Sidebar : conversation list ── */}
        <aside className="w-full max-w-xs flex flex-col bg-[var(--bg-muted)]/30 border-r border-[var(--border-light)]">
          {/* Search */}
          <div className="p-4 border-b border-[var(--border-light)] shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={15} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[var(--bg-surface)] rounded-xl text-xs font-medium border border-[var(--border-light)] focus:outline-none focus:border-[var(--text-accent)] transition-all text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {creatingConv && (
              <div className="p-4 flex items-center gap-3 text-[var(--text-secondary)] text-xs">
                <Loader2 size={14} className="animate-spin text-[var(--text-accent)]" />
                Ouverture de la conversation...
              </div>
            )}
            {loadingConvs ? (
              <div className="flex flex-col gap-2 p-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 rounded-2xl bg-[var(--bg-muted)] animate-pulse" />
                ))}
              </div>
            ) : filteredConvs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-50">
                <MessageSquare size={32} className="mb-3 text-[var(--text-secondary)]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                  Aucune conversation
                </p>
                <p className="text-[10px] text-[var(--text-secondary)] mt-1">
                  Contactez un vendeur depuis une fiche produit
                </p>
              </div>
            ) : (
              filteredConvs.map(conv => {
                const other = getOtherParticipant(conv);
                const isActive = activeConv?._id === conv._id;
                return (
                  <button
                    key={conv._id}
                    onClick={() => selectConversation(conv)}
                    className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-all border-b border-[var(--border-light)]/50 hover:bg-[var(--text-accent)]/5 ${isActive ? 'bg-[var(--text-accent)]/10 border-l-2 border-l-[var(--text-accent)]' : ''}`}
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] font-black text-sm flex items-center justify-center shrink-0">
                      {other.profilePicture
                        ? <img src={other.profilePicture} className="w-full h-full object-cover rounded-xl" alt="" />
                        : getInitials(other)
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-xs font-bold truncate text-[var(--text-primary)] ${isActive ? 'text-[var(--text-accent)]' : ''}`}>
                          {getParticipantName(other)}
                        </p>
                        {conv.lastMessage && (
                          <span className="text-[9px] text-[var(--text-secondary)] shrink-0 ml-1">
                            {formatTime(conv.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      {conv.product && (
                        <p className="text-[9px] text-[var(--text-accent)] font-bold uppercase tracking-wider flex items-center gap-1 mb-0.5">
                          <Package size={8} />
                          {conv.product.title || conv.product.name}
                        </p>
                      )}
                      <p className="text-[10px] text-[var(--text-secondary)] truncate font-medium">
                        {conv.lastMessage?.content || 'Nouvelle conversation'}
                      </p>
                    </div>
                    {conv.unreadCount && conv.unreadCount > 0 && (
                      <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--text-accent)] text-white text-[9px] font-black flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* ── Main : message area ── */}
        <main className="flex-1 flex flex-col min-w-0">
          {activeConv ? (() => {
            const other = getOtherParticipant(activeConv);
            return (
              <>
                {/* Conversation header */}
                <div className="px-6 py-4 border-b border-[var(--border-light)] flex items-center gap-3 shrink-0 bg-[var(--bg-surface)]">
                  <div className="w-9 h-9 rounded-xl bg-[var(--text-accent)]/10 text-[var(--text-accent)] font-black text-sm flex items-center justify-center shrink-0">
                    {other.profilePicture
                      ? <img src={other.profilePicture} className="w-full h-full object-cover rounded-xl" alt="" />
                      : getInitials(other)
                    }
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)]">{getParticipantName(other)}</p>
                    {activeConv.product && (
                      <p className="text-[9px] text-[var(--text-accent)] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Package size={8} />
                        {activeConv.product.title || activeConv.product.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[var(--bg-muted)]/20">
                  {loadingMsgs ? (
                    <div className="flex justify-center py-12">
                      <Loader2 size={32} className="animate-spin text-[var(--text-accent)]" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12 opacity-60">
                      <MessageSquare size={40} className="text-[var(--text-secondary)] mb-3" />
                      <p className="font-bold text-[var(--text-secondary)] text-sm">Commencez la conversation</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">Envoyez votre premier message ci-dessous</p>
                    </div>
                  ) : (
                    messages.map(msg => {
                      const mine = isMine(msg);
                      return (
                        <div key={msg._id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed ${
                            mine
                              ? 'bg-[var(--text-accent)] text-white rounded-br-sm'
                              : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-light)] rounded-bl-sm'
                          }`}>
                            <p>{msg.content}</p>
                            <p className={`text-[9px] mt-1 font-bold ${mine ? 'text-white/60 text-right' : 'text-[var(--text-secondary)]'}`}>
                              {formatTime(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[var(--border-light)] bg-[var(--bg-surface)] shrink-0">
                  <div className="flex items-end gap-3">
                    <textarea
                      rows={1}
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Écrire un message... (Entrée pour envoyer)"
                      className="flex-1 resize-none bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-2xl px-4 py-3 text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-accent)] transition-all max-h-32"
                      style={{ field_sizing: 'content' } as React.CSSProperties}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!draft.trim() || sending}
                      className="h-11 w-11 bg-[var(--text-accent)] text-white rounded-2xl flex items-center justify-center hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[var(--text-accent)]/20 shrink-0"
                    >
                      {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </div>
                </div>
              </>
            );
          })() : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-5">
              <div className="w-20 h-20 bg-[var(--text-accent)]/5 rounded-[2rem] flex items-center justify-center text-[var(--text-accent)]/30">
                <MessageSquare size={40} />
              </div>
              <div>
                <h3 className="text-xl font-display text-[var(--text-primary)] mb-2">
                  {loadingConvs ? 'Chargement...' : 'Messagerie sécurisée'}
                </h3>
                <p className="text-sm font-medium text-[var(--text-secondary)] max-w-xs mx-auto">
                  {loadingConvs
                    ? 'Récupération de vos conversations...'
                    : 'Sélectionnez une conversation ou contactez un vendeur depuis une fiche produit.'}
                </p>
              </div>
              {loadingConvs && <Loader2 size={24} className="animate-spin text-[var(--text-accent)]" />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MessagingPage;
