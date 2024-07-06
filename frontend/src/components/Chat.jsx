import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendMessageAPI = async (message) => {
  const res = await axios.post("http://localhost:9090/ask", { message });
  return res.data;
};

const uploadFileAPI = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post("http://localhost:9090/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const Chat = ({ conversations, setConversations }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const chatContainerRef = useRef(null); // Ref for the chat container

  const mutation = useMutation({
    mutationFn: sendMessageAPI,
    mutationKey: ["chatbot"],
    onSuccess: (data) => {
      setIsTyping(false);
      setConversations((prevConversations) => [
        ...prevConversations,
        { role: "assistant", content: data.message },
      ]);
    },
  });

  const fileMutation = useMutation({
    mutationFn: uploadFileAPI,
    mutationKey: ["fileUpload"],
    onSuccess: (data) => {
      setConversations((prevConversations) => [
        ...prevConversations,
        { role: "assistant", content: data.message },
      ]);
    },
  });

  useEffect(() => {
    // Scroll chat container to bottom when conversations change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversations]);

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    setConversations((prevConversations) => [
      ...prevConversations,
      { role: "user", content: `File uploaded: ${selectedFile.name}` },
    ]);
    fileMutation.mutate(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="bg-gray-600 w-full h-[650px] flex flex-col ml-10 mr-4">
      <div ref={chatContainerRef} className="flex-1 px-4 py-8 overflow-y-auto">
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
                <strong>
                  {entry.role === "user" ? "You: " : "AI: "}
                </strong>
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
      <div className="flex mt-2 mb-4 px-4">
        <input type="file" onChange={handleFileChange} className="text-white" />
        <button
          onClick={handleFileUpload}
          disabled={!selectedFile || isTyping}
          className="ml-2 px-4 py-2 bg-accenturePurple text-white rounded-lg focus:outline-none"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Chat;