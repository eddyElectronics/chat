# ChatAI - Modern Chat Interface

A sleek, modern chat application inspired by ChatGPT's interface, built with React and Tailwind CSS. Features a beautiful dark theme, glassmorphism effects, and smooth animations.

![ChatAI Preview](https://img.shields.io/badge/React-18.2-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## ✨ Features

### UI/UX

- 🎨 **Modern Dark Theme** - Beautiful #0F0F23 background with subtle gradients
- 💎 **Glassmorphism Effects** - Frosted glass chat bubbles with backdrop blur
- ✨ **Smooth Animations** - Fade-in messages, typing indicators, and hover effects
- 📱 **Fully Responsive** - Works seamlessly on mobile (iPhone 14) and desktop
- 🎯 **ChatGPT-Inspired Design** - Professional polish matching official ChatGPT app

### Functionality

- 💬 **Real-time Chat** - Simulated streaming responses with typing indicators
- 📝 **Markdown Support** - Render formatted text, code blocks, lists, and more
- 🎨 **Syntax Highlighting** - Beautiful code syntax highlighting with copy buttons
- 💾 **Persistent Storage** - Chat history saved to localStorage
- 🔍 **Search Chats** - Quick search through chat history
- 📌 **Pin Conversations** - Keep important chats at the top
- ✏️ **Edit & Delete** - Manage messages and conversations
- 🎤 **Voice Input** - Voice recording interface (UI ready)
- 📎 **File Upload** - Attachment support (UI ready)
- 😊 **Emoji Picker** - Add emojis to messages (UI ready)

### Desktop Features

- 📂 **Collapsible Sidebar** - Chat history with search and organization
- 🖱️ **Hover Actions** - Copy, regenerate, and delete message options
- ⌨️ **Keyboard Shortcuts** - Enter to send, Shift+Enter for new line

### Mobile Features

- 👆 **Touch Optimized** - Swipe gestures and touch-friendly buttons
- 📱 **Responsive Layout** - Optimized for iPhone 14 and other mobile devices
- 🎯 **Mobile-First** - Hamburger menu, collapsible sidebar

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Dependencies**

```bash
npm install
```

2. **Start Development Server**

```bash
npm run dev
```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
chat/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation bar
│   │   ├── Sidebar.jsx         # Chat history sidebar
│   │   ├── ChatArea.jsx        # Main message container
│   │   ├── Message.jsx         # Individual message bubble
│   │   ├── TypingIndicator.jsx # AI typing animation
│   │   ├── InputBar.jsx        # Message input with actions
│   │   └── WelcomeScreen.jsx   # Initial landing page
│   ├── store/
│   │   └── chatStore.js        # Zustand state management
│   ├── utils/
│   │   └── api.js              # API simulation & helpers
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies
```

## 🎨 Design System

### Colors

```css
Primary Background: #0F0F23
Surface: #202123
Surface Light: #343541
Accent Green: #10A37F
Accent Blue: #3099FF
```

### Typography

- **Font Family**: Inter, SF Pro Display
- **Headings**: 24-32px, Bold (700)
- **Body Text**: 14-16px, Regular (400)

### Components

- **Message Bubbles**: Rounded corners (16px), subtle shadows
- **Glass Effects**: backdrop-blur(10px), semi-transparent backgrounds
- **Animations**: 0.3s ease transitions, fade-in effects

## 🔧 Configuration

### State Management

Uses Zustand for lightweight state management with localStorage persistence.

### Styling

Tailwind CSS with custom configuration for colors, animations, and utilities.

### Icons

Lucide React for consistent, customizable icons.

## 🚀 Advanced Features (Implementation Ready)

### 1. Real AI Integration

Replace the simulated API with actual AI:

```javascript
// In src/utils/api.js
export const getAIResponse = async (messages) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages,
      stream: true,
    }),
  });
  return response;
};
```

### 2. Message Streaming

Implement real-time streaming:

```javascript
// WebSocket streaming
const ws = new WebSocket("wss://your-backend.com/chat");
ws.onmessage = (event) => {
  const chunk = JSON.parse(event.data);
  updateMessageContent(chunk);
};
```

### 3. Authentication

Add user authentication:

- Multi-factor authentication (MFA)
- Session management
- User profiles
- Chat sharing permissions

### 4. File Upload

Enable file attachments:

- PDF document analysis
- Image understanding
- Code file review
- Context from documents

### 5. Voice Input

Integrate speech recognition:

- Web Speech API
- Real-time transcription
- Voice commands

### 6. Advanced Features

- Slash commands (/search, /summarize)
- Context memory toggle
- Export conversations
- Dark/light theme toggle
- Custom AI personalities
- Rate limiting & usage tracking

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (iPhone 14: 390x844)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Environment Variables

Create a `.env` file for API keys:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_BACKEND_URL=https://your-backend.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Design inspired by OpenAI's ChatGPT
- Icons by Lucide
- Syntax highlighting by Prism
- Animation by Framer Motion

## 📧 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Contact: your-email@example.com

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**
