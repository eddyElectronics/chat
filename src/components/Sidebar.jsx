import React, { useState } from "react";
import {
  X,
  Search,
  Pin,
  Trash2,
  Edit2,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import useChatStore from "../store/chatStore";
import { format } from "date-fns";

const Sidebar = ({ isMobile }) => {
  const {
    chats,
    currentChatId,
    setCurrentChat,
    deleteChat,
    togglePinChat,
    sidebarOpen,
    toggleSidebar,
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredChats.filter((chat) => chat.pinned);
  const regularChats = filteredChats.filter((chat) => !chat.pinned);

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? "fixed left-0 top-14 bottom-0 z-50" : "relative"}
          w-[260px] border-r border-gray-700/50 dark:border-gray-700/50 light:border-gray-400 
          bg-primary-surface dark:bg-primary-surface light:bg-white
          flex flex-col transition-transform duration-300
          ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        {/* Search */}
        <div className="p-3 border-b border-gray-700/50 dark:border-gray-700/50 light:border-gray-300 shadow-sm light:shadow-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400 light:text-gray-700" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-primary-bg dark:bg-primary-bg light:bg-gray-50 border border-gray-700 dark:border-gray-700 light:border-gray-400 rounded-lg pl-10 pr-3 py-2 text-sm text-white dark:text-white light:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 light:placeholder-gray-500 focus:outline-none focus:border-primary-accent light:focus:border-blue-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
          {pinnedChats.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-400 light:text-gray-600 px-2 mb-2 flex items-center gap-1">
                <Pin className="w-3 h-3" />
                Pinned
              </h3>
              {pinnedChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onSelect={() => {
                    setCurrentChat(chat.id);
                    if (isMobile) toggleSidebar();
                  }}
                  onDelete={() => deleteChat(chat.id)}
                  onTogglePin={() => togglePinChat(chat.id)}
                  editingId={editingId}
                  setEditingId={setEditingId}
                />
              ))}
            </div>
          )}

          {regularChats.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-400 light:text-gray-600 px-2 mb-2">
                Recent
              </h3>
              {regularChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onSelect={() => {
                    setCurrentChat(chat.id);
                    if (isMobile) toggleSidebar();
                  }}
                  onDelete={() => deleteChat(chat.id)}
                  onTogglePin={() => togglePinChat(chat.id)}
                  editingId={editingId}
                  setEditingId={setEditingId}
                />
              ))}
            </div>
          )}

          {filteredChats.length === 0 && (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <MessageSquare className="w-8 h-8 mb-2" />
              <p className="text-sm">No chats yet</p>
            </div>
          )}
        </div>

        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-2 right-2 p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </aside>
    </>
  );
};

const ChatItem = ({
  chat,
  isActive,
  onSelect,
  onDelete,
  onTogglePin,
  editingId,
  setEditingId,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`
        group relative mb-1 rounded-lg transition-all
        ${
          isActive
            ? "bg-primary-accent/10 border border-primary-accent/30 light:bg-blue-50 light:border-blue-300"
            : "hover:bg-gray-700/30 light:hover:bg-gray-100"
        }
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button
        onClick={onSelect}
        className="w-full text-left px-3 py-2.5 flex items-start gap-2"
      >
        <MessageSquare
          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
            isActive ? "text-primary-accent" : "text-gray-400"
          }`}
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${
              isActive
                ? "text-white dark:text-white light:text-blue-700"
                : "text-gray-300 light:text-gray-700"
            }`}
          >
            {chat.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600 mt-0.5">
            {chat.messages.length} messages ·{" "}
            {format(new Date(chat.createdAt), "MMM d")}
          </p>
        </div>
      </button>

      {/* Actions */}
      {showActions && (
        <div className="absolute right-2 top-2 flex gap-1 bg-primary-surface dark:bg-primary-surface light:bg-white rounded-md shadow-lg light:shadow-gray-300 light:border light:border-gray-200 p-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
            className="p-1.5 hover:bg-gray-700/50 rounded"
            title={chat.pinned ? "Unpin" : "Pin"}
          >
            <Pin
              className={`w-3.5 h-3.5 ${
                chat.pinned
                  ? "text-primary-accent fill-current"
                  : "text-gray-400"
              }`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 hover:bg-red-500/20 rounded"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
