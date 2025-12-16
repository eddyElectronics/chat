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
