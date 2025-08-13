import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradient = css`
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

// Styled Components
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20vh;
  font-family: 'Inter', sans-serif;
`;

const ChatBox = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 70vh;
  background: white;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
`;

const MessagePanel = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
  scroll-behavior: smooth;
`;

const InputBar = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 8px 8px 20px;
  background: white;
  border-radius: 30px;
  border: 1px solid #e2e8f0;

  input {
    flex: 1;
    padding: 12px 0;
    border: none;
    font-size: 15px;
    outline: none;
    background: transparent;
  }

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 30px;
    ${gradient}
    color: white;
    cursor: pointer;
  }
`;

const Message = styled.div`
  margin-bottom: 15px;
  max-width: 80%;
  padding: 16px 22px;
  border-radius: 18px;
  background: ${props => props.isUser ? gradient : '#ffffff'};
  color: ${props => props.isUser ? 'white' : '#4a5568'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  animation: ${fadeIn} 0.3s ease-out;
  border: ${props => !props.isUser && '1px solid #edf2f7'};
`;

const TypingIndicator = styled.div`
  display: flex;
  padding: 15px 20px;
  background: #ffffff;
  border-radius: 18px;
  align-self: flex-start;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);

  span {
    height: 8px;
    width: 8px;
    margin: 0 4px;
    background: #667eea;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.4;
    animation: ${pulse} 1s infinite;
  }
`;

export default function ResumeBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [portfolioId, setPortfolioId] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Initial message
    setMessages([{ text: "Hi! Please provide your resume objective.", isUser: false }]);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    setIsTyping(true);

    if (!portfolioId) {
      // Step 1 → Send to backend to create portfolio
      try {
        const res = await axios.post('/api/generate-portfolio', { objective: input });
        setPortfolioId(res.data.id);

        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            text: "Great! I’ve generated your portfolio. Fetching your GitHub links...",
            isUser: false
          }]);
          fetchGithubLinks(res.data.id);
        }, 1500);
      } catch (err) {
        console.error(err);
        setIsTyping(false);
        setMessages(prev => [...prev, { text: "Oops! Something went wrong.", isUser: false }]);
      }
    }
  };

  const fetchGithubLinks = async (id) => {
    setIsTyping(true);
    try {
      const res = await axios.get(`/api/github-links/${id}`);
      const links = res.data.links;

      setTimeout(() => {
        setIsTyping(false);
        if (links.length) {
          setMessages(prev => [
            ...prev,
            { text: "Here are your GitHub links:", isUser: false },
            ...links.map(link => ({ text: link, isUser: false }))
          ]);
        } else {
          setMessages(prev => [...prev, { text: "No GitHub links found.", isUser: false }]);
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: "Error fetching GitHub links.", isUser: false }]);
    }
  };

  return (
    <AppContainer>
      <ChatBox>
        <MessagePanel>
          <Messages>
            {messages.map((msg, i) => (
              <Message key={i} isUser={msg.isUser}>
                {msg.text.startsWith('http') ? (
                  <a href={msg.text} target="_blank" rel="noopener noreferrer">{msg.text}</a>
                ) : msg.text}
              </Message>
            ))}
            {isTyping && (
              <TypingIndicator>
                <span></span>
                <span></span>
                <span></span>
              </TypingIndicator>
            )}
            <div ref={messageEndRef} />
          </Messages>

          <InputBar onSubmit={handleSend}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </InputBar>
        </MessagePanel>

        <div className="w-full md:w-1/2 flex justify-center">
          <DotLottieReact
            src="https://lottie.host/3e2b7a7b-b193-420e-a6a8-36abb1ea2cc2/sikVMmp8HU.lottie"
            loop
            autoplay
            style={{ width: "90%", height: "100%", paddingTop: "35%" }}
          />
        </div>
      </ChatBox>
    </AppContainer>
  );
}
