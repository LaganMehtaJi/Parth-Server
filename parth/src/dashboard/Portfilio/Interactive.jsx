import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const ChatBox = styled.div`
  width: 90%;
  max-width: 1200px;
  height:70vh;
  min-height:60%;
  background: white;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const MessagePanel = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  min-width: 0;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }
`;

const InputBar = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 8px 8px 20px;
  background: white;
  border-radius: 30px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  input {
    flex: 1;
    padding: 12px 0;
    border: none;
    font-size: 15px;
    outline: none;
    background: transparent;
    font-family: 'Inter', sans-serif;
    color: #4a5568;

    &::placeholder {
      color: #a0aec0;
    }
  }

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 30px;
    ${gradient}
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.5px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
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
  line-height: 1.5;
  font-size: 15px;
  border: ${props => !props.isUser && '1px solid #edf2f7'};
  position: relative;

  ${props => !props.isUser && css`
    &::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 16px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid white;
    }
  `}

  ${props => props.isUser && css`
    &::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 16px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid #667eea;
    }
  `}
`;

const TypingIndicator = styled.div`
  display: flex;
  padding: 15px 20px;
  background: #ffffff;
  border-radius: 18px;
  align-self: flex-start;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid #edf2f7;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 16px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid white;
  }

  span {
    height: 8px;
    width: 8px;
    margin: 0 4px;
    background: #667eea;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.4;

    &:nth-child(1) {
      animation: ${pulse} 1s infinite;
    }
    &:nth-child(2) {
      animation: ${pulse} 1s infinite 0.2s;
    }
    &:nth-child(3) {
      animation: ${pulse} 1s infinite 0.4s;
    }
  }
`;

const VoiceButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.isListening ? '#ff4d4f' : '#667eea'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  margin-right: 5px;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.9);
  padding: 6px 12px 6px 8px;
  border-radius: 20px;
  font-size: 12px;
  color: #667eea;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  z-index: 2;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.isActive ? '#48bb78' : '#f56565'};
  }
`;

const ValidationMessage = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4d4f;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  animation: ${fadeIn} 0.3s ease-out;
  white-space: nowrap;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #ff4d4f;
  }
`;

export default function ChatBotWithVoice() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const voiceRef = useRef(null);
  const messageEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Inter font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Initialize speech synthesis
    const synth = window.speechSynthesis;
    
    const setVoice = () => {
      const voices = synth.getVoices();
      // Try to find a pleasant female voice
      const femaleVoices = voices.filter(v => 
        v.lang.includes('en-') && 
        (v.name.toLowerCase().includes('female') || 
         v.name.includes('Samantha') || 
         v.name.includes('Zira') || 
         v.name.includes('Karen') || 
         v.name.includes('Serena'))
      );
      
      voiceRef.current = femaleVoices.find(v => v.name.includes('Natural')) || 
                         femaleVoices[0] || 
                         voices.find(v => v.lang.includes('en-')) || 
                         voices[0];

      setVoiceReady(true);

      // Initial greeting if no messages
      if (messages.length === 0) {
        const welcomeMsg = { 
          text: "Hello parth!Tell me about Yourself...", 
          isUser: false 
        };
        setMessages([welcomeMsg]);
        speakText(welcomeMsg.text);
      }
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = setVoice;
    }

    if (synth.getVoices().length > 0) {
      setVoice();
    } else {
      setTimeout(setVoice, 1000);
    }

    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const speakText = (text) => {
    if (!voiceRef.current || !text || !voiceReady) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceRef.current;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    utterance.text = text.replace(/[,.]/g, match => match + ' ');
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const validateInput = (text) => {
    if (messages.length === 1) { 
      if (text.length < 10) {
        setValidationError("Please provide at least 20 characters");
        return false;
      } else if (text.length > 60) {
        setValidationError("Please keep your response under 40 characters");
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Validate input for the "tell about yourself" question
    if (messages.length === 1 && !validateInput(input)) {
      setShowValidation(true);
      speakText(validationError);
      setTimeout(() => setShowValidation(false), 3000);
      return;
    }

    // Add user message
    const newMsg = { text: input, isUser: true };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Bot response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      let reply;
      if (messages.length === 1) {
        reply = { 
          text: "Thank you for sharing! Now I'll help you create your portfolio.", 
          isUser: false 
        };
      } else {
        reply = { 
          text: "I'm now preparing your portfolio presentation...", 
          isUser: false 
        };
      
        setTimeout(() => {
          
          navigate('/color');
        }, 4000);
      }
      
      setMessages(prev => [...prev, reply]);
      speakText(reply.text);
    }, 1500);
  };

  return (
    <AppContainer>
      <ChatBox>
        <MessagePanel style={{backgroundColor:"white"}}>
          <StatusIndicator isActive={voiceReady}>
            <span></span>
            {voiceReady ? 'Assistant Ready' : 'Initializing...'}
          </StatusIndicator>
          
          <Messages>
            {messages.map((msg, i) => (
              <Message key={i} isUser={msg.isUser}>
                {msg.text}
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
            {recognitionRef.current && (
              <VoiceButton 
                type="button" 
                onClick={startListening}
                isListening={isListening}
                title="Voice Input"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2h-1v2a8 8 0 0 0 7 7.93V21H9v2h6v-2h-1v-1.07A8 8 0 0 0 20 12v-2z" />
                </svg>
              </VoiceButton>
            )}
            
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              autoFocus
            />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Send
            </button>
          </InputBar>

          {showValidation && <ValidationMessage>{validationError}</ValidationMessage>}
        </MessagePanel>

        <div className="w-full md:w-1/2 flex justify-center -mt-35">
          <DotLottieReact
            src="https://lottie.host/3e2b7a7b-b193-420e-a6a8-36abb1ea2cc2/sikVMmp8HU.lottie"
            loop
            autoplay
            style={{width:"90%", height:"100%", paddingTop:"35%"}}
          />
        </div>
      </ChatBox>
    </AppContainer>
  );
}