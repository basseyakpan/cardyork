import { ref, get, set, push, update, onValue } from 'firebase/database';
import { database, auth, signInAnonymously } from './firebase';

export interface SupportMessageM {
  messageId: string;
  senderId: string;
  senderName: string;
  message: string;
  imageUrl?: string;
  timestamp: number;
  isAdmin: boolean;
  isRead: boolean;
}

export interface SupportChatM {
  chatId: string;
  userId: string;
  userName: string;
  userEmail: string;
  lastMessage: string;
  lastMessageTime: number;
  status: string; // 'open', 'closed'
  unreadAdminCount: number;
  unreadUserCount: number;
  messages?: Record<string, SupportMessageM>;
}

// Helper to ensure authenticated state
async function ensureAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}

export const chatService = {
  // Create or get open chat session
  async createOrGetChatSession(userId: string, userName: string, userEmail: string): Promise<string> {
    console.log('intro createOrGetChatSession', userId);
    try {
      await ensureAuth();
      const chatsRef = ref(database, `support_chats/${userId}`);
      console.log('chatsRef', chatsRef);
      const snapshot = await get(chatsRef);
      console.log('snapshot', snapshot);
      
      if (snapshot.exists()) {
        const chats = snapshot.val() as Record<string, SupportChatM>;

        let openChatId: string | null = null;
        let latestTime = 0;

        for (const [key, value] of Object.entries(chats)) {
          if (value.status === 'open' && (value.lastMessageTime || 0) > latestTime) {
            openChatId = key;
            latestTime = value.lastMessageTime || 0;
          }
        }

        if (openChatId) {
          return openChatId;
        }
      }

      console.log('after snapshot exist', snapshot);
      // Create new chat session
      const newChatRef = push(ref(database, `support_chats/${userId}`));
      const chatId = newChatRef.key;

      if (!chatId) throw new Error("Could not generate chat ID");

      await set(newChatRef, {
        chatId,
        userId,
        userName,
        userEmail,
        status: 'open',
        createdAt: Date.now(),
        lastMessageTime: Date.now(),
        unreadAdminCount: 0,
        unreadUserCount: 0,
      });

      return chatId;
    } catch (e) {
      console.error('Error creating chat session:', e);
      throw e;
    }
  },

  // Send message
  async sendMessage(userId: string, chatId: string, userName: string, message: string, imageUrl?: string, isAdmin: boolean = false): Promise<void> {
    try {
      await ensureAuth();
      const timestamp = Date.now();
      const messagesRef = ref(database, `support_chats/${userId}/${chatId}/messages`);
      const newMessageRef = push(messagesRef);
      const messageId = newMessageRef.key;

      if (!messageId) throw new Error("Could not generate message ID");

      const messageData = {
        messageId,
        senderId: userId,
        senderName: userName,
        message,
        ...(imageUrl && { imageUrl }),
        timestamp,
        isAdmin,
        isRead: false,
      };

      await set(newMessageRef, messageData);

      let lastMessagePreview = message;
      if (imageUrl && !message) {
        lastMessagePreview = '📷 Image';
      } else if (imageUrl) {
        lastMessagePreview = `📷 ${message}`;
      }

      const chatRef = ref(database, `support_chats/${userId}/${chatId}`);
      await update(chatRef, {
        lastMessage: lastMessagePreview,
        lastMessageTime: timestamp,
      });

      // Increment appropriate unread count
      await this.incrementUnreadCount(userId, chatId, !isAdmin);
    } catch (e) {
      console.error('Error sending message:', e);
      throw e;
    }
  },

  // Increment unread count
  async incrementUnreadCount(userId: string, chatId: string, forAdmin: boolean): Promise<void> {
    try {
      await ensureAuth();
      const countField = forAdmin ? 'unreadAdminCount' : 'unreadUserCount';
      const countRef = ref(database, `support_chats/${userId}/${chatId}/${countField}`);
      const snapshot = await get(countRef);
      const currentCount = snapshot.val() || 0;

      const chatRef = ref(database, `support_chats/${userId}/${chatId}`);
      await update(chatRef, { [countField]: currentCount + 1 });
    } catch (e) {
      console.error('Error incrementing unread count:', e);
    }
  },

  // Listen to messages (wraps onValue inside anonymous auth setup)
  listenToMessages(userId: string, chatId: string, callback: (messages: SupportMessageM[]) => void): () => void {
    let unsubscribe: (() => void) | null = null;
    let isCancelled = false;

    const setupListener = () => {
      if (isCancelled) return;
      const messagesRef = ref(database, `support_chats/${userId}/${chatId}/messages`);
      unsubscribe = onValue(messagesRef, (snapshot) => {
        if (!snapshot.exists()) {
          callback([]);
          return;
        }

        const messagesMap = snapshot.val() as Record<string, SupportMessageM>;
        const messages = Object.values(messagesMap).sort((a, b) => a.timestamp - b.timestamp);
        callback(messages);
      });
    };

    if (!auth.currentUser) {
      signInAnonymously(auth)
        .then(() => setupListener())
        .catch(err => console.error("Firebase auth error in listenToMessages:", err));
    } else {
      setupListener();
    }

    return () => {
      isCancelled = true;
      if (unsubscribe) unsubscribe();
    };
  },

  // Mark messages as read
  async markMessagesAsRead(userId: string, chatId: string, isAdmin: boolean): Promise<void> {
    try {
      await ensureAuth();
      const messagesRef = ref(database, `support_chats/${userId}/${chatId}/messages`);
      const snapshot = await get(messagesRef);

      if (snapshot.exists()) {
        const messagesMap = snapshot.val() as Record<string, SupportMessageM>;

        for (const [key, message] of Object.entries(messagesMap)) {
          // If we are user (isAdmin = false), mark messages from admin (message.isAdmin = true) as read
          if (message.isAdmin !== isAdmin && !message.isRead) {
            const messageRef = ref(database, `support_chats/${userId}/${chatId}/messages/${key}`);
            await update(messageRef, { isRead: true });
          }
        }
      }

      // Reset appropriate unread count
      const countField = isAdmin ? 'unreadAdminCount' : 'unreadUserCount';
      const chatRef = ref(database, `support_chats/${userId}/${chatId}`);
      await update(chatRef, { [countField]: 0 });
    } catch (e) {
      console.error('Error marking messages as read:', e);
    }
  },

  // Listen to unread user count (wraps onValue inside anonymous auth setup)
  listenToUnreadCount(userId: string, callback: (count: number) => void): () => void {
    let unsubscribe: (() => void) | null = null;
    let isCancelled = false;

    const setupListener = () => {
      if (isCancelled) return;
      const chatsRef = ref(database, `support_chats/${userId}`);
      unsubscribe = onValue(chatsRef, (snapshot) => {
        if (!snapshot.exists()) {
          callback(0);
          return;
        }

        const chats = snapshot.val() as Record<string, SupportChatM>;
        let totalUnread = 0;
        for (const chat of Object.values(chats)) {
          totalUnread += chat.unreadUserCount || 0;
        }
        callback(totalUnread);
      });
    };

    if (!auth.currentUser) {
      signInAnonymously(auth)
        .then(() => setupListener())
        .catch(err => console.error("Firebase auth error in listenToUnreadCount:", err));
    } else {
      setupListener();
    }

    return () => {
      isCancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }
};
