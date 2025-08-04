import React, { useState } from 'react';
import {
  FiBookmark,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiSend,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi';
import { BsThreeDotsVertical, BsStar, BsStarFill } from 'react-icons/bs';

const JobCard = ({ job, onBookmark, isBookmarked }) => {
  const [expanded, setExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [requirements, setRequirements] = useState({
    resume: false,
    coverLetter: false,
    portfolio: false,
    references: false
  });

  const toggleExpand = () => setExpanded(!expanded);

  const handleBookmark = (e) => {
    e.stopPropagation();
    onBookmark(job.id);
  };

  const handleInterestClick = (e) => {
    e.stopPropagation();
    setShowInterestModal(true);
    setMessage('');
    setMessageSubmitted(false);
    setRequirements({
      resume: false,
      coverLetter: false,
      portfolio: false,
      references: false
    });
  };

  const handleRequirementToggle = (req) => {
    setRequirements((prev) => ({
      ...prev,
      [req]: !prev[req]
    }));
  };

  const handleSubmitMessage = () => {
    if (message.trim() !== '') {
      setMessageSubmitted(true);
    }
  };

  const handleSubmitInterest = () => {
    console.log('Message:', message);
    console.log('Submitted requirements:', requirements);
    setShowInterestModal(false);
  };

  return (
    <div 
      className={`relative border border-gray-200 rounded-xl p-5 mb-4 transition-all duration-200
        ${job.promoted ? 'border-l-4 border-l-blue-500 bg-blue-50/20' : 'bg-white'}
        ${expanded ? 'shadow-md' : 'hover:shadow-md'}`}
      onClick={toggleExpand}
    >
      {/* Promoted Ribbon */}
      {job.promoted && (
        <div className="absolute top-0 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-b-lg">
          Featured
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="w-full">
          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1"><FiBriefcase size={14} /> {job.company}</span>
            <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>
            {job.salary && (
              <span className="flex items-center gap-1"><FiDollarSign size={14} /> {job.salary}</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-3">{job.description}</p>
        </div>

        <button 
          className="text-gray-400 hover:text-yellow-400 ml-2"
          onClick={handleBookmark}
        >
          {isBookmarked ? <BsStarFill className="text-yellow-400" /> : <BsStar />}
        </button>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">Posted {job.postedDate || '2 days ago'}</div>
        <div className="flex gap-2">
          <button 
            className="text-gray-500 hover:text-gray-700 p-1 relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            <BsThreeDotsVertical />
            {showOptions && (
              <div className="absolute right-0 bottom-8 bg-white shadow-lg rounded-md p-2 w-40 z-10">
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded">Save Search</button>
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded">Share Job</button>
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded text-red-500">Report</button>
              </div>
            )}
          </button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            onClick={handleInterestClick}
          >
            <FiSend size={16} />
            Interested
          </button>
        </div>
      </div>

      {/* Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Application Interest</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowInterestModal(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            {!messageSubmitted ? (
              <>
                <p className="text-gray-600 mb-2">Tell us why you're interested in this role:</p>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  rows="4"
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-end">
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={!message.trim()}
                    onClick={handleSubmitMessage}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">Select the documents you'll include:</p>
                <div className="space-y-3 mb-6">
                  {['resume', 'coverLetter', 'portfolio', 'references'].map((req) => (
                    <div 
                      key={req}
                      className={`flex items-center p-3 rounded-lg cursor-pointer ${
                        requirements[req] ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleRequirementToggle(req)}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${
                        requirements[req] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}>
                        {requirements[req] && <FiCheckCircle className="text-white" size={14} />}
                      </div>
                      <span className="font-medium capitalize">{req.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowInterestModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={!requirements.resume}
                    onClick={handleSubmitInterest}
                  >
                    Submit Application
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
