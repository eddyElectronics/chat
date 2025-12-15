import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex justify-start"
    >
      <div className="flex gap-3 max-w-[85%]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-blue to-blue-600 shadow-lg shadow-primary-blue/20 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>

        {/* Typing Animation */}
        <div className="glass-effect rounded-2xl rounded-tl-sm px-5 py-4 border border-gray-700/30">
          <div className="flex gap-1.5">
            <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
