import React, { useState } from 'react';
import { FiCopy, FiDownload, FiLink, FiUser, FiFileText } from 'react-icons/fi';

const RightLinks = () => {
  const [copied, setCopied] = useState(null);
  const profileURL = "https://yourdomain.com/profile/chahat-sharma";
  const resumeURL = "https://yourdomain.com/resume/chahat-sharma";
  const profileDownloadURL = "/profile/chahat-sharma.pdf";
  const resumeDownloadURL = "/resume/Chahat-Sharma-Resume.pdf";

  const handleShare = async (url, type) => {
    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: `Chahat Sharma's ${type}`,
          url: url
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        // Fallback for browsers without clipboard API
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

  const Button = ({ children, onClick, icon: Icon, color = 'blue', variant = 'solid' }) => {
    const baseClasses = "w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors";
    const variantClasses = {
      solid: {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        green: 'bg-green-600 hover:bg-green-700 text-white'
      },
      outline: {
        blue: 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200',
        green: 'bg-green-100 hover:bg-green-200 text-green-800 border border-green-200'
      }
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant][color]}`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </button>
    );
  };

  return (
    <div className="bg-white w-full max-w-xs rounded-lg shadow-sm p-4 border border-gray-200 space-y-4">
      <h2 className="text-base font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
        <FiLink className="text-gray-500" />
        Quick Share Links
      </h2>

      {/* Profile Section */}
      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiUser className="text-gray-500" />
          Profile
        </h3>
        <div className="space-y-2">
          <Button 
            onClick={() => handleShare(profileURL, 'profile')} 
            icon={FiCopy}
            variant="outline"
          >
            {copied === 'profile' ? 'Copied!' : 'Share Profile URL'}
          </Button>
          <a
            href={profileDownloadURL}
            download="Chahat-Sharma-Profile.pdf"
            className="block"
          >
            <Button icon={FiDownload} color="blue">
              Download Profile
            </Button>
          </a>
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
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Links will direct to your latest documents
      </p>
    </div>
  );
};

export default RightLinks;