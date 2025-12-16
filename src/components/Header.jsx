import React from "react";
import { Menu, Plus, Search, Settings, Sun, Moon, Type } from "lucide-react";
import useChatStore from "../store/chatStore";

const Header = ({ isMobile }) => {
  const {
    toggleSidebar,
    createNewChat,
    theme,
    toggleTheme,
  } = useChatStore();

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
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-white">
            <img
              src="https://companieslogo.com/img/orig/AOT.BK-93f4b6c9.png?download=true"
              alt="BotFahsai Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-white dark:text-white light:text-gray-900 font-bold text-xl tracking-tight">
            BotFahsai
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-gray-300 dark:text-gray-300 light:text-gray-700" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 light:text-gray-700" />
          )}
        </button>

        <button
          onClick={createNewChat}
          className="flex items-center gap-2 px-3 py-2 bg-primary-blue hover:bg-primary-blueHover rounded-lg transition-all hover:scale-105 active:scale-95 shadow-sm"
          aria-label="New chat"
        >
          <Plus className="w-5 h-5 text-white" />
          {!isMobile && (
            <span className="text-white text-sm font-medium">New Chat</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
