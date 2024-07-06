import React, { useState } from "react";
import axios from "axios";

const PromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://accenchat.onrender.com/generate-image",
        {
          prompt: prompt.trim(),
        }
      );
      setImageUrl(response.data.url);
      setError("");
    } catch (error) {
      setError("Error generating image. Please try again later.");
      console.error("Error generating image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen mx-auto p-4 text-gray-800 bg-white rounded-lg shadow-md">
      <div className="flex max-lg:flex-col p-10">
        <div className="w-1/2 max-lg:w-full ">
          <h2 className="text-xl font-semibold mb-4">Generate Image</h2>
          <h3 className="text-lg mb-4">Make your imagination come to life</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium  mb-2">
              Enter Prompt:
            </label>
            <input
              type="text"
              className="w-1/2 px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
            />
          </div>
          <button
            onClick={handleGenerateImage}
            className="w-1/2 py-2 px-4 bg-accenturePurple text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>
        <div className="w-1/3 h-auto max-lg:w-full max-lg:mt-10 bg-gray-700 p-6 rounded-lg shadow-md ">
          {imageUrl ? (
            <div className="flex justify-center items-center h-full">
              <img
                src={imageUrl}
                alt="Generated Image"
                className="max-w-full max-h-full"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              {loading && <p className="text-white">Generating image...</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptForm;
