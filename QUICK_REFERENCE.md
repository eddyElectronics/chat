# 🚀 ChatAI - Quick Reference Card

## URLs & Access

**Development Server:** http://localhost:3000
**Status:** ✅ Running

---

## 📂 File Structure (Quick Navigation)

```
chat/
├── 📄 README.md              ← Start here
├── 📄 PROJECT_SUMMARY.md     ← What's been built
├── 📄 SETUP.md               ← Installation guide
├── 📄 API_GUIDE.md           ← Connect AI providers
├── 📄 DEPLOYMENT.md          ← Go to production
├── 📄 DESIGN_SPECS.md        ← UI specifications
├── 📄 VISUAL_REFERENCE.md    ← Component details
├── 📄 ROADMAP.md             ← Future features
│
├── src/
│   ├── components/           ← React components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ChatArea.jsx
│   │   ├── Message.jsx
│   │   ├── TypingIndicator.jsx
│   │   ├── InputBar.jsx
│   │   └── WelcomeScreen.jsx
│   ├── store/
│   │   └── chatStore.js      ← State management
│   ├── utils/
│   │   └── api.js            ← API functions
│   ├── App.jsx               ← Main app
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Global styles
│
├── package.json              ← Dependencies
├── vite.config.js           ← Build config
├── tailwind.config.js       ← Styling config
└── .env.example             ← Environment template
```

---

## ⚡ Common Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build           # Create production build
npm run preview         # Preview production build

# Deployment
vercel --prod           # Deploy to Vercel
netlify deploy --prod   # Deploy to Netlify

# Utilities
npm install             # Install dependencies
npm audit fix           # Fix security issues
```

---

## 🎨 Key Files to Edit

### Change Colors
📁 `tailwind.config.js` → `theme.extend.colors`

### Change Fonts
📁 `index.html` → Google Fonts link
📁 `tailwind.config.js` → `theme.extend.fontFamily`

### Add New Component
📁 `src/components/YourComponent.jsx` → Create file
📁 `src/App.jsx` → Import and use

### Modify State
📁 `src/store/chatStore.js` → Add state/actions

### Change AI Logic
📁 `src/utils/api.js` → Update functions

---

## 🔧 Quick Customizations

### 1. Change App Name
```javascript
// index.html
<title>Your App Name</title>

// src/components/Header.jsx
<h1>Your App Name</h1>
```

### 2. Change Primary Color
```javascript
// tailwind.config.js
colors: {
  primary: {
    accent: '#YOUR_COLOR', // Change green
    blue: '#YOUR_BLUE',    // Change blue
  }
}
```

### 3. Change Message Style
```javascript
// src/components/Message.jsx
// Edit className strings in bubble divs
```

### 4. Add New Feature
```javascript
// src/store/chatStore.js
myFeature: false,
toggleMyFeature: () => set((state) => ({
  myFeature: !state.myFeature
})),

// Then use in any component:
const { myFeature, toggleMyFeature } = useChatStore();
```

---

## 🤖 AI Integration (Quick)

### OpenAI Setup (5 minutes)

1. **Get API Key**
   - Visit https://platform.openai.com/api-keys
   - Create new key
   - Copy key

2. **Add to .env**
   ```env
   VITE_OPENAI_API_KEY=sk-proj-xxxxx
   ```

3. **Update api.js**
   ```javascript
   // src/utils/api.js
   export const getAIResponse = async (messages) => {
     const response = await fetch('https://api.openai.com/v1/chat/completions', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
       },
       body: JSON.stringify({
         model: 'gpt-4',
         messages: messages,
       }),
     });
     const data = await response.json();
     return data.choices[0].message.content;
   };
   ```

4. **Use in InputBar.jsx**
   ```javascript
   // Replace simulateAIResponse with getAIResponse
   import { getAIResponse } from '../utils/api';
   const response = await getAIResponse(allMessages);
   ```

5. **Restart server**
   ```bash
   # Press Ctrl+C in terminal
   npm run dev
   ```

---

## 🚀 Deploy (Quick)

### Vercel (Fastest - 2 minutes)

```bash
# Install CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables in dashboard
# Settings → Environment Variables
# Add: VITE_OPENAI_API_KEY
```

### Netlify (Alternative)

```bash
# Install CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Add environment variables
netlify env:set VITE_OPENAI_API_KEY "your-key"
```

---

## 🐛 Troubleshooting

### App Not Loading
```bash
# Clear cache and restart
npm run dev
# Force refresh browser (Ctrl+Shift+R)
```

### Styles Not Working
```bash
# Check Tailwind is running
# Should see PostCSS warnings in terminal
# Restart if needed
```

### API Not Working
```bash
# Check .env file exists
# Check API key is correct
# Check no extra spaces in .env
# Restart dev server after .env changes
```

### Build Errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3001

# Or kill existing process
npx kill-port 3000
```

---

## 📋 Component State Reference

### useChatStore() Returns:

```javascript
const {
  // State
  chats,              // Array of all chats
  currentChatId,      // Active chat ID
  isTyping,          // Boolean: AI is typing
  sidebarOpen,       // Boolean: sidebar visible
  
  // Actions
  createNewChat,     // Create new chat
  setCurrentChat,    // Switch chat
  addMessage,        // Add message to chat
  updateMessage,     // Update message content
  deleteMessage,     // Remove message
  deleteChat,        // Remove chat
  togglePinChat,     // Pin/unpin chat
  setIsTyping,       // Set typing state
  toggleSidebar,     // Show/hide sidebar
  getCurrentChat,    // Get active chat object
} = useChatStore();
```

---

## 🎯 Feature Flags

```javascript
// .env
VITE_ENABLE_STREAMING=true      // Enable message streaming
VITE_ENABLE_VOICE=true          // Enable voice input
VITE_ENABLE_FILE_UPLOAD=true    // Enable file uploads
VITE_MAX_FILE_SIZE=10485760     // 10MB max file size
```

---

## 📊 Performance Tips

### Optimize Build
```javascript
// vite.config.js
build: {
  minify: 'terser',
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
      },
    },
  },
}
```

### Lazy Load Components
```javascript
import { lazy } from 'react';
const Message = lazy(() => import('./components/Message'));
```

### Memoize Expensive Renders
```javascript
import { memo } from 'react';
export default memo(Message);
```

---

## 🔐 Security Checklist

- [ ] Never commit .env file
- [ ] Use backend for API keys (not frontend)
- [ ] Validate all user input
- [ ] Sanitize HTML/Markdown
- [ ] Rate limit API calls
- [ ] Use HTTPS in production
- [ ] Enable CORS properly
- [ ] Add CSP headers

---

## 📱 Responsive Testing

```bash
# Mobile
# Resize browser to 390px × 844px (iPhone 14)

# Tablet
# Resize to 768px × 1024px

# Desktop
# Use full screen

# Or use browser DevTools (F12 → Toggle device toolbar)
```

---

## 🎨 Color Codes (Copy-Paste)

```
Background:      #0F0F23
Surface:         #202123
Surface Light:   #343541
Green Accent:    #10A37F
Blue Accent:     #3099FF
Text Primary:    #FFFFFF
Text Secondary:  #E5E5E5
Text Muted:      #B4B4B4
Border:          rgba(255,255,255,0.1)
```

---

## 📚 Documentation Links

| Topic | File |
|-------|------|
| Getting Started | README.md |
| Installation | SETUP.md |
| AI Integration | API_GUIDE.md |
| UI Design | DESIGN_SPECS.md |
| Visual Guide | VISUAL_REFERENCE.md |
| Deployment | DEPLOYMENT.md |
| Future Plans | ROADMAP.md |
| Project Summary | PROJECT_SUMMARY.md |

---

## 🆘 Need Help?

1. **Check Documentation** - README.md → SETUP.md → API_GUIDE.md
2. **Common Issues** - See Troubleshooting section above
3. **Code Examples** - Check API_GUIDE.md for integration samples
4. **Community** - Open GitHub issue or discussion

---

## ✅ Quick Test Checklist

- [ ] App loads at http://localhost:3000
- [ ] Can create new chat
- [ ] Can send messages
- [ ] See typing indicator
- [ ] Messages appear with animations
- [ ] Sidebar opens/closes
- [ ] Search works in sidebar
- [ ] Can delete messages
- [ ] Can delete chats
- [ ] Code blocks render correctly
- [ ] Markdown formats properly
- [ ] Mobile view works (resize browser)
- [ ] Input grows with text
- [ ] Send button disabled when empty

---

## 🎯 Next Actions

### Immediate (Now)
1. ✅ Open http://localhost:3000
2. ✅ Test the interface
3. ✅ Create a chat
4. ✅ Send messages

### Today
1. [ ] Connect OpenAI API (API_GUIDE.md)
2. [ ] Customize colors (tailwind.config.js)
3. [ ] Deploy to Vercel (DEPLOYMENT.md)

### This Week
1. [ ] Add authentication
2. [ ] Enable file uploads
3. [ ] Add voice input
4. [ ] Share with friends

---

## 💾 Backup & Export

```bash
# Backup localStorage data
# In browser console:
localStorage.getItem('chatai-storage')

# Export as JSON
const data = localStorage.getItem('chatai-storage');
const blob = new Blob([data], { type: 'application/json' });
const url = URL.createObjectURL(blob);
// Right-click → Save as
```

---

## 🎉 You're Ready!

**Everything is set up and running!**

The app is live at: http://localhost:3000

Check PROJECT_SUMMARY.md for complete feature list.
Check ROADMAP.md for future enhancements.

**Happy coding! 🚀**

---

*Quick Reference v1.0 - Last Updated: December 15, 2025*
