import React from "react";
import { Menu, Plus, Search, Settings, Sun, Moon, Type } from "lucide-react";
import useChatStore from "../store/chatStore";

const Header = ({ isMobile }) => {
  const {
    toggleSidebar,
    createNewChat,
    theme,
    toggleTheme,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
  } = useChatStore();

  return (
    <header className="h-14 border-b border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 flex items-center justify-between px-2 sm:px-4 bg-primary-surface dark:bg-primary-surface light:bg-white backdrop-blur-md">
      <div className="flex items-center gap-1.5 sm:gap-3">
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
          <h1 className="hidden sm:block text-white dark:text-white light:text-gray-900 font-bold text-xl tracking-tight">
            BotFahsai
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-200 rounded-lg transition-colors"
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
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary-blue hover:bg-primary-blueHover rounded-lg transition-all hover:scale-105 active:scale-95 shadow-sm"
          aria-label="New chat"
        >
          <Plus className="w-5 h-5 text-white" />
          {!isMobile && (
            <span className="text-white text-sm font-medium">New Chat</span>
          )}
        </button>

        {/* Font Size Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-700/30 dark:bg-gray-700/30 light:bg-gray-200 rounded-lg">
          <button
            onClick={decreaseFontSize}
            className="p-1 sm:p-1.5 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-300 rounded transition-colors"
            aria-label="Decrease font size"
            title="Decrease font size"
          >
            <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-base sm:text-lg font-bold">
              A-
            </span>
          </button>
          <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 px-1">
            {fontSize}px
          </span>
          <button
            onClick={increaseFontSize}
            className="p-1 sm:p-1.5 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-300 rounded transition-colors"
            aria-label="Increase font size"
            title="Increase font size"
          >
            <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-base sm:text-lg font-bold">
              A+
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
