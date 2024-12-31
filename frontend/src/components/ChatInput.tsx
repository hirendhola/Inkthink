import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDrawer?: boolean;
}

const ChatInput = ({ onSendMessage, isDrawer }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="bg-green-500 h-14 w-full">
      <input
        placeholder={isDrawer ? "You are drawing..." : "Enter your guess"}
        className="w-full h-full p-1.5 text-2xl text-black outline-none border-none focus:ring-0"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        disabled={isDrawer}
      />
    </div>
  );
};

export default ChatInput;
