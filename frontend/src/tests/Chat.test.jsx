import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Chat from "./Chat";

// Mocking axios and react-query mutation
vi.mock("axios");
vi.mock("@tanstack/react-query", () => ({
  ...vi.importActual("@tanstack/react-query"),
  useMutation: vi.fn(),
}));

describe("Chat Component", () => {
  let setConversationsMock;
  let mockMutation;

  beforeEach(() => {
    // Mock the mutation function and state updater
    setConversationsMock = vi.fn();
    mockMutation = {
      mutate: vi.fn(),
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: { message: "AI Response" },
    };

    useMutation.mockReturnValue(mockMutation);
    axios.post.mockResolvedValue({
      data: { message: "AI Response" },
    });
  });

  test("renders chat component", () => {
    render(<Chat conversations={[]} setConversations={setConversationsMock} />);

    const inputField = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByText("Send");

    expect(inputField).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  test("submitting a message adds to the conversation", async () => {
    render(<Chat conversations={[]} setConversations={setConversationsMock} />);

    const inputField = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(inputField, { target: { value: "Hello" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(setConversationsMock).toHaveBeenCalledWith(
        expect.any(Function)
      );
      expect(setConversationsMock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ role: "user", content: "Hello" }),
        ])
      );
    });
  });

  test("disables send button while AI is typing", () => {
    render(<Chat conversations={[]} setConversations={setConversationsMock} />);

    const inputField = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(inputField, { target: { value: "Hello" } });

    expect(sendButton).not.toBeDisabled();

    fireEvent.click(sendButton);
    
    expect(sendButton).toBeDisabled();
  });

  test("handles Enter key press to submit message", async () => {
    render(<Chat conversations={[]} setConversations={setConversationsMock} />);

    const inputField = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(inputField, { target: { value: "Hello" } });
    fireEvent.keyPress(inputField, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(setConversationsMock).toHaveBeenCalledWith(
        expect.any(Function)
      );
      expect(setConversationsMock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ role: "user", content: "Hello" }),
        ])
      );
    });
  });

  test("renders AI response after mutation success", async () => {
    render(<Chat conversations={[]} setConversations={setConversationsMock} />);

    const inputField = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(inputField, { target: { value: "Hello" } });
    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(setConversationsMock).toHaveBeenCalledWith(
        expect.any(Function)
      );
      expect(setConversationsMock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ role: "assistant", content: "AI Response" }),
        ])
      );
    });
  });

  test("scrolls chat container to bottom after sending message", async () => {
    render(<Chat conversations={[]} setConversations={setConversationsMock} />);

    const chatContainerRef = screen.getByTestId("chat-container");
    const scrollHeight = chatContainerRef.scrollHeight;

    fireEvent.change(screen.getByPlaceholderText("Type your message..."), {
      target: { value: "Hello" },
    });

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(chatContainerRef.scrollTop).toBe(scrollHeight);
    });
  });
});
