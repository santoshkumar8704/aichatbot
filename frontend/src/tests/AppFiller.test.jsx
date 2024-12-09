import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useAuth, AuthProvider } from "../components/AuthProvider"; // Ensure the AuthProvider is imported
import "@testing-library/jest-dom/vitest";
import AppFiller from "../components/AppFIller";

// Mock components for routes
const MockChatPage = () => <div data-testid="ChatPage">Chat Page</div>;
const MockImagePage = () => <div data-testid="ImagePage">Image Page</div>;

describe("AppFiller Component", () => {
  it("renders headings and services section", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AppFiller />
        </AuthProvider>
      </MemoryRouter>
    );

    // Test headings
    const welcomeHeading = screen.getByText(/welcome to accenchat,/i);
    expect(welcomeHeading).toBeInTheDocument();

    const tagline = screen.getByText(/your friendly ai companion/i);
    expect(tagline).toBeInTheDocument();

    const servicesHeading = screen.getByText(/our services/i);
    expect(servicesHeading).toBeInTheDocument();
  });

  it("renders cards with correct titles and descriptions", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AppFiller />
        </AuthProvider>
      </MemoryRouter>
    );

    // Test Chat Card
    const chatTitle = screen.getByText("Chat");
    const chatDescription = screen.getByText(
      /start a conversation and get instant responses\./i
    );
    expect(chatTitle).toBeInTheDocument();
    expect(chatDescription).toBeInTheDocument();

    // Test Image Card
    const imageTitle = screen.getByText("Image");
    const imageDescription = screen.getByText(
      /generate and explore beautiful images\./i
    );
    expect(imageTitle).toBeInTheDocument();
    expect(imageDescription).toBeInTheDocument();
  });

  it("navigates to the correct routes when card links are clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppFiller />} />
            <Route path="/chat" element={<MockChatPage />} />
            <Route path="/image" element={<MockImagePage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    // Test navigation to Chat Page
    const chatLink = screen.getByText("Chat");
    fireEvent.click(chatLink);
    const chatPage = screen.getByTestId("ChatPage");
    expect(chatPage).toBeInTheDocument();

    // Test navigation to Image Page
    const imageLink = screen.getByText("Image");
    fireEvent.click(imageLink);
    const imagePage = screen.getByTestId("ImagePage");
    expect(imagePage).toBeInTheDocument();
  });
});
