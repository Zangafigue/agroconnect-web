import api from '../api/axios';

// ====================================================================
// MESSAGE SERVICE
// BACKEND ROUTES NEEDED:
//   GET    /api/conversations           → list all conversations for the current user
//   POST   /api/conversations           → create a new conversation
//   GET    /api/conversations/:id/messages → fetch messages in a conversation
//   POST   /api/conversations/:id/messages → send a message
//   PATCH  /api/conversations/:id/read  → mark conversation as read
// ====================================================================

const messageService = {
  /**
   * Get all conversations for the logged-in user.
   * Returns: [{ _id, participants, lastMessage, unreadCount, product?, order?, updatedAt }]
   */
  getConversations: async () => {
    const response = await api.get('/conversations');
    return response.data;
  },

  /**
   * Create a new conversation (e.g. when placing an order or clicking "Contacter").
   * Payload: { recipientId, productId?, orderId?, initialMessage }
   */
  createConversation: async (payload) => {
    const response = await api.post('/conversations', payload);
    return response.data;
  },

  /**
   * Get all messages for a conversation.
   * Returns: [{ _id, sender, content, createdAt, read }]
   */
  getMessages: async (conversationId) => {
    const response = await api.get(`/conversations/${conversationId}/messages`);
    return response.data;
  },

  /**
   * Send a message in a conversation.
   * Payload: { content }
   */
  sendMessage: async (conversationId, content) => {
    const response = await api.post(`/conversations/${conversationId}/messages`, { content });
    return response.data;
  },

  /**
   * Mark a conversation as read (reset unread count to 0).
   */
  markAsRead: async (conversationId) => {
    const response = await api.patch(`/conversations/${conversationId}/read`);
    return response.data;
  },
};

export default messageService;
