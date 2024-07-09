import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";

const Chat = ({conversations,setConversations}) => {
 // State to hold fetched conversations
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null); // Ref for the chat container

  

  const sendMessageAPI = async (message) => {
    const res = await axios.post("https://accenchat.onrender.com/ask", {
      message,
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: sendMessageAPI,
    mutationKey: ["chatbot"],
    onSuccess: (data) => {
      setIsTyping(false);
      setConversations((prevConversations) => [
        ...prevConversations,
        { role: "assistant", content: data.message },
      ]);
      scrollChatToBottom(); // Scroll to bottom after sending a message
    },
  });

  const handleSubmitMessage = () => {
    const currentMessage = message.trim();
    if (!currentMessage) {
      alert("Please enter a message");
      return;
    }

    setConversations((prevConversations) => [
      ...prevConversations,
      { role: "user", content: currentMessage },
    ]);
    setIsTyping(true);
    mutation.mutate(currentMessage);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitMessage();
    }
  };

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="bg-gray-600 w-full h-[650px] flex flex-col ml-10 mr-4">
      <div ref={chatContainerRef} className="flex-1 px-4 py-8 overflow-y-auto chat-container">
        <div className="space-y-2">
          {conversations.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center ${
                entry.role === "user" ? "justify-end" : ""
              }`}
            >
              <div
                className={`bg-${
                  entry.role === "user"
                    ? "accenturePurpleLight"
                    : "chatBoxColor"
                } p-2 rounded-lg text-white`}
              >
                <strong>{entry.role === "user" ? "You: " : "AI: "}</strong>
                <span>{entry.content}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center justify-start">
              <div className="bg-chatBoxColor p-2 rounded-lg text-white">
                <strong>AI: </strong>
                <span>Typing...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-4 mb-4 px-4">
        <input
          type="text"
          value={message}
          onKeyPress={handleKeyPress}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-chatBoxColor text-white rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSubmitMessage}
          disabled={isTyping}
          className="ml-2 px-4 py-2 bg-accenturePurple text-white rounded-lg focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
