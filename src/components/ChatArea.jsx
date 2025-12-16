import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useChatStore from "../store/chatStore";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

const ChatArea = () => {
  const {
    getCurrentChat,
    isTyping,
    setEditingMessage,
    deleteMessagesFrom,
    currentChatId,
  } = useChatStore();
  const messagesEndRef = useRef(null);
  const currentChat = getCurrentChat();

  const handleEditMessage = (message) => {
    if (currentChatId) {
      // Delete this message and all messages after it
      deleteMessagesFrom(currentChatId, message.id);
      // Set the message to be edited in InputBar
      setEditingMessage(message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isTyping]);

  if (!currentChat) return null;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin bg-primary-bg dark:bg-primary-bg light:bg-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="popLayout">
          {currentChat.messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              index={index}
              onEdit={handleEditMessage}
            />
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
