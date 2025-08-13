import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';

const HomeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/notifications');

        let data = [];
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data?.data) {
          data = response.data.data;
        } else if (response.data?.notifications) {
          data = response.data.notifications;
        }

        const sortedNotifications = [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt || a.time);
          const dateB = new Date(b.createdAt || b.time);
          return dateB - dateA;
        });

        setNotifications(sortedNotifications);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNotifications();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Headerhome />
        <div className="flex flex-col lg:flex-row gap-6 px-4 py-4">
          <div className="w-full lg:max-w-xs lg:sticky lg:top-20 self-start">
            <Profilesection />
          </div>
          <div className="flex-1 p-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">Loading announcements...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Headerhome />
        <div className="flex flex-col lg:flex-row gap-6 px-4 py-4">
          <div className="w-full lg:max-w-xs lg:sticky lg:top-20 self-start">
            <Profilesection />
          </div>
          <div className="flex-1 p-4 text-center text-red-500">
            <p>Failed to load announcements</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-4">
        <div className="w-full lg:max-w-xs lg:sticky lg:top-20 self-start">
          <Profilesection />
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">All Announcements</h3>
              <span className="text-sm text-gray-500">
                {notifications.length} total
              </span>
            </div>

            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                        {new Date(notification.createdAt || notification.time).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                    {notification.sender && (
                      <p className="text-xs text-gray-500 mt-2">
                        From: {notification.sender}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="mt-2 text-gray-500">No announcements available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNotifications;
