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
      setMessages(prev => [
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
      setNewMessage(prev => prev + ' ' + transcript);
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
        {/* Profile Section (hide sticky on mobile) */}
        <div className="w-full lg:max-w-xs">
          <Profilesection />
        </div>

        {/* Chat Section */}
        <div className="flex justify-center w-full mt-4 lg:mt-0">
          <div className="w-full max-w-xl h-[400px] sm:h-[500px] border border-gray-300 rounded-2xl shadow-lg flex flex-col bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white text-lg font-semibold px-4 py-3 rounded-t-2xl flex justify-center">
              <div className="w-14 h-4 bg-white rounded-full shadow-md"></div>
            </div>

            {/* Chat Messages */}
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

            {/* Input Area */}
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
