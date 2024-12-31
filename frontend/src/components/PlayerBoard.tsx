import { useState, useEffect } from "react";

interface PlayerBoardProps {
  playerImage: string;
  playerName: string;
  PlayerRank: number;
  PlayerPoint: number;
  isDrawing: boolean;
}

const PlayerBoard = ({
  playerImage,
  playerName,
  PlayerRank,
  PlayerPoint,
}: PlayerBoardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const img = new Image();
    img.src = playerImage;
    img.onload = () => {
      setImageSrc(playerImage);
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Fallback image if loading fails
      setImageSrc(
        `https://avatar.iran.liara.run/public/boy/?${localStorage.getItem(
          "INTTHINK-playerId"
        )}`
      );
      setImageLoaded(true);
    };
  }, [playerImage, playerName]);

  return (
    <div className="bg-slate-50 text-black h-fit rounded-t-none rounded-xl font-bold overflow-hidden p-2 shadow-sm shadow-slate-700">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            {!imageLoaded ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : (
              <img
                src={imageSrc}
                alt={playerName}
                className="w-full h-full rounded-full mix-blend-multiply transition-opacity duration-300"
              />
            )}
          </div>
          <div className="ml-2">
            <div className="text-sm">{playerName}</div>
            <div className="text-xs">Rank: {PlayerRank}</div>
          </div>
        </div>
        <div className="text-sm">{PlayerPoint}</div>
      </div>
    </div>
  );
};

export default PlayerBoard;
