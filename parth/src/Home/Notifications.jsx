import React, { useState } from 'react';
import { FiMoreHorizontal, FiSearch, FiSettings } from 'react-icons/fi';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';

const notifications = [
  {
    id: 1,
    icon: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    title: 'Software Engineer - Entry Level at Procedure',
    subtitle: 'and 9 other recommendations for you.',
    time: '31m',
    button: 'View jobs',
    read: false,
    type: 'job'
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    title: 'Kush Chanana and 35 others post that mentioned you.',
    content: 'Heartiest congratulations to our brilliant BCA students for securing top positions in the university merit list!',
    time: '4h',
    reactions: '37 reactions',
    comments: '1 comment',
    read: false,
    type: 'mention'
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    title: 'Wish Divya a happy birthday.',
    subtitle: 'View more opportunities to catch up with your network.',
    button: 'Say happy birthday',
    time: '5h',
    read: true,
    type: 'birthday'
  },
  {
    id: 4,
    icon: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png',
    title: 'Full Stack Engineer',
    subtitle: 'new opportunities in India.',
    button: 'View jobs',
    time: '5h',
    read: true,
    type: 'job'
  },
  {
    id: 5,
    icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
    title: 'New connection request',
    subtitle: 'You have 3 new connection requests waiting.',
    button: 'View requests',
    time: '6h',
    read: false,
    type: 'connection'
  },
  {
    id: 6,
    icon: 'https://cdn-icons-png.flaticon.com/512/2593/2593343.png',
    title: 'Your post got 15 new likes',
    subtitle: 'See who liked your recent post about project management.',
    button: 'View activity',
    time: '1d',
    read: true,
    type: 'engagement'
  },
];

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMarkAsRead = () => {
    onMarkAsRead(notification.id);
    setShowOptions(false);
  };

  return (
    <div 
      className={`flex items-start gap-3 p-4 border-b hover:bg-gray-50 relative transition-colors duration-150 ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
    >
      {/* Icon or Image */}
      <div className="flex-shrink-0">
        {notification.icon ? (
          <img 
            src={notification.icon} 
            alt="icon" 
            className={`w-10 h-10 object-cover rounded-full p-1 ${
              notification.type === 'job' ? 'bg-blue-100' : 
              notification.type === 'mention' ? 'bg-purple-100' :
              notification.type === 'birthday' ? 'bg-pink-100' :
              notification.type === 'connection' ? 'bg-green-100' : 'bg-gray-100'
            }`} 
          />
        ) : (
          <img 
            src={notification.image} 
            alt="profile" 
            className="w-10 h-10 rounded-full object-cover" 
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'} text-gray-800`}>
          <span>{notification.title}</span>
          {notification.subtitle && (
            <span className="text-gray-600"> {notification.subtitle}</span>
          )}
        </div>

        {notification.content && (
          <div className="bg-gray-100 text-sm text-gray-700 p-2 mt-1 rounded-md">
            {notification.content}
          </div>
        )}

        {(notification.reactions || notification.comments) && (
          <div className="text-xs text-gray-500 mt-1">
            {notification.reactions} • {notification.comments}
          </div>
        )}

        {/* Button */}
        {notification.button && (
          <button className="mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-150">
            {notification.button}
          </button>
        )}
      </div>

      {/* Time + Options */}
      <div className="flex flex-col items-end">
        <div className="text-xs text-gray-500 whitespace-nowrap pl-2">
          {notification.time}
        </div>
        <div className="relative">
          <button 
            className="mt-1 text-gray-400 hover:text-gray-600 transition-colors duration-150"
            onClick={() => setShowOptions(!showOptions)}
          >
            <FiMoreHorizontal size={18} />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleMarkAsRead}
              >
                {notification.read ? 'Mark as unread' : 'Mark as read'}
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Hide this notification
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Turn off this type
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

const Notifications = () => {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const markAsRead = (id) => {
    setNotificationsList(notificationsList.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map(n => ({...n, read: true})));
  };

  const filteredNotifications = notificationsList.filter(n => {
    // Filter by type
    if (activeFilter !== 'all' && n.type !== activeFilter) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(query) ||
        (n.subtitle && n.subtitle.toLowerCase().includes(query)) ||
        (n.content && n.content.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const unreadCount = notificationsList.filter(n => !n.read).length;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex gap-6 px-4 mt-4 max-w-7xl mx-auto">
        <div className="w-full max-w-xs sticky top-20 self-start hidden md:block">
          <Profilesection />
        </div>
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Notifications</h1>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FiSettings size={18} />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex overflow-x-auto mt-4 pb-2 scrollbar-hide">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 ${
                    activeFilter === 'all' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All {unreadCount > 0 && (
                    <span className="ml-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveFilter('mention')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 ${
                    activeFilter === 'mention' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mentions
                </button>
                <button
                  onClick={() => setActiveFilter('job')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 ${
                    activeFilter === 'job' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Jobs
                </button>
                <button
                  onClick={() => setActiveFilter('connection')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 ${
                    activeFilter === 'connection' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Connections
                </button>
                <button
                  onClick={() => setActiveFilter('birthday')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 ${
                    activeFilter === 'birthday' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Birthdays
                </button>
              </div>
            </div>
            
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((n) => (
                <NotificationCard 
                  key={n.id} 
                  notification={n} 
                  onMarkAsRead={markAsRead}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No notifications found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;