import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';   // ← Added this

const ChatBot = () => {
  const navigate = useNavigate();   // ← For navigation

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (text, isUser) => {
    setMessages(prev => [...prev, { id: Date.now(), text, isUser }]);
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();

    if (msg.includes('hi') || msg.includes('hello')) return "Hello there! 👋 How can I help you?";
    if (msg.includes('how are you')) return "I'm doing great, thank you! How about you?";
    if (msg.includes('name')) return "I'm your AI Assistant. Nice to meet you!";
    if (msg.includes('joke')) return "Why do programmers prefer dark mode? Because light attracts bugs! 😂";

    return "That's interesting! Tell me more...";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    addMessage(userText, true);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botReply = getBotResponse(userText);
      addMessage(botReply, false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Chat cleared. How can I help you?",
      isUser: false
    }]);
  };

  // Back Button Function - Goes to Home Page
  const goToHome = () => {
    navigate('/');        // This will take you to your homepage
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '420px',
      margin: '20px auto',
      backgroundColor: '#0f172a',
      borderRadius: '20px',
      boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      border: '1px solid #1e2937'
    }}>
      {/* Header with Back Button */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af, #2563eb)',
        color: 'white',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          onClick={goToHome}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '28px',
            cursor: 'pointer',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ←
        </button>

        <div style={{ fontSize: '26px' }}>🤖</div>

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: '19px' }}>AI Assistant</h2>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Online</p>
        </div>

        <button 
          onClick={clearChat}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            fontSize: '20px', 
            cursor: 'pointer' 
          }}
        >
          🗑️
        </button>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatRef}
        style={{
          height: '520px',
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{ display: 'flex', justifyContent: msg.isUser ? 'flex-end' : 'flex-start' }}
          >
            <div
              style={{
                maxWidth: '82%',
                padding: '14px 18px',
                borderRadius: msg.isUser 
                  ? '20px 20px 6px 20px' 
                  : '20px 20px 20px 6px',
                backgroundColor: msg.isUser ? '#2563eb' : '#1e2937',
                color: 'white',
                lineHeight: '1.5'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '10px' }}>
            <span style={{ fontSize: '24px' }}>🤖</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: '#0f172a',
        borderTop: '1px solid #1e2937'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '15px 20px',
              backgroundColor: '#1e2937',
              border: '1px solid #334155',
              borderRadius: '9999px',
              color: 'white',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            style={{
              width: '54px',
              height: '54px',
              backgroundColor: input.trim() ? '#2563eb' : '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              fontSize: '22px',
              cursor: input.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;