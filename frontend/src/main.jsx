import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chatsection from "./components/Chatsection.jsx";
import PromptForm from "./components/imagegenerator/PromptForm.jsx";
import AppFIller from "./components/AppFIller.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import { AuthProvider } from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

const queryclient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/",
        element: <AppFIller />
      },
      {
        element: <PrivateRoute />, // Wrap private routes
        children: [
          {
            path: "/chat",
            element: <Chatsection />
          },
          {
            path: "/image",
            element: <PromptForm />
          },
          
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryclient}>
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </AuthProvider>
  </QueryClientProvider>
);
