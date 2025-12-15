# ChatAI - API Integration Guide

## Quick Start with Different AI Providers

### 1. OpenAI GPT-4 / GPT-3.5

#### Get API Key

1. Visit https://platform.openai.com/api-keys
2. Create new secret key
3. Copy key (starts with `sk-`)

#### Implementation

```javascript
// src/utils/openai.js
export const sendToOpenAI = async (messages) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4", // or 'gpt-3.5-turbo' for faster/cheaper
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
};
```

#### Streaming Version

```javascript
export const streamOpenAI = async (messages, onChunk) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages,
      temperature: 0.7,
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((line) => line.trim());

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0]?.delta?.content;
          if (content) onChunk(content);
        } catch (e) {
          // Skip parse errors
        }
      }
    }
  }
};
```

---

### 2. Anthropic Claude

#### Get API Key

1. Visit https://console.anthropic.com/
2. Generate API key
3. Copy key (starts with `sk-ant-`)

#### Implementation

```javascript
// src/utils/claude.js
export const sendToClaude = async (messages) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      max_tokens: 2000,
      messages: messages,
    }),
  });

  const data = await response.json();
  return data.content[0].text;
};
```

---

### 3. Google Gemini

#### Get API Key

1. Visit https://makersuite.google.com/app/apikey
2. Create API key
3. Copy key

#### Implementation

```javascript
// src/utils/gemini.js
export const sendToGemini = async (messages) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const lastMessage = messages[messages.length - 1].content;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: lastMessage }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
```

---

### 4. Custom Backend (Node.js + Express)

#### Backend Setup

```javascript
// backend/server.js
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Standard endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    res.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Streaming endpoint
app.post("/api/chat/stream", async (req, res) => {
  try {
    const { messages } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Frontend Integration

```javascript
// src/utils/api.js
export const sendToBackend = async (messages) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  return data.message;
};

export const streamFromBackend = async (messages, onChunk) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/chat/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    }
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((line) => line.trim());

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.content) onChunk(parsed.content);
        } catch (e) {
          // Skip parse errors
        }
      }
    }
  }
};
```

---

### 5. WebSocket Real-Time Communication

#### Backend (Node.js + Socket.IO)

```javascript
// backend/socket-server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { OpenAI } = require("openai");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("chat", async (data) => {
    try {
      const { messages } = data;

      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          socket.emit("chunk", { content });
        }
      }

      socket.emit("done");
    } catch (error) {
      socket.emit("error", { error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(8000, () => {
  console.log("WebSocket server running on port 8000");
});
```

#### Frontend Integration

```javascript
// src/utils/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_WS_URL || "http://localhost:8000");
  }
  return socket;
};

export const sendMessage = (messages, onChunk, onComplete, onError) => {
  const socket = connectSocket();

  socket.emit("chat", { messages });

  socket.on("chunk", (data) => {
    onChunk(data.content);
  });

  socket.on("done", () => {
    onComplete();
  });

  socket.on("error", (data) => {
    onError(data.error);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
```

---

## Integration in InputBar Component

### Update `src/components/InputBar.jsx`

```javascript
import { useState, useRef } from "react";
import useChatStore from "../store/chatStore";

// Choose your preferred method:
import { streamOpenAI } from "../utils/openai";
// import { streamFromBackend } from '../utils/api';
// import { sendMessage } from '../utils/socket';

const InputBar = () => {
  const [input, setInput] = useState("");
  const {
    currentChatId,
    addMessage,
    updateMessage,
    setIsTyping,
    getCurrentChat,
  } = useChatStore();
  const streamingMessageIdRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !currentChatId) return;

    const currentChat = getCurrentChat();

    // Add user message
    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    addMessage(currentChatId, userMessage);
    setInput("");
    setIsTyping(true);

    // Create empty AI message for streaming
    const aiMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };
    addMessage(currentChatId, aiMessage);
    streamingMessageIdRef.current = aiMessage.id;

    try {
      // Prepare messages array
      const allMessages = [...currentChat.messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Stream response
      let fullResponse = "";

      await streamOpenAI(allMessages, (chunk) => {
        fullResponse += chunk;
        updateMessage(currentChatId, streamingMessageIdRef.current, {
          content: fullResponse,
        });
      });
    } catch (error) {
      console.error("Error:", error);
      updateMessage(currentChatId, streamingMessageIdRef.current, {
        content: "Sorry, I encountered an error. Please try again.",
      });
    } finally {
      setIsTyping(false);
      streamingMessageIdRef.current = null;
    }
  };

  // ... rest of component
};
```

---

## Environment Variables Reference

```env
# OpenAI
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
VITE_OPENAI_MODEL=gpt-4

# Anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
VITE_ANTHROPIC_MODEL=claude-3-opus-20240229

# Google
VITE_GOOGLE_API_KEY=xxxxxxxxxxxxx

# Custom Backend
VITE_BACKEND_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000

# Features
VITE_ENABLE_STREAMING=true
```

---

## Testing API Integration

```javascript
// src/utils/test-api.js
import { streamOpenAI } from "./openai";

export const testAPI = async () => {
  const testMessages = [{ role: "user", content: "Say hello!" }];

  try {
    let response = "";
    await streamOpenAI(testMessages, (chunk) => {
      response += chunk;
      console.log("Chunk:", chunk);
    });
    console.log("Full response:", response);
    return true;
  } catch (error) {
    console.error("API test failed:", error);
    return false;
  }
};
```

Run in browser console:

```javascript
import { testAPI } from "./utils/test-api";
testAPI();
```

---

## Rate Limiting & Error Handling

```javascript
// src/utils/rate-limiter.js
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  async throttle() {
    const now = Date.now();
    this.requests = this.requests.filter(
      (time) => now - time < this.timeWindow
    );

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.requests.push(now);
  }
}

export const rateLimiter = new RateLimiter(50, 60000); // 50 req/min
```

Usage:

```javascript
await rateLimiter.throttle();
const response = await sendToOpenAI(messages);
```

---

## Cost Tracking

```javascript
// src/utils/cost-tracker.js
const COSTS = {
  "gpt-4": { input: 0.03, output: 0.06 }, // per 1K tokens
  "gpt-3.5-turbo": { input: 0.0015, output: 0.002 },
  "claude-3-opus": { input: 0.015, output: 0.075 },
};

export const estimateCost = (model, inputTokens, outputTokens) => {
  const costs = COSTS[model];
  if (!costs) return 0;

  const inputCost = (inputTokens / 1000) * costs.input;
  const outputCost = (outputTokens / 1000) * costs.output;

  return inputCost + outputCost;
};

// Rough token estimation (4 chars ≈ 1 token)
export const estimateTokens = (text) => {
  return Math.ceil(text.length / 4);
};
```

---

**Ready to integrate! Choose your preferred AI provider and follow the implementation guide above.**
