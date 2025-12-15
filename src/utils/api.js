// Chat API configuration
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5678";
const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || "/webhook/chat";

// Real API call to your backend
export const sendChatMessage = async (message, sessionId = null) => {
  try {
    // Generate or use existing session ID
    const currentSessionId =
      sessionId ||
      localStorage.getItem("chatai-session-id") ||
      generateSessionId();

    // Store session ID for future requests
    if (!sessionId) {
      localStorage.setItem("chatai-session-id", currentSessionId);
    }

    const response = await fetch(`${BACKEND_URL}${CHAT_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: currentSessionId,
        action: "sendMessage",
        chatInput: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Check for text field first (your API format)
    return (
      data.text ||
      data.response ||
      data.message ||
      data.output ||
      data.content ||
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Chat API error:", error);
    throw error;
  }
};

// Generate a unique session ID
const generateSessionId = () => {
  return (
    "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  );
};

// Simulated AI response function (fallback)
// In production, replace with actual API calls to OpenAI, Anthropic, or your backend

export const simulateAIResponse = async (userMessage) => {
  // Try real API first
  try {
    return await sendChatMessage(userMessage);
  } catch (error) {
    console.warn("Falling back to simulated response:", error);
  }

  // Fallback: Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simple response logic based on keywords
  const message = userMessage.toLowerCase();

  if (
    message.includes("code") ||
    message.includes("function") ||
    message.includes("component")
  ) {
    return `Here's a code example that might help:

\`\`\`javascript
function ExampleComponent({ title, items }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="container">
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={handleClick}>
        Increment
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

This component demonstrates:
- **State management** with useState
- **Event handling** with onClick
- **Props** for passing data
- **List rendering** with map

Would you like me to explain any specific part?`;
  }

  if (message.includes("idea") || message.includes("brainstorm")) {
    return `Great question! Here are some innovative ideas:

1. **Smart Solution**: Use AI to analyze patterns and provide personalized recommendations
2. **Community Approach**: Build a platform where users can collaborate and share solutions
3. **Gamification**: Add rewards and achievements to increase engagement
4. **Integration**: Connect with existing tools users already love
5. **Mobile-First**: Design with touch interactions and offline capabilities

**Key considerations:**
- User privacy and data security
- Scalability for growth
- Accessibility for all users

Would you like me to elaborate on any of these ideas?`;
  }

  if (
    message.includes("debug") ||
    message.includes("error") ||
    message.includes("bug")
  ) {
    return `Let me help you debug that issue! Here are common troubleshooting steps:

**1. Check the Console**
Look for error messages that indicate what's failing.

**2. Verify Async/Await Usage**
\`\`\`javascript
// ❌ Wrong
function getData() {
  const result = await fetch('/api/data');
  return result;
}

// ✅ Correct
async function getData() {
  const result = await fetch('/api/data');
  return result;
}
\`\`\`

**3. Add Error Handling**
\`\`\`javascript
try {
  const data = await fetchData();
  console.log(data);
} catch (error) {
  console.error('Error:', error);
}
\`\`\`

Can you share the specific error message you're seeing?`;
  }

  if (message.includes("summarize") || message.includes("summary")) {
    return `I'd be happy to help you summarize content! Here's how I can assist:

**For Articles & Documents:**
- Extract key points and main ideas
- Create executive summaries
- Identify important quotes and data
- Structure information hierarchically

**For Code:**
- Explain functionality in plain language
- Document complex algorithms
- Create usage examples

**Best Practices:**
- Focus on actionable insights
- Maintain original context
- Highlight critical information

Just paste the text you'd like me to summarize, and I'll provide a concise overview!`;
  }

  // Default response
  return `I understand you're asking about "${userMessage}". 

I'm here to help with:
- **Coding** assistance and debugging
- **Creative** brainstorming and ideas
- **Problem-solving** and technical questions
- **Content** writing and summarization
- **Explanations** of complex topics

Could you provide more details about what you need? The more specific you are, the better I can assist you!`;
};

// Real OpenAI API implementation (commented out)
/*
export const getAIResponse = async (messages) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages,
      stream: true,
      temperature: 0.7,
    })
  });

  return response;
};
*/

// WebSocket streaming implementation example
/*
export const streamAIResponse = (message, onChunk, onComplete, onError) => {
  const ws = new WebSocket('wss://your-backend.com/chat');
  
  ws.onopen = () => {
    ws.send(JSON.stringify({ message }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.done) {
      onComplete();
      ws.close();
    } else {
      onChunk(data.content);
    }
  };
  
  ws.onerror = (error) => {
    onError(error);
    ws.close();
  };
  
  return ws;
};
*/
