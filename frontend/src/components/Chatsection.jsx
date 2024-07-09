import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import Chat from "./Chat";
import axios from "axios";

const Chatsection = () => {
  const [conversations, setConversations] = useState([]);

  

  const clearChat = () => {
    console.log('Clear Chat Button Clicked');
    setConversations([]);
  };

  return (
    <div className="flex justify-between w-full h-full mx-auto p-6 bg-white">
      <div className="w-1/4 mt-6 hidden lg:block">
        <Banner clearChat={clearChat} />
      </div>
      <div className="w-3/4 max-lg:w-full max-sm:w-full mr-10">
        <Chat conversations={conversations} setConversations={setConversations} />
      </div>
    </div>
  );
};

export default Chatsection;