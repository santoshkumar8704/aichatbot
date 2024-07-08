import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import Chat from "./Chat";
import axios from "axios";

const Chatsection = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await axios.get("https://accenchat.onrender.com/conversations"); // Adjust URL based on your backend route
      setConversations(response.data); // Assuming response.data is an array of conversations
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const clearChat = () =>
    setConversations([
      { role: "assistant", content: "Hello, how can I assist you today?" },
    ]);

  return (
    <div className="flex justify-between w-full h-full mx-auto p-6 bg-white">
      <div className="w-1/4 mt-6 hidden lg:block">
        <Banner clearChat={clearChat} />
      </div>
      <div className="w-3/4 max-lg:w-full max-sm:w-full   mr-10">
        <Chat conversations={conversations} setConversations={setConversations} />
      </div>
    </div>
  );
};

export default Chatsection;
