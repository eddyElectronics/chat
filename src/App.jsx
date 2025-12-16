import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import InputBar from "./components/InputBar";
import useChatStore from "./store/chatStore";

function App() {
  const { currentChatId, sidebarOpen, theme, initializeChat } = useChatStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("[App] Theme changed to:", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    console.log(
      "[App] Document classes:",
      document.documentElement.classList.toString()
    );
  }, [theme]);

  // Initialize with a chat on first load
  useEffect(() => {
    initializeChat();
  }, []);

  return (
    <div className="h-full flex flex-col bg-primary-bg dark:bg-primary-bg light:bg-white overflow-hidden">
      <Header isMobile={isMobile} />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isMobile={isMobile} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          <ChatArea />
          <InputBar />
        </div>
      </div>
    </div>
  );
}

export default App;
