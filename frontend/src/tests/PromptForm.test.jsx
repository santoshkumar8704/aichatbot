import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PromptForm from "./PromptForm";
import { vi } from "vitest";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext"; // Update the path based on your project structure
import AppFiller from "../AppFiller"; // Update the path based on your project structure

// Mock axios
vi.mock("axios");

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <AppFiller>{ui}</AppFiller>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe("PromptForm Component", () => {
  it("renders input, button, and dynamic elements correctly", () => {
    renderWithProviders(<PromptForm />);

    // Check for heading and subheading
    expect(screen.getByText(/Generate Image/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Make your imagination come to life/i)
    ).toBeInTheDocument();

    // Check for input
    expect(
      screen.getByPlaceholderText(/Enter your prompt here.../i)
    ).toBeInTheDocument();

    // Check for Generate Image button
    const button = screen.getByRole("button", { name: /Generate Image/i });
    expect(button).toBeInTheDocument();

    // Check for ImageContainer components
    expect(screen.getAllByAltText(/Generated Image/i).length).toBe(0); // No images initially
  });

  it("displays loading state when the Generate Image button is clicked", async () => {
    renderWithProviders(<PromptForm />);

    const input = screen.getByPlaceholderText(/Enter your prompt here.../i);
    const button = screen.getByRole("button", { name: /Generate Image/i });

    // Enter a prompt and click the button
    fireEvent.change(input, { target: { value: "A sunset over mountains" } });
    fireEvent.click(button);

    expect(button).toHaveTextContent("Generating...");
    await waitFor(() => expect(button).toHaveTextContent("Generate Image"));
  });

  it("handles successful image generation", async () => {
    // Mock successful response
    axios.post.mockResolvedValueOnce({
      data: { url: "https://example.com/generated-image.jpg" },
    });

    renderWithProviders(<PromptForm />);

    const input = screen.getByPlaceholderText(/Enter your prompt here.../i);
    const button = screen.getByRole("button", { name: /Generate Image/i });

    // Enter a prompt and click the button
    fireEvent.change(input, { target: { value: "A sunset over mountains" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByAltText("Generated Image")).toHaveAttribute(
        "src",
        "https://example.com/generated-image.jpg"
      );
    });
  });

  it("handles errors during image generation", async () => {
    // Mock error response
    axios.post.mockRejectedValueOnce(new Error("Network error"));

    renderWithProviders(<PromptForm />);

    const input = screen.getByPlaceholderText(/Enter your prompt here.../i);
    const button = screen.getByRole("button", { name: /Generate Image/i });

    // Enter a prompt and click the button
    fireEvent.change(input, { target: { value: "A sunset over mountains" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Error generating image. Please try again later.")
      ).toBeInTheDocument();
    });
  });

  it("disables the Generate Image button when loading", async () => {
    renderWithProviders(<PromptForm />);

    const input = screen.getByPlaceholderText(/Enter your prompt here.../i);
    const button = screen.getByRole("button", { name: /Generate Image/i });

    // Enter a prompt and click the button
    fireEvent.change(input, { target: { value: "A sunset over mountains" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it("renders example ImageContainer components", () => {
    renderWithProviders(<PromptForm />);

    // Check that example ImageContainer URLs are rendered
    const exampleImages = screen.getAllByAltText("Generated Image");
    expect(exampleImages.length).toBeGreaterThan(0);

    // Verify at least one example URL
    expect(exampleImages[0]).toHaveAttribute(
      "src",
      "https://th.bing.com/th/id/OIP.sqrMIrAlYhdJMWpPhjU6gAAAAA?w=271&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    );
  });
});
