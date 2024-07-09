import React, { useState } from "react";
import axios from "axios";
import ImageContainer from "../Imagecontainer";

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
    <div className="m-1 ml-52 mb-20">
      <div className="w-full h-auto mx-auto p-4 text-gray-800 bg-white rounded-lg ml-10">
      <div className="flex  justify-center items-center w-full max-lg:flex-col p-10">
        <div className="w-full max-lg:w-full ">
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
        <div className="w-1/3 h-auto max-lg:w-full max-lg:mt-10  p-6 rounded-lg mr-28">
          {imageUrl ? (
            <div className="flex justify-center items-center h-full ">
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
    <div>
    <h1 className="text-3xl text-gray-700 font-bold ml-20 mb-5">generate cool images like these....</h1>
    <div className="flex flex-wrap gap-4 ml-20">
      <ImageContainer url="https://th.bing.com/th/id/OIP.sqrMIrAlYhdJMWpPhjU6gAAAAA?w=271&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.8SXzYjtNYalr9QJRQRNvZgHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.ivk9KlJ3-OPRl1QSOWCrLAHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.BwttAP5UdTPx-sx-jn5bLQHaE8?w=274&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.IBi-BHyY34CA4Urjw6JgJgHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.5uQgVSKe-uoymfAYtzwM3AHaHa?w=158&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.8U4Yf5czR9M1hF_sQQRm8QHaE7?w=242&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url= "https://th.bing.com/th/id/OIP.9ihuQ3SdEPAQ0C3icMCWRAHaE8?w=287&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"/>
      <ImageContainer url = "https://th.bing.com/th/id/OIP.XYXeTfzALz30lhiSrqTONgHaEK?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"/>
      <ImageContainer url="https://th.bing.com/th/id/OIP.10Udm_pTGotPJEC06pmtDQHaEK?w=301&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.rcEFBARszh5FMic2iQVDJQHaDt?w=314&h=174&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <ImageContainer url="https://th.bing.com/th/id/OIP.sVDQXYTc0EaUZr3hTxUVMQHaEK?w=285&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
    </div>
    </div>
    </div>
  );
};

export default PromptForm;
