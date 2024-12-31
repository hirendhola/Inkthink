/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WebSocketService {
  connect: (roomData: JoinRoom) => void;
  disconnect: () => void;
  sendMessage: (message: any) => void;
  onMessage: (callback: (message: any) => void) => void;
}
interface JoinRoom {
  type: string,
  roomId: string,
  player: {
    name: string,
    avatarUrl: string | null,
    playerId: string,
    score: number
  }
}
export function createWebSocketService(url: string): WebSocketService {
  let socket: WebSocket | null = null;
  let messageCallback: (message: any) => void = () => { };

  const connect = (roomData: JoinRoom) => {
    if (socket) return;
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected");
      // socket?.send(JSON.stringify({ roomData }));
      sendMessage(roomData)
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      messageCallback(message);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      socket = null;
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const disconnect = () => {
    socket?.close();
    socket = null;
  };

  const sendMessage = (message: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open");
    }
  };

  const onMessage = (callback: (message: any) => void) => {
    messageCallback = callback;
  };

  return { connect, disconnect, sendMessage, onMessage };
}
