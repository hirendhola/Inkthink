/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import Bar from "../components/Bar";
import ChatBoard from "../components/ChatBoard";
import ChatInput from "../components/ChatInput";
import ColorfulLogo from "../components/ColorfulLogo";
import MainCanvas from "../components/MainCanvas";
import PlayerBoard from "../components/PlayerBoard";
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

const Arena = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const name: string = localStorage.getItem("INKTHINK-name") || "ano";

  const { messages, draw, players, sendMessage, connectWebSocket } =
    useWebSocket();

  const joinRoom: JoinRoom = {
    type: "joinRoom",
    roomId: roomId!,
    player: {
      name: name,
      avatarUrl: null,
      playerId: "1",
      score: 0,
    },
  };
  useEffect(() => {
    if (joinRoom) {
      connectWebSocket(joinRoom);
    }
  }, [connectWebSocket, roomId]);

  const handleSendMessage = (message: string) => {
    sendMessage({
      type: "chat",
      message: message,
    });
  };

  const handleDraw = (drawData: any) => {
    sendMessage({
      type: "draw",
      data: drawData,
    });
  };

  return (
    <main className="w-screen h-screen sm:pb-4 sm:pl-20 sm:pr-20 p-0 flex flex-col select-none">
      <div className="sm:flex items-left h-fit pt-5 mb-2 hidden" id="logo">
        <ColorfulLogo className="text-4xl" />
      </div>
      <section className="w-full h-full m-0 sm:rounded-2xl flex flex-col overflow-hidden">
        <Bar />
        <section
          className="h-[calc(100%-3.5rem)] w-full pb-2 pt-2 z-2 text-white grid sm:grid-cols-3 grid-cols-1 gap-2"
          style={{ gridTemplateColumns: "1fr 3fr 1fr" }}
        >
          <div className="flex flex-col gap-2" style={{ minWidth: 0 }}>
            {players.map((player) => (
              <PlayerBoard
                key={player.id}
                playerImage="dknfjkn"
                playerName={player.name}
                PlayerRank={1}
                PlayerPoint={100}
                isDrawing={false} // You'll need to implement logic to determine who's drawing
              />
            ))}
          </div>

          <div className="flex flex-col grow" style={{ minWidth: 0 }}>
            <MainCanvas onDraw={handleDraw} drawData={draw} />
          </div>

          <div className="flex flex-col gap-2 grow" style={{ minWidth: 0 }}>
            <ChatBoard messages={messages} />
            <ChatInput
              onSendMessage={handleSendMessage}
              isDrawer={true} // You'll need to implement logic to determine if current user is drawer
            />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Arena;
