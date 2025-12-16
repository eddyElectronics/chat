import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import useChatStore from "../store/chatStore";
import { sendChatMessage } from "../utils/api";

const InputBar = () => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const { currentChatId, addMessage, setIsTyping } = useChatStore();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !currentChatId) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add user message
    addMessage(currentChatId, userMessage);
    setInput("");

    // Get AI response from API
    setIsTyping(true);

    try {
      const response = await sendChatMessage(userMessage.content);

      const aiMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      addMessage(currentChatId, aiMessage);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 bg-primary-surface dark:bg-primary-surface light:bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="glass-effect dark:glass-effect light:bg-light-surface rounded-2xl border border-gray-700/30 dark:border-gray-700/30 light:border-gray-300 shadow-glass overflow-hidden">
          <div className="flex items-end gap-2 p-3">
            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message BotFahsai..."
              rows={1}
              className="flex-1 bg-transparent text-white dark:text-white light:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 light:placeholder-gray-400 resize-none focus:outline-none text-body-lg py-2 max-h-[120px] scrollbar-thin"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim()}
              className={`
                p-2.5 rounded-lg transition-all flex-shrink-0 self-end
                ${
                  input.trim()
                    ? "bg-primary-blue hover:bg-primary-blueHover hover:scale-110 active:scale-95 shadow-lg shadow-primary-blue/30"
                    : "bg-gray-700 cursor-not-allowed opacity-50"
                }
              `}
              title="Send message"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-500 text-center mt-3">
          BotFahsai can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  );
};

export default InputBar;
