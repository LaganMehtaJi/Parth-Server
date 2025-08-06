import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import { CiInboxIn } from "react-icons/ci";
import {CiMail}from "react-icons/ci";

const initialReceivedEmails = [
  {
    id: 1,
    from: 'admin@example.com',
    subject: 'Resume Verified',
    body: 'Your resume has been verified and approved.',
    date: '2025-07-22 01:45 PM',
  },
  {
    id: 2,
    from: 'hr@company.com',
    subject: 'Interview Invitation',
    body: 'We’d like to invite you for an interview on Friday.',
    date: '2025-07-21 11:30 AM',
  },
];

const initialSentEmails = [
  {
    id: 1,
    to: 'admin@example.com',
    subject: 'Request for Resume Approval',
    body: 'Dear Admin, please review my updated resume for verification.',
    date: '2025-07-22 10:30 AM',
  },
  {
    id: 2,
    to: 'hr@company.com',
    subject: 'Application Submission',
    body: 'I have submitted my resume for the Frontend Developer position.',
    date: '2025-07-21 09:15 AM',
  },
];

const Email = () => {
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox'); 
  const [formData, setFormData] = useState({ to: '', subject: '', body: '' });

  useEffect(() => {
    setReceivedEmails(initialReceivedEmails);
    setSentEmails(initialSentEmails);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    const newEmail = {
      id: sentEmails.length + 1,
      ...formData,
      date: new Date().toLocaleString(),
    };
    setSentEmails([newEmail, ...sentEmails]);
    setFormData({ to: '', subject: '', body: '' });
    setShowCompose(false);
    setCurrentTab('sent'); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-4">
        <div className="w-full lg:max-w-xs lg:sticky lg:top-20 self-start">
          <Profilesection />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex gap-2">
            <button
  onClick={() => setCurrentTab('inbox')}
  className={`flex items-center gap-2 px-6 py-2 rounded ${
    currentTab === 'inbox'
      ? 'bg-blue-600 text-white'
      : 'bg-white text-gray-800 border hover:text-blue-600'
  }`}
>
  <CiInboxIn className="text-lg" /> Inbox
</button>

{/* Sent Button */}
<button
  onClick={() => setCurrentTab('sent')}
  className={`flex items-center gap-2 px-6 py-2 rounded ${
    currentTab === 'sent'
      ? 'bg-blue-600 text-white'
      : 'bg-white text-gray-800 border hover:text-blue-600'
  }`}
>
  <CiMail className="text-lg" /> Sent
</button>
            </div>
            <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"

              onClick={() => setShowCompose(!showCompose)}
            >
              <FaPlus /> {showCompose ? 'Close' : 'Compose'}
            </button>
          </div>
          {showCompose && (
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-6 w-full">
              <h3 className="text-lg font-bold mb-4">New Email</h3>
              <form onSubmit={handleSend} className="space-y-4">
                <input
                  type="email"
                  name="to"
                  placeholder="To"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <textarea
                  name="body"
                  placeholder="Message"
                  value={formData.body}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border px-3 py-2 rounded resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
              Send
                </button>
              </form>
            </div>
          )}
          {currentTab === 'inbox' ? (
            <>
              <h2 className="text-xl font-bold mb-4 border-b pb-2">📥 Inbox</h2>
              {receivedEmails.length === 0 ? (
                <p className="text-gray-500">No received emails.</p>
              ) : (
                receivedEmails.map((email) => (
                  <div
                    key={email.id}
                    className="bg-white shadow-md rounded-xl p-4 mb-4 w-full"
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">{email.from}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Subject:</strong> {email.subject}
                    </p>
                    <p className="text-sm text-gray-600">{email.body}</p>
                    <p className="text-xs text-gray-400 mt-2 text-right">{email.date}</p>
                  </div>
                ))
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4 border-b pb-2">📤 Sent</h2>
              {sentEmails.length === 0 ? (
                <p className="text-gray-500">No sent emails.</p>
              ) : (
                sentEmails.map((email) => (
                  <div
                    key={email.id}
                    className="bg-white shadow-md rounded-xl p-4 mb-4 w-full"
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">{email.to}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Subject:</strong> {email.subject}
                    </p>
                    <p className="text-sm text-gray-600">{email.body}</p>
                    <p className="text-xs text-gray-400 mt-2 text-right">{email.date}</p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Email;
