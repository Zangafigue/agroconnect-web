import { create } from 'zustand';
import messageService from '../services/messageService';
import toast from 'react-hot-toast';

// Polling interval for new messages (ms)
const POLL_INTERVAL = 5000;

export const useMessageStore = create((set, get) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  loadingConversations: false,
  loadingMessages: false,
  totalUnread: 0,
  pollingTimer: null,

  // ─── Conversations ──────────────────────────────────────────────────────────

  fetchConversations: async () => {
    set({ loadingConversations: true });
    try {
      const data = await messageService.getConversations();
      const conversations = Array.isArray(data) ? data : (data.conversations || []);
      const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
      set({ conversations, totalUnread, loadingConversations: false });
    } catch (err) {
      // If backend route not yet available, silently fail (no toast)
      set({ loadingConversations: false });
    }
  },

  createConversation: async (payload) => {
    try {
      const conversation = await messageService.createConversation(payload);
      set((state) => ({
        conversations: [conversation, ...state.conversations.filter(c => c._id !== conversation._id)]
      }));
      return conversation;
    } catch (err) {
      toast.error('Impossible de créer la conversation.');
      throw err;
    }
  },

  setActiveConversation: async (conversationId) => {
    const { stopPolling, startPolling, fetchMessages } = get();
    stopPolling();
    set({ activeConversationId: conversationId, messages: [] });
    if (conversationId) {
      await fetchMessages(conversationId);
      startPolling(conversationId);
      // Mark as read
      try { await messageService.markAsRead(conversationId); } catch {}
      // Update unread count locally
      set((state) => ({
        conversations: state.conversations.map(c =>
          c._id === conversationId ? { ...c, unreadCount: 0 } : c
        ),
        totalUnread: Math.max(0, state.totalUnread - (
          state.conversations.find(c => c._id === conversationId)?.unreadCount || 0
        ))
      }));
    }
  },

  // ─── Messages ───────────────────────────────────────────────────────────────

  fetchMessages: async (conversationId) => {
    set({ loadingMessages: true });
    try {
      const data = await messageService.getMessages(conversationId);
      const messages = Array.isArray(data) ? data : (data.messages || []);
      set({ messages, loadingMessages: false });
    } catch {
      set({ loadingMessages: false });
    }
  },

  sendMessage: async (content) => {
    const { activeConversationId } = get();
    if (!activeConversationId || !content.trim()) return;
    try {
      const message = await messageService.sendMessage(activeConversationId, content.trim());
      set((state) => ({ messages: [...state.messages, message] }));
      // Update last message preview in conversation list
      set((state) => ({
        conversations: state.conversations.map(c =>
          c._id === activeConversationId
            ? { ...c, lastMessage: { content, createdAt: new Date().toISOString() } }
            : c
        )
      }));
    } catch {
      toast.error("Erreur lors de l'envoi du message.");
    }
  },

  // ─── Polling ────────────────────────────────────────────────────────────────

  startPolling: (conversationId) => {
    const timer = setInterval(() => {
      get().fetchMessages(conversationId);
    }, POLL_INTERVAL);
    set({ pollingTimer: timer });
  },

  stopPolling: () => {
    const { pollingTimer } = get();
    if (pollingTimer) {
      clearInterval(pollingTimer);
      set({ pollingTimer: null });
    }
  },
}));
