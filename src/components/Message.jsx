import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCw, Trash2, User, Bot } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import useChatStore from "../store/chatStore";

const Message = ({ message, index }) => {
  const [copied, setCopied] = useState(false);
  const { currentChatId, deleteMessage, fontSize } = useChatStore();
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (currentChatId) {
      deleteMessage(currentChatId, message.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"} group`}
    >
      <div
        className={`flex gap-3 max-w-[85%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            ${
              isUser
                ? "bg-gradient-to-br from-primary-accent to-emerald-600 shadow-lg shadow-primary-accent/20"
                : "bg-gradient-to-br from-primary-blue to-blue-600 shadow-lg shadow-primary-blue/20"
            }
          `}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div
            className={`
              rounded-2xl px-4 py-3 shadow-message
              ${
                isUser
                  ? "bg-gradient-to-br from-primary-accent to-primary-accentHover text-white rounded-tr-sm"
                  : "glass-effect text-gray-100 rounded-tl-sm border border-gray-700/30"
              }
            `}
          >
            {isUser ? (
              <p
                className="whitespace-pre-wrap break-words"
                style={{ fontSize: `${fontSize}px` }}
              >
                {message.content}
              </p>
            ) : (
              <div
                className="markdown-content prose prose-invert max-w-none"
                style={{ fontSize: `${fontSize}px` }}
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg my-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-primary-accent"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    p({ children }) {
                      return <p className="mb-2 last:mb-0">{children}</p>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>;
                    },
                    li({ children }) {
                      return <li className="text-gray-100">{children}</li>;
                    },
                    h1({ children }) {
                      return <h1 className="text-2xl font-bold mb-3 mt-4 text-white">{children}</h1>;
                    },
                    h2({ children }) {
                      return <h2 className="text-xl font-bold mb-2 mt-3 text-white">{children}</h2>;
                    },
                    h3({ children }) {
                      return <h3 className="text-lg font-semibold mb-2 mt-2 text-white">{children}</h3>;
                    },
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-4 border-primary-accent pl-4 italic my-2 text-gray-300">
                          {children}
                        </blockquote>
                      );
                    },
                    a({ href, children }) {
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-accent hover:text-primary-accentHover underline"
                        >
                          {children}
                        </a>
                      );
                    },
                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-2">
                          <table className="min-w-full border border-gray-700">{children}</table>
                        </div>
                      );
                    },
                    thead({ children }) {
                      return <thead className="bg-gray-800">{children}</thead>;
                    },
                    tbody({ children }) {
                      return <tbody className="divide-y divide-gray-700">{children}</tbody>;
                    },
                    tr({ children }) {
                      return <tr>{children}</tr>;
                    },
                    th({ children }) {
                      return (
                        <th className="px-4 py-2 text-left text-white font-semibold border border-gray-700">
                          {children}
                        </th>
                      );
                    },
                    td({ children }) {
                      return <td className="px-4 py-2 border border-gray-700">{children}</td>;
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Message Footer */}
          <div
            className={`flex items-center gap-2 mt-1.5 px-1 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs text-gray-500">
              {format(new Date(message.timestamp || Date.now()), "h:mm a")}
            </span>

            {/* Actions */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-gray-700/50 rounded transition-colors"
                title="Copy"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-primary-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>

              {!isUser && (
                <button
                  className="p-1.5 hover:bg-gray-700/50 rounded transition-colors"
                  title="Regenerate"
                >
                  <RotateCw className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}

              <button
                onClick={handleDelete}
                className="p-1.5 hover:bg-red-500/20 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
