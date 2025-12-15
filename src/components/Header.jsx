import React from 'react';
import { Menu, Plus, Search, Settings, Sun, Moon } from 'lucide-react';
import useChatStore from '../store/chatStore';

const Header = ({ isMobile }) => {
  const { toggleSidebar, createNewChat, theme, toggleTheme, sidebarOpen } = useChatStore();

  return (
    <header className="h-14 border-b border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 flex items-center justify-between px-4 bg-primary-surface dark:bg-primary-surface light:bg-white backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-white dark:text-white light:text-gray-900" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-accent to-primary-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="text-white dark:text-white light:text-gray-900 font-bold text-xl tracking-tight">ChatAI</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-300 dark:text-gray-300 light:text-gray-700" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 light:text-gray-700" />
          )}
        </button>
        
        <button
          className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors hidden md:block"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-gray-300" />
        </button>
        
        <button
          onClick={createNewChat}
          className="flex items-center gap-2 px-3 py-2 bg-primary-blue hover:bg-primary-blueHover rounded-lg transition-all hover:scale-105 active:scale-95 shadow-sm"
          aria-label="New chat"
        >
          <Plus className="w-5 h-5 text-white" />
          {!isMobile && <span className="text-white text-sm font-medium">New Chat</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
