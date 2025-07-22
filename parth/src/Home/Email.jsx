import React, { useState, useEffect } from 'react';
import { FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsReply, BsForward } from 'react-icons/bs';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';

const dummyEmails = [
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

  useEffect(() => {
    setEmails(dummyEmails);
  }, []);

  const paginatedEmails = emails.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex gap-6 px-4 mt-4">
        {/* Profile Section */}
        <div className="w-full max-w-xs sticky top-20 self-start">
          <Profilesection />
        </div>

        {/* Outbox Section */}
        <div className="p-6 w-full max-w-3xl">
          {/* Compose Button Only */}
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => alert("Compose form will open here")}
            >
              Compose
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4 border-b pb-2">Outbox</h2>

          {paginatedEmails.length === 0 ? (
            <p className="text-gray-500">No sent emails.</p>
          ) : (
            paginatedEmails.map(email => (
              <div key={email.id} className="bg-white shadow-md rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{email.to}</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Subject:</strong> {email.subject}</p>
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
