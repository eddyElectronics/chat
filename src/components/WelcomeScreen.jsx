import React from 'react';
import { MessageSquarePlus, Zap, Code, Lightbulb, FileText } from 'lucide-react';
import useChatStore from '../store/chatStore';

const WelcomeScreen = () => {
  const { createNewChat } = useChatStore();

  const suggestions = [
    {
      icon: Code,
      title: 'Write code',
      description: 'Help me build a React component',
      prompt: 'Help me create a React component for a todo list with add, delete, and mark complete functionality',
    },
    {
      icon: Lightbulb,
      title: 'Get ideas',
      description: 'Brainstorm creative solutions',
      prompt: 'Give me 5 innovative ideas for a mobile app that helps people reduce food waste',
    },
    {
      icon: FileText,
      title: 'Summarize text',
      description: 'Condense long documents',
      prompt: 'Can you help me summarize long articles and extract key points?',
    },
    {
      icon: Zap,
      title: 'Solve problems',
      description: 'Debug code or fix issues',
      prompt: 'I have a bug in my JavaScript code where the async function is not working properly. Can you help?',
    },
  ];

  const handleSuggestionClick = (prompt) => {
    const chatId = createNewChat();
    // In a real app, you would trigger sending this message
    console.log('Starting chat with prompt:', prompt);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-accent to-primary-blue rounded-3xl mb-6 shadow-2xl shadow-primary-accent/30">
            <MessageSquarePlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-lg text-white mb-3">
            Welcome to ChatAI
          </h1>
          <p className="text-body-lg text-gray-400">
            How can I help you today?
          </p>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.prompt)}
              className="group glass-effect border border-gray-700/30 rounded-2xl p-6 text-left transition-all hover:border-primary-accent/50 hover:shadow-glass hover:scale-105 active:scale-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-accent/20 to-primary-blue/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary-accent/30 group-hover:to-primary-blue/30 transition-colors">
                  <suggestion.icon className="w-5 h-5 text-primary-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1 group-hover:text-primary-accent transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-accent"></div>
            <span>Real-time responses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-blue"></div>
            <span>Code assistance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>Multi-language support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
