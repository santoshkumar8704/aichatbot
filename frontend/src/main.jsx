import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Chat from "./components/Chat.jsx";
import PromptForm from "./components/imagegenerator/PromptForm.jsx";
import Chatsection from "./components/Chatsection.jsx";
import AppFIller from "./components/AppFIller.jsx";
const queryclient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/chat",
        element:<Chatsection />

      },
      {
        path:"/image",
        element:<PromptForm />
      },{
        path:"/",
        element:<AppFIller />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryclient}>
    <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
    ,
  </QueryClientProvider>
);
