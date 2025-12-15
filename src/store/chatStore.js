import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

const useChatStore = create(
  persist(
    (set, get) => ({
      // State
      chats: [],
      currentChatId: null,
      isTyping: false,
      theme: "dark",
      sidebarOpen: true,
      fontSize: 16,

      // Actions
      createNewChat: () => {
        const newChat = {
          id: nanoid(),
          title: "New Chat",
          messages: [],
          createdAt: new Date().toISOString(),
          pinned: false,
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));
        return newChat.id;
      },

      // Initialize with a chat if none exists
      initializeChat: () => {
        const state = get();
        if (state.chats.length === 0 || !state.currentChatId) {
          return state.createNewChat();
        }
        return state.currentChatId;
      },

      setCurrentChat: (chatId) => {
        set({ currentChatId: chatId });
      },

      addMessage: (chatId, message) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, { ...message, id: nanoid() }],
                  title:
                    chat.messages.length === 0
                      ? message.content.slice(0, 50)
                      : chat.title,
                }
              : chat
          ),
        }));
      },

      updateMessage: (chatId, messageId, updates) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, ...updates } : msg
                  ),
                }
              : chat
          ),
        }));
      },

      deleteMessage: (chatId, messageId) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.filter((msg) => msg.id !== messageId),
                }
              : chat
          ),
        }));
      },

      deleteChat: (chatId) => {
        set((state) => {
          const newChats = state.chats.filter((chat) => chat.id !== chatId);
          const newCurrentId =
            state.currentChatId === chatId
              ? newChats.length > 0
                ? newChats[0].id
                : null
              : state.currentChatId;

          return {
            chats: newChats,
            currentChatId: newCurrentId,
          };
        });
      },

      togglePinChat: (chatId) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
          ),
        }));
      },

      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        }));
      },

      setIsTyping: (isTyping) => {
        set({ isTyping });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      toggleTheme: () => {
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" }));
      },

      increaseFontSize: () => {
        set((state) => ({ fontSize: Math.min(state.fontSize + 2, 24) }));
      },

      decreaseFontSize: () => {
        set((state) => ({ fontSize: Math.max(state.fontSize - 2, 12) }));
      },

      getCurrentChat: () => {
        const state = get();
        return state.chats.find((chat) => chat.id === state.currentChatId);
      },
    }),
    {
      name: "chatai-storage",
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
        theme: state.theme,
        fontSize: state.fontSize,
      }),
    }
  )
);

export default useChatStore;
