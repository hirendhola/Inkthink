import { useEffect, useRef } from "react";

interface ChatBoardProps {
  messages: messagesData[];
}

interface messagesData {
  messageId: string;
  roomId: string;
  playerId: string;
  content: string;
  type: string;
  timestamp: number;
  playerName: string;
}

const ChatBoard = ({ messages }: ChatBoardProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="flex flex-col h-[84%]">
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-100 pr-2 relative"
      >
        <div className="space-y-2 p-2">
          {messages.map((message, index) => (
            <div key={index} className={`w-full bg-slate-200 p-3 rounded-lg`}>
              <p className={`text-sm font-medium text-green-500`}>
                {message.playerName}
              </p>
              <p className="text-gray-800 mt-1">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .flex-1::-webkit-scrollbar {
          width: 8px;
        }
        
        .flex-1::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .flex-1::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        .flex-1::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </div>
  );
};

export default ChatBoard;
