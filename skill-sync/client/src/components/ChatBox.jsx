import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Chatbox = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi Vijai 👋" },
    { type: "bot", text: "How may I help you?" },
    { type: "user", text: "Is it possible to complete the MLE goal?" },

    { type: "bot", text: "Absolutely, Vijai! " },
    {
      type: "bot",
      text: "The target date is **2025-06-13**, and today is **2025-01-06**,, so there's plenty of time to achieve your goal. You've already completed the first two modules in the roadmap, which is a fantastic start.",
    },
    {
      type: "bot",
      text: "Let me know if you'd like assistance or have any questions about the MLE learning roadmap. 😊",
    },
    {
      type: "bot",
      text: "For more details about the course content and your progress, **__[click here](http://localhost:5173/loading?page=roadmap&goalId=8)__**",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const addMessage = (type, text) => {
    setMessages((prevMessages) => [...prevMessages, { type, text }]);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      addMessage("user", userInput);
      setUserInput("");
      setIsBotTyping(true);
      setTimeout(() => {
        addMessage(
          "bot",
          "Not mandatory, but highly recommended! Since your target company is **Microsoft**, mastering Data Structures & Algorithms will not only help you solve complex problems efficiently but also prepare you well for their interview process. Best of luck! 👍"
        );
        p.setIsBotTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
      <button
        id="open-chat"
        onClick={toggleChatbox}
        className="bg-violet-800 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition duration-300 flex items-center"
      >
        <FontAwesomeIcon icon={faComment} className="mr-2" />
        Chat with AIgnite
      </button>
      {isChatboxOpen && (
        <motion.div
          id="chat-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bottom-16 right-4 bg-white shadow-md rounded-lg w-96 overflow-hidden"
        >
          <div className="p-4 border-b bg-purple-600 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">AIgnite</p>
            <button
              id="close-chat"
              onClick={toggleChatbox}
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div id="chatbox" className="p-4 h-80 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex items-center ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "bot" && (
                  <img
                    src="/Logo.png"
                    alt="Bot"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                )}
                <div
                  className={`rounded-lg py-2 px-4 inline-block max-w-xs break-words ${
                    message.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {message.type === "bot" ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
                {message.type === "user" && (
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQH1tGEV5M3QoQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725378087255?e=1741219200&v=beta&t=jnEAVNiAjBjWPlTIiXbEDZDuxgLoVy4FIbkzq5X1LF4"
                    alt="User"
                    className="w-10 h-10 rounded-full ml-2"
                  />
                )}
              </div>
            ))}
            {isBotTyping && (
              <div className="flex items-center justify-start mb-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Bot"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <p className="rounded-lg py-2 px-4 inline-block max-w-xs bg-gray-200 text-gray-700">
                  Thinking...
                </p>
              </div>
            )}
          </div>
          <div className="p-4 border-t flex">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="w-full px-3 py-2 border text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              id="send-button"
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbox;
