import React, { useState, useRef, useEffect } from 'react';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    if (msg.includes('hi') || msg.includes('hello')) return "Hi there! 👋 How can I assist you?";
    if (msg.includes('how are you')) return "I'm doing great! Thanks for asking 😊";
    if (msg.includes('name')) return "I'm your AI Assistant. Nice to meet you!";
    if (msg.includes('joke')) return "Why don't skeletons fight each other? They don't have the guts! 😂";

    return "Interesting! Tell me more...";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    addMessage(userText, true);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addMessage(getBotResponse(userText), false);
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

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s'
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '380px',
          height: '520px',
          backgroundColor: '#0f172a',
          borderRadius: '16px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          border: '1px solid #1e2937',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af, #2563eb)',
            color: 'white',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ fontSize: '24px' }}>🤖</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '17px' }}>AI Assistant</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.85 }}>Online</p>
            </div>
            <button
              onClick={clearChat}
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px' }}
            >
              🗑️
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '22px' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '18px',
              backgroundColor: '#0f172a',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{ display: 'flex', justifyContent: msg.isUser ? 'flex-end' : 'flex-start' }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '13px 17px',
                    borderRadius: msg.isUser ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                    backgroundColor: msg.isUser ? '#2563eb' : '#1e2937',
                    color: 'white',
                    lineHeight: '1.45'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px' }}>
                <span>🤖</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '14px 16px', backgroundColor: '#0f172a', borderTop: '1px solid #1e2937' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  backgroundColor: '#1e2937',
                  border: '1px solid #334155',
                  borderRadius: '9999px',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: input.trim() ? '#2563eb' : '#334155',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  fontSize: '20px',
                  cursor: input.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatBot;