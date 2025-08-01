import React, { useState, useRef } from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import { FiMic } from 'react-icons/fi';

const Message = () => {
  const [messages, setMessages] = useState([
    { sender: 'admin', text: 'Hello! How can I help you today?' },
    { sender: 'user', text: 'I want to know more about a job role.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: newMessage }]);
    setNewMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'admin', text: 'Thanks for reaching out. We’ll get back shortly.' },
      ]);
    }, 1000);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewMessage((prev) => prev + ' ' + transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />

      <div className="flex flex-col lg:flex-row gap-6 px-4 py-4">
        {/* Profile Section */}
        <div className="w-full lg:max-w-xs">
          <Profilesection />
        </div>

        {/* Chat Section */}
        <div className="flex  w-full mt-4 lg:mt-0">
          <div className="w-full max-w-xxl h-[500px] border border-gray-300 rounded-2xl shadow-lg flex flex-col bg-white overflow-hidden">
            
            <div className="bg-blue-600 text-white px-4 py-4 rounded-t-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Admin </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[75%] px-4 py-2 text-sm rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-200 text-gray-800 self-start mr-auto'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="flex items-center border-t border-gray-200 p-2 bg-white flex-wrap gap-2 sm:flex-nowrap">
              <input
                type="text"
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />

              <button
                className={`p-2 rounded-full ${
                  isListening ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
                onClick={startListening}
                title="Speak"
              >
                <FiMic size={22} />
              </button>

              <button
                onClick={handleSend}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
