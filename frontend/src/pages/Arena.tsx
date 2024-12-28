import Bar from "../components/Bar";
import ChatBoard from "../components/ChatBoard";
import ChatInput from "../components/ChatInput";
import ColorfulLogo from "../components/ColorfulLogo";
import MainCanvas from "../components/MainCanvas";
import PlayerBoard from "../components/PlayerBoard";

interface playerData {
  playerImage: string;
  playerName: string;
  PlayerRank: number;
  PlayerPoint: number;
}

interface messagesData {
  name: string;
  message: string;
  color: string;
}

const messages: messagesData[] = [
  {
    name: "Player 1",
    message: "Hello",
    color: "red",
  },
  {
    name: "Player 2",
    message: "Hi",
    color: "blue",
  },
  {
    name: "Player 3",
    message: "Hey",
    color: "green",
  },
  {
    name: "Player 4",
    message: "Hola",
    color: "yellow",
  },
  {
    name: "Player 1",
    message: "Hello",
    color: "red",
  },
  {
    name: "Player 2",
    message: "Hi",
    color: "blue",
  },
  {
    name: "Player 3",
    message: "Hey",
    color: "green",
  },
  {
    name: "Player 4",
    message: "Hola",
    color: "yellow",
  },
  {
    name: "Player 3",
    message: "Hey",
    color: "green",
  },
  {
    name: "Player 4",
    message: "Hola",
    color: "yellow",
  },
  {
    name: "Player 3",
    message: "Hey",
    color: "green",
  },
  {
    name: "Player 4",
    message: "Hola",
    color: "yellow",
  },
  {
    name: "Player 4",
    message: "Hola",
    color: "yellow",
  },
  {
    name: "Player 4",
    message: "Hola",
    color: "yellow",
  },
  {
    name: "Player 4",
    message: "Hola",
    color: "yellow",
  },
];

const players: playerData[] = [
  {
    playerImage: "https://avatar.iran.liara.run/public/boy",
    playerName: "Player 1",
    PlayerRank: 1,
    PlayerPoint: 100,
  },
  {
    playerImage: "https://avatar.iran.liara.run/public/boy",
    playerName: "Player 2",
    PlayerRank: 2,
    PlayerPoint: 90,
  },
  {
    playerImage: "https://avatar.iran.liara.run/public/boy",
    playerName: "Player 3",
    PlayerRank: 3,
    PlayerPoint: 80,
  },
  {
    playerImage: "https://avatar.iran.liara.run/public/boy",
    playerName: "Player 4",
    PlayerRank: 4,
    PlayerPoint: 70,
  },
];

const Arena = () => {
  return (
    <main className="w-screen h-screen  sm:pb-4 sm:pl-20 sm:pr-20 p-0 flex flex-col select-none ">
      {" "}
      {/* select-none */}
      <div className="sm:flex items-left h-fit pt-5 mb-2 hidden " id="logo">
        <ColorfulLogo className="text-4xl" />
      </div>
      {/* Main Section */}
      <section className="w-full h-full m-0 sm:rounded-2xl flex flex-col overflow-hidden">
        <Bar />
        <section
          className="h-[calc(100%-3.5rem)] w-full pb-2 pt-2 z-2 text-white grid sm:grid-cols-3 sm:grid-col-[1fr 3fr 1fr] grid-cols-1 gap-2"
          style={{ gridTemplateColumns: "1fr 3fr 1fr" }}
        >
          {/* Player Board */}
          <div className="flex flex-col gap-2" style={{ minWidth: 0 }}>
            {players.map((player, index) => (
              <PlayerBoard
                key={index}
                playerImage={player.playerImage}
                playerName={player.playerName}
                PlayerRank={player.PlayerRank}
                PlayerPoint={player.PlayerPoint}
              />
            ))}
          </div>

          {/* Main Canvas */}
          <div className="flex flex-col grow" style={{ minWidth: 0 }}>
            <MainCanvas />
          </div>

          {/* Chat Section */}
          <div className="flex flex-col gap-2 grow" style={{ minWidth: 0 }}>
            <ChatBoard messages={messages} />
            <ChatInput />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Arena;
