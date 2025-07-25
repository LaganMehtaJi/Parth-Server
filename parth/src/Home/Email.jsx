import React, { useState, useEffect } from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';

const initialEmails = [
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
  {
    id: 3,
    to: 'professor@maimt.edu',
    subject: 'Project Submission',
    body: 'Please find attached my final year project for evaluation.',
    date: '2025-07-20 03:20 PM',
  },
  {
    id: 4,
    to: 'placementcell@maimt.edu',
    subject: 'Query Regarding Placement Drive',
    body: 'Is the Infosys drive scheduled for next week confirmed?',
    date: '2025-07-19 11:45 AM',
  },
  {
    id: 5,
    to: 'teammate@maimt.edu',
    subject: 'Group Discussion Points',
    body: 'Here are the main points we will discuss in tomorrow’s meeting.',
    date: '2025-07-18 04:00 PM',
  },
];

const Email = () => {
  const [emails, setEmails] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [showCompose, setShowCompose] = useState(false);
  const [formData, setFormData] = useState({ to: '', subject: '', body: '' });

  useEffect(() => {
    setEmails(initialEmails);
  }, []);

  const paginatedEmails = emails.slice((page - 1) * perPage, page * perPage);

  const handleSend = (e) => {
    e.preventDefault();
    const newEmail = {
      id: emails.length + 1,
      ...formData,
      date: new Date().toLocaleString(),
    };
    setEmails([newEmail, ...emails]);
    setFormData({ to: '', subject: '', body: '' });
    setShowCompose(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-4">
        {/* Left - Profile (sticky on large screens only) */}
        <div className="w-full lg:max-w-xs lg:sticky lg:top-20 self-start">
          <Profilesection />
        </div>

        {/* Right - Main Email Area */}
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowCompose(!showCompose)}
            >
              {showCompose ? 'Close' : 'Compose'}
            </button>
          </div>

          {/* Compose Email */}
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
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* Outbox */}
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Outbox</h2>
          {paginatedEmails.length === 0 ? (
            <p className="text-gray-500">No sent emails.</p>
          ) : (
            paginatedEmails.map((email) => (
              <div
                key={email.id}
                className="bg-white shadow-md rounded-xl p-4 mb-4 w-full"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{email.to}</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Subject:</strong> {email.subject}
                </p>
                <p className="text-gray-600 text-sm">{email.body}</p>
                <p className="text-xs text-gray-400 mt-2 text-right">{email.date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Email;
