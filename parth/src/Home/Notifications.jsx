import React, { useState, useEffect } from "react";
import { FiMoreHorizontal, FiSearch, FiSettings } from "react-icons/fi";
import Headerhome from "./Headerhome";
import Profilesection from "./Profilesection";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMarkAsRead = () => {
    onMarkAsRead(notification._id, !notification.read);
    setShowOptions(false);
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 border-b hover:bg-gray-50 relative transition-colors duration-150 ${
        !notification.read ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex-shrink-0">
        <img
          src={notification.icon || notification.image || "/default-profile.png"}
          alt="icon"
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`text-sm ${
            !notification.read ? "font-semibold" : "font-medium"
          } text-gray-800`}
        >
          {notification.title || "New Notification"}
        </div>
        {notification.content && (
          <div className="bg-gray-100 text-sm text-gray-700 p-2 mt-1 rounded-md">
            {notification.content}
          </div>
        )}
      </div>

      <div className="flex flex-col items-end">
        <div className="text-xs text-gray-500 whitespace-nowrap pl-2">
          {notification.createdAt
            ? new Date(notification.createdAt).toLocaleTimeString()
            : ""}
        </div>
        <div className="relative">
          <button
            className="mt-1 text-gray-400 hover:text-gray-600"
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
                {notification.read ? "Mark as unread" : "Mark as read"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notificationsList, setNotificationsList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

 useEffect(() => {
  axios
    .get("http://localhost:3000/api/notifications")
    .then((res) => {
      setNotificationsList(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => {
      console.error("Error fetching notifications:", err);
      setNotificationsList([]);
    });

  socket.on("pushNotification", (data) => {
    setNotificationsList((prev) => [data, ...prev]);
  });

  socket.on("notificationUpdated", (updated) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n._id === updated._id ? updated : n))
    );
  });

  socket.on("notificationDeleted", (deletedId) => {
    setNotificationsList((prev) => prev.filter((n) => n._id !== deletedId));
  });

  return () => {
    socket.off("pushNotification");
    socket.off("notificationUpdated");
    socket.off("notificationDeleted");
  };
}, []);


  const markAsRead = async (id, readStatus) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/api/notifications/${id}`,
        { read: readStatus }
      );
      // Update will also come via socket, but we update here for instant feedback
      setNotificationsList((prev) =>
        prev.map((n) => (n._id === id ? data : n))
      );
    } catch (err) {
      console.error("Error updating notification", err);
    }
  };

  const filteredNotifications = notificationsList.filter((n) => {
    if (activeFilter !== "all" && n.type !== activeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        n.title?.toLowerCase().includes(q) ||
        n.content?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex flex-col md:flex-row gap-6 px-4 mt-4 max-w-7xl mx-auto">
        <div className="w-full md:max-w-xs hidden md:block">
          <Profilesection />
        </div>
        <div className="w-full flex-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b flex justify-between items-center">
              <h1 className="text-xl font-semibold">Notifications</h1>
              <button
                className="text-sm text-blue-600"
                onClick={() =>
                  notificationsList.forEach((n) => markAsRead(n._id, true))
                }
              >
                Mark all as read
              </button>
            </div>

            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((n) => (
                <NotificationCard
                  key={n._id}
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
