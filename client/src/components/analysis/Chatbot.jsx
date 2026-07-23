import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { askContractQuestion } from '../../services/api';

const SESSION_CHAT_KEY = 'clausewise_chat_history';

const Chatbot = ({ contractText, analysisData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_CHAT_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages([{ role: 'assistant', content: "Hello! I've analyzed your contract. What would you like to know about it?" }]);
      }
    } else {
      setMessages([{ role: 'assistant', content: "Hello! I've analyzed your contract. What would you like to know about it?" }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(SESSION_CHAT_KEY, JSON.stringify(messages));
    }
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isExpanded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    setIsExpanded(true); // Auto-expand when a user sends a message

    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    abortControllerRef.current = new AbortController();

    try {
      const answer = await askContractQuestion(
        contractText, 
        analysisData, 
        messages,
        userMessage.content,
        abortControllerRef.current.signal
      );

      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (error) {
      if (error.message !== 'Generation stopped by user.') {
        setMessages(prev => [...prev, { role: 'assistant', content: `**Error:** ${error.message}` }]);
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="glass-panel d-flex flex-column overflow-hidden shadow-sm mt-2">
      {/* 4. Chat panel - Collapsed state header */}
      <div 
        className="p-3 d-flex justify-content-between align-items-center border-bottom" 
        style={{ background: 'var(--secondary-gradient)', cursor: 'pointer', borderColor: 'var(--border-color)' }}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        aria-expanded={isExpanded}
        aria-controls="chatbot-thread"
      >
        <div className="d-flex align-items-center">
          <div className="fs-5 me-2 text-primary">💬</div>
          <h6 className="fw-bold mb-0 text-gradient">Ask about this contract</h6>
        </div>
        <div className="text-muted fw-bold">
          {isExpanded ? '⌃' : '⌄'}
        </div>
      </div>

      {/* Expanded Thread */}
      {isExpanded && (
        <div className="p-3 p-md-4 overflow-auto border-bottom page-fade-in bg-opacity-50 bg-body" style={{ maxHeight: '400px', borderColor: 'var(--border-color)' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`d-flex mb-4 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              {msg.role === 'assistant' && (
                <div className="me-2 flex-shrink-0 mt-1">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '30px', height: '30px', fontSize: '0.7rem' }}>AI</div>
                </div>
              )}
              
              <div 
                className={`p-3 px-4 rounded-4 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-body border'}`}
                style={{ 
                  maxWidth: '80%', 
                  borderColor: 'var(--border-color)',
                  borderTopRightRadius: msg.role === 'user' ? '4px' : '1rem',
                  borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '1rem',
                }}
              >
                {msg.role === 'assistant' ? (
                  <div className="markdown-content mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="mb-0" style={{ fontSize: '0.95rem' }}>{msg.content}</div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="d-flex mb-3 justify-content-start">
               <div className="me-2 flex-shrink-0 mt-1">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '30px', height: '30px', fontSize: '0.7rem' }}>AI</div>
                </div>
              <div className="p-3 px-4 rounded-4 bg-body shadow-sm border" style={{ borderColor: 'var(--border-color)', borderTopLeftRadius: '4px' }}>
                <div className="spinner-grow spinner-grow-sm text-primary me-1 opacity-75" role="status" style={{ width: '0.5rem', height: '0.5rem' }}></div>
                <div className="spinner-grow spinner-grow-sm text-primary me-1 opacity-75" role="status" style={{ width: '0.5rem', height: '0.5rem', animationDelay: '0.2s' }}></div>
                <div className="spinner-grow spinner-grow-sm text-primary opacity-75" role="status" style={{ width: '0.5rem', height: '0.5rem', animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area (Always visible pinned directly below) */}
      <div className="p-3 bg-body">
        {isTyping && (
          <div className="text-center mb-2">
            <button className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 shadow-sm" onClick={handleStop} style={{ fontSize: '0.8rem' }}>
              ⏹ Stop
            </button>
          </div>
        )}
        <form onSubmit={handleSend} className="d-flex position-relative">
          <input
            type="text"
            className="form-control rounded-pill pe-5 chat-input py-2 ps-4"
            placeholder="Type a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            style={{ fontSize: '0.95rem', height: '45px' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center position-absolute shadow-sm p-0"
            disabled={!input.trim() || isTyping}
            style={{ width: '35px', height: '35px', right: '5px', top: '50%', transform: 'translateY(-50%)' }}
            aria-label="Send message"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
