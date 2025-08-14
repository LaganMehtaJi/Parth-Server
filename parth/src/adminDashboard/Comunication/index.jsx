import { useState, useEffect } from "react";
import axios from "axios"; // `npm install axios` if not already installed

const Communication = () => {
  const [rollNo, setRollNo] = useState("");
  const [classOption, setClassOption] = useState("BCA");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [activeTab, setActiveTab] = useState("notification");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/notifications");
        const msgs = Array.isArray(response.data.data) ? response.data.data : [];
        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching messages:", error);
        alert("Failed to load message history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async (recipientType) => {
    if (recipientType === "individual" && !rollNo) {
      return alert("Please enter a roll number.");
    }

    const content = activeTab === "notification" ? notificationMessage : emailMessage;
    if (!content) return;

    try {
    setIsLoading(true);
    const newMessage = {
      title: `Admin ${activeTab} for ${recipientType === 'all' ? 'All' : classOption}`,
      content: activeTab === "notification" ? notificationMessage : emailMessage,
      type: activeTab,
      recipientType,
      class: classOption,
      ...(recipientType === 'individual' && { rollNo })
    };

    console.log("Sending:", newMessage); // Debug log
    
    const response = await axios.post(
      'http://localhost:3000/api/notifications/send',
      newMessage,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Response:", response.data); // Debug log
    setMessages([response.data.data, ...messages]);
    

      // Reset fields
        setNotificationMessage("");
    setEmailMessage("");
    if (recipientType === "individual") setRollNo("");
  } catch (error) {
    console.error("Full error:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Failed to send message");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-600 p-3 rounded-lg shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Example valid SVG path for a chat bubble icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 
                     0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">Communication Panel</h1>
              <p className="text-gray-600">Send notifications and emails to students</p>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("notification")}
              className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all ${
                activeTab === "notification"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Bell icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 
                     2.032 0 0118 14.158V11a6.002 
                     6.002 0 00-4-5.659V5a2 2 0 
                     10-4 0v.341C7.67 6.165 6 
                     8.388 6 11v3.159c0 .538-
                     .214 1.055-.595 1.436L4 
                     17h5m6 0v1a3 3 0 11-6 0v-
                     1m6 0H9"
                />
              </svg>
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all ${
                activeTab === "email"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Email icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 
                     0 002.22 0L21 8M5 19h14a2
                     2 0 002-2V7a2 2 0 00-2-
                     2H5a2 2 0 00-2 2v10a2 2 
                     0 002 2z"
                />
              </svg>
              Emails
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Compose */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  {activeTab === "notification" ? "Compose Notification" : "Compose Email"}
                </h2>
                <textarea
                  placeholder={`Type your ${
                    activeTab === "notification" ? "notification" : "email"
                  } message here...`}
                  value={activeTab === "notification" ? notificationMessage : emailMessage}
                  onChange={(e) =>
                    activeTab === "notification"
                      ? setNotificationMessage(e.target.value)
                      : setEmailMessage(e.target.value)
                  }
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400"
                  rows={5}
                />
              </div>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Select Recipients</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                    <select
                      value={classOption}
                      onChange={(e) => setClassOption(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                    >
                      <option value="BCA">BCA</option>
                      <option value="BBA">BBA</option>
                      <option value="MCA">MCA</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roll Number (for individual)
                    </label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="e.g. 10221"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Send {activeTab === "notification" ? "Notification" : "Email"}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => sendMessage("all")}
                    disabled={
                      isLoading ||
                      (activeTab === "notification"
                        ? !notificationMessage
                        : !emailMessage)
                    }
                    className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "notification"
                        ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-100"
                    } ${
                      (isLoading ||
                        (activeTab === "notification"
                          ? !notificationMessage
                          : !emailMessage)) &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 
                               0 0 5.373 0 12h4zm2 
                               5.291A7.962 7.962 0 
                               014 12H0c0 3.042 1.135 
                               5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span className="mr-2">
                          {activeTab === "notification" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {/* Bell icon */}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 
                                   2.032 0 0118 14.158V11a6.002 
                                   6.002 0 00-4-5.659V5a2 2 
                                   0 10-4 0v.341C7.67 6.165 6 
                                   8.388 6 11v3.159c0 .538-
                                   .214 1.055-.595 1.436L4 
                                   17h5m6 0v1a3 3 0 11-6 0v-
                                   1m6 0H9"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {/* Mail icon */}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 
                                   0 002.22 0L21 8M5 19h14a2
                                   2 0 002-2V7a2 2 0 00-2-
                                   2H5a2 2 0 00-2 2v10a2 2 
                                   0 002 2z"
                              />
                            </svg>
                          )}
                        </span>
                        Send to All Students
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => sendMessage("class")}
                    disabled={
                      isLoading ||
                      (activeTab === "notification"
                        ? !notificationMessage
                        : !emailMessage)
                    }
                    className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "notification"
                        ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border border-indigo-200"
                        : "bg-green-100 text-green-800 hover:bg-green-200 border border-green-200"
                    } ${
                      (isLoading ||
                        (activeTab === "notification"
                          ? !notificationMessage
                          : !emailMessage)) &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373
                               0 0 5.373 0 12h4zm2
                               5.291A7.962 7.962 0
                               014 12H0c0 3.042 1.135
                               5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span className="mr-2">
                          {activeTab === "notification" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {/* Group icon */}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-
                                   5.356-1.857M17 20H7m10 
                                   0v-2c0-.656-.126-
                                   1.283-.356-1.857M7 20H2
                                   v-2a3 3 0 015.356-
                                   1.857M7 20v-2c0-.656.126-
                                   1.283.356-1.857m0 
                                   0a5.002 5.002 0 019.288 
                                   0M15 7a3 3 0 11-6 0 3 3 
                                   0 016 0zm6 3a2 2 0 
                                   11-4 0 2 2 0 014 0zM7 
                                   10a2 2 0 11-4 0 2 2 
                                   0 014 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {/* User icon */}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110
                                   5.292M15 21H3v-1a6 6 0 
                                   0112 0v1zm0 0h6v-
                                   1a6 6 0 00-9-5.197M13 
                                   7a4 4 0 11-8 0 4 4 0 018 
                                   0z"
                              />
                            </svg>
                          )}
                        </span>
                        Send to Entire Class
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => sendMessage("individual")}
                    disabled={
                      isLoading ||
                      !rollNo ||
                      (activeTab === "notification"
                        ? !notificationMessage
                        : !emailMessage)
                    }
                    className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "notification"
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-700"
                        : "bg-green-600 text-white hover:bg-green-700 border border-green-700"
                    } ${
                      (isLoading ||
                        !rollNo ||
                        (activeTab === "notification"
                          ? !notificationMessage
                          : !emailMessage)) &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373
                               0 0 5.373 0 12h4zm2
                               5.291A7.962 7.962 0
                               014 12H0c0 3.042 1.135
                               5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {/* User icon */}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 
                                 0 018 0zM12 14a7 7 0 
                                 00-7 7h14a7 7 0 00-7-
                                 7z"
                            />
                          </svg>
                        </span>
                        Send to Individual Student
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right - History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Message History</h2>
                <p className="text-sm text-gray-500">All sent communications</p>
              </div>
              <div className="p-4 h-[calc(100%-80px)] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <svg className="animate-spin h-8 w-8 text-indigo-600"/>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <svg className="h-12 w-12 mb-2" />
                    <p>No messages yet</p>
                    <p className="text-sm">Send your first message to see it here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg._id || msg.id}
                        className={`p-4 rounded-lg border ${
                          msg.type === "notification"
                            ? "border-indigo-100 bg-indigo-50"
                            : "border-green-100 bg-green-50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                                msg.type === "notification"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {msg.type === "notification" ? "Notification" : "Email"}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(msg.timestamp || msg.time).toLocaleString()}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {msg.sender}
                          </span>
                        </div>
                        <div className="mb-2">
                          <p className="font-medium text-gray-800">
                            To:{" "}
                            {msg.recipientType === "all"
                              ? "All Students"
                              : msg.recipientType === "class"
                              ? `Class ${msg.class}`
                              : `Roll No. ${msg.rollNo}`}
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded border border-gray-200">
                          <p className="text-gray-800">{msg.content}</p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          {msg.rollNo && `Roll No: ${msg.rollNo} • `}
                          Class: {msg.class || "All"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
