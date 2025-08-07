import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';
import {
  FiCopy,
  FiDownload,
  FiLink,
  FiUser,
  FiFileText,
  FiEye,
  FiShare2,
  FiMic,
  FiStopCircle,
  FiPower
} from 'react-icons/fi';

const RightLinks = () => {
  const [flag,setFlag] = useState(true);
  const [copied, setCopied] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [assistantActive, setAssistantActive] = useState(true);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const voiceRef = useRef(null);

  const API_KEY = 'AIzaSyApTP6EnAaOwtEMgjd5SYMkZRZgL_0VIOg';
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

  const STOP_PHRASES = [
    'stop', 'बंद करो', 'रुक जाओ', 'ठहरो', 'स्टॉप', 'ruk jao', 'band karo', 
    'thahro', 'enough', 'बस', 'bas', 'छोड़ो', 'chhodo','parth stop','पार्थ रुको'
  ];
    
  const profileURL = "https://yourdomain.com/profile/chahat-sharma";
  const resumeURL = "https://yourdomain.com/resume/chahat-sharma";
  const dashboardURL = "https://yourdomain.com/dashboard/chahat-sharma";
  const resumeDownloadURL = "/resume/Chahat-Sharma-Resume.pdf";

  const handleStopCommand = () => {
    synthRef.current.cancel();
    setIsListening(false);
    recognitionRef.current?.stop();
    setSpokenText('');
    setAiResponse('');
  };

 const deactivateAssistant = () => {
  handleStopCommand();
  setAssistantActive(false);
  setFlag(false); // Add this line
};

 const activateAssistant = () => {
  setAssistantActive(true);
  setFlag(true); // Add this line
};

  // Initialize voices
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    const setVoices = () => {
      const voices = synthRef.current.getVoices();
      voiceRef.current = voices.find(v => 
        (v.lang === "hi-IN" || v.lang.includes("en-IN")) && 
        v.name.toLowerCase().includes("female")
      ) || voices[0];
    };
    
    setVoices();
    synthRef.current.onvoiceschanged = setVoices;
    
    return () => {
      synthRef.current.onvoiceschanged = null;
    };
  }, []);

  // Initialize speech recognition with continuous loop
  useEffect(() => {
    if (!assistantActive) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true; // Changed to continuous mode
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'hi-IN';

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      const detectedStopPhrase = STOP_PHRASES.find(phrase => 
        finalTranscript.toLowerCase().includes(phrase.toLowerCase())
      );
      
      if (detectedStopPhrase) {
        handleStopCommand();
        return;
      }

      if (finalTranscript) {
        setSpokenText(finalTranscript);
        sendToAI(finalTranscript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      handleStopCommand();
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isListening, assistantActive]);

  const startListening = () => {
    if (!speechSupported || !assistantActive) {
      alert('Voice input not supported or assistant is deactivated');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        setIsListening(true);
        setSpokenText('');
        recognitionRef.current.start();
      })
      .catch(err => {
        console.error('Microphone access denied', err);
        alert('Please allow microphone access');
      });
  };

  const sendToAI = async (message) => {
    if (!message.trim() || !assistantActive) return;
    if(!flag) return;

    console.log('Sending to AI:', flag);

    setIsLoading(true);
    setAiResponse('');

    try {
      const res = await axios.post(
        `${ENDPOINT}?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Reply in Hinglish (Hindi+English mix). Keep reply short. If user says any of [${STOP_PHRASES.join(', ')}], say "Okay, stopping now". User said: ${message}`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_KEY
          }
        }
      );

      const msg = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Kuch samajh nahi aaya';
      
      if (msg.toLowerCase().includes('stopping now')) {
        handleStopCommand();
      }
      
      setAiResponse(msg);
      speakResponse(msg);
    } catch (error) {
      console.error('API Error:', error);
      setAiResponse("Technical issue, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text) => {
    if (!assistantActive) return;
    
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceRef.current;
    utterance.lang = text.match(/[\u0900-\u097F]/) ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    synthRef.current.speak(utterance);
  };

  const handleShare = async (url, type) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Chahat's ${type}`,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(type);
        setTimeout(() => setCopied(null), 500);
      }
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const Button = ({
    children,
    onClick,
    icon: Icon,
    color = 'blue',
    variant = 'solid',
    className = '',
    disabled = false
  }) => {
    const baseClasses = 'flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors';
    const variantClasses = {
      solid: {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        green: 'bg-green-600 hover:bg-green-700 text-white',
        gray: 'bg-gray-600 hover:bg-gray-700 text-white',
      },
      outline: {
        blue: 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200',
        green: 'bg-green-100 hover:bg-green-200 text-green-800 border border-green-200',
        gray: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200',
      },
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant][color]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </button>
    );
  };

  return (
    <div className="bg-white w-full max-w-xs rounded-lg shadow-sm p-4 border border-gray-200 space-y-4">
      <div className="flex flex-col items-center">
        <DotLottieReact
          src="https://lottie.host/3e2b7a7b-b193-420e-a6a8-36abb1ea2cc2/sikVMmp8HU.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '120px' }}
        />
        
        {spokenText && (
          <div className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 mt-2">
            <p className="text-sm text-gray-700">{spokenText}</p>
          </div>
        )}
        
        {aiResponse && (
          <div className="w-full p-3 bg-blue-50 rounded-md border border-blue-200 mt-2 animate-fadeIn">
            <p className="text-sm text-blue-700">{aiResponse}</p>
          </div>
        )}
        
        <div className="w-full mt-3">
          {isListening ? (
            <Button
              onClick={handleStopCommand}
              icon={FiStopCircle}
              color="red"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Thinking...' : 'Stop Listening'}
            </Button>
          ) : (
            <Button
              onClick={startListening}
              icon={FiMic}
              color="blue"
              className="w-full"
              disabled={!assistantActive}
            >
              Speak in Hinglish
            </Button>
          )}
        </div>

        <div className="w-full mt-2">
          {assistantActive ? (
            <Button
              onClick={deactivateAssistant}
              icon={FiPower}
              color="gray"
              className="w-full"
             
            >
              Deactivate Assistant
            </Button>
          ) : (
            <Button
              onClick={activateAssistant}
              icon={FiPower}
              color="green"
              className="w-full"
            >
              Activate Assistant
            </Button>
          )}
        </div>
        
        {!speechSupported && (
          <p className="text-xs text-red-500 mt-2">
            Voice input not supported in your browser
          </p>
        )}
      </div>

      <h2 className="text-base font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
        <FiLink className="text-gray-500" />
        Quick Links
      </h2>

      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiUser className="text-gray-500" />
          Portfolio
        </h3>
        <div className="space-y-2">
          <Button
            onClick={() => handleShare(profileURL, 'profile')}
            icon={FiCopy}
            variant="outline"
          >
            {copied === 'profile' ? 'Copied!' : 'Share Profile'}
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiFileText className="text-gray-500" />
          Resume
        </h3>
        <div className="space-y-2">
          <Button
            onClick={() => handleShare(resumeURL, 'resume')}
            icon={FiCopy}
            variant="outline"
          >
            {copied === 'resume' ? 'Copied!' : 'Share Resume'}
          </Button>
          <a href={resumeDownloadURL} download className="block">
            <Button icon={FiDownload} color="blue" className="w-full">
              Download Resume
            </Button>
          </a>
          <a href={resumeURL} target="_blank" rel="noopener noreferrer" className="block">
            <Button icon={FiEye} color="blue" className="w-full">
              View Online
            </Button>
          </a>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiShare2 className="text-gray-500" />
          Dashboard
        </h3>
        <div className="space-y-2">
          <Link to="/dashboard" className="block">
            <Button icon={FiEye} color="blue" className="w-full">
              View Dashboard
            </Button>
          </Link>
          <Button
            onClick={() => handleShare(dashboardURL, 'dashboard')}
            icon={FiCopy}
            variant="outline"
            className="w-full"
          >
            {copied === 'dashboard' ? 'Copied!' : 'Share Dashboard'}
          </Button>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        All links point to the latest versions
      </p>
    </div>
  );
};

export default RightLinks;