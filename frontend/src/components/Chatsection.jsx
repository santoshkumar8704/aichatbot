import React, { useState } from "react";
import Banner from "./Banner";
import Chat from "./Chat";

const Chatsection = () => {
  const [conversations, setConversations] = useState([
    { role: "assistant", content: "Hello, how can I assist you today?" },
  ]);
  const clearChat = () =>
    setConversations([
      { role: "assistant", content: "Hello, how can I assist you today?" },
    ]);
  return (
    <div className="flex justify-between w-full h-full mx-auto p-6 bg-white">
      <div className="w-1/4 mt-6">
        <Banner clearChat={clearChat} />
      </div>
      <div className="w-3/4 mr-10">
        <Chat
          conversations={conversations}
          setConversations={setConversations}
        />
      </div>
    </div>
  );
};

export default Chatsection;
