interface PlayerBoardProps {
  playerImage: string;
  playerName: string;
  PlayerRank: number;
  PlayerPoint: number;
}

const PlayerBoard = ({
  playerImage,
  playerName,
  PlayerRank,
  PlayerPoint,
}: PlayerBoardProps) => {
  // playerImage = `https://avatar.iran.liara.run/public/boy`;

  return (
    <div className="bg-slate-50 text-black h-fit rounded-t-none rounded-xl font-bold overflow-hidden p-2 shadow-sm shadow-slate-700">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="w-12 h-12 rounded-full ">
            <img
              src={playerImage}
              alt="player"
              className="w-full h-full rounded-full mix-blend-multiply"
            />
          </div>
          <div className="ml-2">
            <div className=" text-sm">{playerName}</div>
            <div className=" text-xs">Rank: {PlayerRank}</div>
          </div>
        </div>
        <div className=" text-sm">{PlayerPoint}</div>
      </div>
    </div>
  );
};

export default PlayerBoard;
