/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createWebSocketService,
  WebSocketService,
} from "../services/WebSocketService";

interface Message {
  messageId: string;
  roomId: string;
  playerId: string;
  content: string;
  type: string;
  timestamp: number;
  playerName: string;
}
interface Draw {
  data: any;
}

interface JoinRoom {
  type: string;
  roomId: string;
  player: {
    name: string;
    avatarUrl: string | null;
    playerId: string;
    score: number;
  };
}

interface WebSocketContextType {
  messages: Message[];
  draw: Draw | undefined;
  players: { id: string; name: string }[];
  sendMessage: (message: any) => void;
  connectWebSocket: (roomData: JoinRoom) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draw, setDraw] = useState<Draw>();
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const webSocketService: WebSocketService = createWebSocketService(
    "ws://localhost:4000"
  );

  useEffect(() => {
    webSocketService.onMessage((message) => {
      switch (message.type) {
      case "chat":
          setMessages((prev) => [...prev, message.data]);
          break;
        case "playerJoined":
          setPlayers((prev) => [...prev, message.data.player]);
          break;
        case "draw":
          setDraw({ data: message.data.drawData });
          break;
        case "roomJoined":
          // setDraw({ data: message.data.drawData });
          console.log("Room joined", message);
          break;
        case "connected":
          // setDraw({ data: message.data.drawData });
          console.log("connected", message);
          break;
        case "correctGuess":
          // setDraw({ data: message.data.drawData });
          console.log("correctGuess", message);
          break;
        case "gameStarted":
          // setDraw({ data: message.data.drawData });
          console.log("gameStarted", message);
          break;
        case "playerLeft":
          // setDraw({ data: message.data.drawData });
          console.log("playerLeft", message);
          break;
        case "error":
          // setDraw({ data: message.data.drawData });
          console.log("error", message);
          break;
        default:
          console.warn("Unknown message type:", message.type);
      }
    });

    return () => {
      webSocketService.disconnect();
    };
  }, [webSocketService]);

  const connectWebSocket = (roomData: JoinRoom) => {
    webSocketService.connect(roomData);
  };

  const sendMessage = (message: any) => {
    webSocketService.sendMessage(message);
  };

  return (
    <WebSocketContext.Provider
      value={{ messages, players, draw, sendMessage, connectWebSocket }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
