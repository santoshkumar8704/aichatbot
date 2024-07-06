import React, { useState } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import PromptForm from "./components/imagegenerator/PromptForm";
import GeneratedImage from "./components/imagegenerator/GeneratedImage";
import Chatsection from "./components/Chatsection";
import { Outlet } from "react-router-dom";
import './App.css';
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
