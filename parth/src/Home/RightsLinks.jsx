import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
  FiEdit,
  FiSave
} from 'react-icons/fi';

const RightLinks = () => {
  const [copied, setCopied] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);

  const profileURL = "https://yourdomain.com/profile/chahat-sharma";
  const resumeURL = "https://yourdomain.com/resume/chahat-sharma";
  const dashboardURL = "https://yourdomain.com/dashboard/chahat-sharma";
  const resumeDownloadURL = "/resume/Chahat-Sharma-Resume.pdf";

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setSpokenText(finalTranscript || interimTranscript);
      setEditedText(finalTranscript || interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access to use speech recognition');
      }
      stopListening();
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const startListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    // Request microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        setIsListening(true);
        setSpokenText('');
        recognitionRef.current.start();
      })
      .catch(err => {
        console.error('Microphone access denied', err);
        alert('Microphone access is required for speech recognition');
      });
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedText(spokenText);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setSpokenText(editedText);
  };

  const handleShare = async (url, type) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Chahat Sharma's ${type}`,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      }
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
    const baseClasses =
      'flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors';
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
        {/* Always show the Lottie animation */}
        <DotLottieReact
          src="https://lottie.host/3e2b7a7b-b193-420e-a6a8-36abb1ea2cc2/sikVMmp8HU.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '120px' }}
        />
        
        {/* Show editable text area when editing, otherwise show spoken text */}
        {isEditing ? (
          <div className="w-full mt-2">
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-700"
              rows="3"
              placeholder="Edit your text here..."
            />
          </div>
        ) : spokenText ? (
          <div className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 mt-2">
            <p className="text-sm text-gray-700">{spokenText}</p>
          </div>
        ) : null}
        
        <div className="flex gap-2 w-full mt-3">
          {isEditing ? (
            <Button
              onClick={handleSaveClick}
              icon={FiSave}
              color="blue"
              className="flex-1"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={handleEditClick}
              icon={FiEdit}
              variant="outline"
              className="flex-1"
              disabled={!spokenText}
            >
              Edit
            </Button>
          )}
          {isListening ? (
            <Button
              onClick={stopListening}
              icon={FiStopCircle}
              color="red"
              className="flex-1"
            >
              Stop
            </Button>
          ) : (
            <Button
              onClick={startListening}
              icon={FiMic}
              color="green"
              className="flex-1"
            >
              Speak
            </Button>
          )}
        </div>
        {!speechSupported && (
          <p className="text-xs text-red-500 mt-2">
            Speech recognition not supported in your browser
          </p>
        )}
      </div>

      <h2 className="text-base font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
        <FiLink className="text-gray-500" />
        Quick Share Links
      </h2>

      {/* Portfolio Section */}
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
            {copied === 'profile' ? 'Copied!' : 'Share Profile URL'}
          </Button>
        </div>
      </div>

      {/* Resume Section */}
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
            {copied === 'resume' ? 'Copied!' : 'Share Resume URL'}
          </Button>
          <a
            href={resumeDownloadURL}
            download="Chahat-Sharma-Resume.pdf"
            className="block"
          >
            <Button icon={FiDownload} color="blue">
              Download Resume
            </Button>
          </a>
          <a
            href={resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button icon={FiEye} color="blue">
              View Resume
            </Button>
          </a>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiShare2 className="text-gray-500" />
          Dashboard
        </h3>
        <div className="space-y-2">
          <Link to="/dashboard">
            <Button icon={FiEye} color="blue">
              View Dashboard
            </Button>
          </Link>
          <Button
            onClick={() => handleShare(dashboardURL, 'dashboard')}
            icon={FiCopy}
            variant="outline"
          >
            {copied === 'dashboard' ? 'Copied!' : 'Share Dashboard URL'}
          </Button>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Links will direct to your latest documents
      </p>
    </div>
  );
};

export default RightLinks;