# ChatAI - Setup Guide

## Complete Installation & Deployment Guide

### Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Environment Configuration](#environment-configuration)
3. [Real AI Integration](#real-ai-integration)
4. [Backend Setup](#backend-setup)
5. [Deployment Options](#deployment-options)
6. [Advanced Features](#advanced-features)

---

## Local Development Setup

### Step 1: Clone and Install

```bash
# Navigate to project directory
cd e:\SourceControl\chat

# Install all dependencies
npm install

# Start development server
npm run dev
```

Your app will be available at `http://localhost:3000`

### Step 2: Verify Installation

Open your browser and check:

- ✅ Welcome screen loads
- ✅ Can create new chat
- ✅ Sidebar opens/closes
- ✅ Messages send and receive simulated responses
- ✅ Code blocks render with syntax highlighting

---

## Environment Configuration

### Create `.env` File

```bash
# Copy the example file
copy .env.example .env
```

### Add Your API Keys

```env
# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
VITE_OPENAI_MODEL=gpt-4
VITE_OPENAI_BASE_URL=https://api.openai.com/v1

# Alternative: Anthropic Claude
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# Backend Configuration (if using custom backend)
VITE_BACKEND_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/chat

# Features
VITE_ENABLE_STREAMING=true
VITE_ENABLE_VOICE=true
VITE_ENABLE_FILE_UPLOAD=true
VITE_MAX_FILE_SIZE=10485760
```

---

## Real AI Integration

### Option 1: OpenAI GPT-4

**Update `src/utils/api.js`:**

```javascript
export const getAIResponse = async (messages) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
```

**Update `src/components/InputBar.jsx`:**

```javascript
import { getAIResponse } from "../utils/api";

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!input.trim() || !currentChatId) return;

  const currentChat = getCurrentChat();
  const userMessage = {
    role: "user",
    content: input.trim(),
    timestamp: new Date().toISOString(),
  };

  addMessage(currentChatId, userMessage);
  setInput("");
  setIsTyping(true);

  try {
    const allMessages = [...currentChat.messages, userMessage];
    const response = await getAIResponse(allMessages);

    const aiMessage = {
      role: "assistant",
      content: response,
      timestamp: new Date().toISOString(),
    };
    addMessage(currentChatId, aiMessage);
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = {
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again.",
      timestamp: new Date().toISOString(),
    };
    addMessage(currentChatId, errorMessage);
  } finally {
    setIsTyping(false);
  }
};
```

### Option 2: Streaming Responses

**Create streaming function:**

```javascript
export const streamAIResponse = async (messages, onChunk, onComplete) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages,
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      onComplete();
      break;
    }

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((line) => line.trim());

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0]?.delta?.content;
          if (content) {
            onChunk(content);
          }
        } catch (e) {
          console.error("Parse error:", e);
        }
      }
    }
  }
};
```

---

## Backend Setup

### Node.js + Express Backend

**Create `backend/server.js`:**

```javascript
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      stream: true,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
```

**Start backend:**

```bash
cd backend
npm install express cors openai
node server.js
```

---

## Deployment Options

### 1. Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**vercel.json:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

**netlify.toml:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Docker

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build and run:**

```bash
docker build -t chatai .
docker run -p 3000:3000 chatai
```

### 4. AWS Amplify

1. Push code to GitHub
2. Go to AWS Amplify Console
3. Connect repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

---

## Advanced Features

### 1. File Upload

**Update `src/components/InputBar.jsx`:**

```javascript
const [files, setFiles] = useState([]);
const fileInputRef = useRef(null);

const handleFileSelect = (e) => {
  const selectedFiles = Array.from(e.target.files);
  setFiles((prev) => [...prev, ...selectedFiles]);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (files.length > 0) {
    // Process files
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("message", input);

    const response = await fetch("/api/chat/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    // Handle response
  }
};
```

### 2. Voice Input

**Add Web Speech API:**

```javascript
const [isRecording, setIsRecording] = useState(false);
const recognitionRef = useRef(null);

useEffect(() => {
  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setInput(transcript);
    };

    recognitionRef.current = recognition;
  }
}, []);

const toggleRecording = () => {
  if (isRecording) {
    recognitionRef.current?.stop();
  } else {
    recognitionRef.current?.start();
  }
  setIsRecording(!isRecording);
};
```

### 3. Authentication

**Add Firebase Auth:**

```bash
npm install firebase
```

```javascript
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};
```

---

## Performance Optimization

### 1. Code Splitting

```javascript
// Lazy load components
const Message = lazy(() => import("./components/Message"));
const Sidebar = lazy(() => import("./components/Sidebar"));
```

### 2. Virtual Scrolling

```bash
npm install react-window
```

```javascript
import { FixedSizeList } from "react-window";

<FixedSizeList height={600} itemCount={messages.length} itemSize={100}>
  {({ index, style }) => (
    <div style={style}>
      <Message message={messages[index]} />
    </div>
  )}
</FixedSizeList>;
```

### 3. Message Caching

```javascript
// In chatStore.js
const cache = new Map();

const getCachedResponse = (messageHash) => {
  return cache.get(messageHash);
};

const setCachedResponse = (messageHash, response) => {
  cache.set(messageHash, response);
};
```

---

## Troubleshooting

### Common Issues

**1. API Key Not Working**

- Verify key is in `.env` file
- Restart dev server after adding env vars
- Check API key has proper permissions

**2. CORS Errors**

- Use proxy in vite.config.js
- Or set up proper CORS on backend

**3. Build Errors**

- Clear node_modules and reinstall
- Check Node.js version (18+)
- Verify all dependencies installed

---

## Support & Resources

- 📚 [React Documentation](https://react.dev)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com)
- 🤖 [OpenAI API Docs](https://platform.openai.com/docs)
- 💬 [Zustand State Management](https://zustand-demo.pmnd.rs)

---

**Happy Coding! 🚀**
